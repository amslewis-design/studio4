'use client';

import React, { useState } from "react";
import { useTranslations } from 'next-intl';
import { AnimatePresence, motion } from "framer-motion";

export default function ConsultationModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const tContact = useTranslations('contact');
  const [result, setResult] = useState("");

  const onSubmit = async (event: any) => {
    event.preventDefault();
    setResult("Sending...");
    const formData = new FormData(event.target);
    formData.append("access_key", "ecc15eb8-54e8-4e41-ab55-4420220a880f");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();
    setResult(data.success ? "Success!" : "Error");
    
    if (data.success) {
      setTimeout(() => {
        onClose();
        setResult("");
      }, 3000);
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
              {result === "Success!" ? (
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
                  </div>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-8">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">
                      {tContact('form.name')}
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      className="w-full bg-black/40 border border-white/10 p-4 text-sm outline-none focus:border-[var(--accent)] transition-colors duration-300"
                      placeholder={tContact('form.namePlaceholder')}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">
                      {tContact('form.email')}
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      className="w-full bg-black/40 border border-white/10 p-4 text-sm outline-none focus:border-[var(--accent)] transition-colors duration-300"
                      placeholder={tContact('form.emailPlaceholder')}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">
                      {tContact('form.message')}
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={4}
                      className="w-full bg-black/40 border border-white/10 p-4 text-sm outline-none focus:border-[var(--accent)] transition-colors duration-300 resize-none"
                      placeholder={tContact('form.messagePlaceholder')}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[var(--accent)] text-white py-5 uppercase tracking-[0.5em] text-[11px] font-black hover:bg-white hover:text-[var(--accent)] transition-colors duration-300 shadow-xl"
                    style={{ borderRadius: "var(--btn-radius)" }}
                  >
                    Submit
                  </button>
                  <p>{result}</p>

                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
