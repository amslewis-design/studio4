export function generateServiceSchemas(locale: string) {
  const baseUrl = 'https://www.sassystudio.com.mx';
  const isSpanish = locale === 'es';

  const services = isSpanish
    ? [
        {
          name: 'Alquimia Visual',
          description:
            'Fotografía hotelera y gastronómica de alta resolución que captura la esencia del lujo.',
          serviceType: 'Photography Services',
        },
        {
          name: 'Narrativas Digitales',
          description:
            'Producción estratégica de Reels y TikTok diseñada para maximizar el prestigio de tu marca.',
          serviceType: 'Social Media Marketing',
        },
        {
          name: 'Refinamiento de Identidad',
          description:
            'Posicionamiento de marca a la medida para el mercado exclusivo de hospitalidad en la CDMX.',
          serviceType: 'Brand Strategy',
        },
      ]
    : [
        {
          name: 'Visual Alchemy',
          description:
            'High-resolution hotel and gastronomy photography that captures the essence of luxury.',
          serviceType: 'Photography Services',
        },
        {
          name: 'Digital Narratives',
          description:
            'Strategic Reels and TikTok production designed to maximize your brand prestige.',
          serviceType: 'Social Media Marketing',
        },
        {
          name: 'Identity Refinement',
          description:
            'Bespoke brand positioning for the exclusive hospitality market in Mexico City.',
          serviceType: 'Brand Strategy',
        },
      ];

  return services.map((service, index) => ({
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${baseUrl}/#service-${index + 1}`,
    serviceType: service.serviceType,
    name: service.name,
    description: service.description,
    provider: {
      '@id': `${baseUrl}/#organization`,
    },
    areaServed: {
      '@type': 'Country',
      name: 'Mexico',
    },
    audience: {
      '@type': 'Audience',
      audienceType: 'Boutique Hotels, Luxury Restaurants, Lifestyle Brands',
    },
  }));
}
