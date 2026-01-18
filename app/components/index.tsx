'use client';

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from 'next-intl';
import { AnimatePresence, motion } from "framer-motion";
import { SiteSettings } from "@/lib/types";
import HeroCarousel from "./HeroCarousel";
import HeroSlideshow from "./HeroSlideshow";
import LanguageSwitcher from "./LanguageSwitcher";

type ConsultationStatus = "idle" | "loading" | "success" | "error";

type NavItem = {
  label: string;
  href: string;
};

type BlogPost = {
  title: string;
  date: string;
  tag: string;
  image: string;
  excerpt: string;
  slug?: string;
};

function Logo({ fill = "white" }: { fill?: string }) {
  const src = fill === "var(--accent)" 
    ? "/sassy_logo_pink.png" 
    : "/sassy_logo_white.png";
  
  return (
    <Image
      src={src}
      alt="Sassy Studio"
      width={150}
      height={44}
      className="w-auto h-12 opacity-90 group-hover:opacity-100 transition-opacity"
      priority
    />
  );
}

function Navbar({ onConsult }: { onConsult: () => void }) {
  const t = useTranslations('navigation');
  const tCommon = useTranslations('common');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const navItems: NavItem[] = useMemo(
    () => [
      { label: t('home'), href: "#top" },
      { label: t('portfolio'), href: "#portfolio" },
      { label: t('services'), href: "#services" },
      { label: t('approach'), href: "#approach" },
      { label: t('blog'), href: "#blog" },
      { label: t('contact'), href: "#contact" },
    ],
    [t]
  );

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (href: string) => {
    setIsOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Behaviour:
  // - Default: pink navbar
  // - Scrolled: transparent navbar, but logo + text switch to theme pink
  const headerSurface =
    "transition-all duration-500 " +
    (isScrolled ? "bg-transparent" : "bg-[var(--accent)] backdrop-blur-xl");

  return (
    <header className="fixed top-0 left-0 right-0 z-[60]">
      <div
        className={headerSurface}
        data-scrolled={isScrolled ? "true" : "false"}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Brand */}
          <button
            onClick={() => handleNav("#top")}
            className="group inline-flex items-center"
            aria-label="Sassy Studio Home"
          >
            <Logo fill={isScrolled ? "var(--accent)" : "white"} />
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-10">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNav(item.href)}
                className={
                  "text-[11px] uppercase tracking-[0.45em] font-bold transition-colors " +
                  (isScrolled
                    ? "text-[var(--accent)] hover:opacity-80"
                    : "text-white hover:opacity-90")
                }
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <button
              onClick={onConsult}
              className={
                "hidden md:inline-flex px-6 py-3 uppercase tracking-[0.35em] text-[11px] font-extrabold transition-colors duration-300 " +
                (isScrolled
                  ? "border border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-black"
                  : "border border-white/60 text-white hover:bg-white hover:text-[var(--accent)]")
              }
              style={{ borderRadius: "var(--btn-radius)" }}
            >
              {tCommon('consult')}
            </button>

            {/* Mobile toggle */}
            <button
              onClick={() => setIsOpen((v) => !v)}
              className={
                "md:hidden inline-flex items-center justify-center w-11 h-11 transition-colors " +
                (isScrolled
                  ? "border border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-black"
                  : "border border-white/30 bg-black/10 text-white/90 hover:text-white hover:border-white/60")
              }
              aria-label="Toggle menu"
              style={{ borderRadius: "var(--btn-radius)" }}
            >
              <span className="text-lg leading-none">{isOpen ? "×" : "≡"}</span>
            </button>
          </div>
        </div>

        {/* Mobile panel */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className={
                "md:hidden overflow-hidden " +
                (isScrolled ? "bg-transparent" : "bg-[var(--accent)]")
              }
            >
              <div className="px-6 py-6 flex flex-col gap-4">
                {navItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => handleNav(item.href)}
                    className={
                      "text-left text-[12px] uppercase tracking-[0.4em] font-bold transition-colors py-2 " +
                      (isScrolled
                        ? "text-[var(--accent)] hover:opacity-80"
                        : "text-white hover:opacity-90")
                    }
                  >
                    {item.label}
                  </button>
                ))}

                <button
                  onClick={() => {
                    setIsOpen(false);
                    onConsult();
                  }}
                  className="mt-3 bg-white text-[var(--accent)] py-4 uppercase tracking-[0.45em] text-[10px] font-black hover:bg-black hover:text-white transition-colors duration-300"
                  style={{ borderRadius: "var(--btn-radius)" }}
                >
                  {tCommon('requestConsultation')}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

function ConsultationModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const tContact = useTranslations('contact');
  const tCommon = useTranslations('common');
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    brand: "",
    projectType: tContact('projectTypes.photography'),
    message: "",
    // Honeypot (should remain empty)
    companyWebsite: "",
  });
  const [status, setStatus] = useState<ConsultationStatus>("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/95 backdrop-blur-2xl"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-4xl bg-neutral-900 border border-white/10 rounded-sm overflow-hidden shadow-[0_0_100px_rgba(252,124,164,0.10)] flex flex-col md:flex-row"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="md:w-2/5 bg-[var(--accent)] p-10 flex flex-col justify-between text-white">
              <div>
                <h2
                  className="text-4xl font-serif italic mb-6 leading-[0.95] tracking-tight max-w-[12ch] break-words"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  {tContact('heading')}
                </h2>
                <p className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-80 leading-loose">
                  {tContact('subtitle')}
                </p>
              </div>
              <div className="text-[9px] uppercase tracking-widest font-black opacity-40">
                Sassy Studio CDMX
              </div>
            </div>

            <div className="flex-1 p-8 md:p-12 overflow-y-auto max-h-[85vh]">
              {status === "success" ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-8 py-12">
                  <div className="w-20 h-20 bg-[var(--accent)]/10 rounded-full flex items-center justify-center text-[var(--accent)] text-4xl">
                    ✧
                  </div>
                  <div className="space-y-4">
                    <h3
                      className="text-4xl font-serif italic"
                      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                    >
                      {tContact('form.successMessage')}
                    </h3>
                    <p className="text-sm text-gray-400 max-w-sm mx-auto leading-relaxed">
                      {tContact('form.successText').replace('{email}', formData.email || "your email")}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setStatus("idle");
                      onClose();
                    }}
                    className="w-full max-w-xs bg-[var(--accent)] text-white py-5 uppercase tracking-[0.4em] text-[10px] font-black hover:bg-white hover:text-[var(--accent)] transition-colors duration-300 shadow-xl"
                    style={{ borderRadius: "var(--btn-radius)" }}
                  >
                    {tCommon('backToSite')}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Honeypot field (anti-spam). Keep hidden from users. */}
                  <div className="hidden" aria-hidden="true">
                    <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">
                      Company website
                    </label>
                    <input
                      tabIndex={-1}
                      autoComplete="off"
                      className="w-full bg-black/40 border border-white/10 p-4 text-sm"
                      value={formData.companyWebsite}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          companyWebsite: e.target.value,
                        })
                      }
                      placeholder="https://"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">
                        {tContact('form.name')}
                      </label>
                      <input
                        required
                        className="w-full bg-black/40 border border-white/10 p-4 text-sm outline-none focus:border-[var(--accent)] transition-colors duration-300"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder={tContact('form.namePlaceholder')}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">
                        {tContact('form.email')}
                      </label>
                      <input
                        type="email"
                        required
                        className="w-full bg-black/40 border border-white/10 p-4 text-sm outline-none focus:border-[var(--accent)] transition-colors duration-300"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder={tContact('form.emailPlaceholder')}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">
                        {tContact('form.brand')}
                      </label>
                      <input
                        className="w-full bg-black/40 border border-white/10 p-4 text-sm outline-none focus:border-[var(--accent)] transition-colors duration-300"
                        value={formData.brand}
                        onChange={(e) =>
                          setFormData({ ...formData, brand: e.target.value })
                        }
                        placeholder={tContact('form.brandPlaceholder')}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">
                        {tContact('form.projectType')}
                      </label>
                      <select
                        className="w-full bg-black/40 border border-white/10 p-4 text-sm outline-none focus:border-[var(--accent)] transition-colors duration-300 uppercase tracking-widest"
                        value={formData.projectType}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            projectType: e.target.value,
                          })
                        }
                      >
                        <option>{tContact('projectTypes.photography')}</option>
                        <option>{tContact('projectTypes.socialContent')}</option>
                        <option>{tContact('projectTypes.brandStrategy')}</option>
                        <option>{tContact('projectTypes.websiteContent')}</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">
                      {tContact('form.message')}
                    </label>
                    <textarea
                      rows={4}
                      className="w-full bg-black/40 border border-white/10 p-4 text-sm outline-none focus:border-[var(--accent)] transition-colors duration-300 resize-none"
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder={tContact('form.messagePlaceholder')}
                    />
                  </div>

                  <button
                    disabled={status === "loading"}
                    className="w-full bg-[var(--accent)] text-white py-5 uppercase tracking-[0.5em] text-[11px] font-black hover:bg-white hover:text-[var(--accent)] transition-colors duration-300 shadow-xl disabled:opacity-50"
                    style={{ borderRadius: "var(--btn-radius)" }}
                  >
                    {status === "loading" ? tCommon('sending') : tContact('form.sendMessage')}
                  </button>

                  {status === "error" && (
                    <p className="text-red-400 text-[10px] uppercase tracking-widest text-center">
                      Something went wrong. Please try again.
                    </p>
                  )}
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default function Preview() {
  // const tServices = useTranslations('services');
  // const tApproach = useTranslations('approach');
  // const tBlog = useTranslations('blog');
  // const tContact = useTranslations('contact');
  // const tHero = useTranslations('hero');
  // const tCommon = useTranslations('common');
  // const locale = useLocale();
  const [isConsultModalOpen, setIsConsultModalOpen] = useState(false);
  const [settings, setSettings] = useState<SiteSettings>({
    primaryColor: "#1a1a1a",
    secondaryColor: "#FC7CA4",
    backgroundColor: "#0a0a0a",
    heroImage: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=2070",
    galleryImages: [],
  });

  // Load settings from localStorage on mount
  useEffect(() => {
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
        title: "Visual Alchemy",
        description:
          "High-res hotel and gastronomy photography that captures the essence of luxury.",
        icon: "✧",
      },
      {
        title: "Digital Narratives",
        description:
          "Strategic Reels and TikTok production designed for maximum brand prestige.",
        icon: "✦",
      },
      {
        title: "Identity Refinement",
        description:
          "Bespoke brand positioning for Mexico City’s elite hospitality market.",
        icon: "❂",
      },
    ],
    []
  );

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

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

    fetchBlogPosts();
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
      <Navbar onConsult={() => setIsConsultModalOpen(true)} />

      <ConsultationModal
        isOpen={isConsultModalOpen}
        onClose={() => setIsConsultModalOpen(false)}
      />

      {/* Hero */}
      <section
        className="relative h-[92vh] md:h-screen flex items-center justify-center overflow-hidden pt-24 md:pt-28"
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
              <img
                src={settings.heroImage || "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=2070"}
                alt="Luxury hotel"
                className="w-full h-full object-cover grayscale"
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
              Sassy Studio CDMX
            </motion.span>

            <h1
              className="text-6xl md:text-[10rem] font-serif mb-10 leading-[0.85] tracking-tighter text-white"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Alchemists of <br />
              <span className="italic font-light opacity-80">Content</span>
            </h1>

            <p className="text-base md:text-2xl text-gray-400 font-light max-w-2xl mx-auto leading-relaxed mb-16 font-sans tracking-wide">
              Transforming boutique hospitality into digital gold through high-end visual storytelling and
              strategic brand refinement.
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
                Enter the Studio
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
              Our Craft
            </h2>
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
              In the heart of Mexico City, we refine your brand’s raw potential into the pure gold of digital
              distinction.
            </p>
            <div className="flex items-center justify-center gap-6 text-[11px] uppercase tracking-[0.6em] text-gray-600">
              <div className="w-16 h-[1px] bg-white/10" />
              <span>The Sassy Philosophy</span>
              <div className="w-16 h-[1px] bg-white/10" />
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
                The Studio Journal
              </h2>
              <p className="text-gray-500 font-light leading-relaxed max-w-2xl">
                Notes on boutique hospitality marketing, visual storytelling, and the small details that turn
                attention into bookings.
              </p>
            </div>

            <Link
              href="/blog"
              className="self-start md:self-auto border border-white/15 text-white/80 px-8 py-4 uppercase tracking-[0.45em] text-[10px] font-black hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors duration-300 inline-block"
              style={{ borderRadius: "var(--btn-radius)" }}
            >
              View all posts
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
                  <div className="h-48 w-full overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      loading="lazy"
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
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
                      Read more
                    </Link>
                  ) : (
                    <button className="text-[10px] uppercase tracking-[0.5em] text-white/60 group-hover:text-white transition-colors duration-300 cursor-default">
                      Read more
                    </button>
                  )}
                  <div className="mt-6 w-full h-[1px] bg-white/5 group-hover:bg-[var(--accent)]/60 transition-colors duration-700" />
                </div>
              </motion.article>
            ))}
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
              Ready for the <br />
              <span className="italic text-[var(--accent)] opacity-80">
                Transformation?
              </span>
            </h2>
            <button
              onClick={() => setIsConsultModalOpen(true)}
              className="bg-white text-black px-14 md:px-16 py-6 uppercase tracking-[0.5em] text-[11px] font-black hover:bg-[var(--accent)] hover:text-white transition-colors duration-300 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
              style={{ borderRadius: "var(--btn-radius)" }}
            >
              Schedule a Consultation
            </button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer
        id="portfolio"
        className="py-10 px-6"
        style={{ backgroundColor: "#000" }}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-[10px] uppercase tracking-[0.4em] text-white/40">
            Sassy Studio CDMX
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
