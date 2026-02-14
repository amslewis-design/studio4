import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'coyoacan' });
  
  const baseUrl = 'https://studio4.vercel.app';
  const pageUrl = `${baseUrl}/${locale}/coyoacan`;

  return {
    title: t('pageTitle'),
    description: t('metaDescription'),
    keywords: t('metaKeywords'),
    openGraph: {
      title: t('pageTitle'),
      description: t('metaDescription'),
      url: pageUrl,
      siteName: 'Sassy Studio',
      locale: locale === 'es' ? 'es_MX' : 'en_US',
      type: 'website',
      images: [
        {
          url: `${baseUrl}/coyoacan-og.jpg`,
          width: 1200,
          height: 630,
          alt: t('hero.title'),
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('pageTitle'),
      description: t('metaDescription'),
      images: [`${baseUrl}/coyoacan-og.jpg`],
    },
    alternates: {
      canonical: pageUrl,
      languages: {
        'es-MX': `${baseUrl}/es/coyoacan`,
        'en-US': `${baseUrl}/en/coyoacan`,
      },
    },
  };
}

export default function CoyoacanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            '@id': 'https://studio4.vercel.app/#organization-coyoacan',
            name: 'Sassy Studio - Coyoacán',
            alternateName: 'Sassy Studio CDMX Coyoacán',
            description: 'Boutique editorial content studio for hospitality brands in Coyoacán, Mexico City.',
            url: 'https://studio4.vercel.app/coyoacan',
            areaServed: {
              '@type': 'Neighborhood',
              name: 'Coyoacán',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Coyoacán',
                addressRegion: 'Ciudad de México',
                postalCode: '04000',
                addressCountry: 'MX',
              },
            },
            geo: {
              '@type': 'GeoCoordinates',
              latitude: '19.3467',
              longitude: '-99.1619',
            },
            priceRange: '$$$',
            email: 'contacto@sassystudio.com.mx',
            sameAs: ['https://www.instagram.com/sassydigitalcontent/'],
            knowsAbout: [
              'Hospitality Marketing Coyoacán',
              'Luxury Content Creation',
              'Hotel Photography',
              'Restaurant Photography Coyoacán',
              'Social Media Marketing',
              'Brand Strategy',
              'Digital Content',
            ],
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: 'Coyoacán Photography Services',
              itemListElement: [
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Weekend Coyoacán Package',
                    description: 'Capture vibrant weekend energy in Coyoacán with artisan markets, terraces and bohemian atmosphere.',
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Cultural Package',
                    description: 'Event coverage for galleries, museums and cultural spaces in Coyoacán.',
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Gastronomic Package',
                    description: 'Specialized content for Coyoacán restaurants and cafés.',
                  },
                },
              ],
            },
          }),
        }}
      />
      {children}
    </>
  );
}
