/**
 * Tiny event bus that lets the hero starter card and the audience tiles
 * pre-fill the calculator without a global store or a dependency.
 */
export type ObjectType = "office" | "clinic" | "shop" | "home" | "territory" | "other";
export type Frequency = "once" | "daily" | "severalPerWeek" | "weekly" | "monthly";
export type Extra = "windows" | "renovation" | "sanitary" | "territory" | "landscaping" | "other";

export type QuotePrefill = Partial<{ objectType: ObjectType; area: number; frequency: Frequency; extras: Extra[] }>;

const EVENT = "quote:prefill";

export function prefillQuote(values: QuotePrefill, scrollTargetId = "calculator") {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent<QuotePrefill>(EVENT, { detail: values }));
  document.getElementById(scrollTargetId)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function onQuotePrefill(handler: (values: QuotePrefill) => void): () => void {
  const listener = (e: Event) => handler((e as CustomEvent<QuotePrefill>).detail);
  window.addEventListener(EVENT, listener);
  return () => window.removeEventListener(EVENT, listener);
}
