/**
 * GET /api/cloudinary/signature
 * Generates a secure upload signature for Cloudinary
 * Requires authentication
 */

import { NextResponse, NextRequest } from 'next/server';
import crypto from 'crypto';
import { verifyAuthToken } from '@/lib/utils/apiAuth';
import { checkRateLimit } from '@/lib/utils/rateLimit';
import { RATE_LIMITS, isRateLimitingEnabled } from '@/lib/config/rateLimits';

export async function GET(request: NextRequest) {
  try {
    // Verify authentication
    const { user, error } = await verifyAuthToken(request);
    
    if (error) {
      return error;
    }

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Check rate limit by user ID
    if (isRateLimitingEnabled()) {
      const rateLimit = RATE_LIMITS.CLOUDINARY_SIGNATURE;
      const limitCheck = checkRateLimit(
        `cloudinary:signature:${user.userId}`,
        rateLimit.requests,
        rateLimit.windowMs
      );

      if (!limitCheck.allowed && limitCheck.response) {
        return limitCheck.response;
      }
    }
    
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !apiKey || !apiSecret || !uploadPreset) {
      return NextResponse.json(
        { error: 'Cloudinary is not properly configured' },
        { status: 500 }
      );
    }

    const timestamp = Math.floor(Date.now() / 1000);
    const folder = 'sassy-studio';

    // Build the string to sign in alphabetical order (Cloudinary requirement)
    // Format: param1=value1&param2=value2&...&paramN=valueN{API_SECRET}
    const signatureParams = {
      folder,
      timestamp: timestamp.toString(),
      upload_preset: uploadPreset,
    };

    // Sort alphabetically by key and build string
    const sortedKeys = Object.keys(signatureParams).sort();
    const signatureString = sortedKeys
      .map(key => `${key}=${signatureParams[key as keyof typeof signatureParams]}`)
      .join('&') + apiSecret;

    console.log('[Cloudinary Signature] Generating signature for user:', user.userEmail);

    const signature = crypto
      .createHash('sha256')
      .update(signatureString)
      .digest('hex');

    console.log('[Cloudinary Signature] Signature generated successfully');

    return NextResponse.json({
      signature,
      timestamp,
      cloudName,
      apiKey,
      folder,
      uploadPreset,
    });
  } catch (error) {
    console.error('[Cloudinary Signature] Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate upload signature' },
      { status: 500 }
    );
  }
}
