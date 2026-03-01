import { NextResponse } from 'next/server';
import { supabaseService } from '@/lib/services/supabaseService';
import { storageService } from '@/lib/services/storageService';
import type { PortfolioItem } from '@/lib/types';

const BASE_URL = 'https://www.sassystudio.com.mx';

export async function GET() {
  try {
    // Start building XML sitemap
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
    xml += '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n';

    // Add OG images for main pages
    const ogImages = [
      { page: '/es', image: '/og-home.jpg', title: 'Sassy Studio - Marketing de Hospitalidad Premium' },
      { page: '/en', image: '/og-home.jpg', title: 'Sassy Studio - Premium Hospitality Marketing' },
      { page: '/es/blog', image: '/og-blog.jpg', title: 'Blog - Sassy Studio' },
      { page: '/en/blog', image: '/og-blog.jpg', title: 'Blog - Sassy Studio' },
      { page: '/es/portfolio', image: '/og-portfolio.jpg', title: 'Portafolio - Sassy Studio' },
      { page: '/en/portfolio', image: '/og-portfolio.jpg', title: 'Portfolio - Sassy Studio' },
      { page: '/es/faq', image: '/og-faq.jpg', title: 'Preguntas Frecuentes - Sassy Studio' },
      { page: '/en/faq', image: '/og-faq.jpg', title: 'FAQ - Sassy Studio' },
    ];

    ogImages.forEach(({ page, image, title }) => {
      xml += `  <url>\n`;
      xml += `    <loc>${BASE_URL}${page}</loc>\n`;
      xml += `    <image:image>\n`;
      xml += `      <image:loc>${BASE_URL}${image}</image:loc>\n`;
      xml += `      <image:title>${escapeXml(title)}</image:title>\n`;
      xml += `    </image:image>\n`;
      xml += `  </url>\n`;
    });

    // Add logo images
    const logos = [
      { image: '/Sassy-studio_Color.png', title: 'Sassy Studio Logo Color' },
      { image: '/sassy_logo_pink.png', title: 'Sassy Studio Logo Pink' },
      { image: '/sassy_logo_white.png', title: 'Sassy Studio Logo White' },
    ];

    logos.forEach(({ image, title }) => {
      xml += `  <url>\n`;
      xml += `    <loc>${BASE_URL}</loc>\n`;
      xml += `    <image:image>\n`;
      xml += `      <image:loc>${BASE_URL}${image}</image:loc>\n`;
      xml += `      <image:title>${escapeXml(title)}</image:title>\n`;
      xml += `    </image:image>\n`;
      xml += `  </url>\n`;
    });

    // Fetch and add blog post images for both locales
    try {
      const locales = ['es', 'en'] as const;
      
      for (const locale of locales) {
        const posts = await supabaseService.getPostsByLanguage(locale);
        const publishedPosts = posts.filter(p => p.published === true && p.image);

        publishedPosts.forEach(post => {
          xml += `  <url>\n`;
          xml += `    <loc>${BASE_URL}/${locale}/blog/${post.slug}</loc>\n`;
          xml += `    <image:image>\n`;
          xml += `      <image:loc>${escapeXml(post.image!)}</image:loc>\n`;
          xml += `      <image:title>${escapeXml(post.title)}</image:title>\n`;
          if (post.excerpt) {
            xml += `      <image:caption>${escapeXml(post.excerpt)}</image:caption>\n`;
          }
          xml += `    </image:image>\n`;
          xml += `  </url>\n`;
        });
      }
    } catch (error) {
      console.error('Error fetching blog posts for image sitemap:', error);
    }

    // Fetch and add portfolio images
    try {
      const portfolio = storageService.getPortfolio();
      
      portfolio.forEach((item: PortfolioItem) => {
        if (item.imageUrl) {
          // Add for both locales since portfolio is language-agnostic
          ['es', 'en'].forEach(locale => {
            xml += `  <url>\n`;
            xml += `    <loc>${BASE_URL}/${locale}/portfolio</loc>\n`;
            xml += `    <image:image>\n`;
            xml += `      <image:loc>${escapeXml(item.imageUrl)}</image:loc>\n`;
            xml += `      <image:title>${escapeXml(item.clientName)}</image:title>\n`;
            if (item.description) {
              xml += `      <image:caption>${escapeXml(item.description)}</image:caption>\n`;
            }
            xml += `    </image:image>\n`;
            xml += `  </url>\n`;
          });
        }
      });
    } catch (error) {
      console.error('Error fetching portfolio for image sitemap:', error);
    }

    xml += '</urlset>';

    return new NextResponse(xml, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('Error generating image sitemap:', error);
    return new NextResponse('Error generating image sitemap', { status: 500 });
  }
}

// Helper function to escape XML special characters
function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
