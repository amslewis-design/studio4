import { MetadataRoute } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://studio4.vercel.app';
const LOCALES = ['en', 'es'];

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

    // FAQ
    routes.push({
      url: `${BASE_URL}/${locale}/faq`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  });

  // Fetch published blog posts for dynamic entries
  try {
    const response = await fetch(`${BASE_URL}/api/posts`, {
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    if (response.ok) {
      const data = await response.json();
      const posts = data.posts || [];

      // Add individual blog posts for each locale
      LOCALES.forEach((locale) => {
        posts.forEach((post: any) => {
          if (post.slug) {
            routes.push({
              url: `${BASE_URL}/${locale}/blog/${post.slug}`,
              lastModified: new Date(post.updated_at || post.created_at),
              changeFrequency: 'monthly',
              priority: 0.7,
            });
          }
        });
      });
    }
  } catch (error) {
    console.error('Failed to fetch blog posts for sitemap:', error);
  }

  return routes;
}
