"use client";

import { useCallback, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

interface Slot {
  top: string;
  left: string;
  size: number;
  delay: string;
  duration: string;
}

/** Right-side slots so the floating spores never sit on the headline/CTAs. */
const SLOTS: Slot[] = [
  { top: "18%", left: "78%", size: 46, delay: "0s", duration: "5.2s" },
  { top: "34%", left: "90%", size: 34, delay: "1.1s", duration: "6.4s" },
  { top: "58%", left: "84%", size: 52, delay: "0.4s", duration: "5.8s" },
  { top: "72%", left: "70%", size: 30, delay: "1.8s", duration: "7s" },
  { top: "46%", left: "73%", size: 26, delay: "2.4s", duration: "6s" },
];

/**
 * Interactive hero playground: bioluminescent spores drift on the right of
 * the scene; clicking one pops it into sparks, bumps the counter, and the
 * spore respawns a moment later somewhere new. Pure compositor animations.
 */
export function Collectibles() {
  const reduced = usePrefersReducedMotion();
  const [collected, setCollected] = useState(0);
  const [active, setActive] = useState<boolean[]>(() => SLOTS.map(() => true));
  const [ring, setRing] = useState<number | null>(null);
  const timers = useRef<number[]>([]);

  const collect = useCallback((index: number) => {
    setActive((prev) => {
      if (!prev[index]) return prev;
      const next = [...prev];
      next[index] = false;
      return next;
    });
    setRing(index);
    setCollected((count) => count + 1);

    const respawn = window.setTimeout(() => {
      setActive((prev) => {
        const next = [...prev];
        next[index] = true;
        return next;
      });
    }, 2000);
    const clearRing = window.setTimeout(() => {
      setRing((current) => (current === index ? null : current));
    }, 700);
    timers.current.push(respawn, clearRing);
  }, []);

  return (
    <div
      className="pointer-events-none absolute inset-0 z-20 hidden sm:block"
      aria-hidden="true"
    >
      {SLOTS.map((slot, index) => (
        <button
          key={`${slot.top}-${slot.left}`}
          type="button"
          tabIndex={-1}
          aria-hidden="true"
          disabled={!active[index]}
          onClick={() => collect(index)}
          className={`pointer-events-auto absolute -m-7 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full outline-none transition-[opacity,transform] duration-500 focus-visible:ring-2 focus-visible:ring-[#65E8E0]/70 ${
            active[index]
              ? "opacity-100 hover:scale-110 focus-visible:scale-110"
              : "pointer-events-none opacity-0"
          }`}
          style={{
            top: slot.top,
            left: slot.left,
          }}
        >
          <span
            className="bob relative block rounded-full"
            style={
              {
                width: slot.size,
                height: slot.size,
                "--bob-delay": slot.delay,
                "--bob-duration": slot.duration,
              } as React.CSSProperties
            }
          >
            <span className="pulse-bio absolute inset-0 rounded-full bg-[radial-gradient(circle,#D8FFFB_0%,#8FF2EC_28%,rgba(101,232,224,0.35)_58%,transparent_75%)]" />
            <span className="absolute inset-[30%] rounded-full bg-white/85 blur-[1.5px]" />
          </span>
          {ring === index && !reduced ? (
            <span className="ring-pop pointer-events-none absolute inset-2 rounded-full border border-[#8FF2EC]" />
          ) : null}
        </button>
      ))}

      {/* Tiny pickup counter — the one bit of game scoring in the hero */}
      <div className="absolute bottom-24 right-6 z-10 select-none sm:right-10">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/35 px-3.5 py-1.5 text-[0.7rem] tracking-[0.22em] text-[#9FD8D2] backdrop-blur-sm">
          <span aria-hidden="true" className="text-[#8FF2EC]">
            ✦
          </span>
          <span className={collected > 0 ? "pop" : undefined} key={collected}>
            {String(collected).padStart(2, "0")}
          </span>
          <span className="text-[#7E948D]">SPORES</span>
        </span>
      </div>
    </div>
  );
}
