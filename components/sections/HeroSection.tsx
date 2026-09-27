'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { SITE_METADATA } from '@/lib/constants';

interface CardData {
  id: string;
  href: string;
  bg: string;
  textColor: string;
  eyebrowLeft: string;
  eyebrowRight: string;
  title: string[];
  titleFont: string;
  subtitle: string;
  blurb: string;
  image?: string;
  imageAlt?: string;
  ctaNumber: string;
}

const CARDS: CardData[] = [
  {
    id: 'green-bhopal',
    href: '/projects/green-bhopal-initiative',
    bg: 'bg-[#0F1117]',
    textColor: 'text-white',
    eyebrowLeft: 'WORK',
    eyebrowRight: 'SDG #13',
    title: ['GREEN', 'BHOPAL'],
    titleFont: 'font-black uppercase tracking-tighter',
    subtitle: 'Bhopal / Upper Lake',
    blurb: 'Urban lake conservation, biodiversity drives, and climate awareness in Central India.',
    ctaNumber: '01',
  },
  {
    id: 'global-classroom',
    href: '/projects/global-classroom-2026',
    bg: 'bg-[#F5F2EB]',
    textColor: 'text-black',
    eyebrowLeft: 'EXPLORE',
    eyebrowRight: 'SDG #4',
    title: ['CLASSROOM'],
    titleFont: 'font-serif font-normal uppercase tracking-wider',
    subtitle: 'SDG #4 · Quality Education',
    blurb: '6-Week Leadership Exchange',
    image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=800',
    imageAlt: 'Global volunteer teaching children in Bhopal',
    ctaNumber: '02',
  },
  {
    id: 'community-health',
    href: '/projects/health-hygiene-awareness',
    bg: 'bg-[#E8E8E8]',
    textColor: 'text-black',
    eyebrowLeft: 'COMMUNITY / CARE',
    eyebrowRight: 'SDG #3',
    title: ['COMMUNITY', 'HEALTH'],
    titleFont: 'font-extrabold uppercase tracking-tight',
    subtitle: 'SDG #3 · Good Health',
    blurb: 'Preventive healthcare, sanitation drives, and nutrition workshops across Bhopal communities.',
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=800',
    imageAlt: 'Health awareness and hygiene campaign in Bhopal',
    ctaNumber: '03',
  },
  {
    id: 'skill-up',
    href: '/projects/skill-up',
    bg: 'bg-[#037EF3]',
    textColor: 'text-white',
    eyebrowLeft: 'SKILLS',
    eyebrowRight: 'SDG #4',
    title: ['SKILL', 'UP'],
    titleFont: 'font-black uppercase tracking-tighter',
    subtitle: 'SDG #4 · Quality Education',
    blurb: 'Career-readiness workshops and practical skills training for youth across Bhopal.',
    ctaNumber: '04',
  },
];

const AUTOPLAY_INTERVAL_MS = 6000;
const STEP_PX = 300; // horizontal distance between adjacent slots
const REPEATS = 15; // ~15 x 4 = 60 slots, ~6 minutes of continuous forward motion
const TRACK = Array.from({ length: CARDS.length * REPEATS }, (_, i) => ({
  ...CARDS[i % CARDS.length],
  slotId: i,
}));

function CardInner({ card }: { card: CardData }) {
  return (
    <>
      <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.2em] mb-4 opacity-70">
        <span>{card.eyebrowLeft}</span>
        <span>{card.eyebrowRight}</span>
      </div>
      <div className="text-center">
        <h2 className={`text-3xl sm:text-4xl lg:text-5xl leading-none ${card.titleFont}`}>
          {card.title.map((line, i) => (
            <React.Fragment key={i}>
              {line}
              {i < card.title.length - 1 && <br />}
            </React.Fragment>
          ))}
        </h2>
        <p className="text-[10px] uppercase tracking-[0.25em] mt-2 font-sans font-semibold opacity-60">
          {card.subtitle}
        </p>
      </div>
      {card.image ? (
        <div className="relative rounded-xl overflow-hidden h-32 sm:h-36 bg-neutral-200">
          <img src={card.image} alt={card.imageAlt} className="w-full h-full object-cover" />
        </div>
      ) : (
        <p className="text-[11px] leading-relaxed opacity-70 text-center px-2 line-clamp-2">{card.blurb}</p>
      )}
      <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-semibold pt-2 border-t border-current/20">
        <span className="opacity-70">{card.image ? card.blurb : 'VIEW PROJECT'}</span>
        <span className="font-bold uppercase tracking-wider">{card.ctaNumber} →</span>
      </div>
    </>
  );
}

export const HeroSection: React.FC = () => {
  const [centerIndex, setCenterIndex] = useState(2);

  const handleApplyClick = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'hero_apply_click', { source: 'hero' });
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCenterIndex((c) => Math.min(c + 1, TRACK.length - 3));
    }, AUTOPLAY_INTERVAL_MS);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen bg-[#080808] text-white flex flex-col justify-between overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none opacity-85"
        style={{ backgroundImage: "url('/images/squarespace_hero_bg.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/90 pointer-events-none" />
      <div className="absolute inset-0 bg-radial from-transparent via-black/30 to-black/80 pointer-events-none" />

      <div className="relative z-10 pt-28 sm:pt-36 md:pt-40 pb-8 sm:pb-10 px-6 max-w-6xl mx-auto text-center flex flex-col items-center">
        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[6.75rem] xl:text-[7.5rem] font-medium tracking-tight text-white leading-[1.03] select-none">
          AIESEC in Bhopal
          <br />
          makes it real
        </h1>
        <div className="mt-8 sm:mt-10 flex flex-col items-center gap-3">
          <a href={SITE_METADATA.defaultApplyUrl} target="_blank" rel="noopener noreferrer" onClick={handleApplyClick}><button className="bg-white hover:bg-neutral-200 text-black text-xs sm:text-sm font-bold uppercase tracking-[0.2em] px-10 py-4 rounded-none transition-all duration-200 shadow-2xl hover:scale-[1.02] active:scale-[0.98]">GET STARTED</button></a>
        </div>
      </div>

      {/* Sliding showcase track: one continuous set of cards, position/scale/opacity all animate via CSS transform — no fade-mount tricks */}
      <div className="relative z-10 w-full pb-10 sm:pb-14 md:pb-20 h-[440px] hidden md:block overflow-hidden">
        <div className="relative w-full h-full max-w-[1400px] mx-auto">
          {TRACK.map((card, i) => {
            const distance = i - centerIndex;
            if (Math.abs(distance) > 2) return null;

            const isCenter = distance === 0;
            const scale = isCenter ? 1 : Math.abs(distance) === 1 ? 0.68 : 0.55;
            const opacity = isCenter ? 1 : Math.abs(distance) === 1 ? 0.6 : 0;
            const zIndex = isCenter ? 20 : Math.abs(distance) === 1 ? 10 : 0;

            return (
              <Link
                key={card.slotId}
                href={card.href}
                className={`absolute top-0 left-1/2 w-[300px] sm:w-[360px] lg:w-[420px] h-[360px] sm:h-[400px] lg:h-[440px] flex flex-col justify-between overflow-hidden ${card.bg} ${card.textColor} p-6 sm:p-7 rounded-2xl border border-white/10 shadow-2xl transition-[transform,opacity] duration-[700ms] ease-in-out`}
                style={{
                  transform: `translateX(calc(-50% + ${distance * STEP_PX}px)) scale(${scale})`,
                  opacity,
                  zIndex,
                  pointerEvents: isCenter ? 'auto' : Math.abs(distance) === 1 ? 'auto' : 'none',
                }}
              >
                <CardInner card={card} />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}; 