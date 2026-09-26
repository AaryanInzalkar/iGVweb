'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { SITE_METADATA } from '@/lib/constants';
import { ExternalLink, Compass, ShieldCheck, Heart, Sparkles } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const handleApplyClick = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'hero_apply_click', { source: 'hero' });
    }
  };

  const handleInfoClick = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'global_volunteer_info_click', { source: 'hero' });
    }
  };

  return (
    <section className="relative bg-[#071B2F] text-white pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden">
      {/* Decorative gradient blur background */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#037EF3]/20 rounded-full blur-3xl pointer-events-none -mr-40 -mt-40" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#FFC857]/10 rounded-full blur-3xl pointer-events-none -ml-30 -mb-30" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Hero Column - Editorial Typography */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-slate-200 text-xs font-semibold tracking-wide backdrop-blur-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#FFC857]" />
              <span>AIESEC in Bhopal • Incoming Global Volunteer</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-[1.15]">
              Lead the Change.{' '}
              <span className="text-[#037EF3] underline decoration-[#FFC857] decoration-wavy decoration-2 underline-offset-8">
                Experience Bhopal.
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-200 leading-relaxed font-normal max-w-2xl">
              Develop your leadership potential by volunteering for high-impact social projects in Bhopal, India. Work alongside local communities to address UN Sustainable Development Goals.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <a
                href={SITE_METADATA.defaultApplyUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleApplyClick}
              >
                <Button variant="primary" size="lg" className="w-full sm:w-auto shadow-lg shadow-[#037EF3]/30">
                  <span>Explore & Apply Now</span>
                  <ExternalLink className="w-4 h-4 ml-1.5" />
                </Button>
              </a>

              <a
                href={SITE_METADATA.officialGVUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleInfoClick}
              >
                <Button variant="outline" size="lg" className="w-full sm:w-auto text-white border-slate-300 hover:bg-white/10">
                  <span>What is Global Volunteer?</span>
                </Button>
              </a>
            </div>

            {/* Trust highlights */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-slate-800 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#FFC857] shrink-0" />
                <span>City of Lakes Destination</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#2E9E6F] shrink-0" />
                <span>UN SDG Aligned</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-[#FF6B5E] shrink-0" />
                <span>Youth Leadership</span>
              </div>
            </div>
          </div>

          {/* Right Hero Column - Editorial Documentary Layout */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 bg-slate-900 group">
              {/* Main Documentary Photo */}
              <img
                src="https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=800"
                alt="Global volunteer teaching children in Bhopal community classroom"
                className="w-full h-[420px] object-cover object-center group-hover:scale-102 transition-transform duration-500"
              />

              {/* Overlay card tag */}
              <div className="absolute bottom-4 left-4 right-4 bg-[#071B2F]/90 backdrop-blur-md p-4 rounded-2xl border border-white/15 text-white flex items-center justify-between">
                <div>
                  <div className="text-xs text-[#FFC857] font-bold uppercase tracking-wider">
                    Volunteer Project Spotlight
                  </div>
                  <div className="font-bold text-sm text-white">
                    Global Classroom • Bhopal, India
                  </div>
                </div>
                <div className="px-2.5 py-1 bg-[#2E9E6F] text-white text-xs font-bold rounded-lg">
                  SDG #4
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
