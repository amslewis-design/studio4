#!/usr/bin/env node

import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { createClient } from '@supabase/supabase-js';

const CONTENT_ROOT = path.join(process.cwd(), 'content', 'blog');
const POSTS_ROOT = path.join(CONTENT_ROOT, 'posts');
const REDIRECTS_FILE = path.join(CONTENT_ROOT, 'legacy-redirects.json');

const KNOWN_ORPHAN_BLOG_SLUGS = {
  'cmo-el-contenido-visual-influye-en-la-decisin-de-reserva': {
    locale: 'es',
    slug: 'how-visual-content-shapes-booking-decisions-es',
  },
  'por-qu-el-storytelling-vende-ms-habitaciones-que-los-descuentos': {
    locale: 'es',
    slug: 'storytelling-vs-discounts-es',
  },
};

function legacySlugify(value) {
  return value
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
    .slice(0, 100);
}

function normalizedSlugify(value) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
    .slice(0, 100);
}

function safeYamlValue(value) {
  if (value === null || value === undefined) {
    return '""';
  }

  const str = String(value);
  return JSON.stringify(str);
}

function postToFrontmatter(post) {
  const lines = [
    '---',
    `title: ${safeYamlValue(post.title)}`,
    `slug: ${safeYamlValue(post.slug)}`,
    `translation_group_id: ${post.translation_group_id ? safeYamlValue(post.translation_group_id) : 'null'}`,
    `seo_title: ${post.seo_title ? safeYamlValue(post.seo_title) : '""'}`,
    `seo_description: ${post.seo_description ? safeYamlValue(post.seo_description) : '""'}`,
    `excerpt: ${post.excerpt ? safeYamlValue(post.excerpt) : '""'}`,
    `category: ${post.tag ? safeYamlValue(post.tag) : safeYamlValue('Updates')}`,
    `image: ${post.cover_url ? safeYamlValue(post.cover_url) : '""'}`,
    `published: ${post.published === true ? 'true' : 'false'}`,
    `published_at: ${post.published_at ? safeYamlValue(post.published_at) : '""'}`,
    `author: ${post.author ? safeYamlValue(post.author) : safeYamlValue('Sassy Studio')}`,
    `language: ${safeYamlValue(post.language === 'en' ? 'en' : 'es')}`,
    '---',
    '',
  ];

  return `${lines.join('\n')}${post.content || ''}\n`;
}

async function ensureContentFolders() {
  await fs.mkdir(path.join(POSTS_ROOT, 'es'), { recursive: true });
  await fs.mkdir(path.join(POSTS_ROOT, 'en'), { recursive: true });
}

async function readExistingRedirects() {
  try {
    const raw = await fs.readFile(REDIRECTS_FILE, 'utf8');
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

async function writeRedirects(redirects) {
  const orderedEntries = Object.entries(redirects).sort(([a], [b]) => a.localeCompare(b));
  const ordered = Object.fromEntries(orderedEntries);
  await fs.writeFile(REDIRECTS_FILE, `${JSON.stringify(ordered, null, 2)}\n`, 'utf8');
}

function parseArgs() {
  const args = new Set(process.argv.slice(2));
  return {
    overwrite: args.has('--overwrite'),
  };
}

async function main() {
  const { overwrite } = parseArgs();

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error('Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY.');
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Failed to fetch published posts:', error.message);
    process.exit(1);
  }

  await ensureContentFolders();

  const redirects = await readExistingRedirects();
  let writtenCount = 0;

  for (const post of data || []) {
    const locale = post.language === 'en' ? 'en' : 'es';
    const slug = (post.slug || normalizedSlugify(post.title || '') || '').trim();
    if (!slug) {
      continue;
    }

    const filePath = path.join(POSTS_ROOT, locale, `${slug}.md`);

    if (!overwrite) {
      try {
        await fs.access(filePath);
        console.log(`Skipping existing file: ${path.relative(process.cwd(), filePath)}`);
        continue;
      } catch {
        // File does not exist and can be created.
      }
    }

    await fs.writeFile(filePath, postToFrontmatter({ ...post, slug }), 'utf8');
    writtenCount += 1;

    const aliases = new Set([
      legacySlugify(post.title || ''),
      normalizedSlugify(post.title || ''),
    ]);

    for (const alias of aliases) {
      if (!alias || alias === slug) {
        continue;
      }

      redirects[alias] = { locale, slug };
    }
  }

  for (const [oldSlug, target] of Object.entries(KNOWN_ORPHAN_BLOG_SLUGS)) {
    redirects[oldSlug] = target;
  }

  await writeRedirects(redirects);

  console.log(`Export complete. Wrote ${writtenCount} files.`);
  console.log(`Redirect map updated at ${path.relative(process.cwd(), REDIRECTS_FILE)}.`);
}

main().catch((error) => {
  console.error('Unexpected export error:', error);
  process.exit(1);
});
