import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { getTranslations } from 'next-intl/server';
import { supabaseService } from '@/lib/services/supabaseService';
import type { Post } from '@/lib/types';
import { generateArticleSchema, generateBreadcrumbSchema } from '@/lib/schemas';

// Enable ISR - revalidate every hour
export const revalidate = 3600;

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
    const posts = await supabaseService.getPostsByLanguage(locale as 'es' | 'en');
    const post = posts.find((p) => p.slug === slug && p.published === true);

    if (!post) {
      return {
        title: 'Post Not Found',
        robots: 'noindex',
      };
    }

    const baseUrl = 'https://www.sassystudio.com.mx';
    const canonicalUrl = `${baseUrl}/${locale}/blog/${slug}`;
    const postImage = post.image || `${baseUrl}/og-blog.jpg`;

    return {
      title: `${post.title} | Sassy Studio Blog`,
      description: post.excerpt || post.content?.substring(0, 160),
      keywords: post.category ? [post.category, 'hospitality marketing', 'luxury content'] : undefined,
      openGraph: {
        title: post.title,
        description: post.excerpt || post.content?.substring(0, 160),
        url: canonicalUrl,
        type: 'article',
        locale: locale === 'es' ? 'es_MX' : 'en_GB',
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
        title: post.title,
        description: post.excerpt || post.content?.substring(0, 160),
        images: [postImage],
      },
      alternates: {
        canonical: canonicalUrl,
        languages: {
          'en-GB': `${baseUrl}/en/blog/${slug}`,
          'es-MX': `${baseUrl}/es/blog/${slug}`,
        },
      },
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
  const tBlog = await getTranslations('blog');

  let post: Post | null = null;

  try {
    const posts = await supabaseService.getPostsByLanguage(locale as 'es' | 'en');
    post = posts.find((p) => p.slug === slug && p.published === true) || null;
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
