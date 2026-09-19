"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

/** The map iframe loads only after an explicit click, keeping third-party requests out of the initial load. */
export function MapEmbed({ src, showLabel, placeholder, title }: { src: string | null; showLabel: string; placeholder: string; title: string }) {
  const [open, setOpen] = useState(false);

  if (src && open) {
    return <iframe title={title} src={src} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="aspect-[4/3] w-full rounded-lg border border-line" />;
  }

  return (
    <div className="grid aspect-[4/3] w-full place-items-center rounded-lg border border-dashed border-line bg-mint-deep p-6 text-center">
      <div className="flex flex-col items-center gap-3 text-sm text-slate">
        <MapPin className="size-6 text-teal" aria-hidden />
        <span>{src ? title : placeholder}</span>
        {src ? (
          <Button type="button" variant="forest" size="xl" onClick={() => setOpen(true)}>
            {showLabel}
          </Button>
        ) : null}
      </div>
    </div>
  );
}
