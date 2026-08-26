import type { Metadata } from "next";
import { EditorialPage } from "../../../_components/EditorialPage";
import { careerPlatformUk as c } from "../../../_content/career-platform.uk";

const EN = "/case-studies/ai-career-platform";

export const metadata: Metadata = {
  alternates: {
    canonical: c.href,
    languages: { en: EN, uk: c.href, "x-default": EN },
  },
  title: c.metaTitle,
  description: c.metaDescription,
  openGraph: {
    title: c.title,
    description: c.metaDescription,
    type: "article",
    locale: "uk_UA",
    alternateLocale: "en_US",
  },
};

export default function CareerPlatformCaseUk() {
  return (
    <EditorialPage
      href={c.href}
      title={c.title}
      lead={c.lead}
      facts={c.facts}
      blocks={c.blocks}
      accent={c.accent}
      moreHeading="Інші роботи"
      lang="uk"
    />
  );
}
