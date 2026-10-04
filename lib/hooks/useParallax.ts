'use client';

import { useEffect, useRef } from 'react';

/**
 * Attaches a scroll-linked parallax transform to the returned ref.
 *
 * The translation is driven by the section's progress through the viewport
 * (-1 = entering at the bottom, 0 = centered, 1 = leaving at the top) and is
 * clamped to at most 11% of the section height. The hook also owns the
 * scale(1.25), whose 12.5% bleed always exceeds the maximum shift — so the
 * background can never uncover a seam at the section's edges, no matter
 * how tall the section is.
 *
 * speed: 0 = no movement, 0.5 = half scroll speed (default), 1 = moves with
 * the page (no parallax). Lower = more dramatic separation from foreground.
 */
export function useParallax<T extends HTMLElement>(speed: number = 0.5) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let ticking = false;

    const update = () => {
      ticking = false;
      const parent = el.parentElement;
      if (!parent) return;

      const rect = parent.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height + vh;
      if (total <= 0) return;

      // 0 when the section's top enters at the viewport bottom,
      // 1 when its bottom leaves at the viewport top.
      const progress = Math.min(Math.max((vh - rect.top) / total, 0), 1);
      const centered = progress * 2 - 1; // -1 .. 1

      // Drift against the scroll direction, clamped inside the scale bleed.
      const shift = -centered * (1 - speed) * rect.height * 0.2;
      const maxShift = rect.height * 0.11;
      const clamped = Math.min(Math.max(shift, -maxShift), maxShift);

      el.style.transform = `translate3d(0, ${clamped}px, 0) scale(1.25)`;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [speed]);

  return ref;
}
