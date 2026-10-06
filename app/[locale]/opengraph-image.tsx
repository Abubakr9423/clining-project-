import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";
import { hasLocale } from "next-intl";
import { localeLabels, routing } from "@/i18n/routing";
import { siteConfig } from "@/lib/site-config";
import { logoColors, logoMarkPaths } from "@/components/brand/logo";

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
      <div style={{ width: "100%", height: "100%", background: "#F4F7FB", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <svg width="56" height="56" viewBox="0 0 64 64">
            <rect width="64" height="64" rx="16" fill={logoColors.tile} />
            <circle cx={logoMarkPaths.ring.cx} cy={logoMarkPaths.ring.cy} r={logoMarkPaths.ring.r} fill="none" stroke={logoColors.ring} strokeWidth={logoMarkPaths.ringStroke} />
            <path d={logoMarkPaths.sparkle} fill={logoColors.sparkle} />
          </svg>
          <div style={{ fontSize: 28, fontWeight: 700, color: "#0E2440" }}>{siteConfig.name}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 56, fontWeight: 800, lineHeight: 1.05, color: "#0E2440", letterSpacing: -1.5, maxWidth: 1000 }}>{t("ogTitle")}</div>
          <div style={{ fontSize: 26, color: "#4B5668", maxWidth: 900, lineHeight: 1.35 }}>{t("ogDescription")}</div>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <div style={{ padding: "12px 20px", borderRadius: 999, background: "#1D5FA8", color: "#fff", fontSize: 22, fontWeight: 600 }}>Dushanbe</div>
          <div style={{ padding: "12px 20px", borderRadius: 999, background: "#E8F0FA", color: "#0E2440", fontSize: 22, fontWeight: 600 }}>{localeLabels[locale]}</div>
        </div>
      </div>
    ),
    size,
  );
}
