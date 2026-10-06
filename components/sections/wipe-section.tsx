import { useTranslations } from "next-intl";
import { Section } from "@/components/layout/section";
import { WipeToClean } from "@/components/motion/wipe-to-clean";
import { images } from "@/content/images";
import { anchors } from "@/lib/anchors";

/** Interactive "wipe the glass" demo on the AI same-room pair. */
export function WipeSection() {
  const t = useTranslations("wipe");
  const pair = images.wipe;
  if (!pair.before || !pair.after) return null;

  return (
    <Section id={anchors.wipe} title={t("title")} lead={t("subtitle")} tone="forest" aside={<p className="text-[13px] text-white/55">{t("note")}</p>}>
      <WipeToClean
        dirty={pair.before}
        clean={pair.after}
        labels={{
          hint: t("hint"),
          progress: t.raw("progress") as string,
          done: t("done"),
          reset: t("reset"),
          cleanAll: t("cleanAll"),
          cta: t("cta"),
          ctaHref: `#${anchors.calculator}`,
          alt: t("alt"),
        }}
      />
    </Section>
  );
}
