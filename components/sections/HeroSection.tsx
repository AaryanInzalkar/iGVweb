import React from 'react';
import Image from 'next/image';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { SITE_METADATA } from '@/lib/constants';
import { ApplyLink } from '@/components/ui/ApplyLink';
import { HeroHeadline } from '@/components/sections/HeroHeadline';

const heroFacts = ['Ages 18–30', '6–8 weeks', 'UN SDG aligned', 'Local committee on the ground'];

export const HeroSection: React.FC = () => {
  return (
    <section className="relative isolate flex min-h-[100svh] flex-col justify-between overflow-hidden bg-[#0B0C10] text-[#F9F8F6]">
      {/* Photographic backdrop — the LCP element, so it ships preloaded and pre-optimised */}
      <Image
        src="/images/squarespace_hero_bg.jpg"
        alt=""
        fill
        preload
        sizes="100vw"
        className="-z-30 object-cover object-center"
      />

      {/* Flat ink veil with a whisper of brand blue behind it */}
      <div className="absolute inset-0 -z-20 bg-[#0B0C10]/70" aria-hidden="true" />
      <div className="absolute inset-0 -z-20 bg-[#0B0C10]/25" aria-hidden="true" />
      <div className="absolute inset-0 -z-20 bg-[#037EF3]/10" aria-hidden="true" />

      {/* Masthead & value proposition */}
      <div className="mx-auto flex w-full max-w-[1400px] flex-1 flex-col justify-center px-4 pb-6 pt-32 text-center sm:px-6 sm:pt-36 lg:px-8 lg:pt-40">
        <div>
          <p className="hero-reveal flex items-center justify-center gap-3 text-[10px] font-bold uppercase tracking-[0.25em] text-[#F9F8F6]/60">
            <span className="h-px w-8 bg-[#F9F8F6]/30" aria-hidden="true" />
            <span>Incoming Global Volunteer</span>
            <span className="h-px w-8 bg-[#F9F8F6]/30" aria-hidden="true" />
          </p>

          <h1 className="hero-reveal hero-reveal-delay-1 mt-6 text-[#F9F8F6]">
            <HeroHeadline />
            <span className="-mt-1 block font-serif text-[clamp(1.5rem,4.6vw,3.5rem)] font-normal italic leading-[1.1] tracking-normal text-[#F9F8F6]/60 sm:-mt-2">
              makes it real
            </span>
          </h1>

          <p className="hero-reveal hero-reveal-delay-2 mt-7 max-w-2xl text-pretty text-base leading-relaxed text-[#F9F8F6]/70 sm:text-lg">
            Six to eight weeks in India&rsquo;s City of Lakes, working alongside local schools and
            NGOs on projects mapped to the UN Sustainable Development Goals. Open to volunteers aged
            18 to 30, from any nationality.
          </p>

          <div className="hero-reveal hero-reveal-delay-3 mt-9 flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
            <ApplyLink
              href={SITE_METADATA.defaultApplyUrl}
              source="hero"
              eventName="hero_apply_click"
              className="group inline-flex min-h-[52px] w-full items-center justify-center gap-2 bg-[#F9F8F6] px-8 text-[11px] font-bold uppercase tracking-[0.2em] text-[#0B0C10] shadow-xl transition-colors duration-200 hover:bg-white active:scale-[0.98] sm:w-auto"
            >
              <span>Get started</span>
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </ApplyLink>

            <a
              href="#projects"
              className="group inline-flex min-h-[52px] w-full items-center justify-center gap-2 border border-[#F9F8F6]/25 px-8 text-[11px] font-bold uppercase tracking-[0.2em] text-[#F9F8F6]/80 transition-colors duration-200 hover:border-[#F9F8F6]/50 hover:bg-[#F9F8F6]/5 sm:w-auto"
            >
              <span>See open projects</span>
              <ArrowDown className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-y-0.5" />
            </a>
          </div>

          {/* Fact ledger */}
          <ul className="hero-reveal hero-reveal-delay-4 mt-12 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#F9F8F6]/50">
            {heroFacts.map((fact, index) => (
              <li key={fact} className="flex items-center gap-5">
                {index > 0 && (
                  <span className="text-[#F9F8F6]/25" aria-hidden="true">
                    /
                  </span>
                )}
                <span>{fact}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
