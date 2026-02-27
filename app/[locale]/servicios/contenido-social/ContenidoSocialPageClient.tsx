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

type ExampleFilter = 'Fotos' | 'Reels' | 'Carruseles' | 'Stories';
type DeliverableTab = 'Mensual' | 'Por campaña';

type ExampleItem = {
  title: string;
  caption: string;
  alt: string;
  src: string;
  type: ExampleFilter;
};

const collageItems = [
  {
    src: 'https://res.cloudinary.com/ds86m2xm0/image/upload/f_auto,q_auto/v1770261224/5_cfkwxi.jpg',
    alt: 'Portada de reel para marca de hospitalidad con estética editorial y luz natural',
    label: 'Reel cover',
  },
  {
    src: 'https://res.cloudinary.com/ds86m2xm0/image/upload/f_auto,q_auto/v1770517992/7_rqcm14.webp',
    alt: 'Slide de carrusel para Instagram con composición limpia y jerarquía visual',
    label: 'Carrusel',
  },
  {
    src: 'https://res.cloudinary.com/ds86m2xm0/image/upload/f_auto,q_auto/v1769605842/sassy-studio/cafe_tjpt9a.webp',
    alt: 'Frame de stories para negocio gastronómico con llamada a la acción clara',
    label: 'Story frame',
  },
  {
    src: 'https://res.cloudinary.com/ds86m2xm0/image/upload/f_auto,q_auto/v1770261222/1_vd47a8.jpg',
    alt: 'Foto para redes sociales en feed premium con encuadre editorial',
    label: 'Foto post',
  },
];

const examples: ExampleItem[] = [
  {
    title: 'Foto feed restaurante boutique',
    caption: 'Fotografía para redes sociales orientada a deseo y guardados.',
    alt: 'Fotografía para redes sociales de restaurante boutique con mesa editorial y luz natural',
    src: 'https://res.cloudinary.com/ds86m2xm0/image/upload/f_auto,q_auto/v1769605842/sassy-studio/cafe_tjpt9a.webp',
    type: 'Fotos',
  },
  {
    title: 'Foto producto lifestyle',
    caption: 'Contenido social para marcas con foco en detalle y textura.',
    alt: 'Foto de producto lifestyle para contenido social de marca premium',
    src: 'https://res.cloudinary.com/ds86m2xm0/image/upload/f_auto,q_auto/v1770517992/7_rqcm14.webp',
    type: 'Fotos',
  },
  {
    title: 'Reel de experiencia',
    caption: 'Reels para marcas con hook inicial y ritmo de edición social-first.',
    alt: 'Preview de reel para marca de hospitalidad con secuencia vertical 9:16',
    src: 'https://res.cloudinary.com/ds86m2xm0/image/upload/f_auto,q_auto/v1770261224/5_cfkwxi.jpg',
    type: 'Reels',
  },
  {
    title: 'Reel de producto',
    caption: 'Contenido para TikTok o Instagram con foco en propuesta de valor.',
    alt: 'Preview de reel de producto con cortes rápidos y subtítulos para redes',
    src: 'https://res.cloudinary.com/ds86m2xm0/image/upload/f_auto,q_auto/v1770261222/1_vd47a8.jpg',
    type: 'Reels',
  },
  {
    title: 'Carrusel educativo',
    caption: 'Carruseles para Instagram con estructura de problema, método y cierre.',
    alt: 'Carrusel para Instagram con diseño editorial y tipografía de marca',
    src: 'https://res.cloudinary.com/ds86m2xm0/image/upload/f_auto,q_auto/v1771109435/coyoacanhero_hacfvs.webp',
    type: 'Carruseles',
  },
  {
    title: 'Carrusel prueba social',
    caption: 'Serie de slides para convertir interés en acción.',
    alt: 'Slides de carrusel para contenido social con testimonios y llamada a la acción',
    src: 'https://res.cloudinary.com/ds86m2xm0/image/upload/f_auto,q_auto/v1772129448/COYOAC%C3%81N-placeholder_qucawx.webp',
    type: 'Carruseles',
  },
  {
    title: 'Stories de interacción',
    caption: 'Stories para negocios con sticker flow y pregunta-respuesta.',
    alt: 'Frame de stories para negocio con CTA de respuesta y diseño vertical',
    src: 'https://res.cloudinary.com/ds86m2xm0/image/upload/f_auto,q_auto/v1768343750/IMG_4098_nbgkvo.jpg',
    type: 'Stories',
  },
  {
    title: 'Stories de conversión',
    caption: 'Secuencia de stories con argumento, oferta y CTA final.',
    alt: 'Secuencia de stories para marca con estructura de conversión',
    src: 'https://res.cloudinary.com/ds86m2xm0/image/upload/f_auto,q_auto/v1769302516/sassy-studio/Gemini_Generated_Image_ynrk3jynrk3jynrk_zzxlco.png',
    type: 'Stories',
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
        placeholder="Cuéntanos objetivo, frecuencia, formatos y si necesitas publicación o solo producción."
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

function PlaceholderSpec({ name, ratio, alt }: { name: string; ratio: string; alt: string }) {
  return (
    <div className="text-xs text-gray-400 border border-white/10 bg-black/30 p-3 mt-3">
      <p className="text-gray-300 mb-1">Archivo sugerido: {name}</p>
      <p className="mb-1">Proporción: {ratio}</p>
      <p>Alt sugerido: {alt}</p>
    </div>
  );
}

export default function ContenidoSocialPageClient({ locale, faqs }: Props) {
  const [activeFilter, setActiveFilter] = useState<ExampleFilter>('Fotos');
  const [activeTab, setActiveTab] = useState<DeliverableTab>('Mensual');
  const [selectedImage, setSelectedImage] = useState<ExampleItem | null>(null);

  const filteredExamples = useMemo(
    () => examples.filter((item) => item.type === activeFilter),
    [activeFilter]
  );

  return (
    <main className="min-h-screen bg-[#1a1a1a] text-white selection:bg-[#FC7CA4] selection:text-black" id="top">
      <Navbar />

      <section className="pt-32 md:pt-40 pb-12 px-6 max-w-7xl mx-auto">
        <nav aria-label="Breadcrumb" className="text-xs text-gray-400 mb-8 tracking-wide">
          <Link href={`/${locale}`} className="hover:text-white">Inicio</Link>
          <span className="mx-2">→</span>
          <Link href={`/${locale}/servicios`} className="hover:text-white">Servicios</Link>
          <span className="mx-2">→</span>
          <span className="text-white">Contenido social</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-5xl md:text-7xl font-serif font-thin mb-6 leading-[0.95]">Contenido social</h1>
            <p className="text-xl text-gray-300 leading-relaxed mb-4">
              Fotos, reels, carruseles y stories con narrativa consistente para que tu feed se sienta intencional y premium.
            </p>
            <p className="text-gray-400 leading-relaxed mb-8">
              Este servicio de <strong>contenido social</strong> combina producción de contenido para redes sociales con estándar editorial,
              lineamientos por formato, estrategia de contenido social y optimización continua del perfil para mantener coherencia visual,
              claridad de mensajes y CTAs accionables.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#cotizar" className="px-8 py-4 bg-[#D4AF37] text-black font-bold text-xs uppercase tracking-[0.35em] hover:bg-[#FC7CA4] transition-colors">Cotizar contenido social</a>
              <a href="#formatos" className="px-8 py-4 border border-white/25 text-white font-bold text-xs uppercase tracking-[0.35em] hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors">Ver formatos</a>
            </div>
          </div>

          <div>
            <div className="grid grid-cols-2 gap-3">
              {collageItems.map((item, index) => (
                <div key={item.label} className="relative aspect-square border border-white/10 overflow-hidden bg-black">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    priority={index === 0}
                    loading={index === 0 ? undefined : 'lazy'}
                    className="object-cover opacity-85"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <span className="absolute bottom-2 left-2 text-[10px] tracking-[0.2em] uppercase text-white/80">{item.label}</span>
                </div>
              ))}
            </div>
            <PlaceholderSpec
              name="contenido-social-collage.webp"
              ratio="1:1 por celda, collage 2x2"
              alt="Collage de contenido social con foto, reel, carrusel y stories para marca premium"
            />
          </div>
        </div>
      </section>

      <section className="px-6 max-w-7xl mx-auto pb-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {[
            'Narrativa y estética consistente',
            'Formatos nativos por plataforma',
            'Optimización continua del perfil',
            'Calendario y producción organizada',
            'Iteración según performance',
          ].map((point) => (
            <div key={point} className="border border-white/10 bg-white/[0.02] p-4 text-sm text-gray-200">
              {point}
            </div>
          ))}
        </div>
      </section>

      <section id="formatos" className="px-6 max-w-7xl mx-auto py-16">
        <h2 className="text-4xl md:text-5xl font-serif font-thin mb-4">Formatos que producimos</h2>
        <p className="text-gray-300 max-w-4xl mb-10">
          Creamos una biblioteca de activos que trabaja en conjunto para construir estética del feed, conversación, alcance y conversión.
          Cada formato tiene función específica dentro del calendario de contenido.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <article className="border border-white/10 p-6 bg-white/[0.02]">
            <h3 className="text-2xl font-serif mb-3">Fotos (feed y anuncios)</h3>
            <p className="text-gray-300 text-sm leading-relaxed mb-3">
              Fotografía para redes sociales enfocada en percepción premium, coherencia visual y versatilidad para pauta.
              Uso típico: feed, anuncios, portada de carrusel.
            </p>
            <p className="text-sm text-gray-400">Frecuencia sugerida: 6 a 12 piezas por mes.</p>
            <PlaceholderSpec name="fotos-feed-anuncios.webp" ratio="4:5 y 1:1" alt="Foto editorial para feed de Instagram con estética de marca" />
          </article>

          <article className="border border-white/10 p-6 bg-white/[0.02]">
            <h3 className="text-2xl font-serif mb-3">Reels (9:16, ritmo, hooks)</h3>
            <p className="text-gray-300 text-sm leading-relaxed mb-3">
              Reels para marcas con estructura clara de hook, desarrollo y cierre. Se diseñan para retención y claridad de propuesta.
              Uso típico: awareness, producto, prueba social.
            </p>
            <p className="text-sm text-gray-400">Frecuencia sugerida: 4 a 8 piezas por mes.</p>
            <PlaceholderSpec name="reels-9x16-marcas.webp" ratio="9:16" alt="Reel vertical para marca con subtítulos y hook visual" />
          </article>

          <article className="border border-white/10 p-6 bg-white/[0.02]">
            <h3 className="text-2xl font-serif mb-3">Carruseles (educación, prueba, storytelling)</h3>
            <p className="text-gray-300 text-sm leading-relaxed mb-3">
              Carruseles para Instagram con narrativa slide a slide para educar, argumentar valor y mover a acción.
              Uso típico: metodología, casos, diferenciadores.
            </p>
            <p className="text-sm text-gray-400">Frecuencia sugerida: 2 a 6 piezas por mes.</p>
            <PlaceholderSpec name="carruseles-instagram.webp" ratio="4:5 por slide" alt="Preview de carrusel de Instagram con diseño editorial" />
          </article>

          <article className="border border-white/10 p-6 bg-white/[0.02]">
            <h3 className="text-2xl font-serif mb-3">Stories (conversación y acción)</h3>
            <p className="text-gray-300 text-sm leading-relaxed mb-3">
              Stories para negocios con bloques de contexto, interacción y CTA. Útiles para continuidad diaria y activaciones.
              Uso típico: recordatorios, FAQs, oferta puntual.
            </p>
            <p className="text-sm text-gray-400">Frecuencia sugerida: 3 a 5 secuencias por semana.</p>
            <PlaceholderSpec name="stories-negocios.webp" ratio="9:16" alt="Secuencia de stories para negocio con CTA de contacto" />
          </article>
        </div>
      </section>

      <section className="px-6 max-w-7xl mx-auto py-16">
        <h2 className="text-4xl md:text-5xl font-serif font-thin mb-6">Una narrativa, no posts sueltos</h2>
        <p className="text-gray-300 max-w-4xl mb-8">
          La estrategia de contenido social se construye con pilares, series recurrentes, guías visuales y tono consistente.
          Así evitamos improvisación y mantenemos un sistema editorial que se reconoce en cada pieza.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 text-sm text-gray-300">
          <div className="border border-white/10 p-5">Pilares de contenido: autoridad, prueba, producto, comunidad y conversión.</div>
          <div className="border border-white/10 p-5">Series recurrentes: caso de semana, detrás del proceso, tip aplicado, prueba social.</div>
          <div className="border border-white/10 p-5">Guías visuales: tipografía, color, composición, encuadre, covers y subtítulos.</div>
          <div className="border border-white/10 p-5">Tono y voz: claridad, criterio editorial y foco en decisiones del cliente.</div>
        </div>
        <div className="border border-white/10 bg-black/30 p-6">
          <p className="text-sm text-gray-300">Placeholder de diagrama: Mapa de pilares + series (grid simple por pilar con ejemplos de piezas semanales).</p>
          <PlaceholderSpec name="pilares-contenido-social.webp" ratio="16:9" alt="Mapa de pilares de contenido social y series semanales" />
        </div>
      </section>

      <section className="px-6 max-w-7xl mx-auto py-16">
        <h2 className="text-4xl md:text-5xl font-serif font-thin mb-6">Optimización continua del perfil (para un feed premium)</h2>
        <p className="text-gray-300 max-w-4xl mb-8">
          No solo producimos contenido para redes sociales, también optimizamos cómo se presenta y convierte en el perfil.
          Esto mejora percepción, claridad y respuesta comercial.
        </p>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300 mb-8">
          <li className="border border-white/10 p-4">Bio y propuesta de valor claras por audiencia.</li>
          <li className="border border-white/10 p-4">Highlights y portadas consistentes por tema.</li>
          <li className="border border-white/10 p-4">Orden visual del grid y estética del feed.</li>
          <li className="border border-white/10 p-4">Enlaces y CTAs en link-in-bio con intención.</li>
          <li className="border border-white/10 p-4 md:col-span-2">Posts fijados para presentar oferta, prueba social y siguiente paso.</li>
        </ul>
        <div className="border border-white/10 bg-black/30 p-6">
          <p className="text-sm text-gray-300">Placeholder visual: Antes / después del perfil (wireframe sin datos reales).</p>
          <PlaceholderSpec name="optimizacion-perfil-instagram.webp" ratio="16:9" alt="Comparativa de perfil de Instagram antes y después de optimización" />
        </div>
      </section>

      <section className="px-6 max-w-7xl mx-auto py-16">
        <h2 className="text-4xl md:text-5xl font-serif font-thin mb-8">Nuestro proceso (de plan a publicación)</h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          {[
            ['Objetivos + audiencia', 'Definimos qué debe lograr el contenido social para marcas y qué comportamiento buscamos activar.'],
            ['Pilares + calendario', 'Traducimos estrategia en temas, series y frecuencia realista para el calendario de contenido.'],
            ['Producción', 'Ejecutamos foto y video con guiones y shot list según formato y prioridad comercial.'],
            ['Edición + diseño', 'Armamos covers, subtítulos, carruseles y versiones por formato para publicación fluida.'],
            ['Publicación + optimización', 'Ajustamos por desempeño para mejorar narrativa, hooks, estructura y conversión.'],
          ].map(([title, body], idx) => (
            <article key={title} className="border border-white/10 p-5 bg-black/30">
              <p className="text-xs text-[#D4AF37] tracking-[0.2em] uppercase mb-2">Paso {idx + 1}</p>
              <h3 className="font-serif text-xl mb-2">{title}</h3>
              <p className="text-sm text-gray-300">{body}</p>
            </article>
          ))}
        </div>
        <p className="text-sm text-[#D4AF37] mb-6">¿Tienes campaña o temporada? Lo integramos al calendario.</p>
        <div className="border border-white/10 bg-black/30 p-6">
          <p className="text-sm text-gray-300">Placeholder de diagrama horizontal de 5 pasos.</p>
          <PlaceholderSpec name="proceso-contenido-social.webp" ratio="21:9" alt="Diagrama de proceso de contenido social en cinco pasos" />
        </div>
      </section>

      <section id="entregables" className="px-6 max-w-7xl mx-auto py-16">
        <h2 className="text-4xl md:text-5xl font-serif font-thin mb-8">Entregables (listos para publicar)</h2>
        <div className="flex flex-wrap gap-3 mb-8">
          {(['Mensual', 'Por campaña'] as DeliverableTab[]).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 text-xs uppercase tracking-[0.25em] border transition-colors ${
                activeTab === tab
                  ? 'border-[#D4AF37] text-black bg-[#D4AF37]'
                  : 'border-white/20 text-white hover:border-[#D4AF37] hover:text-[#D4AF37]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'Mensual' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border border-white/10 p-6 bg-white/[0.02]">
              <h3 className="text-2xl font-serif mb-4">Mensual</h3>
              <ul className="space-y-2 text-gray-300 list-disc pl-5">
                <li>Biblioteca de contenido, fotos, reels, carruseles y stories.</li>
                <li>Plantillas de covers, tipografía y subtítulos cuando aplica.</li>
                <li>Optimización de perfil de Instagram y ajustes continuos.</li>
                <li>Calendario de publicación por objetivo y formato.</li>
                <li>Reporte ligero con aprendizajes y siguientes ajustes.</li>
              </ul>
            </div>
            <div className="border border-white/10 p-6 bg-black/30">
              <p className="text-sm text-gray-300 mb-2">Placeholder visual: Calendario mensual.</p>
              <PlaceholderSpec name="calendario-contenido-social.webp" ratio="16:10" alt="Calendario mensual de contenido social con formatos y fechas" />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border border-white/10 p-6 bg-white/[0.02]">
              <h3 className="text-2xl font-serif mb-4">Por campaña</h3>
              <ul className="space-y-2 text-gray-300 list-disc pl-5">
                <li>Concepto y serie de piezas, teaser, lanzamiento y prueba social.</li>
                <li>Adaptaciones por formato, feed, reel, carrusel y stories.</li>
                <li>Versiones para pauta cuando aplica, cutdowns y hooks alternos.</li>
                <li>Entrega organizada para ejecución rápida durante la campaña.</li>
              </ul>
            </div>
            <div className="border border-white/10 p-6 bg-black/30">
              <p className="text-sm text-gray-300 mb-2">Placeholder visual: Pack de formatos.</p>
              <PlaceholderSpec name="pack-formatos-campana.webp" ratio="16:10" alt="Mockup de pack de formatos para campaña social" />
            </div>
          </div>
        )}
      </section>

      <section id="ejemplos" className="px-6 max-w-7xl mx-auto py-16">
        <h2 className="text-4xl md:text-5xl font-serif font-thin mb-4">Ejemplos de contenido social</h2>
        <p className="text-gray-300 max-w-4xl mb-8">
          Explora ejemplos por formato para comparar estilo, estructura y objetivo. Usamos contenido premium para Instagram con variaciones por canal.
        </p>

        <div className="flex flex-wrap gap-3 mb-8">
          {(['Fotos', 'Reels', 'Carruseles', 'Stories'] as ExampleFilter[]).map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2 text-xs uppercase tracking-[0.25em] border transition-colors ${
                activeFilter === filter
                  ? 'border-[#D4AF37] text-black bg-[#D4AF37]'
                  : 'border-white/20 text-white hover:border-[#D4AF37] hover:text-[#D4AF37]'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredExamples.map((item) => (
            <article key={item.title} className="border border-white/10 bg-white/[0.02] overflow-hidden">
              <button
                type="button"
                onClick={() => setSelectedImage(item)}
                className="relative aspect-[4/3] w-full text-left"
                aria-label={`Abrir ejemplo: ${item.title}`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  loading="lazy"
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </button>
              <div className="p-4">
                <h3 className="text-xl font-serif mb-1">{item.title}</h3>
                <p className="text-sm text-gray-300">{item.caption}</p>
              </div>
            </article>
          ))}
        </div>

        {selectedImage && (
          <div className="fixed inset-0 z-[120] bg-black/90 p-6 flex items-center justify-center" onClick={() => setSelectedImage(null)}>
            <div className="relative w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
              <button type="button" onClick={() => setSelectedImage(null)} className="absolute -top-10 right-0 text-white text-sm">
                Cerrar
              </button>
              <div className="relative aspect-[4/3] border border-white/20">
                <Image src={selectedImage.src} alt={selectedImage.alt} fill className="object-contain" sizes="100vw" />
              </div>
            </div>
          </div>
        )}

        <div className="border border-white/10 bg-black/30 p-4 mt-8 text-sm text-gray-300">
          Guía de alt text: describe formato, sujeto principal, acción y objetivo comercial de la pieza en lenguaje claro.
        </div>
      </section>

      <section className="px-6 max-w-7xl mx-auto py-16">
        <h2 className="text-4xl md:text-5xl font-serif font-thin mb-6">¿Cómo trabajamos?</h2>
        <p className="text-gray-300 max-w-4xl mb-8">
          Ofrecemos producción mensual de contenido social, contenido por campaña y optimización de perfil incluida dentro del alcance acordado.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <article className="border border-white/10 p-5 bg-white/[0.02]">Producción mensual de contenido</article>
          <article className="border border-white/10 p-5 bg-white/[0.02]">Contenido por campaña, lanzamientos y temporadas</article>
          <article className="border border-white/10 p-5 bg-white/[0.02]">Optimización de perfil incluida</article>
        </div>
        <p className="text-sm text-gray-400 mb-8">
          Nota de alcance: este servicio no incluye community management 24/7 ni atención permanente de mensajes, salvo contratación específica.
        </p>
        <a href="#cotizar" className="inline-block px-8 py-3 border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-colors text-sm">
          Cotizar contenido social
        </a>
      </section>

      <section className="px-6 max-w-7xl mx-auto py-8">
        <div className="border border-white/10 p-6 bg-white/[0.02]">
          <h2 className="text-3xl font-serif mb-4">Servicios relacionados</h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            Para fortalecer resultados, combina este servicio con{' '}
            <Link href={`/${locale}/servicios/produccion-editorial`} className="text-[#D4AF37] hover:underline">producción editorial foto y video</Link>{' '}
            para elevar assets premium,{' '}
            <Link href={`/${locale}/servicios/estrategia-digital`} className="text-[#D4AF37] hover:underline">estrategia digital para web y campañas</Link>{' '}
            y servicios de{' '}
            <Link href={`/${locale}/services`} className="text-[#D4AF37] hover:underline">branding y sistema web/ecommerce</Link>{' '}
            cuando buscas coherencia integral.
          </p>
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

      <section className="px-6 max-w-7xl mx-auto py-20">
        <div className="text-center border border-white/10 bg-gradient-to-r from-white/[0.02] to-[#D4AF37]/10 p-10">
          <h2 className="text-4xl md:text-5xl font-serif font-thin mb-4">Un feed premium se construye con consistencia</h2>
          <p className="text-gray-300 max-w-3xl mx-auto mb-8">
            Te proponemos un sistema: narrativa, formatos, calendario y optimización continua.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#cotizar" className="px-8 py-4 bg-[#D4AF37] text-black font-bold text-xs uppercase tracking-[0.35em] hover:bg-[#FC7CA4] transition-colors">Cotizar contenido social</a>
            <a href="mailto:contacto@sassystudio.com.mx" className="px-8 py-4 border border-white/25 text-white font-bold text-xs uppercase tracking-[0.35em] hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors">Agendar llamada</a>
          </div>
        </div>
      </section>

      <section id="cotizar" className="px-6 max-w-4xl mx-auto pb-24">
        <div className="border border-white/10 p-8 md:p-10 bg-black/40">
          <h2 className="text-3xl md:text-4xl font-serif font-thin mb-4">Cotizar contenido social</h2>
          <p className="text-gray-400 mb-6">
            Comparte objetivos, frecuencia, formatos y alcance esperado para proponerte una estructura clara de contenido social para marcas.
          </p>
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
