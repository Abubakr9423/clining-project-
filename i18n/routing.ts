import { defineRouting } from "next-intl/routing";

/**
 * Locale codes follow BCP-47 (`tg` = Tajik) so Intl APIs and `<html lang>` are correct,
 * while the URL prefix uses the familiar `/tj` that local users expect on a language switch.
 */
export const locales = ["tg", "ru"] as const;
export type AppLocale = (typeof locales)[number];

/** Public URL prefix per locale — shared by the router, sitemap and canonical/hreflang builders. */
export const localePaths: Record<AppLocale, string> = { tg: "/tj", ru: "/ru" };

export const routing = defineRouting({
  locales,
  defaultLocale: "tg",
  localePrefix: { mode: "always", prefixes: localePaths },
});

/** Short labels shown in the header switch. */
export const localeLabels: Record<AppLocale, string> = { tg: "TJ", ru: "RU" };
