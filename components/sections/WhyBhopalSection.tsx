import React from 'react';
import { MapPin, Waves, GraduationCap, Utensils, HeartHandshake } from 'lucide-react';

export const WhyBhopalSection: React.FC = () => {
  return (
    <section id="why-bhopal" className="pt-32 md:pt-44 pb-24 md:pb-36 bg-[#F9F8F6] text-[#0B0C10]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left Column: Squarespace Imagery */}
          <div className="lg:col-span-6 order-2 lg:order-1 relative">
            <div className="relative rounded-[32px] overflow-hidden shadow-2xl border border-[#E5E7EB] bg-white group">
              <img
                src="https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?q=80&w=800"
                alt="Upper Lake Bhopal scenic view"
                className="w-full h-[480px] object-cover group-hover:scale-102 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#037EF3] rounded-full text-xs font-bold mb-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Bhopal, Madhya Pradesh</span>
                </div>
                <h3 className="text-2xl font-black">The City of Lakes</h3>
                <p className="text-xs text-slate-200 font-normal">
                  Combining thousand-year royal heritage with a thriving modern student ecosystem.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Copy */}
          <div className="lg:col-span-6 order-1 lg:order-2 space-y-8">
            <div className="space-y-3">
              <div className="text-xs font-bold uppercase tracking-widest text-[#037EF3]">
                Destination Spotlight
              </div>

              <h2 className="text-4xl sm:text-5xl font-black text-[#0B0C10] tracking-tight leading-tight">
                Why Volunteer in <span className="text-[#037EF3]">Bhopal?</span>
              </h2>

              <p className="text-base sm:text-lg text-[#6B7280] leading-relaxed">
                Bhopal is one of India&apos;s greenest and most fascinating cities. Known for its iconic lakes, historical architecture, and warm hospitality, it offers international exchange participants a safe, vibrant, and immersive environment.
              </p>
            </div>

            {/* Squarespace-style Grid of Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-5 bg-white rounded-2xl border border-[#E5E7EB] hover:border-[#037EF3]/40 transition-all duration-300 shadow-xs hover:shadow-md flex items-start gap-4">
                <div className="p-3 bg-[#037EF3]/10 text-[#037EF3] rounded-xl shrink-0">
                  <Waves className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-base text-[#0B0C10]">City of Lakes</h4>
                  <p className="text-xs text-[#6B7280] mt-1 leading-relaxed">
                    Home to Upper Lake, one of Asia&apos;s oldest man-made lakes.
                  </p>
                </div>
              </div>

              <div className="p-5 bg-white rounded-2xl border border-[#E5E7EB] hover:border-[#2E9E6F]/40 transition-all duration-300 shadow-xs hover:shadow-md flex items-start gap-4">
                <div className="p-3 bg-[#2E9E6F]/10 text-[#2E9E6F] rounded-xl shrink-0">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-base text-[#0B0C10]">Youth & Culture</h4>
                  <p className="text-xs text-[#6B7280] mt-1 leading-relaxed">
                    Thriving university city with top national institutes.
                  </p>
                </div>
              </div>

              <div className="p-5 bg-white rounded-2xl border border-[#E5E7EB] hover:border-[#FF6B5E]/40 transition-all duration-300 shadow-xs hover:shadow-md flex items-start gap-4">
                <div className="p-3 bg-[#FF6B5E]/10 text-[#FF6B5E] rounded-xl shrink-0">
                  <Utensils className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-base text-[#0B0C10]">Heritage & Food</h4>
                  <p className="text-xs text-[#6B7280] mt-1 leading-relaxed">
                    Renowned culinary traditions, historic palaces, and bazaars.
                  </p>
                </div>
              </div>

              <div className="p-5 bg-white rounded-2xl border border-[#E5E7EB] hover:border-[#FFC857]/40 transition-all duration-300 shadow-xs hover:shadow-md flex items-start gap-4">
                <div className="p-3 bg-[#FFC857]/20 text-[#0B0C10] rounded-xl shrink-0">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-base text-[#0B0C10]">Local Support</h4>
                  <p className="text-xs text-[#6B7280] mt-1 leading-relaxed">
                    Dedicated local committee buddies to assist your stay.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
