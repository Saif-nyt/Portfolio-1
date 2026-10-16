import type { CSSProperties } from "react";

interface FireflyPreset {
  left: string;
  top: string;
  size: number;
  x1: string;
  y1: string;
  x2: string;
  y2: string;
  dur: string;
  delay: string;
  blur?: number;
}

/** Hand-placed drift paths so every card feels organic, not synchronized. */
const PRESETS: FireflyPreset[] = [
  { left: "10%", top: "22%", size: 4, x1: "34px", y1: "-26px", x2: "-16px", y2: "30px", dur: "7.5s", delay: "0s" },
  { left: "76%", top: "16%", size: 3, x1: "-28px", y1: "22px", x2: "18px", y2: "-24px", dur: "9.2s", delay: "1.4s" },
  { left: "58%", top: "68%", size: 5, x1: "26px", y1: "18px", x2: "-22px", y2: "-20px", dur: "8.4s", delay: "0.7s", blur: 0.6 },
  { left: "24%", top: "74%", size: 3, x1: "-20px", y1: "-28px", x2: "24px", y2: "16px", dur: "10.5s", delay: "2.1s" },
  { left: "88%", top: "52%", size: 4, x1: "-30px", y1: "-14px", x2: "14px", y2: "26px", dur: "6.8s", delay: "2.8s" },
];

interface FirefliesProps {
  count?: number;
  className?: string;
}

/**
 * A few softly drifting glow motes for the inside of a card. Pure markup and
 * CSS — no client JS. Dots sleep until the parent `.group` is hovered
 * (see `.fireflies` in globals.css), so grids stay free at rest.
 */
export function Fireflies({ count = 3, className = "" }: FirefliesProps) {
  const dots = PRESETS.slice(0, Math.min(count, PRESETS.length));

  return (
    <span aria-hidden="true" className={`fireflies ${className}`}>
      {dots.map((dot, index) => (
        <i
          key={index}
          style={
            {
              left: dot.left,
              top: dot.top,
              width: dot.size,
              height: dot.size,
              filter: dot.blur ? `blur(${dot.blur}px)` : undefined,
              animationDelay: dot.delay,
              "--ff-x1": dot.x1,
              "--ff-y1": dot.y1,
              "--ff-x2": dot.x2,
              "--ff-y2": dot.y2,
              "--ff-dur": dot.dur,
            } as CSSProperties
          }
        />
      ))}
    </span>
  );
}
