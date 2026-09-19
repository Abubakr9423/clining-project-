# Phase 3 — Visual Design System

**Date:** 19 September 2026
**Evidence:** `docs/design-system/specimen.html` rendered at 1440 / 768 / 375 (`research-shots/_ds-*.jpg`), Tajik glyph test (`research-shots/_font-tajik-test.png`).

## 1. Direction in one paragraph

A light, cool, very clean canvas with deep forest-green typography; teal appears only where the visitor can act. One family carries the voice (Golos Text, heavy and tight) and one carries the reading (Inter). Layout is left-aligned and editorial: on desktop every section puts its heading in a narrow left column and its content on the right, so the page reads like a well-set brochure rather than a stack of centred blocks. Green occupies roughly a fifth of the visual field (one dark band, the footer, the primary buttons, icons). No gradients, no glass, no blobs, no cream, no terracotta.

## 2. Colour tokens

| Token | Hex | Use | Contrast notes |
|---|---|---|---|
| `forest` | `#0B3B34` | Headings, dark band (Why us), footer, secondary-button border, active chips | white on forest 12.6:1 |
| `teal` | `#0F6B5C` | Primary buttons, links, icons, focus ring, active nav | white on teal 6.4:1; teal on canvas 6.0:1 |
| `teal-hover` | `#0C5A4D` | Primary hover/pressed | — |
| `mint` | `#E8F3F0` | Icon circles, chip hover, tinted panels, selected state background | forest on mint 11.5:1 |
| `mint-deep` | `#D3E7E1` | Placeholder image fill, subtle dividers on mint | — |
| `canvas` | `#F3F6F5` | Page background | ink on canvas 15:1 |
| `white` | `#FFFFFF` | Cards, inputs, header | — |
| `ink` | `#14201D` | Body text | — |
| `slate` | `#4A5954` | Secondary text, captions | on white 7.4:1, on canvas 6.8:1, on mint 6.5:1 (darkened from #56655F after the axe scan flagged 18px lead text on tinted bands) |
| `line` | `#D5E0DC` | Borders, rules, input borders | decorative only |
| `whatsapp` | `#25D366` | WhatsApp buttons only (white text is 2.0:1 — use `ink` text on WhatsApp buttons, or forest icon; decided: **forest text `#0B3B34` on WhatsApp green, 7.9:1**) | |
| `telegram` | `#2AABEE` | Telegram buttons only (white text 2.6:1 → **use forest text as well**) | |
| `danger` | `#B3261E` | Validation errors | on white 6.6:1 |

Dark-band text: white for headings, `rgba(255,255,255,.72)` for body (≈ 8:1 on forest), rules `rgba(255,255,255,.18)`.

## 3. Typography

**Families (rendered and verified with ӣ ӯ қ ғ ҳ ҷ):**
- Display / headings: **Golos Text** 700–800, `cyrillic-ext` subset. Chosen over Inter for headings because it has a distinct, slightly condensed Cyrillic that gives the page its voice; over Noto Sans because Noto is the "system default" look.
- Body / UI: **Inter** 400–600. Chosen for small-size legibility in forms and dense text.
- **Manrope rejected** (Tajik glyphs fall back to serif). Fallback stack: `system-ui, -apple-system, "Segoe UI", Roboto, sans-serif`.
- Loading: `next/font/google`, `display: 'swap'`, `subsets: ['cyrillic-ext','cyrillic','latin']`, variable CSS properties `--font-display`, `--font-body`. Two families ≈ 4 woff2 files on first load.

**Scale (fluid, measured so the longest RU/TJ words fit at 375px; content width there = 343px):**

| Role | Size | Weight | Line-height | Tracking | Notes |
|---|---|---|---|---|---|
| Display (hero H1 only) | `clamp(2.125rem, 1.1rem + 4vw, 3.75rem)` = 34→60px | 800 | 1.02 | −0.03em | «Профессиональная» = 320px at 34px (fits 343px) |
| H1 | `clamp(2rem, 1.3rem + 2.6vw, 3.25rem)` = 32→52px | 700 | 1.08 | −0.02em | |
| H2 | `clamp(1.75rem, 1.35rem + 1.3vw, 2.375rem)` = 28→38px | 700 | 1.12 | −0.015em | section titles |
| H3 | `clamp(1.25rem, 1.15rem + .35vw, 1.5rem)` = 20→24px | 600 | 1.25 | −0.01em | card titles |
| Lead | 18px | 400 | 1.5 | 0 | colour slate, max 60ch |
| Body | `clamp(1rem, .96rem + .15vw, 1.0625rem)` = 16→17px | 400 | 1.55 | 0 | max 68ch |
| Small | 14px | 400/500 | 1.5 | 0 | meta, card descriptions on dark |
| Caption | 13px | 400 | 1.45 | 0 | placeholder notes, form hints |
| Button | 16px | 600 | 1 | 0 | never uppercase |
| Step numeral | 14px | 700 Golos | 1 | 0 | only in the 4-step process |

Rules: `text-wrap: balance` on headings; `hyphens: auto` with correct `lang` as a safety net for RU/TJ long words; no all-caps labels; no single-word colour accents inside headings; sentence case everywhere.

## 4. Spacing, grid, radius, elevation

- Base unit 4px; spacing scale 4 / 8 / 12 / 16 / 20 / 24 / 32 / 40 / 48 / 64 / 80 / 96 / 112.
- Container 1200px; gutters `clamp(16px, 4vw, 32px)`; 12-column grid, gaps 24px (mobile) / 32px (desktop).
- Section vertical padding `clamp(72px, 6vw + 40px, 112px)`; heading-to-content gap 40px desktop / 24px mobile.
- Editorial split: heading column `4/12`, content `8/12` at ≥1024px; heading sticky at `top: 96px`. Below 1024px the columns stack.
- Radius: `sm` 8px (buttons, inputs, chips are pills 999px), `md` 12px (cards, tiles), `lg` 20px (hero image, before/after frame, map). No radius on section bands or the footer.
- Elevation: default cards have a 1px `line` border and no shadow. One shadow token for hover/active and overlays: `0 1px 2px rgba(11,59,52,.05), 0 10px 30px -12px rgba(11,59,52,.18)`. Hover lift 2px, 150ms.
- Focus: `outline: 2px solid teal; outline-offset: 3px` on every interactive element; never removed.

## 5. Components (visual rules)

- **Buttons:** height 48px mobile / 44px desktop, padding 0 20px, radius 8px, icon 20px left of label, gap 10px. Primary: teal fill, white text. Secondary: white fill, 1px forest border, forest text. Quiet: forest text, underline in `line` colour, offset 4px. WhatsApp / Telegram: brand fill with **forest text and icon** (contrast). Disabled: 40% opacity, no pointer.
- **Chips (radio/selection):** pill, 40px, 1px line border, white; selected = forest fill, white text; hover = mint fill.
- **Inputs:** 48px, white, 1px line border, radius 8px, label above (14px, 500), hint below (13px slate), error = danger border + text. Numeric inputs use `inputmode="numeric"`.
- **Cards (services, audiences, reviews):** white, 1px border, radius 12px, padding 24px; icon in 44px mint circle with teal glyph; title H3; description slate; expandable area separated by a 1px rule. Audience tiles: image 3:4 with a forest gradient scrim from 40% to 85%, white title, radius 12px.
- **Why-us list (dark band):** hairline rule top, 24px icon in white, H3 white, body 15px at 72% white; 3×2 grid, 32px row gap.
- **Process:** 4 columns with a 1px line running behind the numerals; numeral in teal; vertical rail on mobile.
- **Before/After:** 20px radius frame, 2px white divider, 44px circular handle (white, forest grip icon, shadow token), corner labels «До» / «После» in 13px on a forest 70% pill.
- **Header:** 80px → 64px on scroll, white at 92% with `backdrop-filter: blur(8px)`, 1px bottom line when scrolled; logo left, nav centre-left, `TJ | RU` as two quiet text buttons with the active one in forest 700, call button primary.
- **Mobile action bar:** 56px + safe-area, white, top line; three cells with 20px icons above 12px labels; the WhatsApp cell has a mint background.
- **Placeholders:** any placeholder value renders with a dashed underline in `line` colour and a Tooltip; placeholder images are `mint-deep` panels with a 1px dashed `line` border and a 13px slate caption starting with `[PHOTO: …]`.

## 6. Iconography

Lucide, 24px, `strokeWidth 1.75`, `absoluteStrokeWidth`. Colour teal on light, white on dark. Service icons sit in mint circles; UI icons are inline with text. Brand marks (WhatsApp, Telegram, Instagram) are custom 24px SVGs with the same stroke feel (single colour, currentColor).

## 7. Imagery

- Real photographs only, daylight, cool-neutral white balance, wide framing of the object, people mid-task in a consistent uniform. Crops: hero 4:5 (desktop) / 16:10 (mobile); audience tiles 3:4; before/after 16:9 (desktop) / 4:3 (mobile).
- Until supplied: placeholder panels as above; the code references `public/placeholders/*.svg` through a single `images.ts` map so swapping requires only new files and alt text.
- No AI-generated people, no stock spray-bottle-smile imagery, no decorative illustrations.

## 8. Motion

- One orchestrated entrance in the hero: headline, lead, buttons and image fade + rise 12px, 400ms, 60ms stagger, ease `[.2,.7,.2,1]`. Runs once.
- Section headings fade + rise 8px when they enter view (once). Content inside sections does **not** animate in; cards simply exist.
- Number tick in the trust bar only for real numeric values.
- Process line draws (`pathLength` 0→1, 600ms) once in view.
- Interaction feedback: card hover lift 2px / shadow 150ms; button background 120ms; accordion height 200ms; before/after handle follows the pointer without easing; carousel slide 300ms.
- `prefers-reduced-motion: reduce`: all entrances and the line draw are disabled (elements render in their final state), hover lift removed, carousel uses instant slide. Implemented via `MotionConfig reducedMotion="user"` plus a CSS media query for non-Motion transitions.

## 9. Tailwind v4 theme mapping (to be placed in `styles/globals.css` in Phase 5)

```css
@theme {
  --color-forest: #0B3B34; --color-teal: #0F6B5C; --color-teal-hover: #0C5A4D;
  --color-mint: #E8F3F0; --color-mint-deep: #D3E7E1; --color-canvas: #F3F6F5;
  --color-ink: #14201D; --color-slate: #4A5954; --color-line: #D5E0DC;
  --color-whatsapp: #25D366; --color-telegram: #2AABEE; --color-danger: #B3261E;
  --font-display: var(--font-golos), system-ui, sans-serif;
  --font-body: var(--font-inter), system-ui, sans-serif;
  --text-display: clamp(2.125rem, 1.1rem + 4vw, 3.75rem);
  --text-h1: clamp(2rem, 1.3rem + 2.6vw, 3.25rem);
  --text-h2: clamp(1.75rem, 1.35rem + 1.3vw, 2.375rem);
  --text-h3: clamp(1.25rem, 1.15rem + .35vw, 1.5rem);
  --text-body: clamp(1rem, .96rem + .15vw, 1.0625rem);
  --radius-sm: 8px; --radius-md: 12px; --radius-lg: 20px;
  --shadow-lift: 0 1px 2px rgba(11,59,52,.05), 0 10px 30px -12px rgba(11,59,52,.18);
  --spacing-section: clamp(72px, 6vw + 40px, 112px);
  --container-site: 1200px;
}
```
shadcn's semantic tokens map onto these: `--primary: teal`, `--primary-foreground: white`, `--background: canvas`, `--foreground: ink`, `--muted: mint`, `--muted-foreground: slate`, `--border: line`, `--ring: teal`, `--card: white`, `--destructive: danger`.

## 10. Checks performed

- Overflow at 375 / 768 / 1440: none after the scale adjustment (see run log in the Phase 3 report).
- Tajik glyphs render natively in Golos Text and Inter at all weights used.
- Longest words measured: «Профессиональная» 320px, «масъулиятшинос» 280px, «Хизматрасониҳо» 279px at the mobile display size; body 17px longest word 147px.
- Colour contrast: all text pairs listed above meet WCAG AA; brand-button text switched to forest for that reason.
