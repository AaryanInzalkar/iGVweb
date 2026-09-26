import React from 'react';
import { MapPin, Waves, GraduationCap, Utensils, HeartHandshake } from 'lucide-react';

export const WhyBhopalSection: React.FC = () => {
  return (
    <section id="why-bhopal" className="py-20 md:py-28 bg-[#F7F5F0] text-[#071B2F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Authentic Photography */}
          <div className="lg:col-span-6 order-2 lg:order-1 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?q=80&w=800"
                alt="Upper Lake Bhopal scenic view with lush greenery"
                className="w-full h-[460px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#037EF3] rounded-full text-xs font-bold mb-2">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Bhopal, Madhya Pradesh</span>
                </div>
                <h3 className="text-xl font-bold">The City of Lakes</h3>
                <p className="text-xs text-slate-200">
                  Combining thousand-year royal heritage with a thriving modern student ecosystem.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Copy */}
          <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#037EF3]">
              <span>Destination Spotlight</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#071B2F] tracking-tight leading-tight">
              Why Volunteer in <span className="text-[#037EF3]">Bhopal?</span>
            </h2>

            <p className="text-base md:text-lg text-[#5B6573] leading-relaxed">
              Bhopal is one of India&apos;s greenest and most fascinating cities. Known for its iconic lakes, historical architecture, and warm hospitality, it offers international exchange participants a safe, vibrant, and immersive cultural environment.
            </p>

            {/* Grid of Key Bhopal Facts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-4 bg-white rounded-xl border border-[#E5E7EB] shadow-2xs flex items-start gap-3">
                <div className="p-2.5 bg-[#037EF3]/10 text-[#037EF3] rounded-lg shrink-0">
                  <Waves className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#071B2F]">City of Lakes</h4>
                  <p className="text-xs text-[#5B6573] mt-0.5">
                    Home to Upper Lake, one of Asia&apos;s oldest man-made lakes.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-white rounded-xl border border-[#E5E7EB] shadow-2xs flex items-start gap-3">
                <div className="p-2.5 bg-[#2E9E6F]/10 text-[#2E9E6F] rounded-lg shrink-0">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#071B2F]">Youth Hub</h4>
                  <p className="text-xs text-[#5B6573] mt-0.5">
                    Thriving university city with top national institutes & youth culture.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-white rounded-xl border border-[#E5E7EB] shadow-2xs flex items-start gap-3">
                <div className="p-2.5 bg-[#FF6B5E]/10 text-[#FF6B5E] rounded-lg shrink-0">
                  <Utensils className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#071B2F]">Rich Heritage & Food</h4>
                  <p className="text-xs text-[#5B6573] mt-0.5">
                    Renowned culinary traditions, historic palaces, and local markets.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-white rounded-xl border border-[#E5E7EB] shadow-2xs flex items-start gap-3">
                <div className="p-2.5 bg-[#FFC857]/20 text-[#071B2F] rounded-lg shrink-0">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#071B2F]">Local AIESEC Support</h4>
                  <p className="text-xs text-[#5B6573] mt-0.5">
                    Dedicated local committee buddies to assist your stay & integration.
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
