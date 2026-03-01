import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'cuernavaca' });

  const baseUrl = 'https://www.sassystudio.com.mx';
  const pageUrl = `${baseUrl}/${locale}/cuernavaca`;

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
          url: `${baseUrl}/cuernavaca-og.jpg`,
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
      images: [`${baseUrl}/cuernavaca-og.jpg`],
    },
    alternates: {
      canonical: pageUrl,
      languages: {
        'es-MX': `${baseUrl}/es/cuernavaca`,
        'en-US': `${baseUrl}/en/cuernavaca`,
      },
    },
  };
}

export default function CuernavacaLayout({
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
            '@id': 'https://www.sassystudio.com.mx/#organization-cuernavaca',
            name: 'Sassy Studio - Cuernavaca',
            alternateName: 'Sassy Studio Morelos',
            description: 'Boutique editorial content studio for hospitality brands in Cuernavaca, Morelos.',
            url: 'https://www.sassystudio.com.mx/cuernavaca',
            areaServed: {
              '@type': 'City',
              name: 'Cuernavaca',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Cuernavaca',
                addressRegion: 'Morelos',
                addressCountry: 'MX',
              },
            },
            geo: {
              '@type': 'GeoCoordinates',
              latitude: '18.9261',
              longitude: '-99.2308',
            },
            priceRange: '$$$',
            email: 'contacto@sassystudio.com.mx',
            sameAs: ['https://www.instagram.com/sassydigitalcontent/'],
            knowsAbout: [
              'Hospitality Marketing Cuernavaca',
              'Luxury Content Creation',
              'Hotel Photography Morelos',
              'Restaurant Photography Cuernavaca',
              'Social Media Marketing',
              'Brand Strategy',
              'Digital Content',
            ],
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: 'Cuernavaca Content Services',
              itemListElement: [
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Hospitality Editorial Package',
                    description: 'Editorial production for hotels, restaurants and lifestyle brands in Cuernavaca and Morelos.',
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
                    description: 'Website and content strategy to improve discovery and conversion in the local market.',
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
