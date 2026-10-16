import Link from "next/link";
import type { CSSProperties } from "react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { FloraBackdrop } from "@/components/hero/FloraBackdrop";

interface Breadcrumb {
  label: string;
  href?: string;
}

interface PageHeroProps {
  eyebrow: string;
  title: React.ReactNode;
  intro?: string;
  breadcrumbs?: Breadcrumb[];
  meta?: React.ReactNode;
}

export function PageHero({
  eyebrow,
  title,
  intro,
  breadcrumbs,
  meta,
}: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden border-b border-line bg-surface-2 pb-16 pt-36 sm:pb-20 sm:pt-44">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.3] [background-image:radial-gradient(var(--line-strong)_1px,transparent_1px)] [background-size:34px_34px] mask-fade-b"
      />
      <div className="pointer-events-none absolute -right-24 top-0 h-80 w-80 rounded-full bg-glow/12 blur-3xl" />
      <FloraBackdrop className="absolute inset-x-0 bottom-0 h-32 opacity-40" />

      {/* Drifting bioluminescent spores — the game world continues on every page */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <span
          className="bob pulse-bio absolute right-[16%] top-[28%] h-3 w-3 rounded-full bg-[radial-gradient(circle,#D8FFFB_0%,#8FF2EC_40%,transparent_75%)]"
          style={{ "--bob-delay": "0.3s", "--bob-duration": "6.2s" } as CSSProperties}
        />
        <span
          className="bob pulse-bio absolute right-[8%] top-[52%] h-5 w-5 rounded-full bg-[radial-gradient(circle,#D8FFFB_0%,#65E8E0_35%,transparent_72%)] opacity-70"
          style={{ "--bob-delay": "1.6s", "--bob-duration": "7.4s" } as CSSProperties}
        />
        <span
          className="bob pulse-bio absolute right-[26%] top-[68%] h-2 w-2 rounded-full bg-[radial-gradient(circle,#D8FFFB_0%,#8FF2EC_45%,transparent_78%)]"
          style={{ "--bob-delay": "2.5s", "--bob-duration": "5.6s" } as CSSProperties}
        />
      </div>

      <Container className="relative z-10">
        {breadcrumbs && breadcrumbs.length > 0 ? (
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-2 text-[0.75rem] text-muted">
              {breadcrumbs.map((crumb, index) => (
                <li key={crumb.label} className="flex items-center gap-2">
                  {index > 0 ? (
                    <span aria-hidden="true" className="text-line-strong">
                      /
                    </span>
                  ) : null}
                  {crumb.href ? (
                    <Link
                      href={crumb.href}
                      className="transition-colors hover:text-ink"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="text-ink-soft">
                      {crumb.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        ) : null}

        <Reveal>
          <span className="eyebrow">{eyebrow}</span>
        </Reveal>

        <Reveal delay={0.08}>
          <h1 className="mt-6 max-w-4xl text-[clamp(2.3rem,6vw,4.5rem)] leading-[1.03] tracking-[-0.03em] text-ink">
            {title}
          </h1>
        </Reveal>

        {intro ? (
          <Reveal delay={0.14}>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-soft sm:text-lg">
              {intro}
            </p>
          </Reveal>
        ) : null}

        {meta ? <Reveal delay={0.2}>{meta}</Reveal> : null}
      </Container>
    </section>
  );
}
