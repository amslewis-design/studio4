/**
 * Client-side utility for getting Supabase auth token for API requests
 */

import { supabase } from '@/lib/supabaseClient';

/**
 * Get the current user's authentication token for API requests
 * Adds Bearer token to Authorization header
 */
export async function getAuthToken(): Promise<string | null> {
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    
    if (error || !session) {
      console.error('Failed to get auth session:', error);
      return null;
    }

    return session.access_token;
  } catch (err) {
    console.error('Error getting auth token:', err);
    return null;
  }
}

/**
 * Get authorization headers with Bearer token
 */
export async function getAuthHeaders(): Promise<HeadersInit> {
  const token = await getAuthToken();
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
}
