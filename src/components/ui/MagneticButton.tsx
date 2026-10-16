"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";
import { motion } from "motion/react";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
}

/**
 * Subtle pointer magnetism for primary desktop CTAs. The hit area never moves —
 * only the visual surface shifts a few pixels, so the target stays easy to click.
 * Disabled for touch pointers and reduced-motion preferences.
 */
export function MagneticButton({
  children,
  className = "",
  strength = 0.28,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (reduced) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const x = (event.clientX - rect.left - rect.width / 2) * strength;
    const y = (event.clientY - rect.top - rect.height / 2) * strength;
    node.style.setProperty("--mag-x", `${x}px`);
    node.style.setProperty("--mag-y", `${y}px`);
  };

  const onPointerLeave = () => {
    const node = ref.current;
    if (!node) return;
    node.style.setProperty("--mag-x", "0px");
    node.style.setProperty("--mag-y", "0px");
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      whileTap={reduced ? undefined : { scale: 0.96 }}
      style={{
        ["--mag-x" as string]: "0px",
        ["--mag-y" as string]: "0px",
      }}
      className={`inline-flex transition-transform duration-500 ease-out will-change-transform ${className}`}
    >
      <span
        className="inline-flex transition-transform duration-500 ease-out will-change-transform"
        style={{ transform: "translate(var(--mag-x), var(--mag-y))" }}
      >
        {children}
      </span>
    </motion.div>
  );
}
