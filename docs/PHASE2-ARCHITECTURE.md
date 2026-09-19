# Phase 2 — Product & UX Architecture

**Date:** 19 September 2026
**Input:** RESEARCH.md (Phase 1, approved)
**Output:** page architecture, per-section content model, CTA map, calculator flow, translation schema, component tree. No UI code yet.

---

## 1. Product framing

| Question | Answer used across the site |
|---|---|
| What | Professional cleaning of premises + upkeep of adjacent territory + greening |
| For whom | Businesses and organisations first (offices, clinics, shops, housing complexes); private homes second |
| Where | Dushanbe and Tajikistan |
| Why us | One contractor, regular service under contract, modern equipment, professional chemistry, quality control, responsible staff |
| Primary conversion | A structured request sent via WhatsApp or Telegram |
| Secondary conversion | Phone call |

Positioning line (internal, not shown): *"The one contractor for a clean building and a tidy territory — reliably, on schedule."*

---

## 2. Page architecture (final order)

Single home page per locale with anchor navigation. Order follows Phase 1 section 12; the three changes from the original brief are marked ★.

| # | Section | Anchor | Job of the section | Ends with |
|---|---|---|---|---|
| 0 | Header (sticky) | — | Orientation, language, instant call | Call button |
| 1 | Hero | `#top` | Answer what / for whom / where in 3 seconds; start a request | Расчёт · WhatsApp · Call |
| 2 | Trust bar | — | Four placeholder facts (marked) | — |
| 3 | Services | `#services` | Two categories, 6 + 5 cards, expandable details | "Не нашли услугу?" → WhatsApp |
| 4 | ★ Who we serve | `#clients` | Self-identification; tile → calculator pre-filled | tile click |
| 5 | Why us | `#why-us` | Six concrete reasons | — |
| 6 | How we work | `#process` | 4-step timeline, predictability | "Оставить заявку" → calculator |
| 7 | ★ Quote calculator | `#calculator` | Build a request message; send to WA/TG | Send buttons |
| 8 | ★ Before / After | `#before-after` | Visual proof (placeholder images) | — |
| 9 | Reviews | `#reviews` | Social proof (placeholder-marked carousel) | — |
| 10 | FAQ | `#faq` | Objection handling | compact CTA band |
| 11 | Contact | `#contacts` | Tap-to-act contacts, map | — |
| 12 | Footer | — | Legal, links, languages, socials, owner | Repeated primary CTA |
| — | Mobile action bar | — | Расчёт · WhatsApp · Позвонить | — |

★ Rationale (from research): Who-we-serve early lets B2B visitors self-identify (ABM/TOP.kz); the calculator directly follows the process whose first step is «Заявка»; Before/After sits next to Reviews as proof rather than interrupting the ask.

---

## 3. Section content model

Each section lists: content blocks, copy structure (RU shown; TJ mirrors it; all strings live in `messages/*.json`), components, interactions, mobile behaviour. Copy below is a working draft for structure; final wording is Phase 5 and Tajik must be reviewed by a native speaker.

### 3.0 Header
- **Desktop:** Logo `[COMPANY NAME]` · Услуги · Почему мы · Как работаем · FAQ · Контакты · `TJ | RU` · **Позвонить** (button, `tel:[PHONE]`).
- **Mobile:** Logo · `TJ | RU` · phone icon button · menu button → Sheet with the same links, big call + WhatsApp buttons at the bottom.
- **Behaviour:** sticky; after 24px of scroll the header shrinks from 80→64px and gains a 1px bottom border + slight blur backdrop. No hide-on-scroll. Active anchor highlighted via IntersectionObserver.
- **Components:** `Header`, `Nav`, `LanguageSwitch`, `MobileMenu` (Sheet), `Button`.

### 3.1 Hero
- **Layout desktop:** 7/5 grid. Left: eyebrow, H1, sub, CTA row, micro-trust line. Right: image block (aspect 4:5) with a **request starter card** overlapping its bottom-left corner.
- **Copy structure:**
  - Eyebrow: none (Phase 3 review: all-caps eyebrows and dot-separated meta lines read as template chrome; the H1 already names the city)
  - H1 (RU draft): «Профессиональная уборка помещений и уход за территорией в Душанбе»
  - H1 (TJ draft): «Тозакунии касбии биноҳо ва нигоҳубини ҳудуд дар Душанбе»
  - Sub (RU draft): «Офисы, клиники, магазины, дома и прилегающие территории. Регулярное обслуживание по договору, современное оборудование и ответственные сотрудники.»
  - CTAs: **Получить расчёт** (primary → `#calculator`), **WhatsApp** (secondary, `wa.me/[WHATSAPP]?text=` short greeting), «Позвонить [PHONE]» (text link with icon).
  - Micro-trust line: three short items with check icons in a row (no dot separators): «Работаем по договору», «Помещения, территория и озеленение», «Выезд и расчёт [уточнить: бесплатно]».
- **Request starter card:** two controls — Тип объекта (chips: Офис / Клиника / Магазин / Дом / Территория / Другое) and Площадь, м² (numeric) + button «К расчёту» → scrolls to calculator with values applied (state lifted to a small store or URL hash params `#calculator?type=office&area=250`). Purpose: TOP.kz/CleaningMoscow pattern without duplicating the whole calculator.
- **Image:** `[PHOTO: сотрудник с поломоечной машиной в офисном коридоре]` placeholder; single `next/image`, priority, no carousel, no video.
- **Mobile:** eyebrow → H1 (34px display size) → sub → primary CTA full-width → WhatsApp + Call side by side → image (16:10) → starter card below image (not overlapping).
- **Motion:** headline/sub/CTAs fade-up stagger once; image fades in; nothing floats.

### 3.2 Trust bar
- Four stats, each `value` + `label`, values are placeholders: `[XX+] объектов`, `[XX] лет опыта`, `[XX+] специалистов`, `[XX] районов`. Rendered from `siteConfig.stats` with a `placeholder: true` flag that adds a subtle dashed underline + Tooltip «Данные будут обновлены» so nobody mistakes them for facts.
- Number ticking only when a value is numeric and not placeholder.
- Mobile: 2×2 grid.

### 3.3 Services
- **Structure:** Tabs (desktop & mobile) — «Внутренняя уборка» | «Территория и озеленение». Each tab = card grid.
- **Category 1 — Внутренняя уборка (6 cards):**
  1. Ежедневная уборка офисов и помещений — details: полы, поверхности, пыль, санузлы, вынос мусора.
  2. Периодическая / генеральная уборка — details: по графику (неделя/месяц), глубокая чистка.
  3. Клиники и медицинские учреждения — details: санитарная обработка, дезинфекция поверхностей, регламент.
  4. Магазины и торговые помещения — details: залы, витрины, полы с высокой проходимостью.
  5. Окна, двери, стеклянные поверхности — details: мойка окон, витрин, дверей, перегородок.
  6. Уборка после ремонта — details: строительная пыль, остатки растворов, финальная чистка.
  (Полы / поверхности / удаление пыли / санитарная обработка are folded into card details rather than separate cards, so the grid stays readable.)
- **Category 2 — Территория и озеленение (5 cards):**
  1. Уборка прилегающей территории
  2. Поддержание порядка (регулярный обход, мусор, урны, парковка)
  3. Уход за зелёными зонами (полив, стрижка газона, обрезка)
  4. Посадка деревьев
  5. Посадка цветов и клумбы
- **Card anatomy:** icon (Lucide in mint circle) · title · 1–2 line description · «Подробнее» toggle (Accordion-style inline expand on both breakpoints, no modal) · in expanded state: «Что входит» checklist + link «Рассчитать» → calculator with matching extra pre-checked where relevant.
- **Mobile:** cards stacked full width, 2 visible + «Показать все» expander per tab to keep the page short.
- **Section CTA:** «Не нашли нужную услугу? Напишите нам в WhatsApp — подберём решение.»

### 3.4 Who we serve
- Five tiles in a 5-column row (desktop) / 2+2+1 (tablet) / horizontal scroll-snap row (mobile): Офисы · Клиники · Магазины · Дома · Территории.
- Tile anatomy: photo placeholder (3:4) with gradient scrim, icon, title, one line of what is typical («Ежедневная уборка, окна, санузлы»), arrow. Click → `#calculator` with `type` set.
- Copy avoids claims («мы обслуживаем 40 клиник»); describes the typical scope instead.

### 3.5 Why us
- Six cards, 3×2 desktop, 1-column mobile. Each = icon + title + 2 sentences that name a mechanism, not an adjective:
  1. Современное оборудование — поломоечные машины, пылесосы, оборудование для окон и территории `[уточнить парк техники]`.
  2. Профессиональная химия — средства по типу поверхности, дозирование, безопасность для людей и покрытий.
  3. Ответственный подход — закреплённая бригада, форма, инструктаж, материальная ответственность по договору `[уточнить]`.
  4. Контроль качества — чек-листы по объекту, ответственный менеджер, обратная связь после каждого визита.
  5. Регулярное обслуживание — график под ваш режим работы, замена сотрудника без срыва уборки.
  6. Один подрядчик — помещения, территория и озеленение в одном договоре и одном счёте.
- Visual form (Phase 3 review): not cards and no numerals (the six reasons are not a sequence). A ruled list — each reason starts with a hairline rule, icon, title, two lines — laid out 3×2 on the dark-green band (`#0B3B34`), 1 column on mobile. Section heading sits in the left sticky column.

### 3.6 How we work
- Four steps, horizontal on desktop with a connecting line and numerals, vertical with a left rail on mobile:
  01 Заявка — по телефону, WhatsApp, Telegram или через расчёт на сайте.
  02 Выезд и расчёт — осмотр объекта, замеры, предложение по объёму и графику.
  03 Согласование графика — договор, состав работ, ответственные лица.
  04 Уборка и контроль качества — выполнение по чек-листу, отчёт, корректировки.
- Motion: steps reveal in sequence once in view; line draws with `pathLength` (disabled under reduced motion).
- Section CTA: «Оставить заявку» → calculator.

### 3.7 Quote calculator (request generator)
- Two-column desktop: left = form, right = live message preview card with tabs WhatsApp / Telegram and send buttons. Mobile: form stacked, preview collapsible, sticky «Отправить» row at bottom of the section.
- **Fields** (all required except extras and name):
  1. Тип объекта — chips (Radio Group): office / clinic / shop / home / territory / other.
  2. Площадь, м² — numeric Input + Slider twin (20–5000, step 10); for territory the label says «Площадь территории, м²».
  3. Частота — chips: once / daily / several-per-week / weekly / monthly.
  4. Дополнительно — Checkbox cards: windows / post-renovation / sanitary / territory / landscaping / other. (When type = territory, «territory» extra is hidden and «landscaping» promoted.)
  5. Имя (optional) — Input.
  6. Комментарий (optional, 200 chars) — Textarea.
- **Validation:** inline, on submit; message preview greys out until valid.
- **Output:** message text built in the active locale by `lib/quote-message.ts`:
  ```
  Здравствуйте! Хочу получить расчёт стоимости уборки.

  Тип объекта: офис
  Площадь: 250 м²
  Частота: 3 раза в неделю
  Дополнительные услуги: окна

  Имя: Далер
  Комментарий: —
  Язык: RU
  ```
  TJ variant: «Салом! Мехоҳам ҳисоби арзиши тозакуниро гирам. …»
- **Send:** `https://wa.me/[WHATSAPP]?text=<encoded>` and `https://t.me/[TELEGRAM]?text=<encoded>` (Telegram deep link falls back to opening the chat; the preview offers «Скопировать текст» with toast). No price is ever displayed; a note reads «Точную стоимость назовём после осмотра объекта».
- **State:** `useReducer` in `QuoteCalculator`; accepts initial values from hero starter / audience tiles via URL hash params, parsed once on mount.

### 3.8 Before / After
- One large comparison (16:9 desktop, 4:3 mobile) + optional 2 small thumbnails switching the pair. Placeholder pairs: офисный пол, окно/витрина, газон/клумба.
- **Component `BeforeAfterSlider`:** custom; pointer events for drag, `input type="range"` overlaid for keyboard (← → change by 2%, Home/End), `aria-label` «Сравнение до и после», labels «До» / «После» pinned to corners, clear vertical handle with grip icon. Touch-action `pan-y` so vertical page scroll still works.
- Caption: «Фотографии-заглушки. Будут заменены реальными снимками объектов [COMPANY NAME].»

### 3.9 Reviews
- Embla carousel, 1 card mobile / 2 tablet / 3 desktop, dots + arrows, no autoplay, keyboard accessible.
- Card: quote, author line = role + object type («Администратор, стоматологическая клиника»), city, and a visible Badge `[REVIEW PLACEHOLDER]`. Data from `content/reviews.ts` with `placeholder: true` per item; when replaced with real reviews the badge disappears automatically.
- No star ratings until real reviews exist.

### 3.10 FAQ
- Accordion, single-open, 6 items:
  1. Сколько стоит уборка? — зависит от площади, типа объекта, частоты и состава работ; расчёт после осмотра; «от»-цены не публикуем, чтобы не вводить в заблуждение.
  2. Как рассчитывается стоимость? — площадь × периодичность × перечень работ; выезд и расчёт бесплатно `[уточнить]`.
  3. Можно ли заказать регулярную уборку? — да, по договору с графиком; ежедневно / несколько раз в неделю / еженедельно.
  4. Работаете ли вы с офисами и организациями? — да, юрлица, договор, счета, закрывающие документы `[уточнить]`.
  5. Можно ли заказать уборку после ремонта? — да; что входит.
  6. Можно ли обслуживать территорию на постоянной основе? — да: уборка, порядок, уход за зелёными зонами, посадки.
- Structured data: `FAQPage` JSON-LD generated from the same messages.
- Followed by a compact CTA band: «Остались вопросы? Позвоните или напишите» + phone + WhatsApp.

### 3.11 Contact
- Two columns: left list with Lucide icons and tap targets — Телефон `[PHONE]` (tel:), WhatsApp `[WHATSAPP]`, Telegram `[TELEGRAM]`, Instagram `[INSTAGRAM]`, Адрес `[ADDRESS]`, Часы работы `[HOURS]`; right = `[MAP EMBED]` placeholder box (aspect 4:3) that becomes an iframe (lazy, `loading="lazy"`, only after click «Показать карту» to avoid third-party cost on load).
- No contact form in v1 (research: messengers convert; form needs a backend).

### 3.12 Footer
- Columns: (1) `[COMPANY NAME]`, owner «Musavvir Kamolov», `[GOAL STATEMENT]`; (2) Навигация: Услуги · Почему мы · Как работаем · FAQ · Контакты; (3) Контакты + socials (WhatsApp, Telegram, Instagram); (4) Языки TJ · RU.
- Bottom row: © year, `[COMPANY NAME]`, «Все права защищены», privacy link if applicable.
- Above the footer: full-width CTA band «Получить расчёт» (dark green).
- Mobile: columns collapse into Accordion groups; CTA band stays.

### 3.13 Mobile action bar
- Fixed bottom, 3 equal cells: Расчёт (→ `#calculator`), WhatsApp (brand green), Позвонить. Height 56px + `env(safe-area-inset-bottom)`. Hidden (translateY) while the calculator section or the footer is in the viewport, and when the mobile menu Sheet is open. Page gets bottom padding equal to bar height so nothing is covered.

---

## 4. CTA map (summary)

| Section | Primary | Secondary |
|---|---|---|
| Header | Позвонить | — |
| Hero | Получить расчёт | WhatsApp, Позвонить |
| Services | — | Написать в WhatsApp |
| Who we serve | Tile → calculator | — |
| How we work | Оставить заявку | — |
| Calculator | Отправить в WhatsApp | Отправить в Telegram, Скопировать |
| FAQ band | Позвонить | WhatsApp |
| Pre-footer band | Получить расчёт | — |
| Mobile bar | Расчёт | WhatsApp, Позвонить |

---

## 5. Translation schema (`messages/tj.json`, `messages/ru.json`)

Top-level namespaces mirror sections so keys are discoverable and typed:

```
common      { brand, call, whatsapp, telegram, getQuote, learnMore, close, menu, languageLabel, placeholderNote }
nav         { services, whyUs, process, faq, contacts }
hero        { eyebrow, title, subtitle, ctaPrimary, ctaWhatsapp, ctaCall, microTrust[3], starter: { objectType, area, submit } }
trust       { items: { objects, years, staff, districts } }        // labels only; values from siteConfig
services    { title, subtitle, tabs: { indoor, outdoor }, indoor: { items: { daily, periodic, clinics, shops, windows, renovation }: { title, desc, includes[] } }, outdoor: { items: { territory, order, green, trees, flowers } }, notFound, notFoundCta, more, less, calculate }
audience    { title, subtitle, items: { office, clinic, shop, home, territory }: { title, scope } }
whyUs       { title, subtitle, items: { equipment, chemistry, responsibility, quality, regular, oneContractor }: { title, desc } }
process     { title, subtitle, steps: { request, visit, schedule, work }: { title, desc }, cta }
calculator  { title, subtitle, fields..., objectTypes{}, frequencies{}, extras{}, name, comment, preview, sendWhatsapp, sendTelegram, copy, copied, noPrice, message: { greeting, objectType, area, frequency, extras, name, comment, language, none } }
beforeAfter { title, subtitle, before, after, sliderLabel, placeholderCaption, pairs: { floor, window, lawn } }
reviews     { title, subtitle, placeholderBadge, prev, next }
faq         { title, items: { price, calculation, regular, business, renovation, territory }: { q, a } , bandTitle }
contacts    { title, subtitle, phone, whatsapp, telegram, instagram, address, hours, showMap, mapPlaceholder }
footer      { owner, goal, navTitle, contactsTitle, langTitle, rights, privacy }
meta        { title, description, ogTitle, ogDescription }
a11y        { skipToContent, openMenu, closeMenu, switchLanguage, mainNav, sliderHandle }
```

Rules: no string in TSX; `useTranslations('section')` per component; ICU plurals for «объектов»; Tajik default locale `tj` (BCP-47 `tg`, used for `<html lang>` and `hreflang`), RU secondary; every key present in both files (checked by a script in Phase 6).

---

## 6. Site configuration (`lib/site-config.ts`)

```ts
export const siteConfig = {
  name: '[COMPANY NAME]',
  owner: 'Musavvir Kamolov',
  goalStatement: '[GOAL STATEMENT]',
  phone: '[PHONE]',            // display
  phoneHref: 'tel:[PHONE]',
  whatsapp: '[WHATSAPP]',      // digits only for wa.me
  telegram: '[TELEGRAM]',      // username
  instagram: '[INSTAGRAM]',
  address: '[ADDRESS]',
  hours: '[HOURS]',
  mapEmbedUrl: null,           // '[MAP EMBED]'
  stats: [
    { key: 'objects', value: null, placeholder: '[XX+]' },
    { key: 'years', value: null, placeholder: '[XX]' },
    { key: 'staff', value: null, placeholder: '[XX+]' },
    { key: 'districts', value: null, placeholder: '[XX]' },
  ],
  url: 'https://example.com', // set at deploy
} as const;
```
Every placeholder is grep-able by the bracket pattern so the final audit can list what still needs real data.

---

## 7. Component tree & folders

```
app/
  [locale]/
    layout.tsx           (fonts, html lang, providers, JSON-LD, skip link)
    page.tsx             (server: composes sections)
    privacy/page.tsx     (optional)
  sitemap.ts  robots.ts  opengraph-image.tsx  icon.tsx
components/
  layout/   Header, Nav, LanguageSwitch, MobileMenu, Footer, MobileActionBar, Container, Section, SectionHeading, CtaBand
  sections/ Hero, HeroStarterCard, TrustBar, ServicesSection, ServiceCard, AudienceSection, AudienceCard,
            WhyUsSection, WhyUsCard, ProcessTimeline, ProcessStep, QuoteCalculator (+ fields), QuotePreview,
            BeforeAfterSection, BeforeAfterSlider, ReviewsSection, ReviewCarousel, ReviewCard, FaqSection,
            ContactSection, ContactItem, MapEmbed
  ui/       shadcn: button, sheet, accordion, dialog, card, badge, input, textarea, label, select, radio-group,
            checkbox, slider, tabs, navigation-menu, separator, tooltip, carousel, sonner
  icons/    brand.tsx (WhatsApp, Telegram, Instagram SVGs), service-icons.ts (Lucide map)
  motion/   Reveal (whileInView wrapper), Stagger, CountUp, MotionProvider (LazyMotion + MotionConfig)
lib/        site-config.ts, quote-message.ts, quote-links.ts, anchors.ts, utils.ts, seo.ts (JSON-LD builders)
content/    services.ts, audiences.ts, why-us.ts, process.ts, reviews.ts, faq.ts, before-after.ts  (data + icon refs; text keys only)
messages/   tj.json, ru.json
i18n/       routing.ts, request.ts, navigation.ts
styles/     globals.css (tokens, Tailwind v4 @theme)
public/     placeholders/*.svg|jpg, favicon set, og fallback
```

Client components (only these): Header (scroll state), MobileMenu, LanguageSwitch (if it needs pathname), Tabs wrapper in Services, ServiceCard (expand), QuoteCalculator + fields, BeforeAfterSlider, ReviewCarousel, Accordion (FAQ), MapEmbed (click-to-load), MobileActionBar, motion wrappers. Everything else stays server-rendered.

Business logic separated: message building, link building, anchor/hash param parsing and JSON-LD builders live in `lib/` with unit tests; components only render.

---

## 8. Open items carried to next phases
- Phase 3: confirm Golos Text + Inter with rendered TJ/RU headings at 375/768/1440; define token file.
- Phase 4: Next 16 + Tailwind 4 + shadcn 4 + next-intl 4 setup; confirm `tg` vs `tj` locale code handling (URL uses `tj` for user familiarity, `lang="tg"` for standards).
- Phase 5: native-speaker review of Tajik copy before QA.
