interface ArtworkProps {
  className?: string;
}

const SCREEN = "#0B1A16";
const SCREEN_2 = "#10251F";
const PANEL = "#16302A";
const WARM = "#E5D8C5";
const CREAM = "#FBF8F2";
const CYAN = "#65E8E0";
const TURQ = "#31BEB6";

function Frame({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <svg
      viewBox="0 0 640 400"
      role="img"
      aria-label={title}
      className="block h-auto w-full"
    >
      <rect width="640" height="400" fill="#08130F" />
      <rect x="0" y="0" width="640" height="400" fill="none" stroke="#1E3A33" />
      {children}
    </svg>
  );
}

function BrowserChrome({ label }: { label: string }) {
  return (
    <g>
      <rect x="0" y="0" width="640" height="34" fill="#0E1F1A" />
      <circle cx="20" cy="17" r="4" fill="#3C544C" />
      <circle cx="34" cy="17" r="4" fill="#3C544C" />
      <circle cx="48" cy="17" r="4" fill="#3C544C" />
      <rect x="70" y="9" width="330" height="16" rx="8" fill="#142C26" />
      <text
        x="82"
        y="21"
        fill="#7E938B"
        fontFamily="var(--font-body), sans-serif"
        fontSize="9"
      >
        {label}
      </text>
    </g>
  );
}

export function SkincareStorefront({ className = "" }: ArtworkProps) {
  return (
    <div className={className}>
      <Frame title="Concept project: warm neutral skincare storefront with product grid and mobile preview">
        <BrowserChrome label="concept-store.example / homepage" />
        <rect x="0" y="34" width="640" height="366" fill={CREAM} />
        <rect x="0" y="34" width="640" height="44" fill={WARM} />
        <text x="24" y="62" fill="#1B2B26" fontFamily="var(--font-display), sans-serif" fontSize="15" letterSpacing="3">
          LUMEA
        </text>
        <g fill="#5A6560" fontFamily="var(--font-body), sans-serif" fontSize="10">
          <text x="430" y="61">Shop</text>
          <text x="478" y="61">Rituals</text>
          <text x="536" y="61">About</text>
        </g>
        <rect x="586" y="50" width="30" height="22" rx="11" fill="#1B2B26" />

        {/* hero */}
        <rect x="24" y="96" width="380" height="126" rx="10" fill="#EFE6D8" />
        <text x="44" y="140" fill="#1B2B26" fontFamily="var(--font-display), sans-serif" fontSize="20">
          Skin that keeps
        </text>
        <text x="44" y="166" fill="#1B2B26" fontFamily="var(--font-display), sans-serif" fontSize="20">
          its glow.
        </text>
        <rect x="44" y="182" width="96" height="24" rx="12" fill="#1B2B26" />
        <text x="60" y="198" fill={CREAM} fontFamily="var(--font-body), sans-serif" fontSize="10">
          Shop now
        </text>
        <circle cx="330" cy="152" r="52" fill="#D8C4AA" />
        <circle cx="352" cy="132" r="34" fill="#E9DAC4" />

        {/* product grid */}
        <g>
          {[0, 1, 2, 3].map((i) => (
            <g key={i} transform={`translate(${24 + i * 150}, 240)`}>
              <rect width="134" height="130" rx="8" fill="#F3ECE1" />
              <rect x="24" y="14" width="86" height="66" rx="6" fill="#DCCDB6" />
              <rect x="46" y="26" width="42" height="46" rx="8" fill="#C9B393" />
              <rect x="16" y="92" width="76" height="7" rx="3.5" fill="#B9AC98" />
              <rect x="16" y="106" width="46" height="7" rx="3.5" fill="#CFC4B2" />
            </g>
          ))}
        </g>

        {/* mobile preview */}
        <g transform="translate(470,96)">
          <rect width="146" height="286" rx="20" fill="#0E1F1A" />
          <rect x="7" y="7" width="132" height="272" rx="15" fill={CREAM} />
          <rect x="7" y="7" width="132" height="34" rx="15" fill={WARM} />
          <text x="20" y="29" fill="#1B2B26" fontFamily="var(--font-display), sans-serif" fontSize="10" letterSpacing="2">
            LUMEA
          </text>
          <rect x="20" y="54" width="106" height="86" rx="8" fill="#EFE6D8" />
          <circle cx="73" cy="97" r="30" fill="#D8C4AA" />
          <rect x="20" y="152" width="106" height="8" rx="4" fill="#C9BCA6" />
          <rect x="20" y="168" width="72" height="8" rx="4" fill="#DCD2C2" />
          <rect x="20" y="196" width="106" height="28" rx="14" fill="#1B2B26" />
          <text x="46" y="214" fill={CREAM} fontFamily="var(--font-body), sans-serif" fontSize="10">
            Add to bag
          </text>
          <rect x="20" y="238" width="106" height="30" rx="8" fill="#F3ECE1" />
        </g>
      </Frame>
    </div>
  );
}

export function ShopifyStore({ className = "" }: ArtworkProps) {
  return (
    <div className={className}>
      <Frame title="Concept project: modern Shopify product store with collection grid and mobile experience">
        <BrowserChrome label="concept-store.example / products" />
        <rect x="0" y="34" width="640" height="366" fill={SCREEN} />

        <rect x="0" y="34" width="640" height="40" fill={SCREEN_2} />
        <text x="24" y="60" fill={CREAM} fontFamily="var(--font-display), sans-serif" fontSize="14" letterSpacing="3">
          NORTHKIT
        </text>
        <g fill="#93A79F" fontFamily="var(--font-body), sans-serif" fontSize="10">
          <text x="440" y="59">New</text>
          <text x="486" y="59">Collections</text>
          <text x="560" y="59">Cart (2)</text>
        </g>

        {/* breadcrumb + gallery */}
        <text x="24" y="102" fill="#7E938B" fontFamily="var(--font-body), sans-serif" fontSize="9">
          Home / Bags / Trail Daypack
        </text>
        <rect x="24" y="116" width="300" height="240" rx="10" fill={PANEL} />
        <path d="M96 300 L150 190 L204 300 Z" fill="#20463C" />
        <circle cx="252" cy="176" r="34" fill="#26564A" />
        <rect x="140" y="236" width="70" height="64" rx="12" fill={TURQ} opacity="0.35" />

        <g transform="translate(344,116)">
          <text x="0" y="16" fill="#8FF2EC" fontFamily="var(--font-body), sans-serif" fontSize="9" letterSpacing="2">
            EVERYDAY CARRY
          </text>
          <text x="0" y="48" fill={CREAM} fontFamily="var(--font-display), sans-serif" fontSize="24">
            Trail Daypack
          </text>
          <text x="0" y="76" fill={CYAN} fontFamily="var(--font-display), sans-serif" fontSize="17">
            $128.00
          </text>
          <g fill="#9DB0A8" fontFamily="var(--font-body), sans-serif" fontSize="10">
            <text x="0" y="104">Weatherproof recycled shell, 22L capacity,</text>
            <text x="0" y="120">padded laptop sleeve, lifetime repairs.</text>
          </g>
          <g>
            {["#E5D8C5", "#31BEB6", "#191D1A", "#858B68"].map((c, i) => (
              <circle key={c} cx={12 + i * 30} cy="150" r="11" fill={c} stroke="#2B473F" />
            ))}
          </g>
          <rect x="0" y="176" width="180" height="36" rx="18" fill={CYAN} />
          <text x="52" y="199" fill="#062019" fontFamily="var(--font-body), sans-serif" fontSize="12" fontWeight="600">
            Add to cart
          </text>
          <rect x="192" y="176" width="44" height="36" rx="18" fill="none" stroke="#35564D" />
        </g>

        <text x="24" y="384" fill="#7E938B" fontFamily="var(--font-body), sans-serif" fontSize="9" letterSpacing="2">
          COLLECTION GRID · 4 PER ROW · MOBILE-FIRST TAPS
        </text>
      </Frame>
    </div>
  );
}

export function TrackingSystem({ className = "" }: ArtworkProps) {
  return (
    <div className={className}>
      <Frame title="Concept project: Meta Pixel and Facebook Conversion API event flow with deduplication checklist">
        <BrowserChrome label="concept measurement / event architecture (demonstration data)" />
        <rect x="0" y="34" width="640" height="366" fill="#0A1712" />

        {/* nodes */}
        <g fontFamily="var(--font-body), sans-serif">
          <rect x="30" y="80" width="150" height="86" rx="12" fill={PANEL} stroke="#2A4A42" />
          <text x="50" y="110" fill={CYAN} fontSize="11">Browser</text>
          <text x="50" y="132" fill="#9DB0A8" fontSize="10">Meta Pixel events</text>
          <text x="50" y="150" fill="#9DB0A8" fontSize="10">PageView · ViewContent</text>

          <rect x="245" y="80" width="150" height="86" rx="12" fill={PANEL} stroke="#2A4A42" />
          <text x="265" y="110" fill={CYAN} fontSize="11">Website server</text>
          <text x="265" y="132" fill="#9DB0A8" fontSize="10">Conversion API</text>
          <text x="265" y="150" fill="#9DB0A8" fontSize="10">Purchase · Lead</text>

          <rect x="460" y="80" width="150" height="86" rx="12" fill={PANEL} stroke="#2A4A42" />
          <text x="480" y="110" fill={CYAN} fontSize="11">Meta</text>
          <text x="480" y="132" fill="#9DB0A8" fontSize="10">event_id matched</text>
          <text x="480" y="150" fill="#9DB0A8" fontSize="10">deduplicated</text>
        </g>

        <g stroke={TURQ} strokeWidth="2" fill="none" strokeDasharray="6 6">
          <path d="M180 123 L245 123" />
          <path d="M395 123 L460 123" />
          <path d="M105 166 C 105 250, 520 250, 520 166" />
        </g>
        <text x="252" y="264" fill="#7E938B" fontFamily="var(--font-body), sans-serif" fontSize="10">
          shared event_id → one conversion counted once
        </text>

        {/* checklist */}
        <rect x="30" y="286" width="580" height="86" rx="12" fill="#0E211B" stroke="#243F38" />
        <text x="50" y="312" fill={CREAM} fontFamily="var(--font-display), sans-serif" fontSize="13">
          Event testing checklist
        </text>
        <g fontFamily="var(--font-body), sans-serif" fontSize="10" fill="#9DB0A8">
          <text x="50" y="336">✓ PageView fires on all templates</text>
          <text x="50" y="356">✓ ViewContent passes product id + value</text>
          <text x="330" y="336">✓ Purchase deduplicated by event_id</text>
          <text x="330" y="356">✓ Test Events verified in Events Manager</text>
        </g>
        <text x="470" y="312" fill="#7E938B" fontFamily="var(--font-body), sans-serif" fontSize="9">
          demonstration only
        </text>
      </Frame>
    </div>
  );
}

export function BusinessDashboard({ className = "" }: ArtworkProps) {
  return (
    <div className={className}>
      <Frame title="Concept project: full-stack business dashboard with charts, tables and loading states">
        <BrowserChrome label="app.concept.example / dashboard" />
        <rect x="0" y="34" width="640" height="366" fill="#0A1712" />

        {/* sidebar */}
        <rect x="0" y="34" width="150" height="366" fill={SCREEN_2} />
        <text x="24" y="66" fill={CYAN} fontFamily="var(--font-display), sans-serif" fontSize="13" letterSpacing="2">
          OPSBASE
        </text>
        <g fontFamily="var(--font-body), sans-serif" fontSize="11" fill="#9DB0A8">
          <rect x="14" y="88" width="122" height="26" rx="8" fill="#1B3B33" />
          <text x="32" y="105" fill={CREAM}>Overview</text>
          <text x="32" y="139">Products</text>
          <text x="32" y="167">Orders</text>
          <text x="32" y="195">Customers</text>
          <text x="32" y="223">Settings</text>
        </g>

        {/* main */}
        <g transform="translate(174,58)">
          <text x="0" y="14" fill={CREAM} fontFamily="var(--font-display), sans-serif" fontSize="17">
            Overview
          </text>
          <rect x="404" y="0" width="44" height="22" rx="11" fill="#1B3B33" />
          <text x="414" y="15" fill="#9DB0A8" fontFamily="var(--font-body), sans-serif" fontSize="9">
            30d
          </text>

          {[0, 1, 2].map((i) => (
            <g key={i} transform={`translate(${i * 152},34)`}>
              <rect width="140" height="72" rx="10" fill={PANEL} stroke="#243F38" />
              <text x="16" y="26" fill="#7E938B" fontFamily="var(--font-body), sans-serif" fontSize="9">
                {["Orders", "Revenue", "Sessions"][i]}
              </text>
              <text x="16" y="54" fill={CREAM} fontFamily="var(--font-display), sans-serif" fontSize="19">
                {["1,284", "$48.2k", "32,910"][i]}
              </text>
            </g>
          ))}

          <rect x="0" y="126" width="292" height="152" rx="10" fill={PANEL} stroke="#243F38" />
          <polyline
            points="18,246 60,222 102,232 144,190 186,204 228,158 270,172"
            fill="none"
            stroke={CYAN}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <polyline
            points="18,258 60,248 102,252 144,234 186,240 228,220 270,226"
            fill="none"
            stroke={TURQ}
            strokeWidth="2"
            strokeDasharray="5 5"
            opacity="0.7"
          />

          <rect x="312" y="126" width="136" height="152" rx="10" fill={PANEL} stroke="#243F38" />
          <text x="330" y="150" fill="#7E938B" fontFamily="var(--font-body), sans-serif" fontSize="9">
            Status
          </text>
          {[0, 1, 2, 3].map((i) => (
            <g key={i} transform={`translate(330,${164 + i * 26})`}>
              <rect width="100" height="7" rx="3.5" fill="#24413A" />
              <rect width={100 - i * 18} height="7" rx="3.5" fill={i === 0 ? CYAN : "#2F5C51"} />
            </g>
          ))}
        </g>
      </Frame>
    </div>
  );
}

export function LandingPageArt({ className = "" }: ArtworkProps) {
  return (
    <div className={className}>
      <Frame title="Concept project: conversion-focused landing page with single offer, benefits, FAQ and clear CTA">
        <BrowserChrome label="concept-offer.example / landing" />
        <rect x="0" y="34" width="640" height="366" fill={CREAM} />

        <rect x="0" y="34" width="640" height="38" fill={WARM} />
        <text x="24" y="58" fill="#1B2B26" fontFamily="var(--font-display), sans-serif" fontSize="13" letterSpacing="3">
          ONEOFFER
        </text>
        <rect x="516" y="42" width="100" height="22" rx="11" fill="#12665F" />
        <text x="534" y="57" fill={CREAM} fontFamily="var(--font-body), sans-serif" fontSize="10">
          Get started
        </text>

        <text x="24" y="124" fill="#1B2B26" fontFamily="var(--font-display), sans-serif" fontSize="26">
          One offer. One page.
        </text>
        <text x="24" y="156" fill="#12665F" fontFamily="var(--font-editorial), serif" fontSize="26" fontStyle="italic">
          One obvious next step.
        </text>
        <text x="24" y="188" fill="#5A6560" fontFamily="var(--font-body), sans-serif" fontSize="11">
          A message hierarchy built for scanners: promise, proof, plan, ask.
        </text>
        <rect x="24" y="206" width="132" height="34" rx="17" fill="#1B2B26" />
        <text x="52" y="228" fill={CREAM} fontFamily="var(--font-body), sans-serif" fontSize="11">
          Start today
        </text>
        <rect x="166" y="206" width="112" height="34" rx="17" fill="none" stroke="#B4A893" />
        <text x="188" y="228" fill="#5A6560" fontFamily="var(--font-body), sans-serif" fontSize="11">
          See details
        </text>

        {/* benefits */}
        <g transform="translate(392,96)">
          {[0, 1, 2].map((i) => (
            <g key={i} transform={`translate(0,${i * 62})`}>
              <rect width="224" height="50" rx="10" fill="#F1EADC" />
              <circle cx="26" cy="25" r="10" fill="#12665F" opacity="0.16" />
              <rect x="46" y="16" width="120" height="7" rx="3.5" fill="#B9AC98" />
              <rect x="46" y="30" width="86" height="6" rx="3" fill="#D0C6B5" />
            </g>
          ))}
        </g>

        {/* FAQ */}
        <g transform="translate(24,262)">
          <text x="0" y="0" fill="#1B2B26" fontFamily="var(--font-display), sans-serif" fontSize="14">
            Frequently asked
          </text>
          {[0, 1, 2].map((i) => (
            <g key={i} transform={`translate(0,${16 + i * 34})`}>
              <rect width="592" height="28" rx="6" fill="#F3ECE1" />
              <text x="14" y="19" fill="#414B46" fontFamily="var(--font-body), sans-serif" fontSize="10">
                {[
                  "How long does implementation take?",
                  "What do you need from our team?",
                  "How is performance measured?",
                ][i]}
              </text>
              <text x="566" y="19" fill="#12665F" fontFamily="var(--font-body), sans-serif" fontSize="12">
                +
              </text>
            </g>
          ))}
        </g>
      </Frame>
    </div>
  );
}

export function PortfolioWorld({ className = "" }: ArtworkProps) {
  return (
    <div className={className}>
      <Frame title="Concept project: immersive personal portfolio with layered bioluminescent scene">
        <rect x="0" y="0" width="640" height="400" fill="#060F0C" />
        <path
          d="M0 260 L90 214 L170 250 L260 196 L350 246 L440 202 L530 250 L640 210 L640 400 L0 400 Z"
          fill="#0A211B"
        />
        <path
          d="M0 314 L110 282 L210 312 L320 276 L430 314 L540 284 L640 316 L640 400 L0 400 Z"
          fill="#061712"
        />
        <ellipse cx="320" cy="120" rx="180" ry="90" fill={TURQ} opacity="0.16" />

        {/* floating island */}
        <path
          d="M400 132 C 428 112, 500 110, 534 128 C 562 144, 566 168, 546 182 C 528 194, 502 190, 494 204 C 486 218, 498 230, 486 242 C 472 256, 446 252, 440 236 C 434 220, 446 208, 438 196 C 424 176, 396 170, 392 154 C 388 140, 390 144, 400 132 Z"
          fill="#10312A"
        />
        <path d="M400 132 C 430 114, 500 112, 532 128" stroke={CYAN} strokeOpacity="0.7" strokeWidth="2" fill="none" />

        {/* flora */}
        <g stroke="#1E4E43" strokeWidth="3" fill="none" strokeLinecap="round">
          <path d="M60 400 C 54 348, 84 330, 68 288" />
          <path d="M120 400 C 128 358, 102 336, 126 306" />
          <path d="M566 400 C 560 352, 588 332, 574 292" />
        </g>
        <g fill={CYAN}>
          <circle cx="68" cy="286" r="16" opacity="0.55" />
          <circle cx="126" cy="304" r="12" opacity="0.45" />
          <circle cx="574" cy="290" r="15" opacity="0.5" />
        </g>

        {/* floating type */}
        <text x="40" y="96" fill="#F4F8F5" fontFamily="var(--font-display), sans-serif" fontSize="30">
          Beyond the
        </text>
        <text x="40" y="132" fill="#8FF2EC" fontFamily="var(--font-editorial), serif" fontSize="30" fontStyle="italic">
          ordinary.
        </text>
        <rect x="40" y="156" width="104" height="26" rx="13" fill={CYAN} />
        <text x="58" y="173" fill="#062019" fontFamily="var(--font-body), sans-serif" fontSize="10">
          Explore work
        </text>

        <g fill="#65E8E0" opacity="0.8">
          <circle cx="240" cy="70" r="2" />
          <circle cx="300" cy="150" r="1.6" />
          <circle cx="180" cy="200" r="1.8" />
          <circle cx="470" cy="270" r="2.2" />
          <circle cx="540" cy="90" r="1.7" />
        </g>
      </Frame>
    </div>
  );
}

const ARTWORK: Record<string, (props: ArtworkProps) => React.ReactElement> = {
  "skincare-storefront": SkincareStorefront,
  "shopify-store": ShopifyStore,
  "tracking-system": TrackingSystem,
  "business-dashboard": BusinessDashboard,
  "landing-page": LandingPageArt,
  "portfolio-world": PortfolioWorld,
};

export function ProjectArtwork({
  name,
  className = "",
}: {
  name: string;
  className?: string;
}) {
  const Artwork = ARTWORK[name] ?? PortfolioWorld;
  return <Artwork className={className} />;
}
