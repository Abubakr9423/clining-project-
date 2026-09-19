import { cn } from "@/lib/utils";
import { Container } from "./container";
import { Reveal } from "@/components/motion/reveal";

type Tone = "canvas" | "white" | "forest" | "mint";

const tones: Record<Tone, string> = {
  canvas: "bg-canvas",
  white: "bg-white",
  forest: "bg-forest text-white [&_h2]:text-white [&_h3]:text-white",
  mint: "bg-mint",
};

type Props = React.ComponentProps<"section"> & {
  id: string;
  title: string;
  lead?: string;
  tone?: Tone;
  /** Extra content rendered under the lead inside the sticky heading column. */
  aside?: React.ReactNode;
};

/**
 * Editorial split: heading + lead in a sticky left column (4/12), content on the right (8/12).
 * Stacks below `lg`.
 */
export function Section({ id, title, lead, tone = "canvas", aside, className, children, ...props }: Props) {
  return (
    <section id={id} className={cn("scroll-mt-20 py-section", tones[tone], className)} {...props}>
      <Container className="lg:grid lg:grid-cols-12 lg:gap-x-10">
        <div className="lg:col-span-4 lg:self-start lg:sticky lg:top-28">
          <Reveal>
            <h2 className="text-h2 font-bold">{title}</h2>
            {lead ? (
              <p className={cn("mt-4 max-w-[46ch] text-lg leading-relaxed", tone === "forest" ? "text-white/72" : "text-slate")}>{lead}</p>
            ) : null}
            {aside ? <div className="mt-6">{aside}</div> : null}
          </Reveal>
        </div>
        <div className="mt-10 lg:col-span-8 lg:mt-0">{children}</div>
      </Container>
    </section>
  );
}
