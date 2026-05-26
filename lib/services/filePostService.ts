import 'server-only';

import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
import MarkdownIt from 'markdown-it';
import type { Post } from '@/lib/types';
import { normalizeRawSlug, slugVariants, slugsMatch } from '@/lib/utils/blogSlug';

type BlogLocale = 'es' | 'en';

interface BlogFrontmatter {
  title?: string;
  slug?: string;
  translation_group_id?: string | null;
  translationId?: string | null;
  seo_title?: string;
  seoTitle?: string;
  seo_description?: string;
  seoDescription?: string;
  excerpt?: string;
  category?: string;
  image?: string;
  published?: boolean;
  published_at?: string;
  publishedAt?: string;
  author?: string;
  language?: BlogLocale;
  created_at?: string;
  createdAt?: string;
  updated_at?: string;
  updatedAt?: string;
}

const BLOG_LOCALES: readonly BlogLocale[] = ['es', 'en'] as const;
const BLOG_CONTENT_ROOT = path.join(process.cwd(), 'content', 'blog');
const BLOG_POSTS_ROOT = path.join(BLOG_CONTENT_ROOT, 'posts');
const LEGACY_REDIRECTS_FILE = path.join(BLOG_CONTENT_ROOT, 'legacy-redirects.json');

const markdown = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
});

function getString(value: unknown): string | undefined {
  return typeof value === 'string' && value.trim().length > 0 ? value.trim() : undefined;
}

function getBoolean(value: unknown): boolean | undefined {
  return typeof value === 'boolean' ? value : undefined;
}

function removeMdExtension(filename: string): string {
  return filename.replace(/\.(md|mdx)$/i, '');
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

function generateExcerpt(htmlContent: string, maxLength = 160): string {
  const plain = stripHtml(htmlContent);
  if (plain.length <= maxLength) {
    return plain;
  }

  return `${plain.slice(0, maxLength).trim()}...`;
}

function normalizePostDate(value?: string): string | undefined {
  if (!value) {
    return undefined;
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return undefined;
  }

  return date.toISOString();
}

async function readLocaleFiles(locale: BlogLocale): Promise<string[]> {
  const localeDir = path.join(BLOG_POSTS_ROOT, locale);

  try {
    const files = await fs.readdir(localeDir, { withFileTypes: true });
    return files
      .filter((entry) => entry.isFile() && /\.(md|mdx)$/i.test(entry.name))
      .map((entry) => path.join(localeDir, entry.name));
  } catch {
    return [];
  }
}

async function readPostFile(filePath: string, locale: BlogLocale): Promise<Post | null> {
  const raw = await fs.readFile(filePath, 'utf8');
  const parsed = matter(raw);
  const frontmatter = parsed.data as BlogFrontmatter;
  const filenameSlug = removeMdExtension(path.basename(filePath));

  const title = getString(frontmatter.title);
  if (!title) {
    return null;
  }

  const contentHtml = markdown.render(parsed.content || '');
  const published = getBoolean(frontmatter.published) ?? true;
  const postLocale = frontmatter.language && BLOG_LOCALES.includes(frontmatter.language)
    ? frontmatter.language
    : locale;

  const slug = getString(frontmatter.slug) || filenameSlug;
  const publishedAt = normalizePostDate(getString(frontmatter.published_at) || getString(frontmatter.publishedAt));
  const createdAt = normalizePostDate(getString(frontmatter.created_at) || getString(frontmatter.createdAt)) || publishedAt;
  const updatedAt = normalizePostDate(getString(frontmatter.updated_at) || getString(frontmatter.updatedAt));

  return {
    slug,
    translation_group_id: getString(frontmatter.translation_group_id) || getString(frontmatter.translationId) || null,
    title,
    seo_title: getString(frontmatter.seo_title) || getString(frontmatter.seoTitle),
    seo_description: getString(frontmatter.seo_description) || getString(frontmatter.seoDescription),
    content: contentHtml,
    image:
      getString(frontmatter.image) ||
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=1600',
    category: getString(frontmatter.category) || 'Updates',
    excerpt: getString(frontmatter.excerpt) || generateExcerpt(contentHtml, 180),
    published,
    published_at: publishedAt,
    author: getString(frontmatter.author) || 'Sassy Studio',
    created_at: createdAt,
    updated_at: updatedAt,
    language: postLocale,
  };
}

function sortNewestFirst(posts: Post[]): Post[] {
  return [...posts].sort((a, b) => {
    const aTime = new Date(a.published_at || a.created_at || 0).getTime();
    const bTime = new Date(b.published_at || b.created_at || 0).getTime();
    return bTime - aTime;
  });
}

async function getPostsByLocaleInternal(locale: BlogLocale): Promise<Post[]> {
  const files = await readLocaleFiles(locale);
  const parsed = await Promise.all(
    files.map(async (filePath) => {
      try {
        return await readPostFile(filePath, locale);
      } catch {
        return null;
      }
    })
  );

  const posts = parsed.filter((post): post is Post => Boolean(post));
  const visiblePosts = posts.filter((post) => post.published === true);
  return sortNewestFirst(visiblePosts);
}

export type LegacyRedirectTarget = {
  locale: BlogLocale;
  slug: string;
};

export const filePostService = {
  async getPosts(): Promise<Post[]> {
    const [esPosts, enPosts] = await Promise.all([
      getPostsByLocaleInternal('es'),
      getPostsByLocaleInternal('en'),
    ]);

    return sortNewestFirst([...esPosts, ...enPosts]);
  },

  async getPostsByLanguage(locale: BlogLocale): Promise<Post[]> {
    return getPostsByLocaleInternal(locale);
  },

  async getPublishedPostBySlug(slug: string): Promise<Post | null> {
    const normalized = normalizeRawSlug(slug);
    const allPosts = await this.getPosts();

    return (
      allPosts.find((post) => post.slug && slugsMatch(post.slug, normalized)) || null
    );
  },

  async getAllSlugsByLocale(locale: BlogLocale): Promise<string[]> {
    const posts = await getPostsByLocaleInternal(locale);
    return posts.map((post) => post.slug).filter((slug): slug is string => Boolean(slug));
  },

  async getPostBySlugAndLocale(locale: BlogLocale, slug: string): Promise<Post | null> {
    const normalized = normalizeRawSlug(slug);
    const posts = await getPostsByLocaleInternal(locale);

    return (
      posts.find((post) => post.slug && slugsMatch(post.slug, normalized)) || null
    );
  },

  async getTranslation(post: Post, locale: BlogLocale): Promise<Post | null> {
    if (!post.translation_group_id) {
      return null;
    }

    const posts = await getPostsByLocaleInternal(locale);
    return (
      posts.find(
        (candidate) =>
          candidate.translation_group_id === post.translation_group_id &&
          candidate.published === true &&
          Boolean(candidate.slug)
      ) || null
    );
  },

  async getLegacyRedirects(): Promise<Record<string, LegacyRedirectTarget>> {
    try {
      const raw = await fs.readFile(LEGACY_REDIRECTS_FILE, 'utf8');
      const parsed = JSON.parse(raw) as Record<string, LegacyRedirectTarget>;

      const validEntries = Object.entries(parsed).filter(([sourceSlug, target]) => {
        return (
          typeof sourceSlug === 'string' &&
          sourceSlug.length > 0 &&
          target &&
          BLOG_LOCALES.includes(target.locale) &&
          typeof target.slug === 'string' &&
          target.slug.length > 0
        );
      });

      const expandedEntries: Array<[string, LegacyRedirectTarget]> = [];
      for (const [sourceSlug, target] of validEntries) {
        const variants = slugVariants(sourceSlug);
        if (variants.length === 0) {
          continue;
        }

        for (const variant of variants) {
          expandedEntries.push([variant, target]);
        }
      }

      return Object.fromEntries(expandedEntries);
    } catch {
      return {};
    }
  },
};
