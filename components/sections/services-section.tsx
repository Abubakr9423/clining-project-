import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Section } from "@/components/layout/section";
import { WhatsAppIcon } from "@/components/icons/brand";
import { ServiceCard } from "./service-card";
import { indoorServices, outdoorServices, type ServiceItem } from "@/content/services";

type TranslatedService = ServiceItem & { title: string; description: string; includes: string[] };
import { anchors } from "@/lib/anchors";
import { whatsappUrl } from "@/lib/links";

export function ServicesSection() {
  const t = useTranslations("services");

  const indoor = indoorServices.map((item) => ({
    ...item,
    title: t(`indoor.items.${item.key}.title`),
    description: t(`indoor.items.${item.key}.desc`),
    includes: t.raw(`indoor.items.${item.key}.includes`) as string[],
  }));
  const outdoor = outdoorServices.map((item) => ({
    ...item,
    title: t(`outdoor.items.${item.key}.title`),
    description: t(`outdoor.items.${item.key}.desc`),
    includes: t.raw(`outdoor.items.${item.key}.includes`) as string[],
  }));

  const renderGrid = (items: ReadonlyArray<TranslatedService>) => (
    <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <li key={item.key}>
          <ServiceCard icon={<item.icon className="size-6" strokeWidth={1.75} aria-hidden />} title={item.title} description={item.description} includes={item.includes} extra={item.extra} />
        </li>
      ))}
    </ul>
  );

  return (
    <Section
      id={anchors.services}
      title={t("title")}
      lead={t("subtitle")}
      aside={
        <div className="rounded-md border border-line bg-white p-5">
          <p className="font-semibold text-forest">{t("notFound")}</p>
          <p className="mt-1 text-sm text-slate">{t("notFoundText")}</p>
          <Button asChild variant="whatsapp" size="xl" className="mt-4 w-full sm:w-auto lg:w-full">
            <a href={whatsappUrl(t("notFoundMessage"))} target="_blank" rel="noopener">
              <WhatsAppIcon /> {t("notFoundCta")}
            </a>
          </Button>
        </div>
      }
    >
      <Tabs defaultValue="indoor">
        <TabsList className="mb-6 grid h-auto w-full grid-cols-2 gap-1 rounded-lg bg-mint p-1 sm:inline-flex sm:w-auto">
          <TabsTrigger value="indoor" className="h-auto min-h-10 whitespace-normal rounded-md px-3 py-2 text-sm leading-tight text-ink data-[state=active]:bg-white data-[state=active]:text-forest sm:px-4 sm:text-[15px]">
            {t("tabs.indoor")}
          </TabsTrigger>
          <TabsTrigger value="outdoor" className="h-auto min-h-10 whitespace-normal rounded-md px-3 py-2 text-sm leading-tight text-ink data-[state=active]:bg-white data-[state=active]:text-forest sm:px-4 sm:text-[15px]">
            {t("tabs.outdoor")}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="indoor">{renderGrid(indoor)}</TabsContent>
        <TabsContent value="outdoor">{renderGrid(outdoor)}</TabsContent>
      </Tabs>
    </Section>
  );
}
