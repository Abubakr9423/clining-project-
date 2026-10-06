import { defineRouting } from "next-intl/routing";

/**
 * Locale codes follow BCP-47 (`tg` = Tajik) so Intl APIs and `<html lang>` are correct,
 * while the URL prefix uses the familiar `/tj` that local users expect on a language switch.
 */
export const locales = ["tg", "ru", "en", "uz", "kk", "ky", "tk", "fa", "ar", "zh", "tr"] as const;
export type AppLocale = (typeof locales)[number];

/** Public URL prefix per locale — shared by the router, sitemap and canonical/hreflang builders. */
export const localePaths: Record<AppLocale, string> = {
  tg: "/tj",
  ru: "/ru",
  en: "/en",
  uz: "/uz",
  kk: "/kk",
  ky: "/ky",
  tk: "/tk",
  fa: "/fa",
  ar: "/ar",
  zh: "/zh",
  tr: "/tr",
};

export const routing = defineRouting({
  locales,
  defaultLocale: "tg",
  localePrefix: { mode: "always", prefixes: localePaths },
});

/** Short labels shown in the header switch and in the quote message. */
export const localeLabels: Record<AppLocale, string> = {
  tg: "TJ",
  ru: "RU",
  en: "EN",
  uz: "UZ",
  kk: "KZ",
  ky: "KG",
  tk: "TM",
  fa: "FA",
  ar: "AR",
  zh: "中文",
  tr: "TR",
};

/** Each language named in itself, for the switch menu. */
export const localeNames: Record<AppLocale, string> = {
  tg: "Тоҷикӣ",
  ru: "Русский",
  en: "English",
  uz: "Oʻzbekcha",
  kk: "Қазақша",
  ky: "Кыргызча",
  tk: "Türkmençe",
  fa: "فارسی",
  ar: "العربية",
  zh: "中文",
  tr: "Türkçe",
};

/** Open Graph locale tags. */
export const ogLocales: Record<AppLocale, string> = {
  tg: "tg_TJ",
  ru: "ru_RU",
  en: "en_US",
  uz: "uz_UZ",
  kk: "kk_KZ",
  ky: "ky_KG",
  tk: "tk_TM",
  fa: "fa_IR",
  ar: "ar_AR",
  zh: "zh_CN",
  tr: "tr_TR",
};

const rtlLocales: ReadonlySet<AppLocale> = new Set(["fa", "ar"]);
export const isRtl = (locale: AppLocale) => rtlLocales.has(locale);
