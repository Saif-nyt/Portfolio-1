import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { LuminousTrail } from "@/components/sections/LuminousTrail";

const STEPS = [
  {
    number: "01",
    title: "Discover",
    body: "Understand the business, audience, offer, technical requirements, and success criteria.",
  },
  {
    number: "02",
    title: "Strategize",
    body: "Define the website structure, user journey, tracking requirements, and implementation plan.",
  },
  {
    number: "03",
    title: "Design & Build",
    body: "Create the visual system, implement the website, and integrate the required functionality.",
  },
  {
    number: "04",
    title: "Test & Validate",
    body: "Check responsive layouts, accessibility, performance, forms, integrations, and tracking events.",
  },
  {
    number: "05",
    title: "Launch & Improve",
    body: "Deploy, monitor, resolve issues, and identify opportunities for improvement.",
  },
];

export function ProcessTimeline() {
  return (
    <section
      aria-labelledby="process-heading"
      className="relative isolate overflow-hidden bg-surface-2 py-24 sm:py-32"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_0%,var(--glow-soft),transparent_70%)] opacity-60" />

      <Container className="relative z-10">
        <SectionHeading
          eyebrow="Work Process"
          title={
            <>
              From first conversation to{" "}
              <span className="font-editorial italic text-accent dark:text-bio">
                confident launch.
              </span>
            </>
          }
          intro="A clear route through every project — so you always know what is happening, what comes next, and what I need from you."
          align="center"
          id="process-heading"
        />

        <div className="relative mt-16">
          <LuminousTrail />

          <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
            {STEPS.map((step, index) => (
              <Reveal key={step.number} delay={index * 0.08}>
                <li className="group relative h-full rounded-2xl border border-line bg-surface-raised/70 p-5 transition-all duration-500 hover:-translate-y-1 hover:border-glow/45">
                  <span className="flex items-center gap-3">
                    <span className="font-mono text-[0.7rem] tracking-[0.24em] text-accent dark:text-bio">
                      {step.number}
                    </span>
                    <span
                      aria-hidden="true"
                      className="h-px flex-1 bg-gradient-to-r from-line-strong to-transparent transition-colors duration-500 group-hover:from-glow/70"
                    />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-medium tracking-tight text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-2.5 text-[0.85rem] leading-relaxed text-muted">
                    {step.body}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
