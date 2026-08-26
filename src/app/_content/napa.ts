import { fig, h2, h3, ol, p, ul, type Block } from "./blocks";

const img = (name: string) => `/case-studies/img/loops/${name}`;

export const napa = {
  href: "/case-studies/loops-app",
  title: "Napa: habit tracking built on spaced repetition",
  metaTitle: "Napa: a habit tracking app built on spaced repetition — case study",
  metaDescription:
    "A case study on Napa, a mobile habit app built on spaced repetition. From 40 developer wireframes to a complete product: new information architecture, full UX/UI, component library, character and brand — delivered in a two-week sprint.",

  lead: [
    "A mobile app built around spaced repetition. Designed end-to-end in a 2-week sprint: from a chaotic set of developer wireframes to a complete, gamified learning experience.",
  ],

  facts: [
    { label: "My role", value: "Product Designer" },
    { label: "Duration", value: "2-week sprint" },
    { label: "Platform", value: "iOS and Android" },
  ],

  /* Кадр для картки в секції Cases на головній. Формат 16:9 під плитку 2:1,
     тому композиція інша, ніж у героя сторінки. */
  card: {
    src: "/case-loops.jpg",
    alt: "Головний екран Napa: банер стріку, фільтри по датах і картки повторень",
    width: 2240,
    height: 1260,
  },

  hero: {
    src: img("01-hero.jpg"),
    alt: "Napa main screen: the Loops header, a streak banner with repetition days, Today and Tomorrow filters, and the System Design and Algorithms cards",
    width: 2560,
    height: 2157,
  },

  /* Порядок блоків = порядок на сторінці. */
  blocks: [
    h2("overview", "Overview"),
    p(
      "Napa is a mobile app built around spaced repetition — a learning method that schedules memory reviews at optimal intervals, so you remember more with less effort.",
      "The client was an independent developer with a solid concept: an app for building any memory habit — vocabulary, formulas, facts — using fully customizable repetition intervals. He came to me with 40 wireframes and a simple ask: make this look good. What followed was a complete rethinking of how the app was structured, navigated, and communicated — delivered in two weeks, cross-platform, within budget.",
    ),

    fig(img("02.jpg"), "Napa sign-in screen with the tagline Repeat smarter — remember longer! and the 3D wizard character beside it", "mid", 2560, 1632),

    h2("problem", "The problem"),
    p("The architecture was built around how a developer thinks, not how a user navigates a daily habit. Three core problems stood out:"),
    ol(
      "Navigation was hidden inside Profile. Categories, all loops, subscription, promo codes — everything lived there. The Profile tab was doing the job of four different sections, and none of them well.",
      "The main screen had no motivational layer. A flat list of cards sorted by date, with no sense of progress or momentum.",
      "The wireframes had significant gaps. There was no Library — no place for users to manage all their loops and categories outside of today's schedule. There was no onboarding. The subscription flow was a rough reference, not a real design.",
    ),

    h2("outcome", "Outcome"),
    p("The client received a production-ready design that covered every screen, state, and edge case:"),
    ul(
      "23 sections covering full app scope: auth, onboarding, main screen, library, create flow, loop details, profile (2 states), subscription flow, notifications",
      "The daily habit loop has a motivational layer",
      "Onboarding explains the product's value in 4 screens",
      "Library gives users control over their content",
      "The visual system is consistent, distinctive, and scalable",
      "Complete UI kit for cross-platform (iOS + Android)",
      "Logo and app icon",
      "All edge cases designed and documented",
    ),

    h2("process", "Process", "chapter"),
    fig(img("03.jpg"), "Four stages of the work: Discovery & IA, Visual direction, UX & UI design, UI kit, logo & app icon", "wide", 2560, 1497),

    h2("discovery", "Discovery & IA", "step"),
    p("Analyzed 40 developer wireframes, identified broken navigation and structural gaps, rebuilt the information architecture from scratch."),
    fig(img("04.jpg"), "A set of black and white developer wireframes: repetition lists, an item detail, a profile screen and a grid of the remaining screens", "mid", 2560, 1037),

    h3("site-map", "Site map"),
    p(
      "This single restructuring decision touched every other part of the design. It's also what made the bottom navigation make sense.",
      "I rebuilt the site map around how users think, not how the developer coded. The biggest change: everything that didn't belong in Profile got its own place — Library, Subscription, and a dedicated Create flow.",
    ),
    fig(img("05-site-map.jpg"), "App site map: splash, log in and sign up, onboarding, the main Loops section, Profile with its subsections, and Library", "wide", 2560, 2154),

    h2("moodboard", "Moodboard & visual direction", "step"),
    p(
      "I proposed four visual concepts to give the client a real choice, not just my preference.",
      "Concept 4 — light blue, clean, typographic — was selected.",
    ),
    fig(img("07.jpg"), "Four visual direction concepts — green, purple, orange and light blue — each shown on a sign-in screen and a main screen", "wide", 2560, 2642),

    h2("onboarding", "Onboarding", "step"),
    p("Each screen introduces exactly one concept. Four screens that introduce spaced repetition through the product's own language, without jargon."),
    fig(img("09-onboarding.jpg"), "Four onboarding screens: the idea of spaced repetition, categories and daily limits, customizable strategies, and streak mechanics", "wide", 2560, 3033),

    h3("streak", "Streak widget"),
    p("A running day count, a small calendar showing hit/miss/empty states, a daily recap card."),
    fig(img("10-streak-widget.jpg"), "Three states of the streak widget: empty with an invitation to start, an active one-day streak, and a three-day streak with locked days and an upsell", "mid", 2560, 2653),

    h2("main", "Main screen", "step"),
    p(
      "The developer's version: a date-sorted list of cards. Functional, but flat.",
      "My version: a daily habit tracker with a streak, filters, and a reason to come back tomorrow.",
    ),
    fig(img("11-main-screen.jpg"), "The main screen in two states: empty for an unregistered user, and filled with repetition cards, next to the create menu", "mid", 2560, 1536),
    fig(img("12.jpg"), "The loop detail screen with current level, next repetition date and schedule, next to a locked state offering an upgrade", "mid", 2560, 3848),

    h2("library", "Library", "step"),
    p("Users need a place to see and manage everything they've ever created — all loops, all categories, all interval strategies — regardless of schedule."),
    fig(img("13.jpg"), "The Library screen on an iPhone: Loops, Categories and Intervals tabs, and a list of cards with tags", "mid", 2560, 2601),

    h3("first-open", "First open"),
    p("Loops and Categories prompt the user to create their first item. Intervals come pre-loaded with three ready-to-use strategies."),
    fig(img("14.jpg"), "Empty states for the Loops and Categories tabs, and the interval strategy list: Standart, Fibonacci, Number π", "mid", 2560, 1829),

    h2("profile", "Profile", "step"),
    p(
      "The developer's Profile tab was a navigation junk drawer: categories, loops lists, subscription, promo codes, delete and restore actions all lived there.",
      "I stripped it down to what Profile should actually contain: personal info, notifications, password management, payment methods, and account actions.",
    ),
    fig(img("15.jpg"), "The profile in two states: an unregistered user with a faceless wizard, and a registered one with name, email and streak", "mid", 2560, 1527),

    h2("wizard-character", "Wizard character system", "step"),
    p(
      "The client had one request: a wizard mascot. A wise old teacher who guides and helps.",
      "I took that concept and turned it into a functional UI system.",
    ),
    fig(img("16-wizard-character-system.jpg"), "The full-body 3D wizard character and five of its states as round avatars", "mid", 2560, 2306),
    fig(img("17.jpg"), "Two avatars side by side: an empty hat with glasses for an anonymous user, and the wizard with a face for a registered one", "mid", 2560, 1632),

    h2("subscription", "Subscription flow", "step"),
    p("Designed the full flow from scratch: benefits screen, plan selection, promo code, payment, active subscription state."),
    fig(img("18.jpg"), "Napa Pro subscription screens: plan selection, annual and monthly tiers, free trial timeline and subscription management", "mid", 2560, 6218),
  ] satisfies Block[],
};
