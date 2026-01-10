import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !anonKey) {
	// Surface a clear runtime error in dev to highlight missing configuration
	// without crashing the whole app.
	console.error('[Supabase] Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY');
}

export const supabase = createClient(url ?? '', anonKey ?? '', {
	db: { schema: 'public' },
	auth: {
		persistSession: true,
		autoRefreshToken: true,
	},
});

export default supabase;
