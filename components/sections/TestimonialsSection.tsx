import React from 'react';
import { Testimonial } from '@/types/testimonial';
import { Quote } from 'lucide-react';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ testimonials }) => {
  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <section id="testimonials" className="py-20 md:py-28 bg-[#EDEBE5] text-[#0B0C10]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Masthead */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pb-10 border-b border-[#0B0C10]/15">
          <div className="lg:col-span-3">
            <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#0B0C10]/50">
              <span className="w-8 h-px bg-[#0B0C10]/30" />
              <span>Field Notes</span>
            </div>
          </div>

          <div className="lg:col-span-9 space-y-6">
            <h2 className="text-[13vw] sm:text-[9vw] lg:text-[6.5vw] font-black uppercase tracking-tighter leading-[0.88]">
              Stories from
              <br />
              <span className="font-serif font-normal italic tracking-normal text-[#0B0C10]/35">
                past volunteers
              </span>
            </h2>

            <p className="text-base sm:text-lg text-[#0B0C10]/55 max-w-2xl leading-relaxed">
              Hear directly from international youth who completed a Global Volunteer exchange in
              Bhopal.
            </p>
          </div>
        </div>

        {/* Quote Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3">
          {testimonials.map((item, idx) => (
            <figure
              key={item.id}
              className={`group relative flex flex-col justify-between py-10 md:py-12 md:px-8 lg:px-10 border-b border-[#0B0C10]/15 md:border-b-0 last:border-b-0 ${
                idx > 0 ? 'md:border-l md:border-[#0B0C10]/15' : ''
              } ${idx === 0 ? 'md:pl-0' : ''}`}
            >
              <div>
                <div className="flex items-center justify-between mb-8">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#0B0C10]/30 group-hover:text-[#0B0C10] transition-colors">
                    {String(idx + 1).padStart(2, '0')} / {String(testimonials.length).padStart(2, '0')}
                  </span>
                  <div className="flex items-center gap-1" aria-label="Rated 5 out of 5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i} className="w-1.5 h-1.5 bg-[#0B0C10]/70" />
                    ))}
                  </div>
                </div>

                <Quote className="w-7 h-7 text-[#0B0C10]/15 mb-5" />

                <blockquote className="font-serif text-xl sm:text-2xl leading-snug text-[#0B0C10]">
                  {item.quote}
                </blockquote>
              </div>

              <figcaption className="mt-10 pt-6 border-t border-[#0B0C10]/15 flex items-center gap-4">
                {item.image_url ? (
                  <img
                    src={item.image_url}
                    alt={item.image_alt_text || item.volunteer_name}
                    className="w-12 h-12 object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                ) : (
                  <div className="w-12 h-12 bg-[#0B0C10] text-[#F9F8F6] flex items-center justify-center font-black text-lg">
                    {item.volunteer_name.charAt(0)}
                  </div>
                )}

                <div className="min-w-0">
                  <h3 className="font-black text-sm uppercase tracking-tight text-[#0B0C10] truncate">
                    {item.volunteer_name}
                  </h3>
                  <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#0B0C10]/45 mt-1 truncate">
                    {item.country}
                    {item.project_name ? ` — ${item.project_name}` : ''}
                  </div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};
