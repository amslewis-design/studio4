import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '../../../lib/supabaseAdmin';

/**
 * GET  - list published posts
 * POST - create a new post (server-side; requires an Authorization bearer token)
 */

export async function GET() {
  try {
    const supabaseAdmin = getSupabaseAdmin();
    const { data, error } = await supabaseAdmin
      .from('posts')
      .select('id,slug,title,excerpt,cover_url,tag,published,published_at,author,created_at')
      .eq('published', true)
      .order('published_at', { ascending: false })
      .limit(20);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data || []);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Unknown error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const supabaseAdmin = getSupabaseAdmin();
    const body = await req.json();
    const token = req.headers.get('authorization')?.split(' ')[1];
    if (!token) return NextResponse.json({ error: 'Unauthorized: missing token' }, { status: 401 });

    // Validate user from token
    const { data: userData, error: userErr } = await supabaseAdmin.auth.getUser(token);
    if (userErr || !userData?.user) {
      console.error('[POST /api/blog] Token validation failed:', userErr?.message);
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const userId = userData.user.id;
    console.log('[POST /api/blog] Creating post for user:', userId, 'title:', body.title);

    const insertPayload: Record<string, any> = {
      slug: body.slug,
      title: body.title,
      content: body.content,
      author: userId,
      published: body.published === true,
    };

    // Optional fields
    if (body.excerpt !== undefined) insertPayload.excerpt = body.excerpt;
    if (body.tag !== undefined) insertPayload.tag = body.tag;
    if (body.cover_url !== undefined) insertPayload.cover_url = body.cover_url;
    if (body.published === true) insertPayload.published_at = new Date().toISOString();

    const { data, error } = await supabaseAdmin.from('posts').insert(insertPayload).select().single();
    if (error) {
      console.error('[POST /api/blog] Insert error:', error.message);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    
    console.log('[POST /api/blog] Post created successfully:', data?.id);
    return NextResponse.json(data, { status: 201 });
  } catch (err: any) {
    const errMsg = err.message || 'Unknown error';
    console.error('[POST /api/blog] Exception:', errMsg);
    return NextResponse.json({ error: errMsg }, { status: 500 });
  }
}
