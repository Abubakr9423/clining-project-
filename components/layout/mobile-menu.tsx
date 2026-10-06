"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Menu, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { WhatsAppIcon } from "@/components/icons/brand";
import { navItems, navHref } from "./nav-links";
import { LanguageSwitch } from "./language-switch";
import { Logo } from "@/components/brand/logo";
import { telHref, whatsappUrl } from "@/lib/links";
import { siteConfig } from "@/lib/site-config";

export function MobileMenu({ whatsappGreeting }: { whatsappGreeting: string }) {
  const [open, setOpen] = useState(false);
  const t = useTranslations("nav");
  const tc = useTranslations("common");
  const ta = useTranslations("a11y");

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon-xl" aria-label={ta("openMenu")} className="lg:hidden">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="flex w-[min(100vw,360px)] flex-col gap-0 p-0">
        <SheetHeader className="border-b border-line px-6 py-5">
          <SheetTitle aria-label={siteConfig.name}>
            <Logo />
          </SheetTitle>
        </SheetHeader>
        <nav aria-label={ta("mainNav")} className="flex flex-col px-2 py-3">
          {navItems.map((item) => (
            <a
              key={item.key}
              href={navHref(item.anchor)}
              onClick={() => setOpen(false)}
              className="rounded-md px-4 py-3 text-lg font-medium text-forest hover:bg-mint"
            >
              {t(item.key)}
            </a>
          ))}
        </nav>
        <div className="mt-auto flex flex-col gap-3 border-t border-line px-6 py-6">
          <LanguageSwitch variant="list" className="mb-2" />
          <Button asChild size="xl">
            <a href={telHref}>
              <Phone /> {tc("call")}
            </a>
          </Button>
          <Button asChild size="xl" variant="whatsapp">
            <a href={whatsappUrl(whatsappGreeting)} target="_blank" rel="noopener">
              <WhatsAppIcon /> {tc("whatsapp")}
            </a>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
