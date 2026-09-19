"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

/** Ticks a real number up once when visible. Renders the final value immediately under reduced motion. */
export function CountUp({ value, suffix = "", duration = 1.2 }: { value: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  const reduced = useReducedMotion();
  const [animated, setAnimated] = useState(0);

  useEffect(() => {
    if (!inView || reduced) return;
    const controls = animate(0, value, { duration, ease: "easeOut", onUpdate: (v) => setAnimated(Math.round(v)) });
    return () => controls.stop();
  }, [inView, reduced, value, duration]);

  const shown = reduced ? value : animated;
  return (
    <span ref={ref}>
      {shown}
      {suffix}
    </span>
  );
}
