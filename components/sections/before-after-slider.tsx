"use client";

import { useCallback, useId, useRef, useState } from "react";
import Image from "next/image";
import { GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  before: string | null;
  after: string | null;
  caption: string;
  labels: { before: string; after: string; slider: string };
  altBefore: string;
  altAfter: string;
  className?: string;
};

/**
 * Pointer-driven comparison with a real <input type="range"> underneath for keyboard and screen readers.
 * Vertical page scrolling keeps working (touch-action: pan-y).
 */
export function BeforeAfterSlider({ before, after, caption, labels, altBefore, altAfter, className }: Props) {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const id = useId();

  const setFromClientX = useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    setFromClientX(e.clientX);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (dragging.current) setFromClientX(e.clientX);
  };
  const onPointerUp = () => {
    dragging.current = false;
  };

  const panel = (src: string | null, alt: string, tone: "before" | "after") =>
    src ? (
      <Image src={src} alt={alt} fill sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover" draggable={false} />
    ) : (
      <div
        role="img"
        aria-label={alt}
        className={cn("absolute inset-0 flex items-end p-5 text-[13px] text-slate", tone === "before" ? "justify-start bg-[#cfd8d4]" : "justify-end bg-mint-deep")}
      >
        <span className="max-w-[26ch]">{caption}</span>
      </div>
    );

  return (
    <div
      ref={ref}
      className={cn("relative aspect-[4/3] w-full select-none overflow-hidden rounded-lg border border-line md:aspect-[16/9]", className)}
      style={{ touchAction: "pan-y" }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      {/* after (full) */}
      <div className="absolute inset-0">{panel(after, altAfter, "after")}</div>
      {/* before (clipped) */}
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        {panel(before, altBefore, "before")}
      </div>

      <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-forest/75 px-2.5 py-1 text-[13px] font-medium text-white">{labels.before}</span>
      <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-forest/75 px-2.5 py-1 text-[13px] font-medium text-white">{labels.after}</span>

      {/* divider + handle */}
      <div aria-hidden className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white shadow-[0_0_0_1px_rgba(11,59,52,.15)]" style={{ left: `${pos}%` }}>
        <span className="absolute left-1/2 top-1/2 grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-forest shadow-lift">
          <GripVertical className="size-5" />
        </span>
      </div>

      <label htmlFor={id} className="sr-only">
        {labels.slider}
      </label>
      <input
        id={id}
        type="range"
        min={0}
        max={100}
        step={1}
        value={Math.round(pos)}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-valuetext={`${Math.round(pos)}%`}
        className="absolute inset-x-0 bottom-0 h-11 w-full cursor-ew-resize opacity-0 focus-visible:opacity-100 focus-visible:accent-teal"
      />
    </div>
  );
}
