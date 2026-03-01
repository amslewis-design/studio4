import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'services' });

  const baseUrl = 'https://www.sassystudio.com.mx';
  const canonicalUrl = `${baseUrl}/${locale}/services`;

  return {
    title: t('pageTitle'),
    description: t('metaDescription'),
    keywords: 'luxury hospitality content, boutique hotel marketing, Mexico City photography, CDMX restaurant content, brand strategy hospitality',
    openGraph: {
      title: t('pageTitle'),
      description: t('metaDescription'),
      url: canonicalUrl,
      type: 'website',
      locale: locale === 'es' ? 'es_MX' : 'en_US',
      siteName: 'Sassy Studio',
      images: [
        {
          url: `${baseUrl}/og-home.jpg`,
          width: 1200,
          height: 630,
          alt: t('pageTitle'),
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('pageTitle'),
      description: t('metaDescription'),
      images: [`${baseUrl}/og-home.jpg`],
    },
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${baseUrl}/en/services`,
        es: `${baseUrl}/es/services`,
      },
    },
  };
}

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
