import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'mexicoCity' });

  const baseUrl = 'https://www.sassystudio.com.mx';
  const pageUrl = `${baseUrl}/${locale}/mexico-city`;

  return {
    title: t('pageTitle'),
    description: t('metaDescription'),
    keywords: t('metaKeywords'),
    openGraph: {
      title: t('pageTitle'),
      description: t('metaDescription'),
      url: pageUrl,
      siteName: 'Sassy Studio',
      locale: locale === 'es' ? 'es_MX' : 'en_GB',
      type: 'website',
      images: [
        {
          url: `${baseUrl}/mexico-city-og.jpg`,
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
      images: [`${baseUrl}/mexico-city-og.jpg`],
    },
    alternates: {
      canonical: pageUrl,
      languages: {
        'es-MX': `${baseUrl}/es/mexico-city`,
        'en-GB': `${baseUrl}/en/mexico-city`,
      },
    },
  };
}

export default function MexicoCityLayout({
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
            '@id': 'https://www.sassystudio.com.mx/#organization-mexico-city',
            name: 'Sassy Studio - Mexico City',
            alternateName: 'Sassy Studio CDMX',
            description: 'Boutique editorial content studio for hospitality brands in Mexico City.',
            url: 'https://www.sassystudio.com.mx/mexico-city',
            areaServed: {
              '@type': 'City',
              name: 'Mexico City',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Ciudad de México',
                addressRegion: 'Ciudad de México',
                addressCountry: 'MX',
              },
            },
            geo: {
              '@type': 'GeoCoordinates',
              latitude: '19.4326',
              longitude: '-99.1332',
            },
            priceRange: '$$$',
            email: 'contacto@sassystudio.com.mx',
            sameAs: ['https://www.instagram.com/sassydigitalcontent/'],
            knowsAbout: [
              'Hospitality Marketing Mexico City',
              'Luxury Content Creation',
              'Hotel Photography CDMX',
              'Restaurant Photography Mexico City',
              'Social Media Marketing',
              'Brand Strategy',
              'Digital Content',
            ],
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: 'Mexico City Content Services',
              itemListElement: [
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Hospitality Editorial Package',
                    description: 'Editorial production for boutique hotels, restaurants and lifestyle brands across Mexico City.',
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Social Content Package',
                    description: 'Always-on social content for hospitality brands that need consistency and premium visuals.',
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Digital Strategy Package',
                    description: 'Integrated website and content strategy to strengthen local discovery and conversion.',
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
