# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js (App Router, TypeScript, Tailwind CSS) — user's explicit choice, made before this record existed.

## Users

Two audiences, both arriving to evaluate Anastasiia Sihetii's work before deciding whether to reach out:
1. Recruiters / hiring managers assessing her for full-time Product Designer / Design Engineer roles.
2. Freelance or project clients considering hiring her for design or build work on their own product.

## Product Purpose

Personal portfolio site. Showcases real, complete case studies of her design + build work so either audience can judge craft and decide to make contact.

## Positioning

Two things a neighboring portfolio couldn't truthfully claim together:
- **AI-native workflow, not a slower "AI-assisted" hedge.** She designs and ships production work in days using Claude Code + Figma — evidenced by the featured case study (4 days idea-to-launch, 22 commits).
- **Design + code in one person.** She is the Design Engineer — no handoff to a separate developer between mockup and shipped product.

## Operating Context

Case studies are documented as structured project write-ups (role, duration, stack, process steps, outcomes). They began as standalone static HTML pages in `public/`; that is no longer true. Every one is now a Next.js route rendered by a shared `EditorialPage` component from a plain content file in `src/app/_content/`, and the old `.html` addresses are kept alive by permanent redirects in `next.config.ts`. A new case study is one content file plus a three-line route; it needs no markup of its own.

## Capabilities and Constraints

- Three case studies exist and are published: the AI career platform (under NDA, no visuals), Napa (habit tracking, a two-week sprint), and the birthday website (sweet27.vercel.app). One long-form article is published as well. Nothing here is filler, and the homepage still should not promise a count or use "coming soon" copy for work that is not ready.
- The case studies are written in English; the article is written in Ukrainian. Neither has a translation, and none should be invented — a locale route that serves untranslated text is worse than no locale route.
- No resume/CV file has been provided. Do not fabricate a download link. The two "Download CV" buttons currently point at `#` by the site owner's explicit decision, pending a real link.
- Additional personal/career context exists in a separate Claude Project ("career-consultant") that is not accessible from this session — do not invent facts attributed to it.

## Brand Commitments

- Name: Anastasiia Sihetii. Role line: "Product Designer · Design Engineer."
- Site language: the homepage exists in both English and Ukrainian, at `/` and `/uk`, with English as the default and as `x-default`. Individual work pages are single-language and declare their own language on `<article lang>`.
- Visual world is binding and documented in DESIGN.md under the north star "The Poster and the Page": a plain-white cover whose wordmark runs under the crop, full-bleed one-colour case cards, poster-scale CTA pills, and a quiet single-column reading world for cases and articles. The earlier bento-block system it grew out of survives only on the internal `/cursor` lab page. Single-theme commitment holds: no light/dark branching anywhere. New surfaces extend this system rather than introducing a second visual language.

## Evidence on Hand

- Case study: `public/case-studies/birthday-website.html` — real, complete, shipped project (Sweet27 birthday site, live at sweet27.vercel.app).
- Contact: email anastasiia.sihetii@gmail.com · GitHub github.com/AnastasiiaSihetii · LinkedIn https://www.linkedin.com/in/anastasiia-sihetii/.
- No testimonials, client logos, press, or additional case studies exist yet — none should be fabricated.

## Product Principles

1. One coherent visual world across every surface — the homepage and the case study must read as the same product, not two different ones stitched together.
2. Evidence over claims — reference only the one real case study; no invented testimonials, logos, or projects.
3. Speed and craft are one story, not two — the AI-native workflow is a credibility asset; build/process detail belongs on the page, not hidden.
4. Serve both audiences in one confident opening rather than splitting the page into separate recruiter/client tracks.

## Accessibility & Inclusion

No project-specific requirement confirmed; standard web accessibility practice applies.
