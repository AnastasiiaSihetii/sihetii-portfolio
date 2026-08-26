import type { Metadata } from "next";
import { EditorialPage } from "../../../_components/EditorialPage";
import { designEngineer2026En as a } from "../../../_content/design-engineer-2026.en";

/* Українська версія лишається за своєю первісною адресою, /articles/..., бо
   вона опублікована й на неї вже є посилання ззовні: міняти мову під тим,
   хто прийшов за старим лінком, не можна. Через це переклад стоїть під
   префіксом /en — єдиний виняток із загального правила сайту, де без
   префікса йде англійська. Обидві версії звʼязані hreflang в обидва боки. */
const UK = "/articles/design-engineer-2026";

export const metadata: Metadata = {
  alternates: {
    canonical: a.href,
    languages: { en: a.href, uk: UK, "x-default": a.href },
  },
  title: a.metaTitle,
  description: a.metaDescription,
  openGraph: {
    title: a.ogTitle,
    description: a.ogDescription,
    type: "article",
    locale: "en_US",
    alternateLocale: "uk_UA",
  },
};

export default function DesignEngineerArticleEn() {
  return (
    <EditorialPage
      href={a.href}
      title={a.title}
      lead={a.lead}
      byline={a.byline}
      hero={a.hero}
      heroPosition="above-title"
      blocks={a.blocks}
      moreHeading="Other work"
      kind="article"
      lang="en"
    />
  );
}
