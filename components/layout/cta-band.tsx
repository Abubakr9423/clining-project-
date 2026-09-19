import { useTranslations } from "next-intl";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "./container";
import { WhatsAppIcon } from "@/components/icons/brand";
import { anchors } from "@/lib/anchors";
import { telHref, whatsappUrl } from "@/lib/links";

/** Compact conversion band used after the FAQ and before the footer. */
export function CtaBand({ variant = "quote" }: { variant?: "quote" | "questions" }) {
  const t = useTranslations("ctaBand");
  const tc = useTranslations("common");
  const th = useTranslations("hero");

  return (
    <section className="bg-forest py-12 text-white md:py-16">
      <Container className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-h2 font-bold text-white">{t(`${variant}.title`)}</h2>
          <p className="mt-2 max-w-[52ch] text-white/72">{t(`${variant}.text`)}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          {variant === "quote" ? (
            <Button asChild size="xl" className="bg-white text-forest hover:bg-mint">
              <a href={`#${anchors.calculator}`}>{tc("getQuote")}</a>
            </Button>
          ) : (
            <Button asChild size="xl" className="bg-white text-forest hover:bg-mint">
              <a href={telHref}>
                <Phone /> {tc("call")}
              </a>
            </Button>
          )}
          <Button asChild size="xl" variant="whatsapp">
            <a href={whatsappUrl(th("whatsappGreeting"))} target="_blank" rel="noopener">
              <WhatsAppIcon /> {tc("whatsapp")}
            </a>
          </Button>
        </div>
      </Container>
    </section>
  );
}
