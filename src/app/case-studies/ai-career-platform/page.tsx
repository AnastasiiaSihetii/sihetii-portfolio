import type { Metadata } from "next";
import { EditorialPage } from "../../_components/EditorialPage";
import { careerPlatform } from "../../_content/career-platform";

export const metadata: Metadata = {
  alternates: {
    canonical: "/case-studies/ai-career-platform",
    languages: {
      en: "/case-studies/ai-career-platform",
      uk: "/uk/case-studies/ai-career-platform",
      "x-default": "/case-studies/ai-career-platform",
    },
  },
  title: careerPlatform.metaTitle,
  description: careerPlatform.metaDescription,
  openGraph: {
    title: careerPlatform.title,
    description: careerPlatform.metaDescription,
    type: "article",
    locale: "en_US",
    alternateLocale: "uk_UA",
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
