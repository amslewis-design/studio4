'use client';

import React from 'react';
import { useLocale } from 'next-intl';
import Navbar from '@/app/components/Navbar';
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
                  {locale === 'es' ? (
                    <>Proyectos ejecutados <br /> con estándar editorial.</>
                  ) : (
                    <>Curating digital <br /> destinations.</>
                  )}
                </h1>
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

        {/* Footer Note */}
        <section className="py-24 border-t border-white/5 text-center">
             <p className="font-serif italic text-white/30 text-2xl">
                "To travel is to live."
             </p>
        </section>
      </div>
    </>
  );
}
