/**
 * Image registry. `src: null` renders a labelled placeholder panel.
 *
 * Current photos are interim stock from Unsplash (Unsplash License: free for commercial use,
 * attribution appreciated — see docs/IMAGE-CREDITS.md). They stand in until the company's own
 * photography exists. To replace one: drop the file in /public/images and change `src` here.
 */
export type SiteImage = { src: string | null; caption: string; credit?: string; /** Optional landscape crop for phones/tablets. */ srcMobile?: string | null };
export type BeforeAfterPair = { before: string | null; after: string | null; caption: string; credit?: string };

export const images = {
  hero: {
    src: "/images/hero-corridor-cleaning.jpg",
    srcMobile: "/images/hero-corridor-cleaning-mobile.jpg",
    caption: "[PHOTO: сотрудник с поломоечной машиной в офисном коридоре]",
    credit: "Toon Lambrechts / Unsplash",
  } satisfies SiteImage,
  audience: {
    office: { src: "/images/audience-office.jpg", caption: "[PHOTO: офис]", credit: "Adolfo Félix / Unsplash" },
    clinic: { src: "/images/audience-clinic.jpg", caption: "[PHOTO: клиника]", credit: "Toon Lambrechts / Unsplash" },
    shop: { src: "/images/audience-shop.jpg", caption: "[PHOTO: магазин]", credit: "Ela De Pure / Unsplash" },
    home: { src: "/images/audience-home.jpg", caption: "[PHOTO: дом]", credit: "Minh Pham / Unsplash" },
    territory: { src: "/images/audience-territory.jpg", caption: "[PHOTO: территория]", credit: "Michael Kahn / Unsplash" },
  } satisfies Record<string, SiteImage>,
  /**
   * Illustrative stock pairs (two different locations each) — the UI labels them as such.
   * Replace with the company's own paired photos (same framing, same lens) as soon as they exist.
   */
  beforeAfter: {
    /** AI-generated pair: the same room before and after cleaning (the caption says so). */
    room: {
      before: "/images/ba-room-before.jpg",
      after: "/images/ba-room-after.jpg",
      caption: "[PHOTO: комната до/после — ИИ-иллюстрация]",
    },
    lawn: {
      before: "/images/ba-lawn-before.jpg",
      after: "/images/ba-lawn-after.jpg",
      caption: "[PHOTO: газон до/после]",
      credit: "James Read; Michael Smith / Unsplash",
    },
    renovation: {
      before: "/images/ba-renovation-before.jpg",
      after: "/images/ba-renovation-after.jpg",
      caption: "[PHOTO: пол до/после]",
      credit: "Emmanuel M; Craftsman Concrete Floors / Unsplash",
    },
  } satisfies Record<string, BeforeAfterPair>,
  /** AI-generated pair for the "wipe the glass" section — a different room from the slider on purpose. */
  wipe: {
    before: "/images/wipe-kitchen-dirty.jpg",
    after: "/images/wipe-kitchen-clean.jpg",
    caption: "[PHOTO: кухня до/после — ИИ-иллюстрация]",
  } satisfies BeforeAfterPair,
} as const;
