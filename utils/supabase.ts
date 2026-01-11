import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY || '';

// Create client with fallback values to allow build to proceed
// These will be validated at runtime when actually used
export const supabase = createClient(supabaseUrl, supabaseKey);

// Log warning if environment variables are missing (only in development)
if (process.env.NODE_ENV === 'development') {
  if (!supabaseUrl || !supabaseKey) {
    console.warn('⚠️ Supabase environment variables not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY');
  }
}