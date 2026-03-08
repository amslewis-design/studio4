import type { Metadata } from 'next';
import Preview from '../components/index';
import { buildReciprocalHreflangAlternates } from '@/lib/seo/hreflang';
import { SEO_ROUTE_MAP } from '@/lib/seo/routes';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  return {
    alternates: buildReciprocalHreflangAlternates(locale, SEO_ROUTE_MAP.home),
  };
}

export default function Home() {
  return <Preview />;
}
