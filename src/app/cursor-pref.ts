"use client";

import { useSyncExternalStore } from "react";

/* ------------------------------------------------------------------
   Cursor preference — shared between <SiteCursor/> (mounted in the
   layout) and the footer toggle (rendered inside the page). They sit on
   opposite sides of the layout/page boundary, so the preference lives in
   this module rather than in a context one of them would have to own.

   Two separate facts, deliberately kept apart:
   - `supported`: is there anything to switch at all? A touch screen has
     no pointer to redraw, so the control has nothing to offer and the
     footer hides it rather than showing a dead switch.
   - `creative`: what the visitor asked for, remembered across visits.
   ------------------------------------------------------------------ */

const KEY = "sihetii:cursor";
const FINE = "(pointer: fine)";

// The drawn cursor is the site's own; a visitor only ever lands on the plain one
// by asking for it, so "creative" is both the default and what the server
// renders. localStorage therefore only ever records the opt-out.
let creative = true;
let hydrated = false;
const listeners = new Set<() => void>();

function emit() {
  for (const fn of listeners) fn();
}

// Read once, on the first subscription rather than during render: the server
// has no localStorage, so pulling the stored choice in any earlier would make
// the first client render disagree with the markup it is hydrating.
function hydrate() {
  if (hydrated) return;
  hydrated = true;
  try {
    const stored = localStorage.getItem(KEY);
    if (stored === "plain") creative = false;
    else if (stored === "creative") creative = true;
  } catch {
    // Private mode / storage disabled: the default stands.
  }
}

function subscribe(onChange: () => void) {
  hydrate();
  listeners.add(onChange);
  return () => {
    listeners.delete(onChange);
  };
}

export function setCreativeCursor(next: boolean) {
  if (creative === next) return;
  creative = next;
  try {
    localStorage.setItem(KEY, next ? "creative" : "plain");
  } catch {
    // The choice still applies for this visit, it just doesn't outlive it.
  }
  emit();
}

/** The remembered choice, kept in step across every component that asks. */
export function useCreativeCursor() {
  return useSyncExternalStore(
    subscribe,
    () => creative,
    () => true,
  );
}

function subscribeFine(onChange: () => void) {
  const mq = window.matchMedia(FINE);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

/** True only where a drawn cursor can actually replace a real pointer. */
export function useCursorSupported() {
  return useSyncExternalStore(
    subscribeFine,
    () => window.matchMedia(FINE).matches,
    () => false,
  );
}
