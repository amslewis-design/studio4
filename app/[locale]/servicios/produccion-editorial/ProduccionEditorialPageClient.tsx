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

type GalleryCategory = 'spaces' | 'product' | 'gastronomy' | 'moments';

type GalleryItem = {
  src: string;
  category: GalleryCategory;
  caption: string;
  alt: string;
};

const galleryItems: GalleryItem[] = [
  {
    src: 'https://res.cloudinary.com/ds86m2xm0/image/upload/f_auto,q_auto/v1770261224/5_cfkwxi.jpg',
    category: 'spaces',
    caption: 'Lobby boutique con narrativa visual editorial para hospitality.',
    alt: 'Fotografía editorial de hotel boutique con luz natural en lobby y textura arquitectónica.',
  },
  {
    src: 'https://res.cloudinary.com/ds86m2xm0/image/upload/f_auto,q_auto/v1770517992/7_rqcm14.webp',
    category: 'product',
    caption: 'Producto premium con set limpio para ecommerce y campañas.',
    alt: 'Fotografía de producto editorial para ecommerce con composición limpia y color controlado.',
  },
  {
    src: 'https://res.cloudinary.com/ds86m2xm0/image/upload/f_auto,q_auto/v1769605842/sassy-studio/cafe_tjpt9a.webp',
    category: 'gastronomy',
    caption: 'Mesa editorial para restaurante, pensada para feed y pauta.',
    alt: 'Fotografía editorial de restaurante con luz natural y detalle de mesa.',
  },
  {
    src: 'https://res.cloudinary.com/ds86m2xm0/image/upload/f_auto,q_auto/v1770261222/1_vd47a8.jpg',
    category: 'moments',
    caption: 'Momentos reales de marca para video editorial para redes sociales.',
    alt: 'Foto documental de equipo y cliente durante producción de contenido para marcas.',
  },
];

const videoPlaceholders = [
  {
    title: 'Video editorial · Espacios',
    spec: 'Cobertura de atmósfera y recorrido para piezas de descubrimiento.',
  },
  {
    title: 'Video editorial · Producto',
    spec: 'Secuencias enfocadas en detalle, textura y propuesta de valor.',
  },
  {
    title: 'Video editorial · Gastronomía',
    spec: 'Narrativa visual de preparación, emplatado y experiencia en mesa.',
  },
  {
    title: 'Video editorial · Momentos',
    spec: 'Momentos de marca y equipo para construir confianza y cercanía.',
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
      setResult(isEn ? 'Form Submitted Successfully' : 'Formulario enviado correctamente');
      event.currentTarget.reset();
    } else {
      setResult(isEn ? 'Error' : 'Error');
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
        placeholder={isEn ? 'Tell us what you need to produce, timeline, and channels.' : 'Cuéntanos qué necesitas producir, fechas y canales.'}
        className="w-full bg-black/40 border border-white/15 px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] resize-none"
      />
      <button
        type="submit"
        className="w-full bg-[#D4AF37] text-black py-4 uppercase tracking-[0.35em] text-xs font-bold hover:bg-[#FC7CA4] transition-colors"
      >
        {isEn ? 'Send request' : 'Enviar solicitud'}
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
  const isEn = locale === 'en';
  const serviceHubHref = isEn ? `/${locale}/services` : `/${locale}/servicios`;
  const [activeFilter, setActiveFilter] = useState<GalleryCategory>('spaces');
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
          <Link href={`/${locale}`} className="hover:text-white">{isEn ? 'Home' : 'Inicio'}</Link>
          <span className="mx-2">→</span>
          <Link href={serviceHubHref} className="hover:text-white">{isEn ? 'Services' : 'Servicios'}</Link>
          <span className="mx-2">→</span>
          <span className="text-white">{isEn ? 'Editorial production' : 'Producción editorial'}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-5xl md:text-7xl font-serif font-thin mb-6 leading-[0.95]">
              {isEn ? 'Editorial production (Photo + Video)' : 'Producción editorial (Foto + Video)'}
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed mb-4">
              {isEn ? (
                <>Our <strong>editorial photo and video production</strong> captures spaces, products, gastronomy, and moments with a premium standard for brands that need performance across social, web, and campaigns.</>
              ) : (
                <>Nuestra <strong>producción editorial foto y video</strong> captura espacios, productos, gastronomía y momentos con estándar premium para marcas que necesitan rendimiento en social, web y campañas.</>
              )}
            </p>
            <p className="text-gray-400 leading-relaxed mb-8">
              {isEn
                ? 'We lead creative direction, styling, and on-set execution to deliver publish-ready assets. Formats are optimized from day one for IG, TikTok, landing pages, and paid ads.'
                : 'Dirigimos creatividad, styling y ejecución de set para entregar piezas listas para publicar. Optimizamos formatos desde el origen para IG, TikTok, landing pages y anuncios sin retrabajos innecesarios.'}
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#enquiry" className="px-8 py-4 bg-[#D4AF37] text-black font-bold text-xs uppercase tracking-[0.35em] hover:bg-[#FC7CA4] transition-colors">{isEn ? 'Get a quote' : 'Cotizar producción'}</a>
              <a href="#portfolio" className="px-8 py-4 border border-white/25 text-white font-bold text-xs uppercase tracking-[0.35em] hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors">{isEn ? 'View portfolio' : 'Ver portafolio'}</a>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/5] border border-white/10 overflow-hidden relative bg-black">
              <Image
                src="https://res.cloudinary.com/ds86m2xm0/image/upload/f_auto,q_auto/v1768343750/IMG_4098_nbgkvo.jpg"
                alt={isEn ? 'Editorial photo and video production for a hospitality brand on set with creative direction' : 'Producción editorial de foto y video para marca de hospitalidad en set con dirección creativa'}
                fill
                priority
                className="object-cover opacity-85"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-xs text-white/80 bg-black/50 border border-white/10 p-3">
                {isEn
                  ? 'On-set editorial direction: spaces, product, gastronomy, and branded moments.'
                  : 'Dirección editorial en set: espacios, producto, gastronomía y momentos de marca.'}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 max-w-7xl mx-auto pb-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {[
            [isEn ? 'Deliverables for social + web' : 'Entregas para redes + web', 'M3 12h18M12 3v18M5 5l14 14'],
            [isEn ? 'Shot list + styling guide' : 'Shot list + guía de styling', 'M4 6h16M4 12h16M4 18h10'],
            [isEn ? 'Editorial retouch / color' : 'Retoque editorial / color', 'M4 12a8 8 0 1 0 16 0a8 8 0 1 0-16 0Z'],
            [isEn ? 'Clear commercial licensing' : 'Licencias claras para uso comercial', 'M7 11V8a5 5 0 0 1 10 0v3M6 11h12v9H6z'],
            [isEn ? 'On-location production' : 'Producción en locación', 'M3 11l9-8l9 8v9H3z'],
          ].map(([label, path]) => (
            <div key={label} className="border border-white/10 bg-white/[0.02] p-4 flex items-center gap-3">
              <TrustIcon path={path} />
              <p className="text-sm text-gray-200">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 max-w-7xl mx-auto py-16">
        <h2 className="text-4xl md:text-5xl font-serif font-thin mb-4">{isEn ? 'What is included in editorial production?' : '¿Qué incluye la producción editorial?'}</h2>
        <p className="text-gray-300 max-w-4xl mb-12">
          {isEn
            ? 'We design a premium visual system that performs in real channels: feed, ads, landing pages, and catalogs. We combine editorial brand photography with social-first video and conversion-ready assets.'
            : 'Diseñamos un look premium que sí funciona en canales reales: feed, anuncios, landings y catálogo. Combinamos fotografía editorial para marcas con video editorial para redes sociales y piezas listas para performance.'}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              title: isEn ? 'Spaces (hotels, retail, architecture)' : 'Espacios (hoteles, retail, arquitectura)',
              body: isEn ? 'Photo and video for hotels and restaurants focused on experience, atmosphere, and purchase intent.' : 'Foto y video para hoteles y restaurantes con enfoque en experiencia, atmósfera y decisión de compra.',
              image: 'https://res.cloudinary.com/ds86m2xm0/image/upload/f_auto,q_auto/v1770261224/5_cfkwxi.jpg',
              alt: isEn ? 'Editorial hotel space photography with architectural composition and warm natural light.' : 'Fotografía editorial de espacios de hotel con composición arquitectónica y luz cálida.',
            },
            {
              title: isEn ? 'Product (ecommerce and campaigns)' : 'Producto (ecommerce y campañas)',
              body: isEn ? 'Editorial product photography with channel variants for catalog, landing pages, and ecommerce.' : 'Fotografía de producto editorial con variantes para catálogo, landing y contenido para ecommerce.',
              image: 'https://res.cloudinary.com/ds86m2xm0/image/upload/f_auto,q_auto/v1770517992/7_rqcm14.webp',
              alt: isEn ? 'Editorial product photography in a minimal set for ecommerce and digital ads.' : 'Fotografía de producto editorial con set minimal para ecommerce y anuncios digitales.',
            },
            {
              title: isEn ? 'Gastronomy (restaurants and food brands)' : 'Gastronomía (restaurantes, marcas de food)',
              body: isEn ? 'Professional food photography for visual menus, seasonal campaigns, and social channels.' : 'Fotografía gastronómica profesional para menús visuales, campañas estacionales y redes.',
              image: 'https://res.cloudinary.com/ds86m2xm0/image/upload/f_auto,q_auto/v1769605842/sassy-studio/cafe_tjpt9a.webp',
              alt: isEn ? 'Professional food photography of a hero dish with side natural light.' : 'Fotografía gastronómica profesional de platillo principal con luz natural lateral.',
            },
            {
              title: isEn ? 'Moments (people, events, behind-the-scenes)' : 'Momentos (people, eventos, behind-the-scenes)',
              body: isEn ? 'Coverage of real brand moments to build credibility and campaign-ready visual content.' : 'Cobertura de momentos reales para construir credibilidad de marca y contenido visual para campañas.',
              image: 'https://res.cloudinary.com/ds86m2xm0/image/upload/f_auto,q_auto/v1770261222/1_vd47a8.jpg',
              alt: isEn ? 'Editorial image of a human moment during production with natural team interaction.' : 'Foto editorial de momento humano en producción con interacción natural de equipo.',
            },
          ].map((card) => (
            <article key={card.title} className="border border-white/10 overflow-hidden bg-white/[0.02]">
              <div className="relative aspect-[16/10]">
                <Image src={card.image} alt={card.alt} fill className="object-cover" loading="lazy" sizes="(max-width: 768px) 100vw, 50vw" />
              </div>
              <div className="p-6 space-y-3">
                <h3 className="text-2xl font-serif">{card.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{card.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="px-6 max-w-7xl mx-auto py-16">
        <h2 className="text-4xl md:text-5xl font-serif font-thin mb-8">{isEn ? 'Our process (from brief to delivery)' : 'Nuestro proceso (de brief a entrega)'}</h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-10">
          {processSteps.map((step, idx) => (
            <div key={step.title} className="border border-white/10 p-5 bg-black/30">
              <p className="text-xs text-[#D4AF37] tracking-[0.2em] uppercase mb-2">{isEn ? `Step ${idx + 1}` : `Paso ${idx + 1}`}</p>
              <h3 className="font-serif text-xl mb-2">
                {isEn
                  ? ['Brief + goals', 'Editorial concept', 'Pre-production', 'Production', 'Post'][idx]
                  : step.title}
              </h3>
              <p className="text-sm text-gray-300">
                {isEn
                  ? [
                      'We align channels, use cases, target audience, and business priorities for focused production output.',
                      'We build references, visual narrative, and moodboard to align premium tone with campaign goals.',
                      'We lock shot list, styling, location, schedule, and logistics to execute with precision.',
                      'We run photo + video production with on-set direction across spaces, product, and people.',
                      'We deliver selection, retouch, edit, and exports by channel for social, web, and ads.',
                    ][idx]
                  : step.body}
              </p>
            </div>
          ))}
        </div>

        <a href="#enquiry" className="inline-block px-8 py-3 border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-colors text-sm">
          {isEn ? 'Do you have a date? Let’s reserve production.' : '¿Tienes fecha? Reservemos producción.'}
        </a>
      </section>

      <section className="px-6 max-w-7xl mx-auto py-16">
        <h2 className="text-4xl md:text-5xl font-serif font-thin mb-8">{isEn ? 'Deliverables ready to publish' : 'Entregables listos para publicar'}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="border border-white/10 p-6 bg-white/[0.02]">
            <h3 className="text-2xl font-serif mb-4">FOTO</h3>
            <ul className="space-y-2 text-gray-300 list-disc pl-5">
              <li>{isEn ? 'Curated image selection' : 'Selección curada'}</li>
              <li>{isEn ? 'Editorial retouching' : 'Retoque editorial'}</li>
              <li>{isEn ? 'Web exports (optimized file weight)' : 'Exportaciones para web (peso optimizado)'}</li>
              <li>{isEn ? 'Social formats 4:5 and 9:16' : 'Formatos social 4:5 y 9:16'}</li>
              <li>{isEn ? 'Print export (if needed)' : 'Exportación print (si aplica)'}</li>
            </ul>
          </div>
          <div className="border border-white/10 p-6 bg-white/[0.02]">
            <h3 className="text-2xl font-serif mb-4">VIDEO</h3>
            <ul className="space-y-2 text-gray-300 list-disc pl-5">
              <li>{isEn ? 'Reels/TikTok 9:16' : 'Reels/TikTok 9:16'}</li>
              <li>{isEn ? 'Ad cutdowns (6s, 10s, 15s)' : 'Cutdowns para ads (6s, 10s, 15s)'}</li>
              <li>{isEn ? 'Master edit + text-free versions (if needed)' : 'Master edit + versiones sin texto (si aplica)'}</li>
              <li>{isEn ? 'Optional SRT subtitles' : 'Subtítulos SRT opcional'}</li>
            </ul>
          </div>
        </div>
        <div className="border border-white/10 p-6 text-sm text-gray-400 flex flex-wrap gap-3">
          <span className="border border-white/20 px-3 py-1">9:16</span>
          <span className="border border-white/20 px-3 py-1">4:5</span>
          <span className="border border-white/20 px-3 py-1">1:1</span>
          <span className="border border-white/20 px-3 py-1">16:9</span>
        </div>
      </section>

      <section className="px-6 max-w-7xl mx-auto py-16">
        <h2 className="text-4xl md:text-5xl font-serif font-thin mb-8">{isEn ? 'Editorial production by industry' : 'Producción editorial por industria'}</h2>
        <div className="space-y-4">
          {industryCards.map((industry) => (
            <details key={industry.title} className="border border-white/10 bg-white/[0.02] p-5">
              <summary className="cursor-pointer text-xl font-serif">
                {isEn
                  ? {
                      'Hoteles y hospitalidad': 'Hotels and hospitality',
                      'Restaurantes y cafeterías': 'Restaurants and cafés',
                      'Marcas de producto / ecommerce': 'Product brands / ecommerce',
                      'Retail y espacios': 'Retail and spaces',
                      'Eventos premium / launches': 'Premium events / launches',
                    }[industry.title] || industry.title
                  : industry.title}
              </summary>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[#D4AF37] mb-2">{isEn ? 'Outcomes' : 'Outcomes'}</p>
                  <ul className="list-disc pl-5 text-gray-300 space-y-1">
                    {(isEn
                      ? {
                          'Hoteles y hospitalidad': ['Stronger premium perception', 'Higher reel engagement', 'Reusable visual library'],
                          'Restaurantes y cafeterías': ['Higher visit intent', 'Better CTR on menu/campaigns', 'Consistent visual identity'],
                          'Marcas de producto / ecommerce': ['Higher visual conversion', 'Less catalog friction', 'Better ad creative performance'],
                          'Retail y espacios': ['Higher store traffic', 'Stronger visual storytelling', 'Assets for launches'],
                          'Eventos premium / launches': ['Publishable coverage in 24–48h', 'Assets for PR and social', 'Seasonal content reuse'],
                        }[industry.title] || industry.outcomes
                      : industry.outcomes).map((outcome) => (
                      <li key={outcome}>{outcome}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[#D4AF37] mb-2">{isEn ? 'Typical deliverables' : 'Deliverables típicos'}</p>
                  <ul className="list-disc pl-5 text-gray-300 space-y-1">
                    {(isEn
                      ? {
                          'Hoteles y hospitalidad': ['Space hero images', '9:16 reels', 'Ad clips', 'Lifestyle photography', 'Website assets'],
                          'Restaurantes y cafeterías': ['Professional food photography', 'Social editorial video', 'Kitchen/service content', 'Dish still life'],
                          'Marcas de producto / ecommerce': ['Editorial product photography', 'Clean-background ecommerce photos', 'UGC-style clips', 'Ratio variants by channel'],
                          'Retail y espacios': ['Interior photography', 'Walkthrough video', 'Campaign visual assets', 'Landing page media'],
                          'Eventos premium / launches': ['Photo/video coverage', 'Short recaps', 'Paid social clips', 'Editorial gallery'],
                        }[industry.title] || industry.deliverables
                      : industry.deliverables).map((deliverable) => (
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
        <h2 className="text-4xl md:text-5xl font-serif font-thin mb-3">{isEn ? 'Portfolio: editorial photo + video' : 'Portafolio: foto + video editorial'}</h2>
        <p className="text-gray-400 mb-6">{isEn ? 'Project selection across spaces, product, gastronomy, and branded moments.' : 'Selección de proyectos para espacios, producto, gastronomía y momentos de marca.'}</p>

        <div className="flex flex-wrap gap-3 mb-8">
          {(['spaces', 'product', 'gastronomy', 'moments'] as GalleryCategory[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`px-4 py-2 border text-sm transition-colors ${activeFilter === tab ? 'border-[#D4AF37] text-[#D4AF37]' : 'border-white/20 text-white/80 hover:border-white/50'}`}
            >
              {isEn
                ? {
                    spaces: 'Spaces',
                    product: 'Product',
                    gastronomy: 'Gastronomy',
                    moments: 'Moments',
                  }[tab]
                : {
                    spaces: 'Espacios',
                    product: 'Producto',
                    gastronomy: 'Gastronomía',
                    moments: 'Momentos',
                  }[tab]}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {filteredItems.map((item, index) => (
            (() => {
              const enCaptionBySrc: Record<string, string> = {
                'https://res.cloudinary.com/ds86m2xm0/image/upload/f_auto,q_auto/v1770261224/5_cfkwxi.jpg': 'Boutique lobby with editorial visual narrative for hospitality.',
                'https://res.cloudinary.com/ds86m2xm0/image/upload/f_auto,q_auto/v1770517992/7_rqcm14.webp': 'Premium product setup for ecommerce and campaign use.',
                'https://res.cloudinary.com/ds86m2xm0/image/upload/f_auto,q_auto/v1769605842/sassy-studio/cafe_tjpt9a.webp': 'Editorial table story for restaurant content and paid social.',
                'https://res.cloudinary.com/ds86m2xm0/image/upload/f_auto,q_auto/v1770261222/1_vd47a8.jpg': 'Real brand moments designed for social editorial storytelling.',
              };

              const enAltBySrc: Record<string, string> = {
                'https://res.cloudinary.com/ds86m2xm0/image/upload/f_auto,q_auto/v1770261224/5_cfkwxi.jpg': 'Editorial photography of a boutique hotel with natural light and architectural texture.',
                'https://res.cloudinary.com/ds86m2xm0/image/upload/f_auto,q_auto/v1770517992/7_rqcm14.webp': 'Editorial product photography for ecommerce with clean composition and controlled color.',
                'https://res.cloudinary.com/ds86m2xm0/image/upload/f_auto,q_auto/v1769605842/sassy-studio/cafe_tjpt9a.webp': 'Editorial restaurant photography with natural light and detailed table composition.',
                'https://res.cloudinary.com/ds86m2xm0/image/upload/f_auto,q_auto/v1770261222/1_vd47a8.jpg': 'Documentary-style brand moment during content production with team interaction.',
              };

              const displayCaption = isEn ? enCaptionBySrc[item.src] || item.caption : item.caption;
              const displayAlt = isEn ? enAltBySrc[item.src] || item.alt : item.alt;

              return (
            <button
              key={item.src}
              onClick={() => setLightboxIndex(index)}
              className="text-left border border-white/10 bg-white/[0.02] overflow-hidden"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={item.src}
                  alt={displayAlt}
                  fill
                  loading="lazy"
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="p-4">
                <p className="text-white text-sm mb-1">{displayCaption}</p>
                <p className="text-xs text-gray-500">{displayAlt}</p>
              </div>
            </button>
              );
            })()
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {videoPlaceholders.map((video, index) => (
            <div key={video.title} className="border border-dashed border-white/20 p-5 bg-black/30">
              <h3 className="font-serif text-xl mb-2">
                {isEn
                  ? ['Editorial video · Spaces', 'Editorial video · Product', 'Editorial video · Gastronomy', 'Editorial video · Moments'][index]
                  : video.title}
              </h3>
              <p className="text-sm text-gray-400">
                {isEn
                  ? [
                      'Atmosphere and walkthrough coverage for discovery-stage assets.',
                      'Detail-driven sequences focused on texture and product value.',
                      'Visual storytelling of prep, plating, and table experience.',
                      'Human brand moments designed for trust and relatability.',
                    ][index]
                  : video.spec}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 max-w-7xl mx-auto py-16">
        <h2 className="text-4xl md:text-5xl font-serif font-thin mb-8">{isEn ? 'Results (mini cases)' : 'Resultados (casos cortos)'}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              client: isEn ? 'Boutique hotel (Mexico City)' : 'Hotel boutique (CDMX)',
              objective: isEn ? 'Refresh visual library for social + web.' : 'Actualizar biblioteca visual para social + web.',
              produced: isEn ? '42 editorial photos + 8 reels.' : '42 fotos editoriales + 8 reels.',
              result: isEn ? 'Higher organic engagement and stronger dwell time on room pages.' : 'Aumento de interacción orgánica y mejor permanencia en página de habitaciones.',
            },
            {
              client: isEn ? 'Premium product brand' : 'Marca de producto premium',
              objective: isEn ? 'Scale content for ecommerce and ads.' : 'Escalar contenido para ecommerce y ads.',
              produced: isEn ? 'Editorial product photography set + 6/10/15s cutdowns.' : 'Set de fotografía de producto editorial + cutdowns 6/10/15s.',
              result: isEn ? 'Stronger campaign creative performance and improved catalog consistency.' : 'Mejor rendimiento creativo en campañas y mayor consistencia visual de catálogo.',
            },
            {
              client: isEn ? 'Fine-casual restaurant' : 'Restaurante fine casual',
              objective: isEn ? 'Reposition food experience on social channels.' : 'Reposicionar propuesta gastronómica en redes.',
              produced: isEn ? 'Professional food photography + service recaps.' : 'Fotografía gastronómica profesional + recaps de servicio.',
              result: isEn ? 'More inbound DMs and increased saves on menu content.' : 'Más consultas por DM y aumento de guardados en contenido de menú.',
            },
          ].map((study) => (
            <article key={study.client} className="border border-white/10 p-6 bg-white/[0.02]">
              <h3 className="font-serif text-2xl mb-4">{study.client}</h3>
              <p className="text-sm text-gray-300 mb-2"><strong>{isEn ? 'Goal:' : 'Objetivo:'}</strong> {study.objective}</p>
              <p className="text-sm text-gray-300 mb-2"><strong>{isEn ? 'Production output:' : 'Qué se produjo:'}</strong> {study.produced}</p>
              <p className="text-sm text-gray-300"><strong>{isEn ? 'Result:' : 'Resultado:'}</strong> {study.result}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="px-6 max-w-7xl mx-auto py-16">
        <h2 className="text-4xl md:text-5xl font-serif font-thin mb-6">{isEn ? 'How much does editorial production cost?' : '¿Cuánto cuesta una producción editorial?'}</h2>
        <p className="text-gray-300 max-w-4xl mb-8">
          {isEn
            ? 'Scope depends on location, sets, styling, talent, production hours, deliverable volume, and licensing. We quote by commercial objective, not generic piece counts.'
            : 'El alcance depende de locación, sets, styling, talento, horas de set, volumen de entregables y licencias. Por eso cotizamos por objetivo comercial y no por una lista genérica de piezas.'}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            isEn ? 'Essential content (half-day)' : 'Contenido esencial (half-day)',
            isEn ? 'Campaign (full-day)' : 'Campaña (full-day)',
            isEn ? 'Monthly library' : 'Library mensual',
          ].map((tier) => (
            <div key={tier} className="border border-white/10 p-6 bg-white/[0.02]">
              <h3 className="font-serif text-2xl">{tier}</h3>
              <p className="text-gray-400 text-sm mt-3">{isEn ? 'Includes pre-production proposal, execution scope, and channel-based deliverables plan.' : 'Incluye propuesta de preproducción, ejecución y plan de entregables por formato.'}</p>
            </div>
          ))}
        </div>
        <a href="#enquiry" className="inline-block px-8 py-3 bg-[#D4AF37] text-black text-xs uppercase tracking-[0.35em] font-bold hover:bg-[#FC7CA4] transition-colors">
          {isEn ? 'Request quote' : 'Solicitar cotización'}
        </a>
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
            {isEn ? 'You can also explore our services for ' : 'También puedes explorar nuestros servicios de '}
            <Link href={serviceHubHref} className="text-[#D4AF37] hover:underline">{isEn ? 'social content and social media management' : 'contenido social y gestión de redes'}</Link>,{' '}
            <Link href={serviceHubHref} className="text-[#D4AF37] hover:underline">{isEn ? 'branding and visual identity' : 'branding e identidad visual'}</Link>{' '}
            {isEn ? 'and ' : 'y '}
            <Link href={serviceHubHref} className="text-[#D4AF37] hover:underline">{isEn ? 'web and ecommerce optimization' : 'optimización web y ecommerce'}</Link>.
          </p>
        </div>
      </section>

      <section className="px-6 max-w-7xl mx-auto py-20">
        <div className="text-center border border-white/10 bg-gradient-to-r from-white/[0.02] to-[#D4AF37]/10 p-10">
          <h2 className="text-4xl md:text-5xl font-serif font-thin mb-4">{isEn ? 'Ready to create premium editorial content that sells' : 'Listo para crear contenido editorial que venda y se vea premium'}</h2>
          <p className="text-gray-300 max-w-3xl mx-auto mb-8">
            {isEn
              ? 'We build a clear plan: concept, shot list, timeline, and channel-based deliverables so your team can publish without friction.'
              : 'Te proponemos un plan claro: concepto, shot list, tiempos de producción y entregables por canal para salir a publicar sin fricción.'}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#enquiry" className="px-8 py-4 bg-[#D4AF37] text-black font-bold text-xs uppercase tracking-[0.35em] hover:bg-[#FC7CA4] transition-colors">{isEn ? 'Get an editorial production quote' : 'Cotizar producción editorial'}</a>
            <a href="mailto:contacto@sassystudio.com.mx" className="px-8 py-4 border border-white/25 text-white font-bold text-xs uppercase tracking-[0.35em] hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors">{isEn ? 'Schedule a call' : 'Agendar llamada'}</a>
          </div>
        </div>
      </section>

      <section id="enquiry" className="px-6 max-w-4xl mx-auto pb-24">
        <div className="border border-white/10 p-8 md:p-10 bg-black/40">
          <h2 className="text-3xl md:text-4xl font-serif font-thin mb-4">{isEn ? 'Request production quote' : 'Cotizar producción'}</h2>
          <p className="text-gray-400 mb-6">{isEn ? 'Share goals, timeline, and priority channels. We’ll send a proposal with scope and deliverables.' : 'Compártenos objetivo, fechas y canal prioritario. Te enviamos propuesta con alcance y entregables.'}</p>
          <ContactForm isEn={isEn} />
        </div>
      </section>

      {lightboxIndex !== null && filteredItems[lightboxIndex] && (
        <div className="fixed inset-0 z-[120] bg-black/90 p-6 flex items-center justify-center">
          <button onClick={() => setLightboxIndex(null)} className="absolute top-6 right-6 text-white text-3xl">×</button>
          <div className="relative w-full max-w-4xl aspect-[4/3]">
            <Image
              src={filteredItems[lightboxIndex].src}
              alt={
                isEn
                  ? {
                      'https://res.cloudinary.com/ds86m2xm0/image/upload/f_auto,q_auto/v1770261224/5_cfkwxi.jpg': 'Editorial photography of a boutique hotel with natural light and architectural texture.',
                      'https://res.cloudinary.com/ds86m2xm0/image/upload/f_auto,q_auto/v1770517992/7_rqcm14.webp': 'Editorial product photography for ecommerce with clean composition and controlled color.',
                      'https://res.cloudinary.com/ds86m2xm0/image/upload/f_auto,q_auto/v1769605842/sassy-studio/cafe_tjpt9a.webp': 'Editorial restaurant photography with natural light and detailed table composition.',
                      'https://res.cloudinary.com/ds86m2xm0/image/upload/f_auto,q_auto/v1770261222/1_vd47a8.jpg': 'Documentary-style brand moment during content production with team interaction.',
                    }[filteredItems[lightboxIndex].src] || filteredItems[lightboxIndex].alt
                  : filteredItems[lightboxIndex].alt
              }
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
