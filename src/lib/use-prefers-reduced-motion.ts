"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onStoreChange: () => void) {
  const query = window.matchMedia(QUERY);
  query.addEventListener("change", onStoreChange);
  return () => query.removeEventListener("change", onStoreChange);
}

function getSnapshot() {
  return window.matchMedia(QUERY).matches;
}

function getServerSnapshot() {
  return false;
}

/**
 * `prefers-reduced-motion` that is safe to read during render.
 *
 * The server snapshot is always `false`, so the first client render hydrates
 * byte-for-byte against the server HTML; the real preference is applied right
 * after hydration (and on every later change) without a hydration mismatch —
 * unlike `motion`'s `useReducedMotion`, which returns the live value on the
 * first render.
 */
export function usePrefersReducedMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
