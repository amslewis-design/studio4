'use client';

import { useLocale } from 'next-intl';
import Navbar from './Navbar';
import Footer from './Footer';
import LeadContactForm from './LeadContactForm';

export function ContactPageContent() {
  const isEnglish = useLocale() === 'en';

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />
      <section className="pt-36 pb-24 md:pt-48 md:pb-32 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-serif text-5xl md:text-7xl mb-5" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
            {isEnglish ? 'Contact' : 'Contáctanos'}
          </h1>
          <h2 className="text-lg md:text-xl text-white/70 mb-12">
            {isEnglish ? 'Tell us about your project' : 'Cuéntanos sobre tu proyecto'}
          </h2>
          <LeadContactForm source="contact-page" />
        </div>
      </section>
      <Footer />
    </main>
  );
}

export function AboutPageContent() {
  const isEnglish = useLocale() === 'en';
  const paragraphs = isEnglish
    ? [
      'Sassy Studio was founded in 2026, built on years of experience in digital marketing, content, campaigns, and influencer marketing.',
      'Founded by Avril Castañeda, the studio brings together social-first strategy, visual direction, editorial production, creators, paid media, and measurement to help hospitality, wellness, food & beverage, and lifestyle brands build a clearer digital presence aligned with what they offer.',
      'Avril leads the strategy, visual direction, and creative judgement of each project. From there, Sassy works with a curated network of specialists in photography, video, editing, design, community management, influencer marketing, paid media, web, and measurement, selected according to what each brand needs to communicate.',
      'Each project is assembled with the right talent, maintaining one direction from strategy through production, content, paid media, and digital optimisation.',
    ]
    : [
      'Sassy Studio nace en 2026 de años de experiencia en marketing digital, contenido, campañas e influencer marketing.',
      'Fundado por Avril Castañeda, el estudio reúne estrategia social-first, dirección visual, producción editorial, creadores, pauta y medición para ayudar a marcas de hospitality, wellness, food & beverage y lifestyle a construir una presencia digital más clara y alineada con lo que ofrecen.',
      'Avril lidera la estrategia, la dirección visual y el criterio creativo de cada proyecto. A partir de ahí, Sassy trabaja con una red curada de especialistas en fotografía, video, edición, diseño, community management, influencer marketing, pauta, web y medición, seleccionados según lo que cada marca necesita comunicar.',
      'Cada proyecto se arma con el talento adecuado, manteniendo una misma dirección desde la estrategia hasta la producción, el contenido, la pauta y la optimización digital.',
    ];

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />
      <section className="pt-36 pb-20 md:pt-48 md:pb-28 px-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="font-serif text-5xl md:text-7xl mb-12" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
            {isEnglish ? 'About Sassy Studio' : 'Sobre Sassy Studio'}
          </h1>
          <div className="space-y-7 text-lg leading-relaxed text-white/70">
            {paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </div>
      </section>
      <section className="py-20 md:py-28 px-6 border-y border-white/10 bg-white/[0.02]">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 md:gap-20">
          <div>
            <h2 className="font-serif text-3xl md:text-4xl mb-6">{isEnglish ? 'We are not for every brand.' : 'No somos para todas las marcas.'}</h2>
            <p className="text-white/65 leading-relaxed">
              {isEnglish
                ? 'We are a boutique studio and work with a small number of well-chosen clients. We look for brands with strong potential and a real desire to grow. When we choose a project, we commit fully to it. We seek the right fit to deliver the best results.'
                : 'Somos boutique, trabajamos con pocos clientes, bien elegidos. Buscamos marcas con buen potencial, y con ganas de crecer de verdad, porque cuando elegimos un proyecto, nos comprometemos completamente con él. Buscamos un buen match para ofrecer los mejores resultados.'}
            </p>
          </div>
          <div>
            <h2 className="font-serif text-3xl md:text-4xl mb-6">{isEnglish ? 'How do we work?' : '¿Cómo trabajamos?'}</h2>
            <p className="text-white/65 leading-relaxed">
              {isEnglish
                ? 'First, we analyse your brand, industry, and current stage. Then we present our recommendation and design a formula together that fits your stage, audience, and goals. You have a menu of services, but our proposal is always personalised because no single formula works for every brand.'
                : 'Primero analizamos tu marca, tu industria y el momento en el que estás. Luego te presentamos nuestra recomendación, y diseñamos juntos una fórmula única que tenga sentido para tu etapa, tu audiencia y tus objetivos. Tienes un menú de servicios disponibles, pero lo que te proponemos siempre será personalizado. Porque no existe una sola fórmula que funcione para todas las marcas.'}
            </p>
          </div>
        </div>
      </section>
      <section className="py-20 md:py-28 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-4xl md:text-6xl mb-8">{isEnglish ? 'Ready to grow?' : '¿Estás listo para crecer?'}</h2>
          <a href="#about-contact" className="inline-block border border-white/20 px-8 py-4 mb-12 text-xs uppercase tracking-[0.3em] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors">
            {isEnglish ? 'Contact us' : 'Contáctanos'}
          </a>
          <div id="about-contact"><LeadContactForm source="about-page" /></div>
        </div>
      </section>
      <Footer />
    </main>
  );
}