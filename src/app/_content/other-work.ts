/** Блок «Інші роботи» в підвалі внутрішніх сторінок. Сторінка бере звідси всі
 *  записи, крім себе самої — тому кожна нова сторінка з'являється в підвалі
 *  решти автоматично, без правок у кількох файлах. */
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

export const OTHER_WORK: WorkLink[] = [
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
    href: "/articles/design-engineer-2026",
    title: "Design Engineer in 2026: the role, the pay, and the way in",
    desc: "A research piece on the design engineer role built on 2026 data only: current openings with salary ranges, the shared requirements across postings, a snapshot of the Ukrainian market, and the typical transition path from product design.",
    date: "[August 2026]",
    thumb: "/article-image.png",
    logo: { src: "/articles/logos/sihetii.svg", scale: 0.7, alt: "sihetii.com" },
  },
];

/** Скільки рекомендацій показує підвал будь-якої внутрішньої сторінки.
 *  Двох досить: третій рядок після довгого читання перестає бути
 *  рекомендацією і починає читатися як список посилань. */
export const MORE_LIMIT = 2;

/** Усе, крім поточної сторінки, обрізане до MORE_LIMIT. Ліміт живе тут, а не на
 *  сторінці, щоб кожна нова сторінка успадкувала правило без окремої правки.
 *  Які саме записи потраплять, вирішує порядок OTHER_WORK — він вибудуваний. */
export const otherWorkExcept = (href: string) =>
  OTHER_WORK.filter((w) => w.href !== href).slice(0, MORE_LIMIT);
