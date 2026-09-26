'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { ArrowDown } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative bg-[#000000] text-white min-h-[90vh] flex flex-col items-center justify-center overflow-hidden select-none py-20">
      {/* Soft atmospheric ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[1000px] h-[600px] bg-radial from-slate-400/10 via-slate-800/5 to-transparent rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center flex flex-col items-center justify-center space-y-16">
        
        {/* CONTINUOUS 3D CAMERA ANGLE Orbit CONTAINER */}
        <div className="camera-3d-orbit py-8 px-4">
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-none font-sans metallic-silver-text metallic-3d-shadow">
            AIESEC in Bhopal
          </h1>
        </div>

        {/* Minimal Scroll CTA */}
        <div className="pt-8">
          <a href="#why-bhopal" className="focus-visible:outline-none">
            <Button
              variant="dark"
              size="lg"
              className="rounded-full px-8 py-4 font-bold text-sm bg-white/10 text-slate-200 border-white/20 hover:bg-white/20 hover:text-white backdrop-blur-xl transition-all duration-300 gap-2 shadow-2xl"
            >
              <span>Explore</span>
              <ArrowDown className="w-4 h-4 animate-bounce" />
            </Button>
          </a>
        </div>

      </div>
    </section>
  );
};
