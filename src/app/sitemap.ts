import type { MetadataRoute } from "next";
import { OTHER_WORK } from "./_content/other-work";
import { abs } from "./site-url";

/* Мапа сайту. Досі її не було, тож пошук мусив знаходити внутрішні сторінки
   сам, переходами з головної.

   Кожна робота тепер існує двома мовами, тож у мапу йдуть обидві адреси, і
   кожна оголошує другу своєю парою. Пари беруться з двох списків OTHER_WORK,
   які ведуться в однаковому порядку — це та сама інваріанта, на якій уже
   тримається блок «Інші роботи». */

const HOME = { en: abs("/"), uk: abs("/uk") };

/** Одна робота — два записи, кожен із посиланням на пару. */
function pair(enHref: string, ukHref: string): MetadataRoute.Sitemap {
  const languages = { en: abs(enHref), uk: abs(ukHref) };
  return [enHref, ukHref].map((href) => ({
    url: abs(href),
    changeFrequency: "yearly" as const,
    priority: 0.8,
    alternates: { languages },
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const works = OTHER_WORK.en.flatMap((work, i) =>
    pair(work.href, OTHER_WORK.uk[i].href),
  );

  return [
    {
      url: HOME.en,
      changeFrequency: "monthly",
      priority: 1,
      alternates: { languages: { ...HOME, "x-default": HOME.en } },
    },
    {
      url: HOME.uk,
      changeFrequency: "monthly",
      priority: 1,
      alternates: { languages: { ...HOME, "x-default": HOME.en } },
    },
    ...works,
  ];
}
