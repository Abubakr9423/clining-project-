"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { prefillQuote, type ObjectType } from "@/lib/quote-prefill";

type Props = {
  objectType: ObjectType;
  icon: React.ReactNode;
  title: string;
  scope: string;
  image: { src: string | null; caption: string };
  imageAlt: string;
  cta: string;
};

/** Photo tile with a forest scrim; the whole tile is a button that pre-fills the calculator. */
export function AudienceCard({ objectType, icon, title, scope, image, imageAlt, cta }: Props) {
  return (
    <button
      type="button"
      onClick={() => prefillQuote({ objectType })}
      className="group relative flex aspect-[3/4] w-full flex-col justify-end overflow-hidden rounded-md text-start text-white outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2"
    >
      {image.src ? (
        <Image src={image.src} alt={imageAlt} fill sizes="(min-width: 1024px) 20vw, (min-width: 640px) 45vw, 80vw" className="object-cover transition-transform duration-300 group-hover:scale-[1.03]" />
      ) : (
        <div role="img" aria-label={imageAlt} className="absolute inset-0 grid place-items-center border border-dashed border-line bg-mint-deep p-4 text-center text-[12px] text-slate">
          <span>{image.caption}</span>
        </div>
      )}
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-forest via-forest/70 to-transparent" />
      <div className="relative p-5">
        <span className="mb-3 block [&>svg]:size-6">{icon}</span>
        <h3 className="text-h3 font-semibold text-white">{title}</h3>
        <p className="mt-1 text-sm text-white/78">{scope}</p>
        <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-white">
          {cta}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
        </span>
      </div>
    </button>
  );
}

/** Sixth tile: catches every object type not pictured and pre-fills "other". */
export function OtherObjectCard({ title, scope, cta }: { title: string; scope: string; cta: string }) {
  return (
    <button
      type="button"
      onClick={() => prefillQuote({ objectType: "other" })}
      className="group flex aspect-[3/4] w-full flex-col justify-end rounded-md border border-dashed border-teal/50 bg-mint p-5 text-start outline-none transition-colors hover:bg-mint-deep focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2"
    >
      <h3 className="text-h3 font-semibold text-forest">{title}</h3>
      <p className="mt-1 text-sm text-slate">{scope}</p>
      <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-teal">
        {cta}
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
      </span>
    </button>
  );
}
