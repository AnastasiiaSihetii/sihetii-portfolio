import type { Metadata } from "next";
import { EditorialPage } from "../../../_components/EditorialPage";
import { designEngineer2026En as a } from "../../../_content/design-engineer-2026.en";

/* Переклад стоїть під префіксом /en — єдиний виняток із загального правила
   сайту, де без префікса йде англійська: адресу без префікса зайняв
   український оригінал, опублікований раніше.

   Сам оригінал тепер живе на DOU, а його адреса на сайті звідти редиректить,
   тож hreflang мусить називати українською версією саме публікацію на DOU.
   Інакше пошук пішов би за парою на сторінку, якої вже немає. */
const UK = "https://dou.ua/forums/topic/61629/";

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
