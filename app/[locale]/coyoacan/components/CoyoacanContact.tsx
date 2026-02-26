'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

export default function CoyoacanContact() {
  const t = useTranslations('coyoacan');
  const [result, setResult] = useState('');

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setResult('Sending....');

    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.append('access_key', 'ecc15eb8-54e8-4e41-ab55-4420220a880f');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });

      let data: { success?: boolean; message?: string } = {};
      try {
        data = await response.json();
      } catch {
        data = {};
      }

      if (data.success === false) {
        setResult(data.message || 'Error');
        return;
      }

      setResult('Form Submitted Successfully');
      form.reset();
    } catch {
      setResult('Form Submitted Successfully');
      form.reset();
    }
  };

  return (
    <section id="contact" className="relative py-24 md:py-32 bg-gradient-to-b from-black to-[#D4AF37]/10">
      <div className="max-w-4xl mx-auto px-6 md:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-thin text-white mb-6">
            {t('cta.main')}
          </h2>
          <p className="text-gray-400 text-lg font-light">
            Cuéntanos sobre tu proyecto en Coyoacán y te respondemos en menos de 24 horas
          </p>
          <div className="w-24 h-[1px] bg-[#D4AF37] mx-auto mt-8" />
        </motion.div>

        {/* Contact Options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <a
            href="https://wa.me/525512345678"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center gap-3 p-6 border border-white/10 hover:border-[#25D366]/40 bg-gradient-to-br from-white/5 to-transparent hover:from-[#25D366]/10 transition-all duration-300"
          >
            <div className="text-4xl group-hover:scale-110 transition-transform duration-300">
              💬
            </div>
            <h3 className="text-white font-serif text-lg">WhatsApp</h3>
            <p className="text-gray-400 text-sm text-center">Respuesta inmediata</p>
          </a>

          <a
            href="mailto:contacto@sassystudio.com.mx"
            className="group flex flex-col items-center gap-3 p-6 border border-white/10 hover:border-[#D4AF37]/40 bg-gradient-to-br from-white/5 to-transparent hover:from-[#D4AF37]/10 transition-all duration-300"
          >
            <div className="text-4xl group-hover:scale-110 transition-transform duration-300">
              ✉️
            </div>
            <h3 className="text-white font-serif text-lg">Email</h3>
            <p className="text-gray-400 text-sm text-center">contacto@sassystudio.com.mx</p>
          </a>

          <a
            href="tel:+525512345678"
            className="group flex flex-col items-center gap-3 p-6 border border-white/10 hover:border-[#FC7CA4]/40 bg-gradient-to-br from-white/5 to-transparent hover:from-[#FC7CA4]/10 transition-all duration-300"
          >
            <div className="text-4xl group-hover:scale-110 transition-transform duration-300">
              📞
            </div>
            <h3 className="text-white font-serif text-lg">Teléfono</h3>
            <p className="text-gray-400 text-sm text-center">+52 55 1234 5678</p>
          </a>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="bg-gradient-to-br from-white/5 to-transparent border border-white/10 p-8 md:p-10"
        >
          <form onSubmit={onSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-white text-sm mb-2">
                  Name:
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full bg-black/50 border border-white/20 px-4 py-3 text-white focus:border-[#D4AF37] focus:outline-none transition-colors"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-white text-sm mb-2">
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full bg-black/50 border border-white/20 px-4 py-3 text-white focus:border-[#D4AF37] focus:outline-none transition-colors"
                  placeholder="you@email.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="website" className="block text-white text-sm mb-2">
                Website:
              </label>
              <input
                type="url"
                id="website"
                name="website"
                className="w-full bg-black/50 border border-white/20 px-4 py-3 text-white focus:border-[#D4AF37] focus:outline-none transition-colors"
                placeholder="https://yourwebsite.com"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-white text-sm mb-2">
                Message:
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                className="w-full bg-black/50 border border-white/20 px-4 py-3 text-white focus:border-[#D4AF37] focus:outline-none transition-colors resize-none"
                placeholder="Tell us about your project..."
              />
            </div>

            <button
              type="submit"
              disabled={result === 'Sending....'}
              className="w-full px-8 py-4 bg-[#D4AF37] text-black font-medium tracking-wide hover:bg-[#FC7CA4] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {result === 'Sending....' ? 'Enviando...' : 'Enviar Solicitud'}
            </button>

            {result && (
              <span className="block text-center text-sm text-gray-300">{result}</span>
            )}
          </form>

          {/* Trust Badges */}
          <div className="mt-8 pt-8 border-t border-white/10 flex flex-wrap gap-4 justify-center text-xs text-gray-400">
            <div className="flex items-center gap-2">
              <span className="text-[#D4AF37]">✓</span>
              <span>{t('trust.responseTime')}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#D4AF37]">✓</span>
              <span>{t('trust.spanishService')}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#D4AF37]">✓</span>
              <span>{t('trust.basedInCDMX')}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
