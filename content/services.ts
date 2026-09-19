import type { LucideIcon } from "lucide-react";
import {
  Blinds,
  CalendarClock,
  ClipboardCheck,
  Fence,
  Flower2,
  PaintRoller,
  ShieldPlus,
  Sparkles,
  Sprout,
  Store,
  TreeDeciduous,
} from "lucide-react";
import type { Extra } from "@/lib/quote-prefill";

export type ServiceCategory = "indoor" | "outdoor";
export type IndoorServiceKey = "daily" | "periodic" | "clinics" | "shops" | "windows" | "renovation";
export type OutdoorServiceKey = "territory" | "order" | "green" | "trees" | "flowers";
export type ServiceKey = IndoorServiceKey | OutdoorServiceKey;

export type ServiceItem<K extends ServiceKey = ServiceKey> = {
  key: K;
  icon: LucideIcon;
  /** Extra pre-checked in the calculator when the visitor clicks "Рассчитать" on this card. */
  extra?: Extra;
};

export const indoorServices: ReadonlyArray<ServiceItem<IndoorServiceKey>> = [
  { key: "daily", icon: Sparkles },
  { key: "periodic", icon: CalendarClock },
  { key: "clinics", icon: ShieldPlus, extra: "sanitary" },
  { key: "shops", icon: Store },
  { key: "windows", icon: Blinds, extra: "windows" },
  { key: "renovation", icon: PaintRoller, extra: "renovation" },
];

export const outdoorServices: ReadonlyArray<ServiceItem<OutdoorServiceKey>> = [
  { key: "territory", icon: Fence, extra: "territory" },
  { key: "order", icon: ClipboardCheck, extra: "territory" },
  { key: "green", icon: Sprout, extra: "landscaping" },
  { key: "trees", icon: TreeDeciduous, extra: "landscaping" },
  { key: "flowers", icon: Flower2, extra: "landscaping" },
];
