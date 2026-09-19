import { useTranslations } from "next-intl";
import { Section } from "@/components/layout/section";
import { ReviewCarousel } from "./review-carousel";
import { reviews } from "@/content/reviews";
import { anchors } from "@/lib/anchors";

export function ReviewsSection() {
  const t = useTranslations("reviews");
  const items = reviews.map((r) => ({
    id: r.id,
    placeholder: r.placeholder,
    quote: t(`items.${r.key}.quote`),
    author: t(`items.${r.key}.author`),
    context: t(`items.${r.key}.context`),
  }));

  return (
    <Section id={anchors.reviews} title={t("title")} lead={t("subtitle")}>
      <ReviewCarousel items={items} placeholderBadge={t("placeholderBadge")} prevLabel={t("prev")} nextLabel={t("next")} />
    </Section>
  );
}
