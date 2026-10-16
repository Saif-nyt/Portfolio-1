"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ProjectFilters } from "@/components/projects/ProjectFilters";
import { PROJECT_FILTERS } from "@/data/projects";
import type { Project } from "@/types/project";

interface ProjectExplorerProps {
  projects: Project[];
  eyebrow?: string;
  title: React.ReactNode;
  intro?: string;
  id?: string;
  showFilters?: boolean;
}

export function ProjectExplorer({
  projects,
  eyebrow = "Interactive Projects Explorer",
  title,
  intro,
  id = "work",
  showFilters = true,
}: ProjectExplorerProps) {
  const [filter, setFilter] = useState<string>("All Projects");
  const reduced = usePrefersReducedMotion();

  const counts = useMemo(() => {
    const map: Record<string, number> = { "All Projects": projects.length };
    for (const project of projects) {
      map[project.category] = (map[project.category] ?? 0) + 1;
    }
    return map;
  }, [projects]);

  const visible = useMemo(() => {
    if (filter === "All Projects") return projects;
    return projects.filter((project) => project.category === filter);
  }, [filter, projects]);

  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="relative isolate overflow-hidden bg-surface py-24 sm:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-8%] top-10 h-80 w-80 rounded-full bg-glow/10 blur-3xl"
      />

      <Container className="relative z-10">
        <Reveal className="max-w-3xl">
          <span className="eyebrow">{eyebrow}</span>
          <h2
            id={`${id}-heading`}
            className="mt-6 text-[clamp(2.1rem,4.8vw,3.6rem)] leading-[1.05] tracking-[-0.03em] text-ink"
          >
            {title}
          </h2>
          {intro ? (
            <p className="mt-6 text-base leading-relaxed text-muted sm:text-lg">
              {intro}
            </p>
          ) : null}
        </Reveal>

        {showFilters ? (
          <Reveal delay={0.1} className="mt-10">
            <ProjectFilters
              filters={[...PROJECT_FILTERS]}
              active={filter}
              onChange={setFilter}
              counts={counts}
            />
          </Reveal>
        ) : null}

        <p aria-live="polite" className="sr-only">
          {visible.length} project{visible.length === 1 ? "" : "s"} shown for{" "}
          {filter}.
        </p>

        {visible.length === 0 ? (
          <div className="mt-12 rounded-[1.375rem] border border-dashed border-line-strong p-10 text-center">
            <p className="font-display text-xl text-ink">
              No projects in this region yet.
            </p>
            <p className="mt-2 text-sm text-muted">
              Try another category — or clear the filter to see everything.
            </p>
            <button
              type="button"
              onClick={() => setFilter("All Projects")}
              className="mt-5 inline-flex h-11 items-center rounded-full border border-line-strong px-5 text-[0.84rem] font-medium text-ink transition-colors hover:border-accent hover:text-accent"
            >
              Show all projects
            </button>
          </div>
        ) : (
          <motion.ul
            className="mt-12 grid gap-6 md:grid-cols-2 lg:gap-7"
            layout={!reduced}
          >
            <AnimatePresence mode="popLayout" initial={false}>
              {visible.map((project, index) => (
                <motion.li
                  key={project.slug}
                  layout={!reduced}
                  initial={reduced ? false : { opacity: 0, y: 24, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={reduced ? undefined : { opacity: 0, y: -12, scale: 0.98 }}
                  transition={{
                    duration: 0.5,
                    delay: reduced ? 0 : Math.min(index * 0.05, 0.2),
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={project.featured && index === 0 ? "md:col-span-2" : ""}
                >
                  <ProjectCard
                    project={project}
                    index={index}
                    wide={project.featured && index === 0}
                  />
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        )}
      </Container>
    </section>
  );
}
