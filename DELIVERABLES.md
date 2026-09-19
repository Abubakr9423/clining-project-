# Deliverables — Cleaning & Territory Maintenance Website (Dushanbe)

**Date:** 19 September 2026 · **Stack:** Next.js 16 (App Router) · TypeScript strict · Tailwind 4 · shadcn/ui (Radix) · Motion · Lucide · next-intl 4 · Vercel-ready
**Run locally:** `npm install && npm run dev` → http://localhost:3000 (redirects to `/tj`). Checks: `npm run typecheck`, `npm run lint`, `npm test`, `npm run build`.

---

## 1. Completed website
Single-page marketing site in Tajik (default, `/tj`) and Russian (`/ru`), 13 sections plus a mobile action bar. All copy is in `messages/tg.json` and `messages/ru.json` (236 keys each, parity verified by script). No text is hard-coded in components.

## 2. Research
`RESEARCH.md` — 15 sites across 7 markets, local Dushanbe market audit, gallery review, library review, design direction. Phase documents in `docs/`: `PHASE2-ARCHITECTURE.md`, `PHASE3-DESIGN-SYSTEM.md`, `PHASE4-STACK.md`. Evidence screenshots in `research-shots/`.

## 3. Final sitemap
```
/            → 307 → /tj
/tj  /ru     Home: #top (hero) · trust bar · #services · #clients · #why-us · #process · #calculator · #before-after · #reviews · #faq · #contacts · footer
/tg, /tg/*   → 301 → /tj (internal BCP-47 code never exposed)
/tj/<anything>, /ru/<anything>  → localized 404
/sitemap.xml · /robots.txt · /icon · /tj/opengraph-image · /ru/opengraph-image
```

## 4. Design system summary
- Colours: forest `#0B3B34`, teal `#0F6B5C` (actions only), mint `#E8F3F0`, canvas `#F3F6F5`, ink `#14201D`, slate `#4A5954`, line `#D5E0DC`; WhatsApp/Telegram brand fills with forest text for contrast.
- Type: Golos Text 700/800 (headings) + Inter 400–600 (body), `cyrillic-ext` subsets, verified to render ӣ ӯ қ ғ ҳ ҷ natively. Manrope rejected after a rendered test. Fluid scale 34→60 / 32→52 / 28→38 / 20→24 / 16→17 px, measured so the longest RU/TJ words fit at 375 px.
- Layout: editorial split (sticky heading column 4/12, content 8/12 at ≥1024 px); radii 8/12/20; one shadow token; focus ring teal 2 px.
- Motion: CSS hero entrance, section headings fade once, process line draws once, number tick for real stats; everything disabled under `prefers-reduced-motion`.
- Tokens live in `app/globals.css` (`@theme`) and double as shadcn semantic variables. Specimen: `docs/design-system/specimen.html`.

## 5. Component architecture
```
app/[locale]/           layout (fonts, metadata, JSON-LD, providers, header/footer/action bar), page, not-found, [...rest], opengraph-image
app/                    sitemap.ts, robots.ts, icon.tsx, not-found.tsx (root)
components/layout/      Header*, MobileMenu*, LanguageSwitch*, MobileActionBar*, Footer, CtaBand, Section, Container
components/sections/    Hero, HeroReveal, HeroStarterCard*, TrustBar, ServicesSection, ServiceCard*, AudienceSection, AudienceCard*,
                        WhyUsSection, ProcessSection, ProcessTimeline*, CalculatorSection, QuoteCalculator*, BeforeAfterSection,
                        BeforeAfterSlider*, ReviewsSection, ReviewCarousel*, FaqSection, ContactSection, MapEmbed*
components/ui/          19 shadcn components (+ PlaceholderImage); button extended with forest / whatsapp / telegram / quiet variants and xl sizes
components/icons/       WhatsApp, Telegram, Instagram SVGs (Lucide has no brand marks)
components/motion/      MotionProvider (LazyMotion + reduced motion), Reveal, CountUp
content/                services, audiences, why-us, reviews, images (all data; text lives in messages)
lib/                    site-config (placeholders), links, anchors, quote-message (+ tests), quote-prefill, seo, locale, utils
i18n/                   routing (tg→/tj, ru→/ru), request, navigation · proxy.ts (locale middleware)
```
`*` = client component. Everything else is server-rendered. Business logic (message building, link building, prefill bus, JSON-LD) is in `lib/` with unit tests for the message builder (5 passing).

## 6. Translation files
`messages/tg.json` (default) and `messages/ru.json`, namespaced by section (`hero`, `services.indoor.items.daily.includes[]`, `calculator.message.*`, …). Typed through `global.d.ts`, so a missing key fails `tsc`. **Tajik copy was written by the AI and must be reviewed by a native speaker before launch** — everything is in one file, so the review is a single pass.

## 7. SEO implementation
Per-locale `<title>`/description, canonical, `hreflang` (tg, ru, x-default), Open Graph + Twitter cards with a generated 1200×630 image per locale, favicon route, `sitemap.xml` with alternates, `robots.txt`, JSON-LD `LocalBusiness` + `FAQPage` (the builder skips any bracketed placeholder so no invented phone/address is ever emitted), `<html lang="tg|ru">`. Site URL resolves from `NEXT_PUBLIC_SITE_URL` → Vercel production URL → localhost, so it works on the free `*.vercel.app` address without a domain.

## 8. Lighthouse results (local production build, `next start`)
| Page / device | Performance | Accessibility | Best Practices | SEO |
|---|---|---|---|---|
| /tj mobile (simulated slow 4G) | 86 | 100 | 100 | 100 |
| /ru mobile | 89 | 100 | 100 | 100 |
| /tj desktop | 99 | 100 | 100 | 100 |
Mobile metrics: FCP 1.1 s, LCP 3.8–4.2 s (Lighthouse's throttled estimate; observed load is <100 ms locally), TBT 0–10 ms, CLS 0, Speed Index 1.3 s. Reports: `docs/lighthouse/`. See §12 for the remaining LCP work. Axe-core (WCAG 2.2 AA + best practice): 0 violations on both locales at 375 px and 1440 px.

## 9. Responsive testing results
Checked at 375, 390, 768 and 1440 px in both languages: no horizontal overflow (scripted scan of every element), no clipped text, headings fit (longest words measured), tabs wrap on phones, audience tiles become a snap-scroll row, calculator stacks with the preview below, the action bar hides while the calculator or footer is on screen and respects the iOS safe area. Interaction tests passed: audience tile → calculator pre-filled; hero starter → calculator; validation on empty area; WhatsApp link carries the full message; before/after slider works by drag and arrow keys; mobile menu opens/closes.

## 10. Placeholders that still need real company data
| Placeholder | Where |
|---|---|
| `[COMPANY NAME]` | `lib/site-config.ts` → header, footer, meta, OG, JSON-LD |
| `[PHONE]`, `[WHATSAPP]` (digits, intl format), `[TELEGRAM]` (username), `[INSTAGRAM]` | `lib/site-config.ts` |
| `[ADDRESS]`, `[HOURS]`, `[MAP EMBED]` (`mapEmbedUrl`) | `lib/site-config.ts` |
| `[GOAL STATEMENT]` | `lib/site-config.ts` → footer |
| `[XX+]` objects, `[XX]` years, `[XX+]` staff, `[XX]` districts | `siteConfig.stats` (set `value` to a number; the dashed underline and tooltip disappear automatically) |
| `[REVIEW PLACEHOLDER]` ×4 | `content/reviews.ts` (set `placeholder: false`) + `reviews.items.*` in both message files |
| `[уточнить парк техники]` / `[парки техника аниқ карда шавад]` | `whyUs.items.equipment.desc` |
| `[уточнить условия]` (free site visit?), `[уточнить: счёт, акт, форма оплаты]` | `faq.items.calculation.a`, `faq.items.business.a` (both languages) |
| Production URL | `NEXT_PUBLIC_SITE_URL` only if a custom domain is attached |
Find them all with: `grep -rnE "\[[A-ZА-Я][^]]*\]" lib content messages`.

## 11. Recommended real photos / assets
Current photos are interim Unsplash stock (credits in `docs/IMAGE-CREDITS.md`). Replace by dropping files into `public/images` and editing `content/images.ts`:
1. Hero: your own staff member with a floor scrubber or window kit in a real Dushanbe object (portrait 4:5 ≥1200×1500 and a landscape 16:10 crop).
2. Five audience tiles (3:4): an office you clean, a clinic corridor, a shop floor, a private home, a courtyard/lawn you maintain.
3. Before/after pairs (same framing, same lens): office floor, window/shopfront, lawn or flower bed. These are deliberately still placeholders — stock pairs would be misleading.
4. Equipment close-ups (scrubber, vacuum, chemistry with labels) for future service detail pages.
5. Team photo in uniform for the About/Why-us area; logo files (SVG) to replace the check-mark mark in header, favicon and OG image.
6. Client logos with written permission for a future trust row.

## 12. Future improvements
- **Mobile LCP to 90+:** the remaining cost is the throttled font/CSS chain on the headline; options are a self-hosted subset of Golos Text with `font-display: optional`, or inlining the critical `@font-face`. Not done now because it trades away the first-paint brand type.
- Native-speaker review of all Tajik strings; a Russian copy edit for tone.
- Real reviews with organisation names; a client-logo row component is easy to add to the trust bar.
- A lightweight lead capture in parallel to messengers (Telegram bot or form → email) once a backend/ESP is chosen.
- Service detail pages (`/tj/services/…`) for SEO long-tail once the content exists; the `content/services.ts` structure already supports it.
- Analytics: only privacy-friendly, cookie-less (Vercel Analytics or Plausible) so the no-banner policy holds.
- Set `mapEmbedUrl` and address, then enable the click-to-load map.
- Git repository + Vercel project (not initialised here, as no commit was requested).
