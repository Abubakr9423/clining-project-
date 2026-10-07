import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { absoluteUrl, languageAlternates, localePath } from "@/lib/seo";

/** Bump when page content actually changes — a lastmod that moves on every request gets ignored. */
const CONTENT_UPDATED = "2026-10-07";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(CONTENT_UPDATED);
  return routing.locales.map((locale) => ({
    url: absoluteUrl(localePath(locale)),
    lastModified,
    changeFrequency: "monthly",
    priority: locale === routing.defaultLocale ? 1 : 0.9,
    alternates: { languages: languageAlternates() },
  }));
}
