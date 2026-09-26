import React from 'react';
import { Testimonial } from '@/types/testimonial';
import { Quote, Star, MapPin } from 'lucide-react';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ testimonials }) => {
  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <section id="testimonials" className="py-20 md:py-28 bg-[#F7F5F0] text-[#071B2F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#037EF3]">
            <span>Social Proof & Experiences</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#071B2F]">
            Stories from <span className="text-[#037EF3]">Past Volunteers</span>
          </h2>

          <p className="text-base sm:text-lg text-[#5B6573]">
            Hear directly from international youth who completed Global Volunteer exchanges in Bhopal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-8 border border-[#E5E7EB] shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow relative"
            >
              <Quote className="w-10 h-10 text-[#037EF3]/20 absolute top-6 right-6 pointer-events-none" />

              <div className="space-y-4 relative z-10">
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <p className="text-sm md:text-base text-[#071B2F]/90 italic leading-relaxed">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              <div className="flex items-center gap-4 pt-6 mt-6 border-t border-[#E5E7EB] relative z-10">
                {item.image_url ? (
                  <img
                    src={item.image_url}
                    alt={item.image_alt_text || item.volunteer_name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-[#037EF3]"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-[#037EF3] text-white flex items-center justify-center font-bold text-lg">
                    {item.volunteer_name.charAt(0)}
                  </div>
                )}

                <div>
                  <h3 className="font-bold text-base text-[#071B2F]">{item.volunteer_name}</h3>
                  <div className="flex items-center gap-1 text-xs text-[#5B6573] mt-0.5">
                    <MapPin className="w-3 h-3 text-[#037EF3]" />
                    <span>{item.country}</span>
                    {item.project_name && (
                      <span className="font-semibold text-[#037EF3] ml-1">
                        • {item.project_name}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
