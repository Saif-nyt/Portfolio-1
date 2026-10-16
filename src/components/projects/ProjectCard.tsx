"use client";

import Link from "next/link";
import { useRef, type PointerEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { ProjectArtwork } from "@/components/artwork/ProjectArtwork";
import type { Project } from "@/types/project";

interface ProjectCardProps {
  project: Project;
  wide?: boolean;
  index: number;
}

export function ProjectCard({ project, wide = false, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLElement>(null);

  const onPointerMove = (event: PointerEvent<HTMLElement>) => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const node = cardRef.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 14;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 10;
    node.style.setProperty("--mx", `${x}px`);
    node.style.setProperty("--my", `${y}px`);
  };

  const onPointerLeave = () => {
    const node = cardRef.current;
    if (!node) return;
    node.style.setProperty("--mx", "0px");
    node.style.setProperty("--my", "0px");
  };

  return (
    <article
      ref={cardRef}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      style={{ ["--mx" as string]: "0px", ["--my" as string]: "0px" }}
      className={`group relative flex h-full flex-col overflow-hidden rounded-[1.375rem] border border-line bg-surface-2 transition-all duration-500 hover:-translate-y-1 hover:border-glow/40 hover:shadow-[0_30px_60px_-40px_rgba(0,0,0,0.7)] ${
        wide ? "md:col-span-2" : ""
      }`}
    >
      <div
        className={`relative z-[1] overflow-hidden bg-[#08130F] ${
          wide ? "aspect-[16/9]" : "aspect-[16/10]"
        }`}
      >
        <div
          className="absolute inset-0 transition-transform duration-700 ease-out will-change-transform group-hover:scale-[1.06]"
          style={{
            transform: "translate(var(--mx), var(--my))",
          }}
        >
          <ProjectArtwork name={project.artwork} className="h-full w-full [&>svg]:h-full [&>svg]:w-full" />
        </div>

        <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/45 px-3 py-1 text-[0.66rem] font-medium uppercase tracking-[0.18em] text-[#DCE9E4] backdrop-blur-sm">
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 rounded-full bg-[#65E8E0]"
          />
          {project.kicker}
        </span>

        <span
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-surface-2 to-transparent opacity-80"
        />
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.7rem] uppercase tracking-[0.16em] text-muted">
          <span>{project.category}</span>
          <span aria-hidden="true" className="h-px w-4 bg-line-strong" />
          <span className="normal-case tracking-normal text-muted">
            {project.secondaryCategory}
          </span>
        </div>

        <h3
          className={`mt-3 font-display font-medium tracking-tight text-ink ${
            wide ? "text-2xl sm:text-3xl" : "text-xl sm:text-[1.4rem]"
          }`}
        >
          <Link
            href={`/work/${project.slug}`}
            className="transition-colors duration-300 after:absolute after:inset-0 after:content-[''] hover:text-accent dark:hover:text-bio"
          >
            {project.title}
          </Link>
        </h3>

        <p className="mt-3 text-[0.9rem] leading-relaxed text-ink-soft">
          {project.summary}
        </p>

        <ul className="mt-5 flex flex-wrap gap-2">
          {project.technologies.slice(0, wide ? 5 : 4).map((tech) => (
            <li
              key={tech}
              className="rounded-full border border-line bg-surface px-3 py-1 text-[0.72rem] text-muted"
            >
              {tech}
            </li>
          ))}
        </ul>

        <div className="relative z-10 mt-auto flex items-center justify-between gap-4 pt-6">
          <Link
            href={`/work/${project.slug}`}
            className="inline-flex items-center gap-1.5 text-[0.84rem] font-medium text-ink transition-colors duration-300 hover:text-accent dark:hover:text-bio"
          >
            View case study
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              strokeWidth={1.7}
              aria-hidden="true"
            />
          </Link>
          <span className="font-mono text-[0.68rem] tracking-[0.2em] text-muted">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
      </div>
    </article>
  );
}
