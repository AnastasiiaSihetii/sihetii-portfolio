import type { Metadata } from "next";
import { EditorialPage } from "../../_components/EditorialPage";
import { careerPlatform } from "../../_content/career-platform";

export const metadata: Metadata = {
  alternates: { canonical: "/case-studies/ai-career-platform" },
  title: careerPlatform.metaTitle,
  description: careerPlatform.metaDescription,
  openGraph: {
    title: careerPlatform.title,
    description: careerPlatform.metaDescription,
    type: "article",
  },
};

export default function CareerPlatformCase() {
  return (
    <EditorialPage
      href={careerPlatform.href}
      title={careerPlatform.title}
      lead={careerPlatform.lead}
      facts={careerPlatform.facts}
      blocks={careerPlatform.blocks}
      accent={careerPlatform.accent}
    />
  );
}
