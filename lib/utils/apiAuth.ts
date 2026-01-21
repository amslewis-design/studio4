/**
 * Server-side authentication utilities for API routes
 * Validates JWT tokens and verifies user authentication
 */

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export interface AuthenticatedRequest {
  userId: string;
  userEmail: string;
}

/**
 * Verifies JWT token from Authorization header
 * Returns authenticated user info or error response
 */
export async function verifyAuthToken(
  request: NextRequest
): Promise<{ user: AuthenticatedRequest | null; error: NextResponse | null }> {
  try {
    // Get token from Authorization header
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '').trim();

    if (!token) {
      return {
        user: null,
        error: NextResponse.json(
          { error: 'Unauthorized: Missing authentication token' },
          { status: 401 }
        ),
      };
    }

    // Initialize Supabase client
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      console.error('Supabase credentials not configured');
      return {
        user: null,
        error: NextResponse.json(
          { error: 'Server misconfiguration' },
          { status: 500 }
        ),
      };
    }

    // Create Supabase client with the token
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    
    // Verify the token by getting the user
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      return {
        user: null,
        error: NextResponse.json(
          { error: 'Unauthorized: Invalid or expired token' },
          { status: 401 }
        ),
      };
    }

    return {
      user: {
        userId: user.id,
        userEmail: user.email || '',
      },
      error: null,
    };
  } catch (err) {
    console.error('Token verification error:', err);
    return {
      user: null,
      error: NextResponse.json(
        { error: 'Unauthorized: Failed to verify token' },
        { status: 401 }
      ),
    };
  }
}

/**
 * Middleware to protect API routes
 * Use this to wrap route handlers that require authentication
 */
export function withAuth(
  handler: (
    request: NextRequest,
    user: AuthenticatedRequest
  ) => Promise<NextResponse>
) {
  return async (request: NextRequest) => {
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

    return handler(request, user);
  };
}
