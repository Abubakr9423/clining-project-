import { useTranslations } from "next-intl";
import { Info } from "lucide-react";
import { Section } from "@/components/layout/section";
import { QuoteCalculator } from "./quote-calculator";
import { anchors } from "@/lib/anchors";

export function CalculatorSection() {
  const t = useTranslations("calculator");

  return (
    <Section
      id={anchors.calculator}
      title={t("title")}
      lead={t("subtitle")}
      tone="mint"
      aside={
        <p className="flex gap-3 rounded-md border border-line bg-white/70 p-4 text-sm leading-relaxed text-slate">
          <Info className="mt-0.5 size-4 shrink-0 text-teal" aria-hidden /> {t("noPrice")}
        </p>
      }
    >
      <QuoteCalculator />
    </Section>
  );
}
