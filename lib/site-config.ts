function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
}

/**
 * Single source of truth for company facts.
 * Every value in square brackets is a PLACEHOLDER and must be replaced with real data
 * before launch. `grep -rn "\[[A-Z ]*\]" lib/site-config.ts` lists what is still missing.
 */
export const siteConfig = {
  name: "[COMPANY NAME]",
  owner: "Musavvir Kamolov",
  goalStatement: "[GOAL STATEMENT]",
  city: "Dushanbe",
  phone: "[PHONE]",
  /** Digits only, international format, no plus sign — used for wa.me links. */
  whatsapp: "[WHATSAPP]",
  /** Telegram username without @. */
  telegram: "[TELEGRAM]",
  /** Instagram username without @. */
  instagram: "[INSTAGRAM]",
  address: "[ADDRESS]",
  hours: "[HOURS]",
  /** Google/Yandex maps embed URL, or null to show the placeholder panel. */
  mapEmbedUrl: null as string | null,
  /**
   * Public site URL for canonical/OG/sitemap.
   * Resolution order: NEXT_PUBLIC_SITE_URL → Vercel production URL → localhost.
   * No custom domain is needed: the *.vercel.app address is picked up automatically.
   */
  url: resolveSiteUrl(),
  stats: [
    { key: "objects", value: null, placeholder: "[XX+]" },
    { key: "years", value: null, placeholder: "[XX]" },
    { key: "staff", value: null, placeholder: "[XX+]" },
    { key: "districts", value: null, placeholder: "[XX]" },
  ] as ReadonlyArray<{ key: "objects" | "years" | "staff" | "districts"; value: number | null; placeholder: string }>,
} as const;

export type SiteConfig = typeof siteConfig;

export const isPlaceholder = (value: string) => /^\[[A-Z0-9+ ]+\]$/.test(value);
