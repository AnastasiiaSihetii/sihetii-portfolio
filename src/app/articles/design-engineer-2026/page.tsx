import type { Metadata } from "next";
import { EditorialPage } from "../../_components/EditorialPage";
import { designEngineer2026 as a } from "../../_content/design-engineer-2026";

export const metadata: Metadata = {
  /* Переклад живе під /en, бо ця адреса опублікована українською й міняти
     мову під наявними посиланнями не можна. Звʼязок оголошений в обидва боки. */
  alternates: {
    canonical: "/articles/design-engineer-2026",
    languages: {
      uk: "/articles/design-engineer-2026",
      en: "/en/articles/design-engineer-2026",
      "x-default": "/en/articles/design-engineer-2026",
    },
  },
  title: a.metaTitle,
  description: a.metaDescription,
  /* Стаття українська, на відміну від кейсів. Локаль тут же, щоб мова, яку
     бачить пошук і соцмережа, збігалася з мовою тексту. */
  openGraph: {
    title: a.ogTitle,
    description: a.ogDescription,
    type: "article",
    locale: "uk_UA",
    alternateLocale: "en_US",
  },
};

export default function DesignEngineerArticle() {
  return (
    <EditorialPage
      href={a.href}
      title={a.title}
      lead={a.lead}
      byline={a.byline}
      hero={a.hero}
      heroPosition="above-title"
      blocks={a.blocks}
      moreHeading="Інші матеріали"
      kind="article"
      lang="uk"
    />
  );
}
