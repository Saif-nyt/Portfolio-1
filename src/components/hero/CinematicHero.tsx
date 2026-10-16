"use client";

import { motion } from "motion/react";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import dynamic from "next/dynamic";
import { EnvironmentScene } from "@/components/hero/EnvironmentScene";
import { Button } from "@/components/ui/Button";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { SITE } from "@/config/site";

const ParticleField = dynamic(
  () =>
    import("@/components/hero/ParticleField").then((mod) => mod.ParticleField),
  { ssr: false },
);

const EASE = [0.16, 1, 0.3, 1] as const;

export function CinematicHero() {
  const reduced = usePrefersReducedMotion();

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
  };

  const item = reduced
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 26 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
      };

  return (
    <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden">
      <EnvironmentScene />
      <ParticleField className="opacity-90" />

      <div className="container-page relative z-10 flex flex-1 flex-col justify-center pb-28 pt-36 sm:pt-40 lg:pb-32">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="max-w-4xl"
        >
          <motion.p
            variants={item}
            className="inline-flex items-center gap-3 text-[0.68rem] font-medium uppercase tracking-[0.3em] text-[#9FD8D2]"
          >
            <span
              aria-hidden="true"
              className="h-px w-8 bg-gradient-to-r from-transparent to-[#65E8E0]"
            />
            Web Development • Digital Growth • Tracking
          </motion.p>

          <motion.h1
            variants={item}
            className="mt-6 text-[clamp(2.4rem,7vw,5.25rem)] font-medium leading-[1.02] tracking-[-0.03em] text-[#F4F8F5]"
          >
            Building Digital Experiences{" "}
            <span className="font-editorial italic text-[#8FF2EC]">
              Beyond the Ordinary.
            </span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-7 max-w-2xl text-base leading-relaxed text-[#C3D4CE] sm:text-lg"
          >
            I&apos;m T. M. Saiful Islam — a web developer and digital growth
            specialist helping businesses build better websites, grow online,
            and measure what matters.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
          >
            <MagneticButton>
              <Button href="/work" size="lg" variant="light">
                Explore My Work
              </Button>
            </MagneticButton>
            <MagneticButton strength={0.18}>
              <Button href="/contact" size="lg" variant="outlineLight">
                Let&apos;s Work Together
              </Button>
            </MagneticButton>
          </motion.div>

          <motion.p
            variants={item}
            className="mt-8 text-[0.78rem] tracking-wide text-[#96ABA4]"
          >
            100+ WordPress Websites Completed · 1.5 Years of Experience
          </motion.p>

          {SITE.availability ? (
            <motion.p
              variants={item}
              className="mt-5 inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-[0.75rem] text-[#C3D4CE] backdrop-blur-sm"
            >
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-[#65E8E0] glow-dot pulse-bio"
              />
              {SITE.availability}
            </motion.p>
          ) : null}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="pointer-events-none absolute inset-x-0 bottom-6 z-10 flex justify-center">
        <div className="flex flex-col items-center gap-2.5">
          <span className="text-[0.6rem] uppercase tracking-[0.34em] text-[#8FA79F]">
            Scroll
          </span>
          <span
            aria-hidden="true"
            className="relative block h-10 w-px overflow-hidden bg-white/15"
          >
            <span className="absolute inset-x-0 top-0 h-4 animate-[scroll-dot_2.4s_ease-in-out_infinite] bg-[#65E8E0]" />
          </span>
        </div>
      </div>

      {/* Atmospheric fade into the next scene */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-40 bg-gradient-to-b from-transparent to-surface"
      />
    </section>
  );
}
