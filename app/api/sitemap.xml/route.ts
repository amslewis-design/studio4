import { NextResponse } from 'next/server';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://studio4.vercel.app';
const LOCALES = ['en', 'es'];

interface SitemapEntry {
  url: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

export async function GET() {
  try {
    const sitemapEntries: SitemapEntry[] = [];

    // Home pages for each locale
    LOCALES.forEach((locale) => {
      sitemapEntries.push({
        url: `${BASE_URL}/${locale}`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'weekly',
        priority: 1.0,
      });

      // Blog listing
      sitemapEntries.push({
        url: `${BASE_URL}/${locale}/blog`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'weekly',
        priority: 0.8,
      });

      // Portfolio
      sitemapEntries.push({
        url: `${BASE_URL}/${locale}/portfolio`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'monthly',
        priority: 0.8,
      });
    });

    // Fetch published blog posts for dynamic entries
    try {
      const response = await fetch(`${BASE_URL}/api/posts`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        const posts = data.posts || [];

        // Add individual blog posts for each locale
        LOCALES.forEach((locale) => {
          posts.forEach((post: any) => {
            if (post.slug) {
              sitemapEntries.push({
                url: `${BASE_URL}/${locale}/blog/${post.slug}`,
                lastmod: new Date(post.updated_at || post.created_at).toISOString().split('T')[0],
                changefreq: 'monthly',
                priority: 0.7,
              });
            }
          });
        });
      }
    } catch (error) {
      console.error('Failed to fetch blog posts for sitemap:', error);
    }

    // Generate XML
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries
  .map(
    (entry) => `  <url>
    <loc>${entry.url}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

    return new NextResponse(xml, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return NextResponse.json(
      { error: 'Failed to generate sitemap' },
      { status: 500 }
    );
  }
}
