import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { siteConfig } from "@/lib/site-config";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Cleaning and territory maintenance in Dushanbe";

/** Text-only OG card in brand colours; system fonts keep the edge function light. */
export default async function OpenGraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale = hasLocale(routing.locales, raw) ? raw : routing.defaultLocale;
  const t = await getTranslations({ locale, namespace: "meta" });

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", background: "#F3F6F5", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 44, height: 44, borderRadius: 10, background: "#0B3B34", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div style={{ fontSize: 28, fontWeight: 700, color: "#0B3B34" }}>{siteConfig.name}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 56, fontWeight: 800, lineHeight: 1.05, color: "#0B3B34", letterSpacing: -1.5, maxWidth: 1000 }}>{t("ogTitle")}</div>
          <div style={{ fontSize: 26, color: "#56655F", maxWidth: 900, lineHeight: 1.35 }}>{t("ogDescription")}</div>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <div style={{ padding: "12px 20px", borderRadius: 999, background: "#0F6B5C", color: "#fff", fontSize: 22, fontWeight: 600 }}>Dushanbe</div>
          <div style={{ padding: "12px 20px", borderRadius: 999, background: "#E8F3F0", color: "#0B3B34", fontSize: 22, fontWeight: 600 }}>{locale === "tg" ? "TJ" : "RU"}</div>
        </div>
      </div>
    ),
    size,
  );
}
