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
      {/* Background Photography with Warm Bronze Organic Tone */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none opacity-85"
        style={{
          backgroundImage: "url('/images/squarespace_hero_bg.jpg')",
        }}
      />

      {/* Atmospheric Vignette & Gradients to guarantee high-contrast legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/90 pointer-events-none" />
      <div className="absolute inset-0 bg-radial from-transparent via-black/30 to-black/80 pointer-events-none" />

      {/* Center Hero Typography & Primary CTA */}
      <div className="relative z-10 pt-36 sm:pt-44 md:pt-48 pb-12 sm:pb-16 px-6 max-w-6xl mx-auto text-center flex flex-col items-center">
        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[6.75rem] xl:text-[7.5rem] font-medium tracking-tight text-white leading-[1.03] select-none">
          AIESEC in Bhopal
          <br />
          makes it real
        </h1>

        {/* Crisp White CTA Button & Microcopy */}
        <div className="mt-8 sm:mt-10 flex flex-col items-center gap-3">
          <a
            href={SITE_METADATA.defaultApplyUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleApplyClick}
          >
            <button className="bg-white hover:bg-neutral-200 text-black text-xs sm:text-sm font-bold uppercase tracking-[0.2em] px-10 py-4 rounded-none transition-all duration-200 shadow-2xl hover:scale-[1.02] active:scale-[0.98]">
              GET STARTED
            </button>
          </a>
          <p className="text-[11px] sm:text-xs text-neutral-400 font-normal tracking-wide">
            Start for free. No credit card required.
          </p>
        </div>
      </div>

      {/* Bottom Triptych Showcase Cards Peeking from Below the Fold */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 -mb-12 sm:-mb-16 md:-mb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-8 items-end">
          
          {/* Card 1 (Left): Dark Brutalist Typography Card — Green Bhopal Initiative */}
          <Link
            href="/projects/green-bhopal-initiative"
            className="group block bg-[#0F1117] text-white p-6 sm:p-8 rounded-t-2xl sm:rounded-t-3xl border border-white/10 shadow-2xl hover:-translate-y-2 transition-transform duration-300"
          >
            <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 mb-6">
              <span>WORK</span>
              <span>ABOUT</span>
              <span>SDG #13</span>
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tighter leading-none group-hover:text-emerald-400 transition-colors">
                GREEN
                <br />
                BHOPAL
              </h2>
              <div className="pt-4 border-t border-white/10 text-xs text-neutral-400 space-y-1">
                <p className="font-bold text-white uppercase tracking-wider text-[11px]">Bhopal / Upper Lake</p>
                <p className="text-[11px] leading-relaxed text-neutral-400">
                  Urban lake conservation, biodiversity drives, and climate awareness in Central India.
                </p>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-neutral-300 group-hover:text-white">
              <span>VIEW PROJECT</span>
              <span>01 →</span>
            </div>
          </Link>

          {/* Card 2 (Center - Prominent): Cream Luxury Editorial Card — Global Classroom 2026 */}
          <Link
            href="/projects/global-classroom-2026"
            className="group block bg-[#F5F2EB] text-black p-6 sm:p-8 rounded-t-2xl sm:rounded-t-3xl border border-neutral-300 shadow-2xl md:-translate-y-6 hover:md:-translate-y-8 transition-transform duration-300"
          >
            <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-600 mb-4">
              <span>EXPLORE</span>
              <span className="font-extrabold text-black">AIESEC IN BHOPAL</span>
              <span>APPLY (OPEN)</span>
            </div>

            <div className="text-center py-2">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-normal uppercase tracking-wider text-neutral-900 group-hover:opacity-80 transition-opacity">
                CLASSROOM
              </h2>
              <p className="text-[10px] uppercase tracking-[0.25em] text-neutral-500 mt-1 font-sans font-semibold">
                SDG #4 Quality Education
              </p>
            </div>

            <div className="relative mt-4 mb-4 rounded-xl overflow-hidden aspect-[16/10] bg-neutral-200">
              <img
                src="https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=800"
                alt="Global volunteer teaching children in Bhopal"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-semibold text-neutral-700 pt-2 border-t border-neutral-300">
              <span>6-Week Leadership Exchange</span>
              <span className="font-bold text-black uppercase tracking-wider">VIEW PROJECT 02 →</span>
            </div>
          </Link>

          {/* Card 3 (Right): Off-White Minimalist Card — Health & Hygiene Awareness */}
          <Link
            href="/projects/health-hygiene-awareness"
            className="group block bg-[#E8E8E8] text-black p-6 sm:p-8 rounded-t-2xl sm:rounded-t-3xl border border-neutral-300 shadow-2xl hover:-translate-y-2 transition-transform duration-300"
          >
            <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-600 mb-4">
              <span>COMMUNITY / CARE</span>
              <span>SDG #3</span>
            </div>

            <div className="relative rounded-xl overflow-hidden aspect-[16/10] bg-neutral-300 mb-4">
              <img
                src="https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=800"
                alt="Health awareness and hygiene campaign in Bhopal"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight uppercase leading-tight text-neutral-900 group-hover:text-blue-600 transition-colors">
                COMMUNITY HEALTH
              </h2>
              <p className="text-[11px] text-neutral-600 leading-relaxed">
                Preventive healthcare, sanitation drives, and nutrition workshops across Bhopal communities.
              </p>
            </div>

            <div className="mt-6 flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-neutral-800">
              <span>EXPLORE</span>
              <span>03 →</span>
            </div>
          </Link>

        </div>
      </div>
    </section>
  );
};
