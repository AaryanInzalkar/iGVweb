'use client';

import React from 'react';
import { Testimonial } from '@/types/testimonial';
import { useParallax } from '@/lib/hooks/useParallax';
import InfiniteSpiral from '@/components/ui/InfiniteSpiral';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ testimonials }) => {
  const parallaxRef = useParallax<HTMLDivElement>(0.5);

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
    <section id="testimonials" className="relative py-24 md:py-36 text-[#0B0C10] overflow-hidden">
      <div
        ref={parallaxRef}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-125 opacity-45 pointer-events-none"
        style={{ backgroundImage: "url('/images/bhopal/lake-boats-dusk.jpg')" }}
      />
      <div className="absolute inset-0 bg-[#F9F8F6]/55 pointer-events-none" />

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl space-y-4 mb-10">
          <div className="text-xs font-bold uppercase tracking-widest text-[#037EF3]">
            Social Proof & Stories
          </div>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-[#0B0C10]">
            Past <span className="text-[#037EF3]">Experiences</span>
          </h2>
          <p className="text-base sm:text-lg text-[#6B7280]">
            Hear directly from international youth who completed Global Volunteer exchanges in Bhopal.
          </p>
        </div>

        <div style={{ height: '560px', position: 'relative', overflow: 'hidden' }}>
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
          />
        </div>
      </div>
    </section>
  );
};