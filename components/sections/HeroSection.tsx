'use client';

import React from 'react';
import { ArrowDown } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative bg-[#000000] text-white min-h-screen flex flex-col items-center justify-center overflow-hidden select-none">
      {/* Cinematic atmospheric floor reflection */}
      <div className="absolute bottom-0 left-0 right-0 h-[40%] bg-gradient-to-t from-slate-900/20 via-transparent to-transparent pointer-events-none" />

      {/* Subtle spotlight from above */}
      <div className="absolute top-[15%] left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-radial from-white/8 to-transparent rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 text-center flex flex-col items-center justify-center w-full px-4">
        
        {/* 3D CINEMATIC PAN CONTAINER */}
        <div className="cinematic-pan-3d">
          {/* 
            Two layers stacked:
            1. Bottom layer = 3D extruded depth (visible shadows) 
            2. Top layer = chrome metallic surface (clip-gradient)
          */}
          <div className="relative">
            {/* Shadow/Depth Layer — provides the 3D extrusion geometry */}
            <h1
              aria-hidden="true"
              className="text-3d-extruded text-7xl sm:text-8xl md:text-9xl lg:text-[11rem] xl:text-[13rem] font-black tracking-tighter leading-[0.88] whitespace-nowrap"
            >
              AIESEC in Bhopal
            </h1>

            {/* Surface Layer — chrome metallic gradient on top */}
            <h1
              className="text-metallic-surface text-7xl sm:text-8xl md:text-9xl lg:text-[11rem] xl:text-[13rem] font-black tracking-tighter leading-[0.88] whitespace-nowrap absolute inset-0"
            >
              AIESEC in Bhopal
            </h1>
          </div>
        </div>

        {/* Minimal scroll indicator */}
        <div className="mt-20 md:mt-28">
          <a
            href="#why-bhopal"
            className="group inline-flex flex-col items-center gap-2 text-slate-500 hover:text-white transition-colors duration-300 focus-visible:outline-none"
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Scroll</span>
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </a>
        </div>

      </div>
    </section>
  );
};
