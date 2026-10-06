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
  name: "Safo Cleaning",
  owner: "Musavvir Kamolov",
  goalStatement: "[GOAL STATEMENT]",
  city: "Dushanbe",
  phone: "+992 022051313",
  /** Digits only, international format, no plus sign — used for wa.me links. */
  whatsapp: "992022051313",
  /** Telegram username without @, or a phone number with "+" (t.me/+992… opens the chat by number). */
  telegram: "+992022051313",
  /** Instagram username without @. */
  instagram: "safo.cleaning.tj",
  /**
   * DEMO contact data (address, hours, Instagram, map) — placeholders that look real for previews.
   * Shown text is localized in messages (`contacts.addressValue` / `contacts.hoursValue`);
   * these English values feed SEO only, and JSON-LD skips them while `demoContacts` is true.
   */
  demoContacts: true,
  address: "45 Rudaki Avenue, Dushanbe",
  hours: "Mo-Sa 08:00-20:00",
  /** Google/Yandex maps embed URL, or null to show the placeholder panel. */
  mapEmbedUrl: `https://www.google.com/maps?q=${encodeURIComponent("Rudaki Avenue 45, Dushanbe")}&output=embed` as string | null,
  /**
   * Public site URL for canonical/OG/sitemap.
   * Resolution order: NEXT_PUBLIC_SITE_URL → Vercel production URL → localhost.
   * No custom domain is needed: the *.vercel.app address is picked up automatically.
   */
  url: resolveSiteUrl(),
  /**
   * Trust strip. The company is just launching, so these are honest launch facts rather than
   * invented counters — swap in real numbers (objects served, staff) once they exist.
   * Each key maps to `trust.<key>` (label) and `trust.<key>Value` (big text) in messages.
   */
  stats: ["launch", "city", "languages", "clients"] as const,
} as const;

export type SiteConfig = typeof siteConfig;

export const isPlaceholder = (value: string) => /^\[[A-Z0-9+ ]+\]$/.test(value);
