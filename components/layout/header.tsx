"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "./container";
import { LanguageSwitch } from "./language-switch";
import { MobileMenu } from "./mobile-menu";
import { navItems, navHref } from "./nav-links";
import { telHref } from "@/lib/links";
import { isPlaceholder, siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function Header({ whatsappGreeting }: { whatsappGreeting: string }) {
  const [scrolled, setScrolled] = useState(false);
  const t = useTranslations("nav");
  const tc = useTranslations("common");
  const ta = useTranslations("a11y");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b transition-[background-color,border-color,box-shadow] duration-200",
        scrolled ? "border-line bg-white/92 backdrop-blur-md" : "border-transparent bg-canvas",
      )}
    >
      <Container className={cn("flex items-center justify-between gap-4 transition-[height] duration-200", scrolled ? "h-16" : "h-20")}>
        <a href="#top" className="flex min-w-0 items-center gap-2 font-heading text-base font-bold text-forest sm:text-lg">
          <span aria-hidden className="grid size-8 place-items-center rounded-md bg-forest text-white">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M5 13l4 4L19 7" />
            </svg>
          </span>
          <span className="truncate">{siteConfig.name}</span>
        </a>

        <nav aria-label={ta("mainNav")} className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.key}
              href={navHref(item.anchor)}
              className="rounded-md px-3 py-2 text-[15px] font-medium text-ink/80 transition-colors hover:bg-mint hover:text-forest"
            >
              {t(item.key)}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageSwitch />
          <Button asChild size="xl" className="hidden lg:inline-flex">
            <a href={telHref}>
              <Phone /> {isPlaceholder(siteConfig.phone) ? tc("call") : siteConfig.phone}
            </a>
          </Button>
          <Button asChild size="icon-xl" variant="forest" className="hidden sm:inline-flex lg:hidden" aria-label={tc("call")}>
            <a href={telHref}>
              <Phone />
            </a>
          </Button>
          <MobileMenu whatsappGreeting={whatsappGreeting} />
        </div>
      </Container>
    </header>
  );
}
