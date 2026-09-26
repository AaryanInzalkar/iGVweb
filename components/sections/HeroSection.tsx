'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { SITE_METADATA } from '@/lib/constants';
import { ExternalLink, ArrowUpRight, Sparkles, MapPin, Award, Users } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const handleApplyClick = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'hero_apply_click', { source: 'hero' });
    }
  };

  return (
    <section className="relative bg-[#0B0C10] text-white pt-16 pb-24 md:pt-28 md:pb-40 overflow-hidden">
      {/* Squarespace ambient blur spotlights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-radial from-[#037EF3]/20 via-[#037EF3]/5 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-[400px] h-[400px] bg-[#FFC857]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto space-y-8">
          {/* Top Pill Tag focused on AIESEC in Bhopal */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-slate-200 text-xs font-extrabold uppercase tracking-widest backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#FFC857]" />
            <span>AIESEC in Bhopal • Incoming Global Volunteer (iGV)</span>
          </div>

          {/* Opening Headline laser-focused on AIESEC in Bhopal */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white leading-[1.02]">
            AIESEC in Bhopal.{' '}
            <span className="bg-gradient-to-r from-[#037EF3] via-sky-400 to-[#FFC857] bg-clip-text text-transparent">
              Lead the Change.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 font-normal max-w-2xl mx-auto leading-relaxed">
            Welcome to AIESEC in Bhopal&apos;s Incoming Global Volunteer platform. Develop your leadership potential while creating measurable social impact across the City of Lakes.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <a
              href={SITE_METADATA.defaultApplyUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleApplyClick}
            >
              <Button variant="primary" size="lg" className="shadow-2xl shadow-[#037EF3]/40">
                <span>Explore Bhopal Projects</span>
                <ArrowUpRight className="w-5 h-5 ml-1" />
              </Button>
            </a>

            <a
              href={SITE_METADATA.officialGVUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="dark" size="lg" className="border-white/20">
                <span>About Global Volunteer</span>
              </Button>
            </a>
          </div>

          {/* AIESEC Bhopal Trust Metrics */}
          <div className="pt-8 grid grid-cols-3 max-w-xl mx-auto border-t border-white/10 text-xs text-slate-300">
            <div className="space-y-0.5">
              <div className="font-black text-white text-lg md:text-xl text-[#037EF3]">500+</div>
              <div className="text-[11px] text-slate-400">Volunteers Hosted</div>
            </div>
            <div className="space-y-0.5 border-x border-white/10 px-2">
              <div className="font-black text-white text-lg md:text-xl text-[#FFC857]">10+ Yrs</div>
              <div className="text-[11px] text-slate-400">Local Exchange Impact</div>
            </div>
            <div className="space-y-0.5">
              <div className="font-black text-white text-lg md:text-xl text-[#2E9E6F]">UN SDG</div>
              <div className="text-[11px] text-slate-400">Aligned Projects</div>
            </div>
          </div>
        </div>

        {/* Hero Visual Showcase Panel */}
        <div className="mt-16 md:mt-24 relative max-w-5xl mx-auto">
          <div className="relative rounded-[32px] overflow-hidden border border-white/15 bg-[#14161D] shadow-2xl group">
            <img
              src="https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=1200"
              alt="AIESEC in Bhopal volunteer teaching children in community classroom"
              className="w-full h-[400px] md:h-[540px] object-cover group-hover:scale-102 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C10] via-black/20 to-transparent" />

            {/* Floating Spotlight Card */}
            <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 md:right-10 glass-panel-dark p-6 rounded-2xl border border-white/15 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#037EF3] text-white text-[10px] font-black uppercase tracking-wider">
                  AIESEC in Bhopal • Exchange Spotlight
                </div>
                <h2 className="font-extrabold text-lg md:text-xl text-white">
                  Global Classroom 2026 • Bhopal, India
                </h2>
                <p className="text-xs text-slate-300">
                  SDG #4 Quality Education • 6-Week Leadership Exchange
                </p>
              </div>

              <a
                href={SITE_METADATA.defaultApplyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0"
              >
                <Button variant="pill" size="sm" className="text-xs font-black">
                  <span>Apply Now</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-1" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
