"use client";

import { useEffect, useRef, useState } from "react";
import "./cursor-lab.css";

type Id = "sticker" | "ruler" | "bleed" | "confetti" | "magnet" | "reg";

type Variant = {
  id: Id;
  no: string;
  name: string;
  block: string;
  lead: string;
  meta: string[];
  cta: string;
};

const VARIANTS: Variant[] = [
  {
    id: "sticker",
    no: "01",
    name: "Стікер",
    block: "block--ink",
    lead: "Той самий стікер, що вже лежить на сайті, зменшений до розміру курсора — з тим самим нахилом −6° і тією самою тінню. Над клікабельним розкривається в пілюлю з підписом дії.",
    meta: ["Варіант 01", "Wax", "Розкривається в пілюлю"],
    cta: "Відкрити",
  },
  {
    id: "ruler",
    no: "02",
    name: "Лінійка",
    block: "block--card",
    lead: "Перехрестя з живим лічильником. На порожньому полі показує координати, над елементом — його справжній розмір у пікселях і бере його в пунктирну рамку.",
    meta: ["Варіант 02", "Ink", "Вимірює те, на що дивишся"],
    cta: "Виміряти",
  },
  {
    id: "bleed",
    no: "03",
    name: "Розтікання",
    block: "block--cream",
    lead: "Синє коло з головної веде за собою шлейф фігур — ромб, квадрат, трикутник і знову коло, кожна менша за попередню і кожна наступна іншого кольору. Форма й колір кожної фігури випадають випадково, тож двічі однакового шлейфа не буває; єдине правило — сусіди ніколи не збігаються. Над клікабельним голова й шлейф підростають.",
    meta: ["Варіант 03", "Голова — синій #134bff", "5 кольорів, форма й колір випадкові"],
    cta: "Лишити слід",
  },
  {
    id: "confetti",
    no: "04",
    name: "Конфеті",
    block: "block--forest",
    lead: "Курсор — золотий клаптик паперу, що сипле за собою дрібні шматочки всієї палітри. Швидше ведеш — густіше сиплеться; зупинився — усе осідає й гасне.",
    meta: ["Варіант 04", "Уся палітра", "Реагує на швидкість"],
    cta: "Розсипати",
  },
  {
    id: "magnet",
    no: "05",
    name: "Магніт",
    block: "block--sky",
    lead: "Кільце відстає від крапки на пів удару, а коли підводиш до кнопки — прилипає до неї й приймає її форму, від пілюлі до прямокутника.",
    meta: ["Варіант 05", "Cream", "Прилипає до форми"],
    cta: "Притягнути",
  },
  {
    id: "reg",
    no: "06",
    name: "Приводка",
    block: "block--candle",
    lead: "Друкарські мітки приводки — ті, за якими зводять фарби на аркуші. Над елементом чотири кути розлітаються й беруть його в рамку, як перед друком.",
    meta: ["Варіант 06", "Ink", "Береться в рамку"],
    cta: "Звести",
  },
];

const CHIP_COLORS = ["#ff5000", "#f0b429", "#4c6bd6", "#f5f3ec", "#ffffff"];
const CHIP_POOL = 44;
// What happens when the hand stops. Stamps are pinned to the path, so ageing them
// alone just deflates the whole run in place -- every figure shrinking where it
// stands, which reads as a bug rather than as an ending. Instead each stamp also
// chases the one in front of it, so the run reels itself into the cursor the way it
// did when the trail was still derived from a path buffer. The two rates are matched
// so the slide and the shrink finish together, in a little over half a second.
const IDLE_PULL = 17;
const IDLE_REEL = 0.1;
// The mark is capped by length, not by frame count: a frame-capped tail grows with
// hand speed and a fast flick drags a slab across half the screen. Budgeting real
// pixels keeps the stroke the same physical size however fast the hand moves.
const TRAIL_PX = 700;
// Tighter than the shapes are wide, so the run shingles instead of sitting in a
// dotted line. Overlap is what the knockout below exists to keep readable.
const SHAPE_GAP = 20;
// The homepage's own blue -- the Download CV pill and the case-card accent, not the
// sky block, which the homepage never renders. The head keeps it in both states so
// the cursor has one fixed identity while the tail is what lights up.
const HEAD_COLOR = "#134bff";
// Fluorescent rather than merely saturated: every entry sits at the chroma ceiling
// for its hue, and consecutive entries are far apart on the wheel so every join
// clashes. None of these are DESIGN.md colours; the head is the only palette value
// left in the cursor.
const TRAIL_HOT = [
  "#7c1aff",    // violet     266°
  "#ffcc00",    // golden      48°
  "#00ffd1",    // turquoise  169°
  "#ff0090",    // magenta    326°
  "#39ff14",    // green      111°
];
// Five is what the trail reads best at -- 23 was confetti, 8 was still a lot. Shape
// and colour are both drawn at random per stamp now, so there is no fixed cycle; the
// only rule is that a stamp never repeats its neighbour. All five are hues the
// reference actually uses; red and orange are dropped as too near magenta and gold,
// and its blue as too near the head.

type Chip = { x: number; y: number; vx: number; vy: number; r: number; vr: number; life: number };

// Circle, diamond, square, triangle. Diamond and square stay axis-aligned so they
// never turn into each other as the hand changes direction; only the triangle turns,
// to point the way the pointer is travelling.
function traceShape(
  ctx: CanvasRenderingContext2D,
  kind: number,
  x: number,
  y: number,
  r: number,
  angle: number,
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.beginPath();
  if (kind === 0) {
    ctx.arc(0, 0, r, 0, Math.PI * 2);
  } else if (kind === 1) {
    ctx.moveTo(0, -r);
    ctx.lineTo(r, 0);
    ctx.lineTo(0, r);
    ctx.lineTo(-r, 0);
    ctx.closePath();
  } else if (kind === 2) {
    const s = r * 0.84;
    ctx.rect(-s, -s, s * 2, s * 2);
  } else {
    ctx.rotate(angle);
    ctx.moveTo(r * 1.05, 0);
    ctx.lineTo(-r * 0.72, -r * 0.92);
    ctx.lineTo(-r * 0.72, r * 0.92);
    ctx.closePath();
  }
  ctx.fill();
  ctx.restore();
}

export default function CursorLab() {
  const [enabled, setEnabled] = useState(false);
  const [hovered, setHovered] = useState<Id | null>(null);
  const [pinned, setPinned] = useState<Id | null>(null);

  const active = pinned ?? hovered;

  // --- pointer + target state, read by the animation loop ---
  const raw = useRef({ x: -200, y: -200 });
  const soft = useRef({ x: -200, y: -200 });
  // Stamps, not a re-derived path. Each figure is minted once, at the spot on the
  // path where it was dropped, and keeps the shape and colour it was born with. That
  // is what makes randomness possible at all: the old build recomputed the whole run
  // from the pointer's history every frame, so a random draw would have re-rolled
  // every figure 60 times a second and the trail would strobe. A stamp is rolled once
  // and then only ages.
  const stamps = useRef<
    { x: number; y: number; a: number; kind: number; c: string; back: number }[]
  >([]);
  const sinceStamp = useRef(0);
  const chips = useRef<Chip[]>([]);
  const emitDebt = useRef(0);
  const rect = useRef<DOMRect | null>(null);
  const activeRef = useRef<Id | null>(null);
  const reduced = useRef(false);

  // --- element handles ---
  const layer = useRef<HTMLDivElement>(null);
  const anchors = useRef<Partial<Record<Id, HTMLDivElement | null>>>({});
  const stDot = useRef<HTMLDivElement>(null);
  const rlRead = useRef<HTMLElement>(null);
  const rlFrame = useRef<HTMLDivElement>(null);
  const blCanvas = useRef<HTMLCanvasElement>(null);
  const cfChips = useRef<HTMLDivElement>(null);
  const mgRing = useRef<HTMLDivElement>(null);
  const rgFrame = useRef<HTMLDivElement>(null);

  /* Вибраний інструмент читає цикл малювання, який живе в замиканні ефекту й
     ререндерів не бачить. Дзеркало в ref оновлюється в ефекті, а не під час
     рендера: запис у ref по дорозі до розмітки — те, на що React лається
     цілком по суті, бо такий запис не переживає перерваний рендер. */
  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  // Only a real pointing device gets a drawn cursor — a touch screen keeps its own.
  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      setEnabled(fine.matches);
      reduced.current = rm.matches;
    };
    sync();
    fine.addEventListener("change", sync);
    rm.addEventListener("change", sync);
    return () => {
      fine.removeEventListener("change", sync);
      rm.removeEventListener("change", sync);
    };
  }, []);

  // A pinned cursor hides the native pointer across the whole page, so there has to
  // be a way out that does not require finding and clicking a button with it.
  useEffect(() => {
    if (!pinned) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPinned(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [pinned]);

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.cur = enabled ? "on" : "off";
    if (pinned) root.dataset.curPinned = "1";
    else delete root.dataset.curPinned;
    return () => {
      delete root.dataset.cur;
      delete root.dataset.curPinned;
    };
  }, [enabled, pinned]);

  // --- track the pointer and whatever interactive thing sits under it ---
  useEffect(() => {
    if (!enabled) return;
    const onMove = (e: PointerEvent) => {
      raw.current.x = e.clientX;
      raw.current.y = e.clientY;
      const el = (e.target as Element | null)?.closest?.("[data-ct]") ?? null;
      rect.current = el ? el.getBoundingClientRect() : null;
    };
    const onLeave = () => {
      raw.current.x = -200;
      raw.current.y = -200;
      rect.current = null;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled]);

  // --- one loop drives whichever instrument is on screen ---
  useEffect(() => {
    if (!enabled) return;
    const chipEls = cfChips.current ? Array.from(cfChips.current.children) as HTMLElement[] : [];
    const cv = blCanvas.current;
    const ctx = cv ? cv.getContext("2d") : null;
    const sizeCanvas = () => {
      if (!cv) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      cv.width = Math.round(window.innerWidth * dpr);
      cv.height = Math.round(window.innerHeight * dpr);
      ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    sizeCanvas();
    window.addEventListener("resize", sizeCanvas);
    let raf = 0;
    let prev = { x: raw.current.x, y: raw.current.y };

    const step = () => {
      raf = requestAnimationFrame(step);
      const id = activeRef.current;
      const p = raw.current;
      const rm = reduced.current;
      const r = rect.current;
      const hot = !!r;

      const dx = p.x - prev.x;
      const dy = p.y - prev.y;
      const speed = Math.hypot(dx, dy);
      prev = { x: p.x, y: p.y };

      // anchors that ride the raw pointer
      const at = (el: HTMLElement | null | undefined, x: number, y: number) => {
        if (el) el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      };
      // a frame element: place its top-left and size it
      const frame = (el: HTMLElement | null, x: number, y: number, w: number, h: number) => {
        if (!el) return;
        el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        el.style.width = `${w}px`;
        el.style.height = `${h}px`;
      };

      if (id === "sticker") {
        at(anchors.current.sticker, p.x, p.y);
      }

      if (id === "ruler") {
        at(anchors.current.ruler, p.x, p.y);
        if (rlRead.current) {
          rlRead.current.textContent = hot
            ? `${Math.round(r!.width)} × ${Math.round(r!.height)}`
            : `${Math.round(p.x)} · ${Math.round(p.y)}`;
        }
        if (rlFrame.current) {
          rlFrame.current.classList.toggle("is-on", hot);
          if (hot) frame(rlFrame.current, r!.left - 6, r!.top - 6, r!.width + 12, r!.height + 12);
        }
      }

      if (id === "bleed" && ctx && cv) {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        const head = hot ? 22 : 18;
        const list = stamps.current;

        // A jump this big is the pointer re-entering, not a hand movement; without
        // this the trail would draw a streak across everything in between.
        if (speed > 150) {
          list.length = 0;
          sinceStamp.current = 0;
        }

        // Everything ages by how far the hand actually went, or by a set amount when
        // it went nowhere, which is what retires the tail.
        const idle = speed <= 0.5;
        const aged = idle ? IDLE_PULL : speed;
        for (const s of list) s.back += aged;
        if (idle) {
          // Walked oldest to newest so each stamp chases its neighbour's position
          // from the start of this frame -- a chain reeling in, not a collapse onto
          // one point, so the run follows its own path back into the cursor.
          for (let i = list.length - 1; i >= 0; i--) {
            const s = list[i];
            const target = i === 0 ? p : list[i - 1];
            s.x += (target.x - s.x) * IDLE_REEL;
            s.y += (target.y - s.y) * IDLE_REEL;
          }
        }
        while (list.length && list[list.length - 1].back > TRAIL_PX) list.pop();

        if (speed > 0.5 && !rm) {
          // Mint a stamp every SHAPE_GAP px of travel, placed by interpolating along
          // this frame's movement so a fast flick still lays an even run rather than
          // dropping them all on one spot.
          let consumed = 0;
          while (sinceStamp.current + (speed - consumed) >= SHAPE_GAP) {
            consumed += SHAPE_GAP - sinceStamp.current;
            sinceStamp.current = 0;
            const f = consumed / speed;
            const prevStamp = list[0];
            // Rolled at random, but never repeating what it lands next to -- an
            // unconstrained draw would sometimes place two identical figures side by
            // side, which reads as a rendering fault rather than as chance.
            let kind = Math.floor(Math.random() * 4);
            if (prevStamp && kind === prevStamp.kind) kind = (kind + 1 + Math.floor(Math.random() * 3)) % 4;
            let c = TRAIL_HOT[Math.floor(Math.random() * TRAIL_HOT.length)];
            if (prevStamp && c === prevStamp.c) {
              const others = TRAIL_HOT.filter((x) => x !== prevStamp.c);
              c = others[Math.floor(Math.random() * others.length)];
            }
            list.unshift({
              // prev has already been advanced to p by this point in the frame, so
              // the segment start is derived back out of the delta instead
              x: p.x - dx * (1 - f),
              y: p.y - dy * (1 - f),
              a: Math.atan2(dy, dx),
              kind,
              c,
              back: speed - consumed,
            });
          }
          sinceStamp.current += speed - consumed;
        }

        // Oldest first, so the head-most figure sits on top where they overlap.
        for (let i = list.length - 1; i >= 0; i--) {
          const s = list[i];
          const k = 1 - s.back / TRAIL_PX;
          if (k <= 0) continue;
          const r = head * Math.pow(k, 0.8);
          if (r < 1.3) continue;
          // Fading an open hue turns it pastel, so the run stays fully opaque and
          // only the last fifth ramps out, by which point it is already a speck.
          ctx.globalAlpha = Math.min(1, k / 0.22);
          ctx.fillStyle = s.c;
          traceShape(ctx, s.kind, s.x, s.y, r, s.a);
        }

        ctx.globalAlpha = 1;
        ctx.fillStyle = HEAD_COLOR;
        traceShape(ctx, 0, p.x, p.y, head, 0);
      }

      if (id === "confetti") {
        at(anchors.current.confetti, p.x, p.y);
        if (!rm) {
          emitDebt.current += speed;
          while (emitDebt.current > 15 && chips.current.length < CHIP_POOL) {
            emitDebt.current -= 15;
            // scattered rather than stepped through a counter: a modulo pattern
            // repeats visibly once the same stretch of screen is crossed twice
            chips.current.push({
              x: p.x,
              y: p.y,
              vx: dx * 0.14 + (Math.random() - 0.5) * 3.2,
              vy: dy * 0.14 - 1.4 - Math.random() * 1.2,
              r: Math.random() * 360,
              vr: (Math.random() - 0.5) * 14,
              life: 0.85 + Math.random() * 0.3,
            });
          }
          const list = chips.current;
          for (let i = list.length - 1; i >= 0; i--) {
            const c = list[i];
            c.vy += 0.34;
            c.vx *= 0.99;
            c.x += c.vx;
            c.y += c.vy;
            c.r += c.vr;
            c.life -= 0.03;
            if (c.life <= 0) list.splice(i, 1);
          }
          for (let i = 0; i < chipEls.length; i++) {
            const c = list[i];
            if (!c) {
              chipEls[i].style.opacity = "0";
              continue;
            }
            chipEls[i].style.opacity = String(Math.min(1, c.life * 1.6));
            chipEls[i].style.transform =
              `translate3d(${c.x}px, ${c.y}px, 0) rotate(${c.r}deg) scale(${0.6 + c.life * 0.5})`;
          }
        }
      }

      if (id === "magnet") {
        const k = rm ? 1 : 0.17;
        soft.current.x += (p.x - soft.current.x) * k;
        soft.current.y += (p.y - soft.current.y) * k;
        at(anchors.current.magnet, p.x, p.y);
        if (mgRing.current) {
          mgRing.current.classList.toggle("is-on", hot);
          if (hot) {
            const pad = 8;
            const w = r!.width + pad * 2;
            const h = r!.height + pad * 2;
            // stays a pill while it hugs a pill-shaped control, relaxes into a
            // rounded rectangle once the thing it landed on is clearly a block
            mgRing.current.style.borderRadius = w > h * 2.4 ? `${h / 2}px` : "14px";
            frame(mgRing.current, r!.left - pad, r!.top - pad, w, h);
          } else {
            mgRing.current.style.borderRadius = "999px";
            frame(mgRing.current, soft.current.x - 19, soft.current.y - 19, 38, 38);
          }
        }
      }

      if (id === "reg") {
        at(anchors.current.reg, p.x, p.y);
        if (rgFrame.current) {
          if (hot) frame(rgFrame.current, r!.left - 10, r!.top - 10, r!.width + 20, r!.height + 20);
          else frame(rgFrame.current, p.x - 21, p.y - 21, 42, 42);
        }
      }

      // the hot class drives every shape-change that CSS owns
      const anchor = id ? anchors.current[id] : null;
      anchor?.classList.toggle("is-hot", hot);
    };

    raf = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", sizeCanvas);
    };
  }, [enabled]);

  const zoneCta = VARIANTS.find((v) => v.id === active)?.cta ?? "";

  return (
    <>
      {enabled && (
        <div className="cur-layer" ref={layer} aria-hidden="true">
          {/* 01 */}
          <div className="cur" ref={(el) => { anchors.current.sticker = el; }} hidden={active !== "sticker"}>
            <div className="st-dot" ref={stDot}><span>{zoneCta}</span></div>
          </div>

          {/* 02 */}
          <div className="rl-frame" ref={rlFrame} hidden={active !== "ruler"} />
          <div className="cur" ref={(el) => { anchors.current.ruler = el; }} hidden={active !== "ruler"}>
            <i className="rl-h" />
            <i className="rl-v" />
            <b className="rl-read" ref={rlRead} />
          </div>

          {/* 03 */}
          <canvas className="bl-canvas" ref={blCanvas} hidden={active !== "bleed"} />

          {/* 04 */}
          <div ref={cfChips} hidden={active !== "confetti"}>
            {Array.from({ length: CHIP_POOL }, (_, i) => (
              <div
                className="cf-chip"
                key={i}
                style={{ background: CHIP_COLORS[i % CHIP_COLORS.length] }}
              />
            ))}
          </div>
          <div className="cur" ref={(el) => { anchors.current.confetti = el; }} hidden={active !== "confetti"}>
            <div className="cf-nib" />
          </div>

          {/* 05 */}
          <div className="mg-ring" ref={mgRing} hidden={active !== "magnet"} />
          <div className="cur" ref={(el) => { anchors.current.magnet = el; }} hidden={active !== "magnet"}>
            <div className="mg-dot" />
          </div>

          {/* 06 */}
          <div className="rg-frame" ref={rgFrame} hidden={active !== "reg"}>
            <i className="rg-c" /><i className="rg-c" /><i className="rg-c" /><i className="rg-c" />
          </div>
          <div className="cur" ref={(el) => { anchors.current.reg = el; }} hidden={active !== "reg"}>
            <div className="rg-target" />
          </div>
        </div>
      )}

      <main className="lab">
        <header className="lab-head">
          <h1>Шість курсорів на вибір</h1>
          <p className="lab-lead">
            Наведи мишку на будь-який блок — курсор у ньому оживає. Всередині кожного
            блоку є кнопка, посилання й текст, щоб побачити, як інструмент поводиться
            над клікабельним і над порожнім місцем.
          </p>
          <p className="lab-lead">
            Сподобався — тисни «Взяти на весь сайт», і він поїде з тобою по всій
            сторінці, через усі кольори. Скажи мені номер, і я поставлю його на бойовий
            сайт.
          </p>
        </header>

        {VARIANTS.map((v) => (
          <section
            key={v.id}
            className={`block lab-zone ${v.block}`}
            onPointerEnter={() => setHovered(v.id)}
            onPointerLeave={() => setHovered((h) => (h === v.id ? null : h))}
          >
            <div className="block-inner">
              <h2>{v.name}</h2>
              <p className="zone-lead">{v.lead}</p>
              <p className="zone-meta">
                {v.meta.map((m) => (
                  <i key={m}>{m}</i>
                ))}
              </p>
              <div className="zone-play">
                <button
                  type="button"
                  className="zone-btn"
                  data-ct=""
                  aria-pressed={pinned === v.id}
                  onClick={() => setPinned((c) => (c === v.id ? null : v.id))}
                >
                  {pinned === v.id ? "Зняти з сайту" : "Взяти на весь сайт"}
                </button>
                <a className="zone-link" href="#" data-ct="" onClick={(e) => e.preventDefault()}>
                  Тестове посилання
                </a>
                <span className="zone-swatch" data-ct="" />
              </div>
            </div>
          </section>
        ))}

        <footer className="lab-foot">
          <p className="lab-foot-note">
            {pinned
              ? `Зараз на всій сторінці: ${VARIANTS.find((v) => v.id === pinned)?.no} ${VARIANTS.find((v) => v.id === pinned)?.name} — Esc, щоб зняти`
              : "Швидкий перемикач — увімкнути будь-який на всю сторінку"}
          </p>
          {VARIANTS.map((v) => (
            <button
              key={v.id}
              type="button"
              className="lab-chip"
              data-ct=""
              aria-pressed={pinned === v.id}
              onClick={() => setPinned((c) => (c === v.id ? null : v.id))}
            >
              {v.no} {v.name}
            </button>
          ))}
        </footer>
      </main>
    </>
  );
}
