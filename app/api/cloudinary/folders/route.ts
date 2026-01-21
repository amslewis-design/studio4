/**
 * GET /api/cloudinary/folders - List all folders (requires auth)
 * POST /api/cloudinary/folders - Create a new folder (requires auth)
 * PATCH /api/cloudinary/folders - Rename a folder (requires auth)
 * DELETE /api/cloudinary/folders - Delete a folder (requires auth)
 */

import { NextRequest, NextResponse } from 'next/server';
import { verifyAuthToken } from '@/lib/utils/apiAuth';

const CLOUDINARY_API_BASE = 'https://api.cloudinary.com/v1_1';

function getAuthHeader() {
  const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!apiKey || !apiSecret) {
    throw new Error('Cloudinary credentials not configured');
  }

  const auth = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64');
  return `Basic ${auth}`;
}

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

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

    if (!cloudName) {
      return NextResponse.json(
        { error: 'Cloudinary cloud name not configured' },
        { status: 500 }
      );
    }

    const response = await fetch(
      `${CLOUDINARY_API_BASE}/${cloudName}/folders`,
      {
        method: 'GET',
        headers: {
          'Authorization': getAuthHeader(),
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      const error = await response.text();
      console.error('[Cloudinary API] List folders error:', error);
      throw new Error(`Cloudinary API error: ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('[API] Error listing folders:', error);
    return NextResponse.json(
      { error: 'Failed to list folders' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
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

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const { folderPath } = await request.json();

    if (!cloudName) {
      return NextResponse.json(
        { error: 'Cloudinary cloud name not configured' },
        { status: 500 }
      );
    }

    if (!folderPath || typeof folderPath !== 'string') {
      return NextResponse.json(
        { error: 'Folder path is required' },
        { status: 400 }
      );
    }

    // Sanitize folder path
    const sanitizedPath = folderPath.trim().replace(/[^a-zA-Z0-9/_-]/g, '');

    if (!sanitizedPath || sanitizedPath.length > 255) {
      return NextResponse.json(
        { error: 'Invalid folder path' },
        { status: 400 }
      );
    }

    const response = await fetch(
      `${CLOUDINARY_API_BASE}/${cloudName}/folders/${sanitizedPath}`,
      {
        method: 'POST',
        headers: {
          'Authorization': getAuthHeader(),
        },
      }
    );

    if (!response.ok) {
      const error = await response.text();
      console.error('[Cloudinary API] Create folder error:', error);
      
      // Handle specific errors
      if (response.status === 400) {
        return NextResponse.json(
          { error: 'Invalid folder name or folder already exists' },
          { status: 400 }
        );
      }
      
      throw new Error(`Cloudinary API error: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('[API] Folder created:', sanitizedPath);
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('[API] Error creating folder:', error);
    return NextResponse.json(
      { error: 'Failed to create folder' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
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

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const { path, toPath } = await request.json();

    if (!cloudName) {
      return NextResponse.json(
        { error: 'Cloudinary cloud name not configured' },
        { status: 500 }
      );
    }

    if (!path || !toPath) {
      return NextResponse.json(
        { error: 'Current folder path and new folder path are required' },
        { status: 400 }
      );
    }

    // Sanitize paths
    const sanitizedPath = path.trim().replace(/[^a-zA-Z0-9/_-]/g, '');
    const sanitizedToPath = toPath.trim().replace(/[^a-zA-Z0-9/_-]/g, '');

    if (!sanitizedPath || !sanitizedToPath || sanitizedToPath.length > 255) {
      return NextResponse.json(
        { error: 'Invalid folder path' },
        { status: 400 }
      );
    }

    const response = await fetch(
      `${CLOUDINARY_API_BASE}/${cloudName}/folders/${sanitizedPath}?to_folder=${encodeURIComponent(sanitizedToPath)}`,
      {
        method: 'PUT',
        headers: {
          'Authorization': getAuthHeader(),
        },
      }
    );

    if (!response.ok) {
      const error = await response.text();
      console.error('[Cloudinary API] Rename folder error:', error);
      
      if (response.status === 404) {
        return NextResponse.json(
          { error: 'Folder not found' },
          { status: 404 }
        );
      }
      
      throw new Error(`Cloudinary API error: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('[API] Folder renamed:', sanitizedPath, '->', sanitizedToPath);
    return NextResponse.json(data);
  } catch (error) {
    console.error('[API] Error renaming folder:', error);
    return NextResponse.json(
      { error: 'Failed to rename folder' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
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

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const { path } = await request.json();

    if (!cloudName) {
      return NextResponse.json(
        { error: 'Cloudinary cloud name not configured' },
        { status: 500 }
      );
    }

    if (!path) {
      return NextResponse.json(
        { error: 'Folder path is required' },
        { status: 400 }
      );
    }

    const response = await fetch(
      `${CLOUDINARY_API_BASE}/${cloudName}/folders/${path}`,
      {
        method: 'DELETE',
        headers: {
          'Authorization': getAuthHeader(),
        },
      }
    );

    // 204 = successful deletion, 404 = already deleted
    if (!response.ok && response.status !== 404) {
      const error = await response.text();
      console.error('[Cloudinary API] Delete folder error:', error);
      
      if (response.status === 409) {
        return NextResponse.json(
          { error: 'Cannot delete folder with assets. Please move or delete assets first.' },
          { status: 409 }
        );
      }
      
      throw new Error(`Cloudinary API error: ${response.statusText}`);
    }

    console.log('[API] Folder deleted:', path);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[API] Error deleting folder:', error);
    return NextResponse.json(
      { error: 'Failed to delete folder' },
      { status: 500 }
    );
  }
}
