"use client";

import { useState } from "react";
import { BeforeAfterSlider } from "./before-after-slider";
import { cn } from "@/lib/utils";

export type BeforeAfterPairView = {
  key: string;
  label: string;
  before: string | null;
  after: string | null;
  caption: string;
  altBefore: string;
  altAfter: string;
};

/** One slider plus chips to switch between pairs; the slider remounts so its handle resets to the middle. */
export function BeforeAfterGallery({ pairs, labels }: { pairs: BeforeAfterPairView[]; labels: { before: string; after: string; slider: string } }) {
  const [active, setActive] = useState(0);
  const pair = pairs[active] ?? pairs[0];
  if (!pair) return null;

  return (
    <div>
      {pairs.length > 1 ? (
        <div role="tablist" aria-label={labels.slider} className="mb-4 flex flex-wrap gap-2">
          {pairs.map((p, i) => (
            <button
              key={p.key}
              role="tab"
              type="button"
              aria-selected={i === active}
              onClick={() => setActive(i)}
              className={cn(
                "inline-flex h-10 items-center rounded-full border px-4 text-[15px] transition-colors",
                i === active ? "border-forest bg-forest text-white" : "border-line bg-white text-ink hover:bg-mint",
              )}
            >
              {p.label}
            </button>
          ))}
        </div>
      ) : null}
      <BeforeAfterSlider key={pair.key} before={pair.before} after={pair.after} caption={pair.caption} labels={labels} altBefore={pair.altBefore} altAfter={pair.altAfter} />
    </div>
  );
}
