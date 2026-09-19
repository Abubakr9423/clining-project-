import type { LucideIcon } from "lucide-react";
import { BadgeCheck, CalendarClock, ClipboardCheck, Layers, SprayCan, Wrench } from "lucide-react";

export type WhyUsKey = "equipment" | "chemistry" | "responsibility" | "quality" | "regular" | "oneContractor";

export const whyUs: ReadonlyArray<{ key: WhyUsKey; icon: LucideIcon }> = [
  { key: "equipment", icon: Wrench },
  { key: "chemistry", icon: SprayCan },
  { key: "responsibility", icon: BadgeCheck },
  { key: "quality", icon: ClipboardCheck },
  { key: "regular", icon: CalendarClock },
  { key: "oneContractor", icon: Layers },
];
