'use client';

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from 'next/dynamic';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from "framer-motion";
import { SiteSettings } from "@/lib/types";
import { Postcard } from "@/components/portfolio/Postcard";
import { PORTFOLIO_PROJECTS_EN, PORTFOLIO_PROJECTS_ES } from "@/app/constants/portfolio";

const HeroCarousel = dynamic(() => import("./HeroCarousel"), {
  loading: () => <div className="w-full h-full bg-[#1a1a1a]" />,
});
const HeroSlideshow = dynamic(() => import("./HeroSlideshow"), {
  loading: () => <div className="w-full h-full bg-[#1a1a1a]" />,
});
import Navbar from "./Navbar";
import ConsultationModal from "./ConsultationModal";

type BlogPost = {
  title: string;
  date: string;
  tag: string;
  image: string;
  excerpt: string;
  slug?: string;
};

export default function Preview() {
  const tServices = useTranslations('services');
  const tApproach = useTranslations('approach');
  const tEditorial = useTranslations('editorialPhilosophy');
  const tBlog = useTranslations('blog');
  const tPortfolio = useTranslations('portfolio');
  const tContact = useTranslations('contact');
  const tHero = useTranslations('hero');
  const locale = useLocale();
  const [isConsultModalOpen, setIsConsultModalOpen] = useState(false);
  const [settings, setSettings] = useState<SiteSettings>({
    primaryColor: "#1a1a1a",
    secondaryColor: "#FC7CA4",
    backgroundColor: "#0a0a0a",
    heroImage: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=2070",
    galleryImages: [],
  });

  // Load settings from localStorage on mount (lazy to prevent blocking)
  useEffect(() => {
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      requestIdleCallback(() => {
        const storedSettings = localStorage.getItem('sassy_settings');
        if (storedSettings) {
          try {
            const parsed = JSON.parse(storedSettings);
            setSettings(prev => ({
              ...prev,
              ...parsed
            }));
          } catch (error) {
            console.error('Failed to parse stored settings:', error);
          }
        }
      });
    } else {
      // Fallback for browsers without requestIdleCallback
      setTimeout(() => {
        const storedSettings = localStorage.getItem('sassy_settings');
        if (storedSettings) {
          try {
            const parsed = JSON.parse(storedSettings);
            setSettings(prev => ({
              ...prev,
              ...parsed
            }));
          } catch (error) {
            console.error('Failed to parse stored settings:', error);
          }
        }
      }, 100);
    }
    // Listen for settings updates from admin dashboard
    const handleSettingsUpdate = () => {
      const updatedSettings = localStorage.getItem('sassy_settings');
      if (updatedSettings) {
        try {
          const parsed = JSON.parse(updatedSettings);
          setSettings(prev => ({
            ...prev,
            ...parsed
          }));
        } catch (error) {
          console.error('Failed to parse updated settings:', error);
        }
      }
    };

    window.addEventListener('settingsUpdated', handleSettingsUpdate);
    return () => window.removeEventListener('settingsUpdated', handleSettingsUpdate);  }, []);

const services = useMemo(
    () => [
      {
        title: tServices('visualAlchemy'),
        description: tServices('visualAlchemyDesc'),
        icon: locale === 'es' ? "❂" : "✧",
      },
      {
        title: tServices('digitalNarratives'),
        description: tServices('digitalNarrativesDesc'),
        icon: locale === 'es' ? "✧" : "✦",
      },
      {
        title: tServices('identityRefinement'),
        description: tServices('identityRefinementDesc'),
        icon: locale === 'es' ? "✦" : "❂",
      },
    ],
    [tServices, locale]
  );

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const portfolioProjects = locale === 'es' ? PORTFOLIO_PROJECTS_ES : PORTFOLIO_PROJECTS_EN;

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await fetch('/api/posts');
        if (response.ok) {
          const data = await response.json();
          setBlogPosts(data.posts || []);
        } else {
          // On API error, show empty posts
          setBlogPosts([]);
        }
      } catch (error) {
        // On fetch error, show empty posts
        console.error('Failed to fetch blog posts:', error);
        setBlogPosts([]);
      }
    };

    // Defer blog post fetching to avoid blocking initial render
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      requestIdleCallback(fetchBlogPosts);
    } else {
      setTimeout(fetchBlogPosts, 100);
    }
  }, []);

  // Lightweight self-checks (dev only). Helps catch accidental anchor regressions.
  useEffect(() => {
    if (process.env.NODE_ENV === "production") return;

    const requiredAnchors = [
      "top",
      "services",
      "approach",
      "blog",
      "contact",
      "portfolio",
    ];

    for (const id of requiredAnchors) {
      // eslint-disable-next-line no-console
      if (!document.getElementById(id))
        console.warn(`[Self-check] Missing anchor element: #${id}`);
    }
  }, []);

  return (
    <div
      id="top"
      className="relative overflow-hidden"
      style={
        {
          "--primary": "#1a1a1a",
          "--accent": "#FC7CA4",
          "--section-bg": "#0a0a0a",
          "--btn-radius": "0px",
          fontFamily:
            "Montserrat, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial",
        } as React.CSSProperties
      }
    >
      <Navbar onConsult={() => setIsConsultModalOpen(true)} isHomepage={true} />

      <ConsultationModal
        isOpen={isConsultModalOpen}
        onClose={() => setIsConsultModalOpen(false)}
      />

      {/* Hero */}
      <section
        className="relative min-h-[92vh] md:min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-16 md:pt-28 md:pb-0"
        style={{ backgroundColor: "var(--primary)" }}
      >
        <div className="absolute inset-0 z-0">
          {settings.heroMode === 'carousel' && (settings.galleryImages?.length ?? 0) >= 2 ? (
            <HeroCarousel
              images={settings.galleryImages || []}
              interval={settings.heroCarouselInterval || 5000}
              opacity={0.4}
            />
          ) : settings.heroMode === 'slideshow' && (settings.galleryImages?.length ?? 0) >= 2 ? (
            <HeroSlideshow
              images={settings.galleryImages || []}
              interval={settings.heroCarouselInterval || 5000}
              opacity={0.4}
            />
          ) : (
            <motion.div
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.4 }}
              transition={{ duration: 2.5, ease: "easeOut" }}
              className="w-full h-full"
            >
              <Image
                src={settings.heroImage || "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=2070"}
                alt="Luxury boutique hotel interior in Mexico City - Professional hospitality photography by Sassy Studio"
                fill
                priority
                quality={85}
                className="object-cover grayscale"
                sizes="100vw"
              />
            </motion.div>
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-[var(--primary)]" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3 }}
          >
            <motion.span
              initial={{ opacity: 0, letterSpacing: "1em" }}
              animate={{ opacity: 1, letterSpacing: "0.5em" }}
              transition={{ duration: 1.5 }}
              className="text-[var(--accent)] uppercase text-xs mb-8 block font-sans font-medium"
            >
              {tHero('tagline')}
            </motion.span>

            <h1
              className="text-6xl md:text-[clamp(4.5rem,11vw,10rem)] font-serif mb-10 leading-[0.85] tracking-tighter text-white"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              {tHero('heading')}
            </h1>

            <p className="text-base md:text-2xl text-gray-400 font-light max-w-2xl mx-auto leading-relaxed mb-16 font-sans tracking-wide">
              {tHero('description')}
            </p>

            <motion.div
              whileHover={{ scale: 1.025 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="inline-block"
            >
              <motion.button
                onClick={() => setIsConsultModalOpen(true)}
                className="border border-[var(--accent)] text-[var(--accent)] px-12 md:px-14 py-4 uppercase tracking-[0.35em] text-[10px] hover:bg-[var(--accent)] hover:text-black transition-colors duration-300 font-black shadow-xl"
                style={{ borderRadius: "var(--btn-radius)" }}
              >
                {tHero('cta')}
              </motion.button>
            </motion.div>

            {/* Scroll cue (clean) */}
            <div className="mt-10 flex flex-col items-center">
              <div className="w-[1px] h-24 bg-gradient-to-b from-[var(--accent)] to-transparent relative overflow-hidden">
                <motion.div
                  animate={{ y: [0, 96] }}
                  transition={{
                    duration: 2.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute top-0 left-0 w-full h-1/2 bg-white"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section
        id="services"
        className="py-28 md:py-40 px-6"
        style={{ backgroundColor: "var(--section-bg)" }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="text-center mb-20 md:mb-32"
          >
            <h2
              className="text-5xl md:text-7xl font-serif mb-8 tracking-tight text-white"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              {tServices('ourCraft')}
            </h2>
            <p className="font-sans text-xs md:text-sm tracking-[0.2em] font-medium text-white/60 uppercase mb-10">
              {tServices('ourCraftSubtitle')}
            </p>
            <div className="w-32 h-[1px] bg-[var(--accent)] mx-auto opacity-30" />
          </motion.div>

          <div className="grid md:grid-cols-3 gap-16 md:gap-20 lg:gap-32">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="group relative"
              >
                <div className="mb-10 text-5xl text-[var(--accent)] opacity-40 group-hover:opacity-100 transition-all duration-500 scale-100 group-hover:scale-110 origin-left">
                  {service.icon}
                </div>
                <h3
                  className="text-3xl font-serif mb-6 group-hover:text-[var(--accent)] transition-colors duration-500 text-white"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  {service.title}
                </h3>
                <p className="text-gray-500 font-light leading-relaxed tracking-wide text-lg group-hover:text-gray-300 transition-colors duration-500">
                  {service.description}
                </p>
                <div className="mt-12 overflow-hidden">
                  <div className="w-full h-[1px] bg-white/5 group-hover:bg-[var(--accent)] transition-colors origin-left scale-x-0 group-hover:scale-x-100 duration-1000" />
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <p className="text-gray-400 text-lg leading-relaxed max-w-3xl mx-auto mb-8">
              {tServices('servicesDescription')} <Link href="/services" className="text-[var(--accent)] hover:underline">
                {tServices('exploreServices')}
              </Link> {tServices('transformPresence')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Approach / Quote */}
      <section
        id="approach"
        className="py-32 md:py-48 px-6 relative overflow-hidden"
        style={{ backgroundColor: "var(--primary)" }}
      >
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[var(--accent)]/5 -skew-x-12 translate-x-20" />
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
          >
            <span
              className="text-8xl font-serif text-[var(--accent)] opacity-10 block mb-12 leading-none"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              “
            </span>
            <p
              className="text-3xl md:text-7xl font-serif leading-[1.15] italic font-light mb-16 tracking-tight text-white"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              {tApproach('quote')}
            </p>
            <div className="flex items-center justify-center gap-6 text-[11px] uppercase tracking-[0.6em] text-gray-600">
              <div className="w-16 h-[1px] bg-white/10" />
              <span>{tApproach('philosophy')}</span>
              <div className="w-16 h-[1px] bg-white/10" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Editorial Philosophy */}
      <section
        id="editorial"
        className="py-28 md:py-40 px-6"
        style={{ backgroundColor: "var(--section-bg)" }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row md:items-center gap-12 md:gap-16"
          >
            {/* Text Column */}
            <div className="md:w-1/2 space-y-8">
              <h2
                className="text-4xl md:text-6xl font-serif tracking-tight text-white leading-tight"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                {tEditorial('heading')}
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                {tEditorial('body')}
              </p>
              <a
                href="#services"
                className="inline-block border border-white/15 text-white/80 px-8 py-4 uppercase tracking-[0.45em] text-[10px] font-black hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors duration-300"
                style={{ borderRadius: "var(--btn-radius)" }}
              >
                {tEditorial('cta')}
              </a>
            </div>

            {/* Visual Column - Cafe Image */}
            <div className="md:w-1/2 flex items-center justify-center">
              <Image
                src="https://res.cloudinary.com/ds86m2xm0/image/upload/v1769605842/sassy-studio/cafe_tjpt9a.webp"
                alt="a young woman reading in a cafe"
                width={400}
                height={400}
                className="w-full max-w-md h-auto rounded-lg"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Blog */}
      <section
        id="blog"
        className="py-28 md:py-40 px-6"
        style={{ backgroundColor: "var(--section-bg)" }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 1 }}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-10 mb-16 md:mb-20"
          >
            <div className="space-y-5">
              <h2
                className="text-5xl md:text-7xl font-serif tracking-tight text-white"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                {tBlog('title')}
              </h2>
              <p className="text-gray-500 font-light leading-relaxed max-w-2xl">
                {tBlog('description')}
              </p>
            </div>

            <Link
              href="/blog"
              className="self-start md:self-auto border border-white/15 text-white/80 px-8 py-4 uppercase tracking-[0.45em] text-[10px] font-black hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors duration-300 inline-block"
              style={{ borderRadius: "var(--btn-radius)" }}
            >
              {tBlog('viewAllPosts')}
            </Link>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-10">
            {blogPosts.map((post, idx) => (
              <motion.article
                key={post.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.15 }}
                className="group border border-white/10 bg-black/20 backdrop-blur-sm flex flex-col hover:border-[var(--accent)]/40 transition-colors duration-500 overflow-hidden"
              >
                {/* Image */}
                <div className="relative">
                  <div className="h-48 w-full overflow-hidden relative">
                    <Image
                      src={post.image}
                      alt={`${post.title} - Hospitality marketing insights from Sassy Studio CDMX`}
                      fill
                      className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>

                  {/* Tag/date overlay */}
                  <div className="absolute top-0 left-0 right-0 p-6 flex items-center justify-between gap-6 bg-gradient-to-b from-black/70 to-transparent">
                    <div className="text-[10px] uppercase tracking-[0.4em] text-white/70 font-bold">
                      {post.tag}
                    </div>
                    <div className="text-[10px] uppercase tracking-[0.4em] text-white/50">
                      {post.date}
                    </div>
                  </div>
                </div>

                {/* Copy */}
                <div className="p-8 space-y-4">
                  <h3
                    className="text-3xl font-serif text-white group-hover:text-[var(--accent)] transition-colors duration-500"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  >
                    {post.title}
                  </h3>
                  <p className="text-gray-500 font-light leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                {/* Footer */}
                <div className="p-8 pt-0 mt-auto">
                  {post.slug ? (
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-[10px] uppercase tracking-[0.5em] text-white/60 group-hover:text-white transition-colors duration-300 inline-block"
                    >
                      {tBlog('readMore')}
                    </Link>
                  ) : (
                    <button className="text-[10px] uppercase tracking-[0.5em] text-white/60 group-hover:text-white transition-colors duration-300 cursor-default">
                      {tBlog('readMore')}
                    </button>
                  )}
                  <div className="mt-6 w-full h-[1px] bg-white/5 group-hover:bg-[var(--accent)]/60 transition-colors duration-700" />
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section
        id="portfolio"
        className="py-28 md:py-40 px-6"
        style={{ backgroundColor: "var(--section-bg)" }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="text-center mb-20 md:mb-32"
          >
            <h2
              className="text-5xl md:text-7xl font-serif mb-8 tracking-tight text-white"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              {tPortfolio('title')}
            </h2>
            <p className="text-gray-500 font-light leading-relaxed max-w-2xl mx-auto mb-8">
              {tPortfolio('description')}
            </p>
            <div className="w-32 h-[1px] bg-[var(--accent)] mx-auto opacity-30" />
          </motion.div>

          <div className="flex overflow-x-auto gap-6 md:gap-8 pb-12 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
            {portfolioProjects.slice(0, 6).map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="min-w-[85vw] md:min-w-[400px] snap-center flex-shrink-0"
              >
                <Postcard project={project} />
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/portfolio"
              className="border border-white/15 text-white/80 px-8 md:px-12 py-3 md:py-4 uppercase tracking-[0.45em] text-[10px] font-black hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors duration-300 inline-block"
              style={{ borderRadius: "var(--btn-radius)" }}
            >
              {tPortfolio('viewFullPortfolio')}
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        id="contact"
        className="h-[70vh] flex items-center justify-center relative overflow-hidden"
        style={{ backgroundColor: "var(--primary)" }}
      >
        <motion.img
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 2 }}
          src={settings.galleryImages?.[0] || "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=2070"}
          alt="Gastronomy"
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale"
        />
        <div className="relative z-10 text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="space-y-10 md:space-y-12"
          >
            <h2
              className="text-5xl md:text-8xl font-serif tracking-tighter text-white"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              {tContact('title')}
            </h2>
            <button
              onClick={() => setIsConsultModalOpen(true)}
              className="bg-white text-black px-14 md:px-16 py-6 uppercase tracking-[0.5em] text-[11px] font-black hover:bg-[var(--accent)] hover:text-white transition-colors duration-300 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
              style={{ borderRadius: "var(--btn-radius)" }}
            >
              {tContact('form.sendMessage')}
            </button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="py-10 px-6"
        style={{ backgroundColor: "#000" }}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-[10px] uppercase tracking-[0.4em] text-white/40">
            {tHero('tagline')}
          </div>
          <button
            onClick={() => setIsConsultModalOpen(true)}
            className="text-[10px] uppercase tracking-[0.4em] text-white/60 hover:text-white transition-colors"
          >
            Request consultation
          </button>
        </div>
      </footer>
    </div>
  );
}
