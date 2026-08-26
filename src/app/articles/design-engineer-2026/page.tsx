import type { Metadata } from "next";
import { EditorialPage } from "../../_components/EditorialPage";
import { designEngineer2026 as a } from "../../_content/design-engineer-2026";

export const metadata: Metadata = {
  alternates: { canonical: "/articles/design-engineer-2026" },
  title: a.metaTitle,
  description: a.metaDescription,
  /* Стаття українська, на відміну від кейсів. Локаль тут же, щоб мова, яку
     бачить пошук і соцмережа, збігалася з мовою тексту. */
  openGraph: {
    title: a.ogTitle,
    description: a.ogDescription,
    type: "article",
    locale: "uk_UA",
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
