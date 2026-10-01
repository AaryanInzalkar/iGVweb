'use client';

import React from 'react';
import { Globe2, Target, Zap } from 'lucide-react';
import { useParallax } from '@/lib/hooks/useParallax';

export const ExperiencePillarsSection: React.FC = () => {
  const parallaxRef = useParallax<HTMLDivElement>(0.5);

  const pillars = [
    {
      icon: Globe2,
      color: '#037EF3',
      bgLight: 'bg-[#037EF3]/10',
      title: 'Experience New Cultures',
      description:
        'Immerse yourself in Indian customs, local traditions, regional cuisine, and build lifelong friendships with international co-volunteers and local hosts.',
    },
    {
      icon: Target,
      color: '#2E9E6F',
      bgLight: 'bg-[#2E9E6F]/10',
      title: 'Make an Impact',
      description:
        'Contribute directly to measurable community projects aligned with United Nations Sustainable Development Goals in education, climate action, and public health.',
    },
    {
      icon: Zap,
      color: '#FF6B5E',
      bgLight: 'bg-[#FF6B5E]/10',
      title: 'Challenge Yourself',
      description:
        'Step out of your comfort zone, develop practical project management skills, build cross-cultural communication confidence, and discover your potential.',
    },
  ];

  return (
    <section id="experience" className="relative py-20 md:py-28 text-[#071B2F] overflow-hidden">
      <div
        ref={parallaxRef}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-125 opacity-45 pointer-events-none"
        style={{
        backgroundImage: "url('/images/bhopal/lake-boats-dusk.jpg')",
       }}
      />
      <div className="absolute inset-0 bg-white/55 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#037EF3]">
            <span>The Global Volunteer Journey</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#071B2F]">
            Three Value Pillars of <span className="text-[#037EF3]">Your Experience</span>
          </h2>

          <p className="text-base sm:text-lg text-[#5B6573]">
            Global Volunteer is designed to provide young people with a practical, cross-cultural experience that builds leadership and creates social value.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-8 border border-[#E5E7EB] shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div
                    className={`w-14 h-14 rounded-2xl ${pillar.bgLight} flex items-center justify-center transition-transform group-hover:scale-110 duration-200`}
                    style={{ color: pillar.color }}
                  >
                    <Icon className="w-7 h-7" />
                  </div>

                  <h3 className="text-xl font-bold text-[#071B2F]">{pillar.title}</h3>

                  <p className="text-sm md:text-base text-[#5B6573] leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};