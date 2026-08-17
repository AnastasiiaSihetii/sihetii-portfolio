---
name: sihetii-portfolio
description: Bento-grid of full-bleed color blocks in a single-theme printed-invitation world
colors:
  candle: "#ff5000"
  wax: "#f0b429"
  forest: "#1e4a3a"
  sky: "#4c6bd6"
  ink: "#1b1620"
  canvas: "#ffffff"
  card: "#f5f3ec"
typography:
  display:
    fontFamily: "Fixel Variable, system-ui, sans-serif"
    fontSize: "clamp(3.1rem, 7.6vw, 5.8rem)"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Fixel Variable, system-ui, sans-serif"
    fontSize: "clamp(2.3rem, 5vw, 3.5rem)"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "-0.04em"
  body:
    fontFamily: "Fixel Variable, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "JetBrains Mono, ui-monospace, SF Mono, Menlo, monospace"
    fontSize: "0.72rem"
    fontWeight: 500
    letterSpacing: "0.14em"
rounded:
  sm: "8px"
  md: "10px"
  lg: "32px"
  pill: "999px"
spacing:
  sm: "0.5rem"
  md: "1.5rem"
  lg: "clamp(2.25rem, 5vw, 4.5rem)"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.canvas}"
    rounded: "{rounded.md}"
    padding: "0.9rem 1.4rem"
  tag:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.canvas}"
    rounded: "{rounded.sm}"
    padding: "0.5rem 0.85rem"
---

# Design System: sihetii-portfolio

## Overview

**Creative North Star: "The Printed Invitation"**

The system reads as a physical invitation card, not a web app: one full-bleed color block per topic, stacked like the sections of a paper program, each holding a huge geometric numeral or headline that could be printed on card stock. A single rotated sticker badge — the kind pressed onto an envelope — carries the one number worth remembering per viewport. Labels and stats speak in a dev-tool monospace, a knowing wink that this "printed" object was actually generated in days, not weeks. The system deliberately commits to one printed world rather than an adaptive UI: no light/dark branching, no theme switching. It was proven first on the birthday-website case study (sweet27.vercel.app) and the homepage inherits it verbatim rather than reinterpreting it.

**Key Characteristics:**
- Full-bleed color blocks, one hue per topic, stacked vertically with generous rounded corners
- Huge geometric display numerals and headlines set in a variable display face
- Dev-tool monospace for every label, tag, stat, and footer credit line
- Exactly one rotated sticker badge per surface, carrying the single most important stat
- Flat by default; the sticker's drop shadow is the system's only elevation device
- Single-theme commitment — no `prefers-color-scheme` or `data-theme` branching anywhere

## Colors

A warm cream-and-ink base punctuated by one loud accent per section, borrowed from birthday-party materials: candle flame, melted wax, party ribbon, streamer blue.

### Primary
- **Candle Flame Coral** (`#ff5000`): the hero/title-page block and every primary call-to-action button's implied energy. Used at full-bleed block scale, never as a small accent — this color owns a whole section or nothing.

### Secondary
- **Melted Wax Gold** (`#f0b429`): the sticker badge and any "wax"-role highlight (stat numerals inside dark blocks). Reserved for the one number per viewport that must not be missed.

### Tertiary
- **Party Forest Green** (`#1e4a3a`): an alternate full-bleed topic block (process/stat sections) when a page needs a second dark block distinct from ink.
- **Streamer Sky Blue** (`#4c6bd6`): an alternate full-bleed topic block for a third, cooler section when a page needs more than two hues in rotation.

### Neutral
- **Deep Wick Ink** (`#1b1620`): primary text color everywhere; background for the system's dark blocks; text-on-canvas for buttons and tags.
- **Canvas White** (`#ffffff`): page background outside the blocks; text-on-ink for buttons and tags.
- **Invitation Card Cream** (`#f5f3ec`): the warm off-white block background used for index/listing content (case-study cards); softer than pure canvas, evokes card stock.

### Named Rules
**The One Hue Per Block Rule.** A `.block` owns exactly one background color from the palette and applies it full-bleed to the whole section — colors are never mixed within a single block or scattered as small accents across a neutral ground.

## Typography

**Display Font:** Fixel Variable (variable weight 100–900, width 87.5–100%), with `system-ui, sans-serif` fallback
**Body Font:** Fixel Variable at body weight, with `-apple-system, BlinkMacSystemFont, sans-serif` fallback
**Label/Mono Font:** JetBrains Mono, with `ui-monospace, SF Mono, Menlo, monospace` fallback

**Character:** A single variable family carries both display and body duty — display type stretches to 100% width and pushes to 900 weight for huge geometric numerals; body text relaxes to 87.5% width for a warmer, slightly condensed reading rhythm. JetBrains Mono is the system's "receipt printer" voice: every label, tag, and stat is monospace, uppercase, and tracked wide.

### Hierarchy
- **Display** (600–900 weight, `clamp(3.1rem, 7.6vw, 5.8rem)`, line-height 1.05): page/section title numerals and names (`h1.hero-title`), and standalone stat numerals inside dark blocks (900 weight, gold).
- **Headline** (600 weight, `clamp(2.3rem, 5vw, 3.5rem)`, line-height 1.05): section headings within a block (`h2.sec-title`).
- **Title** (500 weight, letter-spacing -0.02em): `h3`-level subheads, used sparingly.
- **Body** (400 weight, 1rem, line-height 1.6, max 60ch): paragraph copy; font-stretch 87.5% throughout.
- **Label** (500 weight, 0.72–0.76rem, uppercase, letter-spacing 0.14em, mono): eyebrows, tags, meta keys, stat captions, footer credit.

### Named Rules
**The Mono-Label Rule.** Any text that names, tags, or measures something (eyebrow, tag, meta key, stat caption) is JetBrains Mono, uppercase, tracked wide — never the display or body face, however short the string.

## Layout

A single centered column (`max-width: 1180px`) of full-bleed blocks stacked vertically with `clamp(1.5rem, 4vw, 2.75rem)` gaps between them — there is no side-by-side multi-column grid; "bento" describes the color-block rhythm of the stack, not a literal grid layout. Each block pads its content with `clamp(2.25rem, 5vw, 4.5rem)` vertical and `clamp(1.5rem, 6vw, 4.25rem)` horizontal space, and most block content constrains to a `40rem` (or occasionally `44rem`) inner column even inside a full-width block, so line length stays readable against the full-bleed color. Below 720px, block padding tightens, block radius drops from 32px to 22px, and the sticker badge leaves its absolute top-right position to sit static above the block content.

## Elevation & Depth

Flat by default — blocks, tags, buttons, and cards carry no shadow at rest. The sole shadow in the system belongs to the sticker badge (`0 8px 20px rgba(0,0,0,0.14)`), which needs to visually lift off the block behind it since it is sometimes the same hue as its background. Buttons signal interactivity through a small `translateY(-2px)` lift on hover, not a shadow change.

### Named Rules
**The Sticker-Only Shadow Rule.** Shadow is reserved for the one rotated sticker badge per surface. No other component — button, tag, card, block — ever carries a `box-shadow`.

## Shapes

Large, confident rounding throughout: blocks round at 32px (22px on mobile), tags and buttons at 8–10px, and the sticker/eyebrow/pill elements go fully round at 999px. No hard corners appear anywhere in the system — every rectangle is at minimum an 8px radius. No borders separate blocks from the page; separation comes entirely from the color change itself. Inside dark blocks, hairline dividers (`--line-on-dark`, 18% white) separate list rows (colophon, tech-list); inside light blocks, the equivalent is `--line-on-light` (14% ink).

## Components

Playful and loose: components read as pieces of party ephemera — a sticker, a stamped tag, a stapled program — rather than a polished SaaS UI kit. Nothing is precisely aligned to a strict grid line; the sticker's -6° rotation is the clearest signal that this system prizes charm over rigidity.

### Buttons
- **Shape:** 10px radius (`.btn`), 8px for the smaller `.tag` pill
- **Primary:** ink background, canvas text, `0.9rem 1.4rem` padding, mono font at 700 weight
- **Hover:** `translateY(-2px)` lift, no shadow or color change
- **On dark blocks:** an available `.btn--on-dark` swaps to wax background / ink text for contrast against ink or forest

### Tags
- **Style:** ink background, canvas text on light blocks; on dark blocks (`.block--ink`, `.block--forest`), tags flip to a translucent white fill (`rgba(245,243,236,0.12)`) with a hairline border instead of solid ink-on-ink
- **State:** static only — tags are labels, not interactive filters, in this system

### Cards / Containers (`.block` and its color variants)
- **Corner Style:** 32px radius (22px mobile)
- **Background:** one full palette color per block — candle, ink, forest, sky, or card
- **Shadow Strategy:** none (see Elevation)
- **Border:** none; color change is the only boundary
- **Internal Padding:** `clamp(2.25rem, 5vw, 4.5rem)` vertical / `clamp(1.5rem, 6vw, 4.25rem)` horizontal

### Sticker (signature component)
A rotated (-6°) pill badge, wax-gold by default (candle-on-candle for the hero variant), carrying one huge display numeral (`<strong>`, 800 weight, 1.5rem) plus a mono caption underneath. Exactly one per surface — it is the system's single loudest device, and using more than one per viewport would flatten its impact.

### Colophon list (signature component)
A two-column key/value list (`.colophon-list`, mirrors the case study's `.tech-list`) used for dense factual rows on dark blocks — mono, uppercase, wax-colored keys on the left in a fixed-width column, canvas-colored values on the right, hairline dividers between rows. Collapses to a single stacked column under 720px.

### Navigation
No persistent nav chrome exists in this system; wayfinding is scroll-based within a single page, reinforced by mono "↓ [next section name]" cues rather than a nav bar.

## Do's and Don'ts

### Do:
- **Do** give every block exactly one palette color, full-bleed, with no gradient or mixing.
- **Do** keep every label, tag, meta key, and stat caption in JetBrains Mono, uppercase, tracked wide.
- **Do** reserve the sticker badge for a single, real, load-bearing stat — never decorative.
- **Do** constrain block content to a 40–44rem inner column even at full block width, so text stays readable against the color field.
- **Do** use 900-weight display numerals (wax-gold on dark blocks) for standalone stats.

### Don't:
- **Don't** add `prefers-color-scheme` or `data-theme` branching — this system commits to one printed world, not an adaptive UI.
- **Don't** add a shadow to anything except the sticker badge.
- **Don't** use more than one sticker badge per viewport.
- **Don't** introduce hard square corners; every rectangle carries at least an 8px radius.
- **Don't** number case studies or index entries in a way that implies a series ("Кейс · 01") until a second entry actually exists.
