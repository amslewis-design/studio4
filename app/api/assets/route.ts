import { NextRequest, NextResponse } from 'next/server';

const CLOUDINARY_API_BASE = 'https://api.cloudinary.com/v1_1';

export async function GET(request: NextRequest) {
  try {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (!cloudName || !apiKey || !apiSecret) {
      return NextResponse.json(
        { error: 'Missing Cloudinary credentials' },
        { status: 500 }
      );
    }

    // Create Basic Auth header
    const auth = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64');

    // Fetch all resources (images) from Cloudinary
    // Using resources/image endpoint with pagination support
    const url = new URL(
      `${CLOUDINARY_API_BASE}/${cloudName}/resources/image`
    );

    // Add query parameters for better performance
    url.searchParams.append('max_results', '500'); // Fetch up to 500 at once
    url.searchParams.append('type', 'upload'); // Only uploaded assets

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Cloudinary API error:', response.status, errorData);
      return NextResponse.json(
        { error: 'Failed to fetch assets from Cloudinary' },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Transform Cloudinary response into format expected by dashboard
    const assets = (data.resources || []).map((resource: any) => ({
      public_id: resource.public_id,
      url: resource.secure_url || resource.url,
      width: resource.width,
      height: resource.height,
      format: resource.format,
      folder: resource.folder || '',
      created_at: resource.created_at,
      bytes: resource.bytes,
      resource_type: resource.resource_type,
    }));

    return NextResponse.json({
      success: true,
      assets,
      total: data.total_count || assets.length,
    });
  } catch (error) {
    console.error('Assets endpoint error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
