import type { Metadata } from 'next';
import { Providers } from './providers';
import './globals.css';

export const metadata: Metadata = {
  title: 'Sassy Studio | Content Marketing | Preview Site',
  description: 'Transforming boutique hospitality into digital gold through high-end visual storytelling and strategic brand refinement.',
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
