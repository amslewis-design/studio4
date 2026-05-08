import { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { getTranslations } from 'next-intl/server';
import { supabaseService } from '@/lib/services/supabaseService';
import type { Post } from '@/lib/types';
import { generateArticleSchema, generateBreadcrumbSchema } from '@/lib/schemas';
import { buildDynamicHreflangAlternates } from '@/lib/seo/hreflang';

// Enable ISR - revalidate every hour
export const revalidate = 3600;
// Allow rendering slugs that were not present during build time.
export const dynamicParams = true;

const BLOG_LOCALES = ['en', 'es'] as const;
const KNOWN_ORPHAN_BLOG_SLUGS = new Set<string>([
  'visual-storytelling-por-qu-el-sitio-web-de-tu-hotel-necesita-ms-que-solo-fotos-de-las-habitaciones',
  'visual-storytelling-why-your-hotel-website-needs-more-than-just-room-photos',
  'cmo-el-contenido-visual-influye-en-la-decisin-de-reserva',
  'por-qu-el-storytelling-vende-ms-habitaciones-que-los-descuentos',
]);

function isBlogLocale(value: string): value is 'en' | 'es' {
  return (BLOG_LOCALES as readonly string[]).includes(value);
}

function legacySlugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
    .slice(0, 100);
}

function normalizedSlugify(value: string): string {
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

function findTranslation(post: Post, targetPosts: Post[]): Post | undefined {
  if (!post.translation_group_id) {
    return undefined;
  }

  return targetPosts.find(
    (candidate) =>
      candidate.translation_group_id === post.translation_group_id &&
      candidate.published === true &&
      Boolean(candidate.slug)
  );
}

function matchesLegacyAlias(post: Post, slug: string): boolean {
  if (!post.title) {
    return false;
  }

  const aliases = new Set<string>([
    post.slug || '',
    legacySlugify(post.title),
    normalizedSlugify(post.title),
  ]);

  return aliases.has(slug);
}

function normalizeRequestedSlug(value: string): string {
  try {
    return decodeURIComponent(value).toLowerCase().replace(/\/+$/, '').trim();
  } catch {
    // Some legacy slugs may contain stray '%' characters.
    // Fall back to raw value so one malformed slug does not break all lookups.
    return value.toLowerCase().replace(/\/+$/, '').trim();
  }
}

function findPostBySlug(posts: Post[], requestedSlug: string): Post | undefined {
  const normalizedRequested = normalizeRequestedSlug(requestedSlug);

  return posts.find((post) => {
    if (!post.slug) {
      return false;
    }

    return normalizeRequestedSlug(post.slug) === normalizedRequested;
  });
}

async function resolveLegacyBlogRedirect(
  localeParam: string,
  slug: string
): Promise<{ locale: 'en' | 'es'; slug: string } | null> {
  const normalizedRequestedSlug = normalizeRequestedSlug(slug);
  const locale = isBlogLocale(localeParam) ? localeParam : 'es';
  const counterpartLocale: 'en' | 'es' = locale === 'en' ? 'es' : 'en';

  const [postsInLocale, postsInCounterpartLocale] = await Promise.all([
    supabaseService.getPostsByLanguage(locale),
    supabaseService.getPostsByLanguage(counterpartLocale),
  ]);

  const directLocaleMatch = findPostBySlug(postsInLocale, normalizedRequestedSlug);
  if (directLocaleMatch?.slug) {
    return { locale, slug: directLocaleMatch.slug };
  }

  const directCounterpartMatch = findPostBySlug(postsInCounterpartLocale, normalizedRequestedSlug);
  if (directCounterpartMatch?.slug) {
    return { locale: counterpartLocale, slug: directCounterpartMatch.slug };
  }

  const sameLocaleMatch = postsInLocale.find((post) => matchesLegacyAlias(post, normalizedRequestedSlug));
  if (sameLocaleMatch?.slug && sameLocaleMatch.slug !== normalizedRequestedSlug) {
    return { locale, slug: sameLocaleMatch.slug };
  }

  const counterpartMatch = postsInCounterpartLocale.find((post) => matchesLegacyAlias(post, normalizedRequestedSlug));
  if (!counterpartMatch?.slug) {
    return null;
  }

  const translatedPost = findTranslation(counterpartMatch, postsInLocale);
  if (translatedPost?.slug) {
    return { locale, slug: translatedPost.slug };
  }

  return {
    locale: counterpartLocale,
    slug: counterpartMatch.slug,
  };
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  const locales = ['en', 'es'] as const;
  const params = [];

  for (const locale of locales) {
    try {
      const posts = await supabaseService.getPostsByLanguage(locale);
      const publishedPosts = posts.filter(p => p.published === true);
      
      for (const post of publishedPosts) {
        if (post.slug) {
          params.push({
            locale,
            slug: post.slug,
          });
        }
      }
    } catch (error) {
      console.error(`Failed to generate static params for locale ${locale}:`, error);
    }
  }

  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;

  try {
    const currentLocale: 'es' | 'en' = isBlogLocale(locale) ? locale : 'es';
    const counterpartLocale: 'es' | 'en' = currentLocale === 'es' ? 'en' : 'es';
    const [posts, counterpartPosts] = await Promise.all([
      supabaseService.getPostsByLanguage(currentLocale),
      supabaseService.getPostsByLanguage(counterpartLocale),
    ]);

    const post = findPostBySlug(posts, slug) || findPostBySlug(counterpartPosts, slug);

    if (!post) {
      return {
        title: 'Post Not Found',
        robots: 'noindex',
      };
    }

    const baseUrl = 'https://www.sassystudio.com.mx';
    const postLocale: 'es' | 'en' = post.language === 'en' ? 'en' : 'es';
    const canonicalUrl = `${baseUrl}/${postLocale}/blog/${post.slug}`;
    const postImage = post.image || `${baseUrl}/og-blog.jpg`;
    const seoTitle = post.seo_title || post.title;
    const seoDescription = post.seo_description || post.excerpt || post.content?.substring(0, 160);
    const alternateLocale = postLocale === 'en' ? 'es' : 'en';

    let counterpartPost: Post | undefined;
    if (post.translation_group_id) {
      counterpartPost = (postLocale === currentLocale ? counterpartPosts : posts).find(
        (candidate) =>
          candidate.translation_group_id === post.translation_group_id &&
          candidate.published === true &&
          Boolean(candidate.slug)
      );
    }

    const alternates = buildDynamicHreflangAlternates(locale, {
      currentPath: `/${postLocale}/blog/${post.slug}`,
      counterpartPath: counterpartPost?.slug
        ? `/${alternateLocale}/blog/${counterpartPost.slug}`
        : undefined,
      xDefaultPath: alternateLocale === 'en' && counterpartPost?.slug
        ? `/${alternateLocale}/blog/${counterpartPost.slug}`
        : `/${postLocale}/blog/${post.slug}`,
    });

    return {
      title: seoTitle,
      description: seoDescription,
      keywords: post.category ? [post.category, 'hospitality marketing', 'luxury content'] : undefined,
      openGraph: {
        title: seoTitle,
        description: seoDescription,
        url: canonicalUrl,
        type: 'article',
        locale: postLocale === 'es' ? 'es_MX' : 'en_GB',
        siteName: 'Sassy Studio',
        images: [
          {
            url: postImage,
            width: 1200,
            height: 630,
            alt: post.title,
          },
        ],
        authors: post.author ? [post.author] : undefined,
        publishedTime: post.published_at || post.created_at,
        modifiedTime: post.updated_at || post.created_at,
      },
      twitter: {
        card: 'summary_large_image',
        title: seoTitle,
        description: seoDescription,
        images: [postImage],
      },
      alternates,
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Blog Post | Sassy Studio',
    };
  }
}

async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const normalizedRequestedSlug = normalizeRequestedSlug(slug);
  const tBlog = await getTranslations('blog');

  let post: Post | null = null;

  try {
    const currentLocale: 'es' | 'en' = isBlogLocale(locale) ? locale : 'es';
    const counterpartLocale: 'es' | 'en' = currentLocale === 'es' ? 'en' : 'es';
    const [posts, counterpartPosts] = await Promise.all([
      supabaseService.getPostsByLanguage(currentLocale),
      supabaseService.getPostsByLanguage(counterpartLocale),
    ]);

    const localeMatch = findPostBySlug(posts, slug);
    if (localeMatch) {
      post = localeMatch;
    } else {
      const counterpartMatch = findPostBySlug(counterpartPosts, slug);
      if (counterpartMatch?.slug) {
        permanentRedirect(`/${counterpartLocale}/blog/${counterpartMatch.slug}`);
      }

      // Defensive fallback: query by exact slug directly.
      // This avoids false 404s if list-scanning is disrupted by malformed legacy data.
      const directMatch = await supabaseService.getPublishedPostBySlug(normalizedRequestedSlug);
      if (directMatch) {
        const directLocale: 'es' | 'en' = directMatch.language === 'en' ? 'en' : 'es';
        if (directLocale !== currentLocale && directMatch.slug) {
          permanentRedirect(`/${directLocale}/blog/${directMatch.slug}`);
        }

        post = directMatch;
      }
    }

    if (!post) {
      const redirectTarget = await resolveLegacyBlogRedirect(locale, slug);
      if (redirectTarget) {
        permanentRedirect(`/${redirectTarget.locale}/blog/${redirectTarget.slug}`);
      }

      if (KNOWN_ORPHAN_BLOG_SLUGS.has(normalizedRequestedSlug)) {
        permanentRedirect(`/${locale}/blog`);
      }
    }
  } catch (error) {
    console.error('Failed to fetch post:', error);
  }

  if (!post) {
    notFound();
  }

  // Format date
  const formatDate = (date: string | undefined) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString(locale === 'es' ? 'es-MX' : 'en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div style={{ backgroundColor: '#0a0a0a', minHeight: '100vh', paddingTop: '100px' }}>
      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateArticleSchema(post, locale)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateBreadcrumbSchema([
              { name: tBlog('journal'), url: `/${locale}/blog` },
              { name: post.category || tBlog('updates'), url: `/${locale}/blog` },
              { name: post.title, url: `/${locale}/blog/${post.slug}` },
            ])
          ),
        }}
      />

      {/* Hero Section with Featured Image */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="px-6 mx-auto max-w-6xl"
      >
        <div className="relative h-96 md:h-[500px] overflow-hidden rounded-sm">
          <Image
            src={post.image || 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=1600'}
            alt={post.title}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 1200px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        </div>
      </motion.div>

      {/* Post Header */}
      <section className="py-12 md:py-16 px-6 border-b border-white/5">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {/* Breadcrumb */}
            <div className="mb-6 flex gap-2 text-xs uppercase tracking-widest text-gray-500">
              <Link href={`/${locale}/blog`} className="hover:text-white transition-colors">
                {tBlog('journal')}
              </Link>
              <span>•</span>
              <span className="text-white">{post.category || tBlog('updates')}</span>
            </div>

            {/* Title */}
            <h1
              className="text-5xl md:text-6xl font-serif text-white mb-6 leading-[1.1]"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              {post.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap gap-6 text-sm text-gray-400 mb-8">
              <div className="flex items-center gap-2">
                <span className="text-[#FC7CA4]">✦</span>
                <span className="uppercase tracking-widest font-bold">{post.category || tBlog('updates')}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#FC7CA4]">✦</span>
                <span className="uppercase tracking-widest">{tBlog('publishedOn')} {formatDate(post.published_at || post.created_at)}</span>
              </div>
            </div>

            {/* Excerpt */}
            <p className="text-lg text-gray-300 font-light leading-relaxed mb-6">
              {post.excerpt}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Post Content */}
      <section className="py-16 md:py-24 px-6">
        <style>{`
          .blog-post-content h1,
          .blog-post-content h2,
          .blog-post-content h3,
          .blog-post-content h4,
          .blog-post-content h5,
          .blog-post-content h6 {
            color: #ffffff;
            font-weight: bold;
            line-height: 1.3;
            margin-top: 1em;
            margin-bottom: 0.5em;
          }
          .blog-post-content h1 {
            font-size: 2.2em;
          }
          .blog-post-content h2 {
            font-size: 1.8em;
          }
          .blog-post-content h3 {
            font-size: 1.5em;
          }
          .blog-post-content h4 {
            font-size: 1.3em;
          }
          .blog-post-content p {
            color: #d1d5db;
            line-height: 1.7;
            margin-bottom: 1em;
          }
          .blog-post-content a {
            color: #FC7CA4;
            text-decoration: underline;
          }
          .blog-post-content a:hover {
            color: #ff9fc0;
          }
        `}</style>
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="max-w-4xl mx-auto prose prose-invert blog-post-content"
          dangerouslySetInnerHTML={{
            __html: post.content || '<p>No content available.</p>',
          }}
          style={{
            '--tw-prose-body': '#d1d5db',
            '--tw-prose-headings': '#ffffff',
            '--tw-prose-links': '#FC7CA4',
          } as React.CSSProperties}
        />
      </section>

      {/* Back Link */}
      <section className="py-16 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <Link
            href={`/${locale}/blog`}
            className="text-[10px] uppercase tracking-[0.5em] text-white/60 hover:text-white transition-colors duration-300 inline-flex items-center gap-2"
          >
            ← {tBlog('viewAllPosts')}
          </Link>
        </div>
      </section>
    </div>
  );
}

export default BlogPostPage;
