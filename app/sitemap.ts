import { MetadataRoute } from 'next';
import { supabaseService } from '@/lib/services/supabaseService';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.sassystudio.com.mx';
const LOCALES = ['en', 'es'] as const;

function getSafeDate(value: unknown): Date {
  if (typeof value !== 'string' || !value.trim()) {
    return new Date();
  }

  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? new Date() : parsed;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes: MetadataRoute.Sitemap = [];

  // Home pages for each locale
  LOCALES.forEach((locale) => {
    routes.push({
      url: `${BASE_URL}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    });

    // Blog listing
    routes.push({
      url: `${BASE_URL}/${locale}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    });

    // Portfolio
    routes.push({
      url: `${BASE_URL}/${locale}/portfolio`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    });

    const serviceHubUrl = locale === 'es'
      ? `${BASE_URL}/es/servicios`
      : `${BASE_URL}/en/services`;

    // Services hub (canonical per locale)
    routes.push({
      url: serviceHubUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    });

    routes.push({
      url: `${BASE_URL}/${locale}/mexico-city`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    });

    routes.push({
      url: `${BASE_URL}/${locale}/cuernavaca`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    });

    routes.push({
      url: `${BASE_URL}/${locale}/acapulco`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    });

    routes.push({
      url: `${BASE_URL}/${locale}/coyoacan`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    });

    // Secondary service detail
    routes.push({
      url: `${BASE_URL}/${locale}/servicios/produccion-editorial`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    });

    routes.push({
      url: `${BASE_URL}/${locale}/servicios/estrategia-digital`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    });

    routes.push({
      url: `${BASE_URL}/${locale}/servicios/contenido-social`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    });

    // FAQ
    routes.push({
      url: `${BASE_URL}/${locale}/faq`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  });

  // Fetch all published blog posts by locale for dynamic entries
  try {
    for (const locale of LOCALES) {
      const posts = await supabaseService.getPostsByLanguage(locale);

      posts.forEach((post) => {
        if (!post.slug) {
          return;
        }

        routes.push({
          url: `${BASE_URL}/${locale}/blog/${post.slug}`,
          lastModified: getSafeDate(post.updated_at || post.published_at || post.created_at),
          changeFrequency: 'monthly',
          priority: 0.7,
        });
      });
    }
  } catch (error) {
    console.error('Failed to fetch blog posts for sitemap:', error);
  }

  return routes;
}
