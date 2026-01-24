export function generateWebSiteSchema(locale: string) {
  const baseUrl = 'https://studio4.vercel.app';
  const isSpanish = locale === 'es';

  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${baseUrl}/#website`,
    url: `${baseUrl}/${locale}`,
    name: 'Sassy Studio',
    description: isSpanish
      ? 'Marketing de Contenido Hotelero de Lujo en CDMX'
      : 'Luxury Hospitality Content Marketing in Mexico City',
    publisher: {
      '@id': `${baseUrl}/#organization`,
    },
    inLanguage: locale === 'es' ? 'es-MX' : 'en-US',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/${locale}/blog?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}
