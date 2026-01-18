import type { Metadata } from 'next';
import { Providers } from '../providers';
import '../globals.css';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    title: t('homeTitle'),
    description: t('homeDescription'),
    icons: {
      icon: [
        { url: '/favicons_new/favicon.ico', sizes: 'any' },
        { url: '/favicons_new/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
        { url: '/favicons_new/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      ],
      apple: [
        { url: '/favicons_new/apple-touch-icon.png', sizes: '180x180' },
      ],
    },
    manifest: '/favicons_new/site.webmanifest',
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
    <html suppressHydrationWarning>
      <body>
        <Providers locale={locale} messages={messages}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
