import { useTranslations } from "next-intl";
import { Container } from "./container";
import { LanguageSwitch } from "./language-switch";
import { Logo } from "@/components/brand/logo";
import { navItems, navHref } from "./nav-links";
import { InstagramIcon, TelegramIcon, WhatsAppIcon } from "@/components/icons/brand";
import { instagramUrl, telHref, telegramUrl, whatsappUrl } from "@/lib/links";
import { siteConfig } from "@/lib/site-config";

export function Footer() {
  const t = useTranslations("footer");
  const tn = useTranslations("nav");
  const tc = useTranslations("contacts");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-white">
      <Container className="grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Logo />
          <p className="mt-3 max-w-[44ch] text-sm leading-relaxed text-slate">{t("goal")}</p>
          <p className="mt-4 text-sm text-slate">
            {t("owner")}: <span className="font-medium text-ink">{siteConfig.owner}</span>
          </p>
        </div>
        <nav aria-label={t("navTitle")} className="lg:col-span-2">
          <p className="text-sm font-semibold text-forest">{t("navTitle")}</p>
          <ul className="mt-3 space-y-2 text-sm">
            {navItems.map((item) => (
              <li key={item.key}>
                <a href={navHref(item.anchor)} className="text-ink/80 hover:text-forest">
                  {tn(item.key)}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="lg:col-span-3">
          <p className="text-sm font-semibold text-forest">{t("contactsTitle")}</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a href={telHref} className="text-ink/80 hover:text-forest">
                {siteConfig.phone}
              </a>
            </li>
            <li className="text-ink/80">{tc("addressValue")}</li>
            <li className="text-ink/80">{tc("hoursValue")}</li>
          </ul>
          <ul className="mt-4 flex gap-2">
            <li>
              <a href={whatsappUrl()} target="_blank" rel="noopener" aria-label={tc("whatsapp")} className="grid size-10 place-items-center rounded-full border border-line text-forest hover:bg-mint">
                <WhatsAppIcon size={22} brand />
              </a>
            </li>
            <li>
              <a href={telegramUrl()} target="_blank" rel="noopener" aria-label={tc("telegram")} className="grid size-10 place-items-center rounded-full border border-line text-forest hover:bg-mint">
                <TelegramIcon size={22} brand />
              </a>
            </li>
            <li>
              <a href={instagramUrl} target="_blank" rel="noopener" aria-label={tc("instagram")} className="grid size-10 place-items-center rounded-full border border-line text-forest hover:bg-mint">
                <InstagramIcon size={22} brand />
              </a>
            </li>
          </ul>
        </div>
        <div className="lg:col-span-3">
          <p className="text-sm font-semibold text-forest">{t("langTitle")}</p>
          <LanguageSwitch variant="links" className="mt-3" />
        </div>
      </Container>
      <div className="border-t border-line">
        <Container className="flex flex-col gap-2 py-5 text-[13px] text-slate sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.name}. {t("rights")}
          </p>
          <p>{t("placeholderNotice")}</p>
          <p>
            {t.rich("madeBy", {
              company: siteConfig.developer.name,
              link: (chunks) => (
                <a href={siteConfig.developer.url} target="_blank" rel="noopener" className="font-medium text-forest hover:underline">
                  {chunks}
                </a>
              ),
            })}
          </p>
        </Container>
      </div>
    </footer>
  );
}
