import { OG_IMAGE } from "@/lib/metadata";
import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppWidget } from "@/components/contact/WhatsAppWidget";
import { GameFX } from "@/components/fx/GameFX";
import { SITE, SITE_URL } from "@/config/site";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-dm-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE.name} — Full-Stack Web Developer & Digital Growth Specialist`,
    template: `%s — ${SITE.name}`,
  },
  description:
    "Web development, WordPress and Shopify builds, Meta Ads and conversion tracking. 100+ WordPress websites completed, 1.5 years of professional experience.",
  keywords: [
    "web developer",
    "WordPress developer",
    "Shopify development",
    "Meta Ads",
    "Facebook Conversion API",
    "server-side tracking",
    "GA4",
    "Next.js developer",
    "e-commerce development",
  ],
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: SITE.name,
    title: `${SITE.name} — Full-Stack Web Developer & Digital Growth Specialist`,
    description:
      "Building digital experiences beyond the ordinary: websites, storefronts, campaigns and measurement systems.",
    url: "/",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — Full-Stack Web Developer & Digital Growth Specialist`,
    description:
      "Building digital experiences beyond the ordinary: websites, storefronts, campaigns and measurement systems.",
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FBF8F2" },
    { media: "(prefers-color-scheme: dark)", color: "#0B1714" },
  ],
  width: "device-width",
  initialScale: 1,
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE.name,
  jobTitle: SITE.role,
  email: `mailto:${SITE.email}`,
  telephone: SITE.phone,
  url: SITE_URL,
  description: SITE.positioning,
  knowsAbout: [
    "Web development",
    "Next.js",
    "React",
    "WordPress",
    "Shopify",
    "E-commerce development",
    "Meta Ads",
    "Facebook Conversion API",
    "Server-side tracking",
    "Google Analytics 4",
    "Conversion tracking",
  ],
};

const themeScript = `(function(){try{var s=localStorage.getItem('theme');var d=s?s==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.classList.toggle('dark',d);document.documentElement.style.colorScheme=d?'dark':'light';}catch(e){}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${inter.variable} ${dmSerif.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-screen flex-col bg-surface font-body text-ink antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:border focus:border-line focus:bg-surface-raised focus:px-5 focus:py-3 focus:text-sm focus:font-medium focus:text-ink"
        >
          Skip to content
        </a>
        <span
          data-nav-sentinel
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 h-[25px] w-px"
        />
        <Navbar />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        <WhatsAppWidget />
        <GameFX />
      </body>
    </html>
  );
}
