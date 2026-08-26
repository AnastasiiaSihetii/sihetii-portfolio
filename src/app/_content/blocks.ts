import type { ReactNode } from "react";

/* ──────────────────────────────────────────────────────────────
   Модель контенту редакційної сторінки.

   Сторінка — це плаский список блоків у тому порядку, в якому вони
   стоять на екрані. Так «постав зображення перед заголовком» — це
   переставити два рядки, а не переписувати вкладену структуру.

   Нижче конструктори: у файлі контенту пишеться h2(...), p(...), fig(...),
   і дані читаються як сама сторінка.
   ────────────────────────────────────────────────────────────── */

export type HeadingVariant = "chapter" | "step";

export type Block =
  | { kind: "heading"; level: 2 | 3; id: string; text: string; variant?: HeadingVariant }
  | { kind: "text"; items: ReactNode[] }
  | { kind: "list"; ordered: boolean; items: ReactNode[] }
  | { kind: "figure"; src: string; alt: string; width: number; height: number; size: FigureSize; caption?: string }
  | { kind: "stats"; items: { value: string; label: ReactNode }[] }
  | { kind: "quote"; text: ReactNode; cite?: string }
  | { kind: "cards"; items: { num: string; meta: string; steps?: string[]; text: string }[] }
  | { kind: "defs"; items: { term: string; desc: ReactNode }[] }
  | { kind: "note"; text: ReactNode }
  | { kind: "separator" };

/** hero — під заголовком, mid — одиничний кадр, wide — на всю сітку */
export type FigureSize = "hero" | "mid" | "wide";

export const h2 = (id: string, text: string, variant?: HeadingVariant): Block =>
  ({ kind: "heading", level: 2, id, text, variant });

export const h3 = (id: string, text: string): Block =>
  ({ kind: "heading", level: 3, id, text });

/** Кожен аргумент — окремий абзац */
export const p = (...items: ReactNode[]): Block => ({ kind: "text", items });

export const ol = (...items: ReactNode[]): Block => ({ kind: "list", ordered: true, items });
export const ul = (...items: ReactNode[]): Block => ({ kind: "list", ordered: false, items });

export const stats = (...items: { value: string; label: ReactNode }[]): Block =>
  ({ kind: "stats", items });

export const quote = (text: ReactNode, cite?: string): Block => ({ kind: "quote", text, cite });

/** Пронумеровані картки: етап, дата, перелік кроків, підсумок */
export const cards = (...items: { num: string; meta: string; steps?: string[]; text: string }[]): Block =>
  ({ kind: "cards", items });

/** Пари «назва — навіщо»: стек, інструменти, словник */
export const defs = (...items: { term: string; desc: ReactNode }[]): Block =>
  ({ kind: "defs", items });

/** Дрібний приглушений рядок: джерело даних, дата зрізу */
export const note = (text: ReactNode): Block => ({ kind: "note", text });

export const sep = (): Block => ({ kind: "separator" });

/**
 * Кадр. `src` — шлях від кореня public.
 * Розміри обов'язкові: без них сторінка стрибає, поки вантажаться картинки.
 */
export const fig = (
  src: string,
  alt: string,
  size: FigureSize,
  width: number,
  height: number,
  caption?: string,
): Block => ({ kind: "figure", src, alt, size, width, height, caption });
