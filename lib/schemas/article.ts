import type { Post } from '@/lib/types';

export function generateArticleSchema(post: Post, locale: string) {
  const baseUrl = 'https://studio4.vercel.app';
  const imageUrl = post.image?.startsWith('http')
    ? post.image
    : `${baseUrl}${post.image}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${baseUrl}/${locale}/blog/${post.slug}#article`,
    headline: post.title,
    description: post.excerpt,
    image: {
      '@type': 'ImageObject',
      url: imageUrl,
      width: 1200,
      height: 630,
    },
    datePublished: post.published_at || post.created_at,
    dateModified: post.updated_at || post.published_at || post.created_at,
    author: {
      '@type': 'Organization',
      '@id': `${baseUrl}/#organization`,
      name: post.author || 'Sassy Studio',
    },
    publisher: {
      '@type': 'Organization',
      '@id': `${baseUrl}/#organization`,
      name: 'Sassy Studio',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/Sassy-studio_Color.png`,
        width: 512,
        height: 512,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/${locale}/blog/${post.slug}`,
    },
    articleSection: post.category,
    inLanguage: locale === 'es' ? 'es-MX' : 'en-US',
    keywords: [
      post.category,
      'hospitality marketing',
      'luxury content',
      'Mexico City',
      'CDMX',
    ].filter(Boolean),
  };
}
