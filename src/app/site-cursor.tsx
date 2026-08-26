"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useCreativeCursor } from "./cursor-pref";
import "./site-cursor.css";

/* ------------------------------------------------------------------
   Tuning. Every value here was settled by eye on /cursor; the comments
   record why, so a later change is a decision rather than a guess.
   ------------------------------------------------------------------ */

// The trail is capped by length, not by frame count. A frame-capped tail grows with
// hand speed, so a fast flick would drag a slab across half the screen; budgeting
// real pixels keeps the run the same physical size however fast the hand moves.
const TRAIL_PX = 700;
// Tighter than the shapes are wide, so the run shingles rather than sitting in a
// dotted line. Nearer figures simply cover further ones -- no knockout, no blend
// mode -- and hue alone is what holds neighbours apart.
const SHAPE_GAP = 20;
// The trail's own scale. The head is no longer a disc, but the run still tapers from
// a nominal radius, and it still grows a little over interactive things.
const TRAIL_R = 18;
const TRAIL_R_HOT = 22;
// Pointer heights. Bigger than a system cursor, in keeping with everything else here,
// but still read as an arrow and a hand rather than as ornaments.
const ARROW_H = 30;
const HAND_H = 32;

// What happens when the hand stops. Stamps are pinned to the path, so ageing them
// alone would just deflate the run where it stands, which reads as a fault rather
// than as an ending. Each stamp also chases the one in front of it, so the run reels
// itself into the cursor along its own path. The two rates are matched so the slide
// and the shrink finish together, in a little over half a second.
const IDLE_PULL = 17;
const IDLE_REEL = 0.1;

// A backstop for a jump no hand makes -- roughly 24000 px/s. It used to be 150,
// which was badly wrong: a brisk flick across a 1440px screen runs 100-150 px per
// frame, so ordinary fast movement kept tripping the guard, and tripping it wiped
// the whole trail and skipped that frame's stamps. The trail vanished exactly when
// it was most wanted. Re-entry is now detected properly below instead of being
// inferred from speed.
const TELEPORT = 400;

// The site's own blue -- the Download CV pill and the case-card accent. The head
// keeps it in every state, so the cursor has one fixed identity while the tail is
// what changes.
const HEAD_COLOR = "#134bff";
// Fluorescent rather than merely saturated: each sits at the chroma ceiling for its
// hue, and consecutive hues are far apart on the wheel so every join clashes. These
// five are deliberately outside DESIGN.md's palette -- see the Cursor section there.
const TRAIL_COLORS = ["#7c1aff", "#ffcc00", "#00ffd1", "#ff0090", "#39ff14"];
// #134bff is not only the cursor's colour, it is also a surface on this site: the two
// Download CV pills and the blue case card. The pills invert to ink on hover so the
// head still reads on them, but the case card is 1056x688 of the exact same blue, and
// the head vanished into it completely -- and went on hiding the text underneath. A
// keyline fixes that without a second colour: on the cream and white sections, where
// the blue already reads, white on white is invisible; on the blue card, on the ink
// and forest blocks and on candle, it is what keeps the cursor on screen.
const HEAD_KEYLINE = "#ffffff";
const HEAD_KEYLINE_W = 3;

// Text fields keep the native I-beam (see site-cursor.css), so the drawn pointer
// stands down there rather than sitting on top of it as a second cursor.
const TEXT_SELECTOR = 'input:not([type="button"]):not([type="submit"]), textarea, [contenteditable="true"]';

const HOT_SELECTOR = 'a, button, [role="button"], input, select, textarea, summary, label';

type Stamp = { x: number; y: number; a: number; kind: number; c: string; back: number };

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

// Rounded rectangle by hand rather than ctx.roundRect, so the hand renders the same
// everywhere without a capability check.
function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  const rr = Math.min(r, w / 2, h / 2);
  ctx.moveTo(x + rr, y);
  ctx.arcTo(x + w, y, x + w, y + h, rr);
  ctx.arcTo(x + w, y + h, x, y + h, rr);
  ctx.arcTo(x, y + h, x, y, rr);
  ctx.arcTo(x, y, x + w, y, rr);
  ctx.closePath();
}

// The classic arrow, tip at the origin so the hotspot lands exactly where the
// pointer is -- the same contract the native cursor keeps.
function arrowPath(ctx: CanvasRenderingContext2D, h: number) {
  const u = h / 21.6;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(0, 19.2 * u);
  ctx.lineTo(4.8 * u, 14.6 * u);
  ctx.lineTo(8.0 * u, 21.6 * u);
  ctx.lineTo(11.2 * u, 20.2 * u);
  ctx.lineTo(8.0 * u, 13.4 * u);
  ctx.lineTo(14.4 * u, 13.4 * u);
  ctx.closePath();
}

// A pointing hand built from overlapping rounded rectangles, which union into one
// silhouette under a single fill. Drawn blocky on purpose: it has to stay legible at
// cursor size and belongs to the same geometric family as the trail's figures. The
// fingertip sits at the origin, so the hotspot does not shift when the shape swaps.
function handPath(ctx: CanvasRenderingContext2D, h: number) {
  const s = h;
  ctx.beginPath();
  // Which finger is raised is decided by where it sits on the fist, not by its
  // shape. The first pass centred it -- index at x 0, fist spanning -0.23 to
  // 0.27 -- and a finger rising from the middle of a fist reads as exactly the
  // gesture you would expect. The raised finger now stands at the fist's left
  // edge with all three curled knuckles behind it, which is what makes it an
  // index finger. The fingertip stays at the origin, so the hotspot is
  // unchanged and the fist moved right instead.
  //
  // The finger clears the fist by 42% of the height. At the 52% it had before,
  // a lone finger that long was itself the gesture, whatever the fist did.
  // Lower than about 35% and it stops reading as raised at all.
  roundRect(ctx, -0.10 * s, 0, 0.19 * s, 0.54 * s, 0.095 * s); // index finger
  // Three knuckles stepping down and away to the right: the curl of a hand seen
  // from the side. Two of them left the silhouette ambiguous.
  roundRect(ctx, 0.09 * s, 0.30 * s, 0.14 * s, 0.28 * s, 0.07 * s); // middle
  roundRect(ctx, 0.21 * s, 0.35 * s, 0.13 * s, 0.23 * s, 0.065 * s); // ring
  roundRect(ctx, 0.32 * s, 0.40 * s, 0.12 * s, 0.18 * s, 0.06 * s); // little
  // Tucked and low, not splayed: an overhanging thumb puts weight back on the
  // left and re-centres the finger by eye, which is the thing being fixed.
  roundRect(ctx, -0.18 * s, 0.54 * s, 0.13 * s, 0.22 * s, 0.065 * s); // thumb
  roundRect(ctx, -0.13 * s, 0.42 * s, 0.65 * s, 0.56 * s, 0.13 * s); // fist
}

export default function SiteCursor() {
  const pathname = usePathname();
  // /cursor is the page these were chosen on and runs its own instruments; a second
  // cursor on top of them would be two cursors at once.
  const onLabPage = pathname?.startsWith("/cursor") ?? false;

  const [hasPointer, setHasPointer] = useState(false);
  // The footer switch. Off means the visitor asked for their own system cursor
  // back, so nothing here draws and nothing here hides the native one.
  const creative = useCreativeCursor();
  const enabled = hasPointer && creative;

  const canvas = useRef<HTMLCanvasElement>(null);
  const raw = useRef({ x: -300, y: -300 });
  const prev = useRef({ x: -300, y: -300 });
  const stamps = useRef<Stamp[]>([]);
  const sinceStamp = useRef(0);
  const hot = useRef(false);
  const overText = useRef(false);
  const reduced = useRef(false);
  const inside = useRef(false);
  const reentered = useRef(false);

  // Only a real pointing device gets a drawn cursor; a touch screen keeps its own
  // behaviour, and there is nothing to hide there anyway.
  useEffect(() => {
    if (onLabPage) return;
    const fine = window.matchMedia("(pointer: fine)");
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      setHasPointer(fine.matches);
      reduced.current = rm.matches;
    };
    sync();
    fine.addEventListener("change", sync);
    rm.addEventListener("change", sync);
    return () => {
      fine.removeEventListener("change", sync);
      rm.removeEventListener("change", sync);
    };
  }, [onLabPage]);

  useEffect(() => {
    const root = document.documentElement;
    /* Рідний вказівник ховається тільки тоді, коли намальованому справді є
       чим малювати. Без 2D-контексту — а його може не бути — атрибут лишався
       б на місці, і сторінка стояла б узагалі без курсора: рідний схований,
       намальований не запустився. */
    const drawable = enabled && Boolean(canvas.current?.getContext("2d"));
    if (drawable) root.dataset.siteCursor = "on";
    else delete root.dataset.siteCursor;
    return () => {
      delete root.dataset.siteCursor;
    };
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;
    const cv = canvas.current;
    const ctx = cv?.getContext("2d");
    if (!cv || !ctx) return;

    let dpr = 1;
    const sizeCanvas = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      cv.width = Math.round(window.innerWidth * dpr);
      cv.height = Math.round(window.innerHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    sizeCanvas();

    let raf = 0;

    const step = () => {
      const p = raw.current;
      // prev is deliberately NOT resynced on wake. The loop only ever stops at a
      // moment when prev already equals p, so it is never stale in a way that needs
      // resetting -- and resetting it anyway made every wake compute a zero delta,
      // which put the loop straight back to sleep and meant the trail could never
      // form at all. The one genuinely stale case, a pointer re-entering the window
      // somewhere far away, is what the TELEPORT guard below is for.
      const dx = p.x - prev.current.x;
      const dy = p.y - prev.current.y;
      const speed = Math.hypot(dx, dy);
      prev.current = { x: p.x, y: p.y };

      const list = stamps.current;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      if (!inside.current) {
        // Pointer has left the window: drop everything rather than leaving a cursor
        // sitting on a page nobody is pointing at.
        list.length = 0;
        raf = requestAnimationFrame(step);
        return;
      }

      // A pointer coming back into the window lands wherever the hand happens to be,
      // which is not movement and must not be stamped across.
      const jumped = reentered.current || speed > TELEPORT;
      reentered.current = false;
      if (jumped) {
        list.length = 0;
        sinceStamp.current = 0;
        prev.current = { x: p.x, y: p.y };
      }

      const head = hot.current ? TRAIL_R_HOT : TRAIL_R;
      const idle = speed <= 0.5;
      const aged = idle ? IDLE_PULL : speed;
      for (const s of list) s.back += aged;
      if (idle) {
        // Oldest to newest, so each stamp chases its neighbour's position from the
        // start of this frame -- a chain reeling in, not a collapse onto one point.
        for (let i = list.length - 1; i >= 0; i--) {
          const s = list[i];
          const target = i === 0 ? p : list[i - 1];
          s.x += (target.x - s.x) * IDLE_REEL;
          s.y += (target.y - s.y) * IDLE_REEL;
        }
      }
      while (list.length && list[list.length - 1].back > TRAIL_PX) list.pop();

      if (!idle && !reduced.current && !jumped) {
        // Mint a stamp every SHAPE_GAP px of travel, interpolated along this frame's
        // movement so a fast flick lays an even run instead of dropping them all on
        // one spot. Each figure is rolled once, here, and then only ages -- which is
        // what makes randomness possible: rebuilding the run every frame would
        // re-roll every figure sixty times a second and the trail would strobe.
        let consumed = 0;
        while (sinceStamp.current + (speed - consumed) >= SHAPE_GAP) {
          consumed += SHAPE_GAP - sinceStamp.current;
          sinceStamp.current = 0;
          const f = consumed / speed;
          const ahead = list[0];
          // Random, but never repeating what it lands beside: an unconstrained draw
          // would sometimes place two identical figures side by side, which reads as
          // a rendering fault rather than as chance.
          let kind = Math.floor(Math.random() * 4);
          if (ahead && kind === ahead.kind) {
            kind = (kind + 1 + Math.floor(Math.random() * 3)) % 4;
          }
          let c = TRAIL_COLORS[Math.floor(Math.random() * TRAIL_COLORS.length)];
          if (ahead && c === ahead.c) {
            const others = TRAIL_COLORS.filter((x) => x !== ahead.c);
            c = others[Math.floor(Math.random() * others.length)];
          }
          list.unshift({
            // prev has already advanced to p, so the segment start is derived back
            // out of the delta
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
        // Fading an open hue turns it pastel, so the run stays fully opaque and only
        // the last fifth ramps out, by which point it is already a speck.
        ctx.globalAlpha = Math.min(1, k / 0.22);
        ctx.fillStyle = s.c;
        traceShape(ctx, s.kind, s.x, s.y, r, s.a);
      }

      // The pointer itself: an arrow, swapping to a pointing hand over anything
      // interactive. The shape change is the hover signal now -- it reads far louder
      // than the few pixels of growth that used to carry it.
      ctx.globalAlpha = 1;
      if (!overText.current) {
        ctx.save();
        ctx.translate(p.x, p.y);
        if (hot.current) handPath(ctx, HAND_H);
        else arrowPath(ctx, ARROW_H);
        // Stroked first and filled over: the outer half of the stroke becomes the
        // keyline, the inner half is covered by the fill. Follows any outline, which
        // a scaled-up copy of a polygon would not.
        ctx.lineJoin = "round";
        ctx.lineCap = "round";
        ctx.lineWidth = HEAD_KEYLINE_W * 2;
        ctx.strokeStyle = HEAD_KEYLINE;
        ctx.stroke();
        ctx.fillStyle = HEAD_COLOR;
        ctx.fill();
        ctx.restore();
      }

      // The loop deliberately does not stop itself when the hand is still. An
      // earlier version did, gated on a "running" flag raised at the moment a frame
      // was *requested* rather than serviced -- so a first frame that never arrived
      // (a tab mounted in the background) left the flag raised and blocked every
      // later wake, permanently. The loop never started and no trail could form.
      // Browsers already throttle rAF in a hidden tab, and a clear plus two fills
      // is not a cost worth that fragility.
      raf = requestAnimationFrame(step);
    };

    const onMove = (e: PointerEvent) => {
      if (!inside.current) reentered.current = true;
      raw.current.x = e.clientX;
      raw.current.y = e.clientY;
      inside.current = true;
      const el = e.target as Element | null;
      hot.current = !!el?.closest?.(HOT_SELECTOR);
      overText.current = !!el?.closest?.(TEXT_SELECTOR);
    };
    const onLeave = () => {
      inside.current = false;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onMove, { passive: true });
    // Only a pointer actually leaving the document clears the cursor. Window blur
    // deliberately does not: switching apps and switching back would otherwise leave
    // the page with no pointer at all -- the native one hidden, the drawn one wiped --
    // until the hand happened to move.
    document.addEventListener("pointerleave", onLeave);
    window.addEventListener("resize", sizeCanvas);
    raf = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onMove);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", sizeCanvas);
    };
  }, [enabled]);

  if (onLabPage || !enabled) return null;
  return <canvas className="site-cursor" ref={canvas} aria-hidden="true" />;
}
