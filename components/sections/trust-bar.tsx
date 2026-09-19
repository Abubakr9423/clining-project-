import { useTranslations } from "next-intl";
import { Container } from "@/components/layout/container";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { CountUp } from "@/components/motion/count-up";
import { siteConfig } from "@/lib/site-config";

export function TrustBar() {
  const t = useTranslations("trust");
  const tc = useTranslations("common");

  return (
    <section aria-label={t("label")} className="border-y border-line bg-white">
      <Container>
        <dl className="grid grid-cols-2 divide-line md:grid-cols-4 md:divide-x">
          {siteConfig.stats.map((stat) => (
            <div key={stat.key} className="flex flex-col-reverse px-2 py-6 md:px-6 md:py-8 md:first:pl-0 md:last:pr-0">
              <dd className="font-heading text-3xl font-bold text-forest md:text-4xl">
                {stat.value === null ? (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span
                        tabIndex={0}
                        className="cursor-help underline decoration-line decoration-dashed underline-offset-8"
                        data-placeholder
                      >
                        {stat.placeholder}
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>{tc("placeholderNote")}</TooltipContent>
                  </Tooltip>
                ) : (
                  <CountUp value={stat.value} suffix="+" />
                )}
              </dd>
              <dt className="mt-1 text-sm text-slate">{t(stat.key)}</dt>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
