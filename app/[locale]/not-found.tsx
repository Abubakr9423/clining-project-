import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { Link } from "@/i18n/navigation";

export default function NotFound() {
  const t = useTranslations("notFound");
  return (
    <main id="content" className="py-section">
      <Container className="max-w-2xl">
        <p className="font-heading text-6xl font-extrabold text-mint-deep">404</p>
        <h1 className="mt-4 text-h1 font-bold">{t("title")}</h1>
        <p className="mt-4 text-lg text-slate">{t("text")}</p>
        <Button asChild size="xl" className="mt-8">
          <Link href="/">{t("cta")}</Link>
        </Button>
      </Container>
    </main>
  );
}
