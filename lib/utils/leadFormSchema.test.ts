import test from 'node:test';
import assert from 'node:assert/strict';

import { LeadFormSchema, normalizeLeadSubmission } from './leadFormSchema.ts';

test('trims whitespace before validating optional fields and honeypot values', () => {
  const payload = {
    name: '  Test Name  ',
    email: ' test@example.com ',
    brand: '  Sassy Studio  ',
    projectType: '  Brand strategy  ',
    message: '   This is a valid message.   ',
    website: '  https://example.com  ',
    locale: ' es ',
    source: '  homepage  ',
    companyWebsite: '     ',
  };

  const normalized = normalizeLeadSubmission(payload);
  const result = LeadFormSchema.safeParse(normalized);

  assert.equal(result.success, true, result.success ? 'expected validation to pass' : result.error?.issues.map((issue) => issue.message).join('; '));
});

test('rejects a non-empty honeypot value', () => {
  const payload = {
    name: 'Test Name',
    email: 'test@example.com',
    message: 'This is a valid message.',
    locale: 'es',
    source: 'homepage',
    companyWebsite: 'https://spam.example',
  };

  const result = LeadFormSchema.safeParse(normalizeLeadSubmission(payload));

  assert.equal(result.success, false);
});
