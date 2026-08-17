import type { ReactNode } from "react";

export type Lang = "en" | "uk";

type Article = {
  href: string;
  source: string;
  date: Record<Lang, string>;
  title: Record<Lang, string>;
  desc: Record<Lang, ReactNode>;
};

export const articles: Article[] = [
  {
    href: "https://journal.gen.tech/post/claude-design-figma-make-canva-magic",
    source: "High Bar Journal",
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
    href: "https://dou.ua/forums/topic/58173/",
    source: "DOU",
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
    href: "https://dou.ua/forums/topic/58654/",
    source: "DOU",
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
    caseStudy: {
      eyebrow: string;
      title: string;
      desc: string;
      roleLabel: string;
      durationLabel: string;
      durationValue: string;
      linkLabel: string;
    };
    public: {
      heading: string;
      itemTitle: string;
      itemSubtitle: string;
      itemMeta: [string, string];
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
    caseStudy: {
      eyebrow: "Case study",
      title: "A website for my birthday",
      desc: "For my birthday, I built a website for friends with a celebration schedule and a wishlist where gifts can be reserved anonymously in one click.",
      roleLabel: "Role",
      durationLabel: "Timeline",
      durationValue: "4 days from idea to launch",
      linkLabel: "Open the case study",
    },
    public: {
      heading: "Public",
      itemTitle: "AI tools in UX/UI daily design process: practical cases",
      itemSubtitle: "Speaker at UX/UI Design Meetup by IT Cluster Transcarpathia",
      itemMeta: ["[Offline]", "[Feb 2026]"],
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
    caseStudy: {
      eyebrow: "Кейс",
      title: "Сайт на мій день народження",
      desc: "До свого дня народження я створила сайт для друзів із програмою святкування та wishlist-ом, де подарунки можна анонімно забронювати в один клік.",
      roleLabel: "Роль",
      durationLabel: "Строк",
      durationValue: "4 дні від ідеї до релізу",
      linkLabel: "Відкрити кейс",
    },
    public: {
      heading: "Публічна активність",
      itemTitle: "AI-інструменти у щоденному UX/UI-процесі: практичні кейси",
      itemSubtitle: "Спікерка на UX/UI Design Meetup від IT Cluster Transcarpathia",
      itemMeta: ["[Офлайн]", "[Лют 2026]"],
    },
    articlesHeading: "Статті",
  },
};
