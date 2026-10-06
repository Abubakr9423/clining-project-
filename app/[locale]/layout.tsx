import type { Metadata } from "next";
import { Golos_Text, Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { MotionProvider } from "@/components/motion/motion-provider";
import { Header } from "@/components/layout/header";
import { MobileActionBar } from "@/components/layout/mobile-action-bar";
import { Footer } from "@/components/layout/footer";
import { isRtl, routing } from "@/i18n/routing";
import { resolveLocale } from "@/lib/locale";
import { buildJsonLd, buildMetadata } from "@/lib/seo";
import { faqKeys } from "@/components/sections/faq-section";
import { indoorServices, outdoorServices } from "@/content/services";
import "../globals.css";

// Variable fonts: one woff2 per family instead of three, which shortens the critical path before LCP.
const golos = Golos_Text({
  subsets: ["cyrillic-ext", "cyrillic", "latin"],
  variable: "--font-golos",
  display: "swap",
});

const inter = Inter({
  subsets: ["cyrillic-ext", "cyrillic", "latin"],
  variable: "--font-inter",
  display: "swap",
});

type Props = { children: React.ReactNode; params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Omit<Props, "children">): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: "meta" });
  return buildMetadata(locale, { title: t("title"), description: t("description"), ogTitle: t("ogTitle"), ogDescription: t("ogDescription") });
}

export default async function LocaleLayout({ children, params }: Props) {
  const locale = await resolveLocale(params);
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "hero" });
  const ta = await getTranslations({ locale, namespace: "a11y" });
  const greeting = t("whatsappGreeting");
  const tm = await getTranslations({ locale, namespace: "meta" });
  const tf = await getTranslations({ locale, namespace: "faq" });
  const ts = await getTranslations({ locale, namespace: "services" });
  const jsonLd = buildJsonLd(locale, {
    description: tm("description"),
    faq: faqKeys.map((k) => ({ q: tf(`items.${k}.q`), a: tf(`items.${k}.a`) })),
    serviceNames: [
      ...indoorServices.map((s) => ts(`indoor.items.${s.key}.title`)),
      ...outdoorServices.map((s) => ts(`outdoor.items.${s.key}.title`)),
    ],
  });

  return (
    <html lang={locale} dir={isRtl(locale) ? "rtl" : "ltr"} className={`${golos.variable} ${inter.variable}`}>
      <body className="min-h-dvh bg-canvas font-body text-ink antialiased pb-[calc(56px+env(safe-area-inset-bottom))] md:pb-0">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <NextIntlClientProvider>
          <MotionProvider>
            <TooltipProvider delayDuration={200}>
              <a
                href="#content"
                className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-forest focus:px-4 focus:py-2 focus:text-white"
              >
                {ta("skipToContent")}
              </a>
              <Header whatsappGreeting={greeting} />
              {children}
              <Footer />
              <MobileActionBar whatsappGreeting={greeting} />
              <Toaster position="bottom-center" />
            </TooltipProvider>
          </MotionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
