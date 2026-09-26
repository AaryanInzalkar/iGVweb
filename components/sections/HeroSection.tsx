'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { SITE_METADATA } from '@/lib/constants';
import { ArrowUpRight, ChevronRight } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const handleApplyClick = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'hero_apply_click', { source: 'hero' });
    }
  };

  return (
    <section className="relative bg-[#000000] text-white pt-24 pb-32 md:pt-36 md:pb-44 overflow-hidden">
      {/* Apple-style soft ambient backdrop glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[450px] bg-gradient-to-tr from-[#037EF3]/20 via-[#037EF3]/10 to-transparent rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Apple Minimalist Typography Container */}
        <div className="max-w-4xl mx-auto space-y-6">
          
          {/* Main Display Headline */}
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter text-white leading-none">
            AIESEC in <span className="bg-gradient-to-r from-[#037EF3] via-sky-300 to-[#FFC857] bg-clip-text text-transparent">Bhopal</span>
          </h1>

          {/* Clean Single-Line Tagline */}
          <p className="text-xl sm:text-2xl md:text-3xl text-slate-300 font-medium tracking-tight max-w-2xl mx-auto">
            Incoming Global Volunteer.
          </p>

          {/* Pristine Apple-Style Pill CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <a
              href={SITE_METADATA.defaultApplyUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleApplyClick}
            >
              <Button variant="primary" size="lg" className="rounded-full px-8 py-4 font-bold text-base shadow-2xl shadow-[#037EF3]/40">
                <span>Explore Projects</span>
                <ArrowUpRight className="w-5 h-5 ml-1.5" />
              </Button>
            </a>

            <a
              href={SITE_METADATA.officialGVUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="dark" size="lg" className="rounded-full px-8 py-4 font-bold text-base bg-white/10 text-white border-white/20 hover:bg-white/20 backdrop-blur-md">
                <span>Learn More</span>
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </a>
          </div>
        </div>

        {/* Apple-Style Minimalist Showcase Card */}
        <div className="mt-20 md:mt-28 max-w-5xl mx-auto">
          <div className="relative rounded-[36px] overflow-hidden border border-white/15 bg-[#0B0C10] shadow-2xl group">
            <img
              src="https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=1400"
              alt="AIESEC in Bhopal volunteer project"
              className="w-full h-[440px] md:h-[580px] object-cover group-hover:scale-102 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-black/20 to-transparent" />

            {/* Minimalist Floating Overlay Pill */}
            <div className="absolute bottom-8 left-8 right-8 md:bottom-12 md:left-12 md:right-12 glass-panel-dark p-6 md:p-8 rounded-3xl border border-white/15 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-left">
              <div>
                <div className="text-xs font-bold text-[#FFC857] uppercase tracking-widest mb-1">
                  Featured Realization
                </div>
                <h2 className="text-xl md:text-2xl font-black text-white tracking-tight">
                  Global Classroom 2026
                </h2>
                <p className="text-xs md:text-sm text-slate-300 mt-0.5">
                  Bhopal, India • Quality Education (SDG #4)
                </p>
              </div>

              <a
                href={SITE_METADATA.defaultApplyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0"
              >
                <Button variant="pill" size="sm" className="text-xs font-black px-6 py-3">
                  <span>Apply Now</span>
                  <ArrowUpRight className="w-4 h-4 ml-1" />
                </Button>
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
