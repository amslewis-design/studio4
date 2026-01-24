import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'faq' });

  const baseUrl = 'https://studio4.vercel.app';
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
