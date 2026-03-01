import type { Metadata } from 'next';
import EstrategiaDigitalPageClient from './EstrategiaDigitalPageClient';

type Props = {
  params: Promise<{ locale: string }>;
};

const faqsEs = [
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

const faqsEn = [
  {
    q: 'Does this include a full website redesign?',
    a: 'Not necessarily. We prioritise high-impact improvements on your existing structure first. If a redesign is needed, we scope it as an additional phase.',
  },
  {
    q: 'How quickly can we see improvements?',
    a: 'Quick wins are usually visible within 2 to 4 weeks, depending on site condition, implementation speed, and adjustment volume.',
  },
  {
    q: 'Do you work project-based or monthly?',
    a: 'Both. Project mode for audit and action plan, and monthly mode for continuous optimisation and campaign support.',
  },
  {
    q: 'Do you include technical maintenance (updates, fixes)?',
    a: 'Yes, within the agreed website maintenance scope: fixes, functionality checks, and ongoing improvements.',
  },
  {
    q: 'Who publishes the blog and in which CMS?',
    a: 'We can publish directly in your current CMS or deliver structured content for your team. We define the workflow based on your internal operation.',
  },
  {
    q: 'Can you run newsletters if our database is not clean?',
    a: 'Yes. We first recommend a basic clean-up and segmentation step to protect deliverability and improve early results.',
  },
  {
    q: 'How do you define and improve CTAs?',
    a: 'We align CTAs to user intent, journey stage, and business objective, then iterate based on behaviour and conversion signals.',
  },
  {
    q: 'Do you include SEO?',
    a: 'Yes. We include operational on-page SEO: structure, interlinking, headings, metadata, and search-intent alignment.',
  },
  {
    q: 'Can you support campaigns without ad spend?',
    a: 'Yes. We can design and optimise the organic side of campaigns: landing pages, messaging, newsletter flow, and conversion structure.',
  },
  {
    q: 'What do you need from our team?',
    a: 'Access, business priorities, commercial calendar, and timely feedback. With that, we run clear optimisation cycles.',
  },
];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';
  const pageUrl = `https://www.sassystudio.com.mx/${locale}/servicios/estrategia-digital`;

  const title = isEn
    ? 'Digital strategy for website, content and campaigns | Sassy Studio'
    : 'Estrategia digital para web, contenido y campañas | Sassy Studio';

  const description = isEn
    ? 'Website maintenance and optimisation, UX, blog and newsletter, internal linking and CTAs. Support for campaigns, launches and seasonal windows.'
    : 'Mantenimiento y optimización web, UX, blog y newsletter, estructura de enlaces y CTAs. Soporte para campañas, lanzamientos y temporadas.';

  return {
    title,
    description,
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: pageUrl,
      languages: {
        'es-MX': 'https://www.sassystudio.com.mx/es/servicios/estrategia-digital',
        'en-GB': 'https://www.sassystudio.com.mx/en/servicios/estrategia-digital',
        'x-default': 'https://www.sassystudio.com.mx/en/servicios/estrategia-digital',
      },
    },
    openGraph: {
      title,
      description,
      url: pageUrl,
      type: 'website',
      locale: locale === 'en' ? 'en_GB' : 'es_MX',
      siteName: 'Sassy Studio',
      images: [
        {
          url: 'https://www.sassystudio.com.mx/og-home.jpg',
          width: 1200,
          height: 630,
          alt: isEn ? 'Digital strategy for brands' : 'Estrategia digital para marcas',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://www.sassystudio.com.mx/og-home.jpg'],
    },
  };
}

export default async function EstrategiaDigitalPage({ params }: Props) {
  const { locale } = await params;
  const isEn = locale === 'en';
  const url = `https://www.sassystudio.com.mx/${locale}/servicios/estrategia-digital`;
  const faqs = isEn ? faqsEn : faqsEs;

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: isEn ? 'Digital strategy' : 'Estrategia digital',
    serviceType: isEn ? 'Digital strategy for brands' : 'Estrategia digital para marcas',
    description: isEn
      ? 'Digital strategy for brands with website maintenance, website optimisation, UX improvements, internal linking structure, CTAs, blog, newsletter and campaign support.'
      : 'Estrategia digital para marcas con mantenimiento web, optimización web, mejoras UX, estructura de enlaces internos, CTAs, blog, newsletter y soporte para campañas.',
    inLanguage: isEn ? 'en-GB' : 'es-MX',
    areaServed: {
      '@type': 'Country',
      name: 'MX',
    },
    audience: {
      '@type': 'BusinessAudience',
      audienceType: isEn ? 'Brands and businesses' : 'Marcas y empresas',
    },
    provider: {
      '@type': 'Organization',
      name: 'Sassy Studio',
      url: 'https://www.sassystudio.com.mx',
    },
    url,
    offers: {
      '@type': 'OfferCatalog',
      name: isEn ? 'Digital strategy engagement models' : 'Modalidades de estrategia digital',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: isEn ? 'Audit project and action plan' : 'Proyecto de diagnóstico y plan de acción',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: isEn ? 'Monthly optimisation support' : 'Acompañamiento mensual de optimización',
          },
        },
      ],
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: isEn ? 'en-GB' : 'es-MX',
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
