'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { supabaseService } from '@/lib/services/supabaseService';
import type { Post } from '@/lib/types';

export default function BlogPostPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const locale = useLocale();
  const t = useTranslations();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;

      try {
        setLoading(true);
        const allPosts = await supabaseService.getPostsByLanguage(locale as 'es' | 'en');
        const foundPost = allPosts.find(p => p.slug === slug && p.published === true);

        if (foundPost) {
          setPost(foundPost);
          setError(false);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error('Failed to fetch post:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug, locale]);

  // Format date
  const formatDate = (date: string | undefined) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString(locale === 'es' ? 'es-MX' : 'en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  if (loading) {
    return (
      <div style={{ backgroundColor: '#0a0a0a', minHeight: '100vh', paddingTop: '100px' }} className="flex items-center justify-center">
        <p className="text-gray-400">Loading...</p>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div style={{ backgroundColor: '#0a0a0a', minHeight: '100vh', paddingTop: '100px' }}>
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <h1 className="text-4xl font-serif text-white mb-4" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
            Post Not Found
          </h1>
          <p className="text-gray-400 mb-8">The blog post you're looking for doesn't exist or has been removed.</p>
          <Link
            href={`/${locale}/blog`}
            className="inline-block border border-[#FC7CA4] text-[#FC7CA4] px-8 py-4 uppercase tracking-[0.3em] text-xs font-bold hover:bg-[#FC7CA4] hover:text-black transition-colors duration-300"
            style={{ borderRadius: 'var(--btn-radius, 0px)' }}
          >
            Back to All Posts
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#0a0a0a', minHeight: '100vh', paddingTop: '100px' }}>
      {/* Hero Section with Featured Image */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="px-6 mx-auto max-w-6xl"
      >
        <div className="relative h-96 md:h-[500px] overflow-hidden rounded-sm">
          <img
            src={post.image || 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=1600'}
            alt={post.title}
            className="w-full h-full object-cover"
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
                Journal
              </Link>
              <span>•</span>
              <span className="text-white">{post.category || 'Updates'}</span>
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
                <span className="uppercase tracking-widest font-bold">{post.category || 'Updates'}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#FC7CA4]">✦</span>
                <span className="uppercase tracking-widest">{formatDate(post.published_at || post.created_at)}</span>
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
            ← {t('blog.viewAllPosts')}
          </Link>
        </div>
      </section>
    </div>
  );
}
