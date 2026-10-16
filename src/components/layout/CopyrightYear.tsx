"use client";

import { useSyncExternalStore } from "react";

/**
 * Renders the live copyright year so the prerendered HTML stays deterministic
 * (Cache Components) while the visible year stays current after hydration.
 */
const subscribe = () => () => {};

function readYear() {
  return new Date().getFullYear();
}

export function CopyrightYear({ fallback }: { fallback: number }) {
  const year = useSyncExternalStore(subscribe, readYear, () => fallback);

  return <>{year}</>;
}
