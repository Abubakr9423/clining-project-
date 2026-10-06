import { describe, expect, it } from "vitest";
import { MIN_ORDER, estimate, roundPrice } from "./pricing";

describe("estimate (demo tariffs)", () => {
  it("prices a one-off clean per m² with a ±15% range", () => {
    const e = estimate({ objectType: "office", area: 100, frequency: "once", extras: [] });
    // 100 m² × 8 TJS = 800 → 680…920
    expect(e.perVisit).toEqual([680, 920]);
    expect(e.monthly).toBeNull();
    expect(e.visitsPerMonth).toBeNull();
  });

  it("multiplies regular visits into a monthly total", () => {
    const e = estimate({ objectType: "office", area: 250, frequency: "severalPerWeek", extras: [] });
    // 250 × 1.6 × 1.2 = 480 per visit, × 12 visits = 5 760 / month
    expect(e.visitsPerMonth).toBe(12);
    expect(e.perVisit).toEqual([410, 550]);
    expect(e.monthly).toEqual([4900, 6600]);
  });

  it("applies the minimum order to tiny jobs", () => {
    const e = estimate({ objectType: "office", area: 10, frequency: "daily", extras: [] });
    expect(e.minOrderApplied).toBe(true);
    expect(e.perVisit[0]).toBe(roundPrice(MIN_ORDER * 0.85));
  });

  it("gives a volume discount on large objects", () => {
    expect(estimate({ objectType: "shop", area: 1200, frequency: "weekly", extras: [] }).volumeDiscount).toBe(0.1);
    expect(estimate({ objectType: "shop", area: 3000, frequency: "weekly", extras: [] }).volumeDiscount).toBe(0.15);
  });

  it("adds priced extras once and flags 'other' as quoted separately", () => {
    const e = estimate({ objectType: "home", area: 100, frequency: "once", extras: ["windows", "landscaping", "other"] });
    // 100 × 1.5 + 600 = 750 → 640…860
    expect(e.extras).toEqual([640, 860]);
    expect(e.extrasUnpriced).toBe(true);
  });

  it("rounds to price-like steps", () => {
    expect(roundPrice(437)).toBe(440);
    expect(roundPrice(4321)).toBe(4300);
    expect(roundPrice(12345)).toBe(12300);
  });
});
