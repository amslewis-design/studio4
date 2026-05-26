# studio4

## Blog Content Source

Blog posts are now file-based under `content/blog`.

- Spanish posts: `content/blog/posts/es/*.md`
- English posts: `content/blog/posts/en/*.md`
- Legacy slug redirects: `content/blog/legacy-redirects.json`

Run the exporter to migrate published Supabase posts into Markdown files:

```bash
npm run export:blog
```