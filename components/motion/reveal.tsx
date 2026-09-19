"use client";

import * as m from "motion/react-m";
import { cn } from "@/lib/utils";

type Props = { children: React.ReactNode; className?: string; delay?: number; y?: number; as?: "div" | "li" };

/** Fade + rise once when entering the viewport. Final state is rendered immediately under reduced motion. */
export function Reveal({ children, className, delay = 0, y = 12, as = "div" }: Props) {
  const Comp = as === "li" ? m.li : m.div;
  return (
    <Comp
      className={cn(className)}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ delay }}
    >
      {children}
    </Comp>
  );
}
