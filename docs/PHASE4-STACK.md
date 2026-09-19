# Phase 4 — Technical Stack

**Date:** 19 September 2026 · Verified with `tsc --noEmit`, `eslint`, `next build`, `next start` + curl, Playwright smoke render.

## Versions installed
| Package | Version | Note |
|---|---|---|
| next | 16.3.5 | App Router, Turbopack build. `middleware.ts` is now `proxy.ts`. Route params are Promises. |
| react / react-dom | 19.2.8 | |
| typescript | 5.x | `strict`, `noUncheckedIndexedAccess`, `noFallthroughCasesInSwitch` |
| tailwindcss | 4.x | CSS-first config in `app/globals.css` (`@theme inline`), no `tailwind.config` |
| shadcn CLI | 4.21 | style `radix-nova` (Radix primitives, Lucide icons); components vendored into `components/ui` |
| next-intl | 4.14 | routing + messages; locale segment `[locale]` |
| motion | 13.4 | import from `motion/react` (framer-motion is an alias) |
| lucide-react | 1.47 | brand icons (WhatsApp/Telegram/Instagram) are not included → custom SVGs |
| embla-carousel-react | 8.6 | via shadcn `carousel` |

## Decisions
- **Locale codes.** Internal locale = `tg` (valid BCP-47 for Tajik, so `Intl` formatting and `<html lang>` are correct); public URL prefix = `/tj` via `localePrefix.prefixes`. `/` → 307 `/tj`. `/tg` → 301 `/tj` (redirect rule) so the internal code never leaks.
- **Static output.** Both locale pages are SSG (`generateStaticParams` + `setRequestLocale`). The proxy only handles locale negotiation; no server data.
- **Typed messages.** `global.d.ts` augments next-intl's `AppConfig` with `Messages: typeof ru.json` and the locale union, so a missing key or wrong namespace fails `tsc`.
- **Fonts.** `next/font/google`: Golos Text 600/700/800 + Inter 400/500/600, subsets `cyrillic-ext, cyrillic, latin`, `display: swap`, exposed as `--font-golos` / `--font-inter`; mapped to `font-heading`/`font-display` and `font-body`/`font-sans` utilities.
- **Tokens.** Phase 3 palette and fluid type scale live in `app/globals.css` and double as shadcn semantic tokens (`--primary` = teal, `--muted` = mint, `--border` = line, `--ring` = teal). Utilities available: `bg-forest`, `text-slate`, `text-display`, `text-h2`, `rounded-lg (20px)`, `shadow-lift`, `py-section`, `px-gutter`, `max-w-site`.
- **Reduced motion.** Global CSS media query neutralises CSS transitions/animations; Motion components will additionally use `MotionConfig reducedMotion="user"` (Phase 5).
- **No dark mode.** shadcn's `.dark` block removed; the brief asks for one calm light identity.
- **Linting.** `eslint-config-next` 16 with the new React hooks rules. One vendored line in `components/ui/carousel.tsx` carries a scoped disable (Embla initial-state sync); nothing else is suppressed.
- **No analytics, no cookies, no form backend** in v1 (see Phase 2). Nothing to consent to.

## Folder structure (current)
```
app/
  [locale]/layout.tsx   fonts, <html lang>, NextIntlClientProvider, metadata from messages
  [locale]/page.tsx     Phase 4 smoke page (replaced in Phase 5)
  globals.css           tokens + base layer
components/ui/          19 shadcn components
i18n/                   routing.ts (locales, prefixes), request.ts, navigation.ts
lib/                    site-config.ts (all placeholders), locale.ts, utils.ts
messages/               tg.json, ru.json
proxy.ts                next-intl locale middleware
next.config.ts          next-intl plugin, image formats, /tg redirects
global.d.ts             typed messages
docs/                   phase documents, design-system/specimen.html
research-shots/         evidence screenshots
```
Planned in Phase 5: `components/layout`, `components/sections`, `components/icons`, `components/motion`, `content/`, `app/sitemap.ts`, `app/robots.ts`, `app/[locale]/opengraph-image.tsx`, `app/[locale]/not-found.tsx`.

## Scripts
`npm run dev` · `npm run build` · `npm run start` · `npm run lint` · `npx tsc --noEmit`

## Deploy target
Vercel, framework preset Next.js, no environment variables required. Set `siteConfig.url` to the production domain before the first deploy so canonical/OG/sitemap URLs are correct.
