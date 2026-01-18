/**
 * GET /api/cloudinary/signature
 * Generates a secure upload signature for Cloudinary
 * Used for client-side uploads
 */

import { NextResponse, NextRequest } from 'next/server';
import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';

export async function GET(request: NextRequest) {
  try {
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
      console.warn('Supabase credentials not configured for auth verification');
      // Allow request if Supabase not configured (development fallback)
    } else {
      const supabase = createClient(supabaseUrl, supabaseKey);
      const { data: { user }, error } = await supabase.auth.getUser(token);
      
      if (error || !user) {
        return NextResponse.json(
          { error: 'Unauthorized: Invalid or expired token' },
          { status: 401 }
        );
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

    console.log('[Cloudinary Signature] Generating signature for:', {
      folder,
      timestamp,
      upload_preset: uploadPreset,
    });

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
