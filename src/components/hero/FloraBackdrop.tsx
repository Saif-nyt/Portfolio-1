interface FloraBackdropProps {
  className?: string;
}

/**
 * Original bioluminescent flora artwork — thin stems, seed heads and drifting
 * spores. Pure SVG, so it stays crisp and costs no extra requests.
 */
export function FloraBackdrop({ className = "" }: FloraBackdropProps) {
  return (
    <svg
      viewBox="0 0 1200 260"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <defs>
        <linearGradient id="flora-stem" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="var(--glow)" stopOpacity="0.05" />
          <stop offset="100%" stopColor="var(--glow)" stopOpacity="0.5" />
        </linearGradient>
        <radialGradient id="flora-node">
          <stop offset="0%" stopColor="var(--glow)" stopOpacity="0.95" />
          <stop offset="100%" stopColor="var(--glow)" stopOpacity="0" />
        </radialGradient>
      </defs>

      <g stroke="url(#flora-stem)" fill="none" strokeWidth="1.6">
        <path d="M40 260 C 60 190, 30 150, 70 96" />
        <path d="M120 260 C 140 210, 110 170, 150 130" />
        <path d="M215 260 C 235 220, 205 176, 250 146" />
        <path d="M330 260 C 345 205, 315 156, 360 108" />
        <path d="M470 260 C 480 214, 455 178, 495 150" />
        <path d="M610 260 C 628 210, 598 168, 640 124" />
        <path d="M745 260 C 760 216, 735 182, 775 156" />
        <path d="M875 260 C 890 204, 862 160, 905 116" />
        <path d="M1000 260 C 1015 220, 990 184, 1030 152" />
        <path d="M1120 260 C 1138 208, 1110 166, 1152 122" />
      </g>

      {/* One animation per group instead of per node: SVG children cannot be
          composited, so a pulse on every circle forces a main-thread style
          recalculation on each frame and makes scrolling stutter. */}
      <g
        fill="url(#flora-node)"
        className="pulse-glow"
        opacity="0.85"
      >
        <circle cx="70" cy="96" r="14" />
        <circle cx="250" cy="146" r="13" />
        <circle cx="495" cy="150" r="10" />
        <circle cx="775" cy="156" r="11" />
        <circle cx="1030" cy="152" r="12" />
      </g>

      <g
        fill="url(#flora-node)"
        className="pulse-glow"
        opacity="0.85"
        style={{ animationDelay: "2.1s" }}
      >
        <circle cx="150" cy="130" r="11" />
        <circle cx="360" cy="108" r="16" />
        <circle cx="640" cy="124" r="15" />
        <circle cx="905" cy="116" r="14" />
        <circle cx="1152" cy="122" r="15" />
      </g>

      <g
        fill="var(--glow)"
        className="pulse-glow"
        opacity="0.5"
        style={{ animationDelay: "1s" }}
      >
        <circle cx="180" cy="70" r="2" />
        <circle cx="420" cy="92" r="1.6" />
        <circle cx="560" cy="60" r="2.2" />
        <circle cx="690" cy="96" r="1.7" />
        <circle cx="940" cy="64" r="2" />
        <circle cx="1080" cy="88" r="1.8" />
      </g>
    </svg>
  );
}
