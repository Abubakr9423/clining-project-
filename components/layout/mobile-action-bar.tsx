"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Calculator, Phone } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/brand";
import { anchors } from "@/lib/anchors";
import { telHref, whatsappUrl } from "@/lib/links";
import { cn } from "@/lib/utils";

/**
 * Fixed three-cell bar on small screens. Slides away while the calculator or the footer is on screen
 * so it never covers the send buttons or footer links.
 */
export function MobileActionBar({ whatsappGreeting }: { whatsappGreeting: string }) {
  const [hidden, setHidden] = useState(false);
  const t = useTranslations("actionBar");

  useEffect(() => {
    const targets = [document.getElementById(anchors.calculator), document.querySelector("footer")].filter(
      (el): el is HTMLElement => el instanceof HTMLElement,
    );
    if (targets.length === 0) return;
    const visible = new Set<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.add(e.target);
          else visible.delete(e.target);
        }
        setHidden(visible.size > 0);
      },
      { threshold: 0.05 },
    );
    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const cell = "flex flex-1 flex-col items-center justify-center gap-1 py-2 text-xs font-medium text-forest";

  return (
    <nav
      aria-label={t("label")}
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-line bg-white pb-[env(safe-area-inset-bottom)] transition-transform duration-200 md:hidden",
        hidden && "translate-y-full",
      )}
    >
      <a href={`#${anchors.calculator}`} className={cell}>
        <Calculator className="size-5" /> {t("quote")}
      </a>
      <a href={whatsappUrl(whatsappGreeting)} target="_blank" rel="noopener" className={cn(cell, "bg-mint")}>
        <WhatsAppIcon size={20} /> {t("whatsapp")}
      </a>
      <a href={telHref} className={cell}>
        <Phone className="size-5" /> {t("call")}
      </a>
    </nav>
  );
}
