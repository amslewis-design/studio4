export function generateOrganizationSchema(locale: string) {
  const baseUrl = 'https://studio4.vercel.app';
  const isSpanish = locale === 'es';

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${baseUrl}/#organization`,
    name: 'Sassy Studio',
    alternateName: 'Sassy Studio CDMX',
    url: `${baseUrl}/${locale}`,
    logo: {
      '@type': 'ImageObject',
      url: `${baseUrl}/Sassy-studio_Color.png`,
      width: 512,
      height: 512,
    },
    image: `${baseUrl}/Sassy-studio_Color.png`,
    description: isSpanish
      ? 'Especialistas en contenido para hoteles y restaurantes boutique en la CDMX. Fotografía de lujo, reels y estrategia de marca que transforman la hospitalidad en oro digital.'
      : 'Specialists in content for boutique hotels and restaurants in Mexico City. Luxury photography, reels and brand strategy that transform hospitality into digital gold.',
    slogan: isSpanish ? 'Alquimistas del Contenido' : 'Content Alchemists',
    areaServed: {
      '@type': 'Country',
      name: 'Mexico',
    },
    email: 'contacto@sassystudio.com.mx',
    sameAs: ['https://www.instagram.com/sassydigitalcontent/'],
    knowsAbout: [
      'Hospitality Marketing',
      'Luxury Content Creation',
      'Hotel Photography',
      'Restaurant Photography',
      'Social Media Marketing',
      'Brand Strategy',
      'Digital Content',
    ],
    inLanguage: [
      {
        '@type': 'Language',
        name: 'Spanish',
        alternateName: 'es',
      },
      {
        '@type': 'Language',
        name: 'English',
        alternateName: 'en',
      },
    ],
  };
}
