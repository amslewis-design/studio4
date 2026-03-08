export type SeoRouteKey =
  | 'home'
  | 'blogIndex'
  | 'portfolioIndex'
  | 'faq'
  | 'servicesHub'
  | 'acapulco'
  | 'coyoacan'
  | 'cuernavaca'
  | 'mexicoCity'
  | 'servicioContenidoSocial'
  | 'servicioEstrategiaDigital'
  | 'servicioProduccionEditorial';

export type SeoRoutePair = {
  en: string;
  es: string;
  xDefault?: string;
};

export const SEO_ROUTE_MAP: Record<SeoRouteKey, SeoRoutePair> = {
  home: {
    en: '/en',
    es: '/es',
    xDefault: '/es',
  },
  blogIndex: {
    en: '/en/blog',
    es: '/es/blog',
    xDefault: '/en/blog',
  },
  portfolioIndex: {
    en: '/en/portfolio',
    es: '/es/portfolio',
    xDefault: '/en/portfolio',
  },
  faq: {
    en: '/en/faq',
    es: '/es/faq',
    xDefault: '/en/faq',
  },
  servicesHub: {
    en: '/en/services',
    es: '/es/servicios',
    xDefault: '/en/services',
  },
  acapulco: {
    en: '/en/acapulco',
    es: '/es/acapulco',
    xDefault: '/en/acapulco',
  },
  coyoacan: {
    en: '/en/coyoacan',
    es: '/es/coyoacan',
    xDefault: '/en/coyoacan',
  },
  cuernavaca: {
    en: '/en/cuernavaca',
    es: '/es/cuernavaca',
    xDefault: '/en/cuernavaca',
  },
  mexicoCity: {
    en: '/en/mexico-city',
    es: '/es/mexico-city',
    xDefault: '/en/mexico-city',
  },
  servicioContenidoSocial: {
    en: '/en/servicios/contenido-social',
    es: '/es/servicios/contenido-social',
    xDefault: '/en/servicios/contenido-social',
  },
  servicioEstrategiaDigital: {
    en: '/en/servicios/estrategia-digital',
    es: '/es/servicios/estrategia-digital',
    xDefault: '/en/servicios/estrategia-digital',
  },
  servicioProduccionEditorial: {
    en: '/en/servicios/produccion-editorial',
    es: '/es/servicios/produccion-editorial',
    xDefault: '/en/servicios/produccion-editorial',
  },
};
