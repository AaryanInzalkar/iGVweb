'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { SITE_METADATA } from '@/lib/constants';
import { ExternalLink, ArrowUpRight, Sparkles } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - card.left - card.width / 2;
    const y = e.clientY - card.top - card.height / 2;

    setRotate({
      x: -(y / card.height) * 15,
      y: (x / card.width) * 15,
    });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  const handleApplyClick = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'hero_apply_click', { source: 'hero' });
    }
  };

  return (
    <section className="relative bg-[#0B0C10] text-white pt-16 pb-24 md:pt-28 md:pb-36 overflow-hidden select-none">
      {/* Ambient spotlights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-radial from-[#037EF3]/25 via-[#037EF3]/5 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-[400px] h-[400px] bg-[#FFC857]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="text-center max-w-5xl mx-auto space-y-10 transition-transform duration-200 ease-out"
          style={{
            transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
          }}
        >
          {/* Top Tag */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-slate-200 text-xs font-extrabold uppercase tracking-widest backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#FFC857]" />
            <span>Incoming Global Volunteer</span>
          </div>

          {/* MASSIVE 3D ANIMATED HEADLINE: "AIESEC in Bhopal" */}
          <div className="relative py-2">
            <h1
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter text-white leading-none filter drop-shadow-2xl transition-all duration-300"
              style={{
                textShadow: `
                  0 1px 0 #0266C8,
                  0 2px 0 #0252A0,
                  0 3px 0 #013F7C,
                  0 4px 0 #012B54,
                  0 5px 0 #011D3B,
                  0 10px 40px rgba(3, 126, 243, 0.6),
                  0 20px 60px rgba(0, 0, 0, 0.8)
                `,
              }}
            >
              <span className="text-white">AIESEC</span>{' '}
              <span className="bg-gradient-to-r from-[#037EF3] via-sky-300 to-[#FFC857] bg-clip-text text-transparent">
                in Bhopal
              </span>
            </h1>
          </div>

          <p className="text-lg sm:text-xl text-slate-300 font-normal max-w-2xl mx-auto leading-relaxed">
            Developing youth leadership potential through high-impact cross-cultural volunteer projects in Bhopal, India.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a
              href={SITE_METADATA.defaultApplyUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleApplyClick}
            >
              <Button variant="primary" size="lg" className="shadow-2xl shadow-[#037EF3]/50">
                <span>Explore Opportunities</span>
                <ArrowUpRight className="w-5 h-5 ml-1" />
              </Button>
            </a>

            <a
              href={SITE_METADATA.officialGVUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="dark" size="lg" className="border-white/20">
                <span>What is Global Volunteer?</span>
              </Button>
            </a>
          </div>

          {/* AIESEC Bhopal Trust Metrics */}
          <div className="pt-10 grid grid-cols-3 max-w-xl mx-auto border-t border-white/10 text-xs text-slate-300">
            <div className="space-y-0.5">
              <div className="font-black text-white text-xl md:text-2xl text-[#037EF3]">500+</div>
              <div className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">Volunteers Hosted</div>
            </div>
            <div className="space-y-0.5 border-x border-white/10 px-2">
              <div className="font-black text-white text-xl md:text-2xl text-[#FFC857]">10+ Yrs</div>
              <div className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">Exchange Impact</div>
            </div>
            <div className="space-y-0.5">
              <div className="font-black text-white text-xl md:text-2xl text-[#2E9E6F]">UN SDG</div>
              <div className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">Aligned Projects</div>
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
                  AIESEC in Bhopal • Featured Opportunity
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
