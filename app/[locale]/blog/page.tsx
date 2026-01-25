'use client';

import React, { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { supabaseService } from '@/lib/services/supabaseService';
import type { Post } from '@/lib/types';
import { generateBreadcrumbSchema } from '@/lib/schemas';
import Navbar from '@/app/components/Navbar';

const POSTS_PER_PAGE = 9;

export default function BlogPage() {
  const t = useTranslations();
  const locale = useLocale();
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest' | 'alphabetical'>('newest');
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch posts on mount
  useEffect(() => {
    const fetchPosts = async () => {
      const posts = await supabaseService.getPostsByLanguage(locale as 'es' | 'en');
      const publishedPosts = posts.filter(p => p.published === true);
      setAllPosts(publishedPosts);
    };
    fetchPosts();
  }, [locale]);

  // Get unique categories
  const categories = useMemo(() => {
    const cats = new Set(allPosts.map(p => p.category || 'Updates'));
    return ['All', ...Array.from(cats).sort()];
  }, [allPosts]);

  // Filter and sort posts
  const filteredPosts = useMemo(() => {
    let filtered = allPosts.filter(post => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    // Sort posts
    if (sortOrder === 'newest') {
      filtered.sort(
        (a, b) =>
          new Date(b.published_at || b.created_at || 0).getTime() -
          new Date(a.published_at || a.created_at || 0).getTime()
      );
    } else if (sortOrder === 'oldest') {
      filtered.sort(
        (a, b) =>
          new Date(a.published_at || a.created_at || 0).getTime() -
          new Date(b.published_at || b.created_at || 0).getTime()
      );
    } else if (sortOrder === 'alphabetical') {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    }

    return filtered;
  }, [allPosts, searchQuery, selectedCategory, sortOrder]);

  // Featured post (most recent)
  const featuredPost = filteredPosts.length > 0 ? filteredPosts[0] : null;

  // Remaining posts for grid
  const gridPosts = filteredPosts.slice(1);
  const totalPages = Math.ceil(gridPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = gridPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

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
    <>
      <Navbar isHomepage={false} />
      <div style={{ backgroundColor: '#0a0a0a', minHeight: '100vh', paddingTop: '100px' }}>
        {/* JSON-LD Breadcrumb Schema */}
        <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateBreadcrumbSchema([
              { name: t('navigation.home'), url: `/${locale}` },
              { name: t('blog.title'), url: `/${locale}/blog` },
            ])
          ),
        }}
      />

      {/* Header */}
      <section className="py-16 md:py-24 px-6 border-b border-white/5">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-serif text-white mb-6 tracking-tight"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            {t('blog.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            {t('blog.description')}
          </motion.p>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="py-12 px-6 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Search */}
            <div className="md:col-span-2">
              <input
                type="text"
                placeholder={t('blog.searchPlaceholder')}
                value={searchQuery}
                onChange={e => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full bg-black/40 border border-white/10 p-4 text-sm text-white outline-none focus:border-[#FC7CA4] transition-colors rounded-sm"
              />
            </div>

            {/* Category Filter */}
            <div>
              <select
                value={selectedCategory}
                onChange={e => {
                  setSelectedCategory(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full bg-black/40 border border-white/10 p-4 text-sm text-white outline-none focus:border-[#FC7CA4] transition-colors rounded-sm cursor-pointer"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat} className="bg-black text-white">
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Sort Options */}
          <div className="mt-6 flex gap-4 flex-wrap">
            <label className="flex items-center gap-2 text-sm text-gray-400">
              {t('blog.sortBy')}
            </label>
            {(['newest', 'oldest', 'alphabetical'] as const).map(order => (
              <button
                key={order}
                onClick={() => {
                  setSortOrder(order);
                  setCurrentPage(1);
                }}
                className={`px-4 py-2 text-xs uppercase tracking-widest font-bold transition-colors rounded-sm ${
                  sortOrder === order
                    ? 'bg-[#FC7CA4] text-black'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                {order === 'newest'
                  ? t('blog.newestFirst')
                  : order === 'oldest'
                    ? t('blog.oldestFirst')
                    : t('blog.alphabetical')}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid md:grid-cols-2 gap-12 items-center"
            >
              {/* Image */}
              <div className="relative overflow-hidden rounded-sm h-96 md:h-full">
                <Image
                  src={featuredPost.image || 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=1600'}
                  alt={featuredPost.title}
                  fill
                  priority
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              {/* Content */}
              <div className="space-y-6">
                <div>
                  <p className="text-[#FC7CA4] text-xs uppercase tracking-[0.3em] font-bold mb-3">
                    {t('blog.featuredPost')}
                  </p>
                  <h2
                    className="text-5xl font-serif text-white mb-4 leading-[1.1]"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  >
                    {featuredPost.title}
                  </h2>
                </div>

                <div className="flex gap-4 text-sm text-gray-400">
                  <span className="uppercase tracking-widest font-bold">{featuredPost.category || 'Updates'}</span>
                  <span className="uppercase tracking-widest">•</span>
                  <span className="uppercase tracking-widest">{formatDate(featuredPost.published_at || featuredPost.created_at)}</span>
                </div>

                <p className="text-gray-300 text-lg leading-relaxed">{featuredPost.excerpt}</p>

                <Link
                  href={`/${locale}/blog/${featuredPost.slug}`}
                  className="inline-block border border-[#FC7CA4] text-[#FC7CA4] px-8 py-4 uppercase tracking-[0.3em] text-xs font-bold hover:bg-[#FC7CA4] hover:text-black transition-colors duration-300"
                  style={{ borderRadius: 'var(--btn-radius, 0px)' }}
                >
                  {t('common.readFullArticle')}
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Posts Grid */}
      {paginatedPosts.length > 0 && (
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-3 gap-10">
              {paginatedPosts.map((post, idx) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: idx * 0.1 }}
                  className="group border border-white/10 bg-black/20 backdrop-blur-sm flex flex-col hover:border-[#FC7CA4]/40 transition-colors duration-500 overflow-hidden rounded-sm"
                >
                  {/* Image */}
                  <div className="relative">
                    <div className="h-48 w-full overflow-hidden">
                      <img
                        src={post.image || 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=1600'}
                        alt={post.title}
                        loading="lazy"
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                      />
                    </div>

                    {/* Tag/date overlay */}
                    <div className="absolute top-0 left-0 right-0 p-6 flex items-center justify-between gap-6 bg-gradient-to-b from-black/70 to-transparent">
                      <div className="text-[10px] uppercase tracking-[0.4em] text-white/70 font-bold">
                        {post.category || 'Updates'}
                      </div>
                      <div className="text-[10px] uppercase tracking-[0.4em] text-white/50">
                        {formatDate(post.published_at || post.created_at)}
                      </div>
                    </div>
                  </div>

                  {/* Copy */}
                  <div className="p-8 space-y-4">
                    <h3
                      className="text-2xl font-serif text-white group-hover:text-[#FC7CA4] transition-colors duration-500"
                      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                    >
                      {post.title}
                    </h3>
                    <p className="text-gray-500 font-light leading-relaxed text-sm">{post.excerpt}</p>
                  </div>

                  {/* Footer */}
                  <div className="p-8 pt-0 mt-auto">
                    <Link
                      href={`/${locale}/blog/${post.slug}`}
                      className="text-[10px] uppercase tracking-[0.5em] text-white/60 group-hover:text-white transition-colors duration-300 inline-block"
                    >
                      {t('common.readMore')}
                    </Link>
                    <div className="mt-6 w-full h-[1px] bg-white/5 group-hover:bg-[#FC7CA4]/60 transition-colors duration-700" />
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <section className="py-16 px-6 border-t border-white/5">
          <div className="max-w-7xl mx-auto flex justify-center items-center gap-4">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 text-xs uppercase tracking-widest font-bold border border-white/10 text-white/60 hover:text-white hover:border-white/30 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              {t('blog.previous')}
            </button>

            <div className="flex gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-10 h-10 text-xs font-bold transition-colors ${
                    currentPage === i + 1
                      ? 'bg-[#FC7CA4] text-black'
                      : 'border border-white/10 text-white/60 hover:text-white hover:border-white/30'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 text-xs uppercase tracking-widest font-bold border border-white/10 text-white/60 hover:text-white hover:border-white/30 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              {t('blog.next')}
            </button>
          </div>
        </section>
      )}

      {/* No results */}
      {filteredPosts.length === 0 && (
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-gray-500 text-lg">{t('blog.noPostsFound')}</p>
          </div>
        </section>
      )}
      </div>
    </>
  );
}
