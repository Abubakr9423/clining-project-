import { ImageResponse } from "next/og";
import { logoColors, logoMarkPaths } from "@/components/brand/logo";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/** Favicon: the sparkle-"o" of the Safo wordmark on a forest tile. */
export default function Icon() {
  return new ImageResponse(
    (
      <svg width="64" height="64" viewBox="0 0 64 64">
        <rect width="64" height="64" rx="16" fill={logoColors.tile} />
        <circle cx={logoMarkPaths.ring.cx} cy={logoMarkPaths.ring.cy} r={logoMarkPaths.ring.r} fill="none" stroke={logoColors.ring} strokeWidth={logoMarkPaths.ringStroke} />
        <path d={logoMarkPaths.sparkle} fill={logoColors.sparkle} />
      </svg>
    ),
    size,
  );
}
