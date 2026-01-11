import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

let supabaseInstance: any = null;

// Lazy-load the Supabase client to avoid validation errors during build
function getSupabaseClient() {
  if (!supabaseInstance) {
    // During build, if keys are missing, return a mock that won't crash
    if (!supabaseUrl || !supabaseKey) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('⚠️ Supabase environment variables not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY');
      }
      // Return a mock object that won't crash during build
      return {
        from: () => ({
          select: () => Promise.reject(new Error('Supabase not configured')),
          insert: () => Promise.reject(new Error('Supabase not configured')),
          update: () => Promise.reject(new Error('Supabase not configured')),
          delete: () => Promise.reject(new Error('Supabase not configured')),
        }),
      };
    }
    supabaseInstance = createClient(supabaseUrl, supabaseKey);
  }
  return supabaseInstance;
}

export const supabase = new Proxy({}, {
  get: (_target, prop) => {
    return getSupabaseClient()[prop];
  },
}) as any;