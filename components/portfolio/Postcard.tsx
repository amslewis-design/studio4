'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Project } from '@/app/constants/portfolio';

interface PostcardProps {
  project: Project;
}

export function Postcard({ project }: PostcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="group relative h-[420px] w-full perspective-1000 cursor-pointer"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={() => setIsFlipped(!isFlipped)} // For mobile interaction
    >
      <div 
        className={`relative h-full w-full transition-all duration-700 transform-style-3d ${
          isFlipped ? 'rotate-y-180' : 'rotate-y-0'
        }`}
      >
        {/* Front Face */}
        <div className="absolute inset-0 h-full w-full backface-hidden rounded-sm overflow-hidden shadow-lg bg-white/5 border border-white/10">
          <div className="relative h-full w-full">
            <Image
              src={project.imageUrl}
              alt={project.clientName}
              fill
              className="object-cover transition-all duration-700"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent opacity-90" />
            
            {/* Stamp - Top Right */}
            <div className="absolute top-4 right-4 h-16 w-16 border-2 border-white/30 rounded-full flex items-center justify-center rotate-12 opacity-80 backdrop-blur-sm">
              <span className="font-serif text-white text-xs tracking-widest">{project.year}</span>
            </div>

            {/* Content - Bottom */}
            <div className="absolute bottom-0 left-0 p-6 w-full text-left">
              <h3 className="font-serif text-2xl text-white mb-1">{project.clientName}</h3>
              <p className="font-sans text-xs tracking-[0.2em] text-white/70 uppercase">{project.location}</p>
            </div>
          </div>
        </div>

        {/* Back Face */}
        <div className="absolute inset-0 h-full w-full backface-hidden rotate-y-180 bg-slate-900 rounded-sm shadow-xl p-6 flex flex-col justify-between border border-white/10">
            {/* Paper texture overlay could go here */}
            
            <div className="flex-1 flex gap-4 h-full">
                {/* Left Side: Message */}
                <div className="flex-1 flex flex-col justify-center space-y-4 pr-4 border-r border-white/10 border-dashed">
                    <p className="font-serif italic text-white/80 text-sm leading-relaxed">
                        "{project.testimonial}"
                    </p>
                    <p className="font-sans text-xs font-bold text-[var(--accent)] uppercase tracking-wider">
                         — {project.testimonialAuthor}
                    </p>
                </div>

                {/* Right Side: Address/Stamp Area */}
                <div className="w-1/3 flex flex-col items-center pt-2">
                    {/* Stamp Placeholder */}
                    <div className="w-16 h-16 relative mb-12 self-end mr-2 opacity-80 rotate-12">
                         <Image 
                            src="https://res.cloudinary.com/ds86m2xm0/image/upload/v1770262399/Sassy-studio_blanco_dws1ux.png" 
                            alt="Sassy Studio Stamp" 
                            fill
                            className="object-contain drop-shadow-md"
                        />
                    </div>

                    {/* Services Tags */}
                    <div className="w-full mt-auto">
                        <div className="flex flex-wrap gap-2 justify-end">
                            {project.services.map((service) => (
                                <span key={service} className="text-[9px] uppercase tracking-wider text-white/70 bg-white/5 px-2 py-1 rounded-sm border border-white/10">
                                    {service}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Branding */}
            <div className="w-full text-center mt-4 pt-4 border-t border-white/10">
                <span className="font-serif text-white/30 text-xs italic">Sassy Studio - Digital Stories</span>
            </div>
        </div>
      </div>
    </div>
  );
}
