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

function ContactForm() {
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
        placeholder="Nombre"
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
        placeholder="Cuéntanos objetivo, tiempos y prioridades comerciales."
        className="w-full bg-black/40 border border-white/15 px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] resize-none"
      />
      <button
        type="submit"
        className="w-full bg-[#D4AF37] text-black py-4 uppercase tracking-[0.35em] text-xs font-bold hover:bg-[#FC7CA4] transition-colors"
      >
        Submit Form
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
  return (
    <main className="min-h-screen bg-[#1a1a1a] text-white selection:bg-[#FC7CA4] selection:text-black" id="top">
      <Navbar />

      <section className="pt-32 md:pt-40 pb-12 px-6 max-w-7xl mx-auto">
        <nav aria-label="Breadcrumb" className="text-xs text-gray-400 mb-8 tracking-wide">
          <Link href={`/${locale}`} className="hover:text-white">Inicio</Link>
          <span className="mx-2">→</span>
          <Link href={`/${locale}/servicios`} className="hover:text-white">Servicios</Link>
          <span className="mx-2">→</span>
          <span className="text-white">Estrategia digital</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-5xl md:text-7xl font-serif font-thin mb-6 leading-[0.95]">Estrategia digital</h1>
            <p className="text-xl text-gray-300 leading-relaxed mb-4">
              Optimización continua para que tu web, contenido y campañas trabajen como un sistema: mejor UX, mejor estructura, mejores conversiones.
            </p>
            <p className="text-gray-400 leading-relaxed mb-8">
              Ejecutamos estrategia digital para marcas con mantenimiento web, optimización web, diseño y configuración de páginas, estrategia de contenidos para blog, newsletter para marcas y soporte para campañas, lanzamientos y temporadas.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#cotizar" className="px-8 py-4 bg-[#D4AF37] text-black font-bold text-xs uppercase tracking-[0.35em] hover:bg-[#FC7CA4] transition-colors">Cotizar estrategia</a>
              <a href="#entregables" className="px-8 py-4 border border-white/25 text-white font-bold text-xs uppercase tracking-[0.35em] hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors">Ver entregables</a>
            </div>
          </div>

          <div className="relative">
            <div className="relative aspect-[4/5] border border-white/10 overflow-hidden bg-black">
              <Image
                src="https://res.cloudinary.com/ds86m2xm0/image/upload/f_auto,q_auto/v1769302516/sassy-studio/Gemini_Generated_Image_ynrk3jynrk3jynrk_zzxlco.png"
                alt="Mapa visual del sistema digital con web, contenido, email y campañas conectados"
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
            ['Optimización web continua', 'M3 12h18M12 3v18M5 5l14 14'],
            ['UX + CTAs orientados a acción', 'M4 6h16M4 12h16M4 18h10'],
            ['Estructura de enlaces internos', 'M3 12h6l3 3m12-9h-6l-3-3'],
            ['Blog y newsletter con consistencia', 'M4 5h16v14H4zM8 9h8M8 13h5'],
            ['Soporte para campañas y temporadas', 'M7 3v3M17 3v3M4 8h16M5 6h14v14H5z'],
          ].map(([label, path]) => (
            <div key={label} className="border border-white/10 bg-white/[0.02] p-4 flex items-center gap-3">
              <TrustIcon path={path} />
              <p className="text-sm text-gray-200">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 max-w-7xl mx-auto py-16">
        <h2 className="text-4xl md:text-5xl font-serif font-thin mb-4">¿Qué cubre nuestra estrategia digital?</h2>
        <p className="text-gray-300 max-w-4xl mb-12">
          No es consultoría en abstracto. Es estrategia digital para marcas conectada con ejecución diaria, priorizada por impacto en conversión, claridad de navegación y consistencia comercial.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            ['Mantenimiento y optimización web', 'Ajustes continuos de estructura, velocidad percibida, módulos y contenido para sostener rendimiento.'],
            ['Diseño y configuración de páginas', 'Configuramos páginas clave con jerarquía clara, mensajes correctos y llamados a la acción (CTAs) por intención.'],
            ['Blog: estructura, calendario y publicación', 'Definimos pilares, categorías y flujo de publicación para que la estrategia de contenidos tenga continuidad real.'],
            ['Newsletter: estructura, envíos y segmentación básica', 'Implementamos un esquema de envío simple y consistente para retención, demanda y reactivación.'],
            ['Soporte para campañas (lanzamientos/temporadas)', 'Preparamos landings, mensajes y ajustes del sitio para ventanas comerciales críticas.'],
            ['Mejoras UX, enlaces internos y CTAs', 'Ordenamos rutas de navegación y estructura de enlaces internos para reducir fricción y mejorar acción.'],
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
        <h2 className="text-4xl md:text-5xl font-serif font-thin mb-6">Antes de mover piezas: diagnóstico</h2>
        <p className="text-gray-300 max-w-4xl mb-8">
          Revisamos estructura del sitio, navegación, rutas hacia conversión, contenido existente y puntos de fricción. La auditoría de sitio web permite ordenar prioridades antes de implementar.
        </p>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300 mb-8">
          <li className="border border-white/10 p-4">Estructura del sitio y navegación</li>
          <li className="border border-white/10 p-4">Rutas hacia conversión y llamadas a la acción (CTAs)</li>
          <li className="border border-white/10 p-4">Performance básico y experiencia de uso</li>
          <li className="border border-white/10 p-4">Contenido activo de blog y newsletter</li>
          <li className="border border-white/10 p-4 md:col-span-2">Journeys por objetivo: captación, leads, ventas o reservas</li>
        </ul>
      </section>

      <section className="px-6 max-w-7xl mx-auto py-16">
        <h2 className="text-4xl md:text-5xl font-serif font-thin mb-8">Nuestro proceso (de auditoría a optimización)</h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-10">
          {[
            ['Objetivos + KPIs', 'Definimos qué significa mejorar para tu marca y cómo se medirá.'],
            ['Auditoría rápida', 'Revisamos UX, contenido, estructura, enlaces y CTAs por prioridad.'],
            ['Plan de acción', 'Priorizamos quick wins y construimos roadmap para ejecución ordenada.'],
            ['Implementación', 'Ejecutamos en web, blog, newsletter y soporte para campañas activas.'],
            ['Iteración mensual', 'Aprendemos de resultados y aplicamos mejoras continuas.'],
          ].map(([title, body], idx) => (
            <article key={title} className="border border-white/10 p-5 bg-black/30">
              <p className="text-xs text-[#D4AF37] tracking-[0.2em] uppercase mb-2">Paso {idx + 1}</p>
              <h3 className="font-serif text-xl mb-2">{title}</h3>
              <p className="text-sm text-gray-300">{body}</p>
            </article>
          ))}
        </div>
        <a href="#cotizar" className="inline-block px-8 py-3 border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-colors text-sm">
          ¿Tienes lanzamiento cerca? Lo preparamos con tiempo.
        </a>
      </section>

      <section id="entregables" className="px-6 max-w-7xl mx-auto py-16">
        <h2 className="text-4xl md:text-5xl font-serif font-thin mb-8">Entregables (claros y accionables)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="border border-white/10 p-6 bg-white/[0.02]">
            <h3 className="text-2xl font-serif mb-4">Proyecto</h3>
            <ul className="space-y-2 text-gray-300 list-disc pl-5">
              <li>Auditoría UX + estructura</li>
              <li>Plan de estructura de enlaces internos y CTAs</li>
              <li>Arquitectura de blog + categorías</li>
              <li>Plantillas base (página, post, newsletter)</li>
              <li>Checklist de optimización (performance y SEO on-page básico)</li>
            </ul>
          </div>
          <div className="border border-white/10 p-6 bg-white/[0.02]">
            <h3 className="text-2xl font-serif mb-4">Mensual</h3>
            <ul className="space-y-2 text-gray-300 list-disc pl-5">
              <li>Mantenimiento web (actualizaciones y ajustes)</li>
              <li>Mejoras UX continuas</li>
              <li>Publicación de blog (estructura + subida)</li>
              <li>Newsletter (plan + envío)</li>
              <li>Soporte a campañas (landing + CTAs + QA)</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="px-6 max-w-7xl mx-auto py-16">
        <h2 className="text-4xl md:text-5xl font-serif font-thin mb-6">Soporte para campañas, lanzamientos y temporadas</h2>
        <p className="text-gray-300 max-w-4xl mb-8">
          Armamos la capa estratégica y operativa para que tus campañas corran con orden comercial y técnica, sin depender de ajustes de último minuto.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 text-gray-300">
          <div className="border border-white/10 p-4">Landing pages con estructura y CTAs por objetivo</div>
          <div className="border border-white/10 p-4">Mensajes y secuencias en newsletter</div>
          <div className="border border-white/10 p-4">Ajustes temporales de navegación y módulos</div>
          <div className="border border-white/10 p-4">Coordinación de activos con producción editorial si aplica</div>
          <div className="border border-white/10 p-4 md:col-span-2">Medición base con UTMs y eventos cuando exista infraestructura</div>
        </div>
      </section>

      <section className="px-6 max-w-7xl mx-auto py-16">
        <h2 className="text-4xl md:text-5xl font-serif font-thin mb-6">UX, enlaces internos y CTAs que guían</h2>
        <p className="text-gray-300 max-w-4xl mb-8">
          Trabajamos la jerarquía de páginas, enlaces contextuales y llamadas a la acción por intención para reducir fricción y mejorar optimización de conversión cuando corresponde al objetivo comercial.
        </p>
      </section>

      <section className="px-6 max-w-7xl mx-auto py-16">
        <h2 className="text-4xl md:text-5xl font-serif font-thin mb-6">Blog y newsletter: estructura antes que volumen</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <article className="border border-white/10 p-6 bg-white/[0.02]">
            <h3 className="text-2xl font-serif mb-3">Blog</h3>
            <ul className="space-y-2 text-gray-300 list-disc pl-5">
              <li>Categorías y pilares claros</li>
              <li>Calendario editorial realista</li>
              <li>Estructura de post con interlinking y CTA</li>
              <li>Publicación consistente con formato optimizado</li>
            </ul>
          </article>
          <article className="border border-white/10 p-6 bg-white/[0.02]">
            <h3 className="text-2xl font-serif mb-3">Newsletter</h3>
            <ul className="space-y-2 text-gray-300 list-disc pl-5">
              <li>Estructura por secciones fijas</li>
              <li>Frecuencia recomendada por capacidad operativa</li>
              <li>Segmentación básica cuando aplica</li>
              <li>Enfoque en retención y demanda</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="px-6 max-w-7xl mx-auto py-16">
        <h2 className="text-4xl md:text-5xl font-serif font-thin mb-8">Resultados (casos cortos)</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              client: 'Marca de hospitalidad',
              issue: 'Navegación confusa y CTAs dispersos.',
              actions: 'Reordenamos estructura, jerarquía de CTAs y enlaces internos entre servicios y blog.',
              result: 'Aumento de leads calificados y mejor tiempo en páginas de servicio.',
            },
            {
              client: 'Ecommerce de producto',
              issue: 'Contenido sin ruta clara entre blog, producto y newsletter.',
              actions: 'Diseñamos calendario editorial, estructura de post y secuencia de newsletter mensual.',
              result: 'Mejor CTR hacia páginas comerciales y mayor recurrencia de visitas.',
            },
            {
              client: 'Negocio con lanzamientos estacionales',
              issue: 'Cada campaña iniciaba sin base de página ni mensajes preparados.',
              actions: 'Implementamos sistema de soporte para campañas con landings, CTAs y QA previo.',
              result: 'Ejecución más rápida en lanzamiento y menor fricción operativa del equipo.',
            },
          ].map((study) => (
            <article key={study.client} className="border border-white/10 p-6 bg-white/[0.02]">
              <h3 className="font-serif text-2xl mb-3">{study.client}</h3>
              <p className="text-sm text-gray-300 mb-2"><strong>Problema:</strong> {study.issue}</p>
              <p className="text-sm text-gray-300 mb-2"><strong>Acciones:</strong> {study.actions}</p>
              <p className="text-sm text-gray-300"><strong>Resultado:</strong> {study.result}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="px-6 max-w-7xl mx-auto py-16">
        <h2 className="text-4xl md:text-5xl font-serif font-thin mb-8">Preguntas frecuentes</h2>
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
          <h2 className="text-3xl font-serif mb-4">Servicios relacionados</h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            Esta estrategia se potencia cuando se integra con{' '}
            <Link href={`/${locale}/servicios/produccion-editorial`} className="text-[#D4AF37] hover:underline">producción editorial foto y video</Link>,{' '}
            <Link href={`/${locale}/services`} className="text-[#D4AF37] hover:underline">social media y contenido social</Link>,{' '}
            <Link href={`/${locale}/services`} className="text-[#D4AF37] hover:underline">branding e identidad</Link> y{' '}
            <Link href={`/${locale}/services`} className="text-[#D4AF37] hover:underline">optimización web/ecommerce</Link>.
          </p>
        </div>
      </section>

      <section className="px-6 max-w-7xl mx-auto py-20">
        <div className="text-center border border-white/10 bg-gradient-to-r from-white/[0.02] to-[#D4AF37]/10 p-10">
          <h2 className="text-4xl md:text-5xl font-serif font-thin mb-4">Tu presencia digital, funcionando como sistema</h2>
          <p className="text-gray-300 max-w-3xl mx-auto mb-8">
            Te proponemos un plan claro: quick wins, roadmap y optimización continua.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#cotizar" className="px-8 py-4 bg-[#D4AF37] text-black font-bold text-xs uppercase tracking-[0.35em] hover:bg-[#FC7CA4] transition-colors">Cotizar estrategia digital</a>
            <a href="mailto:contacto@sassystudio.com.mx" className="px-8 py-4 border border-white/25 text-white font-bold text-xs uppercase tracking-[0.35em] hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors">Agendar llamada</a>
          </div>
        </div>
      </section>

      <section id="cotizar" className="px-6 max-w-4xl mx-auto pb-24">
        <div className="border border-white/10 p-8 md:p-10 bg-black/40">
          <h2 className="text-3xl md:text-4xl font-serif font-thin mb-4">Cotizar estrategia</h2>
          <p className="text-gray-400 mb-6">Compártenos objetivo, contexto del sitio y próximos hitos comerciales para proponerte un plan accionable.</p>
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
