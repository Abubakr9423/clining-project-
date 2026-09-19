# Cleaning & territory maintenance — Dushanbe

Bilingual (Tajik default `/tj`, Russian `/ru`) marketing site for a cleaning, territory-upkeep and landscaping company. Next.js 16 · TypeScript strict · Tailwind 4 · shadcn/ui · Motion · Lucide · next-intl 4.

## Run
```bash
npm install
npm run dev        # http://localhost:3000 → /tj
npm run build && npm start
npm run typecheck && npm run lint && npm test
```

## Where things live
- `messages/tg.json`, `messages/ru.json` — every user-facing string (typed; missing keys fail `tsc`).
- `lib/site-config.ts` — company facts. Everything in `[BRACKETS]` is a placeholder to replace.
- `content/` — services, audiences, reasons, reviews, images (data only, text in messages).
- `components/sections/` — one folder per page section; `components/ui/` — vendored shadcn.
- `docs/` — research and phase documents, design specimen, Lighthouse reports, image credits.
- `DELIVERABLES.md` — full hand-over: sitemap, design system, architecture, audits, placeholders, asset list, roadmap.

## Deploy (Vercel)
Import the repository in Vercel with the Next.js preset; no environment variables are required. The `*.vercel.app` URL is detected automatically for canonical/OG/sitemap. When a custom domain is attached, set `NEXT_PUBLIC_SITE_URL` (see `.env.example`).
