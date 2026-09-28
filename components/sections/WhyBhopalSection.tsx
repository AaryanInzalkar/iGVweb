import React from 'react';
import { MapPin, Waves, GraduationCap, Utensils, HeartHandshake, ArrowUpRight, MoveVertical } from 'lucide-react';
import InfiniteSpiral, { type InfiniteSpiralItem } from '@/components/ui/InfiniteSpiral';

const spiralGallery: InfiniteSpiralItem[] = [
  {
    id: 'lakes',
    src: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?q=80&w=800',
    alt: 'Upper Lake Bhopal scenic view',
  },
  {
    id: 'classroom',
    src: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=800',
    alt: 'Volunteers leading classroom activities in Bhopal',
  },
  {
    id: 'green',
    src: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800',
    alt: 'Environmental conservation drive in Bhopal',
  },
  {
    id: 'health',
    src: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=800',
    alt: 'Healthcare and sanitation awareness session',
  },
  {
    id: 'alumnus-1',
    src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400',
    alt: 'A Global Volunteer alumna from the Bhopal programme',
  },
  {
    id: 'alumnus-2',
    src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400',
    alt: 'A Global Volunteer alumnus from the Bhopal programme',
  },
];

const highlights = [
  {
    icon: Waves,
    title: 'City of Lakes',
    body: "Home to Upper and Lower Lake, one of Asia's oldest man-made lake systems, minutes from campus.",
  },
  {
    icon: GraduationCap,
    title: 'Youth & Culture',
    body: 'A dense student city of national institutes, hostels and a permanent international community.',
  },
  {
    icon: Utensils,
    title: 'Heritage & Food',
    body: 'Old bazaars, Qutub-era monuments and the street food that built India\u2019s capital of taste.',
  },
  {
    icon: HeartHandshake,
    title: 'Local Support',
    body: 'A dedicated local committee and an exchange buddy on the ground for every single volunteer.',
  },
];

export const WhyBhopalSection: React.FC = () => {
  return (
    <section id="why-bhopal" className="py-20 md:py-28 bg-[#F5F2EB] text-[#0B0C10]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Masthead */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 lg:pb-16 border-b border-[#0B0C10]/15">
          <div className="lg:col-span-3">
            <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#0B0C10]/50">
              <span className="w-8 h-px bg-[#0B0C10]/30" />
              <span>Destination Spotlight</span>
            </div>
          </div>

          <div className="lg:col-span-9">
            <h2 className="text-[13vw] sm:text-[9vw] lg:text-[6.5vw] font-black uppercase tracking-tighter leading-[0.88] text-[#0B0C10]">
              Why volunteer
              <br />
              <span className="font-serif font-normal italic tracking-normal text-[#0B0C10]/35">
                in Bhopal
              </span>
            </h2>
          </div>
        </div>

        {/* Image Spread + Copy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 pt-12 lg:pt-16">
          {/* Left: orbiting gallery of the city, the work and the people */}
          <div className="lg:col-span-7 relative">
            <div className="group relative overflow-hidden bg-[#0B0C10] border border-[#0B0C10]/10">
              <div className="relative h-[380px] sm:h-[520px]">
                <InfiniteSpiral
                  items={spiralGallery}
                  animationMode="all"
                  speed={0.5}
                  radius={190}
                  cardWidth={200}
                  cardHeight={200}
                  verticalSpacing={78}
                  perspective={1000}
                  cardsPerTurn={5}
                  cardRadius={6}
                  centerScale={1.15}
                  edgeFade={0.34}
                  edgeBlur={5}
                  pauseOnHover
                />
              </div>

              <div className="absolute top-0 left-0 bg-[#F9F8F6] text-[#0B0C10] text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-2.5">
                Bhopal, Madhya Pradesh
              </div>

              <div className="absolute top-0 right-0 hidden sm:flex bg-[#0B0C10]/70 text-[#F9F8F6] text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-2.5 items-center gap-2">
                <MoveVertical className="w-3 h-3" aria-hidden="true" />
                Drag to explore
              </div>

              <div className="absolute bottom-0 left-0 right-0 bg-[#0B0C10]/72 p-6 sm:p-8 text-[#F9F8F6]">
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#F9F8F6]/60 mb-2">
                  23.2599&deg; N &middot; 77.4126&deg; E
                </div>
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tighter leading-none">
                  The City of Lakes
                </h3>
              </div>
            </div>

            {/* Offset stat card breaking the grid */}
            <div className="hidden sm:flex absolute -bottom-10 -right-4 lg:-right-8 w-[260px] bg-[#0B0C10] text-[#F9F8F6] p-6 border border-[#F9F8F6]/10 shadow-2xl flex-col justify-between">
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#F9F8F6]/50">
                Student City
              </div>
              <div className="text-5xl font-black tracking-tighter leading-none my-4">400K+</div>
              <p className="text-[11px] leading-relaxed text-[#F9F8F6]/60">
                University students within the state, one of India&rsquo;s youngest populations.
              </p>
            </div>
          </div>

          {/* Right: Copy + Numbered index */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="space-y-6 sm:space-y-8">
              <p className="text-lg sm:text-xl lg:text-2xl leading-relaxed text-[#0B0C10]/70 font-normal">
                Bhopal is one of India&rsquo;s greenest and most fascinating cities — known for its
                lakes, historical architecture and warm hospitality, it offers incoming volunteers a
                safe, vibrant and genuinely immersive environment.
              </p>

              <div className="border-t border-[#0B0C10]/15">
                {highlights.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.title}
                      className="group flex items-start gap-4 sm:gap-6 py-5 border-b border-[#0B0C10]/15 transition-colors"
                    >
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#0B0C10]/30 pt-1.5 w-6 shrink-0">
                        {String(idx + 1).padStart(2, '0')}
                      </span>

                      <Icon className="w-5 h-5 shrink-0 text-[#0B0C10]/40 group-hover:text-[#037EF3] transition-colors mt-0.5" />

                      <div className="flex-1">
                        <h4 className="text-base sm:text-lg font-black uppercase tracking-tight text-[#0B0C10]">
                          {item.title}
                        </h4>
                        <p className="text-[13px] leading-relaxed text-[#0B0C10]/55 mt-1">{item.body}</p>
                      </div>

                      <ArrowUpRight className="w-4 h-4 text-[#0B0C10]/20 group-hover:text-[#037EF3] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all shrink-0 mt-1" />
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#0B0C10]/40 pt-8">
              <MapPin className="w-3.5 h-3.5" />
              <span>Safe &middot; Affordable &middot; English-speaking</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
