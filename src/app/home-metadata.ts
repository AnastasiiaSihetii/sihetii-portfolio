import type { Metadata } from "next";
import type { Lang } from "./lang-content";

/* Головна існує двома мовами за двома адресами. Метадані для них будуються
   з одного місця, щоб hreflang з обох боків указував на ту саму пару — саме
   на цьому взаємному підтвердженні тримається зв'язок версій для пошуку. */

const PATHS: Record<Lang, string> = { en: "/", uk: "/uk" };

/* Ім'я з роллю не перекладається: це підпис, а не речення. Опис — навпаки,
   бо це і є той текст, який людина читає у видачі своєю мовою. */
const TITLE = "Anastasiia Sihetii — Product Designer · Design Engineer";

const DESCRIPTION: Record<Lang, string> = {
  en: "I design product interfaces and build the front end myself. Case studies from agency, startup and enterprise work, and writing about design engineering.",
  uk: "Проєктую продуктові інтерфейси і сама збираю фронтенд. Кейси з агенційних, стартапних і enterprise-проєктів та тексти про дизайн-інженерію.",
};

const OG_LOCALE: Record<Lang, string> = { en: "en_US", uk: "uk_UA" };

export function homeMetadata(lang: Lang): Metadata {
  const description = DESCRIPTION[lang];
  return {
    title: TITLE,
    description,
    alternates: {
      canonical: PATHS[lang],
      languages: {
        en: PATHS.en,
        uk: PATHS.uk,
        /* Кого віддавати тому, чия мова не збігається з жодною: англійська
           версія, бо саме вона адресована ширшій із двох аудиторій. */
        "x-default": PATHS.en,
      },
    },
    openGraph: {
      type: "website",
      url: PATHS[lang],
      siteName: "sihetii.com",
      title: TITLE,
      description,
      locale: OG_LOCALE[lang],
      alternateLocale: OG_LOCALE[lang === "en" ? "uk" : "en"],
    },
    twitter: { card: "summary_large_image", title: TITLE, description },
  };
}
