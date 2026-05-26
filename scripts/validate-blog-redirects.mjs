#!/usr/bin/env node

import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';

const ROOT = process.cwd();
const POSTS_ROOT = path.join(ROOT, 'content', 'blog', 'posts');
const REDIRECTS_FILE = path.join(ROOT, 'content', 'blog', 'legacy-redirects.json');
const LOCALES = new Set(['es', 'en']);

function decodeSafe(value) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function normalizeRawSlug(value) {
  return decodeSafe(value).toLowerCase().replace(/\/+$/, '').trim();
}

function normalizeLegacySlug(value) {
  return normalizeRawSlug(value)
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

function normalizeAsciiSlug(value) {
  return normalizeRawSlug(value)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

function slugVariants(value) {
  return [...new Set([normalizeRawSlug(value), normalizeLegacySlug(value), normalizeAsciiSlug(value)])].filter(Boolean);
}

async function listPostFiles() {
  const files = [];
  for (const locale of ['es', 'en']) {
    const localeDir = path.join(POSTS_ROOT, locale);
    let entries = [];
    try {
      entries = await fs.readdir(localeDir, { withFileTypes: true });
    } catch {
      continue;
    }

    for (const entry of entries) {
      if (!entry.isFile() || !/\.(md|mdx)$/i.test(entry.name)) {
        continue;
      }
      files.push({ locale, filePath: path.join(localeDir, entry.name) });
    }
  }
  return files;
}

async function loadCanonicalPosts() {
  const postFiles = await listPostFiles();
  const canonicalByLocaleSlug = new Set();

  for (const { locale, filePath } of postFiles) {
    const raw = await fs.readFile(filePath, 'utf8');
    const parsed = matter(raw);
    const data = parsed.data || {};
    if (data.published === false) {
      continue;
    }

    const slug = typeof data.slug === 'string' && data.slug.trim().length > 0
      ? data.slug.trim()
      : path.basename(filePath).replace(/\.(md|mdx)$/i, '');

    canonicalByLocaleSlug.add(`${locale}:${normalizeRawSlug(slug)}`);
  }

  return canonicalByLocaleSlug;
}

async function main() {
  const redirectsRaw = await fs.readFile(REDIRECTS_FILE, 'utf8');
  const redirects = JSON.parse(redirectsRaw);
  const canonicalSet = await loadCanonicalPosts();

  const issues = [];

  for (const [source, target] of Object.entries(redirects)) {
    if (!target || typeof target !== 'object') {
      issues.push(`Invalid redirect value for source slug: ${source}`);
      continue;
    }

    const locale = target.locale;
    const slug = target.slug;

    if (!LOCALES.has(locale)) {
      issues.push(`Invalid locale for source slug ${source}: ${String(locale)}`);
      continue;
    }

    if (typeof slug !== 'string' || slug.trim().length === 0) {
      issues.push(`Invalid target slug for source slug ${source}`);
      continue;
    }

    const key = `${locale}:${normalizeRawSlug(slug)}`;
    if (!canonicalSet.has(key)) {
      issues.push(`Redirect target missing canonical post: ${source} -> ${locale}/${slug}`);
    }

    for (const variant of slugVariants(source)) {
      if (variant === normalizeRawSlug(slug)) {
        issues.push(`Potential redirect loop: ${source} -> ${locale}/${slug}`);
        break;
      }
    }
  }

  if (issues.length > 0) {
    console.error('Blog redirect validation failed:');
    for (const issue of issues) {
      console.error(`- ${issue}`);
    }
    process.exit(1);
  }

  console.log(`Blog redirect validation passed (${Object.keys(redirects).length} entries checked).`);
}

main().catch((error) => {
  console.error('Unexpected validation error:', error);
  process.exit(1);
});
