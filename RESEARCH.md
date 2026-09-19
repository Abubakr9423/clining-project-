# RESEARCH.md — Cleaning & Facility-Service Website for Dushanbe / Tajikistan

**Date:** 19 September 2026
**Phase:** 1 (Competitor + Design Research). No code written.
**Evidence:** screenshots in `research-shots/` (desktop 1440px and mobile 390px captures, font render test).

---

## 1. Executive Summary

Fifteen live websites were inspected across the UK, USA, UAE, Russia, Kazakhstan, Uzbekistan and Tajikistan, plus five design galleries and the current documentation for the proposed UI stack. The strongest sites share six behaviours:

1. **The hero answers "what / for whom / where" in one glance and puts a request mechanism inside the hero.** TOP.kz (Almaty), CleaningMoscow and Qlean put a calculator or a phone-number field directly beside the headline. Conversion happens above the fold, not in a contact page.
2. **Proof replaces adjectives.** CleaningMoscow's subheadline is literally a list of client names. Cleanology puts a Google 4.7★ widget above the H1. Julius Rutherfoord shows 19 client logos and quotes attributed to organisations, not first names. The weak sites (NOOR SERVICE, NewCleaner, Emrill) open with slogans such as "Сервис чистоты" or "Redefining your places".
3. **Two-level service architecture.** Primex (Russia, since 1991) and ABM (USA) both split services into *indoor premises* vs *external territory / grounds*, exactly the split this brief asks for. Nobody in Tajikistan does this.
4. **Messenger-first contact in Central Asia.** Every CA site exposes WhatsApp or Telegram in the header; the Russian sites add Telegram/Max chips in the hero. Phone-only sites (NOOR, Safina) are the local norm and the local weakness.
5. **Per-m² price orientation with a disclaimer.** CA and RU sites show "от X за м²" and state prices are not final. Premium UK/UAE B2B sites show no prices and sell a consultation. For Dushanbe the middle path wins: a request-generating calculator, no invented prices (as the brief requires).
6. **Restraint reads as premium.** The best-looking sites (Cleanology, IC Group, JR&Co) use one accent colour, real staff photography, large type and almost no decorative motion. The Dribbble/Behance "cleaning landing page" genre (pastel mint, cut-out smiling cleaner, blob shapes, wavy dividers) is what makes a site look like a template and must be avoided.

**Local market in one sentence:** Dushanbe cleaning companies live on Instagram and phone calls; the few websites that existed have died (three of the five domains cited in 2021 press coverage no longer resolve), no one offers Tajik-language content, and no one positions indoor cleaning + territory + landscaping as a single contractor. The opportunity is not to be prettier; it is to be the only *credible, bilingual, maintained, messenger-connected* B2B option.

---

## 2. Competitor Research

Inspected in Chrome (desktop) and Playwright (390px mobile) on 19 Sep 2026. Screenshots: `research-shots/<name>-desktop.jpg`, `<name>-mobile.jpg`.

| Company | Country | Website | Audience | Strong points | Weak points |
|---|---|---|---|---|---|
| Cleanology | UK | cleanology.com | Facilities managers, corporates | Google 4.7★/500+ reviews above H1; 8 proof tiles (25 yrs, 1300+ staff, ISO 14001); testimonials attributed to organisations; sticky header with phone + lime pill CTA "Get a Free Quote"; real staff photos; footer repeats CTA | Cookie modal covers ⅓ of viewport; hero copy generic ("Award-winning experts"); ESG-heavy content before buyer questions; heavy page |
| Julius Rutherfoord & Co | UK | juliusrutherfoord.co.uk | Premium London offices, heritage, education | Distinct identity (plum + coral, serif logotype, tracked caps); B Corp badge in header; 19 client logos; 3 stats; testimonials with "client since 20xx" | Hero "The power of undivided attention" says nothing about what/where; no CTA above fold; light-grey body text fails contrast; news cards blank while loading (layout shift) |
| Emrill | UAE | emrill.com | Developers, IFM buyers | Big client logo wall (Emaar, Meraas, DIFC); services as 4 clear buckets (IFM / Hard FM / Soft FM / Security); award badges | Hero is a video that paints white for seconds (bad LCP); slogan "Redefining your places"; floating 5-icon side dock; stat counters render empty |
| Farnek | UAE | farnek.com | Aviation, banking, malls | Hard numbers (10,000+ staff, 3,000+ customers, 46 yrs, 2,500+ properties); sector list; 5 attributed testimonials | Hero slider grey on first paint; two phone numbers + email + hotline in three header rows; dated corporate template |
| ABM | USA | abm.com | Fortune-500 facilities | Two service buckets: Facility Solutions (cleaning, landscape, parking) vs Engineering; industries as photo tiles with icons; consultative CTA "Speak with the Experts" | No testimonials or logos on home; corporate scale not transferable |
| Molly Maid | USA | mollymaid.com | Homeowners | Mobile sticky 3-cell bar "Request a Free Quote / Call Us / Menu" (clearest mobile CTA seen); "Done Right Promise" guarantee block; single strong pink CTA | Desktop blocked by Cloudflare bot check in both browsers (only mobile capture obtained); residential only |
| Primex | Russia | primex.ru | B2B, industrial, franchising | Services in 3 tiers — Внутренние помещения / Внешняя территория (incl. озеленение, snow) / Инженерные системы; calculator fields identical to our brief (type, schedule, m², purpose, frequency); ISO 9001; 30+ logos; since 1991 | Slider hero with text card; purple circle icons; 2000s layout; too many nav items (franchising, training centre) |
| CleaningMoscow | Russia | cleaning-moscow.ru | Offices + apartments, Moscow | H1 "Клининг в Москве, которому доверяют" + subheadline = client names; phone field + "Оставить заявку" + Telegram/Max/Email chips in hero; stats "4619 уборок за 2025, 148 219 м²"; dual pricing (fixed residential / per-m² commercial) with disclaimer; 8:00–22:00, 7 days | Stock-photo cleaner with spray bottle; two header rows; orange on green palette is loud |
| Qlean | Russia | qlean.ru | Consumers, app | Price-led H1; booking widget by rooms; "входит в стоимость / можно добавить" checklists; 4.8/5 from 372k reviews; named cleaner profiles | Marketplace model, not B2B; slow to load (timed out in Playwright) |
| IC Group | Kazakhstan | ic-group.kz | Banks, retail chains, BCs | Restrained white layout, floating pill nav, huge display word, client logos in soft circular tiles (H&M, JTI, Home Credit); B2B vocabulary "аудит объекта, регламенты, SLA, отчётность" | H1 is an SEO string; hero text fades in so slowly the first paint is empty; no messenger buttons; no visible form |
| TOP.kz | Kazakhstan | top.kz | Homes + "Для бизнеса" | Best CA conversion pattern: benefit H1 "Самый легкий способ убраться дома", 3 inline stats, real photo of a local middle-aged cleaner in branded apron, live calculator card (Квартира/Дом/Офис tabs, steppers, type chips, price CTA + callback CTA), insurance badge, Kaspi instalments, WhatsApp in header, floating contact button | Four header rows; three floating bubbles on mobile; residential emphasis |
| NewCleaner | Uzbekistan | newcleaner.uz | Tashkent homes, offices, car dealers | Only CA site listing озеленение + facades alongside cleaning; "Оставить заявку" repeated; per-m² orientation prices; Telegram in nav; stats counters; 6 named reviews | H1 is a slogan ("профессионально, надежно и быстро!"); three header rows; blue template with cloud illustration; RU only |
| CleanSquad «Отряд Чистоты» | Uzbekistan | cleansquad.uz | Tashkent B2B + homes | Memorable personality (military-themed copy: "Пункт связи", "Об отряде"); corporate/residential split; free on-site estimate; Telegram + Instagram | No prices, no stats, no logos; copy is long; RU only |
| NOOR SERVICE | Tajikistan | noor-service.com | Dushanbe homes | Only functioning local premises-cleaning site; transparent "от 18/20/60 сомони" per m²; FAQ with real concerns ("что делать, если пропали вещи"); 3 reviews | AI-generated hero woman; caps-locked H1 "NOOR SERVICE / СЕРВИС ЧИСТОТЫ"; call is the only CTA (no WhatsApp/Telegram/form/map); RU only; footer typo "Все правы защищены"; residential focus |
| Safina Cleaning | Tajikistan | safina-cleaning.tj | Dushanbe carpet washing | Best-built local site: clear H1, feature card, 3 price tiers per m², "Как работаем", FAQ, calm cream palette | Carpets only; phone-only CTA; no messengers; RU only; no photos of team |

Also reviewed by text only (fetch): The Maids (US) — TLS certificate error; Dilite/ABClean/Cleanlab (KZ) — same pattern as TOP.kz, not separately documented.

---

## 3. Local Market Research (Dushanbe / Tajikistan)

Sources: Google, Mino.tj category listing, 2GIS.tj search, ASIA-Plus (2020, 2021), TopTJ (2021), Somon.tj, Facebook/Instagram handles surfaced in search. **No competitor below is invented; where a fact could not be verified it is marked "n/v".**

### 3.1 What exists

| Company | Web | Mobile | Services | Contact | Lang | Prices | Trust | Photos | Social | Notes |
|---|---|---|---|---|---|---|---|---|---|---|
| NOOR SERVICE | Tilda-style one-pager, works | Readable, single CTA | General, post-renovation, upholstery, housekeeper | Phone only | RU | Yes, per m² | 3 text reviews, FAQ | AI-generated | Mino.tj 5.0 (3) | Closest local analogue |
| Хонаи Солим (Khonai Solim) | **khonaisolim.tj dead (DNS)**; was live 2021 | — | General, office, post-renovation, carpets, Rainbow distributor since 2014 | Phone, Instagram @khonai.solim | RU | Was 12–18 с/м² carpets, 250–600 с/visit | "since 2014" | n/v | Instagram | Oldest brand; lost its website |
| Рахш Клининг | **rakhshcleaning.tj dead (DNS)** | — | General residential/commercial, carpets | Phone | RU | 10 с/м² carpets (2021) | — | n/v | n/v | |
| Restart Cleaning | none found | — | Homes, offices, upholstery, curtains | Phone (Mino.tj) | RU | n/v | Mino 5.0 (1): "самое дорогое оборудование в Таджикистане" | n/v | n/v | Equipment as selling point |
| Клининг плюс | none; Facebook page | — | Carpets, upholstery, homes/offices | Phone, card payment | RU | n/v | Mino 5.0 (2), "гарантия" | n/v | Facebook | |
| City Clean | none; Instagram @cityclean.tj (2.4k) | — | Facades, offices, apartments, express, post-renovation | Instagram, phone | RU | n/v | n/v | Instagram only | IG + FB | Only local facade cleaner found |
| Архидея Клининг | none live; a React/Tailwind/Framer one-pager exists as a GitHub repo (calculator + quiz) | — | Maintenance, general, post-renovation | n/v | RU | Real-time price calc in repo | 2GIS 5.0 (7) | n/v | n/v | Sign that a modern-stack local site is coming |
| Чидир Клининг | none; Instagram @chidir.cleaning | — | Post-renovation, express, general, curtains, staffing | Phone, Instagram | RU | "от 300 сомони/комната" (2021) | — | n/v | Instagram | |
| Toza-kor | none; Facebook | — | Cleaning company | n/v | RU/TJ name | n/v | — | n/v | Facebook | |
| Pchelka Cleaning | none; Instagram @pchelka.cleaning.tj | — | Cleaning | Instagram | RU | n/v | — | n/v | Instagram | |
| TOZALOGIA | none; 2GIS "Хадамоти тозакунӣ", Rudaki 55 | — | n/v | 2GIS | TJ name | n/v | — | n/v | n/v | Only Tajik-named brand found |
| Клининг центр (@cleaning.tj) | none | — | Apartments, houses, offices, commercial | Phone, Instagram | RU | 9 с/м² (2021), free inspection | — | n/v | Instagram | |
| Safina Cleaning | safina-cleaning.tj works | Good | Carpets, blankets | Phone | RU | 10/12/15 с/м² | "5+ лет", Turkish equipment | Product shots | n/v | Not a premises competitor |
| Carpet washers (Топ Тоза, Намад, Чаддид, Дельфин, Уютный дом/chistka.tj — cert expired, Deluxe Comfort/stirka.tj, Комфорт плюс, Pokiza Lux, Кристал) | mostly none | — | Carpet/blanket washing, pickup | Phone, IMO, WhatsApp | RU/TJ | 7–15 с/м² | Mino ratings 1.0–3.9 | — | Instagram | Reviews cite rude staff, missed pickups, damaged items |

### 3.2 What they commonly lack

- **A working website at all.** Of ~20 named operators, 2 have a functioning site for premises cleaning (NOOR, and Safina for carpets). Three domains from 2021 press are dead; one has an expired certificate.
- **Tajik language.** Every site and almost every Instagram is Russian only. Searching "ширкати тозакунӣ Душанбе" returns government documents and construction firms, not cleaners: **zero Tajik SEO competition**.
- **B2B positioning.** Offers are framed for apartments (квартира, ковры, домработница). No SLA, schedule, quality-control or reporting language. No "один подрядчик" for indoor + territory + greening.
- **Messenger CTAs on the web.** Phone is the only web CTA even though customers actually order via WhatsApp/IMO/Telegram.
- **Trust infrastructure.** No client logos, no equipment photos, no team photos, no process explanation, no maps, no legal entity name on the site.
- **Reliability.** Marketplace reviews show the market's real pain is not dirt; it is no-shows, rudeness and damaged property. "Ответственные сотрудники, предсказуемый сервис" is a differentiator here, not a cliché.

### 3.3 Opportunities to differentiate

1. Bilingual TJ/RU with Tajik default: instantly unique and captures an empty search space.
2. B2B framing: объекты, график, договор, контроль качества, один подрядчик — vocabulary borrowed from IC Group/Primex, absent locally.
3. Indoor + territory + landscaping in one offer: no local operator communicates this.
4. Request-generating calculator that opens a pre-filled WhatsApp/Telegram message: matches how Dushanbe actually orders, and no local site does it.
5. Real photography of equipment, uniforms and objects (NOOR uses AI imagery; everyone else has none).
6. A maintained, fast, HTTPS, indexable site with structured data: the bar is that low.

---

## 4. Design Gallery Findings

- **Awwwards.** Only two cleaning nominees exist: "Innovative Cleaning Services" (2022, industrial, full-screen horizontal layout, corporate blue) and "Eco Window Cleaning London" (2014). Both are dated. Lesson: there is no award-level benchmark in this vertical; premium here means editorial restraint, not effects.
- **Land-book.** A "cleaning" search returns unrelated sites (Cleanrooms, Erly, home renovation). The premium *service* sites on Land-book share: one accent colour, a large editorial headline, real photography, generous whitespace, a compact sticky header, pill buttons, and a repeated CTA block before the footer.
- **Godly.** Brand-led product sites; transferable principles: alternating light/dark blocks for rhythm, oversized type at hero and section starts, motion limited to fade/translate on entry.
- **Dribbble** (tag "cleaning service landing page") and **Behance** ("cleaning service website", "SENSIRE", Julia Orlova's "Website for Cleaning Services"). Highly homogeneous: pastel mint/sky palette, cut-out smiling cleaner with yellow gloves, blob backgrounds, 3–4 icon cards, wavy section dividers, gradient buttons. This is precisely the "template/AI" look the brief forbids. A few B2B FM concepts use deep green + photography and are closer to our direction.

Principles extracted (not assets): editorial type hierarchy; photography as the hero element; one accent used sparingly; proof placed next to claims; mobile CTA bar; calculators framed as "request", not "price".

---

## 5. Top 10 Design Patterns Worth Using (ranked for THIS project)

1. **Hero with an embedded request starter** (TOP.kz, CleaningMoscow, Qlean). Headline left, a compact card right: object type + area → "Получить расчёт" that scrolls to the calculator pre-filled, plus WhatsApp and Call buttons. Highest conversion impact.
2. **Proof in the subheadline / trust bar directly under the hero** (CleaningMoscow, Cleanology). Placeholder stats now; real client names later.
3. **Two-tier service architecture with tabs or two blocks** (Primex, ABM): «Внутренняя уборка» / «Территория и озеленение». Prevents the giant list.
4. **Mobile sticky action bar** (Molly Maid): three cells — Расчёт / WhatsApp / Позвонить — instead of stacked floating bubbles (TOP.kz's clutter).
5. **Attributed testimonials by organisation type + role** (Cleanology, JR&Co): "Управляющий БЦ", "Администратор клиники". Placeholders clearly marked until real ones exist.
6. **"Who we serve" as photo tiles with icons** (ABM industries grid): Офисы / Клиники / Магазины / Дома / Территории. Feels like a portfolio, not an icon grid.
7. **Process timeline with numbered steps** (Safina "Как работаем", Cleanology DNA): 4 steps, vertical on mobile.
8. **"What's included / can be added" checklists** (Qlean): use inside service card details and FAQ answers.
9. **Calculator that generates a message, with a disclaimer** (Primex fields + CleaningMoscow's "цены не являются окончательными"): our version outputs a WhatsApp/Telegram text, never a price.
10. **Restrained B2B logo/credential row** (IC Group circular tiles, JR&Co logo wall): reserved for later; ship as an easily-populated component with a placeholder state, hidden until real logos exist.

---

## 6. 10 Mistakes To Avoid (all observed in the sample)

1. AI-generated or stock cleaner photos (NOOR, CleaningMoscow) — instantly reads fake.
2. Slogan heroes: "Сервис чистоты", "Redefining your places", "The power of undivided attention" — no what/where/CTA.
3. Video or slider heroes that paint blank (Emrill, Farnek, IC Group's slow fade) — LCP and trust both suffer.
4. Three or four header rows (TOP.kz, NewCleaner, Farnek) — pushes the hero down on mobile.
5. Multiple floating bubbles (TOP.kz) or side icon docks (Emrill) — cover content; one mobile bar is enough.
6. Cookie modals covering the CTA (Cleanology, JR&Co) — we do not need a banner if we set no tracking cookies.
7. Light-grey body text (JR&Co) and caps-locked headings (NOOR) — contrast and readability.
8. Pastel-mint template aesthetic with blobs and wavy dividers (Dribbble genre) — looks like every other cleaning template.
9. Fake specificity: invented statistics, unnamed "Зебо К." reviews, unverifiable "лучшая компания" claims. Use marked placeholders.
10. Russian-only UI that overflows when translated — CA sites never test a second language; we must test TJ and RU at 375px.

---

## 7. Local Market Opportunity

A serious Dushanbe buyer (office manager, clinic administrator, retail chain, housing complex) today chooses between Instagram accounts and phone calls. The new site will feel different by being:

- **Bilingual, Tajik-first**: the only cleaning site in Tajikistan that speaks the state language correctly (verified glyphs ӣ ӯ қ ғ ҳ ҷ).
- **Institutional, not domestic**: headline about objects and territories, vocabulary of contracts, schedules and quality control; homes present but not the lead.
- **One contractor**: indoor cleaning, territory upkeep and greening in one offer — no local competitor communicates this.
- **Messenger-native**: every CTA leads to WhatsApp/Telegram with a pre-filled, structured request; phone remains one tap away.
- **Visibly real**: photographed equipment, uniforms and objects (placeholders until photos are supplied), a map, a legal name, an owner's name.
- **Calm and premium**: deep green used as accent on a warm off-white canvas, big readable type, minimal motion — the opposite of the mint-and-blobs template look.

---

## 8. UX Strategy — the visitor journey

1. **Landing (0–3 s):** headline states service + audience + city; sub states reliability; three actions visible: Получить расчёт (primary), WhatsApp (secondary), Позвонить (tertiary). Mobile: headline, one image, primary CTA, sticky bar.
2. **Understand the service (3–15 s):** trust bar with placeholder facts; two service blocks with 4–6 cards each; card opens details (what's included) without leaving the page.
3. **Self-identify (15–30 s):** "Кого обслуживаем" tiles — the visitor finds their object type and clicks through to the calculator with that type pre-selected.
4. **Trust (30–60 s):** 6 reasons, each tied to a concrete mechanism (equipment, chemistry, control, schedule, one contractor); process timeline shows predictability.
5. **Proof:** before/after slider and reviews (placeholder-marked) immediately before the ask.
6. **Estimate / request:** calculator builds a structured message; one tap sends it to WhatsApp or Telegram; nothing is "calculated" as a price.
7. **Contact:** phone, messengers, Instagram, address, map, working hours; footer repeats the primary CTA.

Every section ends with a small, consistent CTA row so the visitor never has to scroll back.

---

## 9. Conversion Strategy — where CTAs appear and why

| Location | CTA | Why |
|---|---|---|
| Header (sticky, both breakpoints) | Позвонить (desktop button + phone number); mobile: phone icon | Cleanology/TOP.kz pattern; call is still the trust channel for B2B decision-makers |
| Hero | Primary «Получить расчёт», secondary WhatsApp, tertiary call link | Three intents in the first screen; primary scrolls to calculator |
| After Services | «Не нашли услугу? Напишите нам» → WhatsApp | Captures non-standard requests (facade, snow, events) |
| After Who-we-serve tiles | Tile click → calculator with object type pre-selected | Reduces form friction (TOP.kz tabs) |
| After How-we-work | «Оставить заявку» | Process ends on step 01 «Заявка» — natural handoff |
| Calculator | «Отправить в WhatsApp» / «Отправить в Telegram» (both), optional name | The core conversion; message pre-filled in the active language |
| After Reviews / FAQ | Compact CTA band with phone + WhatsApp | Objection-handling sections need an exit |
| Contact | Tap-to-call, tap-to-chat, map, address | Actionable, no form required |
| Footer | Repeated primary CTA + messengers | Land-book pattern; last chance |
| Mobile sticky bar | Расчёт · WhatsApp · Позвонить (3 cells, safe-area aware) | Molly Maid pattern; replaces floating bubbles; hidden when calculator or footer is in view |

Rules: one primary colour for the primary CTA; WhatsApp green only on WhatsApp buttons; no more than one floating element on mobile; no pop-ups.

---

## 10. Final Design Direction

**Colours** (brand as given + minimal neutrals)
- Primary dark green `#0B3B34` — headings on light, dark section backgrounds, footer.
- Primary teal `#0F6B5C` — primary buttons, links, active states, icons.
- Mint `#E8F3F0` — subtle surfaces, badges, card hover, section tint (never full-page).
- White `#FFFFFF` — cards and content surfaces.
- Neutrals to add: canvas `#F7F7F4` (warm off-white, avoids "sea of green"), ink `#0E1A17` (body text on light), muted `#5C6B67` (secondary text), border `#DCE4E1`.
- Functional: WhatsApp `#25D366` (WhatsApp buttons only), Telegram `#229ED9` (Telegram buttons only), focus ring teal at 2px offset.
- Green is used in roughly 20% of the visual field: header CTA, section headings' eyebrows, icons, one dark band (Why us or Contact), footer.

**Typography** (rendered test, see `_font-tajik-test.png`)
- Manrope **rejected**: ӣ ӯ қ ғ ҳ ҷ fall back to a serif system font.
- Recommended: **Golos Text** for display/H1–H3 (Russian-designed, excellent Tajik glyphs, more character than Inter) + **Inter** for body/UI (verified glyphs, best small-size legibility). Noto Sans is the fallback candidate if Golos is rejected. Final decision confirmed with rendered Tajik copy in Phase 3.
- Scale (fluid, clamp): Display 44→64px / H1 36→56 / H2 28→40 / H3 20→24 / body 16→18 / small 14 / caption 12–13. Line-height 1.1 display, 1.5 body. Letter-spacing −0.02em on display only.

**Radius:** 10px inputs/buttons, 16px cards, 24px hero media, pill only for the header CTA and chips. No fully rounded cards everywhere.
**Spacing:** 4px base; section padding 64px mobile / 96–120px desktop; container 1200px max; 16px side gutter at 375px.
**Shadows:** one soft elevation `0 1px 2px rgba(11,59,52,.06), 0 8px 24px rgba(11,59,52,.08)` on hover/active cards only; default cards use a 1px border.
**Imagery:** real photography only — equipment, uniformed staff at work (faces optional), clean interiors, courtyards, planting. Until supplied: neutral placeholder blocks labelled `[PHOTO: описание]` with correct aspect ratios, swapped by changing `src`.
**Icon style:** Lucide, 1.75 stroke, 24px, teal on mint circle for service cards; no emoji, no 3D icons.
**Card style:** white on canvas, 1px border, 16px radius, icon → title → 1–2 lines → optional expand → text-link CTA; hover lifts 2px and reveals shadow.
**Button style:** primary teal fill / white text; secondary white with 1px green border; WhatsApp and Telegram branded fills with brand SVG; heights 48px mobile, 44px desktop; visible focus ring.
**Animation philosophy:** fade-up 12px / 300ms / ease-out on section entry with 60ms stagger; number tick once; before/after and cards respond to hover; nothing loops; all disabled under `prefers-reduced-motion`.
**Photography direction:** daylight, cool-neutral white balance, wide shots of objects (office floor, clinic corridor, shop, courtyard, flower beds), close-ups of professional machines and chemistry labels, staff in a consistent uniform, no posed thumbs-up.
**Desktop layout:** 12-column grid; hero 7/5 split (text/request card); services in 3-column cards; who-we-serve 5 tiles; process horizontal 4 steps; calculator 2-column (inputs / message preview).
**Mobile layout:** single column; hero text → image → CTAs; services as swipeable rows per category; process vertical with connecting line; calculator stacked with sticky send button; footer collapses into accordion groups.

---

## 11. Component Strategy

Versions checked with `npm view` on 19 Sep 2026: next 16.3.5, react 19.3.0, next-intl 4.14.5, tailwindcss 4.3.3, shadcn CLI 4.21.0, motion 13.4.0 (`framer-motion` is now an alias of `motion`; import from `motion/react`), lucide-react 1.47.0, embla-carousel-react 8.6.0.

### shadcn/ui (copied into `components/ui`, Radix primitives)

| Component | What | Where | Why it improves UX | Customisation |
|---|---|---|---|---|
| Button | Accessible button/link with variants | Everywhere | Consistent focus, sizes, disabled states | Add `whatsapp`, `telegram`, `ghostDark` variants; 48px mobile size |
| Sheet | Slide-in panel | Mobile navigation | Focus trap, ESC, scroll lock for free | Right-side, full height, language switch inside |
| Accordion | Expand/collapse list | FAQ, footer groups on mobile, service card details | Correct ARIA, keyboard | Chevron rotation, mint hover |
| Dialog | Modal | Service card "details" on desktop (optional), review full text | Accessible modal | Rounded 24, max-w 640 |
| Card | Surface | ServiceCard, WhyUsCard, AudienceCard, review card | Consistent padding/border | Remove default shadow, use border |
| Badge | Small label | «Placeholder», «Регулярно», category tags, TJ/RU chips | Scannable metadata | Mint/teal tones |
| Input / Label | Form field | Calculator area, name | Native validation, labels | Height 48, numeric inputmode |
| Select | Dropdown | Object type, frequency on desktop | Keyboard + screen-reader friendly | Use Radio Group / chips on mobile instead |
| Radio Group | Single choice | Frequency chips | Better than select for ≤5 options | Styled as chips |
| Checkbox | Multi choice | Extra services | Standard | Card-style checkboxes |
| Slider | Range | Area in m² (with numeric input twin) | Fast thumb input on mobile | Step 10, min 20, max 5000 |
| Tabs | Segmented views | Services categories (Внутренняя / Территория), calculator preview WA/TG | Keeps one section per concept | Underline style, keyboard arrows |
| Navigation Menu | Desktop nav | Header | Roving focus, no custom JS | Flat links only (no mega menu) |
| Separator | Divider | Footer, cards | Semantic hr | — |
| Tooltip | Hint | Placeholder stat explanations, icon-only buttons | Accessible labels for icons | Delay 200ms |
| Carousel (Embla) | Slider | Reviews | Touch, keyboard, RTL-safe, small | Dots + arrows, autoplay off |
| Sonner/Toast | Feedback | "Message copied" fallback when no WhatsApp app | Non-blocking feedback | — |

Not needed: Sidebar, Data Table, Command, Calendar, Chart, Drawer (Sheet covers it), Magic UI marquee, Aceternity parallax/hero-highlight.

### Motion (`motion/react`)
- `motion.*` + `whileInView` (once) for fade-up/stagger; `LazyMotion` with `domAnimation` to keep bundle small; `MotionConfig reducedMotion="user"` at the root; `useInView` + `animate()` for number ticking in TrustBar; `AnimatePresence` for Sheet/Dialog content only. No `useScroll` parallax.
- Before/After slider: custom component (pointer events + `input type="range"` for keyboard/screen readers) — Aceternity "Compare" was reviewed but is not accessible enough; write our own ~80 lines.

### Lucide (1.47 names verified against `lucide-react.d.ts`)
- Services: `SprayCan`, `Sparkles`, `Broom`, `Mop`, `BrushCleaning`, `Bubbles`, `GlassWater` (windows), `DoorOpen`, `PaintRoller` (post-renovation), `ShieldCheck` (sanitation), `Leaf`, `Sprout`, `TreeDeciduous`, `Trees`, `Shrub`, `Flower2`, `Fence`.
- Audiences: `Building` (offices; `Building2` no longer exists), `Hospital`, `Store`, `House` (`Home` renamed), `Landmark`, `Warehouse`.
- Why us / process: `BadgeCheck`, `ClipboardCheck`, `CalendarClock`, `Repeat`, `Users`, `Wrench`, `Layers`.
- Contact/UI: `Phone`, `MessageCircle`, `Send`, `Mail`, `MapPin`, `Clock`, `Languages`, `Menu`, `X`, `ChevronDown`, `ArrowRight`, `Check`.
- **Brand icons are not in Lucide** (Instagram removed; WhatsApp/Telegram never included): add three small inline SVGs in `components/icons/brand.tsx`.

### Other
- `next-intl` 4 with `[locale]` segment, `tj` default, `ru` secondary, messages in `messages/tj.json`, `messages/ru.json`; typed keys.
- `next/font/google` for Golos Text + Inter with `subsets: ['cyrillic-ext','cyrillic','latin']`, `display: swap`.
- No form backend in v1: the calculator produces `wa.me` / `t.me` deep links; optional `mailto` fallback. No cookies → no cookie banner.

---

## 12. Final Sitemap

Single-page marketing site with anchor navigation, two locales, plus utility routes.

```
/                      → redirect to /tj
/tj  /ru               → Home (all sections below, anchors)
  #services            Услуги / Хизматрасониҳо
  #why-us              Почему мы / Чаро мо
  #process             Как мы работаем / Тарзи кор
  #before-after        До / После
  #calculator          Расчёт / Ҳисоб
  #clients             Кого обслуживаем
  #reviews             Отзывы
  #faq                 Вопросы
  #contacts            Контакты
/tj/privacy /ru/privacy → short privacy notice (only if any personal data is processed)
/sitemap.xml  /robots.txt  /opengraph-image  /icon
```

Proposed section order for Phase 2 (changes from the brief explained):

1. Header
2. Hero (with request starter card)
3. Trust bar (placeholders)
4. Services — two tabs/blocks
5. **Who we serve** — moved up from 9th: B2B visitors self-identify early and jump to the calculator with their object type pre-selected (ABM/TOP.kz pattern)
6. Why us (6 reasons)
7. How we work (4 steps)
8. **Quote calculator** — placed right after the process, whose first step is «Заявка»; the calculator is the natural continuation
9. Before / After — proof placed next to reviews rather than before the calculator, keeping the ask uninterrupted
10. Reviews (placeholder-marked)
11. FAQ
12. Contact
13. Footer
+ Mobile sticky action bar (Расчёт · WhatsApp · Позвонить)

All copy in `messages/*.json`; all company facts as `[PLACEHOLDER]` constants in `lib/site-config.ts`.

---

### Appendix — evidence files
- `research-shots/*-desktop.jpg`, `*-mobile.jpg` — Cleanology, JR&Co, CleaningMoscow, Primex, TOP.kz, NewCleaner, NOOR, Molly Maid (mobile only).
- `research-shots/_sheet-mobile.jpg`, `_sheet-desktop.jpg` — contact sheets.
- `research-shots/_font-tajik-test.png` — Inter / Manrope / Noto Sans / Golos Text / Onest rendering «ӣ ӯ қ ғ ҳ ҷ».
