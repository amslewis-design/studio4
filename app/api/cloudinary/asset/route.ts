/**
 * DELETE /api/cloudinary/asset
 * Deletes an asset from Cloudinary
 */

import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(request: NextRequest) {
  try {
    const { publicId } = await request.json();

    if (!publicId) {
      return NextResponse.json(
        { error: 'Missing publicId' },
        { status: 400 }
      );
    }

    // Verify the request is from an authenticated admin
    // TODO: Add proper auth check with Supabase JWT verification

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
