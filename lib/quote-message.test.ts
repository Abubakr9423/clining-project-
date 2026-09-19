import { describe, expect, it } from "vitest";
import { buildQuoteMessage, type QuoteLabels } from "./quote-message";

const labels: QuoteLabels = {
  greeting: "Здравствуйте! Хочу получить расчёт стоимости уборки.",
  objectType: "Тип объекта",
  area: "Площадь",
  areaUnit: "м²",
  frequency: "Частота",
  extras: "Дополнительные услуги",
  name: "Имя",
  comment: "Комментарий",
  language: "Язык",
  none: "—",
};

describe("buildQuoteMessage", () => {
  it("matches the brief's example layout", () => {
    const text = buildQuoteMessage(
      { objectType: "офис", area: 250, frequency: "3 раза в неделю", extras: ["окна"], name: "Далер", comment: "", languageLabel: "RU" },
      labels,
    );
    expect(text).toBe(
      [
        "Здравствуйте! Хочу получить расчёт стоимости уборки.",
        "",
        "Тип объекта: офис",
        "Площадь: 250 м²",
        "Частота: 3 раза в неделю",
        "Дополнительные услуги: окна",
        "",
        "Имя: Далер",
        "Язык: RU",
      ].join("\n"),
    );
  });

  it("uses the 'none' marker for empty extras and omits empty name/comment", () => {
    const text = buildQuoteMessage(
      { objectType: "клиника", area: 120, frequency: "Ежедневно", extras: [], name: "  ", comment: undefined, languageLabel: "TJ" },
      labels,
    );
    expect(text).toContain("Дополнительные услуги: —");
    expect(text).not.toContain("Имя:");
    expect(text).not.toContain("Комментарий:");
    expect(text.endsWith("Язык: TJ")).toBe(true);
  });

  it("joins several extras with a comma and trims the comment", () => {
    const text = buildQuoteMessage(
      { objectType: "дом", area: 90, frequency: "Разовая", extras: ["окна", "озеленение"], name: "", comment: "  ул. Рудаки, 10  ", languageLabel: "RU" },
      labels,
    );
    expect(text).toContain("Дополнительные услуги: окна, озеленение");
    expect(text).toContain("Комментарий: ул. Рудаки, 10");
  });

  it("prints the 'none' marker when the area is not set yet", () => {
    const text = buildQuoteMessage({ objectType: "офис", area: null, frequency: "x", extras: [], languageLabel: "RU" }, labels);
    expect(text).toContain("Площадь: —");
  });

  it("formats the area without decimals and with a non-breaking unit", () => {
    const text = buildQuoteMessage({ objectType: "офис", area: 1250.4, frequency: "x", extras: [], languageLabel: "RU" }, labels);
    expect(text).toContain("Площадь: 1250 м²");
  });
});
