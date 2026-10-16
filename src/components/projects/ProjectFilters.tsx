"use client";

import { motion } from "motion/react";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

export interface ProjectFiltersProps {
  filters: string[];
  active: string;
  onChange: (filter: string) => void;
  counts?: Record<string, number>;
}

export function ProjectFilters({
  filters,
  active,
  onChange,
  counts,
}: ProjectFiltersProps) {
  const reduced = usePrefersReducedMotion();

  return (
    <div
      role="group"
      aria-label="Filter projects by category"
      className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-2 sm:flex-wrap sm:overflow-visible sm:pb-0"
    >
      {filters.map((filter) => {
        const isActive = filter === active;
        const count = counts?.[filter];
        return (
          <button
            key={filter}
            type="button"
            onClick={() => onChange(filter)}
            aria-pressed={isActive}
            className={`relative shrink-0 rounded-full border px-4 py-2.5 text-[0.82rem] font-medium transition-colors duration-300 ${
              isActive
                ? "border-transparent text-surface"
                : "border-line text-muted hover:border-line-strong hover:text-ink dark:hover:text-ink"
            }`}
          >
            {isActive && !reduced ? (
              <motion.span
                layoutId="project-filter-active"
                className="absolute inset-0 rounded-full bg-ink dark:bg-bio"
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
              />
            ) : isActive ? (
              <span className="absolute inset-0 rounded-full bg-ink dark:bg-bio" />
            ) : null}
            <span className="relative inline-flex items-center gap-2">
              {filter}
              {typeof count === "number" ? (
                <span
                  className={`text-[0.7rem] tabular-nums ${
                    isActive ? "opacity-70" : "opacity-60"
                  }`}
                >
                  {count}
                </span>
              ) : null}
            </span>
          </button>
        );
      })}
    </div>
  );
}
