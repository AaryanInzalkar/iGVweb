'use client';

import { useEffect, useRef } from 'react';

/**
 * Attaches a scroll-linked parallax transform to the returned ref.
 * speed: 0 = no movement, 0.5 = moves at half scroll speed (background drifts
 * slower than the page, creating the depth effect), 1 = moves with scroll normally.
 * Lower speed = more dramatic separation from the foreground content.
 */
export function useParallax<T extends HTMLElement>(speed: number = 0.5) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let ticking = false;

    const update = () => {
      const rect = el.parentElement?.getBoundingClientRect();
      if (!rect) {
        ticking = false;
        return;
      }
      // Offset grows as the section scrolls through the viewport.
      const offset = rect.top * (1 - speed);
      el.style.transform = `translate3d(0, ${offset}px, 0)`;
      ticking = false;
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