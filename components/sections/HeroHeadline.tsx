'use client';

import React, { useSyncExternalStore } from 'react';
import WarpText from '@/components/ui/WarpText';

const HEADLINE = 'AIESEC in Bhopal';

let webgl2Support: boolean | null = null;

const detectWebGL2 = (): boolean => {
  if (webgl2Support === null) {
    try {
      const probe = document.createElement('canvas');
      const gl = probe.getContext('webgl2');
      if (gl) gl.getExtension('WEBGL_lose_context')?.loseContext();
      webgl2Support = Boolean(gl);
    } catch {
      webgl2Support = false;
    }
  }
  return webgl2Support;
};

const noopSubscribe = () => () => {};

/* WebGL2 is a client-only capability, so the server snapshot stays on the static headline. */
const useWebGL2 = (): boolean => useSyncExternalStore(noopSubscribe, detectWebGL2, () => false);

export const HeroHeadline: React.FC = () => {
  const canWarp = useWebGL2();

  return (
    <span
      className="-mx-4 flex items-center sm:-mx-6 lg:-mx-8"
      style={{ height: 'clamp(96px, 15vw, 200px)' }}
    >
      <span className="sr-only">{HEADLINE}</span>
      {canWarp ? (
        <span aria-hidden="true" className="block w-full font-sans">
          <WarpText
            text={HEADLINE}
            color="#F9F8F6"
            fontSize="clamp(2.75rem, 13vw, 10.5rem)"
            fontWeight={900}
            fontFamily="inherit"
            letterSpacing="-0.05em"
            lineHeight={0.9}
            warpStrength={0.075}
            warpScale={1.7}
            speed={0.5}
            pointerInfluence={0.4}
            pointerStrength={0.36}
            refraction={0.018}
            ripple
            className="font-sans"
            style={{ height: 'clamp(96px, 15vw, 200px)', minHeight: 0 }}
          />
        </span>
      ) : (
        <span
          aria-hidden="true"
          className="block w-full text-center text-[clamp(2.75rem,10.5vw,9rem)] font-black uppercase leading-[0.9] tracking-tighter text-[#F9F8F6]"
        >
          {HEADLINE}
        </span>
      )}
    </span>
  );
};
