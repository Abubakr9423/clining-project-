"use client";

import * as m from "motion/react-m";

type Step = { key: string; number: string; title: string; desc: string };

/**
 * Horizontal on desktop with a line that draws once behind the numerals;
 * vertical rail on mobile. Reduced motion renders the final state.
 */
export function ProcessTimeline({ steps }: { steps: Step[] }) {
  return (
    <ol className="relative grid gap-8 md:grid-cols-4 md:gap-6">
      <m.span
        aria-hidden
        className="absolute start-[15px] top-2 hidden h-[calc(100%-1rem)] w-px origin-top bg-line md:start-0 md:top-[15px] md:block md:h-px md:w-full md:origin-left rtl:md:origin-right"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "0px 0px -20% 0px" }}
        transition={{ duration: 0.7 }}
      />
      <span aria-hidden className="absolute start-[15px] top-2 h-[calc(100%-1rem)] w-px bg-line md:hidden" />
      {steps.map((step, i) => (
        <m.li
          key={step.key}
          className="relative flex gap-4 md:block"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -15% 0px" }}
          transition={{ delay: 0.12 * i }}
        >
          <span className="relative z-10 grid size-8 shrink-0 place-items-center rounded-full border border-teal bg-white font-heading text-[13px] font-bold text-teal">
            {step.number}
          </span>
          <div className="md:mt-5 md:pe-4">
            <h3 className="text-h3 font-semibold">{step.title}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-slate">{step.desc}</p>
          </div>
        </m.li>
      ))}
    </ol>
  );
}
