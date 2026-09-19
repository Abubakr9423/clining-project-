import Image from "next/image";
import { cn } from "@/lib/utils";

type Props = {
  src: string | null;
  alt: string;
  /** Shown inside the panel while `src` is null, e.g. "[PHOTO: сотрудник у поломоечной машины]". */
  caption: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  /** Pass "lazy" for an image that is hidden at the current breakpoint so browsers skip the download. */
  loading?: "eager" | "lazy";
  quality?: number;
};

/**
 * Renders a real photo when `src` is set, otherwise a clearly-labelled placeholder panel.
 * Swapping in real photography means editing `content/images.ts` only.
 */
export function PlaceholderImage({ src, alt, caption, className, priority, sizes, loading, quality = 72 }: Props) {
  if (src) {
    return (
      <div className={cn("relative overflow-hidden rounded-lg", className)}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes ?? "(min-width: 1024px) 40vw, 92vw"}
          priority={priority}
          fetchPriority={priority ? "high" : undefined}
          loading={priority ? undefined : loading}
          quality={quality}
          className="object-cover"
        />
      </div>
    );
  }
  return (
    <div
      role="img"
      aria-label={alt}
      className={cn(
        "relative grid place-items-center overflow-hidden rounded-lg border border-dashed border-line bg-mint-deep p-6 text-center text-[13px] leading-snug text-slate",
        className,
      )}
    >
      <span className="max-w-[28ch]">{caption}</span>
    </div>
  );
}
