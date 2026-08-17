import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Anastasiia Sihetii — Product Designer · Design Engineer",
  description:
    "Портфоліо Anastasiia Sihetii: проєктую і збираю продукти сама, від ідеї до продакшену.",
};

const DIRECTION_CONTRACT = `
  THESIS: The homepage opens like a book's front matter, not a hero-then-portfolio
  funnel -- colophon facts (role, stack, contact) sit up top as printed credentials,
  refusing the standard hero -> work grid -> about -> contact scroll.
  OWN-WORLD: Inherited verbatim from the shipped case study -- full-bleed color
  blocks (candle coral, ink near-black, forest, sky, card cream), Fixel Variable
  display type at huge geometric scale, JetBrains Mono for labels/stats, one
  rotated sticker badge, single-theme poster commitment, no light/dark branching.
  STORY: Visitor reads name/role in one glance, gets hard facts (stack, contact)
  the way a book states its printer and edition, opens the one real case study as
  proof, leaves through a signed-off close.
  FIRST VIEWPORT: Coral title-page block -- eyebrow, huge two-line name/role
  display type, one rotated sticker badge top-right, one-paragraph bio, no button
  yet -- the read continues by scrolling.
  FORM: Colophon-first structural candidate, ranked 7th of 7 grounded candidates,
  seed key 829e83f5.
  FINISH: unreviewed and undocumented is unfinished; this build ends with the
  finish review, the verdict, and DESIGN.md.
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="uk">
      <body>
        <div
          style={{ display: "contents" }}
          dangerouslySetInnerHTML={{ __html: `<!--${DIRECTION_CONTRACT}-->` }}
        />
        {children}
      </body>
    </html>
  );
}
