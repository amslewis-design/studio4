import { Metadata } from 'next';
import { buildReciprocalHreflangAlternates } from '@/lib/seo/hreflang';
import { SEO_ROUTE_MAP } from '@/lib/seo/routes';

export const dynamic = 'force-static';
export const revalidate = 86400;

export function generateStaticParams() {
  return [{ locale: 'es' }, { locale: 'en' }];
}

async function getFaqMeta(locale: string): Promise<{ title: string; subtitle: string }> {
  const messages = (await import(`../../../messages/${locale}.json`)).default as {
    faq?: {
      title?: string;
      subtitle?: string;
    };
  };

  return {
    title: messages.faq?.title || 'FAQ',
    subtitle: messages.faq?.subtitle || '',
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const faqMeta = await getFaqMeta(locale);

  const baseUrl = 'https://www.sassystudio.com.mx';
  const canonicalUrl = `${baseUrl}/${locale}/faq`;
  const alternates = buildReciprocalHreflangAlternates(locale, SEO_ROUTE_MAP.faq);

  return {
    title: `${faqMeta.title} | Sassy Studio`,
    description: faqMeta.subtitle,
    openGraph: {
      title: `${faqMeta.title} | Sassy Studio`,
      description: faqMeta.subtitle,
      url: canonicalUrl,
      type: 'website',
      locale: locale === 'es' ? 'es_MX' : 'en_GB',
      siteName: 'Sassy Studio',
      images: [
        {
          url: `${baseUrl}/og-faq.jpg`,
          width: 1200,
          height: 630,
          alt: `${faqMeta.title} | Sassy Studio`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${faqMeta.title} | Sassy Studio`,
      description: faqMeta.subtitle,
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
