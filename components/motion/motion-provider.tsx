"use client";

import { LazyMotion, MotionConfig, domAnimation } from "motion/react";

/** Loads only the DOM animation feature set (~15 kB) and honours the user's reduced-motion setting. */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user" transition={{ duration: 0.4, ease: [0.2, 0.7, 0.2, 1] }}>
        {children}
      </MotionConfig>
    </LazyMotion>
  );
}
