---
target: Napa case study page
total_score: 16
max_score: 32
na_heuristics: 5,9
p0_count: 3
p1_count: 2
timestamp: 2026-08-26T08-16-41Z
slug: public-case-studies-loops-app-html
---
Method: dual-agent (A: design review · B: detector + browser evidence)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 1 | 22,224px scroll, zero orientation. Every h2 has an id anchor; nothing links to any of them. |
| 2 | Match System / Real World | 2 | "23 sections" — sections of what? Undefined unit carries the Outcome. "Loops" is product, tab, and object at once. |
| 3 | User Control and Freedom | 1 | One exit in 22,000px: a 20px logo. No back-to-top, no in-page nav, no contact. |
| 4 | Consistency and Standards | 1 | Two sections numbered 5/. Page numbers to 7 across 8 headings; diagram 03.jpg shows 4 stages. |
| 5 | Error Prevention | n/a | Static article, no input or destructive action. |
| 6 | Recognition Rather Than Recall | 1 | Site map opens on two undefined referents before either is described. |
| 7 | Flexibility and Efficiency | 1 | No skim path. .stats/.stat, blockquote, .note all styled and unused. |
| 8 | Aesthetic and Minimalist Design | 2 | 16,087 of 22,224px is JPEG (72%). 02.jpg shows the polished solution before "The problem". |
| 9 | Error Recovery | n/a | No error states on a static article. |
| 10 | Help and Documentation | 1 | .facts carries Role/Duration/Platform only. No year, client, tools, or ship status. |
| Total | | 16/32 | Two heuristics n/a. Weak. |

## Design Specificity Verdict

The artwork is unmistakably this product. The page around it is a generic long-form template.
Strip the images and the remaining prose fits any mobile app: "Analyzed 40 developer wireframes,
identified broken navigation and structural gaps, rebuilt the information architecture from
scratch" is a resume bullet, not a case study.

The page also opts out of the portfolio's own design system. PRODUCT.md Principle 1 makes one
visual world binding across surfaces; DESIGN.md specifies a printed-invitation world. This page is
plain white article: 24px figure radius (off the 8/10/32/40/999 scale), and a third blue
(--step:#0088d1) alongside --cta-blue #134bff and Streamer Sky #4c6bd6.

Deterministic scan: 13 findings, exit code 2. Two radius findings (24px, lines 76 and 84) are real.
em-dash-overuse (12 in body) is real. The nine design-system-font-size advisories are a false-
positive cluster: DESIGN.md defines landing-page tokens only and has no article/reading scale, so
the detector compares article typography against a token set never meant to cover it. side-tab on
blockquote is a false positive — a left border on a pull-quote is standard, and the blockquote is
unused anyway.

## Priority Issues

### P0 — The case has no ending, no result, no evidence it shipped
After 22,000px the page ends on empty background and cuts to "Other work". The only outcome content
is a deliverables list. No ship date, no link, no client quote, no metric, no year. blockquote is
styled and never used — the shape of a missing testimonial is baked into the CSS. The sibling case
answers this hard: 51 visitors, 77 page views, 0% rage-click, a live URL.
Fix: closing section before "Other work" — what the client did with it and when; one client sentence
in the unused blockquote; one reflection paragraph; a contact CTA using .btn--cta. Add Year and
Status to .facts.

### P0 — The argument lives inside the JPEGs
Sections with no prose: Process (the heading introducing the entire process). Orphan figures with
neither heading nor text: 12.jpg (1,623px — loop detail plus a paywall state, filed under "Main
screen", which it is not) and 17.jpg. One verbless fragment: Streak widget, 7/ Subscription flow
(2,623px image, the client's business question, one deliverables fragment).
The real reasoning is annotated inside the images — e.g. 15.jpg carries "An unregistered user sees a
teaser state — a masked wizard, locked features, and one clear ask". Unselectable, unsearchable,
invisible to screen readers, and ~4.5px effective at 390px width.
Fix: every section gets the Profile treatment — what was wrong specifically, what changed
specifically, why that was right. Lift the annotations out of the JPEGs into HTML.

### P0 — The numbering contradicts itself and the page's own diagram
Library and Profile are both 5/; everything after is off by one. The page runs to 7 across 8
numbered headings while 03.jpg presents 4 stages using the identical blue outlined-numeral device,
which tells the reader they are the same sequence. Diagram stage 4 (UI kit, logo & app icon) has no
section on the page at all, though Outcome claims both deliverables.
Fix: one taxonomy. The unnumbered-section-belongs-to-the-step-above intent is sound; it needs the
diagram's stage names to match the page's numbered level.

### P1 — Three structural roles, two visual weights
Plain h2 at 26.4px serves both top-level sections outside the process (Overview, The problem,
Outcome, Process) and subordinate children of a step (Site map, Streak widget). "Process" is parent
of all seven steps yet renders identically to "Site map", a child of step 1. That is the measured
cause of the author's repeated instinct that Process reads too small.
Measured: desktop h1 46.4 / step 40 / h2 26.4 / lead 20.8 / body 18. Mobile h1 32 / step 28.8 /
h2 26.4 — a 2.4px gap between the two heading systems, so on phones the numbered hierarchy does not
exist. Only one h3 on the whole page.
Baked-in screenshot text measured at ~27–28px against the page's own 26.4px h2 — the editorial layer
is subordinate to the illustration layer.
Fix: three distinct levels. Raise plain h2; raise the mobile floor of h2.step; thicken .step-num
stroke at small sizes. Or stop breaking figures to 1120px when their content occupies 470px.

### P1 — 3MB of the page is two thumbnails
Image weight 6.76MB across 19 files. article-image.png (1,534KB) and case-birthday.png (1,527KB)
render at 179x122 CSS px — scale factors 0.124x and 0.049x. Over 3MB for two thumbnails in "Other
work". 13.jpg is 717KB, upscaled from a 2736px source against 5472px elsewhere.
Fix: resize both thumbnails to their display size; re-export 13.png larger.

### P2 — Claims exceed evidence; two strong assets sit unused
06.jpg (app icon on a home screen) and 08.jpg (in-hand main screen) are on disk, referenced nowhere.
Outcome promises a cross-platform UI kit and documented edge cases; the page shows neither, and no
create-flow or notifications section despite naming both.

## What's Working

Line 137 is genuinely excellent case-study writing: "He came to me with 40 wireframes and a simple
ask: make this look good." Seventeen words establish client type, input volume, brief naivety, and
the gap being filled, with no self-praise.

The Profile section is the only complete argument and is the template for the rest: diagnosis with a
memorable label (navigation junk drawer), an inventory of the wrong, an inventory of the right, an
image showing both. 55 words. The reader convicts the old design themselves.

Screenshot craft survives scrutiny: paired dark/light panels, real domain content, and non-happy-path
states — empty, locked, unregistered, upsell. Most portfolios skip exactly those.

Technical baseline is clean: zero console errors, zero horizontal overflow at 390px and 768px, one
h1, no heading-level skips, every image has alt, all width/height attributes match intrinsic size so
there is no layout shift.

## Persona Red Flags

Recruiter, 90 seconds: three names in ten seconds — card says "Habit Tracking Mobile App", H1 says
Napa, screenshots say Loops. The card's EN description truncates mid-phrase at "gamified learning".
No promoted number anywhere despite .stat being defined with 3rem blue numerals. No date, no status.
Page terminates on blank background with no contact.

Freelance client: "within budget" reads as an unprompted defense with no scope figure behind it. The
commercial section — subscription — is one fragment over the tallest image. No trade-offs shown, so
no evidence of judgment under a two-week constraint. "Standart" misspelled in 14.jpg and in the prose.

Design lead: zero research, stated as fact — "I rebuilt the site map around how users think" and
"Users need a place to see and manage everything they've ever created" assert authority the case
never establishes. Before/after never shown in one frame: 04.jpg sits 6,000px from anything it
should be compared against. A "functional UI system" claimed for the wizard with no state mapping.

## Minor Observations

- .lead and .facts dt contrast 4.98:1 — passes AA by 0.48. Any further lightening breaks it.
- No skip link; first focusable element is the nav brand.
- 02.jpg places a polished finished screen between Overview and "The problem".
- Site map's opening paragraph forward-references a decision described in the next paragraph.
- Nothing in 07.jpg marks which concept is #4 or which was chosen.
- Body line length ~72 characters, above the 60ch maximum DESIGN.md states for itself.
- Page is English; sibling case is Ukrainian; homepage has an EN/UA toggle that lands here in English.
- CSS comments are Ukrainian, content English.
- 12 em-dashes in body text.

## Questions to Consider

1. If every image were removed, what would remain? Roughly 2,000px of prose out of 22,224. Is this a
   case study with supporting imagery, or a gallery with captions? The answer decides whether the fix
   is "write more" or "restructure".
2. Every section heading names a screen. None names a decision. What changes if they become "Why
   Profile stopped being a junk drawer", "Why the paywall sits at loop detail"? The Profile section
   already proves that voice exists.
3. Outcome sits at 3,050px, before Process. Front-loading results is right for a skimmer — but it
   currently front-loads a scope inventory, spending the tension the "make this look good" line just
   built. Make it a real outcome, or move it to the end.
4. Why does the most technically ambitious case live in the least designed page? DESIGN.md describes
   a world the birthday case executes with confidence. This page borrows nothing from it except a
   numeral style copied out of a screenshot.


## REVISION (after author clarified numbering intent)

Unnumbered sections are deliberately SUBORDINATE to the numbered step above them. Re-scored 10/32 -> 16/32.

The heading defect is not "too small" — it is INVERTED. "Process" is parent of seven steps and renders
at 26.4px while each child renders at 40px. Raising plain h2 to 32px does NOT fix this; the parent would
still be smaller than its children. The correct move is to SHRINK the step level and GROW the top level.

Four roles currently share two treatments:
  L1 top-level     Overview, The problem, Outcome, Process     plain h2 26.4px
  L2 numbered step 1/ .. 7/                                    h2.step 40px
  L3 subordinate   Site map, Streak widget                     plain h2 26.4px   <- identical to L1
  L3 same role     First open                                  h3 20px           <- inconsistent with above

Semantically Site map/Streak widget are marked h2, so the a11y tree reads them as SIBLINGS of the steps
they belong to — the outline is a flat list of twelve peers with one orphan h3.

Mobile: h2 26.4 vs h2.step 28.8 — a 2.4px gap. The numbered hierarchy does not exist on phones.
Full mobile ramp 32 / 28.8 / 26.4 / 20.8 / 18 — five levels inside 14px.

Proposed ramp (monotonic, ~1.35x steps):
  h1   46.4px desktop, mobile floor 36px
  L1   clamp(2.25rem, 4.5vw, 2.75rem) = 36-44px + hairline rule above, margin-top clamp(5rem,10vw,7rem)
       (this is DESIGN.md's own documented section-heading token — adopting, not inventing)
  L2   clamp(1.6rem, 3vw, 1.85rem) = 25.6-29.6px; numeral leaves the text flow into an eyebrow above,
       solid --step not outlined. Step identity comes from the numeral system and position, not size.
  L3   h3 1.35rem = 21.6px, one treatment for all three, 2px left rule in --step at 20%
  Desktop 46.4 -> 40 -> 29 -> 21.6 -> 18   Mobile 36 -> 30 -> 26 -> 19 -> 18

Typography alone will not hold: baked-in screenshot text measures ~33px ("Discovery & IA" in 03.jpg) and
~46px ("1-day streak!" in 10-streak-widget.jpg) against a 26.4px heading — 1.7x. Stop using .breakout as
the default. Reserve 1120px for the four figures that need it (03, 05-site-map, 07, 09-onboarding);
constrain every single-artefact figure to 672-840px.

## COPY AUDIT (author's top priority)

The story has no user. Not one sentence names who uses Napa. The hero shows "System Design" and
"Algorithms" loops — the real user is a developer cramming for interviews, vivid and memorable, and the
words never mention them. Both "how a user navigates a daily habit" and "how users think" assert
knowledge of users with no research, interviews, competitor scan, or even a proto-persona behind them.

Sections announce rather than decide:
- "Analyzed 40 developer wireframes, identified broken navigation and structural gaps, rebuilt the
  information architecture from scratch" — three verbs, no content. What was broken? Name one thing.
- "Designed the full flow from scratch: benefits screen, plan selection, promo code, payment, active
  subscription state" — a list of file names for the product's monetisation surface, 16 words under a
  3,886px image.
- "A running day count, a small calendar showing hit/miss/empty states, a daily recap card" — verbless
  inventory of parts. Why a streak? Why hit/miss/EMPTY rather than hit/miss? Does a miss reset it, and
  did she argue against a punishing reset? That is the interesting question and it is not asked.
- "I took that concept and turned it into a functional UI system" — claim with no evidence in prose.
  The best idea in the case (hat = anonymous, face = registered) exists only inside 17.jpg and its alt.

Two voices spliced: "I proposed four visual concepts to give the client a real choice, not just my
preference" (judgement, relationship) vs "Analyzed 40 developer wireframes..." (CV bullet). Pick first
person throughout.

Fragments are the default register, not a beat: "Four screens that introduce spaced repetition through
the product's own language, without jargon." No main verb. Cumulative effect reads like Figma layer names.

Onboarding says one thing twice — both sentences are about introducing; the second adds only "four" and
"without jargon."

"Concept 4 — light blue, clean, typographic — was selected." Nothing in 07.jpg marks the winner and the
alt lists them as green/purple/orange/light blue, so a reader counting to four cannot confirm which is #4.

Forward reference confirmed. Proposed replacement, decision named first:
  "I rebuilt the site map around how users think, not how the developer coded. The biggest change:
   everything that had been buried in Profile got its own place — Library, Subscription, and a dedicated
   Create flow. That one move is what gave the app a bottom navigation that makes sense, and it touched
   every screen after it."

On the early Outcome placement: the instinct is right, the execution is not. Front-loading a payoff on a
22,000px page is correct for the 80% who will not scroll. It fails because (a) it front-loads scope, the
least persuasive material available; (b) it is set in the same 18px bulleted body type as everything
else so it does not register as a payoff; (c) telling the ending before Process leaves seven steps with
no tension, and none of them contain conflict. Keep the position, change the job: make it a compact
high-contrast result block using the unused .stats cards, and move the deliverables checklist to the
bottom as an appendix.

Dead CSS is a map of the missing components: .stats/.stat, blockquote, and .note are all styled and never
used — a stat block, a client quote, and a caption. All three are exactly what the page needs.

No failure anywhere. Seven steps, no rejected direction, no constraint, no tradeoff, nothing that did not
work. A two-week full-IA rebuild with zero friction reads as a rendering of the work, not a record of it.
