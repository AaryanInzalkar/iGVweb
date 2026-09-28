import React from 'react';
import { SDGBadge } from '@/components/ui/SDGBadge';
import { Users, BookOpen, HandHeart, ArrowUpRight } from 'lucide-react';

const primarySDGs = [3, 4, 6, 13, 15];

const focusAreas = [
  {
    number: 4,
    color: '#C5192D',
    title: 'Quality Education',
    description:
      'Interactive English, STEM and digital literacy workshops for primary school students in underserved neighbourhoods.',
  },
  {
    number: 13,
    color: '#3F7E44',
    title: 'Climate Action',
    description:
      'Upper Lake conservation drives, waste reduction campaigns and large-scale community tree planting.',
  },
  {
    number: 3,
    color: '#4C9F38',
    title: 'Good Health & Well-Being',
    description:
      'Preventive health education, nutrition campaigns and sanitation drives run with local health advocates.',
  },
];

const stats = [
  { value: '1,500+', label: 'Community beneficiaries reached', icon: Users },
  { value: '20+', label: 'Schools & partner NGOs', icon: BookOpen },
  { value: '9', label: 'Countries represented locally', icon: HandHeart },
];

export const SDGImpactSection: React.FC = () => {
  return (
    <section id="impact" className="py-20 md:py-28 bg-[#0B0C10] text-[#F9F8F6] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-[#037EF3]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Masthead */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pb-10 border-b border-[#F9F8F6]/15">
          <div className="lg:col-span-3">
            <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#F9F8F6]/50">
              <span className="w-8 h-px bg-white/30" />
              <span>UN Global Goals</span>
            </div>
          </div>

          <div className="lg:col-span-9">
            <h2 className="text-[13vw] sm:text-[9vw] lg:text-[6.5vw] font-black uppercase tracking-tighter leading-[0.88]">
              Real impact,
              <br />
              <span className="font-serif font-normal italic tracking-normal text-[#F9F8F6]/30">
                measured against the goals
              </span>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 pt-12">
          {/* Left: Narrative + Stats */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="space-y-8">
              <p className="text-base sm:text-lg text-[#F9F8F6]/60 leading-relaxed">
                Every Incoming Global Volunteer project in Bhopal is mapped directly to the United
                Nations Sustainable Development Goals. Volunteers work alongside local NGOs, schools
                and community leaders to achieve progress that can be counted.
              </p>

              <div className="flex flex-wrap gap-2">
                {primarySDGs.map((sdgNum) => (
                  <SDGBadge key={sdgNum} sdgNumber={sdgNum} size="lg" sharp />
                ))}
              </div>
            </div>

            {/* Stat Ledger */}
            <div className="mt-12 border-t border-[#F9F8F6]/15">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="flex items-baseline justify-between gap-4 py-5 border-b border-[#F9F8F6]/15 group"
                  >
                    <div className="flex items-center gap-2 text-[#F9F8F6]/40 group-hover:text-[#F9F8F6] transition-colors">
                      <Icon className="w-4 h-4" />
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
                        {stat.label}
                      </span>
                    </div>
                    <span className="text-3xl sm:text-4xl font-black tracking-tighter text-[#F9F8F6]">
                      {stat.value}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Focus area ledger */}
          <div className="lg:col-span-7 lg:border-l lg:border-[#F9F8F6]/15 lg:pl-12">
            <div className="flex items-center justify-between pb-6">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FFC857]">
                Focus areas in Bhopal
              </h3>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#F9F8F6]/30">
                03 / 05
              </span>
            </div>

            <div className="border-t border-[#F9F8F6]/15">
              {focusAreas.map((area) => (
                <div
                  key={area.number}
                  className="group grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-6 items-start py-8 border-b border-[#F9F8F6]/15"
                >
                  <div className="sm:col-span-3 flex items-center gap-4">
                    <div
                      className="w-12 h-12 shrink-0 flex items-center justify-center text-[#F9F8F6] font-black text-lg"
                      style={{ backgroundColor: area.color }}
                    >
                      {area.number}
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#F9F8F6]/30 sm:hidden">
                      SDG {area.number}
                    </span>
                  </div>

                  <div className="sm:col-span-8">
                    <h4 className="text-xl sm:text-2xl font-black uppercase tracking-tight mb-2">
                      {area.title}
                    </h4>
                    <p className="text-sm text-[#F9F8F6]/55 leading-relaxed">{area.description}</p>
                  </div>

                  <div className="sm:col-span-1 flex sm:justify-end">
                    <ArrowUpRight className="w-5 h-5 text-[#F9F8F6]/20 group-hover:text-[#F9F8F6] transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </div>
                </div>
              ))}
            </div>

            <p className="pt-8 text-[11px] text-[#F9F8F6]/35 leading-relaxed max-w-md">
              Projects are co-designed with host organisations so that volunteer hours translate
              into outputs the community can keep.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
