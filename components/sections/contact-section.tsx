import { useTranslations } from "next-intl";
import { Clock, MapPin, Phone } from "lucide-react";
import { Section } from "@/components/layout/section";
import { InstagramIcon, TelegramIcon, WhatsAppIcon } from "@/components/icons/brand";
import { MapEmbed } from "./map-embed";
import { anchors } from "@/lib/anchors";
import { instagramUrl, telHref, telegramUrl, whatsappUrl } from "@/lib/links";
import { siteConfig } from "@/lib/site-config";

export function ContactSection() {
  const t = useTranslations("contacts");
  const th = useTranslations("hero");

  const rows: Array<{ key: string; icon: React.ReactNode; label: string; value: string; href?: string; external?: boolean }> = [
    { key: "phone", icon: <Phone className="size-5" aria-hidden />, label: t("phone"), value: siteConfig.phone, href: telHref },
    { key: "whatsapp", icon: <WhatsAppIcon size={20} />, label: t("whatsapp"), value: siteConfig.phone, href: whatsappUrl(th("whatsappGreeting")), external: true },
    { key: "telegram", icon: <TelegramIcon size={20} />, label: t("telegram"), value: siteConfig.telegram.startsWith("+") ? siteConfig.phone : `@${siteConfig.telegram}`, href: telegramUrl(), external: true },
    { key: "instagram", icon: <InstagramIcon size={20} />, label: t("instagram"), value: `@${siteConfig.instagram}`, href: instagramUrl, external: true },
    { key: "address", icon: <MapPin className="size-5" aria-hidden />, label: t("address"), value: t("addressValue") },
    { key: "hours", icon: <Clock className="size-5" aria-hidden />, label: t("hours"), value: t("hoursValue") },
  ];

  return (
    <Section id={anchors.contacts} title={t("title")} lead={t("subtitle")}>
      <div className="grid gap-8 lg:grid-cols-2">
        <ul className="divide-y divide-line rounded-md border border-line bg-white">
          {rows.map((row) => {
            const inner = (
              <>
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-mint text-teal">{row.icon}</span>
                <span className="min-w-0">
                  <span className="block text-[13px] text-slate">{row.label}</span>
                  <span className="block truncate font-medium text-forest">{row.value}</span>
                </span>
              </>
            );
            return (
              <li key={row.key}>
                {row.href ? (
                  <a
                    href={row.href}
                    target={row.external ? "_blank" : undefined}
                    rel={row.external ? "noopener" : undefined}
                    className="flex items-center gap-4 px-5 py-4 transition-colors hover:bg-mint/60"
                  >
                    {inner}
                  </a>
                ) : (
                  <div className="flex items-center gap-4 px-5 py-4">{inner}</div>
                )}
              </li>
            );
          })}
        </ul>
        <MapEmbed src={siteConfig.mapEmbedUrl} showLabel={t("showMap")} placeholder={t("mapPlaceholder")} title={t("mapTitle")} />
      </div>
    </Section>
  );
}
