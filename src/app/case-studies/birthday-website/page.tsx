import type { Metadata } from "next";
import { EditorialPage } from "../../_components/EditorialPage";
import { birthday as c } from "../../_content/birthday";

export const metadata: Metadata = {
  alternates: { canonical: "/case-studies/birthday-website" },
  title: c.metaTitle,
  description: c.metaDescription,
  openGraph: {
    title: c.title,
    description: c.metaDescription,
    type: "article",
    /* Картинку дає app/opengraph-image.tsx: єдина картка 1200×630. Кадр героя
       сюди не підставлений — у соцмережі він обрізається довільно. */
  },
};

export default function BirthdayCase() {
  return (
    <EditorialPage
      href={c.href}
      title={c.title}
      lead={c.lead}
      facts={c.facts}
      hero={c.hero}
      blocks={c.blocks}
      accent={c.accent}
    />
  );
}
