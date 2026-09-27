'use client';

import React from 'react';
import { useLocale } from 'next-intl';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import LeadContactForm from '@/app/components/LeadContactForm';
import { Postcard } from '@/components/portfolio/Postcard';
import { PORTFOLIO_PROJECTS_EN, PORTFOLIO_PROJECTS_ES } from '@/app/constants/portfolio';

// Custom hook to map locale to projects
const usePortfolioProjects = () => {
  const locale = useLocale();
  return locale === 'es' ? PORTFOLIO_PROJECTS_ES : PORTFOLIO_PROJECTS_EN;
};

export default function PortfolioPage() {
  const projects = usePortfolioProjects();
  const locale = useLocale();

  return (
    <>
      <Navbar isHomepage={false} />
      <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-rose-500/30 selection:text-rose-200 overflow-x-hidden">
        
        {/* Hero Section */}
        <section className="relative px-6 pt-32 pb-16 md:px-12 md:pt-48 md:pb-32 max-w-[1800px] mx-auto">
             <div className="max-w-4xl">
                <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.9] text-white/90 mb-8 max-w-3xl">
                  {locale === 'es' ? 'Nuestro trabajo' : 'Our work'}
                </h1>
                <p className="max-w-2xl text-lg text-white/60">
                  {locale === 'es' ? 'Conoce algunos de nuestros proyectos aquí.' : 'Explore a selection of our projects.'}
                </p>
            </div>
        </section>

        {/* Postcard Grid */}
        <section className="px-6 pb-32 md:px-12 max-w-[1800px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 md:gap-y-40">
                {projects.map((project, index) => (
                    <div 
                        key={project.id} 
                        className={`${index % 2 === 1 ? 'md:translate-y-24' : ''} ${index % 3 === 1 ? 'lg:translate-y-32' : ''}`}
                    >
                        <Postcard project={project} />
                    </div>
                ))}
            </div>
        </section>

        <section className="py-24 px-6 border-t border-white/5">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-4xl md:text-6xl text-white mb-10">{locale === 'es' ? 'Contáctanos' : 'Contact us'}</h2>
            <LeadContactForm source="portfolio-page" />
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
