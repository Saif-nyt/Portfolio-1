"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Fireflies } from "@/components/fx/Fireflies";
import { SKILL_GROUPS } from "@/data/skills";

export function SkillsExplorer() {
  const [activeId, setActiveId] = useState(SKILL_GROUPS[0].id);
  const reduced = usePrefersReducedMotion();
  const active = SKILL_GROUPS.find((group) => group.id === activeId) ?? SKILL_GROUPS[0];

  return (
    <section
      aria-labelledby="skills-heading"
      className="relative isolate overflow-hidden bg-surface-2 py-24 sm:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:radial-gradient(var(--line-strong)_1px,transparent_1px)] [background-size:34px_34px] mask-fade-b"
      />
      <div className="pointer-events-none absolute right-[-10%] top-1/4 h-[26rem] w-[26rem] rounded-full bg-glow/10 blur-3xl" />

      <Container className="relative z-10">
        <Reveal className="max-w-3xl">
          <span className="eyebrow">Scene 03 — The Skill Ecosystem</span>
          <h2
            id="skills-heading"
            className="mt-6 text-[clamp(2.1rem,4.8vw,3.6rem)] leading-[1.05] tracking-[-0.03em] text-ink"
          >
            Four disciplines, one connected{" "}
            <span className="font-editorial italic text-accent dark:text-bio">
              system.
            </span>
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted sm:text-lg">
            Select an organism to inspect what it covers. Every capability
            listed here reflects work I actually deliver — no invented skill
            percentages.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Scanner list */}
          <div
            role="group"
            aria-label="Skill areas"
            className="flex gap-3 overflow-x-auto pb-2 lg:col-span-5 lg:flex-col lg:overflow-visible lg:pb-0"
          >
            {SKILL_GROUPS.map((group, index) => {
              const isActive = group.id === active.id;
              return (
                <button
                  key={group.id}
                  type="button"
                  onClick={() => setActiveId(group.id)}
                  aria-pressed={isActive}
                  className={`group relative min-w-[15rem] flex-1 overflow-hidden rounded-2xl border p-5 text-left transition-all duration-400 lg:min-w-0 ${
                    isActive
                      ? "border-glow/55 bg-surface-raised shadow-[0_0_0_1px_var(--glow-soft),0_24px_50px_-34px_rgba(0,0,0,0.6)]"
                      : "border-line bg-surface-raised/60 hover:border-line-strong"
                }`}
              >
                <Fireflies count={isActive ? 3 : 1} />
                <span className="relative flex items-center justify-between">
                  <span className="text-[0.65rem] uppercase tracking-[0.26em] text-muted">
                    {group.label}
                  </span>
                    <span
                      aria-hidden="true"
                      className={`h-2 w-2 rounded-full transition-all duration-400 ${
                        isActive
                          ? "bg-glow shadow-[0_0_0_5px_var(--glow-soft)]"
                          : "bg-line-strong"
                      }`}
                    />
                  </span>
                  <span className="relative mt-3 block font-display text-xl font-medium tracking-tight text-ink">
                    {group.title}
                  </span>
                  <span className="relative mt-2 block text-[0.82rem] leading-relaxed text-muted">
                    {group.summary}
                  </span>
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-0 bottom-0 h-px origin-left bg-gradient-to-r from-glow to-transparent transition-transform duration-500 ${
                      isActive ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                  <span className="sr-only">{`0${index + 1}`}</span>
                </button>
              );
            })}
          </div>

          {/* Detail panel */}
          <div className="lg:col-span-7">
            <div className="surface-panel relative h-full overflow-hidden p-6 sm:p-8">
              <Fireflies count={3} />
              <div
                aria-hidden="true"
                className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-glow/12 blur-3xl"
              />
              <div className="relative">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="eyebrow">{active.title}</p>
                  <span className="rounded-full border border-line px-3 py-1 text-[0.68rem] uppercase tracking-[0.2em] text-muted">
                    Live scan
                  </span>
                </div>

                <AnimatePresence mode="wait">
                  <motion.ul
                    key={active.id}
                    initial={reduced ? false : { opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduced ? undefined : { opacity: 0, y: -8 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="mt-6 grid gap-x-8 gap-y-5 sm:grid-cols-2"
                  >
                    {active.items.map((skill, index) => (
                      <motion.li
                        key={skill.name}
                        initial={reduced ? false : { opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.45,
                          delay: reduced ? 0 : 0.05 + index * 0.05,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        className="group flex gap-3"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-glow shadow-[0_0_0_4px_var(--glow-soft)] transition-transform duration-300 group-hover:scale-125"
                        />
                        <span>
                          <span className="block text-[0.95rem] font-medium text-ink">
                            {skill.name}
                          </span>
                          <span className="mt-1 block text-[0.83rem] leading-relaxed text-muted">
                            {skill.detail}
                          </span>
                        </span>
                      </motion.li>
                    ))}
                  </motion.ul>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
