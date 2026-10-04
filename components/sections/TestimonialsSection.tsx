'use client';

import React, { useState } from 'react';
import { Testimonial } from '@/types/testimonial';
import InfiniteSpiral from '@/components/ui/InfiniteSpiral';
import ScrollExpand from '@/components/ui/ScrollExpand';
import { TestimonialModal } from './TestimonialModal';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ testimonials }) => {
  // Index into `testimonials`; the spiral preserves item order, so the clicked
  // card index maps straight back to the testimonial it was built from.
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  // Flipped when the opener animation finishes — the testimonials panel then
  // rises from the bottom of the SAME full-screen frame (no page scrolling).
  const [revealed, setRevealed] = useState(false);

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
    // One-screen stage: the opener plays, then the testimonials panel slides
    // up over it — the whole experience stays inside this single frame.
    <section id="testimonials" className="relative h-screen overflow-hidden bg-[#0B0C10] text-[#0B0C10]">
      {/* Opener: drops in and expands to fill this exact frame */}
      <div className="absolute inset-0">
        <ScrollExpand
          src="/images/bhopal/upper-lake-sunset.jpg"
          alt="Sunset over Bhopal's Upper Lake"
          title="Past Experiences"
          autoPlay
          autoPlayDuration={1.5}
          onAutoPlayComplete={() => setRevealed(true)}
          mediaZoom={1.3}
          overlayScrim={0.55}
        >
          {/* Opener copy — fades away as the testimonials panel rises */}
          <div
            className={`max-w-3xl space-y-5 transition-opacity duration-700 ${
              revealed ? 'opacity-0' : 'opacity-100'
            }`}
          >
            <div className="text-xs font-bold uppercase tracking-widest text-white/70">
              Social Proof & Stories
            </div>
            <p className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              Hear it from the people who lived it.
            </p>
            <p className="text-base sm:text-lg text-white/75">
              Taking you to their stories…
            </p>
          </div>
        </ScrollExpand>
      </div>

      {/* Testimonials panel: parked just below the frame until the opener
          completes, then rises over it. Fully transparent — the opener's
          expanded sunset stays visible as the background. overflow-y-auto is
          a safety net for very short viewports; reduced-motion users get it
          instantly. */}
      <div
        className={`absolute inset-0 z-20 overflow-y-auto transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
          revealed ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="relative flex min-h-full py-16 md:py-20">
          {/* Directional scrim: the sunset stays visible, but the copy side gets
              contrast — lightest over the cards, darkest under the text */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/40 to-black/60 pointer-events-none" />

          <div className="relative z-10 m-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
              {/* Rotating volunteer spiral — frameless, floats over the sunset */}
              <div className="relative mx-auto w-full max-w-[280px] sm:max-w-[380px] lg:max-w-[520px] aspect-square">
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
                <h2 className="text-5xl sm:text-6xl font-black tracking-tight text-white [text-shadow:0_2px_18px_rgba(0,0,0,0.45)]">
                  Meet the <span className="text-[#4DA3FF]">Volunteers</span>
                </h2>
                <p className="text-lg sm:text-xl text-white/90 [text-shadow:0_1px_10px_rgba(0,0,0,0.4)]">
                  Hear directly from international youth who completed Global Volunteer exchanges in Bhopal.
                </p>
                <p className="text-base sm:text-lg text-white/75 [text-shadow:0_1px_8px_rgba(0,0,0,0.35)]">
                  Every card in the spiral is a real volunteer — their photo, home country, and the project
                  they joined. Scroll or drag to spin through the stories, hover to pause on a face, and
                  click a card to read their full story.
                </p>
              </div>
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
