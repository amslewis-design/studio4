import type { Metadata } from 'next';
import ProduccionEditorialPageClient from './ProduccionEditorialPageClient';

type Props = {
  params: Promise<{ locale: string }>;
};

const serviceFaqsEs = [
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

const serviceFaqsEn = [
  {
    q: 'What is included in pre-production?',
    a: 'It includes brief alignment, channel goals, moodboard, shot list, logistics, timeline, and styling guidelines so production runs efficiently and consistently.',
  },
  {
    q: 'How many photos and videos do you deliver?',
    a: 'It depends on scope. We define an estimated range per production block and confirm final deliverables in your proposal.',
  },
  {
    q: 'Which formats do you deliver for social and web?',
    a: 'We deliver 9:16, 4:5, 1:1, and 16:9 based on channel needs, plus optimised exports for web/ecommerce and masters for campaigns.',
  },
  {
    q: 'What is your delivery timeline?',
    a: 'Initial delivery is usually within 5 to 10 business days depending on volume. We can also work with phased delivery schedules.',
  },
  {
    q: 'Do you work with models or talent?',
    a: 'Yes. We can coordinate casting, talent, and on-set direction based on campaign needs and budget.',
  },
  {
    q: 'Do you include props or food styling?',
    a: 'Yes, as an add-on or within defined packages. We adjust styling depth to brand goals and publishing channels.',
  },
  {
    q: 'What usage licensing is included?',
    a: 'We define commercial usage by channel, duration, and territory to avoid legal friction in paid campaigns.',
  },
  {
    q: 'Can production happen across multiple locations?',
    a: 'Yes. We design location logistics and route planning to maximise coverage without sacrificing editorial quality.',
  },
  {
    q: 'Do you shoot clean-background ecommerce photos?',
    a: 'Yes. We produce editorial product photography and clean-background variants for ecommerce catalog consistency.',
  },
  {
    q: 'Can you adapt content for Meta/Google ads?',
    a: 'Yes. We produce cutdowns and channel-specific versions by duration, framing, and message.',
  },
];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = 'https://www.sassystudio.com.mx';
  const canonicalUrl = `${baseUrl}/${locale}/servicios/produccion-editorial`;
  const isEn = locale === 'en';

  const metaTitle = isEn
    ? 'Editorial production (Photo + Video) for brands | Sassy Studio'
    : 'Producción editorial (Foto + Video) para marcas | Sassy Studio';

  const metaDescription = isEn
    ? 'Editorial photo and video for spaces, product, and gastronomy. Content ready for social, web, and campaigns with creative direction and agile delivery.'
    : 'Foto y video editorial para espacios, producto y gastronomía. Contenido listo para redes, web y campañas. Dirección creativa y entrega ágil.';

  return {
    title: metaTitle,
    description: metaDescription,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'es-MX': `${baseUrl}/es/servicios/produccion-editorial`,
        'en-GB': `${baseUrl}/en/servicios/produccion-editorial`,
      },
    },
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: canonicalUrl,
      locale: locale === 'es' ? 'es_MX' : 'en_GB',
      type: 'website',
      siteName: 'Sassy Studio',
      images: [
        {
          url: `${baseUrl}/og-home.jpg`,
          width: 1200,
          height: 630,
          alt: isEn ? 'Editorial production (Photo + Video) for brands' : 'Producción editorial (Foto + Video) para marcas',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDescription,
      images: [`${baseUrl}/og-home.jpg`],
    },
  };
}

export default async function ProduccionEditorialPage({ params }: Props) {
  const { locale } = await params;
  const baseUrl = 'https://www.sassystudio.com.mx';
  const pageUrl = `${baseUrl}/${locale}/servicios/produccion-editorial`;
  const isEn = locale === 'en';
  const serviceFaqs = isEn ? serviceFaqsEn : serviceFaqsEs;

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: isEn ? 'Editorial production (Photo + Video)' : 'Producción editorial (Foto + Video)',
    serviceType: isEn ? 'Editorial photo and video production' : 'Producción editorial foto y video',
    description: isEn
      ? 'Editorial photo and video production for brands: spaces, product, gastronomy, and moments. Optimised deliverables for social media, web, and campaigns.'
      : 'Producción editorial foto y video para marcas: espacios, producto, gastronomía y momentos. Entregables optimizados para redes sociales, web y campañas.',
    areaServed: {
      '@type': 'Country',
      name: 'México',
    },
    inLanguage: isEn ? 'en-GB' : 'es-MX',
    provider: {
      '@type': 'Organization',
      name: 'Sassy Studio',
      url: `${baseUrl}/${locale}`,
    },
    url: pageUrl,
    offers: {
      '@type': 'OfferCatalog',
      name: isEn ? 'Editorial production packages' : 'Paquetes de producción editorial',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: isEn ? 'Essential content (half-day)' : 'Contenido esencial (half-day)' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: isEn ? 'Campaign (full-day)' : 'Campaña (full-day)' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: isEn ? 'Monthly library' : 'Library mensual' } },
      ],
    },
    hasPart: [
      {
        '@type': 'CreativeWork',
        headline: isEn ? 'Premium hospitality case' : 'Caso hospitalidad premium',
        about: isEn ? 'Photo and video for hotels and restaurants' : 'Foto y video para hoteles y restaurantes',
      },
      {
        '@type': 'CreativeWork',
        headline: isEn ? 'Ecommerce product case' : 'Caso ecommerce de producto',
        about: isEn ? 'Editorial product photography and ecommerce content' : 'Fotografía de producto editorial y contenido para ecommerce',
      },
      {
        '@type': 'CreativeWork',
        headline: isEn ? 'High-ticket gastronomy case' : 'Caso gastronomía de alto ticket',
        about: isEn ? 'Professional food photography and editorial social video' : 'Fotografía gastronómica profesional y video editorial para redes sociales',
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
