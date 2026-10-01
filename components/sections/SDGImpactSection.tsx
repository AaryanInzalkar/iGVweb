'use client';

import React from 'react';
import { SDGBadge } from '@/components/ui/SDGBadge';
import { Award, Users, Target, BookOpen } from 'lucide-react';
import { useParallax } from '@/lib/hooks/useParallax';

export const SDGImpactSection: React.FC = () => {
  const primarySDGs = [3, 4, 6, 13, 15];
  const parallaxRef = useParallax<HTMLDivElement>(0.5);

  return (
    <section id="impact" className="py-20 md:py-28 text-white relative overflow-hidden">
      {/* [TEMP_PLACEHOLDER] Background photo — replace with a real community/impact image from Bhopal */}
      <div
        ref={parallaxRef}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-125 opacity-50 pointer-events-none"
       style={{
         backgroundImage: "url('/images/bhopal/hero-overlook-sunset.jpg')",
      }}
      />
      <div className="absolute inset-0 bg-[#071B2F]/90 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Information */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FFC857]">
              <span>UN Global Goals Alignment</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
              Creating Real Impact for <span className="text-[#037EF3]">Global Goals</span>
            </h2>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Every Incoming Global Volunteer project in Bhopal is directly mapped to the United Nations Sustainable Development Goals. Volunteers work alongside local NGOs, schools, and community leaders to achieve measurable progress.
            </p>

            <div className="flex flex-wrap gap-2.5 pt-2">
              {primarySDGs.map((sdgNum) => (
                <SDGBadge key={sdgNum} sdgNumber={sdgNum} size="lg" />
              ))}
            </div>

            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-slate-800">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-[#037EF3]">
                  <Users className="w-5 h-5" />
                  <span className="text-2xl font-black text-white">1,500+</span>
                </div>
                <p className="text-xs text-slate-400">Community Beneficiaries Reached</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-[#2E9E6F]">
                  <BookOpen className="w-5 h-5" />
                  <span className="text-2xl font-black text-white">20+</span>
                </div>
                <p className="text-xs text-slate-400">Schools & Partner NGOs</p>
              </div>
            </div>
          </div>

          {/* Right Column: Visual SDG Grid Container */}
          <div className="lg:col-span-6">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md space-y-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-[#FFC857]" />
                <span>Focus SDGs in Bhopal</span>
              </h3>

              <div className="space-y-4">
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#C5192D] text-white flex items-center justify-center font-black text-sm shrink-0">
                    4
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white">Quality Education</h4>
                    <p className="text-xs text-slate-300 mt-1">
                      Conducting interactive English, STEM, and digital literacy workshops for primary school students in underserved areas.
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-white/5 rounded-2xl border border-white/10 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#3F7E44] text-white flex items-center justify-center font-black text-sm shrink-0">
                    13
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white">Climate Action</h4>
                    <p className="text-xs text-slate-300 mt-1">
                      Organizing urban lake conservation, waste reduction awareness campaigns, and community tree planting drives.
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-white/5 rounded-2xl border border-white/10 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#4C9F38] text-white flex items-center justify-center font-black text-sm shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white">Good Health & Well-Being</h4>
                    <p className="text-xs text-slate-300 mt-1">
                      Promoting preventive health education, nutrition campaigns, and sanitation drives with local health advocates.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};