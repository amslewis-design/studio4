/**
 * DELETE /api/cloudinary/asset
 * Deletes an asset from Cloudinary
 */

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { checkRateLimit } from '@/lib/utils/rateLimit';
import { RATE_LIMITS, isRateLimitingEnabled } from '@/lib/config/rateLimits';

export async function DELETE(request: NextRequest) {
  try {
    const { publicId } = await request.json();

    if (!publicId) {
      return NextResponse.json(
        { error: 'Missing publicId' },
        { status: 400 }
      );
    }

    // Validate publicId format - must be alphanumeric with hyphens, underscores, and forward slashes
    if (!/^[a-zA-Z0-9\-_/]+$/.test(publicId)) {
      return NextResponse.json(
        { error: 'Invalid publicId format' },
        { status: 400 }
      );
    }

    // Verify the request is from an authenticated admin
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized: Missing authentication token' },
        { status: 401 }
      );
    }

    // Verify JWT token with Supabase
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.error('Supabase credentials not configured for asset deletion');
      // CRITICAL: Do NOT allow deletion without authentication verification
      // Fail securely in all environments
      return NextResponse.json(
        { error: 'Server misconfiguration: Authentication service unavailable' },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey);
    const { data: { user }, error } = await supabase.auth.getUser(token);
    
    if (error || !user) {
      return NextResponse.json(
        { error: 'Unauthorized: Invalid or expired token' },
        { status: 401 }
      );
    }

    // Check rate limit by user ID (authenticated endpoints)
    if (isRateLimitingEnabled()) {
      const rateLimit = RATE_LIMITS.CLOUDINARY_ASSET_DELETE;
      const limitCheck = checkRateLimit(
        `cloudinary:asset:delete:${user.id}`,
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

    if (!cloudName || !apiKey || !apiSecret) {
      return NextResponse.json(
        { error: 'Cloudinary is not properly configured' },
        { status: 500 }
      );
    }

    // Delete from Cloudinary via Admin API
    const auth = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64');
    
    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/resources/image/upload/${publicId}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Basic ${auth}`,
          },
        }
      );

      // Cloudinary returns 404 if asset doesn't exist, but that's OK
      if (!response.ok && response.status !== 404) {
        throw new Error(`Cloudinary API error: ${response.statusText}`);
      }

      return NextResponse.json({
        success: true,
        publicId,
        message: response.status === 404 ? 'Asset not found or already deleted' : 'Asset deleted successfully',
      });
    } catch (fetchError) {
      console.error('[Cloudinary Delete] Fetch error:', fetchError);
      return NextResponse.json(
        { error: 'Failed to delete asset from Cloudinary' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('[Cloudinary Delete] Error:', error);
    return NextResponse.json(
      { error: 'Failed to process delete request' },
      { status: 500 }
    );
  }
}
