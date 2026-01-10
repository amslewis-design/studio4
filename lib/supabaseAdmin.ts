import 'server-only';

// Stub Supabase Admin - not currently in use
// This is a placeholder to prevent build errors
// Replace with actual implementation when needed

export function getSupabaseAdmin() {
  throw new Error('Supabase Admin not configured. Please add NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY to .env.local');
}

