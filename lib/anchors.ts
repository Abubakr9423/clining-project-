/** Section ids used by the header nav, CTAs and the mobile action bar. */
export const anchors = {
  top: "top",
  services: "services",
  clients: "clients",
  whyUs: "why-us",
  process: "process",
  wipe: "try-it",
  calculator: "calculator",
  beforeAfter: "before-after",
  reviews: "reviews",
  faq: "faq",
  contacts: "contacts",
} as const;

export type AnchorKey = keyof typeof anchors;
export const href = (key: AnchorKey) => `#${anchors[key]}`;
