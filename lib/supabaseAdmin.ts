import 'server-only';

import { createClient, type SupabaseClient } from '@supabase/supabase-js';

let cached: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url) throw new Error('[SupabaseAdmin] Missing NEXT_PUBLIC_SUPABASE_URL');
  if (!serviceRole) throw new Error('[SupabaseAdmin] Missing SUPABASE_SERVICE_ROLE_KEY');

  if (!cached) {
    cached = createClient(url, serviceRole, {
      db: { schema: 'public' },
      auth: { persistSession: false },
    });
  }

  return cached;
}

