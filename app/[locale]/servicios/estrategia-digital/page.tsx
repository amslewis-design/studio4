import type { Metadata } from 'next';
import EstrategiaDigitalPageClient from './EstrategiaDigitalPageClient';

type Props = {
  params: Promise<{ locale: string }>;
};

const faqs = [
  {
    q: '¿Esto incluye rediseño completo del sitio?',
    a: 'No necesariamente. Primero priorizamos mejoras de alto impacto sobre la estructura actual. Si se requiere rediseño, lo planteamos como fase adicional.',
  },
  {
    q: '¿Qué tan rápido se ven mejoras?',
    a: 'Los quick wins suelen verse en 2 a 4 semanas, dependiendo del estado del sitio, la velocidad de implementación y el volumen de ajustes.',
  },
  {
    q: '¿Trabajan por proyecto o mensual?',
    a: 'Trabajamos en ambos formatos. Proyecto para auditoría y plan inicial. Mensual para optimización continua y soporte de campañas.',
  },
  {
    q: '¿Incluyen mantenimiento técnico (updates, errores)?',
    a: 'Sí, dentro del alcance de mantenimiento web acordado: ajustes, revisiones de funcionamiento y mejoras continuas.',
  },
  {
    q: '¿Quién publica el blog y en qué CMS?',
    a: 'Podemos publicar directamente en tu CMS actual o entregar contenido estructurado para tu equipo. Definimos el flujo según operación interna.',
  },
  {
    q: '¿Pueden hacerse newsletters si no hay base de datos limpia?',
    a: 'Sí. Primero proponemos una limpieza y segmentación básica para no afectar entregabilidad y mejorar resultados desde los primeros envíos.',
  },
  {
    q: '¿Cómo definen y mejoran los CTAs?',
    a: 'Alineamos CTAs por intención de usuario, etapa del journey y objetivo comercial. Luego iteramos según comportamiento y conversiones.',
  },
  {
    q: '¿Incluyen SEO?',
    a: 'Sí, incluimos SEO on-page operativo: estructura, interlinking, headings, metadata y alineación de contenido con intención de búsqueda.',
  },
  {
    q: '¿Pueden apoyar campañas sin pauta?',
    a: 'Sí. Podemos diseñar y optimizar la parte orgánica de campañas: landings, mensajes, newsletter y estructura de conversión.',
  },
  {
    q: '¿Qué necesitan de mi equipo?',
    a: 'Accesos, prioridades de negocio, calendario comercial y feedback ágil. Con eso avanzamos con ciclos de mejora claros.',
  },
];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const pageUrl = `https://sassystudio.com.mx/${locale}/servicios/estrategia-digital`;

  return {
    title: 'Estrategia digital para web, contenido y campañas | Sassy Studio',
    description:
      'Mantenimiento y optimización web, UX, blog y newsletter, estructura de enlaces y CTAs. Soporte para campañas, lanzamientos y temporadas.',
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: 'https://sassystudio.com.mx/servicios/estrategia-digital',
      languages: {
        'es-MX': 'https://sassystudio.com.mx/es/servicios/estrategia-digital',
        'en-US': 'https://sassystudio.com.mx/en/servicios/estrategia-digital',
      },
    },
    openGraph: {
      title: 'Estrategia digital para web, contenido y campañas | Sassy Studio',
      description:
        'Mantenimiento y optimización web, UX, blog y newsletter, estructura de enlaces y CTAs. Soporte para campañas, lanzamientos y temporadas.',
      url: pageUrl,
      type: 'website',
      locale: locale === 'en' ? 'en_US' : 'es_MX',
      siteName: 'Sassy Studio',
      images: [
        {
          url: 'https://sassystudio.com.mx/og-home.jpg',
          width: 1200,
          height: 630,
          alt: 'Estrategia digital para marcas',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Estrategia digital para web, contenido y campañas | Sassy Studio',
      description:
        'Mantenimiento y optimización web, UX, blog y newsletter, estructura de enlaces y CTAs. Soporte para campañas, lanzamientos y temporadas.',
      images: ['https://sassystudio.com.mx/og-home.jpg'],
    },
  };
}

export default async function EstrategiaDigitalPage({ params }: Props) {
  const { locale } = await params;
  const url = `https://sassystudio.com.mx/${locale}/servicios/estrategia-digital`;

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Estrategia digital',
    serviceType: 'Estrategia digital para marcas',
    description:
      'Estrategia digital para marcas con mantenimiento web, optimización web, mejoras UX, estructura de enlaces internos, CTAs, blog, newsletter y soporte para campañas.',
    inLanguage: 'es-MX',
    areaServed: {
      '@type': 'Country',
      name: 'MX',
    },
    audience: {
      '@type': 'BusinessAudience',
      audienceType: 'Marcas y empresas',
    },
    provider: {
      '@type': 'Organization',
      name: 'Sassy Studio',
      url: 'https://sassystudio.com.mx',
    },
    url,
    offers: {
      '@type': 'OfferCatalog',
      name: 'Modalidades de estrategia digital',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Proyecto de diagnóstico y plan de acción' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Acompañamiento mensual de optimización' } },
      ],
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
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
      <EstrategiaDigitalPageClient locale={locale} faqs={faqs} />
    </>
  );
}
