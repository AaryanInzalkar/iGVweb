'use client';

import { useCallback, useEffect, useRef } from 'react';

import './ScrollExpand.css';

const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);

const smoothstep = (edge0, edge1, x) => {
  const t = clamp((x - edge0) / (edge1 - edge0 || 1e-6), 0, 1);
  return t * t * (3 - 2 * t);
};

// Soft landing overshoot (c1 = 1.4 keeps the bounce subtler than the classic 1.70158)
const easeOutBack = (x, c1 = 1.4) => {
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
};

/**
 * @param {Object} props
 * @param {string} [props.src] Image or video URL shown inside the frame.
 * @param {'image' | 'video'} [props.mediaType]
 * @param {string} [props.poster] Poster frame used while a video loads.
 * @param {string} [props.alt]
 * @param {string} [props.title] Headline over the resting frame; lifts away as it expands.
 * @param {string} [props.scrollHint] Cue under the resting frame; fades on scroll.
 * @param {number} [props.startWidth] Resting frame width, % of stage.
 * @param {number} [props.startHeight] Resting frame height, % of stage.
 * @param {number} [props.startRadius] Resting corner radius, px.
 * @param {number} [props.endRadius] Expanded corner radius, px.
 * @param {number} [props.mediaZoom] Media zoom at rest; eases back to 1.
 * @param {number} [props.scrollDistance] Expansion length, in stage heights.
 * @param {number} [props.holdDistance] Extra pinned scroll at full bleed.
 * @param {number} [props.smoothing] Follow time in seconds; 0 locks to scrollbar.
 * @param {number} [props.overlayScrim] Gradient scrim strength at full bleed.
 * @param {boolean} [props.useWindowScroll] Drive from page scroll instead of an inner scroller.
 * @param {boolean} [props.enabled]
 * @param {boolean} [props.autoPlay] Ignore scroll; animate the expansion once when scrolled into view.
 * @param {number} [props.autoPlayDuration] Auto-play length, seconds.
 * @param {number} [props.autoPlayDelay] Delay after entering view before playing, seconds.
 * @param {boolean} [props.autoPlayDrop] In autoPlay mode, drop the frame in from above before it expands.
 * @param {number} [props.autoPlayEndHold] Pause at full bleed before onAutoPlayComplete fires, seconds.
 * @param {() => void} [props.onAutoPlayComplete] Called once after an autoPlay run finishes.
 * @param {import('react').ReactNode} [props.children] Overlay content shown at full bleed.
 * @param {string} [props.className]
 * @param {import('react').CSSProperties} [props.style]
 */
const ScrollExpand = ({
  src = '',
  mediaType = 'image',
  poster = '',
  alt = '',
  title = '',
  scrollHint = '',
  startWidth = 42,
  startHeight = 58,
  startRadius = 24,
  endRadius = 0,
  mediaZoom = 1.35,
  scrollDistance = 1.2,
  holdDistance = 0.35,
  smoothing = 0.1,
  overlayScrim = 0.45,
  useWindowScroll = false,
  enabled = true,
  autoPlay = false,
  autoPlayDuration = 2.2,
  autoPlayDelay = 0.2,
  autoPlayDrop = true,
  autoPlayEndHold = 0.9,
  onAutoPlayComplete,
  children,
  className = '',
  style,
  ...rest
}) => {
  const rootRef = useRef(null);
  const trackRef = useRef(null);
  const stageRef = useRef(null);
  const frameRef = useRef(null);
  const mediaRef = useRef(null);
  const titleRef = useRef(null);
  const overlayRef = useRef(null);
  const scrimRef = useRef(null);
  const hintRef = useRef(null);

  const propsRef = useRef({});
  propsRef.current = {
    startWidth,
    startHeight,
    startRadius,
    endRadius,
    mediaZoom,
    scrollDistance,
    holdDistance,
    smoothing,
    overlayScrim,
    useWindowScroll,
    enabled,
    autoPlay,
    autoPlayDuration,
    autoPlayDelay,
    autoPlayDrop,
    autoPlayEndHold,
    onAutoPlayComplete
  };

  const applyProgress = useCallback(p => {
    const frame = frameRef.current;
    const media = mediaRef.current;
    if (!frame || !media) return;
    const c = propsRef.current;

    const e = smoothstep(0, 1, p);

    const w = c.startWidth + (100 - c.startWidth) * e;
    const h = c.startHeight + (100 - c.startHeight) * e;
    const ix = Math.max(0, (100 - w) / 2);
    const iy = Math.max(0, (100 - h) / 2);
    const r = c.startRadius + (c.endRadius - c.startRadius) * e;
    frame.style.clipPath = `inset(${iy}% ${ix}% ${iy}% ${ix}% round ${r}px)`;

    media.style.transform = `scale(${c.mediaZoom + (1 - c.mediaZoom) * e})`;

    if (scrimRef.current) scrimRef.current.style.opacity = `${c.overlayScrim * e}`;

    if (titleRef.current) {
      const out = smoothstep(0.4, 0.88, p);
      titleRef.current.style.opacity = `${1 - out}`;
      titleRef.current.style.transform = `translate3d(0, ${-28 * out}px, 0) scale(${1 + 0.06 * out})`;
    }

    if (hintRef.current) {
      const gone = smoothstep(0, 0.12, p);
      hintRef.current.style.opacity = `${1 - gone}`;
      hintRef.current.style.transform = `translate3d(0, ${8 * gone}px, 0)`;
    }

    if (overlayRef.current) {
      const inn = smoothstep(0.68, 1, p);
      overlayRef.current.style.opacity = `${inn}`;
      overlayRef.current.style.transform = `translate3d(0, ${18 * (1 - inn)}px, 0)`;
    }
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    const track = trackRef.current;
    const stage = stageRef.current;
    if (!root || !track || !stage) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let raf = 0;
    let current = 0;
    let target = 0;
    let stageH = 0;
    let running = false;

    const measure = () => {
      const c = propsRef.current;
      stageH = c.useWindowScroll || c.autoPlay ? window.innerHeight : root.clientHeight;
      if (stageH <= 0) return;
      stage.style.height = `${stageH}px`;
      // Auto-play mode has no scroll journey, so the track is exactly one stage tall.
      const extra = c.autoPlay ? 0 : Math.max(0, c.scrollDistance) + Math.max(0, c.holdDistance);
      track.style.height = `${stageH * (1 + extra)}px`;

      const w = root.clientWidth || stageH;
      stage.style.setProperty('--se-title-size', `${clamp(w * 0.075, 20, 84)}px`);
    };

    const readProgress = () => {
      const c = propsRef.current;
      if (!c.enabled) return 1;
      const span = stageH * Math.max(0.01, c.scrollDistance);
      if (c.useWindowScroll) {
        const top = track.getBoundingClientRect().top;
        return clamp(-top / span, 0, 1);
      }
      return clamp(root.scrollTop / span, 0, 1);
    };

    const tick = () => {
      const c = propsRef.current;
      const k = c.smoothing <= 0 ? 1 : 1 - Math.exp(-1 / (60 * c.smoothing));
      current += (target - current) * k;
      if (Math.abs(target - current) < 0.0004) {
        current = target;
        running = false;
      }
      applyProgress(current);
      raf = running ? requestAnimationFrame(tick) : 0;
    };

    const kick = () => {
      if (running) return;
      running = true;
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      target = readProgress();
      if (propsRef.current.smoothing <= 0 || reduceMotion) {
        current = target;
        applyProgress(current);
        return;
      }
      kick();
    };

    const onResize = () => {
      measure();
      target = readProgress();
      current = target;
      applyProgress(current);
    };

    // Auto-play mode: run the expansion once when the stage enters the
    // viewport, with no coupling to the scrollbar at all.
    if (propsRef.current.autoPlay) {
      measure();
      let io = null;
      let endTimeout = 0;

      const fireComplete = () => {
        if (typeof propsRef.current.onAutoPlayComplete !== 'function') return;
        // Give the full-bleed moment a beat to land before handing off
        endTimeout = window.setTimeout(
          () => propsRef.current.onAutoPlayComplete(),
          Math.max(propsRef.current.autoPlayEndHold, 0) * 1000
        );
      };

      if (!propsRef.current.enabled || reduceMotion) {
        // No animation for reduced motion / disabled — jump straight to full bleed.
        applyProgress(1);
        fireComplete();
      } else {
        applyProgress(0);

        // Drop-in: park the frame just above the stage (stage overflow clips it)
        // so play() can let it fall into place instead of flashing the resting state.
        const dropDistance = stageH * 0.85;
        if (propsRef.current.autoPlayDrop) {
          if (frameRef.current) {
            frameRef.current.style.transform = `translate3d(0, ${-dropDistance}px, 0)`;
          }
          if (titleRef.current) titleRef.current.style.opacity = '0';
        }

        let played = false;
        const play = () => {
          const c = propsRef.current;
          const duration = Math.max(c.autoPlayDuration, 0.01) * 1000;
          const delay = Math.max(c.autoPlayDelay, 0) * 1000;
          // Timeline split: the frame falls during the first 45%, the expansion
          // runs on its own clock starting at 35% so the two blend at landing.
          const dropEnd = c.autoPlayDrop ? 0.45 : 0;
          const expandStart = c.autoPlayDrop ? 0.35 : 0;
          let startTime = null;
          const step = now => {
            if (startTime === null) startTime = now;
            // applyProgress smoothsteps the geometry internally, so feed it linear time
            const p = clamp((now - startTime - delay) / duration, 0, 1);

            const e = clamp((p - expandStart) / (1 - expandStart || 1), 0, 1);
            applyProgress(e);

            if (dropEnd > 0 && p < dropEnd) {
              const u = p / dropEnd;
              const y = -dropDistance * (1 - easeOutBack(u));
              if (frameRef.current) {
                frameRef.current.style.transform = `translate3d(0, ${y}px, 0)`;
              }
              // Title fades in as the frame lands, then hands back to applyProgress
              if (titleRef.current) {
                const fadeIn = smoothstep(0.45, 1, u);
                const liftOut = smoothstep(0.4, 0.88, e);
                titleRef.current.style.opacity = `${fadeIn * (1 - liftOut)}`;
              }
            }

            if (p < 1) {
              raf = requestAnimationFrame(step);
            } else {
              fireComplete();
            }
          };
          raf = requestAnimationFrame(step);
        };
        io = new IntersectionObserver(
          ([entry]) => {
            if (!entry.isIntersecting || played) return;
            played = true;
            play();
            io.disconnect();
          },
          { threshold: 0.4 }
        );
        io.observe(root);
      }

      const onAutoResize = () => measure();
      window.addEventListener('resize', onAutoResize);

      return () => {
        if (raf) cancelAnimationFrame(raf);
        if (endTimeout) clearTimeout(endTimeout);
        if (io) io.disconnect();
        window.removeEventListener('resize', onAutoResize);
      };
    }

    measure();
    target = readProgress();
    current = target;
    applyProgress(current);

    const scroller = useWindowScroll ? window : root;
    scroller.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    const ro = new ResizeObserver(onResize);
    ro.observe(root);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      scroller.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      ro.disconnect();
    };
  }, [applyProgress, useWindowScroll, autoPlay]);

  const media =
    mediaType === 'video' ? (
      <video
        ref={mediaRef}
        className="scroll-expand__media"
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
      />
    ) : (
      <img ref={mediaRef} className="scroll-expand__media" src={src} alt={alt} draggable={false} />
    );

  return (
    <div
      ref={rootRef}
      className={`scroll-expand ${useWindowScroll || autoPlay ? '' : 'scroll-expand--scroller'} ${className}`.trim()}
      style={style}
      {...rest}
    >
      <div ref={trackRef} className="scroll-expand__track">
        <div ref={stageRef} className="scroll-expand__stage">
          <div ref={frameRef} className="scroll-expand__frame">
            {media}
            <div ref={scrimRef} className="scroll-expand__scrim" />
            {children ? (
              <div ref={overlayRef} className="scroll-expand__overlay">
                {children}
              </div>
            ) : null}
          </div>
          {title ? (
            <div ref={titleRef} className="scroll-expand__title">
              {title}
            </div>
          ) : null}
          {scrollHint ? (
            <div ref={hintRef} className="scroll-expand__hint">
              {scrollHint}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ScrollExpand;
