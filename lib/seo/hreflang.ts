import type { SeoRoutePair } from '@/lib/seo/routes';

const BASE_URL = 'https://www.sassystudio.com.mx';

type SupportedLocale = 'en' | 'es';

type DynamicAlternateInput = {
  currentPath: string;
  counterpartPath?: string;
  xDefaultPath?: string;
};

function normalizeLocale(locale: string): SupportedLocale {
  return locale === 'en' ? 'en' : 'es';
}

function toAbsoluteUrl(pathOrUrl: string): string {
  if (/^https?:\/\//i.test(pathOrUrl)) {
    return pathOrUrl;
  }

  const normalizedPath = pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`;
  return `${BASE_URL}${normalizedPath}`;
}

export function buildReciprocalHreflangAlternates(locale: string, paths: SeoRoutePair) {
  const normalizedLocale = normalizeLocale(locale);
  const canonicalPath = normalizedLocale === 'en' ? paths.en : paths.es;

  return {
    canonical: toAbsoluteUrl(canonicalPath),
    languages: {
      en: toAbsoluteUrl(paths.en),
      es: toAbsoluteUrl(paths.es),
      'x-default': toAbsoluteUrl(paths.xDefault || paths.en),
    },
  };
}

export function buildDynamicHreflangAlternates(locale: string, input: DynamicAlternateInput) {
  const normalizedLocale = normalizeLocale(locale);
  const currentUrl = toAbsoluteUrl(input.currentPath);
  const counterpartLocale: SupportedLocale = normalizedLocale === 'en' ? 'es' : 'en';
  const languages: Record<string, string> = {
    [normalizedLocale]: currentUrl,
  };

  if (input.counterpartPath) {
    languages[counterpartLocale] = toAbsoluteUrl(input.counterpartPath);
  }

  const xDefaultUrl = input.xDefaultPath
    ? toAbsoluteUrl(input.xDefaultPath)
    : languages.en || currentUrl;

  languages['x-default'] = xDefaultUrl;

  return {
    canonical: currentUrl,
    languages,
  };
}
