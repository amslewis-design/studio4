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

type ExampleFilter = 'photos' | 'reels' | 'carousels' | 'stories';
type DeliverableTab = 'monthly' | 'campaign';

type ExampleItem = {
  title: string;
  titleEn: string;
  caption: string;
  captionEn: string;
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
    titleEn: 'Boutique restaurant feed photo',
    caption: 'Fotografía para redes sociales orientada a deseo y guardados.',
    captionEn: 'Social photography designed to drive desire and saves.',
    alt: 'Fotografía para redes sociales de restaurante boutique con mesa editorial y luz natural',
    src: 'https://res.cloudinary.com/ds86m2xm0/image/upload/f_auto,q_auto/v1769605842/sassy-studio/cafe_tjpt9a.webp',
    type: 'photos',
  },
  {
    title: 'Foto producto lifestyle',
    titleEn: 'Lifestyle product photo',
    caption: 'Contenido social para marcas con foco en detalle y textura.',
    captionEn: 'Social content for brands focused on detail and texture.',
    alt: 'Foto de producto lifestyle para contenido social de marca premium',
    src: 'https://res.cloudinary.com/ds86m2xm0/image/upload/f_auto,q_auto/v1770517992/7_rqcm14.webp',
    type: 'photos',
  },
  {
    title: 'Reel de experiencia',
    titleEn: 'Experience reel',
    caption: 'Reels para marcas con hook inicial y ritmo de edición social-first.',
    captionEn: 'Brand reels with a strong opening hook and social-first edit pacing.',
    alt: 'Preview de reel para marca de hospitalidad con secuencia vertical 9:16',
    src: 'https://res.cloudinary.com/ds86m2xm0/image/upload/f_auto,q_auto/v1770261224/5_cfkwxi.jpg',
    type: 'reels',
  },
  {
    title: 'Reel de producto',
    titleEn: 'Product reel',
    caption: 'Contenido para TikTok o Instagram con foco en propuesta de valor.',
    captionEn: 'TikTok or Instagram content focused on value proposition.',
    alt: 'Preview de reel de producto con cortes rápidos y subtítulos para redes',
    src: 'https://res.cloudinary.com/ds86m2xm0/image/upload/f_auto,q_auto/v1770261222/1_vd47a8.jpg',
    type: 'reels',
  },
  {
    title: 'Carrusel educativo',
    titleEn: 'Educational carousel',
    caption: 'Carruseles para Instagram con estructura de problema, método y cierre.',
    captionEn: 'Instagram carousels using a problem-method-close structure.',
    alt: 'Carrusel para Instagram con diseño editorial y tipografía de marca',
    src: 'https://res.cloudinary.com/ds86m2xm0/image/upload/f_auto,q_auto/v1771109435/coyoacanhero_hacfvs.webp',
    type: 'carousels',
  },
  {
    title: 'Carrusel prueba social',
    titleEn: 'Social proof carousel',
    caption: 'Serie de slides para convertir interés en acción.',
    captionEn: 'Slide sequence designed to convert interest into action.',
    alt: 'Slides de carrusel para contenido social con testimonios y llamada a la acción',
    src: 'https://res.cloudinary.com/ds86m2xm0/image/upload/f_auto,q_auto/v1772129448/COYOAC%C3%81N-placeholder_qucawx.webp',
    type: 'carousels',
  },
  {
    title: 'Stories de interacción',
    titleEn: 'Interaction stories',
    caption: 'Stories para negocios con sticker flow y pregunta-respuesta.',
    captionEn: 'Stories for businesses with sticker flow and Q&A prompts.',
    alt: 'Frame de stories para negocio con CTA de respuesta y diseño vertical',
    src: 'https://res.cloudinary.com/ds86m2xm0/image/upload/f_auto,q_auto/v1768343750/IMG_4098_nbgkvo.jpg',
    type: 'stories',
  },
  {
    title: 'Stories de conversión',
    titleEn: 'Conversion stories',
    caption: 'Secuencia de stories con argumento, oferta y CTA final.',
    captionEn: 'Story sequence with argument, offer and final CTA.',
    alt: 'Secuencia de stories para marca con estructura de conversión',
    src: 'https://res.cloudinary.com/ds86m2xm0/image/upload/f_auto,q_auto/v1769302516/sassy-studio/Gemini_Generated_Image_ynrk3jynrk3jynrk_zzxlco.png',
    type: 'stories',
  },
];

function ContactForm({ isEn }: { isEn: boolean }) {
  const [result, setResult] = useState('');

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setResult(isEn ? 'Sending...' : 'Enviando...');
    const formData = new FormData(event.currentTarget);
    formData.append('access_key', 'ecc15eb8-54e8-4e41-ab55-4420220a880f');

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    if (data.success) {
      setResult(isEn ? 'Form submitted successfully' : 'Formulario enviado con éxito');
      event.currentTarget.reset();
    } else {
      setResult(isEn ? 'Error submitting form' : 'Error al enviar el formulario');
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
        placeholder={isEn ? 'Email' : 'Email'}
        className="w-full bg-black/40 border border-white/15 px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37]"
      />
      <textarea
        name="message"
        required
        rows={5}
        placeholder={
          isEn
            ? 'Tell us your goals, cadence, preferred formats, and whether you need publishing support or production only.'
            : 'Cuéntanos objetivo, frecuencia, formatos y si necesitas publicación o solo producción.'
        }
        className="w-full bg-black/40 border border-white/15 px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] resize-none"
      />
      <button
        type="submit"
        className="w-full bg-[#D4AF37] text-black py-4 uppercase tracking-[0.35em] text-xs font-bold hover:bg-[#FC7CA4] transition-colors"
      >
        {isEn ? 'Submit form' : 'Enviar formulario'}
      </button>
      <span className="block text-sm text-gray-300 text-center">{result}</span>
    </form>
  );
}

function PlaceholderSpec({ name, ratio, alt, isEn }: { name: string; ratio: string; alt: string; isEn: boolean }) {
  return (
    <div className="text-xs text-gray-400 border border-white/10 bg-black/30 p-3 mt-3">
      <p className="text-gray-300 mb-1">{isEn ? 'Suggested file' : 'Archivo sugerido'}: {name}</p>
      <p className="mb-1">
        {isEn
          ? 'Recommended ratio: based on this section layout.'
          : `Proporción: ${ratio}`}
      </p>
      <p>
        {isEn
          ? 'Suggested alt text: describe the format, main subject, action and commercial intent.'
          : `Alt sugerido: ${alt}`}
      </p>
    </div>
  );
}

export default function ContenidoSocialPageClient({ locale, faqs }: Props) {
  const isEn = locale === 'en';
  const [activeFilter, setActiveFilter] = useState<ExampleFilter>('photos');
  const [activeTab, setActiveTab] = useState<DeliverableTab>('monthly');
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
          <Link href={`/${locale}`} className="hover:text-white">{isEn ? 'Home' : 'Inicio'}</Link>
          <span className="mx-2">→</span>
          <Link href={`/${locale}/servicios`} className="hover:text-white">{isEn ? 'Services' : 'Servicios'}</Link>
          <span className="mx-2">→</span>
          <span className="text-white">{isEn ? 'Social content' : 'Contenido social'}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-5xl md:text-7xl font-serif font-thin mb-6 leading-[0.95]">{isEn ? 'Social content' : 'Contenido social'}</h1>
            <p className="text-xl text-gray-300 leading-relaxed mb-4">
              {isEn
                ? 'Photos, reels, carousels and stories with consistent narrative so your feed feels intentional and premium.'
                : 'Fotos, reels, carruseles y stories con narrativa consistente para que tu feed se sienta intencional y premium.'}
            </p>
            <p className="text-gray-400 leading-relaxed mb-8">
              {isEn ? (
                <>
                  This <strong>social content</strong> service combines social media content production with an editorial standard,
                  format-by-format guidelines, social content strategy and ongoing profile optimisation to maintain visual coherence,
                  message clarity and actionable CTAs.
                </>
              ) : (
                <>
                  Este servicio de <strong>contenido social</strong> combina producción de contenido para redes sociales con estándar editorial,
                  lineamientos por formato, estrategia de contenido social y optimización continua del perfil para mantener coherencia visual,
                  claridad de mensajes y CTAs accionables.
                </>
              )}
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#cotizar" className="px-8 py-4 bg-[#D4AF37] text-black font-bold text-xs uppercase tracking-[0.35em] hover:bg-[#FC7CA4] transition-colors">{isEn ? 'Get a social content quote' : 'Cotizar contenido social'}</a>
              <a href="#formatos" className="px-8 py-4 border border-white/25 text-white font-bold text-xs uppercase tracking-[0.35em] hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors">{isEn ? 'View formats' : 'Ver formatos'}</a>
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
              isEn={isEn}
            />
          </div>
        </div>
      </section>

      <section className="px-6 max-w-7xl mx-auto pb-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {[
            isEn ? 'Consistent narrative and aesthetic' : 'Narrativa y estética consistente',
            isEn ? 'Native formats by platform' : 'Formatos nativos por plataforma',
            isEn ? 'Ongoing profile optimisation' : 'Optimización continua del perfil',
            isEn ? 'Calendar-led, organised production' : 'Calendario y producción organizada',
            isEn ? 'Iteration based on performance' : 'Iteración según performance',
          ].map((point) => (
            <div key={point} className="border border-white/10 bg-white/[0.02] p-4 text-sm text-gray-200">
              {point}
            </div>
          ))}
        </div>
      </section>

      <section id="formatos" className="px-6 max-w-7xl mx-auto py-16">
        <h2 className="text-4xl md:text-5xl font-serif font-thin mb-4">{isEn ? 'Formats we produce' : 'Formatos que producimos'}</h2>
        <p className="text-gray-300 max-w-4xl mb-10">
          {isEn
            ? 'We build an asset library that works together to shape feed aesthetic, conversation, reach and conversion. Each format has a specific role in the content calendar.'
            : 'Creamos una biblioteca de activos que trabaja en conjunto para construir estética del feed, conversación, alcance y conversión. Cada formato tiene función específica dentro del calendario de contenido.'}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <article className="border border-white/10 p-6 bg-white/[0.02]">
            <h3 className="text-2xl font-serif mb-3">{isEn ? 'Photos (feed and ads)' : 'Fotos (feed y anuncios)'}</h3>
            <p className="text-gray-300 text-sm leading-relaxed mb-3">
              {isEn
                ? 'Social photography focused on premium perception, visual consistency and paid-media versatility. Typical use: feed posts, ads and carousel covers.'
                : 'Fotografía para redes sociales enfocada en percepción premium, coherencia visual y versatilidad para pauta. Uso típico: feed, anuncios, portada de carrusel.'}
            </p>
            <p className="text-sm text-gray-400">{isEn ? 'Suggested cadence: 6 to 12 assets per month.' : 'Frecuencia sugerida: 6 a 12 piezas por mes.'}</p>
            <PlaceholderSpec name="fotos-feed-anuncios.webp" ratio="4:5 y 1:1" alt="Foto editorial para feed de Instagram con estética de marca" isEn={isEn} />
          </article>

          <article className="border border-white/10 p-6 bg-white/[0.02]">
            <h3 className="text-2xl font-serif mb-3">{isEn ? 'Reels (9:16, pacing, hooks)' : 'Reels (9:16, ritmo, hooks)'}</h3>
            <p className="text-gray-300 text-sm leading-relaxed mb-3">
              {isEn
                ? 'Brand reels with a clear hook, development and close. Built for retention and proposition clarity. Typical use: awareness, product and social proof.'
                : 'Reels para marcas con estructura clara de hook, desarrollo y cierre. Se diseñan para retención y claridad de propuesta. Uso típico: awareness, producto, prueba social.'}
            </p>
            <p className="text-sm text-gray-400">{isEn ? 'Suggested cadence: 4 to 8 assets per month.' : 'Frecuencia sugerida: 4 a 8 piezas por mes.'}</p>
            <PlaceholderSpec name="reels-9x16-marcas.webp" ratio="9:16" alt="Reel vertical para marca con subtítulos y hook visual" isEn={isEn} />
          </article>

          <article className="border border-white/10 p-6 bg-white/[0.02]">
            <h3 className="text-2xl font-serif mb-3">{isEn ? 'Carousels (education, proof, storytelling)' : 'Carruseles (educación, prueba, storytelling)'}</h3>
            <p className="text-gray-300 text-sm leading-relaxed mb-3">
              {isEn
                ? 'Instagram carousels with slide-by-slide narrative to educate, build value and drive action. Typical use: methods, case examples and differentiators.'
                : 'Carruseles para Instagram con narrativa slide a slide para educar, argumentar valor y mover a acción. Uso típico: metodología, casos, diferenciadores.'}
            </p>
            <p className="text-sm text-gray-400">{isEn ? 'Suggested cadence: 2 to 6 assets per month.' : 'Frecuencia sugerida: 2 a 6 piezas por mes.'}</p>
            <PlaceholderSpec name="carruseles-instagram.webp" ratio="4:5 por slide" alt="Preview de carrusel de Instagram con diseño editorial" isEn={isEn} />
          </article>

          <article className="border border-white/10 p-6 bg-white/[0.02]">
            <h3 className="text-2xl font-serif mb-3">{isEn ? 'Stories (conversation and action)' : 'Stories (conversación y acción)'}</h3>
            <p className="text-gray-300 text-sm leading-relaxed mb-3">
              {isEn
                ? 'Stories for businesses using context, interaction and CTA blocks. Useful for daily continuity and campaign activations. Typical use: reminders, FAQs and timely offers.'
                : 'Stories para negocios con bloques de contexto, interacción y CTA. Útiles para continuidad diaria y activaciones. Uso típico: recordatorios, FAQs, oferta puntual.'}
            </p>
            <p className="text-sm text-gray-400">{isEn ? 'Suggested cadence: 3 to 5 sequences per week.' : 'Frecuencia sugerida: 3 a 5 secuencias por semana.'}</p>
            <PlaceholderSpec name="stories-negocios.webp" ratio="9:16" alt="Secuencia de stories para negocio con CTA de contacto" isEn={isEn} />
          </article>
        </div>
      </section>

      <section className="px-6 max-w-7xl mx-auto py-16">
        <h2 className="text-4xl md:text-5xl font-serif font-thin mb-6">{isEn ? 'One narrative, not disconnected posts' : 'Una narrativa, no posts sueltos'}</h2>
        <p className="text-gray-300 max-w-4xl mb-8">
          {isEn
            ? 'Social content strategy is built with pillars, recurring series, visual guidelines and a consistent tone. This avoids improvisation and maintains an editorial system recognisable in every asset.'
            : 'La estrategia de contenido social se construye con pilares, series recurrentes, guías visuales y tono consistente. Así evitamos improvisación y mantenemos un sistema editorial que se reconoce en cada pieza.'}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 text-sm text-gray-300">
          <div className="border border-white/10 p-5">{isEn ? 'Content pillars: authority, proof, product, community and conversion.' : 'Pilares de contenido: autoridad, prueba, producto, comunidad y conversión.'}</div>
          <div className="border border-white/10 p-5">{isEn ? 'Recurring series: case of the week, behind the process, applied tip, social proof.' : 'Series recurrentes: caso de semana, detrás del proceso, tip aplicado, prueba social.'}</div>
          <div className="border border-white/10 p-5">{isEn ? 'Visual guidelines: typography, colour, composition, framing, covers and captions.' : 'Guías visuales: tipografía, color, composición, encuadre, covers y subtítulos.'}</div>
          <div className="border border-white/10 p-5">{isEn ? 'Tone of voice: clarity, editorial judgement and focus on client decisions.' : 'Tono y voz: claridad, criterio editorial y foco en decisiones del cliente.'}</div>
        </div>
        <div className="border border-white/10 bg-black/30 p-6">
          <p className="text-sm text-gray-300">{isEn ? 'Diagram placeholder: pillar + series map (simple grid per pillar with weekly asset examples).' : 'Placeholder de diagrama: Mapa de pilares + series (grid simple por pilar con ejemplos de piezas semanales).'}</p>
          <PlaceholderSpec name="pilares-contenido-social.webp" ratio="16:9" alt="Mapa de pilares de contenido social y series semanales" isEn={isEn} />
        </div>
      </section>

      <section className="px-6 max-w-7xl mx-auto py-16">
        <h2 className="text-4xl md:text-5xl font-serif font-thin mb-6">{isEn ? 'Ongoing profile optimisation (for a premium feed)' : 'Optimización continua del perfil (para un feed premium)'}</h2>
        <p className="text-gray-300 max-w-4xl mb-8">
          {isEn
            ? 'We do not only produce social content; we also optimise how it is presented and converts on your profile. This improves perception, clarity and commercial response.'
            : 'No solo producimos contenido para redes sociales, también optimizamos cómo se presenta y convierte en el perfil. Esto mejora percepción, claridad y respuesta comercial.'}
        </p>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300 mb-8">
          <li className="border border-white/10 p-4">{isEn ? 'Clear bio and value proposition by audience.' : 'Bio y propuesta de valor claras por audiencia.'}</li>
          <li className="border border-white/10 p-4">{isEn ? 'Consistent highlights and covers by topic.' : 'Highlights y portadas consistentes por tema.'}</li>
          <li className="border border-white/10 p-4">{isEn ? 'Grid visual order and feed aesthetics.' : 'Orden visual del grid y estética del feed.'}</li>
          <li className="border border-white/10 p-4">{isEn ? 'Intentional links and CTAs in link-in-bio.' : 'Enlaces y CTAs en link-in-bio con intención.'}</li>
          <li className="border border-white/10 p-4 md:col-span-2">{isEn ? 'Pinned posts to present offer, social proof and next step.' : 'Posts fijados para presentar oferta, prueba social y siguiente paso.'}</li>
        </ul>
        <div className="border border-white/10 bg-black/30 p-6">
          <p className="text-sm text-gray-300">{isEn ? 'Visual placeholder: profile before/after (wireframe without real data).' : 'Placeholder visual: Antes / después del perfil (wireframe sin datos reales).'}</p>
          <PlaceholderSpec name="optimizacion-perfil-instagram.webp" ratio="16:9" alt="Comparativa de perfil de Instagram antes y después de optimización" isEn={isEn} />
        </div>
      </section>

      <section className="px-6 max-w-7xl mx-auto py-16">
        <h2 className="text-4xl md:text-5xl font-serif font-thin mb-8">{isEn ? 'Our process (from plan to publishing)' : 'Nuestro proceso (de plan a publicación)'}</h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          {(isEn
            ? [
                ['Goals + audience', 'We define what social content should achieve for the brand and which audience behaviour we want to activate.'],
                ['Pillars + calendar', 'We translate strategy into themes, recurring series and a realistic content cadence.'],
                ['Production', 'We execute photo and video with scripts and shot lists by format and business priority.'],
                ['Editing + design', 'We build covers, captions, carousels and format versions for smooth publishing.'],
                ['Publishing + optimisation', 'We adjust according to performance to improve narrative, hooks, structure and conversion.'],
              ]
            : [
                ['Objetivos + audiencia', 'Definimos qué debe lograr el contenido social para marcas y qué comportamiento buscamos activar.'],
                ['Pilares + calendario', 'Traducimos estrategia en temas, series y frecuencia realista para el calendario de contenido.'],
                ['Producción', 'Ejecutamos foto y video con guiones y shot list según formato y prioridad comercial.'],
                ['Edición + diseño', 'Armamos covers, subtítulos, carruseles y versiones por formato para publicación fluida.'],
                ['Publicación + optimización', 'Ajustamos por desempeño para mejorar narrativa, hooks, estructura y conversión.'],
              ]
          ).map(([title, body], idx) => (
            <article key={title} className="border border-white/10 p-5 bg-black/30">
              <p className="text-xs text-[#D4AF37] tracking-[0.2em] uppercase mb-2">{isEn ? 'Step' : 'Paso'} {idx + 1}</p>
              <h3 className="font-serif text-xl mb-2">{title}</h3>
              <p className="text-sm text-gray-300">{body}</p>
            </article>
          ))}
        </div>
        <p className="text-sm text-[#D4AF37] mb-6">{isEn ? 'Running a campaign or seasonal push? We integrate it into the calendar.' : '¿Tienes campaña o temporada? Lo integramos al calendario.'}</p>
        <div className="border border-white/10 bg-black/30 p-6">
          <p className="text-sm text-gray-300">{isEn ? 'Placeholder for 5-step horizontal process diagram.' : 'Placeholder de diagrama horizontal de 5 pasos.'}</p>
          <PlaceholderSpec name="proceso-contenido-social.webp" ratio="21:9" alt="Diagrama de proceso de contenido social en cinco pasos" isEn={isEn} />
        </div>
      </section>

      <section id="entregables" className="px-6 max-w-7xl mx-auto py-16">
        <h2 className="text-4xl md:text-5xl font-serif font-thin mb-8">{isEn ? 'Deliverables (ready to publish)' : 'Entregables (listos para publicar)'}</h2>
        <div className="flex flex-wrap gap-3 mb-8">
          {(['monthly', 'campaign'] as DeliverableTab[]).map((tab) => (
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
              {tab === 'monthly' ? (isEn ? 'Monthly' : 'Mensual') : isEn ? 'By campaign' : 'Por campaña'}
            </button>
          ))}
        </div>

        {activeTab === 'monthly' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border border-white/10 p-6 bg-white/[0.02]">
              <h3 className="text-2xl font-serif mb-4">{isEn ? 'Monthly' : 'Mensual'}</h3>
              <ul className="space-y-2 text-gray-300 list-disc pl-5">
                <li>{isEn ? 'Content library: photos, reels, carousels and stories.' : 'Biblioteca de contenido, fotos, reels, carruseles y stories.'}</li>
                <li>{isEn ? 'Covers, typography and caption templates where relevant.' : 'Plantillas de covers, tipografía y subtítulos cuando aplica.'}</li>
                <li>{isEn ? 'Instagram profile optimisation and continuous adjustments.' : 'Optimización de perfil de Instagram y ajustes continuos.'}</li>
                <li>{isEn ? 'Publishing calendar by objective and format.' : 'Calendario de publicación por objetivo y formato.'}</li>
                <li>{isEn ? 'Light performance report with learnings and next adjustments.' : 'Reporte ligero con aprendizajes y siguientes ajustes.'}</li>
              </ul>
            </div>
            <div className="border border-white/10 p-6 bg-black/30">
              <p className="text-sm text-gray-300 mb-2">{isEn ? 'Visual placeholder: monthly calendar.' : 'Placeholder visual: Calendario mensual.'}</p>
              <PlaceholderSpec name="calendario-contenido-social.webp" ratio="16:10" alt="Calendario mensual de contenido social con formatos y fechas" isEn={isEn} />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border border-white/10 p-6 bg-white/[0.02]">
              <h3 className="text-2xl font-serif mb-4">{isEn ? 'By campaign' : 'Por campaña'}</h3>
              <ul className="space-y-2 text-gray-300 list-disc pl-5">
                <li>{isEn ? 'Concept and asset series: teaser, launch and social proof.' : 'Concepto y serie de piezas, teaser, lanzamiento y prueba social.'}</li>
                <li>{isEn ? 'Format adaptations across feed, reel, carousel and stories.' : 'Adaptaciones por formato, feed, reel, carrusel y stories.'}</li>
                <li>{isEn ? 'Paid-media versions where relevant, plus cut-downs and alternate hooks.' : 'Versiones para pauta cuando aplica, cutdowns y hooks alternos.'}</li>
                <li>{isEn ? 'Organised delivery for fast campaign execution.' : 'Entrega organizada para ejecución rápida durante la campaña.'}</li>
              </ul>
            </div>
            <div className="border border-white/10 p-6 bg-black/30">
              <p className="text-sm text-gray-300 mb-2">{isEn ? 'Visual placeholder: format pack.' : 'Placeholder visual: Pack de formatos.'}</p>
              <PlaceholderSpec name="pack-formatos-campana.webp" ratio="16:10" alt="Mockup de pack de formatos para campaña social" isEn={isEn} />
            </div>
          </div>
        )}
      </section>

      <section id="ejemplos" className="px-6 max-w-7xl mx-auto py-16">
        <h2 className="text-4xl md:text-5xl font-serif font-thin mb-4">{isEn ? 'Social content examples' : 'Ejemplos de contenido social'}</h2>
        <p className="text-gray-300 max-w-4xl mb-8">
          {isEn
            ? 'Explore examples by format to compare style, structure and objective. We use premium Instagram content with channel-specific variations.'
            : 'Explora ejemplos por formato para comparar estilo, estructura y objetivo. Usamos contenido premium para Instagram con variaciones por canal.'}
        </p>

        <div className="flex flex-wrap gap-3 mb-8">
          {(['photos', 'reels', 'carousels', 'stories'] as ExampleFilter[]).map((filter) => (
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
              {filter === 'photos'
                ? isEn
                  ? 'Photos'
                  : 'Fotos'
                : filter === 'reels'
                  ? 'Reels'
                  : filter === 'carousels'
                    ? isEn
                      ? 'Carousels'
                      : 'Carruseles'
                    : 'Stories'}
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
                aria-label={`${isEn ? 'Open example' : 'Abrir ejemplo'}: ${isEn ? item.titleEn : item.title}`}
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
                <h3 className="text-xl font-serif mb-1">{isEn ? item.titleEn : item.title}</h3>
                <p className="text-sm text-gray-300">{isEn ? item.captionEn : item.caption}</p>
              </div>
            </article>
          ))}
        </div>

        {selectedImage && (
          <div className="fixed inset-0 z-[120] bg-black/90 p-6 flex items-center justify-center" onClick={() => setSelectedImage(null)}>
            <div className="relative w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
              <button type="button" onClick={() => setSelectedImage(null)} className="absolute -top-10 right-0 text-white text-sm">
                {isEn ? 'Close' : 'Cerrar'}
              </button>
              <div className="relative aspect-[4/3] border border-white/20">
                <Image src={selectedImage.src} alt={selectedImage.alt} fill className="object-contain" sizes="100vw" />
              </div>
            </div>
          </div>
        )}

        <div className="border border-white/10 bg-black/30 p-4 mt-8 text-sm text-gray-300">
          {isEn
            ? 'Alt text guide: describe format, main subject, action and the asset’s commercial objective in clear language.'
            : 'Guía de alt text: describe formato, sujeto principal, acción y objetivo comercial de la pieza en lenguaje claro.'}
        </div>
      </section>

      <section className="px-6 max-w-7xl mx-auto py-16">
        <h2 className="text-4xl md:text-5xl font-serif font-thin mb-6">{isEn ? 'How we work' : '¿Cómo trabajamos?'}</h2>
        <p className="text-gray-300 max-w-4xl mb-8">
          {isEn
            ? 'We offer monthly social content production, campaign content, and profile optimisation included within the agreed scope.'
            : 'Ofrecemos producción mensual de contenido social, contenido por campaña y optimización de perfil incluida dentro del alcance acordado.'}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <article className="border border-white/10 p-5 bg-white/[0.02]">{isEn ? 'Monthly content production' : 'Producción mensual de contenido'}</article>
          <article className="border border-white/10 p-5 bg-white/[0.02]">{isEn ? 'Campaign content, launches and seasonal pushes' : 'Contenido por campaña, lanzamientos y temporadas'}</article>
          <article className="border border-white/10 p-5 bg-white/[0.02]">{isEn ? 'Profile optimisation included' : 'Optimización de perfil incluida'}</article>
        </div>
        <p className="text-sm text-gray-400 mb-8">
          {isEn
            ? 'Scope note: this service does not include 24/7 community management or permanent message handling unless specifically contracted.'
            : 'Nota de alcance: este servicio no incluye community management 24/7 ni atención permanente de mensajes, salvo contratación específica.'}
        </p>
        <a href="#cotizar" className="inline-block px-8 py-3 border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-colors text-sm">
          {isEn ? 'Get a social content quote' : 'Cotizar contenido social'}
        </a>
      </section>

      <section className="px-6 max-w-7xl mx-auto py-8">
        <div className="border border-white/10 p-6 bg-white/[0.02]">
          <h2 className="text-3xl font-serif mb-4">{isEn ? 'Related services' : 'Servicios relacionados'}</h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            {isEn ? 'To strengthen outcomes, combine this service with ' : 'Para fortalecer resultados, combina este servicio con '}
            <Link href={`/${locale}/servicios/produccion-editorial`} className="text-[#D4AF37] hover:underline">{isEn ? 'editorial photo and video production' : 'producción editorial foto y video'}</Link>{' '}
            {isEn ? 'to elevate premium assets, ' : 'para elevar assets premium, '}
            <Link href={`/${locale}/servicios/estrategia-digital`} className="text-[#D4AF37] hover:underline">{isEn ? 'digital strategy for web and campaigns' : 'estrategia digital para web y campañas'}</Link>{' '}
            {isEn ? 'and ' : 'y servicios de '}
            <Link href={`/${locale}/services`} className="text-[#D4AF37] hover:underline">{isEn ? 'branding and web/ecommerce systems' : 'branding y sistema web/ecommerce'}</Link>{' '}
            {isEn ? 'when you need end-to-end consistency.' : 'cuando buscas coherencia integral.'}
          </p>
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

      <section className="px-6 max-w-7xl mx-auto py-20">
        <div className="text-center border border-white/10 bg-gradient-to-r from-white/[0.02] to-[#D4AF37]/10 p-10">
          <h2 className="text-4xl md:text-5xl font-serif font-thin mb-4">{isEn ? 'A premium feed is built with consistency' : 'Un feed premium se construye con consistencia'}</h2>
          <p className="text-gray-300 max-w-3xl mx-auto mb-8">
            {isEn
              ? 'We propose a system: narrative, formats, calendar and ongoing optimisation.'
              : 'Te proponemos un sistema: narrativa, formatos, calendario y optimización continua.'}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#cotizar" className="px-8 py-4 bg-[#D4AF37] text-black font-bold text-xs uppercase tracking-[0.35em] hover:bg-[#FC7CA4] transition-colors">{isEn ? 'Get a social content quote' : 'Cotizar contenido social'}</a>
            <a href="mailto:contacto@sassystudio.com.mx" className="px-8 py-4 border border-white/25 text-white font-bold text-xs uppercase tracking-[0.35em] hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors">{isEn ? 'Book a call' : 'Agendar llamada'}</a>
          </div>
        </div>
      </section>

      <section id="cotizar" className="px-6 max-w-4xl mx-auto pb-24">
        <div className="border border-white/10 p-8 md:p-10 bg-black/40">
          <h2 className="text-3xl md:text-4xl font-serif font-thin mb-4">{isEn ? 'Get a social content quote' : 'Cotizar contenido social'}</h2>
          <p className="text-gray-400 mb-6">
            {isEn
              ? 'Share your goals, cadence, preferred formats and expected scope so we can propose a clear social content structure for your brand.'
              : 'Comparte objetivos, frecuencia, formatos y alcance esperado para proponerte una estructura clara de contenido social para marcas.'}
          </p>
          <ContactForm isEn={isEn} />
        </div>
      </section>
    </main>
  );
}
