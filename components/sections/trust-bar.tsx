import { useTranslations } from "next-intl";
import { Container } from "@/components/layout/container";
import { siteConfig } from "@/lib/site-config";

export function TrustBar() {
  const t = useTranslations("trust");

  return (
    <section aria-label={t("label")} className="border-y border-line bg-white">
      <Container>
        <dl className="grid grid-cols-2 divide-line md:grid-cols-4 md:divide-x">
          {siteConfig.stats.map((key) => (
            // Label on top, value below, both top-aligned: every column shares the same two baselines.
            <div key={key} className="flex flex-col gap-1.5 px-2 py-6 md:px-6 md:py-8 md:first:ps-0 md:last:pe-0">
              <dt className="text-sm text-slate md:truncate">{t(key)}</dt>
              <dd className="font-heading text-2xl font-bold text-forest md:whitespace-nowrap lg:text-3xl">{t(`${key}Value`)}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
