# File-Based Blog Content

This directory is the source of truth for blog posts.

## Structure

- `posts/es/*.md`: Spanish posts
- `posts/en/*.md`: English posts
- `legacy-redirects.json`: Legacy slug redirects to canonical localized slugs

## Frontmatter

Use this schema in each Markdown file:

```yaml
---
title: "Post title"
slug: "post-slug"
translation_group_id: "shared-translation-id-or-null"
seo_title: "Optional SEO title"
seo_description: "Optional SEO description"
excerpt: "Short excerpt"
category: "Category"
image: "https://..."
published: true
published_at: "2026-04-01T12:00:00.000Z"
author: "Sassy Studio"
language: "es"
---
```

Body content supports Markdown and embedded HTML.

## Migration Utility

Export published posts from Supabase to this structure:

```bash
npm run export:blog
```

Flags:

- `--overwrite`: overwrite existing post files

Example:

```bash
node scripts/export-blog-posts.mjs --overwrite
```
