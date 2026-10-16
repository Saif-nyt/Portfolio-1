import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { ProjectArtwork } from "@/components/artwork/ProjectArtwork";
import type { Project } from "@/types/project";

interface CaseStudyLayoutProps {
  project: Project;
  nextProject: Project | undefined;
}

export function CaseStudyLayout({ project, nextProject }: CaseStudyLayoutProps) {
  return (
    <article>
      {/* Hero artwork */}
      <section className="relative isolate overflow-hidden bg-[#060F0C]">
        <div className="container-page relative z-10 max-w-[80rem] py-14 sm:py-20">
          <Reveal>
            <div className="overflow-hidden rounded-[1.5rem] border border-white/10 shadow-[0_40px_90px_-50px_rgba(0,0,0,0.9)]">
              <ProjectArtwork
                name={project.artwork}
                className="[&>svg]:block [&>svg]:h-auto [&>svg]:w-full"
              />
            </div>
          </Reveal>
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent to-surface"
        />
      </section>

      <Container className="py-16 sm:py-24">
        {/* Overview grid */}
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <Reveal>
              <span className="eyebrow">Project Overview</span>
              <h2 className="mt-5 text-[clamp(1.8rem,3.6vw,2.8rem)] leading-tight tracking-[-0.02em] text-ink">
                {project.title}
              </h2>
              <p className="mt-5 text-base leading-relaxed text-ink-soft sm:text-lg">
                {project.summary}
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-8 flex flex-wrap gap-3">
                {project.links.live ? (
                  <Button
                    href={project.links.live.href}
                    variant="outline"
                    size="sm"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {project.links.live.label}
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </Button>
                ) : null}
                {project.links.source ? (
                  <Button
                    href={project.links.source.href}
                    variant="ghost"
                    size="sm"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {project.links.source.label}
                  </Button>
                ) : null}
                <Button href="/contact" size="sm">
                  Discuss a Similar Project
                </Button>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={0.12}>
              <dl className="surface-panel divide-y divide-line p-0">
                {[
                  { term: "Category", value: project.secondaryCategory },
                  { term: "Year", value: project.year },
                  { term: "Role", value: project.role },
                  { term: "Status", value: project.kicker },
                ].map((row) => (
                  <div
                    key={row.term}
                    className="flex flex-col gap-1 px-6 py-4 sm:flex-row sm:gap-6"
                  >
                    <dt className="text-[0.7rem] uppercase tracking-[0.18em] text-muted sm:w-32 sm:shrink-0">
                      {row.term}
                    </dt>
                    <dd className="text-[0.9rem] leading-relaxed text-ink-soft">
                      {row.value}
                    </dd>
                  </div>
                ))}
                <div className="flex flex-col gap-2 px-6 py-4 sm:flex-row sm:gap-6">
                  <dt className="text-[0.7rem] uppercase tracking-[0.18em] text-muted sm:w-32 sm:shrink-0">
                    Stack
                  </dt>
                  <dd className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-line bg-surface-2 px-3 py-1 text-[0.74rem] text-muted"
                      >
                        {tech}
                      </span>
                    ))}
                  </dd>
                </div>
              </dl>
            </Reveal>
          </div>
        </div>

        {/* Demonstration notice */}
        {project.isDemo ? (
          <Reveal delay={0.05}>
            <p
              role="note"
              className="mt-12 rounded-2xl border border-glow/35 bg-glow/[0.07] p-5 text-[0.9rem] leading-relaxed text-ink-soft"
            >
              <strong className="font-medium text-ink">
                {project.kicker}.
              </strong>{" "}
              This is a design and technical demonstration. It was not
              commissioned or deployed for a real client, and no client results,
              revenue, or performance outcomes are claimed.
            </p>
          </Reveal>
        ) : null}

        {/* Problem / audience */}
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-[1.25rem] border border-line bg-surface-2 p-6 sm:p-7">
              <h3 className="font-display text-lg font-medium text-ink">
                The problem or business objective
              </h3>
              <p className="mt-3 text-[0.92rem] leading-relaxed text-ink-soft">
                {project.problem}
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="h-full rounded-[1.25rem] border border-line bg-surface-2 p-6 sm:p-7">
              <h3 className="font-display text-lg font-medium text-ink">
                Target audience
              </h3>
              <p className="mt-3 text-[0.92rem] leading-relaxed text-ink-soft">
                {project.audience}
              </p>
            </div>
          </Reveal>
        </div>

        {/* Showcase */}
        <section aria-labelledby="showcase-heading" className="mt-16">
          <Reveal>
            <span className="eyebrow">Screens & Responsive Previews</span>
            <h2
              id="showcase-heading"
              className="mt-5 text-[clamp(1.6rem,3vw,2.3rem)] tracking-[-0.02em] text-ink"
            >
              What the build covers
            </h2>
          </Reveal>
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {project.showcase.map((item, index) => (
              <Reveal key={item.title} delay={Math.min(index * 0.06, 0.3)}>
                <li className="group h-full rounded-[1.15rem] border border-line bg-surface-2 p-5 transition-all duration-500 hover:-translate-y-1 hover:border-glow/40">
                  <span className="font-mono text-[0.68rem] tracking-[0.2em] text-accent dark:text-bio">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 font-display text-base font-medium text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[0.86rem] leading-relaxed text-muted">
                    {item.description}
                  </p>
                </li>
              </Reveal>
            ))}
          </ul>
        </section>

        {/* Long-form sections */}
        <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-8">
            <div className="space-y-12">
              {project.sections.map((section) => (
                <Reveal key={section.heading}>
                  <section aria-labelledby={`cs-${slugify(section.heading)}`}>
                    <h2
                      id={`cs-${slugify(section.heading)}`}
                      className="text-[clamp(1.35rem,2.4vw,1.85rem)] tracking-[-0.02em] text-ink"
                    >
                      {section.heading}
                    </h2>
                    <div className="mt-4 space-y-4">
                      {section.body.map((paragraph) => (
                        <p
                          key={paragraph.slice(0, 32)}
                          className="text-[0.95rem] leading-relaxed text-ink-soft"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </section>
                </Reveal>
              ))}

              <Reveal>
                <section aria-labelledby="cs-results">
                  <h2
                    id="cs-results"
                    className="text-[clamp(1.35rem,2.4vw,1.85rem)] tracking-[-0.02em] text-ink"
                  >
                    Verified results
                  </h2>
                  <p className="mt-4 text-[0.95rem] leading-relaxed text-ink-soft">
                    {project.results ??
                      "None claimed. There is no verified outcome to publish for this project, so none is shown."}
                  </p>
                </section>
              </Reveal>
            </div>
          </div>

          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <div className="surface-panel p-6">
                <p className="eyebrow">Final deliverable</p>
                <p className="mt-4 text-[0.92rem] leading-relaxed text-ink-soft">
                  {project.deliverable}
                </p>
              </div>

              <div className="mt-6 rounded-[1.25rem] border border-line bg-surface-2 p-6">
                <p className="eyebrow">Lessons learned</p>
                <ul className="mt-4 space-y-3">
                  {project.lessons.map((lesson) => (
                    <li
                      key={lesson.slice(0, 32)}
                      className="flex gap-3 text-[0.88rem] leading-relaxed text-ink-soft"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-glow shadow-[0_0_0_4px_var(--glow-soft)]"
                      />
                      {lesson}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 rounded-[1.25rem] border border-line bg-surface-2 p-6">
                <p className="eyebrow">Tools & technologies</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-full border border-line bg-surface px-3 py-1 text-[0.75rem] text-muted"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </div>

        {/* Next project */}
        <nav
          aria-label="Project navigation"
          className="mt-20 border-t border-line pt-8"
        >
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <Link
              href="/work"
              className="group inline-flex items-center gap-2 text-[0.9rem] font-medium text-muted transition-colors hover:text-ink"
            >
              <ArrowLeft
                className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1"
                aria-hidden="true"
              />
              All projects
            </Link>

            {nextProject ? (
              <Link
                href={`/work/${nextProject.slug}`}
                className="group flex flex-col items-start gap-1 sm:items-end"
              >
                <span className="text-[0.72rem] uppercase tracking-[0.18em] text-muted">
                  Next project
                </span>
                <span className="inline-flex items-center gap-2 font-display text-lg font-medium tracking-tight text-ink transition-colors group-hover:text-accent dark:group-hover:text-bio">
                  {nextProject.title}
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            ) : null}
          </div>
        </nav>
      </Container>
    </article>
  );
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
