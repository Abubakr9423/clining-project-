import { useTranslations } from "next-intl";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Section } from "@/components/layout/section";
import { anchors } from "@/lib/anchors";

export const faqKeys = ["price", "calculation", "regular", "business", "renovation", "territory"] as const;

export function FaqSection() {
  const t = useTranslations("faq");

  return (
    <Section id={anchors.faq} title={t("title")} lead={t("subtitle")} tone="white">
      <Accordion type="single" collapsible className="rounded-md border border-line bg-white px-5">
        {faqKeys.map((key) => (
          <AccordionItem key={key} value={key} className="border-line last:border-b-0">
            <AccordionTrigger className="py-5 text-left text-[17px] font-semibold text-forest hover:no-underline [&>svg]:text-teal">
              {t(`items.${key}.q`)}
            </AccordionTrigger>
            <AccordionContent className="pb-5 text-[15px] leading-relaxed text-ink/85">{t(`items.${key}.a`)}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Section>
  );
}
