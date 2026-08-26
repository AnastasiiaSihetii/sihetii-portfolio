import type { MetadataRoute } from "next";
import { OTHER_WORK } from "./_content/other-work";
import { abs } from "./site-url";

/* Мапа сайту. Досі її не було, тож пошук мусив знаходити внутрішні сторінки
   сам, переходами з головної.

   Пари мовних версій оголошені лише там, де вони справді існують — у головної.
   Кейси написані англійською, стаття українською, і в жодного з них немає
   відповідника іншою мовою: заявити його означало б пообіцяти пошуку сторінку,
   якої немає. Мова кожної такої сторінки оголошена на її ж <article lang>. */

const HOME_ALTERNATES = { en: abs("/"), uk: abs("/uk") };

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: abs("/"),
      changeFrequency: "monthly",
      priority: 1,
      alternates: { languages: HOME_ALTERNATES },
    },
    {
      url: abs("/uk"),
      changeFrequency: "monthly",
      priority: 1,
      alternates: { languages: HOME_ALTERNATES },
    },
    /* Роботи беруться з того самого списку, що й блок «Інші роботи»: нова
       сторінка потрапляє в мапу сайту тим самим записом, що додає її у
       підвал решти. Одне джерело, жодної другої правки. */
    ...OTHER_WORK.map((work) => ({
      url: abs(work.href),
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),
  ];
}
