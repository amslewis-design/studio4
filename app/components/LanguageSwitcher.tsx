'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const switchLanguage = (newLocale: 'es' | 'en') => {
    if (newLocale === locale) {
      setIsOpen(false);
      return;
    }

    // Replace the current locale in the pathname with the new one
    const pathWithoutLocale = pathname.replace(`/${locale}`, '');
    const newPath = `/${newLocale}${pathWithoutLocale}`;
    router.push(newPath);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-widest font-bold text-white hover:text-[#FC7CA4] transition-colors border border-white/10 hover:border-[#FC7CA4] rounded-sm"
      >
        {locale === 'es' ? '🇲🇽' : '🇬🇧'}
        <span>{locale.toUpperCase()}</span>
      </button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-full right-0 mt-2 bg-black border border-white/10 rounded-sm shadow-xl z-50 overflow-hidden"
        >
          <button
            onClick={() => switchLanguage('es')}
            className={`w-full px-4 py-3 text-xs uppercase tracking-widest text-left transition-colors ${
              locale === 'es'
                ? 'bg-[#FC7CA4] text-black font-bold'
                : 'text-white hover:bg-white/10'
            }`}
          >
            🇲🇽 Español
          </button>
          <div className="h-px bg-white/10" />
          <button
            onClick={() => switchLanguage('en')}
            className={`w-full px-4 py-3 text-xs uppercase tracking-widest text-left transition-colors ${
              locale === 'en'
                ? 'bg-[#FC7CA4] text-black font-bold'
                : 'text-white hover:bg-white/10'
            }`}
          >
            🇬🇧 English
          </button>
        </motion.div>
      )}
    </div>
  );
}
