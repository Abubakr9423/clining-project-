/**
 * Reviews. Every entry with `placeholder: true` renders a visible [REVIEW PLACEHOLDER] badge.
 * Replace with real, permissioned reviews: set placeholder to false and fill the text per locale.
 */
export type Review = {
  id: string;
  placeholder: boolean;
  /** Translation key under `reviews.items`. */
  key: "r1" | "r2" | "r3" | "r4";
};

export const reviews: ReadonlyArray<Review> = [
  { id: "r1", key: "r1", placeholder: true },
  { id: "r2", key: "r2", placeholder: true },
  { id: "r3", key: "r3", placeholder: true },
  { id: "r4", key: "r4", placeholder: true },
];
