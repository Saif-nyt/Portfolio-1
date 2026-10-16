import { social } from "@/lib/metadata";
import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { ProfileArt } from "@/components/sections/ProfileArt";
import { SkillsExplorer } from "@/components/sections/SkillsExplorer";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { SITE } from "@/config/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "T. M. Saiful Islam — full-stack web developer and digital growth specialist working across web development, e-commerce, advertising and conversion tracking.",
  alternates: { canonical: "/about" },
  ...social({
    title: "About T. M. Saiful Islam",
    description:
      "Web developer and digital growth specialist working across web development, e-commerce, advertising and conversion tracking.",
    url: "/about",
  }),
};

const PRINCIPLES = [
  {
    title: "Clarity first",
    body: "Structure, copy and interface should each answer a question the visitor already has. If a section does not, it does not belong.",
  },
  {
    title: "Practical execution",
    body: "Build what the business needs now, in a shape that can be extended later — no speculative architecture, no unused abstractions.",
  },
  {
    title: "Measurement in the plan",
    body: "Tracking requirements are decided before launch, not retrofitted afterwards when the data is already missing.",
  },
  {
    title: "Continuous improvement",
    body: "Launch is a checkpoint. What happens after — monitoring, fixes, iterations — is where the compounding work happens.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title={
          <>
            Curious by Nature.{" "}
            <span className="font-editorial italic text-accent dark:text-bio">
              Focused on Building.
            </span>
          </>
        }
        intro="I'm T. M. Saiful Islam, a web developer and digital growth specialist interested in the intersection of technology, design, marketing, and business."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
        meta={
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={SITE.cvPath} download>
              Download CV
            </Button>
            <Button href="/contact" variant="outline">
              Discuss Your Project
            </Button>
          </div>
        }
      />

      {/* Editorial introduction */}
      <section className="relative isolate overflow-hidden bg-surface py-20 sm:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <Reveal>
                <p className="font-editorial text-[clamp(1.35rem,2.6vw,1.9rem)] italic leading-snug text-ink">
                  My work spans website development, e-commerce, advertising,
                  and conversion tracking. I enjoy understanding how the pieces
                  connect — from the first customer interaction to the systems
                  that help a business measure and improve its performance.
                </p>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="mt-8 space-y-5 text-[0.98rem] leading-relaxed text-ink-soft">
                  <p>
                    I approach each project with a focus on clarity, practical
                    execution, and continuous improvement. Most businesses do not
                    need every possible feature — they need the right structure,
                    a reliable build, and a way to tell whether it is working.
                  </p>
                  <p>
                    Day to day that means building storefronts and websites,
                    wiring up advertising and landing experiences, and configuring
                    the measurement layer underneath: pixels, server-side events,
                    GA4, and the debugging work that keeps the numbers honest.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.16}>
                <dl className="mt-10 grid gap-6 sm:grid-cols-3">
                  <div className="border-t border-line-strong pt-4">
                    <dt className="sr-only">Experience</dt>
                    <dd>
                      <span className="block font-display text-3xl font-medium text-ink">
                        {SITE.experience}
                      </span>
                      <span className="mt-2 block text-[0.78rem] text-muted">
                        Professional & freelance experience
                      </span>
                    </dd>
                  </div>
                  <div className="border-t border-line-strong pt-4">
                    <dt className="sr-only">WordPress websites</dt>
                    <dd>
                      <span className="block font-display text-3xl font-medium text-ink">
                        100+
                      </span>
                      <span className="mt-2 block text-[0.78rem] text-muted">
                        WordPress websites completed
                      </span>
                    </dd>
                  </div>
                  <div className="border-t border-line-strong pt-4">
                    <dt className="sr-only">Core disciplines</dt>
                    <dd>
                      <span className="block font-display text-3xl font-medium text-ink">
                        5
                      </span>
                      <span className="mt-2 block text-[0.78rem] text-muted">
                        Core disciplines covered
                      </span>
                    </dd>
                  </div>
                </dl>
              </Reveal>
            </div>

            <div className="lg:col-span-5">
              <Reveal delay={0.12} className="lg:sticky lg:top-28">
                <ProfileArt />
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* Working principles */}
      <section
        aria-labelledby="principles-heading"
        className="relative isolate overflow-hidden bg-surface-2 py-20 sm:py-28"
      >
        <Container>
          <Reveal className="max-w-3xl">
            <span className="eyebrow">Working Principles</span>
            <h2
              id="principles-heading"
              className="mt-6 text-[clamp(1.9rem,4vw,3rem)] leading-tight tracking-[-0.02em] text-ink"
            >
              How I approach the work.
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {PRINCIPLES.map((principle, index) => (
              <Reveal key={principle.title} delay={index * 0.07}>
                <article className="group h-full rounded-[1.25rem] border border-line bg-surface-raised/70 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-glow/45">
                  <span className="font-mono text-[0.68rem] tracking-[0.2em] text-accent dark:text-bio">
                    0{index + 1}
                  </span>
                  <h3 className="mt-3 font-display text-xl font-medium tracking-tight text-ink">
                    {principle.title}
                  </h3>
                  <p className="mt-3 text-[0.9rem] leading-relaxed text-ink-soft">
                    {principle.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1} className="mt-10">
            <div className="flex flex-col gap-4 rounded-[1.25rem] border border-line bg-surface p-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-xl text-[0.92rem] leading-relaxed text-ink-soft">
                Want the short version? The CV covers experience, services and
                contact details on a single page.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button href={SITE.cvPath} download>
                  Download CV
                </Button>
                <Button href="/contact" variant="outline">
                  Contact Me
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <SkillsExplorer />

      <ProcessTimeline />

      <section className="bg-surface py-16">
        <Container>
          <Reveal className="flex flex-col items-start justify-between gap-6 border-t border-line pt-10 md:flex-row md:items-center">
            <p className="max-w-xl text-[0.95rem] leading-relaxed text-ink-soft">
              Areas of expertise are documented in full on the services page —
              including what each service does{" "}
              <span className="text-ink">not</span> promise.
            </p>
            <Link
              href="/services"
              className="inline-flex h-12 items-center rounded-full border border-line-strong px-6 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent"
            >
              View all services →
            </Link>
          </Reveal>
        </Container>
      </section>

      <ContactCTA />
    </>
  );
}
