import { useTranslations } from "next-intl";
import { Section } from "@/components/layout/section";
import { AudienceCard, OtherObjectCard } from "./audience-card";
import { audiences } from "@/content/audiences";
import { anchors } from "@/lib/anchors";

export function AudienceSection() {
  const t = useTranslations("audience");

  return (
    <Section id={anchors.clients} title={t("title")} lead={t("subtitle")} tone="white">
      <ul className="-mx-gutter flex snap-x snap-mandatory gap-4 overflow-x-auto px-gutter pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-3">
        {audiences.map((a) => (
          <li key={a.key} className="w-[72vw] shrink-0 snap-start sm:w-auto">
            <AudienceCard
              objectType={a.key}
              icon={<a.icon strokeWidth={1.75} aria-hidden />}
              title={t(`items.${a.key}.title`)}
              scope={t(`items.${a.key}.scope`)}
              image={a.image}
              imageAlt={t(`items.${a.key}.imageAlt`)}
              cta={t("cta")}
            />
          </li>
        ))}
        <li className="w-[72vw] shrink-0 snap-start sm:w-auto">
          <OtherObjectCard title={t("other.title")} scope={t("other.scope")} cta={t("cta")} />
        </li>
      </ul>
    </Section>
  );
}
