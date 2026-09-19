import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/layout/section";
import { ProcessTimeline } from "./process-timeline";
import { anchors } from "@/lib/anchors";

const stepKeys = ["request", "visit", "schedule", "work"] as const;

export function ProcessSection() {
  const t = useTranslations("process");
  const steps = stepKeys.map((key, i) => ({
    key,
    number: String(i + 1).padStart(2, "0"),
    title: t(`steps.${key}.title`),
    desc: t(`steps.${key}.desc`),
  }));

  return (
    <Section
      id={anchors.process}
      title={t("title")}
      lead={t("subtitle")}
      tone="white"
      aside={
        <Button asChild size="xl">
          <a href={`#${anchors.calculator}`}>{t("cta")}</a>
        </Button>
      }
    >
      <ProcessTimeline steps={steps} />
    </Section>
  );
}
