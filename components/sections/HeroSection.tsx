'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { SITE_METADATA } from '@/lib/constants';
import { useParallax } from '@/lib/hooks/useParallax';

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
const STEP_PX = 300;
const WHEEL_SETTLE_MS = 90; // how long wheel events must go quiet before we treat the gesture as finished

// Positive modulo (handles negative positions from backward manual scroll)
function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

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
          <img
            src={card.image}
            alt={card.imageAlt}
            className="w-full h-full object-cover"
            draggable={false}
          />
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
  const [centerPos, setCenterPos] = useState(0);
  // livePx: raw pixel offset applied on top of centerPos while a drag/swipe is in progress.
  // Negative = moving toward "next" (content sliding left), positive = toward "previous".
  const [livePx, setLivePx] = useState(0);
  const [isInteracting, setIsInteracting] = useState(false);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const dragState = useRef<{ startX: number; pointerId: number; lastX: number } | null>(null);
  const wheelSettleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wheelActive = useRef(false);
  const parallaxRef = useParallax<HTMLDivElement>(0.5);

  const handleApplyClick = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'hero_apply_click', { source: 'hero' });
    }
  };

  const startAutoplay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCenterPos((c) => c + 1);
    }, AUTOPLAY_INTERVAL_MS);
  }, []);

  const pauseAutoplay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    startAutoplay();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [startAutoplay]);

  // Commits the current live offset: snaps to the nearest whole card and resumes autoplay.
  const settle = useCallback((finalOffset: number) => {
    const shift = -Math.round(finalOffset / STEP_PX);
    if (shift !== 0) {
      setCenterPos((c) => c + shift);
    }
    setLivePx(0);
    setIsInteracting(false);
    startAutoplay();
  }, [startAutoplay]);

  // --- Mouse / touch drag (live tracking via pointermove) ---
  const handlePointerDown = (e: React.PointerEvent) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    dragState.current = { startX: e.clientX, pointerId: e.pointerId, lastX: e.clientX };
    setIsInteracting(true);
    pauseAutoplay();
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragState.current || dragState.current.pointerId !== e.pointerId) return;
    dragState.current.lastX = e.clientX;
    setLivePx(e.clientX - dragState.current.startX);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!dragState.current || dragState.current.pointerId !== e.pointerId) return;
    const finalOffset = dragState.current.lastX - dragState.current.startX;
    dragState.current = null;

    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }

    settle(finalOffset);
  };

  const handlePointerCancel = (e: React.PointerEvent) => {
    dragState.current = null;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    settle(0);
  };

  // --- Keyboard (Left/Right arrows, once the carousel region has focus) ---
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setCenterPos((c) => c - 1);
      startAutoplay();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setCenterPos((c) => c + 1);
      startAutoplay();
    }
  };

  // --- Trackpad two-finger horizontal swipe (live tracking, settles after a short quiet gap) ---
  const handleWheel = (e: React.WheelEvent) => {
    // Ignore mostly-vertical scroll gestures — only react to horizontal intent
    if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;

    e.preventDefault();

    if (!wheelActive.current) {
      wheelActive.current = true;
      setIsInteracting(true);
      pauseAutoplay();
    }

    // Card should move the same direction as the two-finger swipe, live
    setLivePx((prev) => prev - e.deltaX);

    if (wheelSettleTimer.current) clearTimeout(wheelSettleTimer.current);
    wheelSettleTimer.current = setTimeout(() => {
      wheelActive.current = false;
      setLivePx((current) => {
        settle(current);
        return current;
      });
    }, WHEEL_SETTLE_MS);
  };

  const positions = [centerPos - 2, centerPos - 1, centerPos, centerPos + 1, centerPos + 2];

  return (
    <section className="relative min-h-screen bg-[#080808] text-white flex flex-col justify-between overflow-hidden">
      <div
        ref={parallaxRef}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none opacity-85 scale-125"
        style={{ backgroundImage: "url('/images/bhopal/hero-overlook-sunset.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/90 pointer-events-none" />
      <div className="absolute inset-0 bg-radial from-transparent via-black/30 to-black/80 pointer-events-none" />

      <div className="relative z-10 pt-28 sm:pt-36 md:pt-40 pb-8 sm:pb-10 px-6 max-w-6xl mx-auto text-center flex flex-col items-center">
        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[6.75rem] xl:text-[7.5rem] font-light tracking-tight text-white/90 leading-[1.03] select-none backdrop-blur-[2px]">
          WELCOME TO
          <br />
          <span className="font-black text-white">BHOPAL</span>
        </h1>
        <div className="mt-8 sm:mt-10 flex flex-col items-center gap-3">
          <a
            href={SITE_METADATA.defaultApplyUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleApplyClick}
          >
            <button className="bg-white hover:bg-neutral-200 text-black text-xs sm:text-sm font-bold uppercase tracking-[0.2em] px-10 py-4 rounded-none transition-all duration-200 shadow-2xl hover:scale-[1.02] active:scale-[0.98]">
              GET STARTED
            </button>
          </a>
        </div>
      </div>

      {/* Sliding showcase track — cards track the finger/trackpad live, then snap to the nearest slot */}
      <div className="relative z-10 w-full pb-10 sm:pb-14 md:pb-20 h-[440px] hidden md:block">
        <div
          role="region"
          aria-label="Featured projects carousel"
          tabIndex={0}
          className="relative w-full h-full max-w-[1400px] mx-auto overflow-hidden touch-pan-y focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded-2xl"
          style={{ cursor: isInteracting ? 'grabbing' : 'grab' }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerCancel}
          onKeyDown={handleKeyDown}
          onWheel={handleWheel}
        >
          {positions.map((p) => {
            const card = CARDS[mod(p, CARDS.length)];
            const slotDistance = p - centerPos;
            // effectiveDistance accounts for how far the drag has moved this card
            // from its resting slot, so size/fade interpolate smoothly while dragging
            const effectiveDistance = slotDistance + livePx / STEP_PX;
            const absD = Math.abs(effectiveDistance);

            const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

            let scale: number;
            let opacity: number;
            if (absD <= 1) {
              scale = lerp(1, 0.68, absD);
              opacity = lerp(1, 0.6, absD);
            } else {
              const t = Math.min(absD - 1, 1);
              scale = lerp(0.68, 0.55, t);
              opacity = lerp(0.6, 0, t);
            }

            const zIndex = Math.round(100 - absD * 10);

            return (
              <Link
                key={p}
                href={card.href}
                draggable={false}
                onDragStart={(e) => e.preventDefault()}
                onClick={(e) => {
                  // Prevent navigating on what was actually a drag/swipe, not a tap
                  if (isInteracting || Math.abs(livePx) > 5) e.preventDefault();
                }}
                className={`absolute top-0 left-1/2 w-[300px] sm:w-[360px] lg:w-[420px] h-[360px] sm:h-[400px] lg:h-[440px] flex flex-col justify-between overflow-hidden ${card.bg} ${card.textColor} p-6 sm:p-7 rounded-2xl border border-white/10 shadow-2xl select-none`}
                style={{
                  transform: `translateX(calc(-50% + ${slotDistance * STEP_PX + livePx}px)) scale(${scale})`,
                  opacity,
                  zIndex,
                  transition: isInteracting
                    ? 'none'
                    : 'transform 500ms ease-out, opacity 500ms ease-out',
                  pointerEvents: absD <= 1.1 ? 'auto' : 'none',
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