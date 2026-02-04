'use client';

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from 'next-intl';
import { AnimatePresence, motion } from "framer-motion";
import LanguageSwitcher from "./LanguageSwitcher";

type NavItem = {
  label: string;
  href: string;
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

interface NavbarProps {
  onConsult?: () => void;
  isHomepage?: boolean;
}

export default function Navbar({ onConsult, isHomepage = false }: NavbarProps) {
  const t = useTranslations('navigation');
  const tCommon = useTranslations('common');
  const locale = useLocale();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Define navigation items with their destinations
  // Note: Services always points to /services page, creating a "clean" URL
  const navItems: NavItem[] = useMemo(
    () => [
      { label: t('home'), href: isHomepage ? "#top" : `/${locale}` },
      { label: t('portfolio'), href: `/${locale}/portfolio` },
      { label: t('services'), href: `/${locale}/services` },
      { label: t('blog'), href: isHomepage ? "#blog" : `/${locale}/blog` },
      { label: t('contact'), href: isHomepage ? "#contact" : `/${locale}#contact` },
    ],
    [t, isHomepage, locale]
  );

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleScroll = (href: string) => {
    setIsOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleConsultClick = () => {
    if (onConsult) {
      onConsult();
    } else {
      // Navigate to contact section on homepage
      window.location.href = `/${locale}#contact`;
    }
  };

  const headerSurface =
    "transition-all duration-500 " +
    (isScrolled ? "bg-transparent" : "bg-[var(--accent)] backdrop-blur-xl");

  const linkClass = "text-[11px] uppercase tracking-[0.45em] font-bold transition-colors " +
  (isScrolled
    ? "text-[var(--accent)] hover:opacity-80"
    : "text-white hover:opacity-90");

  const mobileLinkClass = "text-left text-[12px] uppercase tracking-[0.4em] font-bold transition-colors py-2 " +
  (isScrolled
    ? "text-[var(--accent)] hover:opacity-80"
    : "text-white hover:opacity-90");

  return (
    <header className="fixed top-0 left-0 right-0 z-[60]">
      <div
        className={headerSurface}
        data-scrolled={isScrolled ? "true" : "false"}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Brand */}
          {isHomepage ? (
            <button
              onClick={() => handleScroll("#top")}
              className="group inline-flex items-center"
              aria-label="Sassy Studio Home"
            >
              <Logo fill={isScrolled ? "var(--accent)" : "white"} />
            </button>
          ) : (
            <Link
              href={`/${locale}`}
              className="group inline-flex items-center"
              aria-label="Sassy Studio Home"
            >
              <Logo fill={isScrolled ? "var(--accent)" : "white"} />
            </Link>
          )}

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-10">
            {navItems.map((item) => {
              const isHash = item.href.startsWith("#");
              // Only use scroll behavior if we are on homepage AND the link is a hash
              const isLocalScroll = isHomepage && isHash;

              if (isLocalScroll) {
                return (
                  <button
                    key={item.label}
                    onClick={() => handleScroll(item.href)}
                    className={linkClass}
                  >
                    {item.label}
                  </button>
                );
              } else {
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={linkClass}
                  >
                    {item.label}
                  </Link>
                );
              }
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <button
              onClick={handleConsultClick}
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
                {navItems.map((item) => {
                  const isHash = item.href.startsWith("#");
                  const isLocalScroll = isHomepage && isHash;

                  if (isLocalScroll) {
                    return (
                      <button
                        key={item.label}
                        onClick={() => handleScroll(item.href)}
                        className={mobileLinkClass}
                      >
                        {item.label}
                      </button>
                    );
                  } else {
                    return (
                      <Link
                        key={item.label}
                        href={item.href}
                        className={mobileLinkClass}
                        onClick={() => setIsOpen(false)}
                      >
                        {item.label}
                      </Link>
                    );
                  }
                })}

                <button
                  onClick={() => {
                    setIsOpen(false);
                    handleConsultClick();
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
