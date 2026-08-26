import { ExternalLink } from "../_components/ExternalLink";
import { cards, defs, fig, h2, note, p, stats, ul, type Block } from "./blocks";

const LIVE = "https://sweet27.vercel.app";

/** Оливковий із корпусу макбука в хіро — цифри кейсу тримають його колір. */
const ACCENT = "#799400";

export const birthday = {
  href: "/case-studies/birthday-website",
  accent: ACCENT,
  title: "A birthday site with an anonymous wishlist",
  metaTitle: "A birthday site with an anonymous wishlist — case study",
  metaDescription:
    "A case study on a birthday website with a celebration schedule and a wishlist where gifts are reserved anonymously. Four days from idea to launch, built with an AI-native process in Claude Code.",

  lead: [
    "For my birthday, I built a website for friends with a celebration schedule and a wishlist where gifts can be reserved anonymously.",
  ],

  facts: [
    { label: "My role", value: "Product Designer · Design Engineer" },
    { label: "Duration", value: "4 days · ~20 hours of actual work" },
    /* Побіжний зріз стека. Розгорнутий список із поясненнями — у секції «What it's built with» */
    { label: "Stack", value: "Next.js · Supabase · Vercel · Figma · Claude Code" },
    { label: "Live", value: <ExternalLink href={LIVE}>sweet27.vercel.app</ExternalLink> },
  ],

  card: {
    src: "/case-birthday.jpg",
    alt: "The Sweee...et 27 home screen: two celebration dates, a portrait in a party hat, and the Anastasiia's B-day wordmark",
    width: 2240,
    height: 1260,
  },

  /* PNG rather than JPEG: the mockup has a transparent background, so the laptop
     stands on the page itself instead of inside a white box. */
  hero: {
    src: "/case-studies/img/birthday/hero-macbook.png",
    alt: "The Sweee...et 27 home screen on a MacBook: two celebration dates, a portrait in a party hat, the Anastasiia's B-day wordmark, and the See the agenda and Go to wishlist buttons",
    width: 2240,
    height: 1366,
  },

  blocks: [
    h2("overview", "Overview"),
    p(
      "I set the brief, designed the solution, and shipped it myself. Four days from idea to a live URL, working alone across design and code.",
    ),

    h2("problem", "The problem"),
    p(
      "Everything about the celebration lived in chat threads, retyped for whoever asked next. No single version anyone could check.",
      "The wishlist had a second problem: it only works if guests can see what is already taken, without having to say who they are.",
    ),

    h2("outcomes", "What came of it"),
    ul(
      "Four working days produced a product friends actually used, while preparing and on the days themselves.",
      "Row-level security in the database, live gift-status updates, and rate limiting against request spam.",
      "An AI-native workflow: designed and built in Claude Code, deployed from the same session.",
    ),
    stats(
      { value: "0%", label: "sessions with rage clicks" },
      { value: "80%", label: "traffic from mobile" },
      { value: "74%", label: "average scroll depth" },
      { value: "51", label: "unique visitors" },
    ),
    note("Source: Vercel Web Analytics + Microsoft Clarity, 51 visitors across 52 Clarity sessions"),

    fig(
      "/case-studies/img/birthday/02.jpg",
      "Two phone screens from the site: the home screen with the two celebration dates and the Anastasiia's B-day wordmark, and the Day 2 agenda card with a timed schedule from 14:00 to 18:00",
      "wide",
      2560,
      1632,
    ),

    h2("anonymous", "Reserving a gift without an account"),
    p(
      "The wishlist needed two things that usually pull against each other: everyone has to see what is already reserved, and nobody should have to sign up or hand over personal data to reserve it.",
      "So the site has no accounts at all. Each visitor is identified only by a token generated and kept on their own device. The database stores which gift is taken and which anonymous token took it, never who that person is. Row-level security enforces that at the database, not in the interface, so the rule holds regardless of what the client asks for.",
      "The result is a one-click reservation whose status updates live for everyone else on the page, while the giver stays anonymous, including to me.",
    ),

    h2("process", "Process", "chapter"),
    p("Four days, around 20 hours of work."),
    cards(
      {
        num: "01",
        meta: "24 July · ~4 h",
        steps: ["Idea & Goal", "Requirements", "Information Architecture", "Wireframes"],
        text: "Next.js scaffolding, Supabase backend, first wireframe.",
      },
      {
        num: "02",
        meta: "27 July · ~2.5 h",
        steps: ["UI Exploration", "Responsive Design"],
        text: "Visual direction and the mobile layout.",
      },
      {
        num: "03",
        meta: "28 July · 9 commits",
        steps: ["Final UI", "Development"],
        text: "Design system, a critique pass, both agenda cards, the wishlist, and mobile polish.",
      },
      {
        num: "04",
        meta: "29 July · ~48 min",
        steps: ["Launch"],
        text: "Final polish and a security regression fixed before release.",
      },
    ),

    fig(
      "/case-studies/img/birthday/03.jpg",
      "Two phone screens: the Day 1 agenda with its timed schedule, and the Wishlist screen explaining that a reservation is anonymous and can only be cancelled from the same device, with counters showing 6 free and 15 reserved ideas",
      "wide",
      2048,
      2847,
    ),

    h2("tech", "What it's built with"),
    defs(
      { term: "Next.js 15", desc: "App Router: pages, layout, and the API route that reserves a gift" },
      { term: "React 19 + TS", desc: "components and types for bilingual (EN/UK) content" },
      { term: "Tailwind CSS v4", desc: "the entire layout, with no separate CSS files" },
      { term: "Framer Motion", desc: "a few targeted micro-animations" },
      { term: "Supabase", desc: "Postgres + row-level security + Realtime for live “reserved” status across devices, with no accounts" },
      { term: "Vercel", desc: "hosting and deploys, driven straight from Claude Code" },
      { term: "Figma", desc: "source of the mockups for the hero, both agenda cards, the wishlist, and the footer" },
      { term: "Claude Code + Impeccable", desc: "code generation, plus a design-process skill: init → document → critique" },
    ),

  ] satisfies Block[],
};
