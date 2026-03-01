import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'acapulco' });

  const baseUrl = 'https://www.sassystudio.com.mx';
  const pageUrl = `${baseUrl}/${locale}/acapulco`;

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
          url: `${baseUrl}/acapulco-og.jpg`,
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
      images: [`${baseUrl}/acapulco-og.jpg`],
    },
    alternates: {
      canonical: pageUrl,
      languages: {
        'es-MX': `${baseUrl}/es/acapulco`,
        'en-GB': `${baseUrl}/en/acapulco`,
      },
    },
  };
}

export default function AcapulcoLayout({
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
            '@id': 'https://www.sassystudio.com.mx/#organization-acapulco',
            name: 'Sassy Studio - Acapulco',
            alternateName: 'Sassy Studio Guerrero',
            description: 'Boutique editorial content studio for hospitality brands in Acapulco, Guerrero.',
            url: 'https://www.sassystudio.com.mx/acapulco',
            areaServed: {
              '@type': 'City',
              name: 'Acapulco',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Acapulco de Juárez',
                addressRegion: 'Guerrero',
                addressCountry: 'MX',
              },
            },
            geo: {
              '@type': 'GeoCoordinates',
              latitude: '16.8531',
              longitude: '-99.8237',
            },
            priceRange: '$$$',
            email: 'contacto@sassystudio.com.mx',
            sameAs: ['https://www.instagram.com/sassydigitalcontent/'],
            knowsAbout: [
              'Hospitality Marketing Acapulco',
              'Luxury Content Creation',
              'Hotel Photography Guerrero',
              'Restaurant Photography Acapulco',
              'Social Media Marketing',
              'Brand Strategy',
              'Digital Content',
            ],
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: 'Acapulco Content Services',
              itemListElement: [
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Hospitality Editorial Package',
                    description: 'Editorial production for hotels, restaurants and lifestyle brands in Acapulco and Guerrero.',
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Social Content Package',
                    description: 'Always-on social content for brands that need consistent and premium visual communication.',
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Digital Strategy Package',
                    description: 'Website and content strategy to improve local discovery and conversion in Acapulco.',
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
