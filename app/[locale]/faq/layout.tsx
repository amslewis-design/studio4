import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { buildReciprocalHreflangAlternates } from '@/lib/seo/hreflang';
import { SEO_ROUTE_MAP } from '@/lib/seo/routes';

export const dynamic = 'force-static';
export const revalidate = 86400;

export function generateStaticParams() {
  return [{ locale: 'es' }, { locale: 'en' }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const tFaq = await getTranslations({ locale, namespace: 'faq' });

  const baseUrl = 'https://www.sassystudio.com.mx';
  const canonicalUrl = `${baseUrl}/${locale}/faq`;
  const alternates = buildReciprocalHreflangAlternates(locale, SEO_ROUTE_MAP.faq);

  return {
    title: `${tFaq('title')} | Sassy Studio`,
    description: tFaq('subtitle'),
    openGraph: {
      title: `${tFaq('title')} | Sassy Studio`,
      description: tFaq('subtitle'),
      url: canonicalUrl,
      type: 'website',
      locale: locale === 'es' ? 'es_MX' : 'en_GB',
      siteName: 'Sassy Studio',
      images: [
        {
          url: `${baseUrl}/og-faq.jpg`,
          width: 1200,
          height: 630,
          alt: `${tFaq('title')} | Sassy Studio`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${tFaq('title')} | Sassy Studio`,
      description: tFaq('subtitle'),
      images: [`${baseUrl}/og-faq.jpg`],
    },
    alternates,
  };
}

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
