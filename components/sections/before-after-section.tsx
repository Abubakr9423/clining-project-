import { useTranslations } from "next-intl";
import { Section } from "@/components/layout/section";
import { BeforeAfterGallery } from "./before-after-gallery";
import { images } from "@/content/images";
import { anchors } from "@/lib/anchors";

const pairKeys = ["lawn", "renovation"] as const;

export function BeforeAfterSection() {
  const t = useTranslations("beforeAfter");
  const pairs = pairKeys.map((key) => ({
    key,
    label: t(`pairs.${key}.label`),
    before: images.beforeAfter[key].before,
    after: images.beforeAfter[key].after,
    caption: images.beforeAfter[key].caption,
    altBefore: t(`pairs.${key}.altBefore`),
    altAfter: t(`pairs.${key}.altAfter`),
  }));

  return (
    <Section id={anchors.beforeAfter} title={t("title")} lead={t("subtitle")} tone="white">
      <BeforeAfterGallery pairs={pairs} labels={{ before: t("before"), after: t("after"), slider: t("sliderLabel") }} />
      <p className="mt-3 text-[13px] text-slate">{t("placeholderCaption")}</p>
    </Section>
  );
}
