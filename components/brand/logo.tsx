import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

/** Brand colours of the mark — kept literal so the same SVG works in next/og (no CSS variables there). */
export const logoColors = { tile: "#0E2440", ring: "#FFFFFF", ink: "#0E2440", sparkle: "#33C4D6" } as const;

/** The sparkle used as the dot over the "o" — a four-point star on a 40×40 grid. */
const sparkle40 = "M34 -2l2.2 6L42 6.2l-5.8 2.2L34 14.4l-2.2-6L26 6.2l5.8-2.2Z";

/**
 * App-icon version (favicon, OG): the sparkle-"o" alone on a forest tile, 64×64 grid.
 * Exported as raw paths so next/og can draw it without React components from here.
 */
export const logoMarkPaths = {
  ring: { cx: 29, cy: 36, r: 14 },
  ringStroke: 7.5,
  sparkle: "M46 9l2.4 6.6L55 18l-6.6 2.4L46 27l-2.4-6.6L37 18l6.6-2.4Z",
} as const;

/**
 * Wordmark: "Saf" + an "o" drawn as a ring with a sparkle, then the rest of the name as a caption.
 * The SVG is sized in `em`, so it scales with the wordmark's font size.
 */
export function Logo({ className, caption = true }: { className?: string; caption?: boolean }) {
  const [first, ...rest] = siteConfig.name.split(" ");
  const stem = (first ?? "").replace(/o$/i, "");
  return (
    <span className={cn("inline-flex min-w-0 flex-col leading-none text-forest", className)}>
      <span className="flex items-baseline font-heading text-[28px] font-extrabold tracking-[-0.03em]">
        {stem}
        <svg viewBox="0 0 40 40" aria-hidden className="ms-[0.03em] size-[0.72em] shrink-0 translate-y-[0.02em] overflow-visible">
          <circle cx="18" cy="22" r="13" fill="none" stroke="currentColor" strokeWidth="6.5" />
          <path d={sparkle40} fill={logoColors.sparkle} />
        </svg>
      </span>
      {caption && rest.length ? (
        <span className="mt-1 truncate text-[10px] font-semibold uppercase tracking-[0.32em] text-teal">{rest.join(" ")}</span>
      ) : null}
    </span>
  );
}
