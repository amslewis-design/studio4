import type { Metadata } from 'next';
import ProduccionEditorialPageClient from './ProduccionEditorialPageClient';

type Props = {
  params: Promise<{ locale: string }>;
};

const serviceFaqs = [
  {
    q: '¿Qué incluye la preproducción?',
    a: 'Incluye brief, objetivos por canal, moodboard, shot list, logística, cronograma y lineamientos de styling para que la producción sea eficiente y consistente.',
  },
  {
    q: '¿Cuántas fotos y videos entregan?',
    a: 'Depende del alcance. Definimos un rango estimado por bloque de producción y lo cerramos en propuesta con entregables claros por formato y canal.',
  },
  {
    q: '¿En qué formatos entregan para redes y web?',
    a: 'Entregamos 9:16, 4:5, 1:1 y 16:9 según necesidad, además de exportaciones optimizadas para web/ecommerce y masters para campañas.',
  },
  {
    q: '¿Cuánto tarda la entrega?',
    a: 'La entrega inicial suele estar entre 5 y 10 días hábiles según volumen. También podemos trabajar con calendarios de entrega por fases.',
  },
  {
    q: '¿Trabajan con modelos o talento?',
    a: 'Sí. Podemos coordinar casting, talento y dirección en set según el tipo de campaña y presupuesto.',
  },
  {
    q: '¿Incluyen props o food styling?',
    a: 'Sí, como adicional o dentro de paquetes definidos. Ajustamos el nivel de styling al objetivo de marca y al canal de publicación.',
  },
  {
    q: '¿Qué licencias de uso incluyen?',
    a: 'Definimos licencias de uso comercial por canal, duración y territorio para evitar fricción legal en campañas y pauta.',
  },
  {
    q: '¿Se puede producir en varias locaciones?',
    a: 'Sí. Diseñamos la logística por locación y ruta de producción para maximizar cobertura sin perder calidad editorial.',
  },
  {
    q: '¿Hacen fotografía para ecommerce con fondo limpio?',
    a: 'Sí. Producimos fotografía de producto editorial y también variantes para ecommerce con fondo limpio y consistencia de catálogo.',
  },
  {
    q: '¿Pueden adaptar contenido a anuncios (Meta/Google)?',
    a: 'Sí. Generamos cutdowns y versiones por formato para ads, con variantes de duración, encuadre y mensajes.',
  },
];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = 'https://studio4.vercel.app';
  const canonicalUrl = `${baseUrl}/${locale}/servicios/produccion-editorial`;

  return {
    title: 'Producción editorial (Foto + Video) para marcas | Sassy Studio',
    description:
      'Foto y video editorial para espacios, producto y gastronomía. Contenido listo para redes, web y campañas. Dirección creativa y entrega ágil.',
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'es-MX': `${baseUrl}/es/servicios/produccion-editorial`,
        'en-US': `${baseUrl}/en/servicios/produccion-editorial`,
      },
    },
    openGraph: {
      title: 'Producción editorial (Foto + Video) para marcas | Sassy Studio',
      description:
        'Foto y video editorial para espacios, producto y gastronomía. Contenido listo para redes, web y campañas. Dirección creativa y entrega ágil.',
      url: canonicalUrl,
      locale: locale === 'es' ? 'es_MX' : 'en_US',
      type: 'website',
      siteName: 'Sassy Studio',
      images: [
        {
          url: `${baseUrl}/og-home.jpg`,
          width: 1200,
          height: 630,
          alt: 'Producción editorial (Foto + Video) para marcas',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Producción editorial (Foto + Video) para marcas | Sassy Studio',
      description:
        'Foto y video editorial para espacios, producto y gastronomía. Contenido listo para redes, web y campañas. Dirección creativa y entrega ágil.',
      images: [`${baseUrl}/og-home.jpg`],
    },
  };
}

export default async function ProduccionEditorialPage({ params }: Props) {
  const { locale } = await params;
  const baseUrl = 'https://studio4.vercel.app';
  const pageUrl = `${baseUrl}/${locale}/servicios/produccion-editorial`;

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Producción editorial (Foto + Video)',
    serviceType: 'Producción editorial foto y video',
    description:
      'Producción editorial foto y video para marcas: espacios, producto, gastronomía y momentos. Entregables optimizados para redes sociales, web y campañas.',
    areaServed: {
      '@type': 'Country',
      name: 'México',
    },
    inLanguage: 'es-MX',
    provider: {
      '@type': 'Organization',
      name: 'Sassy Studio',
      url: `${baseUrl}/${locale}`,
    },
    url: pageUrl,
    offers: {
      '@type': 'OfferCatalog',
      name: 'Paquetes de producción editorial',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Contenido esencial (half-day)' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Campaña (full-day)' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Library mensual' } },
      ],
    },
    hasPart: [
      {
        '@type': 'CreativeWork',
        headline: 'Caso hospitalidad premium',
        about: 'Foto y video para hoteles y restaurantes',
      },
      {
        '@type': 'CreativeWork',
        headline: 'Caso ecommerce de producto',
        about: 'Fotografía de producto editorial y contenido para ecommerce',
      },
      {
        '@type': 'CreativeWork',
        headline: 'Caso gastronomía de alto ticket',
        about: 'Fotografía gastronómica profesional y video editorial para redes sociales',
      },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: serviceFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <ProduccionEditorialPageClient locale={locale} faqs={serviceFaqs} />
    </>
  );
}
