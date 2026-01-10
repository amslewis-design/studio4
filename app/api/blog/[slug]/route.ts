import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '../../../../lib/supabaseAdmin';

/**
 * GET    /api/blog/[slug]   - fetch published post by slug
 * PUT    /api/blog/[slug]   - update post (author only)
 * DELETE /api/blog/[slug]   - delete post (author only)
 */

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const supabaseAdmin = getSupabaseAdmin();
    const { slug } = await params;
    const { data, error } = await supabaseAdmin
      .from('posts')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 404 });
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Unknown error' }, { status: 500 });
  }
}

async function getUserFromToken(token?: string) {
  if (!token) return null;
  const supabaseAdmin = getSupabaseAdmin();
  const { data, error } = await supabaseAdmin.auth.getUser(token);
  if (error) return null;
  return data.user || null;
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const supabaseAdmin = getSupabaseAdmin();
    const { slug } = await params;
    const token = req.headers.get('authorization')?.split(' ')[1];
    const user = await getUserFromToken(token || undefined);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const existing = await supabaseAdmin.from('posts').select('author').eq('slug', slug).single();
    if (existing.error) return NextResponse.json({ error: existing.error.message }, { status: 404 });
    if (existing.data.author !== user.id) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    const body = await req.json();
    const updatePayload: Record<string, any> = {
      updated_at: new Date().toISOString(),
    };

    if (body.title !== undefined) updatePayload.title = body.title;
    if (body.excerpt !== undefined) updatePayload.excerpt = body.excerpt;
    if (body.content !== undefined) updatePayload.content = body.content;
    if (body.tag !== undefined) updatePayload.tag = body.tag;
    if (body.cover_url !== undefined) updatePayload.cover_url = body.cover_url;
    if (body.published !== undefined) {
      updatePayload.published = body.published;
      if (body.published === true) updatePayload.published_at = new Date().toISOString();
    }

    const { data, error } = await supabaseAdmin
      .from('posts')
      .update(updatePayload)
      .eq('slug', slug)
      .select()
      .single();

    if (error) {
      console.error('[PUT /api/blog/[slug]] Update error:', error.message);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    
    console.log('[PUT /api/blog/[slug]] Post updated successfully:', slug);
    return NextResponse.json(data);
  } catch (err: any) {
    const errMsg = err.message || 'Unknown error';
    console.error('[PUT /api/blog/[slug]] Exception:', errMsg);
    return NextResponse.json({ error: errMsg }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const supabaseAdmin = getSupabaseAdmin();
    const { slug } = await params;
    const token = req.headers.get('authorization')?.split(' ')[1];
    const user = await getUserFromToken(token || undefined);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const existing = await supabaseAdmin.from('posts').select('author').eq('slug', slug).single();
    if (existing.error) return NextResponse.json({ error: existing.error.message }, { status: 404 });
    if (existing.data.author !== user.id) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    const { error } = await supabaseAdmin.from('posts').delete().eq('slug', slug);
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Unknown error' }, { status: 500 });
  }
}
