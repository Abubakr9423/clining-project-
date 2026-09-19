import { useTranslations } from "next-intl";
import { Section } from "@/components/layout/section";
import { whyUs } from "@/content/why-us";
import { anchors } from "@/lib/anchors";

/** Ruled list on the dark band — the reasons are not a sequence, so no numerals and no cards. */
export function WhyUsSection() {
  const t = useTranslations("whyUs");

  return (
    <Section id={anchors.whyUs} title={t("title")} lead={t("subtitle")} tone="forest">
      <ul className="grid gap-x-8 gap-y-10 sm:grid-cols-2 xl:grid-cols-3">
        {whyUs.map(({ key, icon: Icon }) => (
          <li key={key} className="border-t border-white/18 pt-5">
            <Icon className="size-6 text-white" strokeWidth={1.75} aria-hidden />
            <h3 className="mt-4 text-h3 font-semibold">{t(`items.${key}.title`)}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-white/72">{t(`items.${key}.desc`)}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
