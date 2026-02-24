import type { Metadata } from 'next';
import Script from 'next/script';
import { Providers } from '../providers';
import { GTMScript } from '../components/GTMScript';
import '../globals.css';
import { getTranslations } from 'next-intl/server';
import {
  generateOrganizationSchema,
  generateWebSiteSchema,
  generateServiceSchemas,
} from '@/lib/schemas';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  const baseUrl = 'https://studio4.vercel.app';
  const canonicalUrl = `${baseUrl}/${locale}`;

  return {
    title: t('homeTitle'),
    description: t('homeDescription'),
    keywords: t('homeKeywords'),
    openGraph: {
      title: t('homeTitle'),
      description: t('homeDescription'),
      url: canonicalUrl,
      type: 'website',
      locale: locale === 'es' ? 'es_MX' : 'en_US',
      siteName: 'Sassy Studio',
      images: [
        {
          url: `${baseUrl}/og-home.jpg`,
          width: 1200,
          height: 630,
          alt: t('homeTitle'),
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('homeTitle'),
      description: t('homeDescription'),
      images: [`${baseUrl}/og-home.jpg`],
    },
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${baseUrl}/en`,
        es: `${baseUrl}/es`,
      },
    },
    viewport: 'width=device-width, initial-scale=1',
    icons: {
      icon: [
        { url: '/favicons_2402/favicon.ico', sizes: 'any' },
      ],
      apple: [
        { url: '/favicons_2402/apple-touch-icon.png', sizes: '180x180' },
      ],
    },
    manifest: '/favicons_2402/site.webmanifest',
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = (await import(`../../messages/${locale}.json`)).default;

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        {/* Preconnect to critical origins */}
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="preconnect" href="https://analytics.ahrefs.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        
        <GTMScript />
        <Script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="Qr1PMnwA75J915L4WGokBg"
          strategy="lazyOnload"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateOrganizationSchema(locale)),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateWebSiteSchema(locale)),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateServiceSchemas(locale)),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              'itemListElement': [{
                '@type': 'ListItem',
                'position': 1,
                'name': locale === 'es' ? 'Inicio' : 'Home',
                'item': `https://www.sassystudio.co.uk/${locale}`
              }]
            }),
          }}
        />
      </head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5DPJZCZ4"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <Providers locale={locale} messages={messages}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
