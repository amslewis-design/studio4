import type { Metadata } from 'next';
import ContenidoSocialPageClient from './ContenidoSocialPageClient.tsx';

type Props = {
  params: Promise<{ locale: string }>;
};

const faqsEs = [
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

const faqsEn = [
  {
    q: 'Does this include strategy, or only production?',
    a: 'It includes applied social strategy: pillars, recurring series, content calendar and format guidelines. We do not deliver stand-alone production without narrative direction.',
  },
  {
    q: 'How many assets do you deliver per month?',
    a: 'It depends on the agreed monthly scope. We define a clear mix of photos, reels, carousels and stories, with deliverables and cadence from the outset.',
  },
  {
    q: 'Do you publish content, or deliver files for my team to publish?',
    a: 'We can deliver publish-ready assets or support scheduled publishing, depending on your operation. Scope is defined before kickoff.',
  },
  {
    q: 'Do you include profile and highlights optimisation?',
    a: 'Yes. We include ongoing Instagram profile optimisation: bio, highlights, covers, grid visual order, links and pinned posts with intent.',
  },
  {
    q: 'Do you work only on Instagram, or TikTok as well?',
    a: 'We primarily work on Instagram. We can also adapt content for TikTok when the brand strategy requires it.',
  },
  {
    q: 'What do you need from my brand to get started?',
    a: 'We need goals, visual references, brand guidelines, commercial context, priority products or services, and profile access.',
  },
  {
    q: 'How is content approved?',
    a: 'We work in approval blocks: calendar proposal, scripts or key concepts, then final asset review before publishing.',
  },
  {
    q: 'Do you include editing, captions and carousel design?',
    a: 'Yes, within the agreed scope. This includes video editing, captions, cover design and visual structure for carousels.',
  },
  {
    q: 'Can you produce content for specific campaigns?',
    a: 'Yes. In addition to monthly operations, we deliver campaign content for launches, seasonal moments, promotions and key events.',
  },
  {
    q: 'How do you measure what works and what to adjust?',
    a: 'We review key performance signals by format and message. With those learnings, we iterate hooks, structure, visual rhythm and calendar.',
  },
];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const pageUrl = `https://www.sassystudio.com.mx/${locale}/servicios/contenido-social`;
  const isEn = locale === 'en';

  const title = isEn
    ? 'Premium social content (Reels, carousels and stories) | Sassy Studio'
    : 'Contenido social premium (Reels, carruseles y stories) | Sassy Studio';

  const description = isEn
    ? 'Photos, reels, carousels and stories with consistent narrative. Ongoing profile optimisation for an intentional, premium feed.'
    : 'Fotos, reels, carruseles y stories con narrativa consistente. Optimización continua del perfil para un feed intencional y premium.';

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
        'es-MX': 'https://www.sassystudio.com.mx/es/servicios/contenido-social',
        'en-GB': 'https://www.sassystudio.com.mx/en/servicios/contenido-social',
      },
    },
    openGraph: {
      title,
      description,
      url: pageUrl,
      type: 'website',
      locale: isEn ? 'en_GB' : 'es_MX',
      siteName: 'Sassy Studio',
      images: [
        {
          url: 'https://res.cloudinary.com/ds86m2xm0/image/upload/f_auto,q_auto/v1770517992/7_rqcm14.webp',
          width: 1200,
          height: 630,
          alt: isEn ? 'Premium social content for brands' : 'Contenido social premium para marcas',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://res.cloudinary.com/ds86m2xm0/image/upload/f_auto,q_auto/v1770517992/7_rqcm14.webp'],
    },
  };
}

export default async function ContenidoSocialPage({ params }: Props) {
  const { locale } = await params;
  const pageUrl = `https://www.sassystudio.com.mx/${locale}/servicios/contenido-social`;
  const isEn = locale === 'en';
  const faqs = isEn ? faqsEn : faqsEs;

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: isEn ? 'Social content' : 'Contenido social',
    serviceType: isEn ? 'Social content' : 'Contenido social',
    description: isEn
      ? 'Social content service for brands: photos, reels, carousels and stories with consistent narrative, ongoing profile optimisation and content calendar.'
      : 'Servicio de contenido social para marcas: fotos, reels, carruseles y stories con narrativa consistente, optimización continua del perfil y calendario de contenido.',
    inLanguage: isEn ? 'en-GB' : 'es-MX',
    areaServed: {
      '@type': 'Country',
      name: 'MX',
    },
    audience: {
      '@type': 'BusinessAudience',
      audienceType: isEn ? 'Brands and businesses' : 'Marcas y negocios',
    },
    provider: {
      '@type': 'Organization',
      name: 'Sassy Studio',
      url: 'https://www.sassystudio.com.mx',
    },
    url: pageUrl,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: isEn ? 'Social content deliverables' : 'Entregables de contenido social',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: isEn ? 'Photos for feed and ads' : 'Fotos para feed y anuncios',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: isEn ? 'Reels for brands' : 'Reels para marcas',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: isEn ? 'Instagram carousels' : 'Carruseles para Instagram',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: isEn ? 'Stories for businesses' : 'Stories para negocios',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: isEn ? 'Instagram profile optimisation' : 'Optimización de perfil de Instagram',
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
