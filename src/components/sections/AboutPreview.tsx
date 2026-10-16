import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ProfileArt } from "@/components/sections/ProfileArt";
import { FloraBackdrop } from "@/components/hero/FloraBackdrop";
import { SKILL_GROUPS } from "@/data/skills";
import { SITE } from "@/config/site";

const STATS = [
  { value: SITE.experience, label: "Professional experience" },
  { value: "100+", label: "WordPress websites completed" },
  { value: "5", label: "Core disciplines" },
];

export function AboutPreview() {
  return (
    <section
      aria-labelledby="about-preview-heading"
      className="relative isolate overflow-hidden bg-surface py-24 sm:py-32"
    >
      <FloraBackdrop className="absolute inset-x-0 top-10 h-56 opacity-30 [transform:scaleX(-1)]" />
      <div className="pointer-events-none absolute -left-32 top-1/3 h-96 w-96 rounded-full bg-glow/10 blur-3xl" />

      <Container className="relative z-10">
        <div className="grid items-start gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal>
              <span className="eyebrow">Scene 02 — The Journey Begins</span>
            </Reveal>

            <Reveal delay={0.08}>
              <h2
                id="about-preview-heading"
                className="mt-6 text-[clamp(2.2rem,5.2vw,4rem)] leading-[1.03] tracking-[-0.03em] text-ink"
              >
                Technology Meets{" "}
                <span className="font-editorial italic text-accent dark:text-bio">
                  Creative Thinking.
                </span>
              </h2>
            </Reveal>

            <Reveal delay={0.14}>
              <p className="mt-7 max-w-2xl text-base leading-relaxed text-ink-soft sm:text-lg">
                I work across web development, e-commerce, performance
                marketing, and conversion tracking. My goal is to help
                businesses build digital experiences that look exceptional,
                work reliably, and support measurable growth.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <dl className="mt-10 grid gap-6 sm:grid-cols-3">
                {STATS.map((stat) => (
                  <div
                    key={stat.label}
                    className="border-t border-line-strong pt-4"
                  >
                    <dt className="sr-only">{stat.label}</dt>
                    <dd>
                      <span className="block font-display text-3xl font-medium tracking-tight text-ink sm:text-4xl">
                        {stat.value}
                      </span>
                      <span className="mt-2 block text-[0.78rem] leading-snug text-muted">
                        {stat.label}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={0.26}>
              <ul className="mt-10 flex flex-wrap gap-2.5">
                {SKILL_GROUPS.map((group) => (
                  <li key={group.id}>
                    <Link
                      href="/services"
                      className="inline-flex items-center rounded-full border border-line bg-surface-2 px-4 py-2 text-[0.78rem] font-medium text-ink-soft transition-colors duration-300 hover:border-accent hover:text-accent dark:hover:border-bio dark:hover:text-bio"
                    >
                      {group.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.32}>
              <div className="mt-10 flex flex-wrap gap-3">
                <Button href="/about" variant="outline">
                  More About Me
                </Button>
                <Button href="/contact">Discuss Your Project</Button>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={0.18} className="lg:sticky lg:top-28">
              <ProfileArt />
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
