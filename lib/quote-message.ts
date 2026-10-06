/** Labels come from the active locale's messages so the text is readable by the person who receives it. */
export type QuoteLabels = {
  greeting: string;
  objectType: string;
  area: string;
  areaUnit: string;
  frequency: string;
  extras: string;
  name: string;
  comment: string;
  language: string;
  none: string;
  /** Label for the calculator's approximate price line (optional for older callers). */
  estimate?: string;
};

export type QuoteInput = {
  objectType: string;
  /** null when the visitor has not entered a valid area yet. */
  area: number | null;
  frequency: string;
  extras: string[];
  name?: string;
  comment?: string;
  languageLabel: string;
  /** Pre-formatted approximate price, e.g. "≈ 1 200–1 600 сом. в месяц". Omitted when unknown. */
  estimate?: string | null;
};

/**
 * Builds the plain-text request that is handed to WhatsApp / Telegram.
 * Pure function so it can be unit-tested and reused for the "copy" fallback.
 */
export function buildQuoteMessage(input: QuoteInput, l: QuoteLabels): string {
  const name = input.name?.trim() ?? "";
  const comment = input.comment?.trim() ?? "";
  const extras = input.extras.length > 0 ? input.extras.join(", ") : l.none;

  const lines: string[] = [
    l.greeting,
    "",
    `${l.objectType}: ${input.objectType}`,
    `${l.area}: ${input.area === null ? l.none : `${Math.round(input.area)} ${l.areaUnit}`}`,
    `${l.frequency}: ${input.frequency}`,
    `${l.extras}: ${extras}`,
  ];
  if (input.estimate && l.estimate) lines.push(`${l.estimate}: ${input.estimate}`);
  lines.push("");
  if (name) lines.push(`${l.name}: ${name}`);
  if (comment) lines.push(`${l.comment}: ${comment}`);
  lines.push(`${l.language}: ${input.languageLabel}`);
  return lines.join("\n");
}
