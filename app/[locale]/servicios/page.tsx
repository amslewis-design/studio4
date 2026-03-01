import Link from 'next/link';
import Navbar from '@/app/components/Navbar';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';
  const baseUrl = 'https://www.sassystudio.com.mx';
  const serviceHubPath = isEn ? '/en/services' : '/es/servicios';
  const canonicalUrl = `${baseUrl}${serviceHubPath}`;

  const title = isEn
    ? 'Services for hospitality brands | Sassy Studio'
    : 'Servicios para marcas de hospitalidad | Sassy Studio';

  const description = isEn
    ? 'Explore editorial production, digital strategy, and social content services for hospitality, lifestyle, and ecommerce brands.'
    : 'Explora producción editorial, estrategia digital y contenido social para marcas de hospitalidad, lifestyle y ecommerce.';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: 'website',
      locale: isEn ? 'en_GB' : 'es_MX',
      siteName: 'Sassy Studio',
    },
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'es-MX': `${baseUrl}/es/servicios`,
        'en-GB': `${baseUrl}/en/services`,
        'x-default': `${baseUrl}/en/services`,
      },
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function ServiciosIndexPage({ params }: Props) {
  const { locale } = await params;
  const isEn = locale === 'en';
  const serviceHubHref = isEn ? `/${locale}/services` : `/${locale}/servicios`;

  return (
    <main className="min-h-screen bg-[#1a1a1a] text-white selection:bg-[#FC7CA4] selection:text-black">
      <Navbar />
      <section className="pt-36 pb-20 px-6 max-w-5xl mx-auto">
        <nav aria-label="Breadcrumb" className="text-xs text-gray-400 mb-8 tracking-wide">
          <Link href={`/${locale}`} className="hover:text-white">{isEn ? 'Home' : 'Inicio'}</Link>
          <span className="mx-2">→</span>
          <span className="text-white">{isEn ? 'Services' : 'Servicios'}</span>
        </nav>

        <h1 className="text-5xl md:text-6xl font-serif font-thin mb-6">{isEn ? 'Services' : 'Servicios'}</h1>
        <p className="text-gray-300 mb-10 max-w-3xl">
          {isEn
            ? 'Explore our editorial solutions for hospitality, lifestyle, and ecommerce brands.'
            : 'Explora nuestras soluciones editoriales para marcas de hospitalidad, lifestyle y ecommerce.'}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href={`/${locale}/servicios/produccion-editorial`}
            className="border border-white/10 p-6 bg-white/[0.02] hover:border-[#D4AF37] transition-colors"
          >
            <h2 className="text-2xl font-serif mb-2">{isEn ? 'Editorial production (Photo + Video)' : 'Producción editorial (Foto + Video)'}</h2>
            <p className="text-gray-400 text-sm">{isEn ? 'Specialized photo and video editorial production for social media, web, and campaigns.' : 'Servicio especializado en producción editorial foto y video para redes, web y campañas.'}</p>
          </Link>

          <Link
            href={`/${locale}/servicios/estrategia-digital`}
            className="border border-white/10 p-6 bg-white/[0.02] hover:border-[#D4AF37] transition-colors"
          >
            <h2 className="text-2xl font-serif mb-2">{isEn ? 'Digital strategy' : 'Estrategia digital'}</h2>
            <p className="text-gray-400 text-sm">{isEn ? 'Website maintenance, UX optimisation, internal linking, CTAs, blog, newsletter, and campaign support.' : 'Mantenimiento web, optimización UX, enlaces internos, CTAs, blog, newsletter y soporte para campañas.'}</p>
          </Link>

          <Link
            href={`/${locale}/servicios/contenido-social`}
            className="border border-white/10 p-6 bg-white/[0.02] hover:border-[#D4AF37] transition-colors"
          >
            <h2 className="text-2xl font-serif mb-2">{isEn ? 'Social content' : 'Contenido social'}</h2>
            <p className="text-gray-400 text-sm">{isEn ? 'Photos, reels, carousels, and stories with consistent narrative, profile optimisation, and content calendar.' : 'Fotos, reels, carruseles y stories con narrativa consistente, optimización de perfil y calendario de contenido.'}</p>
          </Link>

          <Link
            href={serviceHubHref}
            className="border border-white/10 p-6 bg-white/[0.02] hover:border-[#D4AF37] transition-colors"
          >
            <h2 className="text-2xl font-serif mb-2">{isEn ? 'View full catalogue' : 'Ver catálogo completo'}</h2>
            <p className="text-gray-400 text-sm">{isEn ? 'Review social content, digital strategy, branding, and web support services.' : 'Revisa servicios de contenido social, estrategia digital, branding y soporte web.'}</p>
          </Link>
        </div>
      </section>
    </main>
  );
}
