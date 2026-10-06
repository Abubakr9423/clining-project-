import { useTranslations } from "next-intl";
import { Check, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { WhatsAppIcon } from "@/components/icons/brand";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { HeroStarterCard } from "./hero-starter-card";
import { HeroReveal } from "./hero-reveal";
import { SoapBubbles } from "@/components/motion/soap-bubbles";
import { images } from "@/content/images";
import { anchors } from "@/lib/anchors";
import { telHref, whatsappUrl } from "@/lib/links";

export function Hero() {
  const t = useTranslations("hero");
  const tc = useTranslations("common");
  const trust = [t("microTrust.contract"), t("microTrust.scope"), t("microTrust.visit")];

  return (
    <section id={anchors.top} className="relative isolate scroll-mt-20 overflow-hidden pb-12 pt-8 md:pb-16 md:pt-14 lg:pt-16">
      <SoapBubbles className="pointer-events-none absolute inset-0 z-[1]" />
      <Container className="lg:grid lg:grid-cols-12 lg:items-center lg:gap-x-10">
        <HeroReveal className="lg:col-span-7">
          <h1 className="text-display font-extrabold">{t("title")}</h1>
          <p className="mt-5 max-w-[56ch] text-lg leading-relaxed text-slate md:text-xl">{t("subtitle")}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <Button asChild size="xl" className="w-full sm:w-auto">
              <a href={`#${anchors.calculator}`}>{tc("getQuote")}</a>
            </Button>
            <div className="grid grid-cols-2 gap-3 sm:contents">
              <Button asChild size="xl" variant="whatsapp">
                <a href={whatsappUrl(t("whatsappGreeting"))} target="_blank" rel="noopener">
                  <WhatsAppIcon /> {tc("whatsapp")}
                </a>
              </Button>
              <Button asChild size="xl" variant="quiet" className="justify-center sm:justify-start">
                <a href={telHref}>
                  <Phone /> {tc("call")}
                </a>
              </Button>
            </div>
          </div>
          <ul className="mt-8 flex flex-col gap-2 text-sm text-ink/80 sm:flex-row sm:flex-wrap sm:gap-x-6">
            {trust.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <Check className="size-4 text-teal" aria-hidden /> {item}
              </li>
            ))}
          </ul>
        </HeroReveal>

        <div className="relative mt-10 lg:col-span-5 lg:mt-0">
          {/* Art direction: landscape crop preloaded on phones/tablets, portrait on desktop (lazy so phones never fetch it). */}
          <PlaceholderImage
            src={images.hero.srcMobile ?? images.hero.src}
            alt={t("imageAlt")}
            caption={images.hero.caption}
            priority
            sizes="92vw"
            quality={70}
            className="aspect-[16/10] w-full lg:hidden"
          />
          <PlaceholderImage
            src={images.hero.src}
            alt={t("imageAlt")}
            caption={images.hero.caption}
            loading="lazy"
            sizes="40vw"
            className="hidden aspect-[4/5] w-full lg:block"
          />
          <HeroStarterCard className="relative z-[2] mt-4 lg:absolute lg:-bottom-8 lg:-start-16 lg:mt-0 lg:w-[calc(100%+4rem)] xl:-start-24 xl:w-[calc(100%+6rem)]" />
        </div>
      </Container>
    </section>
  );
}
