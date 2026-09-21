import { z } from 'zod';

const normalizeText = (value: unknown): string => {
  if (value === null || value === undefined) return '';
  if (typeof value === 'string') return value.trim();
  if (typeof value === 'number' || typeof value === 'boolean') return String(value).trim();
  return '';
};

export function normalizeLeadSubmission(raw: Record<string, unknown>) {
  const source = raw ?? {};

  return {
    ...source,
    name: normalizeText(source.name),
    email: normalizeText(source.email),
    brand: normalizeText(source.brand),
    projectType: normalizeText(source.projectType),
    message: normalizeText(source.message),
    website: normalizeText(source.website),
    locale: normalizeText(source.locale),
    source: normalizeText(source.source),
    companyWebsite: normalizeText(source.companyWebsite),
  };
}

export const LeadFormSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .trim(),
  email: z.string()
    .email('Invalid email address')
    .max(255, 'Email must be less than 255 characters')
    .transform((value) => value.trim()),
  brand: z.string()
    .max(100, 'Brand must be less than 100 characters')
    .trim()
    .optional()
    .default(''),
  projectType: z.string()
    .max(100, 'Project type must be less than 100 characters')
    .trim()
    .optional()
    .default(''),
  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(5000, 'Message must be less than 5000 characters')
    .trim(),
  website: z.string()
    .max(255, 'Website must be less than 255 characters')
    .trim()
    .optional()
    .default(''),
  locale: z.enum(['en', 'es'])
    .optional()
    .default('es')
    .transform((value) => value.trim()),
  source: z.string()
    .max(60, 'Source must be less than 60 characters')
    .trim()
    .optional()
    .default(''),
  companyWebsite: z.preprocess(
    (value) => normalizeText(value),
    z.string().max(0, 'Invalid submission').optional().default('')
  ),
});
