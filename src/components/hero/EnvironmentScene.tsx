"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { useRef, type PointerEvent } from "react";

interface LayerProps {
  children: React.ReactNode;
  depth: number;
  className?: string;
}

/**
 * A single depth layer of the Pandora environment. Layers move at different
 * speeds on scroll (and, on fine pointers, follow the cursor slightly) to
 * create volumetric depth without hijacking the page scroll.
 */
function Layer({ children, depth, className = "" }: LayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, depth]);
  const style = reduced ? undefined : { y };

  return (
    <motion.div
      ref={ref}
      style={style}
      className={`absolute inset-0 will-change-transform ${className}`}
      data-depth={depth}
    >
      {children}
    </motion.div>
  );
}

export function EnvironmentScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (reduced || window.matchMedia("(pointer: coarse)").matches) return;
    const node = containerRef.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    node.style.setProperty("--pointer-x", `${px * 18}px`);
    node.style.setProperty("--pointer-y", `${py * 12}px`);
  };

  const onPointerLeave = () => {
    const node = containerRef.current;
    if (!node) return;
    node.style.setProperty("--pointer-x", "0px");
    node.style.setProperty("--pointer-y", "0px");
  };

  return (
    <div
      ref={containerRef}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className="absolute inset-0 overflow-hidden bg-[#060F0C]"
      style={
        {
          "--pointer-x": "0px",
          "--pointer-y": "0px",
        } as React.CSSProperties
      }
      aria-hidden="true"
    >
      {/* Sky + volumetric light */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_-10%,#14463E_0%,#0B241E_38%,#060F0C_78%)]" />
      <div
        className="absolute left-1/2 top-[18%] h-[42vw] w-[42vw] max-h-[520px] max-w-[520px] -translate-x-1/2 rounded-full opacity-70 blur-3xl transition-transform duration-700 ease-out"
        style={{
          background:
            "radial-gradient(circle, rgba(101,232,224,0.34) 0%, rgba(49,190,182,0.12) 45%, transparent 70%)",
          transform:
            "translate(calc(-50% + var(--pointer-x)), calc(var(--pointer-y)))",
        }}
      />

      <Layer depth={-16}>
        <svg
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
          className="h-full w-full"
        >
          <defs>
            <linearGradient id="ridge-far" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0E3129" />
              <stop offset="100%" stopColor="#08201A" />
            </linearGradient>
            <linearGradient id="ridge-mid" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0B2A22" />
              <stop offset="100%" stopColor="#061813" />
            </linearGradient>
          </defs>

          {/* far mountain ridge */}
          <path
            fill="url(#ridge-far)"
            opacity="0.9"
            d="M0 640 L120 560 L210 600 L320 500 L430 575 L520 530 L640 610 L760 520 L880 585 L1010 505 L1140 580 L1260 525 L1360 585 L1440 545 L1440 900 L0 900 Z"
          />
          {/* second ridge */}
          <path
            fill="url(#ridge-mid)"
            d="M0 705 L140 655 L250 690 L370 630 L470 675 L600 640 L720 695 L860 645 L980 690 L1120 650 L1250 700 L1370 660 L1440 690 L1440 900 L0 900 Z"
          />
        </svg>
      </Layer>

      {/* Floating islands */}
      <Layer depth={-34}>
        <svg
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
          className="h-full w-full"
        >
          <defs>
            <linearGradient id="island" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#123A31" />
              <stop offset="100%" stopColor="#071B16" />
            </linearGradient>
            <linearGradient id="island-rim" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#65E8E0" stopOpacity="0" />
              <stop offset="50%" stopColor="#65E8E0" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#65E8E0" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* island A — large, left */}
          <g opacity="0.96">
            <path
              fill="url(#island)"
              d="M120 372 C 168 330, 300 318, 372 352 C 430 380, 452 424, 424 452 C 398 478, 344 470, 330 496 C 318 520, 340 546, 322 574 C 302 606, 254 604, 236 574 C 218 544, 236 512, 224 486 C 208 452, 150 442, 124 414 C 104 392, 104 392, 120 372 Z"
            />
            <path
              stroke="url(#island-rim)"
              strokeWidth="3"
              fill="none"
              d="M126 374 C 180 332, 300 320, 370 352"
            />
            <path
              stroke="#65E8E0"
              strokeOpacity="0.35"
              strokeWidth="2"
              fill="none"
              d="M262 596 C 258 640, 274 668, 262 712"
            />
            <circle cx="262" cy="716" r="5" fill="#65E8E0" className="pulse-glow" />
          </g>

          {/* island B — distant, right */}
          <g opacity="0.8">
            <path
              fill="url(#island)"
              d="M1010 268 C 1054 236, 1156 232, 1206 260 C 1250 284, 1258 318, 1232 338 C 1208 356, 1168 350, 1156 372 C 1144 394, 1162 414, 1146 436 C 1128 460, 1090 456, 1078 432 C 1066 408, 1084 386, 1074 364 C 1058 330, 1014 322, 1000 300 C 986 280, 992 284, 1010 268 Z"
            />
            <path
              stroke="url(#island-rim)"
              strokeWidth="2.5"
              fill="none"
              d="M1014 268 C 1060 238, 1156 234, 1204 260"
            />
          </g>

          {/* island C — small, high */}
          <g opacity="0.6">
            <path
              fill="#0C2A23"
              d="M660 176 C 692 156, 754 154, 784 172 C 810 188, 812 210, 792 224 C 774 236, 748 232, 740 246 C 732 260, 744 274, 732 286 C 718 300, 692 296, 686 282 C 680 266, 692 254, 684 240 C 672 220, 644 214, 638 198 C 632 184, 644 188, 660 176 Z"
            />
            <path
              stroke="#65E8E0"
              strokeOpacity="0.4"
              strokeWidth="2"
              fill="none"
              d="M662 176 C 694 158, 754 156, 782 172"
            />
          </g>
        </svg>
      </Layer>

      {/* Atmospheric haze */}
      <div className="pointer-events-none absolute inset-x-0 top-[38%] h-[46%] bg-[linear-gradient(to_bottom,transparent,rgba(101,232,224,0.07)_45%,transparent)] blur-2xl" />

      {/* Foreground cliffs + bioluminescent flora */}
      <Layer depth={26}>
        <svg
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMax slice"
          className="h-full w-full"
        >
          <defs>
            <linearGradient id="cliff" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#07211A" />
              <stop offset="100%" stopColor="#03100C" />
            </linearGradient>
            <radialGradient id="bio-node">
              <stop offset="0%" stopColor="#8FF2EC" stopOpacity="0.95" />
              <stop offset="45%" stopColor="#65E8E0" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#65E8E0" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="stem" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#0B3229" />
              <stop offset="100%" stopColor="#31BEB6" stopOpacity="0.75" />
            </linearGradient>
            <radialGradient id="ground-glow">
              <stop offset="0%" stopColor="#31BEB6" stopOpacity="0.2" />
              <stop offset="60%" stopColor="#31BEB6" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#31BEB6" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* cliff body */}
          <path
            fill="url(#cliff)"
            d="M0 780 C 90 742, 150 762, 236 742 C 320 722, 372 754, 452 744 C 540 734, 596 706, 690 726 C 780 746, 830 716, 924 734 C 1010 750, 1064 722, 1156 742 C 1246 762, 1320 736, 1440 764 L1440 900 L0 900 Z"
          />

          {/* left flora cluster — one pulse per group (per-node CSS animation
              on SVG children forces a main-thread style recalc every frame) */}
          <g
            stroke="url(#stem)"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          >
            <path d="M96 880 C 88 812, 120 786, 104 728" />
            <path d="M168 884 C 176 826, 148 796, 176 754" />
            <path d="M46 878 C 40 828, 66 806, 52 764" />
            <path d="M246 886 C 254 838, 232 812, 258 782" />
          </g>
          <g fill="url(#bio-node)" className="pulse-glow" opacity="0.9">
            <circle cx="104" cy="726" r="34" />
            <circle cx="176" cy="752" r="26" />
            <circle cx="52" cy="762" r="22" />
            <circle cx="258" cy="780" r="30" />
          </g>

          {/* right flora cluster */}
          <g
            stroke="url(#stem)"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          >
            <path d="M1320 884 C 1312 818, 1344 790, 1330 736" />
            <path d="M1392 882 C 1400 826, 1372 796, 1398 758" />
            <path d="M1244 888 C 1254 842, 1232 816, 1258 786" />
          </g>
          <g
            fill="url(#bio-node)"
            className="pulse-glow"
            opacity="0.9"
            style={{ animationDelay: "2.2s" }}
          >
            <circle cx="1330" cy="734" r="32" />
            <circle cx="1398" cy="756" r="24" />
            <circle cx="1258" cy="784" r="28" />
          </g>

          {/* low ground glow — radial gradient instead of a blurred ellipse */}
          <ellipse cx="720" cy="896" rx="620" ry="60" fill="url(#ground-glow)" />
        </svg>
      </Layer>

      {/* Vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(130%_100%_at_50%_50%,transparent_45%,rgba(3,10,8,0.72)_100%)]" />
    </div>
  );
}
