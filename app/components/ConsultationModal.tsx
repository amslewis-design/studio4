'use client';

import React from "react";
import { useTranslations } from 'next-intl';
import { AnimatePresence, motion } from "framer-motion";
import LeadContactForm from './LeadContactForm';

export default function ConsultationModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const tContact = useTranslations('contact');

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
              <LeadContactForm source="consultation-modal" />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
