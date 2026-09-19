"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { prefillQuote, type ObjectType } from "@/lib/quote-prefill";
import { cn } from "@/lib/utils";

const types: ObjectType[] = ["office", "clinic", "shop", "home", "territory", "other"];

export function HeroStarterCard({ className }: { className?: string }) {
  const t = useTranslations("hero.starter");
  const tt = useTranslations("calculator.objectTypes");
  const [objectType, setObjectType] = useState<ObjectType>("office");
  const [area, setArea] = useState("");

  return (
    <form
      className={cn("rounded-md border border-line bg-white p-5 shadow-lift", className)}
      onSubmit={(e) => {
        e.preventDefault();
        const parsed = Number.parseInt(area, 10);
        prefillQuote({ objectType, ...(Number.isFinite(parsed) && parsed > 0 ? { area: parsed } : {}) });
      }}
    >
      <fieldset>
        <legend className="mb-2 text-sm font-medium text-ink">{t("objectType")}</legend>
        <div className="flex flex-wrap gap-2">
          {types.map((type) => {
            const active = type === objectType;
            return (
              <label
                key={type}
                className={cn(
                  "inline-flex h-9 cursor-pointer items-center rounded-full border px-3 text-sm transition-colors",
                  active ? "border-forest bg-forest text-white" : "border-line bg-white text-ink hover:bg-mint",
                )}
              >
                <input
                  type="radio"
                  name="objectType"
                  value={type}
                  checked={active}
                  onChange={() => setObjectType(type)}
                  className="sr-only"
                />
                {tt(type)}
              </label>
            );
          })}
        </div>
      </fieldset>
      <div className="mt-4 flex items-end gap-3">
        <div className="flex-1">
          <Label htmlFor="starter-area" className="mb-2 block text-sm font-medium">
            {t("area")}
          </Label>
          <Input
            id="starter-area"
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder="250"
            value={area}
            onChange={(e) => setArea(e.target.value.replace(/\D/g, ""))}
            className="h-11 bg-white text-base"
          />
        </div>
        <Button type="submit" size="xl">
          {t("submit")} <ArrowRight />
        </Button>
      </div>
    </form>
  );
}
