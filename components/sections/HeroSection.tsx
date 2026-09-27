'use client';

import React from 'react';
import { SITE_METADATA } from '@/lib/constants';
import Link from 'next/link';

export const HeroSection: React.FC = () => {
  const handleApplyClick = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'hero_apply_click', { source: 'hero' });
    }
  };

  return (
    <section className="relative min-h-screen bg-[#080808] text-white flex flex-col justify-between overflow-hidden">
      {/* Background Photography */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none opacity-85"
        style={{ backgroundImage: "url('/images/squarespace_hero_bg.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/90 pointer-events-none" />
      <div className="absolute inset-0 bg-radial from-transparent via-black/30 to-black/80 pointer-events-none" />

      {/* Center Hero Typography & Primary CTA */}
      <div className="relative z-10 pt-28 sm:pt-36 md:pt-40 pb-8 sm:pb-10 px-6 max-w-6xl mx-auto text-center flex flex-col items-center">
        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[6.75rem] xl:text-[7.5rem] font-medium tracking-tight text-white leading-[1.03] select-none">
          AIESEC in Bhopal
          <br />
          makes it real
        </h1>

        <div className="mt-8 sm:mt-10 flex flex-col items-center gap-3">
          <a href={SITE_METADATA.defaultApplyUrl} target="_blank" rel="noopener noreferrer" onClick={handleApplyClick}><button className="bg-white hover:bg-neutral-200 text-black text-xs sm:text-sm font-bold uppercase tracking-[0.2em] px-10 py-4 rounded-none transition-all duration-200 shadow-2xl hover:scale-[1.02] active:scale-[0.98]">GET STARTED</button></a>
        </div>
      </div>

      {/* Showcase Row: center card sharp & prominent, side cards peeking in, cropped at the edges */}
      <div className="relative z-10 w-full pb-10 sm:pb-14 md:pb-20">
        <div className="flex items-center justify-center gap-4 md:gap-6">

          {/* Left peeking card — hidden on mobile, cropped at the screen edge */}
          <Link
            href="/projects/green-bhopal-initiative"
            className="hidden md:flex flex-col justify-between overflow-hidden shrink-0 w-[220px] lg:w-[260px] h-[300px] lg:h-[340px] -mr-6 lg:-mr-10 -ml-16 lg:-ml-24 scale-95 opacity-60 hover:opacity-90 hover:scale-100 transition-all duration-300 bg-[#0F1117] text-white p-5 lg:p-6 rounded-2xl border border-white/10 shadow-2xl z-0"
          >
            <div className="flex items-center justify-between text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-400 mb-4">
              <span>WORK</span>
              <span>SDG #13</span>
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl lg:text-3xl font-black uppercase tracking-tighter leading-none">
                GREEN
                <br />
                BHOPAL
              </h2>
              <p className="text-[10px] leading-relaxed text-neutral-400 line-clamp-2 pt-2 border-t border-white/10 mt-2">
                Urban lake conservation and climate awareness in Central India.
              </p>
            </div>
            <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-neutral-300">
              <span>VIEW PROJECT</span>
              <span>01 →</span>
            </div>
          </Link>

          {/* Center card — fully sharp, prominent, on top */}
          <Link
            href="/projects/global-classroom-2026"
            className="relative flex flex-col justify-between overflow-hidden shrink-0 w-[300px] sm:w-[360px] lg:w-[420px] h-[360px] sm:h-[400px] lg:h-[440px] bg-[#F5F2EB] text-black p-6 sm:p-7 rounded-2xl border border-neutral-300 shadow-2xl z-20 hover:-translate-y-2 transition-transform duration-300 transform-gpu will-change-transform"
          >
            <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-600 mb-3">
              <span>EXPLORE</span>
              <span className="font-extrabold text-black">AIESEC IN BHOPAL</span>
              <span>OPEN</span>
            </div>

            <div className="text-center">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal uppercase tracking-wider text-neutral-900 truncate">
                CLASSROOM
              </h2>
              <p className="text-[10px] uppercase tracking-[0.25em] text-neutral-500 mt-1 font-sans font-semibold">
                SDG #4 Quality Education
              </p>
            </div>

            <div className="relative rounded-xl overflow-hidden h-32 sm:h-36 bg-neutral-200">
              <img
                src="https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=800"
                alt="Global volunteer teaching children in Bhopal"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-semibold text-neutral-700 pt-2 border-t border-neutral-300">
              <span>6-Week Leadership</span>
              <span className="font-bold text-black uppercase tracking-wider">VIEW 02 →</span>
            </div>
          </Link>

          {/* Right peeking card — hidden on mobile, cropped at the screen edge */}
          <Link
            href="/projects/health-hygiene-awareness"
            className="hidden md:flex flex-col justify-between overflow-hidden shrink-0 w-[220px] lg:w-[260px] h-[300px] lg:h-[340px] -ml-6 lg:-ml-10 -mr-16 lg:-mr-24 scale-95 opacity-60 hover:opacity-90 hover:scale-100 transition-all duration-300 bg-[#E8E8E8] text-black p-5 lg:p-6 rounded-2xl border border-neutral-300 shadow-2xl z-0"
          >
            <div className="flex items-center justify-between text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-600 mb-3">
              <span>CARE</span>
              <span>SDG #3</span>
            </div>
            <div className="relative rounded-lg overflow-hidden h-20 lg:h-24 bg-neutral-300">
              <img
                src="https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=800"
                alt="Health awareness and hygiene campaign in Bhopal"
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-xl lg:text-2xl font-extrabold tracking-tight uppercase leading-tight text-neutral-900">
              COMMUNITY HEALTH
            </h2>
            <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-neutral-800">
              <span>EXPLORE</span>
              <span>03 →</span>
            </div>
          </Link>

        </div>
      </div>
    </section>
  );
}; 