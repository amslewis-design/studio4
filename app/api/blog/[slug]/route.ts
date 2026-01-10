import { NextResponse } from 'next/server';
import { supabaseAdmin } from '../../../../lib/supabaseAdmin';

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
  const { data, error } = await supabaseAdmin.auth.getUser(token);
  if (error) return null;
  return data.user || null;
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const token = req.headers.get('authorization')?.split(' ')[1];
    const user = await getUserFromToken(token || undefined);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const existing = await supabaseAdmin.from('posts').select('author').eq('slug', slug).single();
    if (existing.error) return NextResponse.json({ error: existing.error.message }, { status: 404 });
    if (existing.data.author !== user.id) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    const body = await req.json();
    const { data, error } = await supabaseAdmin
      .from('posts')
      .update({
        title: body.title,
        excerpt: body.excerpt,
        content: body.content,
        tag: body.tag,
        cover_url: body.cover_url,
        published: body.published,
        published_at: body.published ? new Date().toISOString() : null,
        updated_at: new Date().toISOString(),
      })
      .eq('slug', slug)
      .select()
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Unknown error' }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
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
