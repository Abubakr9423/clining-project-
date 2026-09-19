"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { localeLabels, routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export function LanguageSwitch({ className }: { className?: string }) {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("a11y");

  return (
    <div role="group" aria-label={t("switchLanguage")} className={cn("flex items-center gap-1 text-sm font-medium", className)}>
      {routing.locales.map((code, i) => {
        const active = code === locale;
        return (
          <span key={code} className="flex items-center">
            {i > 0 ? <span aria-hidden className="mx-1 text-line">|</span> : null}
            <Link
              href={pathname}
              locale={code}
              aria-current={active ? "true" : undefined}
              className={cn(
                "rounded-sm px-1.5 py-1 transition-colors",
                active ? "font-bold text-forest" : "text-slate hover:text-forest",
              )}
            >
              {localeLabels[code]}
            </Link>
          </span>
        );
      })}
    </div>
  );
}
