import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '../../../../../lib/supabaseAdmin';

/**
 * GET /api/blog/user/posts - Get all posts for the authenticated user (drafts + published)
 * Requires Authorization bearer token
 */

export async function GET(req: Request) {
  try {
    const supabaseAdmin = getSupabaseAdmin();

    // Validate bearer token
    const token = req.headers.get('authorization')?.split(' ')[1];
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized: missing token' }, { status: 401 });
    }

    const { data: userData, error: userErr } = await supabaseAdmin.auth.getUser(token);
    if (userErr || !userData?.user) {
      console.error('[/api/blog/user/posts] Token validation failed:', userErr?.message);
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
    }

    const userId = userData.user.id;
    console.log('[/api/blog/user/posts] Fetching posts for user:', userId);

    // Fetch all posts by this user (drafts + published)
    const { data, error } = await supabaseAdmin
      .from('posts')
      .select('*')
      .eq('author', userId)
      .order('updated_at', { ascending: false });

    if (error) {
      console.error('[/api/blog/user/posts] Query error:', error.message);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    console.log('[/api/blog/user/posts] Successfully fetched', data?.length || 0, 'posts');
    return NextResponse.json(data || []);
  } catch (err: any) {
    const errMsg = err.message || 'Unknown error';
    console.error('[/api/blog/user/posts] Exception:', errMsg);
    
    // Surface the actual error to help with debugging
    return NextResponse.json({ error: errMsg }, { status: 500 });
  }
}
