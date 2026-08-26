import type { MetadataRoute } from "next";
import { OTHER_WORK } from "./_content/other-work";
import { abs } from "./site-url";

/* Мапа сайту. Досі її не було, тож пошук мусив знаходити внутрішні сторінки
   сам, переходами з головної.

   Пари мовних версій оголошені лише там, де обидві сторінки справді існують:
   у головної та у статті про design engineer. Кейси написані тільки
   англійською, і пари їм не приписано — заявити її означало б пообіцяти
   пошуку сторінку, якої немає. Мова кожної сторінки оголошена на її
   власному <article lang>. */

const HOME_ALTERNATES = { en: abs("/"), uk: abs("/uk") };

/* Стаття існує двома мовами. Український оригінал лишився за первісною
   адресою, бо на неї вже є зовнішні посилання; переклад стоїть під /en. */
const ARTICLE_UK = "/articles/design-engineer-2026";
const ARTICLE_EN = "/en/articles/design-engineer-2026";
const ARTICLE_ALTERNATES = { uk: abs(ARTICLE_UK), en: abs(ARTICLE_EN) };

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
       підвал решти. Одне джерело, жодної другої правки.

       Виняток — стаття: у списку вона одна, англійською, бо той блок
       ведеться англійською. У мапі мають стояти обидві версії. */
    ...OTHER_WORK.map((work) => ({
      url: abs(work.href),
      changeFrequency: "yearly" as const,
      priority: 0.8,
      ...(work.href === ARTICLE_EN ? { alternates: { languages: ARTICLE_ALTERNATES } } : {}),
    })),
    {
      url: abs(ARTICLE_UK),
      changeFrequency: "yearly",
      priority: 0.8,
      alternates: { languages: ARTICLE_ALTERNATES },
    },
  ];
}
