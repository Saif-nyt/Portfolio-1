import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { social } from "@/lib/metadata";
import { FloraBackdrop } from "@/components/hero/FloraBackdrop";
import { PRIMARY_NAV } from "@/data/navigation";

export const metadata: Metadata = {
  title: "Page not found",
  description:
    "This page does not exist. Return to the portfolio home page or browse the case studies.",
  alternates: { canonical: null },
  // Overrides the root layout's `index, follow`; Next also injects its own
  // `noindex`, so the tags on this page at least agree instead of conflicting.
  robots: { index: false, follow: true },
  ...social({
    title: "Page not found",
    description:
      "This page does not exist. Return to the portfolio home page or browse the case studies.",
  }),
};

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[70svh] items-center overflow-hidden bg-surface-2 pt-36 pb-24">
      <FloraBackdrop className="absolute inset-x-0 bottom-0 h-56 opacity-50" />
      <div className="pointer-events-none absolute -right-20 top-20 h-72 w-72 rounded-full bg-glow/12 blur-3xl" />

      <Container className="relative z-10">
        <span className="eyebrow">Signal lost</span>
        <h1 className="mt-6 max-w-3xl text-[clamp(2.4rem,6vw,4.5rem)] leading-[1.03] tracking-[-0.03em] text-ink">
          This path does not exist on{" "}
          <span className="font-editorial italic text-accent dark:text-bio">
            the map.
          </span>
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg">
          The page you were looking for moved or was never here. The routes
          below will get you back to solid ground.
        </p>

        <ul className="mt-10 flex flex-wrap gap-3">
          {PRIMARY_NAV.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="inline-flex min-h-[2.75rem] items-center rounded-full border border-line-strong px-5 text-[0.86rem] font-medium text-ink transition-colors duration-300 hover:border-accent hover:text-accent dark:hover:border-bio dark:hover:text-bio"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
