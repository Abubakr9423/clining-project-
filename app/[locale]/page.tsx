import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/hero";
import { TrustBar } from "@/components/sections/trust-bar";
import { ServicesSection } from "@/components/sections/services-section";
import { AudienceSection } from "@/components/sections/audience-section";
import { WhyUsSection } from "@/components/sections/why-us-section";
import { ProcessSection } from "@/components/sections/process-section";
import { WipeSection } from "@/components/sections/wipe-section";
import { CalculatorSection } from "@/components/sections/calculator-section";
import { BeforeAfterSection } from "@/components/sections/before-after-section";
import { ReviewsSection } from "@/components/sections/reviews-section";
import { FaqSection } from "@/components/sections/faq-section";
import { ContactSection } from "@/components/sections/contact-section";
import { CtaBand } from "@/components/layout/cta-band";
import { resolveLocale } from "@/lib/locale";

type Props = { params: Promise<{ locale: string }> };

export default async function HomePage({ params }: Props) {
  const locale = await resolveLocale(params);
  setRequestLocale(locale);

  return (
    <main id="content">
      <Hero />
      <TrustBar />
      <ServicesSection />
      <AudienceSection />
      <WhyUsSection />
      <ProcessSection />
      <WipeSection />
      <CalculatorSection />
      <BeforeAfterSection />
      <ReviewsSection />
      <FaqSection />
      <CtaBand variant="questions" />
      <ContactSection />
      <CtaBand variant="quote" />
    </main>
  );
}
