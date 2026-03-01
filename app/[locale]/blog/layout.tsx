import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  const title = t('blogTitle');
  const description = t('blogDescription');
  const keywords = t('blogKeywords');
  const baseUrl = 'https://www.sassystudio.com.mx';
  const canonicalUrl = `${baseUrl}/${locale}/blog`;

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: 'website',
      locale: locale === 'es' ? 'es_MX' : 'en_US',
      siteName: 'Sassy Studio',
      images: [
        {
          url: `${baseUrl}/og-blog.jpg`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${baseUrl}/og-blog.jpg`],
    },
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${baseUrl}/en/blog`,
        es: `${baseUrl}/es/blog`,
      },
    },
  };
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
