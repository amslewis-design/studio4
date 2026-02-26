'use client';

import { useMemo, useState } from 'react';
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

type GalleryCategory = 'Espacios' | 'Producto' | 'Gastronomía' | 'Momentos';

type GalleryItem = {
  src: string;
  category: GalleryCategory;
  caption: string;
  alt: string;
  filename: string;
};

const galleryItems: GalleryItem[] = [
  {
    src: 'https://res.cloudinary.com/ds86m2xm0/image/upload/f_auto,q_auto/v1770261224/5_cfkwxi.jpg',
    category: 'Espacios',
    caption: 'Lobby boutique con narrativa visual editorial para hospitality.',
    alt: 'Fotografía editorial de hotel boutique con luz natural en lobby y textura arquitectónica.',
    filename: 'produccion-editorial-foto-video-espacios-hotel.webp',
  },
  {
    src: 'https://res.cloudinary.com/ds86m2xm0/image/upload/f_auto,q_auto/v1770517992/7_rqcm14.webp',
    category: 'Producto',
    caption: 'Producto premium con set limpio para ecommerce y campañas.',
    alt: 'Fotografía de producto editorial para ecommerce con composición limpia y color controlado.',
    filename: 'produccion-editorial-fotografia-producto-ecommerce.webp',
  },
  {
    src: 'https://res.cloudinary.com/ds86m2xm0/image/upload/f_auto,q_auto/v1769605842/sassy-studio/cafe_tjpt9a.webp',
    category: 'Gastronomía',
    caption: 'Mesa editorial para restaurante, pensada para feed y pauta.',
    alt: 'Fotografía editorial de restaurante con luz natural y detalle de mesa.',
    filename: 'produccion-editorial-foto-video-gastronomia.webp',
  },
  {
    src: 'https://res.cloudinary.com/ds86m2xm0/image/upload/f_auto,q_auto/v1770261222/1_vd47a8.jpg',
    category: 'Momentos',
    caption: 'Momentos reales de marca para video editorial para redes sociales.',
    alt: 'Foto documental de equipo y cliente durante producción de contenido para marcas.',
    filename: 'produccion-editorial-momentos-marca.webp',
  },
];

const videoPlaceholders = [
  {
    title: 'Sample 01 · Espacios',
    spec: 'Vertical 9:16 · 8–10s · Reel de apertura',
  },
  {
    title: 'Sample 02 · Producto',
    spec: '4:5 · 10s · Cutdown para ads',
  },
  {
    title: 'Sample 03 · Gastronomía',
    spec: '9:16 · 6s · Hook para campañas',
  },
  {
    title: 'Sample 04 · Momentos',
    spec: '16:9 · 15s · Hero web/video cover',
  },
];

const processSteps = [
  {
    title: 'Brief + objetivos',
    body: 'Definimos canales, uso, audiencia y prioridad de negocio para que la producción de contenido para marcas tenga foco comercial.',
  },
  {
    title: 'Concepto editorial',
    body: 'Construimos referencias, narrativa visual y moodboard para alinear tono premium, producto y contexto de campaña.',
  },
  {
    title: 'Preproducción',
    body: 'Cerramos shot list, styling, locación, agenda y recursos para ejecutar foto y video para hoteles y restaurantes sin improvisación.',
  },
  {
    title: 'Producción',
    body: 'Ejecutamos foto + video con dirección en set para capturar espacios, people y detalle con estándar editorial.',
  },
  {
    title: 'Post',
    body: 'Hacemos selección, retoque, edición y exportaciones por formato para social, web, ads y contenido para ecommerce.',
  },
];

const industryCards = [
  {
    title: 'Hoteles y hospitalidad',
    outcomes: ['Mejor percepción premium', 'Más interacción en reels', 'Biblioteca visual reutilizable'],
    deliverables: ['Hero de espacios', 'Reels 9:16', 'Clips para ads', 'Foto lifestyle', 'Piezas para web'],
  },
  {
    title: 'Restaurantes y cafeterías',
    outcomes: ['Mayor deseo de visita', 'Mejor CTR en menú/campañas', 'Consistencia visual de marca'],
    deliverables: ['Fotografía gastronómica profesional', 'Video editorial para redes sociales', 'Contenido de cocina/servicio', 'Still life de platillos'],
  },
  {
    title: 'Marcas de producto / ecommerce',
    outcomes: ['Mejor tasa de conversión visual', 'Menos fricción en catálogo', 'Mayor rendimiento creativo en ads'],
    deliverables: ['Fotografía de producto editorial', 'Fondos limpios para ecommerce', 'UGC-style clips', 'Set de variaciones por ratio'],
  },
  {
    title: 'Retail y espacios',
    outcomes: ['Mayor tráfico a tienda', 'Narrativa visual consistente', 'Activos para lanzamientos'],
    deliverables: ['Foto de interiores', 'Video de recorrido', 'Contenido visual para campañas', 'Assets para landing'],
  },
  {
    title: 'Eventos premium / launches',
    outcomes: ['Cobertura publicable en 24–48h', 'Activos para prensa y social', 'Reutilización por temporada'],
    deliverables: ['Cobertura foto/video', 'Recaps cortos', 'Clips para paid social', 'Galería editorial'],
  },
];

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
        placeholder="Cuéntanos qué necesitas producir, fechas y canales."
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

export default function ProduccionEditorialPageClient({ locale, faqs }: Props) {
  const [activeFilter, setActiveFilter] = useState<GalleryCategory>('Espacios');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems = useMemo(
    () => galleryItems.filter((item) => item.category === activeFilter),
    [activeFilter]
  );

  return (
    <main className="min-h-screen bg-[#1a1a1a] text-white selection:bg-[#FC7CA4] selection:text-black" id="top">
      <Navbar />

      <section className="pt-32 md:pt-40 pb-10 px-6 max-w-7xl mx-auto">
        <nav aria-label="Breadcrumb" className="text-xs text-gray-400 mb-8 tracking-wide">
          <Link href={`/${locale}`} className="hover:text-white">Inicio</Link>
          <span className="mx-2">→</span>
          <Link href={`/${locale}/servicios`} className="hover:text-white">Servicios</Link>
          <span className="mx-2">→</span>
          <span className="text-white">Producción editorial</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-5xl md:text-7xl font-serif font-thin mb-6 leading-[0.95]">Producción editorial (Foto + Video)</h1>
            <p className="text-lg text-gray-300 leading-relaxed mb-4">
              Nuestra <strong>producción editorial foto y video</strong> captura espacios, productos, gastronomía y momentos con estándar premium para marcas que necesitan rendimiento en social, web y campañas.
            </p>
            <p className="text-gray-400 leading-relaxed mb-8">
              Dirigimos creatividad, styling y ejecución de set para entregar piezas listas para publicar. Optimizamos formatos desde el origen para IG, TikTok, landing pages y anuncios sin retrabajos innecesarios.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#enquiry" className="px-8 py-4 bg-[#D4AF37] text-black font-bold text-xs uppercase tracking-[0.35em] hover:bg-[#FC7CA4] transition-colors">Cotizar producción</a>
              <a href="#portfolio" className="px-8 py-4 border border-white/25 text-white font-bold text-xs uppercase tracking-[0.35em] hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors">Ver portafolio</a>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/5] border border-white/10 overflow-hidden relative bg-black">
              <Image
                src="https://res.cloudinary.com/ds86m2xm0/image/upload/f_auto,q_auto/v1768343750/IMG_4098_nbgkvo.jpg"
                alt="Producción editorial de foto y video para marca de hospitalidad en set con dirección creativa"
                fill
                priority
                className="object-cover opacity-85"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-xs text-white/80 bg-black/50 border border-white/10 p-3">
                Hero media spec: 4:5 (ideal), alternativa 16:9 · sujeto: espacio + producto + gastronomía + momento humano.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 max-w-7xl mx-auto pb-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {[
            ['Entregas para redes + web', 'M3 12h18M12 3v18M5 5l14 14'],
            ['Shot list + guía de styling', 'M4 6h16M4 12h16M4 18h10'],
            ['Retoque editorial / color', 'M4 12a8 8 0 1 0 16 0a8 8 0 1 0-16 0Z'],
            ['Licencias claras para uso comercial', 'M7 11V8a5 5 0 0 1 10 0v3M6 11h12v9H6z'],
            ['Producción en locación', 'M3 11l9-8l9 8v9H3z'],
          ].map(([label, path]) => (
            <div key={label} className="border border-white/10 bg-white/[0.02] p-4 flex items-center gap-3">
              <TrustIcon path={path} />
              <p className="text-sm text-gray-200">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 max-w-7xl mx-auto py-16">
        <h2 className="text-4xl md:text-5xl font-serif font-thin mb-4">¿Qué incluye la producción editorial?</h2>
        <p className="text-gray-300 max-w-4xl mb-12">
          Diseñamos un look premium que sí funciona en canales reales: feed, anuncios, landings y catálogo. Combinamos fotografía editorial para marcas con video editorial para redes sociales y piezas listas para performance.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              title: 'Espacios (hoteles, retail, arquitectura)',
              body: 'Foto y video para hoteles y restaurantes con enfoque en experiencia, atmósfera y decisión de compra.',
              image: 'https://res.cloudinary.com/ds86m2xm0/image/upload/f_auto,q_auto/v1770261224/5_cfkwxi.jpg',
              alt: 'Fotografía editorial de espacios de hotel con composición arquitectónica y luz cálida.',
              spec: '4:5 · WebP · sujeto: interior/exterior con profundidad y textura',
            },
            {
              title: 'Producto (ecommerce y campañas)',
              body: 'Fotografía de producto editorial con variantes para catálogo, landing y contenido para ecommerce.',
              image: 'https://res.cloudinary.com/ds86m2xm0/image/upload/f_auto,q_auto/v1770517992/7_rqcm14.webp',
              alt: 'Fotografía de producto editorial con set minimal para ecommerce y anuncios digitales.',
              spec: '1:1 y 4:5 · WebP · sujeto: producto hero + detalle de textura',
            },
            {
              title: 'Gastronomía (restaurantes, marcas de food)',
              body: 'Fotografía gastronómica profesional para menús visuales, campañas estacionales y redes.',
              image: 'https://res.cloudinary.com/ds86m2xm0/image/upload/f_auto,q_auto/v1769605842/sassy-studio/cafe_tjpt9a.webp',
              alt: 'Fotografía gastronómica profesional de platillo principal con luz natural lateral.',
              spec: '4:5 · WebP · sujeto: platillo hero + contexto de mesa',
            },
            {
              title: 'Momentos (people, eventos, behind-the-scenes)',
              body: 'Cobertura de momentos reales para construir credibilidad de marca y contenido visual para campañas.',
              image: 'https://res.cloudinary.com/ds86m2xm0/image/upload/f_auto,q_auto/v1770261222/1_vd47a8.jpg',
              alt: 'Foto editorial de momento humano en producción con interacción natural de equipo.',
              spec: '9:16 y 16:9 · WebP · sujeto: interacción humana y dinámica de marca',
            },
          ].map((card) => (
            <article key={card.title} className="border border-white/10 overflow-hidden bg-white/[0.02]">
              <div className="relative aspect-[16/10]">
                <Image src={card.image} alt={card.alt} fill className="object-cover" loading="lazy" sizes="(max-width: 768px) 100vw, 50vw" />
              </div>
              <div className="p-6 space-y-3">
                <h3 className="text-2xl font-serif">{card.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{card.body}</p>
                <p className="text-xs text-gray-500">Media spec: {card.spec}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="px-6 max-w-7xl mx-auto py-16">
        <h2 className="text-4xl md:text-5xl font-serif font-thin mb-8">Nuestro proceso (de brief a entrega)</h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-10">
          {processSteps.map((step, idx) => (
            <div key={step.title} className="border border-white/10 p-5 bg-black/30">
              <p className="text-xs text-[#D4AF37] tracking-[0.2em] uppercase mb-2">Paso {idx + 1}</p>
              <h3 className="font-serif text-xl mb-2">{step.title}</h3>
              <p className="text-sm text-gray-300">{step.body}</p>
            </div>
          ))}
        </div>

        <div className="border border-dashed border-white/20 p-4 mb-8 text-sm text-gray-400">
          Placeholder gráfico horizontal (5 pasos): Brief → Concepto → Preproducción → Producción → Post
        </div>

        <a href="#enquiry" className="inline-block px-8 py-3 border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-colors text-sm">
          ¿Tienes fecha? Reservemos producción.
        </a>
      </section>

      <section className="px-6 max-w-7xl mx-auto py-16">
        <h2 className="text-4xl md:text-5xl font-serif font-thin mb-8">Entregables listos para publicar</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="border border-white/10 p-6 bg-white/[0.02]">
            <h3 className="text-2xl font-serif mb-4">FOTO</h3>
            <ul className="space-y-2 text-gray-300 list-disc pl-5">
              <li>Selección curada</li>
              <li>Retoque editorial</li>
              <li>Exportaciones para web (peso optimizado)</li>
              <li>Formatos social 4:5 y 9:16</li>
              <li>Exportación print (si aplica)</li>
            </ul>
          </div>
          <div className="border border-white/10 p-6 bg-white/[0.02]">
            <h3 className="text-2xl font-serif mb-4">VIDEO</h3>
            <ul className="space-y-2 text-gray-300 list-disc pl-5">
              <li>Reels/TikTok 9:16</li>
              <li>Cutdowns para ads (6s, 10s, 15s)</li>
              <li>Master edit + versiones sin texto (si aplica)</li>
              <li>Subtítulos SRT opcional</li>
            </ul>
          </div>
        </div>
        <div className="border border-white/10 p-6 text-sm text-gray-400">
          Placeholder gráfico ratios + formats: 9:16 · 4:5 · 1:1 · 16:9
        </div>
      </section>

      <section className="px-6 max-w-7xl mx-auto py-16">
        <h2 className="text-4xl md:text-5xl font-serif font-thin mb-8">Producción editorial por industria</h2>
        <div className="space-y-4">
          {industryCards.map((industry) => (
            <details key={industry.title} className="border border-white/10 bg-white/[0.02] p-5">
              <summary className="cursor-pointer text-xl font-serif">{industry.title}</summary>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[#D4AF37] mb-2">Outcomes</p>
                  <ul className="list-disc pl-5 text-gray-300 space-y-1">
                    {industry.outcomes.map((outcome) => (
                      <li key={outcome}>{outcome}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[#D4AF37] mb-2">Deliverables típicos</p>
                  <ul className="list-disc pl-5 text-gray-300 space-y-1">
                    {industry.deliverables.map((deliverable) => (
                      <li key={deliverable}>{deliverable}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </details>
          ))}
        </div>
      </section>

      <section id="portfolio" className="px-6 max-w-7xl mx-auto py-16">
        <h2 className="text-4xl md:text-5xl font-serif font-thin mb-3">Portafolio: foto + video editorial</h2>
        <p className="text-gray-400 mb-6">Alt text recomendado en español descriptivo, orientado al sujeto y al contexto visual.</p>

        <div className="flex flex-wrap gap-3 mb-8">
          {(['Espacios', 'Producto', 'Gastronomía', 'Momentos'] as GalleryCategory[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`px-4 py-2 border text-sm transition-colors ${activeFilter === tab ? 'border-[#D4AF37] text-[#D4AF37]' : 'border-white/20 text-white/80 hover:border-white/50'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {filteredItems.map((item, index) => (
            <button
              key={item.filename}
              onClick={() => setLightboxIndex(index)}
              className="text-left border border-white/10 bg-white/[0.02] overflow-hidden"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  loading="lazy"
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="p-4">
                <p className="text-white text-sm mb-1">{item.caption}</p>
                <p className="text-xs text-gray-500">Filename sugerido: {item.filename}</p>
              </div>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {videoPlaceholders.map((video) => (
            <div key={video.title} className="border border-dashed border-white/20 p-5 bg-black/30">
              <h3 className="font-serif text-xl mb-2">{video.title}</h3>
              <p className="text-sm text-gray-400">{video.spec}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 max-w-7xl mx-auto py-16">
        <h2 className="text-4xl md:text-5xl font-serif font-thin mb-8">Resultados (casos cortos)</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              client: 'Hotel boutique (CDMX)',
              objective: 'Actualizar biblioteca visual para social + web.',
              produced: '42 fotos editoriales + 8 reels.',
              result: 'Aumento de interacción orgánica y mejor permanencia en página de habitaciones.',
            },
            {
              client: 'Marca de producto premium',
              objective: 'Escalar contenido para ecommerce y ads.',
              produced: 'Set de fotografía de producto editorial + cutdowns 6/10/15s.',
              result: 'Mejor rendimiento creativo en campañas y mayor consistencia visual de catálogo.',
            },
            {
              client: 'Restaurante fine casual',
              objective: 'Reposicionar propuesta gastronómica en redes.',
              produced: 'Fotografía gastronómica profesional + recaps de servicio.',
              result: 'Más consultas por DM y aumento de guardados en contenido de menú.',
            },
          ].map((study) => (
            <article key={study.client} className="border border-white/10 p-6 bg-white/[0.02]">
              <h3 className="font-serif text-2xl mb-4">{study.client}</h3>
              <p className="text-sm text-gray-300 mb-2"><strong>Objetivo:</strong> {study.objective}</p>
              <p className="text-sm text-gray-300 mb-2"><strong>Qué se produjo:</strong> {study.produced}</p>
              <p className="text-sm text-gray-300"><strong>Resultado:</strong> {study.result}</p>
              <div className="mt-4 border border-dashed border-white/15 p-3 text-xs text-gray-500">Placeholder visual: before/after o mockup de anuncio.</div>
            </article>
          ))}
        </div>
      </section>

      <section className="px-6 max-w-7xl mx-auto py-16">
        <h2 className="text-4xl md:text-5xl font-serif font-thin mb-6">¿Cuánto cuesta una producción editorial?</h2>
        <p className="text-gray-300 max-w-4xl mb-8">
          El alcance depende de locación, sets, styling, talento, horas de set, volumen de entregables y licencias. Por eso cotizamos por objetivo comercial y no por una lista genérica de piezas.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            'Contenido esencial (half-day)',
            'Campaña (full-day)',
            'Library mensual',
          ].map((tier) => (
            <div key={tier} className="border border-white/10 p-6 bg-white/[0.02]">
              <h3 className="font-serif text-2xl">{tier}</h3>
              <p className="text-gray-400 text-sm mt-3">Incluye propuesta de preproducción, ejecución y plan de entregables por formato.</p>
            </div>
          ))}
        </div>
        <a href="#enquiry" className="inline-block px-8 py-3 bg-[#D4AF37] text-black text-xs uppercase tracking-[0.35em] font-bold hover:bg-[#FC7CA4] transition-colors">
          Solicitar cotización
        </a>
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
            También puedes explorar nuestros servicios de{' '}
            <Link href={`/${locale}/services`} className="text-[#D4AF37] hover:underline">contenido social y gestión de redes</Link>,{' '}
            <Link href={`/${locale}/services`} className="text-[#D4AF37] hover:underline">branding e identidad visual</Link> y{' '}
            <Link href={`/${locale}/services`} className="text-[#D4AF37] hover:underline">optimización web y ecommerce</Link>.
          </p>
        </div>
      </section>

      <section className="px-6 max-w-7xl mx-auto py-20">
        <div className="text-center border border-white/10 bg-gradient-to-r from-white/[0.02] to-[#D4AF37]/10 p-10">
          <h2 className="text-4xl md:text-5xl font-serif font-thin mb-4">Listo para crear contenido editorial que venda y se vea premium</h2>
          <p className="text-gray-300 max-w-3xl mx-auto mb-8">
            Te proponemos un plan claro: concepto, shot list, tiempos de producción y entregables por canal para salir a publicar sin fricción.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#enquiry" className="px-8 py-4 bg-[#D4AF37] text-black font-bold text-xs uppercase tracking-[0.35em] hover:bg-[#FC7CA4] transition-colors">Cotizar producción editorial</a>
            <a href="mailto:contacto@sassystudio.com.mx" className="px-8 py-4 border border-white/25 text-white font-bold text-xs uppercase tracking-[0.35em] hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors">Agendar llamada</a>
          </div>
        </div>
      </section>

      <section id="enquiry" className="px-6 max-w-4xl mx-auto pb-24">
        <div className="border border-white/10 p-8 md:p-10 bg-black/40">
          <h2 className="text-3xl md:text-4xl font-serif font-thin mb-4">Cotizar producción</h2>
          <p className="text-gray-400 mb-6">Compártenos objetivo, fechas y canal prioritario. Te enviamos propuesta con alcance y entregables.</p>
          <ContactForm />
        </div>
      </section>

      {lightboxIndex !== null && filteredItems[lightboxIndex] && (
        <div className="fixed inset-0 z-[120] bg-black/90 p-6 flex items-center justify-center">
          <button onClick={() => setLightboxIndex(null)} className="absolute top-6 right-6 text-white text-3xl">×</button>
          <div className="relative w-full max-w-4xl aspect-[4/3]">
            <Image
              src={filteredItems[lightboxIndex].src}
              alt={filteredItems[lightboxIndex].alt}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>
        </div>
      )}
    </main>
  );
}
