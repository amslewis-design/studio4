import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  const title = t('portfolioTitle');
  const description = t('portfolioDescription');
  const keywords = t('portfolioKeywords');
  const baseUrl = 'https://www.sassystudio.com.mx';
  const canonicalUrl = `${baseUrl}/${locale}/portfolio`;

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: 'website',
      locale: locale === 'es' ? 'es_MX' : 'en_GB',
      siteName: 'Sassy Studio',
      images: [
        {
          url: `${baseUrl}/og-portfolio.jpg`,
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
      images: [`${baseUrl}/og-portfolio.jpg`],
    },
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en-GB': `${baseUrl}/en/portfolio`,
        'es-MX': `${baseUrl}/es/portfolio`,
        'x-default': `${baseUrl}/en/portfolio`,
      },
    },
  };
}

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
