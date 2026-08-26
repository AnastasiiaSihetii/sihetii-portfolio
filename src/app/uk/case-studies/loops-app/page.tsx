import type { Metadata } from "next";
import { EditorialPage } from "../../../_components/EditorialPage";
import { napaUk as c } from "../../../_content/napa.uk";

const EN = "/case-studies/loops-app";

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

export default function NapaCaseUk() {
  return (
    <EditorialPage
      href={c.href}
      title={c.title}
      lead={c.lead}
      facts={c.facts}
      hero={c.hero}
      blocks={c.blocks}
      moreHeading="Інші роботи"
      lang="uk"
    />
  );
}
