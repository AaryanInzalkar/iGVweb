'use client';

import React from 'react';
import { MapPin, Waves, GraduationCap, Utensils, HeartHandshake } from 'lucide-react';
import { useParallax } from '@/lib/hooks/useParallax';

export const WhyBhopalSection: React.FC = () => {
  const parallaxRef = useParallax<HTMLDivElement>(0.5);

  return (
    <section id="why-bhopal" className="relative py-32 md:py-44 text-white overflow-hidden">
      {/* Full-bleed background photo */}
      <div
        ref={parallaxRef}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-125 pointer-events-none"
        style={{ backgroundImage: "url('/images/bhopal/upper-lake-sunset.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/85 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-2xl space-y-3 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#037EF3] rounded-full text-xs font-bold">
            <MapPin className="w-3.5 h-3.5" />
            <span>Bhopal, Madhya Pradesh</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight">
            Why Volunteer in <span className="text-[#037EF3]">Bhopal?</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-200 leading-relaxed">
            Bhopal is one of India&apos;s greenest and most fascinating cities — known for its iconic lakes, historical architecture, and warm hospitality.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* Benefits of Bhopal */}
          <div className="space-y-5">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#4FA8FF] border-b border-white/20 pb-2">
              Benefits of Bhopal
            </h3>
            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-white/10 text-[#4FA8FF] rounded-lg shrink-0 backdrop-blur-sm">
                  <Waves className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">City of Lakes</h4>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Home to Upper Lake, one of Asia&apos;s oldest man-made lakes.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-white/10 text-[#FF8A7A] rounded-lg shrink-0 backdrop-blur-sm">
                  <Utensils className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">Heritage & Food</h4>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Renowned culinary traditions, historic palaces, and bazaars.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Why AIESEC Bhopal */}
          <div className="space-y-5">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#4FD69C] border-b border-white/20 pb-2">
              Why AIESEC Bhopal
            </h3>
            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-white/10 text-[#4FD69C] rounded-lg shrink-0 backdrop-blur-sm">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">Youth & Culture</h4>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Thriving university city with top national institutes.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-white/10 text-[#FFD66B] rounded-lg shrink-0 backdrop-blur-sm">
                  <HeartHandshake className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">Local Support</h4>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Dedicated local committee buddies to assist your stay.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}; 