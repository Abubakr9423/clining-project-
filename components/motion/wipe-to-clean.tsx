"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Hand, RotateCcw, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/** Internal canvas resolution; CSS scales it, so no resize bookkeeping is needed. */
const W = 1200;
const H = 675;
/** Low-res coverage mask (1 cell = 10×10 px) used to measure progress cheaply. */
const MW = W / 10;
const MH = H / 10;
const BRUSH = 78;
/** Past this share of wiped area the rest clears by itself. */
const DONE_AT = 0.7;

type Labels = { hint: string; progress: string; done: string; reset: string; cleanAll: string; cta: string; ctaHref: string; alt: string };

/**
 * "Wipe the glass": the dirty photo sits on a canvas over the clean one; the pointer erases it
 * with a soft brush. Same room, same framing (AI pair), so the reveal reads as cleaning, not a swap.
 */
export function WipeToClean({ dirty, clean, labels }: { dirty: string; clean: string; labels: Labels }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const maskRef = useRef<HTMLCanvasElement | null>(null);
  const last = useRef<{ x: number; y: number } | null>(null);
  const lastMeasure = useRef(0);
  const [ready, setReady] = useState(false);
  const [started, setStarted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [round, setRound] = useState(0);

  // Paint the dirty layer (and reset the mask) on mount and on every "make it dirty again".
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const mask = (maskRef.current ??= document.createElement("canvas"));
    mask.width = MW;
    mask.height = MH;

    let cancelled = false;
    const img = new window.Image();
    img.decoding = "async";
    img.src = dirty;
    img.onload = () => {
      if (cancelled) return;
      ctx.globalCompositeOperation = "source-over";
      const scale = Math.max(W / img.naturalWidth, H / img.naturalHeight);
      const w = img.naturalWidth * scale;
      const h = img.naturalHeight * scale;
      ctx.clearRect(0, 0, W, H);
      ctx.drawImage(img, (W - w) / 2, (H - h) / 2, w, h);
      // A faint grey film on top: reads as "grimy glass" even where the photo itself is tidy.
      ctx.fillStyle = "rgba(120, 112, 96, 0.18)";
      ctx.fillRect(0, 0, W, H);
      setReady(true);
    };
    return () => {
      cancelled = true;
    };
  }, [dirty, round]);

  const measure = useCallback(() => {
    const mctx = maskRef.current?.getContext("2d", { willReadFrequently: true });
    if (!mctx) return 0;
    const data = mctx.getImageData(0, 0, MW, MH).data;
    let wiped = 0;
    for (let i = 3; i < data.length; i += 4) if ((data[i] ?? 0) > 96) wiped++;
    return wiped / (MW * MH);
  }, []);

  const erase = useCallback(
    (x: number, y: number) => {
      const ctx = canvasRef.current?.getContext("2d");
      const mctx = maskRef.current?.getContext("2d");
      if (!ctx || !mctx) return;
      const from = last.current ?? { x, y };
      const dist = Math.hypot(x - from.x, y - from.y);
      const steps = Math.max(1, Math.ceil(dist / (BRUSH / 4)));
      ctx.globalCompositeOperation = "destination-out";
      mctx.fillStyle = "#000";
      for (let i = 1; i <= steps; i++) {
        const px = from.x + ((x - from.x) * i) / steps;
        const py = from.y + ((y - from.y) * i) / steps;
        const g = ctx.createRadialGradient(px, py, 0, px, py, BRUSH);
        g.addColorStop(0, "rgba(0,0,0,1)");
        g.addColorStop(0.6, "rgba(0,0,0,0.9)");
        g.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(px, py, BRUSH, 0, Math.PI * 2);
        ctx.fill();
        mctx.beginPath();
        mctx.arc(px / 10, py / 10, (BRUSH * 0.7) / 10, 0, Math.PI * 2);
        mctx.fill();
      }
      last.current = { x, y };

      const now = performance.now();
      if (now - lastMeasure.current > 120) {
        lastMeasure.current = now;
        const p = measure();
        setProgress(p);
        if (p >= DONE_AT) setDone(true);
      }
    },
    [measure],
  );

  const toCanvas = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    return { x: ((e.clientX - r.left) / r.width) * W, y: ((e.clientY - r.top) / r.height) * H };
  };

  const onDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (done || !ready) return;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      /* capture is a nicety (keeps the stroke when leaving the canvas); some pointers refuse it */
    }
    setStarted(true);
    last.current = null;
    const { x, y } = toCanvas(e);
    erase(x, y);
  };
  const onMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    // Mouse wipes on hover after the first press feel natural; touch/pen only while pressed.
    if (done || !started || (e.pointerType !== "mouse" && e.buttons === 0)) return;
    const { x, y } = toCanvas(e);
    erase(x, y);
  };
  const onLeave = () => {
    last.current = null;
    const p = measure();
    setProgress(p);
    if (p >= DONE_AT) setDone(true);
  };

  const reset = () => {
    setDone(false);
    setStarted(false);
    setProgress(0);
    setReady(false);
    last.current = null;
    setRound((r) => r + 1);
  };

  const percent = Math.round((done ? 1 : progress) * 100);

  return (
    <div>
      <div className="relative aspect-video overflow-hidden rounded-lg bg-forest/40 shadow-2xl ring-1 ring-white/10">
        <Image src={clean} alt={labels.alt} fill sizes="(min-width: 1024px) 60vw, 92vw" className="object-cover" />
        <canvas
          ref={canvasRef}
          width={W}
          height={H}
          aria-hidden
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerLeave={onLeave}
          onPointerUp={onLeave}
          className={cn(
            "absolute inset-0 size-full touch-none select-none transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
            done ? "pointer-events-none opacity-0" : "cursor-crosshair opacity-100",
            !ready && "opacity-0",
          )}
        />

        {/* Hint: static (no attention loop), disappears on the first stroke. */}
        <div
          className={cn(
            "pointer-events-none absolute inset-0 grid place-items-center transition-opacity duration-300",
            started || !ready ? "opacity-0" : "opacity-100",
          )}
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-white/92 px-4 py-2 text-sm font-semibold text-forest shadow-lg backdrop-blur">
            <Hand className="size-4" aria-hidden /> {labels.hint}
          </span>
        </div>

        {done ? <SparkleBurst key={round} /> : null}
      </div>

      <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0 flex-1" aria-live="polite">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-white">{done ? labels.done : labels.progress.replace("{percent}", String(percent))}</span>
            <span className="tabular-nums text-white/70">{percent}%</span>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/15">
            <div
              className="h-full origin-left rounded-full bg-[#33C4D6] transition-transform duration-200 ease-out rtl:origin-right"
              style={{ transform: `scaleX(${done ? 1 : progress})` }}
            />
          </div>
        </div>
        <div className="flex shrink-0 gap-2">
          {done ? (
            <>
              <Button type="button" size="xl" variant="quiet" onClick={reset} className="bg-white/10 text-white hover:bg-white/20">
                <RotateCcw /> {labels.reset}
              </Button>
              <Button asChild size="xl" className="bg-white text-forest hover:bg-white/90">
                <a href={labels.ctaHref}>{labels.cta}</a>
              </Button>
            </>
          ) : (
            <Button
              type="button"
              size="xl"
              variant="quiet"
              disabled={!ready}
              onClick={() => {
                setStarted(true);
                setDone(true);
              }}
              className="bg-white/10 text-white hover:bg-white/20"
            >
              <Sparkles /> {labels.cleanAll}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

/** One-shot sparkle burst when the glass is clean; skipped entirely under reduced motion. */
function SparkleBurst() {
  const sparkles = [
    { x: 18, y: 22, s: 26, d: 0 },
    { x: 72, y: 18, s: 34, d: 80 },
    { x: 84, y: 58, s: 22, d: 160 },
    { x: 40, y: 64, s: 30, d: 60 },
    { x: 58, y: 36, s: 18, d: 200 },
    { x: 26, y: 78, s: 20, d: 120 },
  ];
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 motion-reduce:hidden">
      {sparkles.map((p, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          width={p.s}
          height={p.s}
          className="absolute animate-[wipe-sparkle_900ms_cubic-bezier(0.22,1,0.36,1)_both]"
          style={{ left: `${p.x}%`, top: `${p.y}%`, animationDelay: `${p.d}ms` }}
        >
          <path d="M12 0l2.6 9.4L24 12l-9.4 2.6L12 24l-2.6-9.4L0 12l9.4-2.6Z" fill="#fff" />
        </svg>
      ))}
    </div>
  );
}
