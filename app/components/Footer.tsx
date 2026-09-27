'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { Facebook, Instagram, Mail } from 'lucide-react';
import ConsultationModal from './ConsultationModal';

type FooterProps = {
  onConsult?: () => void;
};

export default function Footer({ onConsult }: FooterProps) {
  const locale = useLocale();
  const tCommon = useTranslations('common');
  const [isConsultModalOpen, setIsConsultModalOpen] = useState(false);

  const privacyNoticeHref = locale === 'es'
    ? `/${locale}/aviso-de-privacidad`
    : `/${locale}/privacy-notice`;
  const termsHref = locale === 'es'
    ? `/${locale}/terminos-de-uso`
    : `/${locale}/terms-of-use`;

  const handleConsult = onConsult ?? (() => setIsConsultModalOpen(true));

  return (
    <>
      {!onConsult && (
        <ConsultationModal
          isOpen={isConsultModalOpen}
          onClose={() => setIsConsultModalOpen(false)}
        />
      )}

      {/* Footer */}
      <footer
        className="py-10 px-6"
        style={{ backgroundColor: "#000" }}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left space-y-2">
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/70">
              Sassy Studio. Fundado en Ciudad de México. Inspirado por el mundo.
            </p>
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">CDMX, Los Angeles, UK.</p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3">
            <a
              href="https://www.instagram.com/sassystudioagency/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-white/60 hover:text-white transition-colors"
              aria-label="Follow us on Instagram"
            >
              <Instagram size={20} />
              <span>Instagram</span>
            </a>
            <a
              href="https://www.facebook.com/sassystudiodigital"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-white/60 hover:text-white transition-colors"
              aria-label="Follow us on Facebook"
            >
              <Facebook size={18} />
              <span>Facebook</span>
            </a>
            <a
              href="mailto:contacto@sassystudio.com.mx"
              className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-white/60 hover:text-white transition-colors"
            >
              <Mail size={18} />
              <span>contacto@sassystudio.com.mx</span>
            </a>
            <button
              onClick={handleConsult}
              className="text-[10px] uppercase tracking-[0.4em] text-white/60 hover:text-white transition-colors"
            >
              {tCommon('requestConsultation')}
            </button>
            <Link
              href={privacyNoticeHref}
              className="text-[10px] uppercase tracking-[0.4em] text-white/60 hover:text-white transition-colors"
            >
              {locale === 'es' ? 'Aviso de privacidad' : 'Privacy notice'}
            </Link>
            <Link
              href={termsHref}
              className="text-[10px] uppercase tracking-[0.4em] text-white/60 hover:text-white transition-colors"
            >
              {locale === 'es' ? 'Términos de uso' : 'Terms of use'}
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}
