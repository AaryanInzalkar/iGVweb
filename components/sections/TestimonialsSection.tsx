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
    <section id="testimonials" className="py-24 md:py-36 bg-[#F9F8F6] text-[#0B0C10]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
          <div className="text-xs font-bold uppercase tracking-widest text-[#037EF3]">
            Social Proof & Stories
          </div>

          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-[#0B0C10]">
            Stories from <span className="text-[#037EF3]">Past Volunteers</span>
          </h2>

          <p className="text-base sm:text-lg text-[#6B7280]">
            Hear directly from international youth who completed Global Volunteer exchanges in Bhopal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-8 border border-[#E5E7EB] shadow-sm flex flex-col justify-between hover:shadow-xl transition-all duration-300 relative group hover:-translate-y-1"
            >
              <Quote className="w-12 h-12 text-[#037EF3]/15 absolute top-6 right-6 pointer-events-none group-hover:text-[#037EF3]/30 transition-colors" />

              <div className="space-y-4 relative z-10">
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <p className="text-sm md:text-base text-[#0B0C10]/90 italic leading-relaxed font-normal">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              <div className="flex items-center gap-4 pt-6 mt-8 border-t border-[#E5E7EB] relative z-10">
                {item.image_url ? (
                  <img
                    src={item.image_url}
                    alt={item.image_alt_text || item.volunteer_name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-[#037EF3]"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-[#037EF3] text-white flex items-center justify-center font-black text-lg">
                    {item.volunteer_name.charAt(0)}
                  </div>
                )}

                <div>
                  <h3 className="font-extrabold text-base text-[#0B0C10]">{item.volunteer_name}</h3>
                  <div className="flex items-center gap-1 text-xs text-[#6B7280] mt-0.5">
                    <MapPin className="w-3 h-3 text-[#037EF3]" />
                    <span>{item.country}</span>
                    {item.project_name && (
                      <span className="font-bold text-[#037EF3] ml-1">
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
