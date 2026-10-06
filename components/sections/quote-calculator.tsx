"use client";

import { useEffect, useMemo, useReducer, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Check, Copy, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { TelegramIcon, WhatsAppIcon } from "@/components/icons/brand";
import { localeLabels, type AppLocale } from "@/i18n/routing";
import { telegramUrl, whatsappUrl } from "@/lib/links";
import { buildQuoteMessage } from "@/lib/quote-message";
import { MIN_ORDER, estimate as estimatePrice, type Range } from "@/lib/pricing";
import { onQuotePrefill, type Extra, type Frequency, type ObjectType, type QuotePrefill } from "@/lib/quote-prefill";
import { cn } from "@/lib/utils";

const objectTypes: ObjectType[] = ["office", "clinic", "shop", "home", "territory", "other"];
const frequencies: Frequency[] = ["once", "daily", "severalPerWeek", "weekly", "monthly"];
const allExtras: Extra[] = ["windows", "renovation", "sanitary", "territory", "landscaping", "other"];

const AREA_MIN = 10;
const AREA_MAX = 5000;

type State = {
  objectType: ObjectType;
  area: string;
  frequency: Frequency;
  extras: Extra[];
  name: string;
  comment: string;
  touched: boolean;
};

type Action =
  | { type: "set"; patch: Partial<Omit<State, "extras">> }
  | { type: "toggleExtra"; extra: Extra }
  | { type: "prefill"; values: QuotePrefill };

const initial: State = { objectType: "office", area: "", frequency: "severalPerWeek", extras: [], name: "", comment: "", touched: false };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "set":
      return { ...state, ...action.patch };
    case "toggleExtra":
      return {
        ...state,
        extras: state.extras.includes(action.extra) ? state.extras.filter((e) => e !== action.extra) : [...state.extras, action.extra],
      };
    case "prefill":
      return {
        ...state,
        ...(action.values.objectType ? { objectType: action.values.objectType } : {}),
        ...(action.values.area ? { area: String(action.values.area) } : {}),
        ...(action.values.frequency ? { frequency: action.values.frequency } : {}),
        ...(action.values.extras ? { extras: Array.from(new Set([...state.extras, ...action.values.extras])) } : {}),
      };
  }
}

const chip = (active: boolean) =>
  cn(
    "inline-flex min-h-10 cursor-pointer items-center rounded-full border px-3.5 text-[15px] transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-teal has-[:focus-visible]:ring-offset-2",
    active ? "border-forest bg-forest text-white" : "border-line bg-white text-ink hover:bg-mint",
  );

export function QuoteCalculator() {
  const t = useTranslations("calculator");
  const locale = useLocale() as AppLocale;
  const [state, dispatch] = useReducer(reducer, initial);
  const [copied, setCopied] = useState(false);

  useEffect(() => onQuotePrefill((values) => dispatch({ type: "prefill", values })), []);

  const areaNumber = Number.parseInt(state.area, 10);
  const areaValid = Number.isFinite(areaNumber) && areaNumber >= AREA_MIN && areaNumber <= AREA_MAX;
  const showAreaError = state.touched && !areaValid;
  const isTerritory = state.objectType === "territory";
  const extras = isTerritory ? allExtras.filter((e) => e !== "territory") : allExtras;

  const selectedExtras = useMemo(() => state.extras.filter((e) => extras.includes(e)), [state.extras, extras]);
  const quote = useMemo(
    () => (areaValid ? estimatePrice({ objectType: state.objectType, area: areaNumber, frequency: state.frequency, extras: selectedExtras }) : null),
    [areaValid, areaNumber, state.objectType, state.frequency, selectedExtras],
  );
  // Latin digits everywhere (Arabic/Persian would otherwise switch numeral systems mid-message).
  const formatRange = useMemo(() => {
    const nf = new Intl.NumberFormat(`${locale}-u-nu-latn`, { maximumFractionDigits: 0 });
    return ([low, high]: Range) => `${t("estimate.approx")} ${nf.format(low)}–${nf.format(high)} ${t("estimate.currency")}`;
  }, [locale, t]);
  const headline = quote ? (quote.monthly ? `${formatRange(quote.monthly)} ${t("estimate.perMonth")}` : `${formatRange(quote.perVisit)} ${t("estimate.oneOff")}`) : null;

  const message = useMemo(
    () =>
      buildQuoteMessage(
        {
          objectType: t(`objectTypes.${state.objectType}`),
          area: areaValid ? areaNumber : null,
          frequency: t(`frequencies.${state.frequency}`),
          extras: selectedExtras.map((e) => t(`extras.${e}`)),
          name: state.name,
          comment: state.comment,
          languageLabel: localeLabels[locale],
          estimate: headline && quote?.extras ? `${headline}; ${t("estimate.extras")}: + ${formatRange(quote.extras)}` : headline,
        },
        {
          greeting: t("message.greeting"),
          objectType: t("message.objectType"),
          area: t("message.area"),
          areaUnit: t("message.areaUnit"),
          frequency: t("message.frequency"),
          extras: t("message.extras"),
          name: t("message.name"),
          comment: t("message.comment"),
          language: t("message.language"),
          none: t("message.none"),
          estimate: t("message.estimate"),
        },
      ),
    [t, state, areaValid, areaNumber, selectedExtras, locale, headline, quote, formatRange],
  );

  const guard = (e: React.MouseEvent) => {
    if (!areaValid) {
      e.preventDefault();
      dispatch({ type: "set", patch: { touched: true } });
      document.getElementById("quote-area")?.focus();
    }
  };

  const copy = async () => {
    if (!areaValid) {
      dispatch({ type: "set", patch: { touched: true } });
      return;
    }
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      toast.success(t("copied"));
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable: the preview stays selectable */
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(300px,360px)] lg:items-start">
      <form className="space-y-8" onSubmit={(e) => e.preventDefault()} noValidate>
        <fieldset>
          <legend className="mb-3 text-sm font-medium">{t("fields.objectType")}</legend>
          <div className="flex flex-wrap gap-2">
            {objectTypes.map((type) => (
              <label key={type} className={chip(state.objectType === type)}>
                <input
                  type="radio"
                  name="quote-objectType"
                  value={type}
                  className="sr-only"
                  checked={state.objectType === type}
                  onChange={() => dispatch({ type: "set", patch: { objectType: type } })}
                />
                {t(`objectTypes.${type}`)}
              </label>
            ))}
          </div>
        </fieldset>

        <div>
          <Label htmlFor="quote-area" className="mb-3 block text-sm font-medium">
            {isTerritory ? t("fields.areaTerritory") : t("fields.area")}
          </Label>
          <div className="flex items-center gap-4">
            <Input
              id="quote-area"
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="250"
              value={state.area}
              aria-invalid={showAreaError || undefined}
              aria-describedby={showAreaError ? "quote-area-error" : undefined}
              onChange={(e) => dispatch({ type: "set", patch: { area: e.target.value.replace(/\D/g, "").slice(0, 5) } })}
              onBlur={() => dispatch({ type: "set", patch: { touched: state.touched || state.area.length > 0 } })}
              className="h-12 w-32 bg-white text-base"
            />
            <Slider
              thumbLabel={t("fields.area")}
              min={AREA_MIN}
              max={AREA_MAX}
              step={10}
              value={[areaValid ? areaNumber : AREA_MIN]}
              onValueChange={([v]) => dispatch({ type: "set", patch: { area: String(v ?? AREA_MIN) } })}
              className="flex-1 [&_[data-slot=slider-track]]:bg-white [&_[data-slot=slider-track]]:ring-1 [&_[data-slot=slider-track]]:ring-line"
            />
          </div>
          {showAreaError ? (
            <p id="quote-area-error" className="mt-2 text-sm text-danger">
              {t("errors.area")}
            </p>
          ) : null}
        </div>

        <fieldset>
          <legend className="mb-3 text-sm font-medium">{t("fields.frequency")}</legend>
          <div className="flex flex-wrap gap-2">
            {frequencies.map((f) => (
              <label key={f} className={chip(state.frequency === f)}>
                <input
                  type="radio"
                  name="quote-frequency"
                  value={f}
                  className="sr-only"
                  checked={state.frequency === f}
                  onChange={() => dispatch({ type: "set", patch: { frequency: f } })}
                />
                {t(`frequencies.${f}`)}
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="mb-3 text-sm font-medium">{t("fields.extras")}</legend>
          <div className="grid gap-2 sm:grid-cols-2">
            {extras.map((extra) => {
              const active = state.extras.includes(extra);
              return (
                <label
                  key={extra}
                  className={cn(
                    "flex cursor-pointer items-center gap-3 rounded-md border px-4 py-3 text-[15px] transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-teal has-[:focus-visible]:ring-offset-2",
                    active ? "border-teal bg-mint" : "border-line bg-white hover:bg-mint/60",
                  )}
                >
                  <input type="checkbox" className="sr-only" checked={active} onChange={() => dispatch({ type: "toggleExtra", extra })} />
                  <span
                    aria-hidden
                    className={cn("grid size-5 shrink-0 place-items-center rounded border", active ? "border-teal bg-teal text-white" : "border-line bg-white")}
                  >
                    {active ? <Check className="size-3.5" strokeWidth={3} /> : null}
                  </span>
                  {t(`extras.${extra}`)}
                </label>
              );
            })}
          </div>
        </fieldset>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <Label htmlFor="quote-name" className="mb-2 block text-sm font-medium">
              {t("fields.name")} <span className="font-normal text-slate">({t("fields.nameOptional")})</span>
            </Label>
            <Input id="quote-name" autoComplete="name" value={state.name} onChange={(e) => dispatch({ type: "set", patch: { name: e.target.value.slice(0, 60) } })} className="h-12 bg-white text-base" />
          </div>
          <div>
            <Label htmlFor="quote-comment" className="mb-2 block text-sm font-medium">
              {t("fields.comment")} <span className="font-normal text-slate">({t("fields.nameOptional")})</span>
            </Label>
            <Textarea
              id="quote-comment"
              rows={2}
              maxLength={200}
              placeholder={t("fields.commentPlaceholder")}
              value={state.comment}
              onChange={(e) => dispatch({ type: "set", patch: { comment: e.target.value } })}
              className="min-h-12 bg-white text-base"
            />
          </div>
        </div>
      </form>

      <div className="rounded-md border border-line bg-white p-5 lg:sticky lg:top-28">
        <section aria-live="polite" className="mb-5 rounded-md bg-mint p-4">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-sm font-semibold text-forest">{t("estimate.title")}</h3>
            <span className="inline-flex items-center gap-1 rounded-full bg-white px-2 py-0.5 text-[11px] font-medium text-teal">
              <Sparkles className="size-3" aria-hidden /> {t("estimate.demoBadge")}
            </span>
          </div>
          {quote && headline ? (
            <>
              <p className="mt-2 font-heading text-2xl font-extrabold tracking-tight text-forest tabular-nums">{headline}</p>
              <dl className="mt-3 space-y-1.5 text-sm">
                {quote.monthly && quote.visitsPerMonth ? (
                  <>
                    <div className="flex justify-between gap-4">
                      <dt className="text-slate">{t("estimate.perVisit")}</dt>
                      <dd className="text-end font-medium tabular-nums">{formatRange(quote.perVisit)}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-slate">{t("estimate.visitsPerMonth")}</dt>
                      <dd className="text-end font-medium tabular-nums">~{quote.visitsPerMonth}</dd>
                    </div>
                  </>
                ) : null}
                {quote.extras ? (
                  <div className="flex justify-between gap-4">
                    <dt className="text-slate">{t("estimate.extras")}</dt>
                    <dd className="text-end font-medium tabular-nums">+ {formatRange(quote.extras)}</dd>
                  </div>
                ) : null}
                {quote.volumeDiscount > 0 ? (
                  <div className="flex justify-between gap-4">
                    <dt className="text-slate">{t("estimate.volumeDiscount")}</dt>
                    <dd className="text-end font-medium tabular-nums">−{Math.round(quote.volumeDiscount * 100)}%</dd>
                  </div>
                ) : null}
                {quote.minOrderApplied ? (
                  <p className="text-[13px] text-slate">
                    {t("estimate.minOrder")}: {MIN_ORDER} {t("estimate.currency")}
                  </p>
                ) : null}
                {quote.extrasUnpriced ? <p className="text-[13px] text-slate">{t("estimate.extrasUnpriced")}</p> : null}
              </dl>
            </>
          ) : (
            <p className="mt-2 text-sm text-slate">{t("estimate.empty")}</p>
          )}
        </section>
        <h3 className="text-sm font-semibold text-forest">{t("preview")}</h3>
        <pre className={cn("mt-3 whitespace-pre-wrap font-body text-sm leading-relaxed text-ink", !areaValid && "text-slate")}>{message}</pre>
        <div className="mt-5 flex flex-col gap-2">
          <Button asChild size="xl" variant="whatsapp" aria-disabled={!areaValid}>
            <a href={whatsappUrl(message)} target="_blank" rel="noopener" onClick={guard}>
              <WhatsAppIcon /> {t("sendWhatsapp")}
            </a>
          </Button>
          <Button asChild size="xl" variant="telegram" aria-disabled={!areaValid}>
            <a href={telegramUrl(message)} target="_blank" rel="noopener" onClick={guard}>
              <TelegramIcon /> {t("sendTelegram")}
            </a>
          </Button>
          <Button type="button" size="xl" variant="quiet" onClick={copy} className="justify-center">
            {copied ? <Check /> : <Copy />} {copied ? t("copied") : t("copy")}
          </Button>
        </div>
      </div>
    </div>
  );
}
