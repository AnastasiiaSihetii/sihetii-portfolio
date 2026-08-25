import type { ReactNode } from "react";

export type Lang = "en" | "uk";

export type Article = {
  href: string;
  /* Platform name. Not printed in the copy any more — the masthead below says it —
     so this is what the logo announces to a screen reader. */
  source: string;
  /* Masthead of the platform the piece ran on, printed onto the newsprint
     thumbnail. `width`/`height` are the file's own pixels; `scale` is the share of
     the sheet it sets to, tuned per mark so three wordmarks of very different
     proportion (2.8:1 to 4.7:1) still land at roughly one optical height. */
  logo: { src: string; width: number; height: number; scale: number };
  date: Record<Lang, string>;
  title: Record<Lang, string>;
  desc: Record<Lang, ReactNode>;
};

export const articles: Article[] = [
  {
    href: "/articles/design-engineer-2026.html",
    source: "sihetii.com",
    logo: { src: "/articles/logos/sihetii.svg", width: 1734, height: 479, scale: 0.7 },
    date: { en: "August 2026", uk: "Серпень 2026" },
    title: {
      en: "Design Engineer in 2026: the role, the pay, and the way in",
      uk: "Design Engineer у 2026: хто це, скільки платять і як туди переходять",
    },
    desc: {
      en: (
        <>
          A research piece on the design engineer role built on 2026 data only: current openings with
          salary ranges, the shared requirements across Anthropic, Ramp, Vercel and Lovable
          postings, a snapshot of the Ukrainian market, and the typical transition path from product
          design.
        </>
      ),
      uk: (
        <>
          Дослідження ролі design engineer лише на даних 2026 року: відкриті вакансії з вилками,
          спільний знаменник вимог у постингах Anthropic, Ramp, Vercel і Lovable, зріз українського
          ринку та типовий шлях переходу з продуктового дизайну.
        </>
      ),
    },
  },
  {
    href: "https://journal.gen.tech/post/claude-design-figma-make-canva-magic",
    source: "High Bar Journal",
    logo: { src: "/articles/logos/high-bar-journal.png", width: 1020, height: 216, scale: 0.9 },
    date: { en: "May 2026", uk: "Травень 2026" },
    title: {
      en: "Claude Design, Figma Make, and Canva Magic: a big test drive of AI tools",
      uk: "Claude Design, Figma Make та Canva Magic: великий тест-драйв ШІ-інструментів",
    },
    desc: {
      en: (
        <>
          Shared her experience using Claude Design, Figma Make, and Canva Magic Design for a new
          feature in High Bar Journal by{" "}
          <a
            href="https://www.linkedin.com/company/genesis-technology-partners/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Genesis Tech
          </a>
          .
        </>
      ),
      uk: (
        <>
          Поділилася своїм досвідом використання Claude Design, Figma Make та Canva Magic Design
          для нового матеріалу в High Bar Journal від{" "}
          <a
            href="https://www.linkedin.com/company/genesis-technology-partners/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Genesis Tech
          </a>
          .
        </>
      ),
    },
  },
  {
    href: "https://dou.ua/forums/topic/58654/",
    source: "DOU",
    logo: { src: "/articles/logos/dou.svg", width: 58, height: 21, scale: 0.53 },
    date: { en: "April 2026", uk: "Квітень 2026" },
    title: {
      en: "Design system with Figma MCP and Claude Code: how to reduce manual work",
      uk: "Дизайн-система з Figma MCP та Claude Code: як скоротити ручну роботу",
    },
    desc: {
      en: "In her blog, designer Anastasiia shares how she integrates Claude Code and Figma MCP into her daily workflow — showing in practice how to build design systems from the terminal and turn days of routine work into hours of creative work.",
      uk: "Дизайнерка Анастасія у своєму блозі розповідає про інтеграцію Claude Code та Figma MCP у щоденну роботу. Вона на практиці показує як будувати дизайн-системи через термінал і перетворювати дні рутини на години творчості.",
    },
  },
  {
    href: "https://dou.ua/forums/topic/58173/",
    source: "DOU",
    logo: { src: "/articles/logos/dou.svg", width: 58, height: 21, scale: 0.53 },
    date: { en: "March 2026", uk: "Березень 2026" },
    title: {
      en: "AI in everyday design tasks: from brief to prototype in hours",
      uk: "ШІ в щоденних задачах дизайнера: від брифу до прототипу за години",
    },
    desc: {
      en: "What happens to a designer's work when AI becomes part of the daily routine? In her blog, designer Anastasiia shows in practice how she uses AI for research, UX copy, visuals, and prototypes — and how it shortens the work cycle from days to hours. She also shares which skills are now must-haves for designers.",
      uk: "Що відбувається з роботою дизайнера, коли AI стає частиною щоденної рутини? У своєму блозі дизайнерка Анастасія показує на практиці, як використовує ШІ для ресерчу, UX-копі, візуалів і прототипів і як це скорочує робочий цикл із днів до годин. А ще розповідає, які навички для дизайнерів тепер маст-хев.",
    },
  },
];

export const content: Record<
  Lang,
  {
    downloadCv: string;
    bio: ReactNode;
    cases: {
      heading: string;
      birthday: { title: string; desc: string };
      loops: { title: string; desc: string };
    };
    public: {
      heading: string;
      itemTitle: string;
      itemSubtitle: string;
      itemMeta: [string, string];
      projectorTitle: string;
      projectorMeta: string;
    };
    articlesHeading: string;
  }
> = {
  en: {
    downloadCv: "Download CV",
    bio: (
      <>
        Hi there 👋
        <br />
        <br />
        {"I'm a "}
        <strong>product designer</strong>
        {" moving into "}
        <strong>design engineering</strong>
        {
          ". That shift comes from 5+ years designing product interfaces across agency, startup, and enterprise environments—most recently at OneReach.ai, where I designed a UI builder and an agent/skills-based task platform for enterprise users."
        }
        <br />
        <br />
        {
          "I've since advised another product team on AI-integrated design workflows and write about AI in design for DOU."
        }
      </>
    ),
    cases: {
      heading: "Cases",
      birthday: {
        title: "A website for my birthday",
        desc: "For my birthday, I built a website for friends with a celebration schedule and a wishlist where gifts can be reserved anonymously in one click.",
      },
      loops: {
        title: "Habit Tracking Mobile App",
        desc: "A mobile app built around spaced repetition. Designed end-to-end in a 2-week sprint: from a chaotic set of developer wireframes to a complete, gamified learning.",
      },
    },
    public: {
      heading: "Public",
      itemTitle: "AI tools in UX/UI daily design process: practical cases",
      itemSubtitle: "Speaker at UX/UI Design Meetup by IT Cluster Transcarpathia",
      itemMeta: ["[Offline]", "[Feb 2026]"],
      projectorTitle: "Collaboration with Projector Library",
      projectorMeta: "[Soon]",
    },
    articlesHeading: "Articles",
  },
  uk: {
    downloadCv: "Завантажити CV",
    bio: (
      <>
        Привіт 👋
        <br />
        <br />
        {"Я "}
        <strong>продукт-дизайнерка</strong>
        {", яка переходить у "}
        <strong>дизайн-інженерію</strong>
        {
          ". Цей перехід — результат 5+ років проєктування продуктових інтерфейсів в агентствах, стартапах та enterprise-компаніях, останнім часом — в OneReach.ai, де я розробляла UI-конструктор і платформу задач на основі агентів/скілів для корпоративних користувачів."
        }
        <br />
        <br />
        {
          "Відтоді я консультувала іншу продуктову команду з інтеграції AI в дизайн-процеси та пишу про AI в дизайні для DOU."
        }
      </>
    ),
    cases: {
      heading: "Кейси",
      birthday: {
        title: "Сайт на мій день народження",
        desc: "До свого дня народження я створила сайт для друзів із програмою святкування та wishlist-ом, де подарунки можна анонімно забронювати в один клік.",
      },
      loops: {
        title: "Habit Tracking Mobile App",
        desc: "Мобільний застосунок, побудований на інтервальному повторенні. Спроєктувала end-to-end за двотижневий спринт: від хаотичного набору девелоперських вайрфреймів до цілісного гейміфікованого навчання.",
      },
    },
    public: {
      heading: "Публічна активність",
      itemTitle: "AI-інструменти у щоденному UX/UI-процесі: практичні кейси",
      itemSubtitle: "Спікерка на UX/UI Design Meetup від IT Cluster Transcarpathia",
      itemMeta: ["[Офлайн]", "[Лют 2026]"],
      projectorTitle: "Співпраця з Projector Library",
      projectorMeta: "[Незабаром]",
    },
    articlesHeading: "Статті",
  },
};
