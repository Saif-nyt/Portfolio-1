/**
 * Original editorial portrait placeholder. Replace with a real photograph by
 * swapping this component for a next/image once a licensed photo exists.
 */
export function ProfileArt() {
  return (
    <figure className="relative">
      <div className="relative overflow-hidden rounded-[1.75rem] border border-line bg-surface-3">
        <svg
          viewBox="0 0 520 640"
          role="img"
          aria-label="Portrait placeholder for T. M. Saiful Islam"
          className="block h-auto w-full"
        >
          <defs>
            <linearGradient id="portrait-bg" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#E5D8C5" />
              <stop offset="55%" stopColor="#D8CDBA" />
              <stop offset="100%" stopColor="#C9BCA6" />
            </linearGradient>
            <linearGradient id="portrait-glow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#31BEB6" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#31BEB6" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="portrait-figure" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1B3A32" />
              <stop offset="100%" stopColor="#0E241E" />
            </linearGradient>
          </defs>

          <rect width="520" height="640" fill="url(#portrait-bg)" />

          {/* soft light shaft */}
          <path d="M340 -40 L520 120 L520 420 L300 220 Z" fill="url(#portrait-glow)" opacity="0.5" />

          {/* botanical lines */}
          <g
            stroke="#858B68"
            strokeWidth="1.4"
            fill="none"
            opacity="0.55"
            strokeLinecap="round"
          >
            <path d="M40 640 C 60 560, 30 520, 74 452" />
            <path d="M110 640 C 124 580, 96 546, 132 500" />
            <path d="M480 640 C 466 578, 494 542, 458 494" />
          </g>
          <g fill="#31BEB6" opacity="0.7">
            <circle cx="74" cy="450" r="7" />
            <circle cx="132" cy="498" r="5.5" />
            <circle cx="458" cy="492" r="6" />
          </g>

          {/* figure silhouette */}
          <g fill="url(#portrait-figure)">
            <circle cx="260" cy="248" r="86" />
            <path d="M260 352 c -112 0 -186 74 -196 186 -2 22 10 36 34 36 h324 c 24 0 36 -14 34 -36 -10 -112 -84 -186 -196 -186 Z" />
          </g>

          {/* rim light */}
          <path
            d="M330 196 a86 86 0 0 1 -46 148"
            stroke="#65E8E0"
            strokeWidth="3"
            fill="none"
            opacity="0.75"
          />

          <text
            x="260"
            y="272"
            textAnchor="middle"
            fill="#F5F0E7"
            fontFamily="var(--font-display), sans-serif"
            fontSize="64"
            letterSpacing="4"
          >
            TS
          </text>
        </svg>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-surface-3/90 to-transparent" />
      </div>

      <figcaption className="mt-3 flex items-center justify-between text-[0.7rem] tracking-wide text-muted">
        <span>Illustrated portrait</span>
        <span className="font-editorial italic">Not a photograph</span>
      </figcaption>
    </figure>
  );
}
