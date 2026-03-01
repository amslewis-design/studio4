import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'faq' });

  const baseUrl = 'https://www.sassystudio.com.mx';
  const canonicalUrl = `${baseUrl}/${locale}/faq`;

  return {
    title: `${t('title')} | Sassy Studio`,
    description: t('subtitle'),
    openGraph: {
      title: `${t('title')} | Sassy Studio`,
      description: t('subtitle'),
      url: canonicalUrl,
      type: 'website',
      locale: locale === 'es' ? 'es_MX' : 'en_US',
      siteName: 'Sassy Studio',
      images: [
        {
          url: `${baseUrl}/og-faq.jpg`,
          width: 1200,
          height: 630,
          alt: `${t('title')} | Sassy Studio`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${t('title')} | Sassy Studio`,
      description: t('subtitle'),
      images: [`${baseUrl}/og-faq.jpg`],
    },
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${baseUrl}/en/faq`,
        es: `${baseUrl}/es/faq`,
      },
    },
  };
}

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
