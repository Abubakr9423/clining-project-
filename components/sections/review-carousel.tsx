"use client";

import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

export type ReviewCardData = { id: string; quote: string; author: string; context: string; placeholder: boolean };

export function ReviewCarousel({ items, placeholderBadge, prevLabel, nextLabel }: { items: ReviewCardData[]; placeholderBadge: string; prevLabel: string; nextLabel: string }) {
  return (
    <Carousel opts={{ align: "start", loop: false }} className="relative" dir="ltr">
      <CarouselContent className="-ml-4">
        {items.map((r) => (
          <CarouselItem key={r.id} className="pl-4 sm:basis-1/2 xl:basis-1/2">
            <figure dir="auto" className="flex h-full flex-col rounded-md border border-line bg-white p-6">
              {r.placeholder ? (
                <Badge variant="outline" className="mb-4 w-fit border-dashed border-line text-slate">
                  {placeholderBadge}
                </Badge>
              ) : null}
              <blockquote className="text-[15px] leading-relaxed text-ink">“{r.quote}”</blockquote>
              <figcaption className="mt-auto pt-5 text-sm">
                <span className="font-semibold text-forest">{r.author}</span>
                <span className="block text-slate">{r.context}</span>
              </figcaption>
            </figure>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="mt-5 flex items-center gap-2">
        <CarouselPrevious className="static translate-y-0 border-line bg-white text-forest hover:bg-mint" aria-label={prevLabel} />
        <CarouselNext className="static translate-y-0 border-line bg-white text-forest hover:bg-mint" aria-label={nextLabel} />
      </div>
    </Carousel>
  );
}
