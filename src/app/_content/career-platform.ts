import { h2, h3, note, p, stats, ul, type Block } from "./blocks";

/* Кейс під NDA: назви продукту, партнерів, домену й команди тут немає і не
   має з'явитися — ані в тексті, ані в назві файлу чи адресі сторінки.
   Кадрів теж немає, тому картка на головній і мініатюра в «Інших роботах»
   рендеряться без зображення. */
export const careerPlatform = {
  href: "/case-studies/ai-career-platform",
  /* Фіолетовий акцент продукту замість дефолтного синього сайту. Світліший
     відтінок із тієї ж палітри: на сірій плитці дає 6.4:1, з запасом над AA. */
  accent: "#5f32db",
  title: "Design engineering for an AI career platform",
  metaTitle: "Design engineering for an AI career platform — case study",
  metaDescription:
    "A B2B2C career-guidance platform for the German-speaking market. I do the whole interface here: product decisions, a design system of 84 components, and the front end I build and ship myself. Under NDA, so no visuals.",

  lead: [
    "A career-guidance platform for the German-speaking market. An AI advisor holds a conversation with the user, diagnoses their skill profile, and ends with a concrete next step: a retraining course that closes the gap, or jobs they are already qualified for.",
    "My part is the whole interface: product decisions, the design system, and the front end, which I build and ship myself. The project is under NDA, so there are no screens here.",
  ],

  facts: [
    { label: "My role", value: "Design Engineer, UX/UI and front end" },
    { label: "Period", value: "Since July 2026, ongoing" },
    { label: "Stack", value: "Next.js, React, TypeScript, Tailwind, Base UI, next-intl, Motion" },
    { label: "Tools", value: "Claude Code, Claude in Chrome, GitHub, Vercel, Figma" },
  ],

  blocks: [
    h2("overview", "Overview"),
    p(
      "The product is freemium. The diagnostic and the full result are free. A paid tier adds the application tooling on top: CV designs, cover letters, an apply-by-email helper.",
      "The team is four people: the client, a backend developer, a business analyst, and me. The business model and the backend plan were already settled. What I got was a generated prototype. 103 files, about 30,000 lines, 21 screens that looked roughly right. Underneath they shared almost nothing. Buttons and inputs were redefined from page to page, the stylesheet held no design tokens, and nobody had counted the accessibility failures.",
      "Nothing here goes through a handover. I decide how a screen should work and then build it, so design questions get settled in the code. The backend belongs to the developer, so my side runs on mock data.",
    ),

    h2("audience", "The audience"),
    p(
      "German users are sceptical of AI, and their main worry is what happens to their personal data. Reassuring copy does nothing for that. Trust has to come from what the product visibly does.",
      "The audience is a broad professional one, and people arrive while deciding what to do next in their career. So the interface has to be readable at first sight: no jargon, no assumed familiarity with tools like this, and a calm register throughout. Here, legible type, generous touch targets and plain wording carry a competitive advantage of their own.",
    ),

    h2("outcome", "Outcome"),
    stats(
      { value: "8 → 4", label: "navigation sections. A chaotic structure became a simple one the planned mobile app can reuse" },
      { value: "36 → 84", label: "ad-hoc components became a design system, so a new page is faster to build and quick to adapt" },
      { value: "AA", label: "contrast, type size, keyboard and focus handling, covered across the product" },
      { value: "0 → 1", label: "the business now has a product, and one it can scale" },
    ),
    h3("changed", "What changed"),
    ul(
      "Readable to more people. Body text failed AA contrast in 191 places, and nobody had measured the rest. Fixed in one token, with a 16px floor in form fields so the phone stops zooming. Evidence: a dated WCAG 2.1 AA baseline, open findings tracked against it",
      "A structure you can hold in your head. Settings, pricing and signing out moved into a menu, and the results view folded into the dashboard. Evidence: the navigation definitions, then and now",
      "No handoff, so nothing is lost in one. Design and build sit in one pair of hands, so there is no spec for the code to drift from, and a decision runs the same day. Evidence: 58 commits in four weeks",
    ),

    h3("built-to-change", "What it was built to change"),
    ul(
      "Conversion into the paid tier. Free users were told CV adaptation existed but never saw it work. Now the first adaptation of each posting is free and the repeat is paid",
      "Fewer destructive mistakes. Signing out and deleting an account were one click each. Both now ask first, and deletion asks the user to type the word",
    ),

    note("The project is still in development."),
  ] satisfies Block[],
};
