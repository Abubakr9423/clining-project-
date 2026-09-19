import { href, type AnchorKey } from "@/lib/anchors";

export type NavKey = "services" | "whyUs" | "process" | "faq" | "contacts";

export const navItems: ReadonlyArray<{ key: NavKey; anchor: AnchorKey }> = [
  { key: "services", anchor: "services" },
  { key: "whyUs", anchor: "whyUs" },
  { key: "process", anchor: "process" },
  { key: "faq", anchor: "faq" },
  { key: "contacts", anchor: "contacts" },
];

export const navHref = (anchor: AnchorKey) => href(anchor);
