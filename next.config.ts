import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: { formats: ["image/avif", "image/webp"] },
  async redirects() {
    // The internal locale code is `tg` (BCP-47); the public prefix is `/tj`.
    return [
      { source: "/tg", destination: "/tj", permanent: true },
      { source: "/tg/:path*", destination: "/tj/:path*", permanent: true },
    ];
  },
};

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");
export default withNextIntl(nextConfig);

// Gives `next dev` access to Cloudflare bindings (images, env) the same way the deployed Worker has them.
import("@opennextjs/cloudflare").then((m) => m.initOpenNextCloudflareForDev());
