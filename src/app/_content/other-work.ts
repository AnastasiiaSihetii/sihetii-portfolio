import type { Lang } from "../lang-content";
import { HIDE_RESEARCH_ARTICLE, RESEARCH_ARTICLE_PATH } from "./site";

/** Блок «Інші роботи» в підвалі внутрішніх сторінок. Сторінка бере звідси всі
 *  записи, крім себе самої — тому кожна нова сторінка з'являється в підвалі
 *  решти автоматично, без правок у кількох файлах.
 *
 *  Список ведеться двома мовами, бо кожна робота тепер існує двома: українська
 *  сторінка має рекомендувати українські версії, а не відправляти читача в
 *  англійський текст. */
export type WorkLink = {
  href: string;
  title: string;
  desc: string;
  date: string;
  /** Кейс під NDA йде без кадру — плитка рендериться як напис. */
  thumb?: string;
  /** Марка платформи, надрукована поверх аркуша (для статей) */
  logo?: { src: string; scale: number; alt: string };
};

const SIHETII_LOGO = { src: "/articles/logos/sihetii.svg", scale: 0.7, alt: "sihetii.com" };

const ALL_WORK: Record<Lang, WorkLink[]> = {
  en: [
    {
      href: "/case-studies/ai-career-platform",
      title: "Design engineering for an AI career platform",
      desc: "A B2B2C career-guidance platform for the German-speaking market. I do the whole interface here: product decisions, a design system of 84 components, and the front end I build and ship myself.",
      date: "[Since July 2026]",
    },
    {
      href: "/case-studies/loops-app",
      title: "Napa: habit tracking built on spaced repetition",
      desc: "A mobile app built around spaced repetition. Designed end-to-end in a 2-week sprint: from a chaotic set of developer wireframes to a complete, gamified learning experience.",
      date: "[August 2026]",
      thumb: "/case-loops.jpg",
    },
    {
      href: "/case-studies/birthday-website",
      title: "A website for my birthday",
      desc: "For my birthday, I built a website for friends with a celebration schedule and a wishlist where gifts can be reserved anonymously.",
      date: "[July 2026]",
      thumb: "/case-birthday.jpg",
    },
    {
      /* Стаття — єдине місце на сайті, де англійська несе префікс: український
         оригінал лишився за своєю опублікованою адресою. */
      href: "/en/articles/design-engineer-2026",
      title: "Design Engineer in 2026: the role, the pay, and the way in",
      desc: "A research piece on the design engineer role built on 2026 data only: current openings with salary ranges, the shared requirements across postings, a snapshot of the Ukrainian market, and the typical transition path from product design.",
      date: "[August 2026]",
      thumb: "/article-image.png",
      logo: SIHETII_LOGO,
    },
  ],
  uk: [
    {
      href: "/uk/case-studies/ai-career-platform",
      title: "Дизайн-інженерія для AI-платформи кар'єри",
      desc: "B2B2C-платформа кар'єрного орієнтування для німецькомовного ринку. Я веду тут увесь інтерфейс: продуктові рішення, дизайн-систему на 84 компоненти і фронтенд, який збираю й викочую сама.",
      date: "[З липня 2026]",
    },
    {
      href: "/uk/case-studies/loops-app",
      title: "Napa: трекер звичок на інтервальному повторенні",
      desc: "Мобільний застосунок, побудований на інтервальному повторенні. Спроєктувала end-to-end за двотижневий спринт: від хаотичного набору девелоперських вайрфреймів до цілісного гейміфікованого навчання.",
      date: "[Серпень 2026]",
      thumb: "/case-loops.jpg",
    },
    {
      href: "/uk/case-studies/birthday-website",
      title: "Сайт на мій день народження",
      desc: "До свого дня народження я створила сайт для друзів із програмою святкування та wishlist-ом, де подарунки можна анонімно забронювати.",
      date: "[Липень 2026]",
      thumb: "/case-birthday.jpg",
    },
    {
      href: "/articles/design-engineer-2026",
      title: "Design Engineer у 2026: хто це і хто наймає",
      desc: "Дослідження ролі design engineer лише на даних 2026 року: відкриті вакансії з вилками, спільний знаменник вимог у постингах, зріз українського ринку та типовий шлях переходу з продуктового дизайну.",
      date: "[Серпень 2026]",
      thumb: "/article-image.png",
      logo: SIHETII_LOGO,
    },
  ],
};

/* Дослідження тимчасово зняте. Знімаємо з обох мов одночасно: sitemap.ts
   парує записи за порядковим номером, і різна довжина списків його зламала б. */
const keep = (w: WorkLink) =>
  !HIDE_RESEARCH_ARTICLE || !w.href.includes(RESEARCH_ARTICLE_PATH);

export const OTHER_WORK: Record<Lang, WorkLink[]> = {
  en: ALL_WORK.en.filter(keep),
  uk: ALL_WORK.uk.filter(keep),
};

/** Скільки рекомендацій показує підвал будь-якої внутрішньої сторінки.
 *  Двох досить: третій рядок після довгого читання перестає бути
 *  рекомендацією і починає читатися як список посилань. */
export const MORE_LIMIT = 2;

/* Сторінка виключає себе з власного підвалу. Порівнюємо без мовного префікса:
   одна робота має дві адреси, і жодна з версій не повинна рекомендувати саму
   себе іншою мовою. */
const withoutLocale = (href: string) => href.replace(/^\/(en|uk)(?=\/)/, "");

/** Усе, крім поточної сторінки, обрізане до MORE_LIMIT. Ліміт живе тут, а не на
 *  сторінці, щоб кожна нова сторінка успадкувала правило без окремої правки.
 *  Які саме записи потраплять, вирішує порядок OTHER_WORK — він вибудуваний. */
export const otherWorkExcept = (href: string, lang: Lang = "en") =>
  OTHER_WORK[lang]
    .filter((w) => withoutLocale(w.href) !== withoutLocale(href))
    .slice(0, MORE_LIMIT);
