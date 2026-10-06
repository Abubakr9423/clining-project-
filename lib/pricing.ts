import type { Extra, Frequency, ObjectType } from "./quote-prefill";

/**
 * DEMO pricing — illustrative rates in Tajik somoni (TJS), NOT the company's real tariff.
 * Calibrated loosely against public Dushanbe prices (one-off deep cleans ~18–60 TJS/m², see RESEARCH.md).
 * The UI labels every figure as an approximate demo estimate. Replace these tables with the real
 * price list before launch; the calculator, message and tests all read from here.
 */
export const DEMO_PRICING = true;

/** One-off general clean, TJS per m². */
const oneOffRate: Record<ObjectType, number> = {
  office: 8,
  clinic: 11,
  shop: 9,
  home: 10,
  territory: 2,
  other: 9,
};

/** Regular maintenance visit (daily schedule), TJS per m². */
const maintenanceRate: Record<ObjectType, number> = {
  office: 1.6,
  clinic: 2.4,
  shop: 1.8,
  home: 2.5,
  territory: 0.5,
  other: 1.8,
};

/** Rarer visits mean more dirt per visit, so the per-visit rate grows; visits per month for the monthly total. */
const schedule: Record<Exclude<Frequency, "once">, { multiplier: number; visitsPerMonth: number }> = {
  daily: { multiplier: 1, visitsPerMonth: 22 },
  severalPerWeek: { multiplier: 1.2, visitsPerMonth: 12 },
  weekly: { multiplier: 1.7, visitsPerMonth: 4 },
  monthly: { multiplier: 3, visitsPerMonth: 1 },
};

/** One-time add-ons: per m² of the object, or a flat fee. `other` is quoted separately. */
const extraPrice: Record<Exclude<Extra, "other">, { perM2?: number; flat?: number }> = {
  windows: { perM2: 1.5 },
  renovation: { perM2: 12 },
  sanitary: { perM2: 2.5 },
  territory: { flat: 400 },
  landscaping: { flat: 600 },
};

export const MIN_ORDER = 150;
/** ± spread around the point estimate: the real price depends on the inspection. */
const SPREAD = 0.15;

export type Range = readonly [low: number, high: number];

export type Estimate = {
  /** Price for one visit (after volume discount and minimum order). */
  perVisit: Range;
  /** Monthly total for regular schedules; null for a one-off clean. */
  monthly: Range | null;
  visitsPerMonth: number | null;
  /** One-time add-ons, null if none are priced. */
  extras: Range | null;
  /** True when "other" is selected — shown as "quoted separately". */
  extrasUnpriced: boolean;
  /** Volume discount applied to the per-visit price, 0–1. */
  volumeDiscount: number;
  /** True when the minimum order lifted the per-visit price. */
  minOrderApplied: boolean;
};

export type EstimateInput = { objectType: ObjectType; area: number; frequency: Frequency; extras: readonly Extra[] };

function volumeDiscountFor(area: number): number {
  if (area >= 3000) return 0.15;
  if (area >= 1000) return 0.1;
  return 0;
}

/** Rounds to a "price-like" step: 10 below 1 000, 50 below 10 000, 100 above. */
export function roundPrice(value: number): number {
  const step = value < 1000 ? 10 : value < 10000 ? 50 : 100;
  return Math.max(step, Math.round(value / step) * step);
}

const spread = (point: number): Range => [roundPrice(point * (1 - SPREAD)), roundPrice(point * (1 + SPREAD))];

export function estimate({ objectType, area, frequency, extras }: EstimateInput): Estimate {
  const volumeDiscount = volumeDiscountFor(area);
  const rate = frequency === "once" ? oneOffRate[objectType] : maintenanceRate[objectType] * schedule[frequency].multiplier;
  const raw = area * rate * (1 - volumeDiscount);
  const minOrderApplied = raw < MIN_ORDER;
  const visit = Math.max(raw, MIN_ORDER);

  const visitsPerMonth = frequency === "once" ? null : schedule[frequency].visitsPerMonth;

  let extrasTotal = 0;
  for (const extra of extras) {
    if (extra === "other") continue;
    const price = extraPrice[extra];
    extrasTotal += price.flat ?? (price.perM2 ?? 0) * area;
  }

  return {
    perVisit: spread(visit),
    monthly: visitsPerMonth === null ? null : spread(visit * visitsPerMonth),
    visitsPerMonth,
    extras: extrasTotal > 0 ? spread(extrasTotal) : null,
    extrasUnpriced: extras.includes("other"),
    volumeDiscount,
    minOrderApplied,
  };
}
