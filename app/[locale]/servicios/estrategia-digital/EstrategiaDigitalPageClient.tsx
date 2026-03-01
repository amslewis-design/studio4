'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/app/components/Navbar';

type FaqItem = {
  q: string;
  a: string;
};

type Props = {
  locale: string;
  faqs: FaqItem[];
};

function ContactForm({ isEn }: { isEn: boolean }) {
  const [result, setResult] = useState('');

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setResult('Sending....');
    const formData = new FormData(event.currentTarget);
    formData.append('access_key', 'ecc15eb8-54e8-4e41-ab55-4420220a880f');

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    if (data.success) {
      setResult('Form Submitted Successfully');
      event.currentTarget.reset();
    } else {
      setResult('Error');
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <input
        type="text"
        name="name"
        required
        placeholder={isEn ? 'Name' : 'Nombre'}
        className="w-full bg-black/40 border border-white/15 px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37]"
      />
      <input
        type="email"
        name="email"
        required
        placeholder="Email"
        className="w-full bg-black/40 border border-white/15 px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37]"
      />
      <textarea
        name="message"
        required
        rows={5}
        placeholder={isEn ? 'Tell us your objective, timing and commercial priorities.' : 'Cuéntanos objetivo, tiempos y prioridades comerciales.'}
        className="w-full bg-black/40 border border-white/15 px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] resize-none"
      />
      <button
        type="submit"
        className="w-full bg-[#D4AF37] text-black py-4 uppercase tracking-[0.35em] text-xs font-bold hover:bg-[#FC7CA4] transition-colors"
      >
        {isEn ? 'Submit Form' : 'Enviar solicitud'}
      </button>
      <span className="block text-sm text-gray-300 text-center">{result}</span>
    </form>
  );
}

function TrustIcon({ path }: { path: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-[#D4AF37]">
      <path d={path} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function EstrategiaDigitalPageClient({ locale, faqs }: Props) {
  const isEn = locale === 'en';
  const serviceHubHref = isEn ? `/${locale}/services` : `/${locale}/servicios`;

  return (
    <main className="min-h-screen bg-[#1a1a1a] text-white selection:bg-[#FC7CA4] selection:text-black" id="top">
      <Navbar />

      <section className="pt-32 md:pt-40 pb-12 px-6 max-w-7xl mx-auto">
        <nav aria-label="Breadcrumb" className="text-xs text-gray-400 mb-8 tracking-wide">
          <Link href={`/${locale}`} className="hover:text-white">{isEn ? 'Home' : 'Inicio'}</Link>
          <span className="mx-2">→</span>
          <Link href={serviceHubHref} className="hover:text-white">{isEn ? 'Services' : 'Servicios'}</Link>
          <span className="mx-2">→</span>
          <span className="text-white">{isEn ? 'Digital strategy' : 'Estrategia digital'}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-5xl md:text-7xl font-serif font-thin mb-6 leading-[0.95]">{isEn ? 'Digital strategy' : 'Estrategia digital'}</h1>
            <p className="text-xl text-gray-300 leading-relaxed mb-4">
              {isEn
                ? 'Continuous optimisation so your website, content and campaigns work as one system: better UX, stronger structure and better conversion.'
                : 'Optimización continua para que tu web, contenido y campañas trabajen como un sistema: mejor UX, mejor estructura, mejores conversiones.'}
            </p>
            <p className="text-gray-400 leading-relaxed mb-8">
              {isEn
                ? 'We execute digital strategy for brands with website maintenance, website optimisation, page design and setup, blog content strategy, newsletter operations and support for campaigns, launches and seasonal windows.'
                : 'Ejecutamos estrategia digital para marcas con mantenimiento web, optimización web, diseño y configuración de páginas, estrategia de contenidos para blog, newsletter para marcas y soporte para campañas, lanzamientos y temporadas.'}
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#cotizar" className="px-8 py-4 bg-[#D4AF37] text-black font-bold text-xs uppercase tracking-[0.35em] hover:bg-[#FC7CA4] transition-colors">{isEn ? 'Get a quote' : 'Cotizar estrategia'}</a>
              <a href="#entregables" className="px-8 py-4 border border-white/25 text-white font-bold text-xs uppercase tracking-[0.35em] hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors">{isEn ? 'View deliverables' : 'Ver entregables'}</a>
            </div>
          </div>

          <div className="relative">
            <div className="relative aspect-[4/5] border border-white/10 overflow-hidden bg-black">
              <Image
                src="https://res.cloudinary.com/ds86m2xm0/image/upload/f_auto,q_auto/v1769302516/sassy-studio/Gemini_Generated_Image_ynrk3jynrk3jynrk_zzxlco.png"
                alt={isEn ? 'Visual map of a connected digital system with website, content, email and campaigns' : 'Mapa visual del sistema digital con web, contenido, email y campañas conectados'}
                fill
                priority
                className="object-cover opacity-85"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 max-w-7xl mx-auto pb-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {[
            [isEn ? 'Continuous website optimisation' : 'Optimización web continua', 'M3 12h18M12 3v18M5 5l14 14'],
            [isEn ? 'UX + action-led CTAs' : 'UX + CTAs orientados a acción', 'M4 6h16M4 12h16M4 18h10'],
            [isEn ? 'Internal linking structure' : 'Estructura de enlaces internos', 'M3 12h6l3 3m12-9h-6l-3-3'],
            [isEn ? 'Consistent blog and newsletter ops' : 'Blog y newsletter con consistencia', 'M4 5h16v14H4zM8 9h8M8 13h5'],
            [isEn ? 'Support for campaigns and seasonal windows' : 'Soporte para campañas y temporadas', 'M7 3v3M17 3v3M4 8h16M5 6h14v14H5z'],
          ].map(([label, path]) => (
            <div key={label} className="border border-white/10 bg-white/[0.02] p-4 flex items-center gap-3">
              <TrustIcon path={path} />
              <p className="text-sm text-gray-200">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 max-w-7xl mx-auto py-16">
        <h2 className="text-4xl md:text-5xl font-serif font-thin mb-4">{isEn ? 'What does our digital strategy cover?' : '¿Qué cubre nuestra estrategia digital?'}</h2>
        <p className="text-gray-300 max-w-4xl mb-12">
          {isEn
            ? 'This is not abstract consulting. It is practical digital strategy connected to daily execution, prioritised by conversion impact, navigation clarity and commercial consistency.'
            : 'No es consultoría en abstracto. Es estrategia digital para marcas conectada con ejecución diaria, priorizada por impacto en conversión, claridad de navegación y consistencia comercial.'}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            [
              isEn ? 'Website maintenance and optimisation' : 'Mantenimiento y optimización web',
              isEn
                ? 'Continuous structure, module and content improvements to sustain performance and usability.'
                : 'Ajustes continuos de estructura, velocidad percibida, módulos y contenido para sostener rendimiento.',
            ],
            [
              isEn ? 'Page design and setup' : 'Diseño y configuración de páginas',
              isEn
                ? 'We configure key pages with clear hierarchy, accurate messaging and intent-led CTAs.'
                : 'Configuramos páginas clave con jerarquía clara, mensajes correctos y llamados a la acción (CTAs) por intención.',
            ],
            [
              isEn ? 'Blog: structure, calendar and publishing' : 'Blog: estructura, calendario y publicación',
              isEn
                ? 'We define pillars, categories and publishing flow so your content strategy runs with continuity.'
                : 'Definimos pilares, categorías y flujo de publicación para que la estrategia de contenidos tenga continuidad real.',
            ],
            [
              isEn ? 'Newsletter: structure, sends and basic segmentation' : 'Newsletter: estructura, envíos y segmentación básica',
              isEn
                ? 'We implement a simple and consistent newsletter framework for retention, demand and reactivation.'
                : 'Implementamos un esquema de envío simple y consistente para retención, demanda y reactivación.',
            ],
            [
              isEn ? 'Campaign support (launches and seasonal windows)' : 'Soporte para campañas (lanzamientos/temporadas)',
              isEn
                ? 'We prepare landing pages, messaging and site adjustments for critical commercial periods.'
                : 'Preparamos landings, mensajes y ajustes del sitio para ventanas comerciales críticas.',
            ],
            [
              isEn ? 'UX improvements, internal links and CTAs' : 'Mejoras UX, enlaces internos y CTAs',
              isEn
                ? 'We organise user pathways and internal linking to reduce friction and increase action.'
                : 'Ordenamos rutas de navegación y estructura de enlaces internos para reducir fricción y mejorar acción.',
            ],
          ].map(([title, copy]) => (
            <article key={title} className="border border-white/10 bg-white/[0.02] p-6">
              <div className="w-10 h-10 mb-4 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">●</div>
              <h3 className="text-xl font-serif mb-2">{title}</h3>
              <p className="text-sm text-gray-300 leading-relaxed">{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="px-6 max-w-7xl mx-auto py-16">
        <h2 className="text-4xl md:text-5xl font-serif font-thin mb-6">{isEn ? 'Before changing anything: diagnosis' : 'Antes de mover piezas: diagnóstico'}</h2>
        <p className="text-gray-300 max-w-4xl mb-8">
          {isEn
            ? 'We review site structure, navigation, conversion pathways, existing content and friction points. A website audit lets us prioritise correctly before implementation.'
            : 'Revisamos estructura del sitio, navegación, rutas hacia conversión, contenido existente y puntos de fricción. La auditoría de sitio web permite ordenar prioridades antes de implementar.'}
        </p>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300 mb-8">
          <li className="border border-white/10 p-4">{isEn ? 'Site structure and navigation' : 'Estructura del sitio y navegación'}</li>
          <li className="border border-white/10 p-4">{isEn ? 'Conversion pathways and call-to-action structure' : 'Rutas hacia conversión y llamadas a la acción (CTAs)'}</li>
          <li className="border border-white/10 p-4">{isEn ? 'Baseline performance and user experience' : 'Performance básico y experiencia de uso'}</li>
          <li className="border border-white/10 p-4">{isEn ? 'Live blog and newsletter content' : 'Contenido activo de blog y newsletter'}</li>
          <li className="border border-white/10 p-4 md:col-span-2">{isEn ? 'Journey mapping by objective: acquisition, leads, sales or bookings' : 'Journeys por objetivo: captación, leads, ventas o reservas'}</li>
        </ul>
      </section>

      <section className="px-6 max-w-7xl mx-auto py-16">
        <h2 className="text-4xl md:text-5xl font-serif font-thin mb-8">{isEn ? 'Our process (from audit to optimisation)' : 'Nuestro proceso (de auditoría a optimización)'}</h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-10">
          {[
            [
              isEn ? 'Objectives + KPIs' : 'Objetivos + KPIs',
              isEn
                ? 'We define what improvement means for your brand and how success will be measured.'
                : 'Definimos qué significa mejorar para tu marca y cómo se medirá.',
            ],
            [
              isEn ? 'Rapid audit' : 'Auditoría rápida',
              isEn
                ? 'We review UX, content, structure, links and CTAs by priority.'
                : 'Revisamos UX, contenido, estructura, enlaces y CTAs por prioridad.',
            ],
            [
              isEn ? 'Action plan' : 'Plan de acción',
              isEn
                ? 'We prioritise quick wins and build a practical roadmap for structured execution.'
                : 'Priorizamos quick wins y construimos roadmap para ejecución ordenada.',
            ],
            [
              isEn ? 'Implementation' : 'Implementación',
              isEn
                ? 'We execute across website, blog, newsletter and active campaign support.'
                : 'Ejecutamos en web, blog, newsletter y soporte para campañas activas.',
            ],
            [
              isEn ? 'Monthly iteration' : 'Iteración mensual',
              isEn
                ? 'We learn from performance and apply continuous improvements.'
                : 'Aprendemos de resultados y aplicamos mejoras continuas.',
            ],
          ].map(([title, body], idx) => (
            <article key={title} className="border border-white/10 p-5 bg-black/30">
              <p className="text-xs text-[#D4AF37] tracking-[0.2em] uppercase mb-2">{isEn ? `Step ${idx + 1}` : `Paso ${idx + 1}`}</p>
              <h3 className="font-serif text-xl mb-2">{title}</h3>
              <p className="text-sm text-gray-300">{body}</p>
            </article>
          ))}
        </div>
        <a href="#cotizar" className="inline-block px-8 py-3 border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-colors text-sm">
          {isEn ? 'Launching soon? We can prepare it in advance.' : '¿Tienes lanzamiento cerca? Lo preparamos con tiempo.'}
        </a>
      </section>

      <section id="entregables" className="px-6 max-w-7xl mx-auto py-16">
        <h2 className="text-4xl md:text-5xl font-serif font-thin mb-8">{isEn ? 'Deliverables (clear and actionable)' : 'Entregables (claros y accionables)'}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="border border-white/10 p-6 bg-white/[0.02]">
            <h3 className="text-2xl font-serif mb-4">{isEn ? 'Project' : 'Proyecto'}</h3>
            <ul className="space-y-2 text-gray-300 list-disc pl-5">
              <li>{isEn ? 'UX and structure audit' : 'Auditoría UX + estructura'}</li>
              <li>{isEn ? 'Internal linking and CTA structure plan' : 'Plan de estructura de enlaces internos y CTAs'}</li>
              <li>{isEn ? 'Blog architecture and category model' : 'Arquitectura de blog + categorías'}</li>
              <li>{isEn ? 'Core templates (page, post, newsletter)' : 'Plantillas base (página, post, newsletter)'}</li>
              <li>{isEn ? 'Optimisation checklist (performance and basic on-page SEO)' : 'Checklist de optimización (performance y SEO on-page básico)'}</li>
            </ul>
          </div>
          <div className="border border-white/10 p-6 bg-white/[0.02]">
            <h3 className="text-2xl font-serif mb-4">{isEn ? 'Monthly' : 'Mensual'}</h3>
            <ul className="space-y-2 text-gray-300 list-disc pl-5">
              <li>{isEn ? 'Website maintenance (updates and adjustments)' : 'Mantenimiento web (actualizaciones y ajustes)'}</li>
              <li>{isEn ? 'Continuous UX improvements' : 'Mejoras UX continuas'}</li>
              <li>{isEn ? 'Blog publishing (structure and upload)' : 'Publicación de blog (estructura + subida)'}</li>
              <li>{isEn ? 'Newsletter operations (plan and sends)' : 'Newsletter (plan + envío)'}</li>
              <li>{isEn ? 'Campaign support (landing pages, CTAs and QA)' : 'Soporte a campañas (landing + CTAs + QA)'}</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="px-6 max-w-7xl mx-auto py-16">
        <h2 className="text-4xl md:text-5xl font-serif font-thin mb-6">{isEn ? 'Support for campaigns, launches and seasonal windows' : 'Soporte para campañas, lanzamientos y temporadas'}</h2>
        <p className="text-gray-300 max-w-4xl mb-8">
          {isEn
            ? 'We build the strategic and operational layer so campaigns run with commercial and technical structure, without last-minute chaos.'
            : 'Armamos la capa estratégica y operativa para que tus campañas corran con orden comercial y técnica, sin depender de ajustes de último minuto.'}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 text-gray-300">
          <div className="border border-white/10 p-4">{isEn ? 'Landing pages with objective-led structure and CTAs' : 'Landing pages con estructura y CTAs por objetivo'}</div>
          <div className="border border-white/10 p-4">{isEn ? 'Newsletter messaging and sequence planning' : 'Mensajes y secuencias en newsletter'}</div>
          <div className="border border-white/10 p-4">{isEn ? 'Temporary navigation and module adjustments' : 'Ajustes temporales de navegación y módulos'}</div>
          <div className="border border-white/10 p-4">{isEn ? 'Asset coordination with editorial production when needed' : 'Coordinación de activos con producción editorial si aplica'}</div>
          <div className="border border-white/10 p-4 md:col-span-2">{isEn ? 'Baseline tracking with UTMs and events where infrastructure exists' : 'Medición base con UTMs y eventos cuando exista infraestructura'}</div>
        </div>
      </section>

      <section className="px-6 max-w-7xl mx-auto py-16">
        <h2 className="text-4xl md:text-5xl font-serif font-thin mb-6">{isEn ? 'UX, internal links and CTAs that guide action' : 'UX, enlaces internos y CTAs que guían'}</h2>
        <p className="text-gray-300 max-w-4xl mb-8">
          {isEn
            ? 'We refine page hierarchy, contextual linking and intent-led CTAs to reduce friction and improve conversion where it supports your commercial objective.'
            : 'Trabajamos la jerarquía de páginas, enlaces contextuales y llamadas a la acción por intención para reducir fricción y mejorar optimización de conversión cuando corresponde al objetivo comercial.'}
        </p>
      </section>

      <section className="px-6 max-w-7xl mx-auto py-16">
        <h2 className="text-4xl md:text-5xl font-serif font-thin mb-6">{isEn ? 'Blog and newsletter: structure before volume' : 'Blog y newsletter: estructura antes que volumen'}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <article className="border border-white/10 p-6 bg-white/[0.02]">
            <h3 className="text-2xl font-serif mb-3">Blog</h3>
            <ul className="space-y-2 text-gray-300 list-disc pl-5">
              <li>{isEn ? 'Clear categories and content pillars' : 'Categorías y pilares claros'}</li>
              <li>{isEn ? 'Realistic editorial calendar' : 'Calendario editorial realista'}</li>
              <li>{isEn ? 'Post structure with interlinking and CTA' : 'Estructura de post con interlinking y CTA'}</li>
              <li>{isEn ? 'Consistent publishing with optimised format' : 'Publicación consistente con formato optimizado'}</li>
            </ul>
          </article>
          <article className="border border-white/10 p-6 bg-white/[0.02]">
            <h3 className="text-2xl font-serif mb-3">Newsletter</h3>
            <ul className="space-y-2 text-gray-300 list-disc pl-5">
              <li>{isEn ? 'Fixed section structure' : 'Estructura por secciones fijas'}</li>
              <li>{isEn ? 'Recommended frequency based on operating capacity' : 'Frecuencia recomendada por capacidad operativa'}</li>
              <li>{isEn ? 'Basic segmentation where relevant' : 'Segmentación básica cuando aplica'}</li>
              <li>{isEn ? 'Retention and demand focus' : 'Enfoque en retención y demanda'}</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="px-6 max-w-7xl mx-auto py-16">
        <h2 className="text-4xl md:text-5xl font-serif font-thin mb-8">{isEn ? 'Results (short cases)' : 'Resultados (casos cortos)'}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              client: isEn ? 'Hospitality brand' : 'Marca de hospitalidad',
              issue: isEn ? 'Confusing navigation and scattered CTAs.' : 'Navegación confusa y CTAs dispersos.',
              actions: isEn ? 'We reorganised structure, CTA hierarchy and internal links between service pages and blog content.' : 'Reordenamos estructura, jerarquía de CTAs y enlaces internos entre servicios y blog.',
              result: isEn ? 'Increase in qualified leads and longer engagement on service pages.' : 'Aumento de leads calificados y mejor tiempo en páginas de servicio.',
            },
            {
              client: isEn ? 'Product ecommerce brand' : 'Ecommerce de producto',
              issue: isEn ? 'Content had no clear route between blog, product and newsletter.' : 'Contenido sin ruta clara entre blog, producto y newsletter.',
              actions: isEn ? 'We built an editorial calendar, post structure and monthly newsletter sequence.' : 'Diseñamos calendario editorial, estructura de post y secuencia de newsletter mensual.',
              result: isEn ? 'Higher click-through to commercial pages and improved return visits.' : 'Mejor CTR hacia páginas comerciales y mayor recurrencia de visitas.',
            },
            {
              client: isEn ? 'Seasonal launch business' : 'Negocio con lanzamientos estacionales',
              issue: isEn ? 'Each campaign started without page structure or prepared messaging.' : 'Cada campaña iniciaba sin base de página ni mensajes preparados.',
              actions: isEn ? 'We implemented a campaign support system with landing pages, CTAs and pre-launch QA.' : 'Implementamos sistema de soporte para campañas con landings, CTAs y QA previo.',
              result: isEn ? 'Faster launch execution and lower operational friction for the team.' : 'Ejecución más rápida en lanzamiento y menor fricción operativa del equipo.',
            },
          ].map((study) => (
            <article key={study.client} className="border border-white/10 p-6 bg-white/[0.02]">
              <h3 className="font-serif text-2xl mb-3">{study.client}</h3>
              <p className="text-sm text-gray-300 mb-2"><strong>{isEn ? 'Challenge:' : 'Problema:'}</strong> {study.issue}</p>
              <p className="text-sm text-gray-300 mb-2"><strong>{isEn ? 'Actions:' : 'Acciones:'}</strong> {study.actions}</p>
              <p className="text-sm text-gray-300"><strong>{isEn ? 'Outcome:' : 'Resultado:'}</strong> {study.result}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="px-6 max-w-7xl mx-auto py-16">
        <h2 className="text-4xl md:text-5xl font-serif font-thin mb-8">{isEn ? 'Frequently asked questions' : 'Preguntas frecuentes'}</h2>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <details key={faq.q} className="border border-white/10 p-5 bg-white/[0.02]">
              <summary className="cursor-pointer text-white font-medium">{faq.q}</summary>
              <p className="text-gray-300 text-sm mt-3 leading-relaxed">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="px-6 max-w-7xl mx-auto py-8">
        <div className="border border-white/10 p-6 bg-white/[0.02]">
          <h2 className="text-3xl font-serif mb-4">{isEn ? 'Related services' : 'Servicios relacionados'}</h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            {isEn ? 'This strategy performs best when combined with ' : 'Esta estrategia se potencia cuando se integra con '}
            <Link href={`/${locale}/servicios/produccion-editorial`} className="text-[#D4AF37] hover:underline">{isEn ? 'editorial photo and video production' : 'producción editorial foto y video'}</Link>,{' '}
            <Link href={serviceHubHref} className="text-[#D4AF37] hover:underline">{isEn ? 'social media and social content' : 'social media y contenido social'}</Link>,{' '}
            <Link href={serviceHubHref} className="text-[#D4AF37] hover:underline">{isEn ? 'branding and identity' : 'branding e identidad'}</Link>{' '}
            {isEn ? 'and ' : 'y '}
            <Link href={serviceHubHref} className="text-[#D4AF37] hover:underline">{isEn ? 'website and ecommerce optimisation' : 'optimización web/ecommerce'}</Link>.
          </p>
        </div>
      </section>

      <section className="px-6 max-w-7xl mx-auto py-20">
        <div className="text-center border border-white/10 bg-gradient-to-r from-white/[0.02] to-[#D4AF37]/10 p-10">
          <h2 className="text-4xl md:text-5xl font-serif font-thin mb-4">{isEn ? 'Your digital presence, operating as one system' : 'Tu presencia digital, funcionando como sistema'}</h2>
          <p className="text-gray-300 max-w-3xl mx-auto mb-8">
            {isEn ? 'We propose a clear plan: quick wins, roadmap and continuous optimisation.' : 'Te proponemos un plan claro: quick wins, roadmap y optimización continua.'}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#cotizar" className="px-8 py-4 bg-[#D4AF37] text-black font-bold text-xs uppercase tracking-[0.35em] hover:bg-[#FC7CA4] transition-colors">{isEn ? 'Get a digital strategy quote' : 'Cotizar estrategia digital'}</a>
            <a href="mailto:contacto@sassystudio.com.mx" className="px-8 py-4 border border-white/25 text-white font-bold text-xs uppercase tracking-[0.35em] hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors">{isEn ? 'Book a call' : 'Agendar llamada'}</a>
          </div>
        </div>
      </section>

      <section id="cotizar" className="px-6 max-w-4xl mx-auto pb-24">
        <div className="border border-white/10 p-8 md:p-10 bg-black/40">
          <h2 className="text-3xl md:text-4xl font-serif font-thin mb-4">{isEn ? 'Request a strategy quote' : 'Cotizar estrategia'}</h2>
          <p className="text-gray-400 mb-6">{isEn ? 'Share your objective, website context and upcoming commercial milestones so we can propose an actionable plan.' : 'Compártenos objetivo, contexto del sitio y próximos hitos comerciales para proponerte un plan accionable.'}</p>
          <ContactForm isEn={isEn} />
        </div>
      </section>
    </main>
  );
}
