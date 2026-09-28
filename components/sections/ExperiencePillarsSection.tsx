import React from 'react';
import { Globe2, Target, Zap } from 'lucide-react';

const pillars = [
  {
    icon: Globe2,
    title: 'Experience\nNew Cultures',
    kicker: 'Immerse',
    description:
      'Live inside Indian customs, regional cuisine and everyday rhythm — and build lifelong friendships with international co-volunteers and local host families.',
  },
  {
    icon: Target,
    title: 'Make an\nImpact',
    kicker: 'Contribute',
    description:
      'Work on measurable community projects mapped to the UN Sustainable Development Goals in education, climate action and public health.',
  },
  {
    icon: Zap,
    title: 'Challenge\nYourself',
    kicker: 'Grow',
    description:
      'Step out of your comfort zone, plan and deliver real work, and build the cross-cultural confidence that shapes how you lead for the rest of your life.',
  },
];

export const ExperiencePillarsSection: React.FC = () => {
  return (
    <section id="experience" className="py-20 md:py-28 bg-[#F9F8F6] text-[#0B0C10]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Masthead */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pb-10 border-b border-[#0B0C10]/15">
          <div className="lg:col-span-3">
            <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#0B0C10]/50">
              <span className="w-8 h-px bg-[#0B0C10]/30" />
              <span>The Global Volunteer Journey</span>
            </div>
          </div>

          <div className="lg:col-span-9 space-y-6">
            <h2 className="text-[13vw] sm:text-[9vw] lg:text-[6.5vw] font-black uppercase tracking-tighter leading-[0.88]">
              Three value
              <br />
              <span className="font-serif font-normal italic tracking-normal text-[#0B0C10]/35">
                pillars of the exchange
              </span>
            </h2>

            <p className="text-base sm:text-lg text-[#0B0C10]/55 max-w-2xl leading-relaxed">
              Global Volunteer is built to give young people a practical, cross-cultural experience
              that develops leadership while creating measurable social value.
            </p>
          </div>
        </div>

        {/* Hairline Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.kicker}
                className={`group relative py-10 md:py-12 md:px-8 lg:px-10 border-b border-[#0B0C10]/15 md:border-b-0 last:border-b-0 ${
                  idx > 0 ? 'md:border-l md:border-[#0B0C10]/15' : ''
                } ${idx === 0 ? 'md:pl-0' : ''}`}
              >
                <div className="flex items-center justify-between mb-8">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#0B0C10]/40 group-hover:text-[#037EF3] transition-colors">
                    {pillar.kicker}
                  </span>
                  <Icon className="w-5 h-5 text-[#0B0C10]/25 group-hover:text-[#037EF3] transition-colors" />
                </div>

                <div className="text-[6rem] sm:text-[7.5rem] font-black tracking-tighter leading-[0.8] text-[#0B0C10]/[0.06] mb-6 select-none">
                  {String(idx + 1).padStart(2, '0')}
                </div>

                <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tighter leading-[0.95] mb-5 whitespace-pre-line">
                  {pillar.title}
                </h3>

                <p className="text-sm sm:text-[15px] text-[#0B0C10]/55 leading-relaxed max-w-sm">
                  {pillar.description}
                </p>

                <div className="mt-8 h-px w-full bg-[#0B0C10]/10">
                  <div className="h-px w-0 bg-[#037EF3] group-hover:w-full transition-all duration-500 ease-out" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
