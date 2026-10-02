'use client';

import React, { useState } from 'react';
import { Testimonial } from '@/types/testimonial';
import { useParallax } from '@/lib/hooks/useParallax';
import InfiniteSpiral from '@/components/ui/InfiniteSpiral';
import ScrollExpand from '@/components/ui/ScrollExpand';
import { TestimonialModal } from './TestimonialModal';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ testimonials }) => {
  const parallaxRef = useParallax<HTMLDivElement>(0.5);
  // Index into `testimonials`; the spiral preserves item order, so the clicked
  // card index maps straight back to the testimonial it was built from.
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  // The spiral only renders an image per card, so each testimonial becomes
  // a photo + name/country caption. Volunteers without an uploaded photo get
  // a generated initials avatar instead, so every card still shows something.
  const spiralItems = testimonials.map((item) => ({
    id: item.id,
    src:
      item.image_url ||
      `https://ui-avatars.com/api/?name=${encodeURIComponent(item.volunteer_name)}&background=037EF3&color=fff&size=256&bold=true`,
    alt: item.image_alt_text || item.volunteer_name,
    caption: item.volunteer_name,
    subcaption: item.project_name ? `${item.country} • ${item.project_name}` : item.country,
  }));

  return (
    <section id="testimonials" className="text-[#0B0C10]">
      {/* Cinematic opener: the framed lake shot expands to full bleed
          automatically as soon as it scrolls into view (time-based, no
          scroll hijacking), then the page continues to the spiral below. */}
      <div className="bg-[#0B0C10]">
        <ScrollExpand
          src="/images/bhopal/upper-lake-sunset.jpg"
          alt="Sunset over Bhopal's Upper Lake"
          title="Past Experiences"
          autoPlay
          autoPlayDuration={1.5}
          mediaZoom={1.3}
          overlayScrim={0.55}
        >
          <div className="max-w-3xl space-y-5">
            <div className="text-xs font-bold uppercase tracking-widest text-white/70">
              Social Proof & Stories
            </div>
            <p className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              Hear it from the people who lived it.
            </p>
            <p className="text-base sm:text-lg text-white/75">
              Keep scrolling to meet the volunteers.
            </p>
          </div>
        </ScrollExpand>
      </div>

      {/* Spiral + context copy. Parallax layers live in this wrapper so the
          opener above stays a clean dark stage. */}
      <div className="relative py-24 md:py-36 overflow-hidden">
        <div
          ref={parallaxRef}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-125 opacity-45 pointer-events-none"
          style={{ backgroundImage: "url('/images/bhopal/lake-boats-dusk.jpg')" }}
        />
        <div className="absolute inset-0 bg-[#F9F8F6]/55 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Rotating volunteer spiral, framed inside a frosted square panel */}
            <div className="relative mx-auto w-full max-w-[540px] aspect-square rounded-3xl overflow-hidden border border-white/60 bg-white/30 backdrop-blur-sm shadow-[0_24px_70px_rgba(11,12,16,0.14)]">
              <InfiniteSpiral
                items={spiralItems}
                animationMode="all"
                speed={0.45}
                radius={200}
                cardWidth={150}
                cardHeight={190}
                verticalSpacing={70}
                perspective={1100}
                cardRadius={14}
                centerScale={1.25}
                edgeBlur={5}
                cardsPerTurn={Math.max(spiralItems.length, 6)}
                pauseOnHover
                onItemClick={(_item, index) => setActiveIndex(index)}
              />
            </div>

            {/* Context copy explaining what the spiral shows */}
            <div className="space-y-5 text-center lg:text-left max-w-xl mx-auto lg:mx-0">
              <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-[#0B0C10]">
                Meet the <span className="text-[#037EF3]">Volunteers</span>
              </h2>
              <p className="text-base sm:text-lg text-[#6B7280]">
                Hear directly from international youth who completed Global Volunteer exchanges in Bhopal.
              </p>
              <p className="text-sm sm:text-base text-[#6B7280]/90">
                Every card in the spiral is a real volunteer — their photo, home country, and the project
                they joined. Scroll or drag to spin through the stories, hover to pause on a face, and
                click a card to read their full story.
              </p>
            </div>
          </div>
        </div>
      </div>

      <TestimonialModal
        testimonial={activeIndex === null ? null : testimonials[activeIndex]}
        onClose={() => setActiveIndex(null)}
      />
    </section>
  );
};