'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { SITE_METADATA } from '@/lib/constants';
import { ArrowUpRight, ChevronRight, Sparkles } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const handleApplyClick = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'hero_apply_click', { source: 'hero' });
    }
  };

  return (
    <section className="relative bg-[#000000] text-white pt-24 pb-32 md:pt-36 md:pb-48 overflow-hidden select-none">
      {/* Apple-Style Atmospheric Ambient Lighting Aura */}
      <div className="apple-aura-pulse absolute top-1/3 left-1/2 w-[700px] sm:w-[1000px] h-[500px] bg-gradient-to-tr from-[#037EF3]/30 via-sky-500/10 to-[#FFC857]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Apple Minimalist Typography Stack */}
        <div className="max-w-5xl mx-auto space-y-6">
          
          {/* Subtle Top Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs font-semibold tracking-widest uppercase backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#FFC857]" />
            <span>AIESEC in Bhopal</span>
          </div>

          {/* SOBER, ULTRA-PREMIUM APPLE METALLIC DISPLAY HEADLINE */}
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-none">
            <span className="apple-metallic-text">AIESEC in Bhopal</span>
          </h1>

          {/* Minimalist Subtitle */}
          <p className="text-xl sm:text-2xl md:text-3xl text-slate-300 font-medium tracking-tight max-w-2xl mx-auto leading-relaxed">
            Incoming Global Volunteer.
          </p>

          {/* Apple Pill Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <a
              href={SITE_METADATA.defaultApplyUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleApplyClick}
            >
              <Button
                variant="primary"
                size="lg"
                className="rounded-full px-8 py-4 font-bold text-base shadow-2xl shadow-[#037EF3]/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
              >
                <span>Explore Opportunities</span>
                <ArrowUpRight className="w-5 h-5 ml-1.5" />
              </Button>
            </a>

            <a
              href={SITE_METADATA.officialGVUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="dark"
                size="lg"
                className="rounded-full px-8 py-4 font-bold text-base bg-white/10 text-white border-white/20 hover:bg-white/20 hover:scale-[1.02] active:scale-[0.98] backdrop-blur-xl transition-all duration-300"
              >
                <span>Learn More</span>
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </a>
          </div>
        </div>

        {/* APPLE-STYLE LUXURY SHOWCASE CONTAINER */}
        <div className="mt-20 md:mt-32 max-w-5xl mx-auto">
          <div className="relative rounded-[40px] overflow-hidden border border-white/20 bg-[#0B0C10] shadow-[0_40px_100px_rgba(0,0,0,0.9)] group">
            <img
              src="https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=1400"
              alt="AIESEC in Bhopal volunteer project"
              className="w-full h-[460px] md:h-[600px] object-cover group-hover:scale-102 transition-transform duration-1000 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-black/30 to-transparent" />

            {/* Apple Floating Glass Overlay Card */}
            <div className="absolute bottom-8 left-8 right-8 md:bottom-12 md:left-12 md:right-12 glass-panel-dark p-6 md:p-8 rounded-3xl border border-white/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-left">
              <div>
                <div className="text-xs font-bold text-[#FFC857] uppercase tracking-widest mb-1">
                  Featured Exchange
                </div>
                <h2 className="text-xl md:text-2xl font-black text-white tracking-tight">
                  Global Classroom 2026 • Bhopal
                </h2>
                <p className="text-xs md:text-sm text-slate-300 mt-0.5">
                  Quality Education (SDG #4) • 6-Week Leadership Realization
                </p>
              </div>

              <a
                href={SITE_METADATA.defaultApplyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0"
              >
                <Button variant="pill" size="sm" className="text-xs font-black px-6 py-3 hover:scale-105 transition-transform">
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
