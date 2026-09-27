'use client';

import { FormEvent, useState } from 'react';
import { useLocale } from 'next-intl';
import { submitLeadForm } from '@/lib/utils/submitLeadForm';

const fieldClassName = 'w-full bg-black/40 border border-white/10 p-4 text-sm text-white outline-none focus:border-[var(--accent)] transition-colors';
const labelClassName = 'text-[10px] uppercase tracking-widest text-gray-500 font-bold';

export default function LeadContactForm({ source = 'contact-page' }: { source?: string }) {
  const locale = useLocale();
  const isEnglish = locale === 'en';
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('sending');

    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.set('projectType', formData.getAll('needs').join(', '));
    formData.set('sector', formData.getAll('sectors').join(', '));
    formData.set('website', String(formData.get('websiteInstagram') || ''));
    formData.set('message', String(formData.get('challenge') || ''));
    formData.set('locale', locale);
    formData.set('source', source);

    try {
      const result = await submitLeadForm(formData);
      setStatus(result.success ? 'success' : 'error');
      if (result.success) form.reset();
    } catch {
      setStatus('error');
    }
  };

  const sectors = isEnglish
    ? ['Hospitality', 'Lifestyle', 'Wellness', 'Travel']
    : ['Hospitalidad', 'Lifestyle', 'Wellness', 'Travel'];
  const needs = isEnglish
    ? ['Monthly Content Kit', 'Digital Brand Maintenance', 'Bespoke Project']
    : ['Kit de Contenido Mensual', 'Mantenimiento de Marca en Digital', 'Proyecto a la medida'];

  return (
    <form onSubmit={handleSubmit} className="space-y-7">
      <div className="grid sm:grid-cols-2 gap-5">
        <label className="space-y-2 block">
          <span className={labelClassName}>{isEnglish ? 'Name' : 'Nombre'}</span>
          <input name="name" required minLength={2} className={fieldClassName} autoComplete="name" />
        </label>
        <label className="space-y-2 block">
          <span className={labelClassName}>{isEnglish ? 'Email' : 'Correo electrónico'}</span>
          <input name="email" type="email" required className={fieldClassName} autoComplete="email" />
        </label>
        <label className="space-y-2 block">
          <span className={labelClassName}>{isEnglish ? 'Role' : 'Rol'}</span>
          <input name="role" className={fieldClassName} />
        </label>
        <label className="space-y-2 block">
          <span className={labelClassName}>{isEnglish ? 'Brand' : 'Marca'}</span>
          <input name="brand" required className={fieldClassName} />
        </label>
        <label className="space-y-2 block">
          <span className={labelClassName}>{isEnglish ? 'City' : 'Ciudad'}</span>
          <input name="city" className={fieldClassName} />
        </label>
        <label className="space-y-2 block">
          <span className={labelClassName}>{isEnglish ? 'Website and Instagram' : 'Sitio web e Instagram'}</span>
          <input name="websiteInstagram" className={fieldClassName} />
        </label>
      </div>

      <fieldset className="space-y-3">
        <legend className={labelClassName}>{isEnglish ? 'Sector' : 'Sector'}</legend>
        <div className="flex flex-wrap gap-x-6 gap-y-3">
          {sectors.map((sector) => (
            <label key={sector} className="flex items-center gap-2 text-sm text-gray-300">
              <input type="checkbox" name="sectors" value={sector} className="accent-[var(--accent)]" />
              {sector}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="space-y-3">
        <legend className={labelClassName}>{isEnglish ? 'What do you need today?' : 'Qué necesitas hoy'}</legend>
        <div className="flex flex-col gap-3">
          {needs.map((need) => (
            <label key={need} className="flex items-center gap-2 text-sm text-gray-300">
              <input type="checkbox" name="needs" value={need} className="accent-[var(--accent)]" />
              {need}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid sm:grid-cols-2 gap-5">
        <label className="space-y-2 block">
          <span className={labelClassName}>{isEnglish ? 'Monthly investment range' : 'Rango de inversión mensual'}</span>
          <input name="monthlyBudget" className={fieldClassName} />
        </label>
        <label className="space-y-2 block">
          <span className={labelClassName}>{isEnglish ? 'When would you like to start?' : 'Cuándo quieres empezar'}</span>
          <input name="startDate" className={fieldClassName} />
        </label>
      </div>

      <label className="space-y-2 block">
        <span className={labelClassName}>{isEnglish ? 'What is your biggest challenge right now?' : '¿Cuál es el mayor reto en este momento?'}</span>
        <textarea name="challenge" required minLength={10} rows={5} className={`${fieldClassName} resize-y`} />
      </label>

      <input type="text" name="companyWebsite" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

      <button type="submit" disabled={status === 'sending'} className="border border-[var(--accent)] text-[var(--accent)] px-10 py-4 uppercase tracking-[0.35em] text-[10px] font-bold hover:bg-[var(--accent)] hover:text-black disabled:opacity-50 transition-colors">
        {status === 'sending' ? (isEnglish ? 'Sending...' : 'Enviando...') : (isEnglish ? 'Send' : 'Enviar')}
      </button>
      <p aria-live="polite" className="text-sm text-white/70">
        {status === 'success' && (isEnglish ? 'Message received. We will be in touch soon.' : 'Mensaje recibido. Nos pondremos en contacto pronto.')}
        {status === 'error' && (isEnglish ? 'We could not send your message. Please try again.' : 'No pudimos enviar tu mensaje. Inténtalo de nuevo.')}
      </p>
    </form>
  );
}