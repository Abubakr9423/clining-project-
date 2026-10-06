"use client";

import { DropdownMenu } from "radix-ui";
import { Check, ChevronDown, Globe } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { localeLabels, localeNames, routing, type AppLocale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

/**
 * `menu` (header): compact trigger + dropdown, since ten codes no longer fit inline.
 * `list` (mobile sheet): every language visible as a wrapping row of pills.
 * `links` (footer): a quiet two-column list of text links, matching the footer's nav column.
 */
export function LanguageSwitch({ className, variant = "menu" }: { className?: string; variant?: "menu" | "list" | "links" }) {
  const locale = useLocale() as AppLocale;
  const pathname = usePathname();
  const t = useTranslations("a11y");

  if (variant === "links") {
    return (
      <ul role="group" aria-label={t("switchLanguage")} className={cn("grid grid-cols-2 gap-x-6 gap-y-2 text-sm", className)}>
        {routing.locales.map((code) => {
          const active = code === locale;
          return (
            <li key={code}>
              <Link
                href={pathname}
                locale={code}
                lang={code}
                aria-current={active ? "true" : undefined}
                className={cn("inline-flex items-center gap-1.5", active ? "font-semibold text-forest" : "text-ink/80 hover:text-forest")}
              >
                {localeNames[code]}
                {active ? <Check className="size-3.5 text-teal" aria-hidden /> : null}
              </Link>
            </li>
          );
        })}
      </ul>
    );
  }

  if (variant === "list") {
    return (
      <div role="group" aria-label={t("switchLanguage")} className={cn("flex flex-wrap gap-2 text-sm", className)}>
        {routing.locales.map((code) => {
          const active = code === locale;
          return (
            <Link
              key={code}
              href={pathname}
              locale={code}
              lang={code}
              aria-current={active ? "true" : undefined}
              className={cn(
                "rounded-full border px-3 py-1.5 transition-colors",
                active ? "border-forest bg-forest font-semibold text-white" : "border-line text-slate hover:bg-mint hover:text-forest",
              )}
            >
              {localeNames[code]}
            </Link>
          );
        })}
      </div>
    );
  }

  return (
    <DropdownMenu.Root modal={false}>
      <DropdownMenu.Trigger
        aria-label={t("switchLanguage")}
        className={cn(
          "inline-flex h-10 items-center gap-1.5 rounded-md px-2 text-sm font-semibold text-forest transition-colors hover:bg-mint data-[state=open]:bg-mint",
          className,
        )}
      >
        <Globe className="size-4" aria-hidden />
        {localeLabels[locale]}
        <ChevronDown className="size-3.5 opacity-60" aria-hidden />
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="end"
          sideOffset={6}
          className="z-50 max-h-[70vh] min-w-44 overflow-y-auto rounded-lg border border-line bg-white p-1 shadow-lg"
        >
          {routing.locales.map((code) => (
            <DropdownMenu.Item key={code} asChild>
              <Link
                href={pathname}
                locale={code}
                lang={code}
                aria-current={code === locale ? "true" : undefined}
                className="flex cursor-pointer items-center justify-between gap-4 rounded-md px-3 py-2 text-sm text-ink outline-none data-[highlighted]:bg-mint data-[highlighted]:text-forest"
              >
                <span>{localeNames[code]}</span>
                {code === locale ? <Check className="size-4 text-forest" aria-hidden /> : <span className="text-xs text-slate">{localeLabels[code]}</span>}
              </Link>
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
