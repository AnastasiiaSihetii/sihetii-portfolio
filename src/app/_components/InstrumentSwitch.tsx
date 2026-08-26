"use client";

import Link from "next/link";
import type { ReactNode } from "react";

/* ------------------------------------------------------------------
   Instrument switch — the footer's two-state control.

   The generic segmented pill it replaces opted out of three of this
   system's own strongest moves: the Mono-Label voice, CTA Blue, and the
   cursor's geometric vocabulary. This one uses all three. The chassis is
   still the system's 999px pill; what changed is that the marker travels
   between cells instead of re-painting, and each cell can carry a drawn
   glyph of the thing it selects. No caption and no rule above the track —
   the cells name the control themselves.
   ------------------------------------------------------------------ */

export type SwitchOption<T extends string> = {
  value: T;
  label: string;
  glyph?: ReactNode;
  /**
   * Якщо стан живе в адресі, комірка стає посиланням, а не кнопкою.
   * Так зроблено для мови: українська версія має власний URL, і перемикач
   * має бути тим, чим він насправді є — переходом. Кнопка, що змінює
   * сторінку не міняючи адреси, ховає її від пошуку й від кнопки «назад».
   */
  href?: string;
};

export function InstrumentSwitch<T extends string>({
  label,
  options,
  value,
  onChange,
  accent = "ink",
}: {
  label: string;
  options: readonly [SwitchOption<T>, SwitchOption<T>];
  value: T;
  /** Потрібен лише коміркам-кнопкам; комірки-посилання ведуть самі. */
  onChange?: (next: T) => void;
  /** Which colour the travelling marker takes in its current position. */
  accent?: "ink" | "blue";
}) {
  const index = Math.max(
    0,
    options.findIndex((o) => o.value === value),
  );

  return (
    <div className="switch">
      {/* The name is carried by aria-label, not by visible text: the two cells
          say what the control does, and a caption over each one made the footer
          read as a settings form. */}
      <div
        className="switch-track"
        role="group"
        aria-label={label}
        data-accent={accent}
      >
        <span
          className="switch-marker"
          aria-hidden="true"
          style={{ "--i": index } as React.CSSProperties}
        />
        {options.map((option) => {
          const active = value === option.value;
          const inner = (
            <>
              {option.glyph && (
                <span className="switch-glyph" aria-hidden="true">
                  {option.glyph}
                </span>
              )}
              {option.label}
            </>
          );
          /* Вигляд той самий, роль різна: посилання оголошує себе поточною
             сторінкою, кнопка — натиснутим станом. Стилі чіпляються за обидва
             атрибути, тож комірка виглядає однаково. */
          return option.href ? (
            <Link
              key={option.value}
              href={option.href}
              className="switch-cell"
              hrefLang={option.value}
              aria-current={active ? "page" : undefined}
              data-active={active || undefined}
            >
              {inner}
            </Link>
          ) : (
            <button
              key={option.value}
              type="button"
              className="switch-cell"
              aria-pressed={active}
              data-active={active || undefined}
              onClick={() => onChange?.(option.value)}
            >
              {inner}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* The cursor's own trail, at 10px: circle, diamond, square, triangle, the four
   shapes the canvas cycles through, tapering away from the head exactly as they
   do on screen. Drawn rather than borrowed from an icon set, because no icon set
   has this site's cursor in it. */
export const TrailGlyph = (
  <svg viewBox="0 0 27 10" className="glyph-trail" role="presentation">
    <circle cx="2" cy="5" r="1.5" />
    <path d="M8 2.9 10.1 5 8 7.1 5.9 5Z" />
    <rect x="13.3" y="2.3" width="5.4" height="5.4" />
    <path d="M21.4 1.6 26.6 5 21.4 8.4Z" />
  </svg>
);

/* The pointer the system hands back when the drawn one stands down. */
export const ArrowGlyph = (
  <svg viewBox="0 0 11 14" className="glyph-arrow" role="presentation">
    <path d="M1 1v11.2l3.05-2.85 1.8 3.85 1.9-.9-1.8-3.7 4.15-.1Z" />
  </svg>
);
