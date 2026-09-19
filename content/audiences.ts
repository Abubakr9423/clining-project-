import type { LucideIcon } from "lucide-react";
import { Building, Fence, Hospital, House, Store } from "lucide-react";
import type { ObjectType } from "@/lib/quote-prefill";
import { images } from "./images";

export type AudienceKey = Exclude<ObjectType, "other">;

export const audiences: ReadonlyArray<{ key: AudienceKey; icon: LucideIcon; image: { src: string | null; caption: string } }> = [
  { key: "office", icon: Building, image: images.audience.office },
  { key: "clinic", icon: Hospital, image: images.audience.clinic },
  { key: "shop", icon: Store, image: images.audience.shop },
  { key: "home", icon: House, image: images.audience.home },
  { key: "territory", icon: Fence, image: images.audience.territory },
];
