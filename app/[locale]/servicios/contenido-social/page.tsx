import type { Metadata } from 'next';
import ContenidoSocialPageClient from './ContenidoSocialPageClient.tsx';

type Props = {
  params: Promise<{ locale: string }>;
};

const faqs = [
  {
    q: '¿Incluye la estrategia o solo producción?',
    a: 'Incluye estrategia social aplicada: pilares, series, calendario y lineamientos por formato. No hacemos producción aislada sin dirección narrativa.',
  },
  {
    q: '¿Cuántas piezas entregan por mes?',
    a: 'Depende del alcance mensual acordado. Definimos una combinación clara de fotos, reels, carruseles y stories, con entregables y frecuencia desde el inicio.',
  },
  {
    q: '¿Ustedes publican o entregan para que mi equipo publique?',
    a: 'Podemos entregar piezas listas para publicar o apoyar publicación programada, según tu operación. El alcance se define antes de iniciar.',
  },
  {
    q: '¿Incluyen optimización del perfil y highlights?',
    a: 'Sí. Incluimos optimización continua del perfil de Instagram: bio, highlights, portadas, orden visual del grid, enlaces y fijados con intención.',
  },
  {
    q: '¿Trabajan solo Instagram o también TikTok?',
    a: 'Principalmente trabajamos Instagram. También podemos adaptar contenido para TikTok cuando la estrategia de la marca lo requiere.',
  },
  {
    q: '¿Qué necesitan de mi marca para iniciar?',
    a: 'Necesitamos objetivos, referencias visuales, lineamientos de marca, contexto comercial, productos o servicios prioritarios y acceso al perfil.',
  },
  {
    q: '¿Cómo se aprueba el contenido?',
    a: 'Trabajamos por bloques de aprobación: propuesta de calendario, guiones o conceptos clave, luego revisión final de piezas antes de publicación.',
  },
  {
    q: '¿Incluyen edición, subtítulos y diseño de carruseles?',
    a: 'Sí, dentro del alcance acordado. Incluye edición de video, subtítulos, diseño de covers y estructura visual para carruseles.',
  },
  {
    q: '¿Se puede producir contenido para campañas específicas?',
    a: 'Sí. Además de operación mensual, trabajamos contenido por campaña para lanzamientos, temporadas, promociones y eventos clave.',
  },
  {
    q: '¿Cómo miden qué funciona y qué se ajusta?',
    a: 'Revisamos señales clave de desempeño por formato y mensaje. Con esos aprendizajes iteramos hooks, estructura, ritmo visual y calendario.',
  },
];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const pageUrl = `https://sassystudio.com.mx/${locale}/servicios/contenido-social`;

  return {
    title: 'Contenido social premium (Reels, carruseles y stories) | Sassy Studio',
    description:
      'Fotos, reels, carruseles y stories con narrativa consistente. Optimización continua del perfil para un feed intencional y premium.',
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: 'https://sassystudio.com.mx/servicios/contenido-social',
      languages: {
        'es-MX': 'https://sassystudio.com.mx/es/servicios/contenido-social',
        'en-US': 'https://sassystudio.com.mx/en/servicios/contenido-social',
      },
    },
    openGraph: {
      title: 'Contenido social premium (Reels, carruseles y stories) | Sassy Studio',
      description:
        'Fotos, reels, carruseles y stories con narrativa consistente. Optimización continua del perfil para un feed intencional y premium.',
      url: pageUrl,
      type: 'website',
      locale: locale === 'en' ? 'en_US' : 'es_MX',
      siteName: 'Sassy Studio',
      images: [
        {
          url: 'https://res.cloudinary.com/ds86m2xm0/image/upload/f_auto,q_auto/v1770517992/7_rqcm14.webp',
          width: 1200,
          height: 630,
          alt: 'Contenido social premium para marcas',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Contenido social premium (Reels, carruseles y stories) | Sassy Studio',
      description:
        'Fotos, reels, carruseles y stories con narrativa consistente. Optimización continua del perfil para un feed intencional y premium.',
      images: ['https://res.cloudinary.com/ds86m2xm0/image/upload/f_auto,q_auto/v1770517992/7_rqcm14.webp'],
    },
  };
}

export default async function ContenidoSocialPage({ params }: Props) {
  const { locale } = await params;
  const pageUrl = `https://sassystudio.com.mx/${locale}/servicios/contenido-social`;

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Contenido social',
    serviceType: 'Contenido social',
    description:
      'Servicio de contenido social para marcas: fotos, reels, carruseles y stories con narrativa consistente, optimización continua del perfil y calendario de contenido.',
    inLanguage: 'es-MX',
    areaServed: {
      '@type': 'Country',
      name: 'MX',
    },
    audience: {
      '@type': 'BusinessAudience',
      audienceType: 'Marcas y negocios',
    },
    provider: {
      '@type': 'Organization',
      name: 'Sassy Studio',
      url: 'https://sassystudio.com.mx',
    },
    url: pageUrl,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Entregables de contenido social',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Fotos para feed y anuncios',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Reels para marcas',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Carruseles para Instagram',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Stories para negocios',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Optimización de perfil de Instagram',
          },
        },
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
      <ContenidoSocialPageClient locale={locale} faqs={faqs} />
    </>
  );
}
