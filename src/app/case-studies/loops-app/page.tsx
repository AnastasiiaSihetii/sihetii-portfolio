import type { Metadata } from "next";
import { EditorialPage } from "../../_components/EditorialPage";
import { napa } from "../../_content/napa";

export const metadata: Metadata = {
  alternates: { canonical: "/case-studies/loops-app" },
  title: napa.metaTitle,
  description: napa.metaDescription,
  openGraph: {
    title: "Napa: habit tracking built on spaced repetition",
    description: napa.metaDescription,
    type: "article",
    /* Картинку дає app/opengraph-image.tsx: єдина картка 1200×630. Кадр героя
       сюди не підставлений — 2560×2157 у соцмережі обрізається довільно. */
  },
};

export default function NapaCase() {
  return (
    <EditorialPage
      href={napa.href}
      title={napa.title}
      lead={napa.lead}
      facts={napa.facts}
      hero={napa.hero}
      blocks={napa.blocks}
    />
  );
}
