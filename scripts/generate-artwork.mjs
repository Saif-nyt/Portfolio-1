/**
 * Generates the original artwork served by the content backend.
 *
 *   node scripts/generate-artwork.mjs
 *
 * Writes one SVG per project to content/images/<slug>.svg. The art is
 * abstract and on-brand (bioluminescent ridges, a category motif, glow
 * nodes) — deliberately not a mock client screenshot, so nothing on the
 * site pretends to be work it isn't. The pages fall back to the inline
 * SVG artwork if an image fails to load.
 */

import fs from "node:fs";
import path from "node:path";

const OUT_DIR = path.join(process.cwd(), "content", "images");
const PROJECTS_FILE = path.join(process.cwd(), "content", "projects.json");

/** Per-project palettes; any unknown slug falls back to the last entry. */
const PALETTES = {
  "ecommerce-storefront-experience": {
    accent: "#65E8E0",
    accent2: "#31BEB6",
    motif: "storefront",
  },
  "modern-shopify-product-store": {
    accent: "#8FF2EC",
    accent2: "#4FC9C0",
    motif: "product",
  },
  "meta-ads-conversion-tracking-system": {
    accent: "#9FD8D2",
    accent2: "#5FBFB6",
    motif: "funnel",
  },
  "full-stack-business-dashboard": {
    accent: "#65E8E0",
    accent2: "#7FE3B8",
    motif: "dashboard",
  },
  "conversion-focused-landing-page": {
    accent: "#8FF2EC",
    accent2: "#C9E7C4",
    motif: "landing",
  },
  "personal-brand-portfolio": {
    accent: "#9FD8D2",
    accent2: "#D8C4AA",
    motif: "portfolio",
  },
};

const FALLBACK = { accent: "#65E8E0", accent2: "#31BEB6", motif: "portfolio" };

const PROJECTS = JSON.parse(fs.readFileSync(PROJECTS_FILE, "utf8")).map(
  (project) => {
    const title = project.title || project.slug;
    return {
      slug: project.slug,
      label: title.length > 30 ? `${title.slice(0, 29)}…` : title,
      ...(PALETTES[project.slug] ?? FALLBACK),
    };
  },
);

/** Tiny deterministic PRNG so re-running the script keeps images stable. */
function seededRandom(seed) {
  let state = 0;
  for (const char of seed) state = (state * 31 + char.charCodeAt(0)) >>> 0;
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 0xffffffff;
  };
}

function ridges(rand, { baseY, spread, color, opacity }) {
  const steps = 9;
  let d = `M0 900 L0 ${baseY}`;
  for (let i = 1; i <= steps; i += 1) {
    const x = (1200 / steps) * i;
    const y = baseY + (rand() - 0.5) * spread;
    d += ` L${Math.round(x)} ${Math.round(y)}`;
  }
  d += " L1200 900 Z";
  return `<path d="${d}" fill="${color}" opacity="${opacity}" />`;
}

function glowNodes(rand, accent, count) {
  const nodes = [];
  for (let i = 0; i < count; i += 1) {
    const x = Math.round(rand() * 1100 + 50);
    const y = Math.round(rand() * 380 + 120);
    const r = Math.round(rand() * 18 + 8);
    nodes.push(
      `<circle cx="${x}" cy="${y}" r="${r}" fill="url(#node-${i % 3})" opacity="${(0.35 + rand() * 0.4).toFixed(2)}" />`,
    );
    nodes.push(
      `<circle cx="${x}" cy="${y}" r="2.5" fill="${accent}" opacity="0.9" />`,
    );
  }
  return nodes.join("\n    ");
}

function motif(kind, accent, accent2) {
  switch (kind) {
    case "storefront":
      return `
    <g opacity="0.9">
      <rect x="360" y="300" width="480" height="290" rx="14" fill="#0E1F1A" stroke="${accent2}" strokeOpacity="0.45" />
      <rect x="360" y="300" width="480" height="54" rx="14" fill="#122922" />
      <circle cx="388" cy="327" r="6" fill="${accent2}" opacity="0.6" />
      <circle cx="408" cy="327" r="6" fill="${accent2}" opacity="0.35" />
      <rect x="392" y="382" width="190" height="120" rx="10" fill="${accent}" opacity="0.16" />
      <rect x="600" y="382" width="208" height="16" rx="8" fill="${accent2}" opacity="0.5" />
      <rect x="600" y="412" width="150" height="12" rx="6" fill="#3C544C" />
      <rect x="600" y="436" width="180" height="12" rx="6" fill="#3C544C" />
      <rect x="600" y="470" width="110" height="30" rx="15" fill="${accent}" />
      <rect x="392" y="520" width="416" height="52" rx="10" fill="#0B1A16" stroke="#1E3A33" />
    </g>`;
    case "product":
      return `
    <g opacity="0.9">
      <rect x="330" y="290" width="250" height="310" rx="16" fill="#0E1F1A" stroke="${accent2}" strokeOpacity="0.4" />
      <rect x="356" y="320" width="198" height="170" rx="12" fill="${accent}" opacity="0.14" />
      <circle cx="455" cy="405" r="54" fill="${accent2}" opacity="0.28" />
      <rect x="356" y="512" width="150" height="14" rx="7" fill="#4A625A" />
      <rect x="356" y="540" width="96" height="26" rx="13" fill="${accent}" />
      <rect x="610" y="290" width="260" height="140" rx="14" fill="#0B1A16" stroke="#1E3A33" />
      <rect x="634" y="322" width="180" height="12" rx="6" fill="#3C544C" />
      <rect x="634" y="350" width="140" height="12" rx="6" fill="#3C544C" />
      <rect x="610" y="452" width="260" height="148" rx="14" fill="#0B1A16" stroke="#1E3A33" />
      <rect x="634" y="484" width="120" height="12" rx="6" fill="#3C544C" />
      <rect x="634" y="512" width="200" height="12" rx="6" fill="#3C544C" />
    </g>`;
    case "funnel":
      return `
    <g opacity="0.9">
      <path d="M330 300 H870 L720 420 V560 L480 620 V420 Z" fill="#0E1F1A" stroke="${accent2}" strokeOpacity="0.4" />
      <path d="M370 330 H830 L710 430 H490 Z" fill="${accent}" opacity="0.14" />
      <rect x="500" y="460" width="200" height="14" rx="7" fill="${accent2}" opacity="0.7" />
      <rect x="520" y="492" width="160" height="12" rx="6" fill="#3C544C" />
      <circle cx="600" cy="560" r="26" fill="${accent}" opacity="0.5" />
      <circle cx="600" cy="560" r="6" fill="${accent}" />
      <g fill="#3C544C">
        <circle cx="400" cy="270" r="10" /><circle cx="600" cy="256" r="10" /><circle cx="800" cy="270" r="10" />
      </g>
    </g>`;
    case "dashboard":
      return `
    <g opacity="0.9">
      <rect x="300" y="280" width="600" height="330" rx="16" fill="#0E1F1A" stroke="${accent2}" strokeOpacity="0.4" />
      <rect x="300" y="280" width="150" height="330" rx="16" fill="#0B1A16" />
      <rect x="326" y="320" width="98" height="10" rx="5" fill="#3C544C" />
      <rect x="326" y="348" width="76" height="10" rx="5" fill="#3C544C" />
      <rect x="326" y="376" width="88" height="10" rx="5" fill="${accent2}" opacity="0.6" />
      <rect x="480" y="312" width="180" height="90" rx="10" fill="${accent}" opacity="0.14" />
      <rect x="686" y="312" width="180" height="90" rx="10" fill="#122922" />
      <g fill="${accent2}" opacity="0.75">
        <rect x="480" y="500" width="26" height="70" rx="4" />
        <rect x="520" y="470" width="26" height="100" rx="4" />
        <rect x="560" y="520" width="26" height="50" rx="4" />
        <rect x="600" y="440" width="26" height="130" rx="4" />
        <rect x="640" y="490" width="26" height="80" rx="4" />
      </g>
      <path d="M700 560 L740 520 L780 540 L820 470 L860 500" fill="none" stroke="${accent}" strokeWidth="3" strokeLinecap="round" />
    </g>`;
    case "landing":
      return `
    <g opacity="0.9">
      <rect x="300" y="270" width="600" height="360" rx="16" fill="#0E1F1A" stroke="${accent2}" strokeOpacity="0.4" />
      <rect x="300" y="270" width="600" height="44" rx="16" fill="#122922" />
      <rect x="330" y="288" width="120" height="10" rx="5" fill="#3C544C" />
      <rect x="740" y="284" width="130" height="20" rx="10" fill="${accent}" />
      <rect x="336" y="360" width="330" height="22" rx="11" fill="#4A625A" />
      <rect x="336" y="396" width="260" height="16" rx="8" fill="#3C544C" />
      <rect x="336" y="444" width="120" height="30" rx="15" fill="${accent}" />
      <rect x="472" y="444" width="120" height="30" rx="15" fill="none" stroke="${accent2}" strokeOpacity="0.7" />
      <rect x="336" y="512" width="528" height="84" rx="12" fill="#0B1A16" stroke="#1E3A33" />
    </g>`;
    case "portfolio":
    default:
      return `
    <g opacity="0.9">
      <rect x="340" y="280" width="520" height="340" rx="16" fill="#0E1F1A" stroke="${accent2}" strokeOpacity="0.4" />
      <circle cx="440" cy="380" r="48" fill="${accent}" opacity="0.2" />
      <rect x="520" y="352" width="260" height="16" rx="8" fill="#4A625A" />
      <rect x="520" y="384" width="190" height="12" rx="6" fill="#3C544C" />
      <g fill="#122922">
        <rect x="372" y="460" width="150" height="110" rx="10" />
        <rect x="545" y="460" width="150" height="110" rx="10" />
        <rect x="718" y="460" width="110" height="110" rx="10" />
      </g>
      <rect x="372" y="460" width="150" height="110" rx="10" fill="none" stroke="${accent2}" strokeOpacity="0.35" />
    </g>`;
  }
}

function buildSvg(project) {
  const rand = seededRandom(project.slug);
  const { accent, accent2, motif: kind, label } = project;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 750" role="img" aria-label="Original abstract artwork for ${label}">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#0F3A31" />
      <stop offset="55%" stopColor="#0A211C" />
      <stop offset="100%" stopColor="#060F0C" />
    </linearGradient>
    <radialGradient id="moon">
      <stop offset="0%" stopColor="${accent}" stopOpacity="0.35" />
      <stop offset="60%" stopColor="${accent2}" stopOpacity="0.12" />
      <stop offset="100%" stopColor="${accent2}" stopOpacity="0" />
    </radialGradient>
    <radialGradient id="node-0">
      <stop offset="0%" stopColor="${accent}" stopOpacity="0.75" />
      <stop offset="100%" stopColor="${accent}" stopOpacity="0" />
    </radialGradient>
    <radialGradient id="node-1">
      <stop offset="0%" stopColor="${accent2}" stopOpacity="0.7" />
      <stop offset="100%" stopColor="${accent2}" stopOpacity="0" />
    </radialGradient>
    <radialGradient id="node-2">
      <stop offset="0%" stopColor="#8FF2EC" stopOpacity="0.55" />
      <stop offset="100%" stopColor="#8FF2EC" stopOpacity="0" />
    </radialGradient>
    <linearGradient id="ridge-far" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#12463C" />
      <stop offset="100%" stopColor="#0A2A22" />
    </linearGradient>
    <linearGradient id="ridge-mid" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#0D3229" />
      <stop offset="100%" stopColor="#071E18" />
    </linearGradient>
    <radialGradient id="ground" cx="50%" cy="100%" r="80%">
      <stop offset="0%" stopColor="${accent2}" stopOpacity="0.18" />
      <stop offset="100%" stopColor="${accent2}" stopOpacity="0" />
    </radialGradient>
  </defs>

  <rect width="1200" height="750" fill="url(#sky)" />
  <circle cx="980" cy="120" r="260" fill="url(#moon)" />
  <circle cx="180" cy="90" r="150" fill="url(#moon)" opacity="0.5" />

  ${ridges(rand, { count: 5, baseY: 430, spread: 90, color: "url(#ridge-far)", opacity: 0.95 })}
  ${ridges(rand, { count: 7, baseY: 520, spread: 70, color: "url(#ridge-mid)", opacity: 0.95 })}

  ${motif(kind, accent, accent2)}

  ${glowNodes(rand, accent, 9)}

  <rect y="600" width="1200" height="150" fill="url(#ground)" />
  <rect width="1200" height="750" fill="none" stroke="#1E3A33" strokeOpacity="0.7" />

  <text x="48" y="700" fill="#7E938B" fontFamily="ui-sans-serif, system-ui, sans-serif" font-size="20" letterSpacing="6">${label.toUpperCase()}</text>
  <text x="1152" y="700" text-anchor="end" fill="#4A625A" fontFamily="ui-sans-serif, system-ui, sans-serif" font-size="14" letterSpacing="4">ORIGINAL ARTWORK</text>
</svg>
`;
}

fs.mkdirSync(OUT_DIR, { recursive: true });
for (const project of PROJECTS) {
  const file = path.join(OUT_DIR, `${project.slug}.svg`);
  fs.writeFileSync(file, buildSvg(project));
  console.log("wrote", path.relative(process.cwd(), file));
}
