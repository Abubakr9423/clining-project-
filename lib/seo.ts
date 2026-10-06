import type { Metadata } from "next";
import { localePaths, ogLocales, routing, type AppLocale } from "@/i18n/routing";
import { siteConfig } from "./site-config";

/** Public path prefix for a locale (e.g. tg → /tj). */
export function localePath(locale: AppLocale): string {
  return localePaths[locale];
}

export function absoluteUrl(path: string): string {
  return `${siteConfig.url}${path}`;
}

/** hreflang map: every locale + x-default → Tajik. */
export function languageAlternates(): Record<string, string> {
  const map: Record<string, string> = {};
  for (const l of routing.locales) map[l] = absoluteUrl(localePath(l));
  map["x-default"] = absoluteUrl(localePath(routing.defaultLocale));
  return map;
}

export function buildMetadata(locale: AppLocale, t: { title: string; description: string; keywords: string; ogTitle: string; ogDescription: string }): Metadata {
  const path = localePath(locale);
  return {
    metadataBase: new URL(siteConfig.url),
    title: t.title,
    description: t.description,
    keywords: t.keywords.split(",").map((k) => k.trim()),
    alternates: { canonical: absoluteUrl(path), languages: languageAlternates() },
    openGraph: {
      type: "website",
      locale: ogLocales[locale],
      alternateLocale: routing.locales.filter((l) => l !== locale).map((l) => ogLocales[l]),
      url: absoluteUrl(path),
      siteName: siteConfig.name,
      title: t.ogTitle,
      description: t.ogDescription,
      images: [{ url: absoluteUrl(`${path}/opengraph-image`), width: 1200, height: 630, alt: t.ogTitle }],
    },
    twitter: { card: "summary_large_image", title: t.ogTitle, description: t.ogDescription, images: [absoluteUrl(`${path}/opengraph-image`)] },
    robots: { index: true, follow: true },
  };
}

type FaqEntry = { q: string; a: string };

/**
 * JSON-LD. Only fields backed by real data are emitted: placeholders (bracketed values)
 * are skipped so search engines never receive invented phone numbers or addresses.
 */
export function buildJsonLd(locale: AppLocale, opts: { description: string; faq: FaqEntry[]; serviceNames: string[] }) {
  const isPh = (v: string) => /^\[.*\]$/.test(v);
  const path = localePath(locale);
  const business: Record<string, unknown> = {
    "@type": "LocalBusiness",
    "@id": `${absoluteUrl(path)}#business`,
    name: isPh(siteConfig.name) ? undefined : siteConfig.name,
    url: absoluteUrl(path),
    description: opts.description,
    areaServed: { "@type": "City", name: "Dushanbe" },
    inLanguage: locale,
    knowsAbout: opts.serviceNames,
  };
  if (!isPh(siteConfig.phone)) business.telephone = siteConfig.phone;
  if (!siteConfig.demoContacts && !isPh(siteConfig.address)) business.address = { "@type": "PostalAddress", streetAddress: siteConfig.address, addressLocality: "Dushanbe", addressCountry: "TJ" };
  if (!siteConfig.demoContacts && !isPh(siteConfig.instagram)) business.sameAs = [`https://instagram.com/${siteConfig.instagram}`];

  const faq = {
    "@type": "FAQPage",
    mainEntity: opts.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return { "@context": "https://schema.org", "@graph": [business, faq] };
}
