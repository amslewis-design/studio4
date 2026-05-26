export function decodeSafe(value: string): string {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

export function normalizeRawSlug(value: string): string {
  return decodeSafe(value).toLowerCase().replace(/\/+$/, '').trim();
}

export function normalizeLegacySlug(value: string): string {
  return normalizeRawSlug(value)
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
    .slice(0, 160);
}

export function normalizeAsciiSlug(value: string): string {
  return normalizeRawSlug(value)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
    .slice(0, 160);
}

export function slugVariants(value: string): string[] {
  const variants = new Set<string>([
    normalizeRawSlug(value),
    normalizeLegacySlug(value),
    normalizeAsciiSlug(value),
  ]);

  return [...variants].filter((variant) => variant.length > 0);
}

export function slugsMatch(left: string, right: string): boolean {
  const leftVariants = new Set(slugVariants(left));
  return slugVariants(right).some((variant) => leftVariants.has(variant));
}
