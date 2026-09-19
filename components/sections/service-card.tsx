"use client";

import { useTranslations } from "next-intl";
import { ArrowRight, Check } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { prefillQuote, type Extra } from "@/lib/quote-prefill";

type Props = {
  icon: React.ReactNode;
  title: string;
  description: string;
  includes: string[];
  extra?: Extra;
};

export function ServiceCard({ icon, title, description, includes, extra }: Props) {
  const t = useTranslations("services");

  return (
    <article className="flex h-full flex-col rounded-md border border-line bg-white p-6 transition-[box-shadow,transform] duration-150 hover:-translate-y-0.5 hover:shadow-lift">
      <div className="mb-4 grid size-11 place-items-center rounded-full bg-mint text-teal">
        {icon}
      </div>
      <h3 className="text-h3 font-semibold">{title}</h3>
      <p className="mt-2 text-[15px] leading-relaxed text-slate">{description}</p>

      <Accordion type="single" collapsible className="mt-auto pt-4">
        <AccordionItem value="details" className="border-t border-line border-b-0">
          <AccordionTrigger className="py-3 text-sm font-medium text-forest hover:no-underline [&>svg]:text-teal">
            {t("includesTitle")}
          </AccordionTrigger>
          <AccordionContent className="pb-2">
            <ul className="space-y-2 text-sm text-ink/85">
              {includes.map((item) => (
                <li key={item} className="flex gap-2">
                  <Check className="mt-0.5 size-4 shrink-0 text-teal" aria-hidden /> {item}
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => prefillQuote(extra ? { extras: [extra] } : {})}
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-teal underline-offset-4 hover:underline"
            >
              {t("calculate")} <ArrowRight className="size-4" aria-hidden />
            </button>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </article>
  );
}
