import {
  Activity,
  Code2,
  LayoutTemplate,
  Layers3,
  ShoppingBag,
  Target,
  type LucideIcon,
} from "lucide-react";
import { SERVICES } from "@/data/services";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

const ICONS: Record<string, LucideIcon> = {
  code: Code2,
  layout: LayoutTemplate,
  bag: ShoppingBag,
  target: Target,
  activity: Activity,
  layers: Layers3,
};

interface ServicesGridProps {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: string;
  id?: string;
}

export function ServicesGrid({
  eyebrow = "Scene 04 — The Tools of Creation",
  title,
  intro,
  id = "services",
}: ServicesGridProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="relative isolate overflow-hidden bg-surface py-24 sm:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-line-strong to-transparent"
      />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-glow/[0.07] blur-3xl" />

      <Container className="relative z-10">
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          intro={intro}
          id={`${id}-heading`}
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {SERVICES.map((service, index) => {
            const Icon = ICONS[service.icon] ?? Code2;
            return (
              <Reveal
                key={service.slug}
                delay={Math.min(index * 0.07, 0.35)}
                className="h-full"
              >
                <article className="shine card-charge group relative flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-line bg-surface-2/70 p-6 transition-all duration-500 hover:-translate-y-1.5 hover:border-glow/45 hover:bg-surface-raised sm:p-7">
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full bg-glow/0 blur-3xl transition-all duration-700 group-hover:bg-glow/20"
                  />
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-glow via-glow/50 to-transparent transition-transform duration-700 group-hover:scale-x-100"
                  />

                  <div className="relative flex items-start justify-between gap-4">
                    <span className="grid h-11 w-11 place-items-center rounded-xl border border-line bg-surface-raised text-accent transition-colors duration-400 group-hover:border-glow/50 dark:text-bio">
                      <Icon className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
                    </span>
                    <span className="font-mono text-[0.68rem] tracking-[0.2em] text-muted">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="relative mt-5 font-display text-xl font-medium tracking-tight text-ink">
                    {service.title}
                  </h3>
                  <p className="relative mt-3 text-[0.9rem] leading-relaxed text-ink-soft">
                    {service.description}
                  </p>

                  <ul className="relative mt-5 space-y-2 border-t border-line pt-5">
                    {service.deliverables.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-[0.84rem] leading-relaxed text-muted"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-glow"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>

                  {service.notes ? (
                    <p className="relative mt-5 rounded-xl border border-line bg-surface-3/50 p-3.5 text-[0.78rem] leading-relaxed text-muted">
                      {service.notes}
                    </p>
                  ) : null}

                  <div className="relative mt-auto pt-6">
                    <Button
                      href="/contact"
                      variant="ghost"
                      size="sm"
                      className="group/btn -ml-4 px-4 text-ink hover:text-accent dark:hover:text-bio"
                      aria-label={`Discuss your project — ${service.title}`}
                    >
                      Discuss Your Project
                      <span
                        aria-hidden="true"
                        className="transition-transform duration-300 group-hover/btn:translate-x-1"
                      >
                        →
                      </span>
                    </Button>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
