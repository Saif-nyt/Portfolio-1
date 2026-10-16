"use client";

import { motion } from "motion/react";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

/**
 * A soft glowing route that connects the process steps. Hidden from assistive
 * technology and rendered as a static line when motion is reduced.
 */
export function LuminousTrail() {
  const reduced = usePrefersReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 -top-6 hidden h-24 lg:block"
    >
      <svg
        viewBox="0 0 1200 96"
        preserveAspectRatio="none"
        className="h-full w-full"
      >
        <defs>
          <linearGradient id="trail" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#65E8E0" stopOpacity="0.05" />
            <stop offset="50%" stopColor="#65E8E0" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#65E8E0" stopOpacity="0.05" />
          </linearGradient>
        </defs>
        <path
          d="M20 70 C 200 20, 340 92, 520 54 C 700 16, 840 84, 1010 46 C 1090 28, 1150 44, 1180 40"
          fill="none"
          stroke="url(#trail)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        {!reduced ? (
          <motion.path
            d="M20 70 C 200 20, 340 92, 520 54 C 700 16, 840 84, 1010 46 C 1090 28, 1150 44, 1180 40"
            fill="none"
            stroke="#8FF2EC"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="14 1000"
            initial={{ strokeDashoffset: 1014 }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "linear" }}
          />
        ) : null}
      </svg>
    </div>
  );
}
