"use client";

import { motion } from "motion/react";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { Button } from "@/components/ui/Button";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { SITE } from "@/config/site";
import { EnvironmentScene } from "@/components/hero/EnvironmentScene";
import { Container } from "@/components/ui/Container";

interface ContactCTAProps {
  variant?: "immersive" | "inline";
}

export function ContactCTA({ variant = "immersive" }: ContactCTAProps) {
  const reduced = usePrefersReducedMotion();

  if (variant === "inline") {
    return (
      <section
        aria-labelledby="cta-inline-heading"
        className="relative isolate overflow-hidden border-y border-line bg-surface-2 py-14 sm:py-16"
      >
        <Container>
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <p className="eyebrow">Next step</p>
              <h2
                id="cta-inline-heading"
                className="mt-3 max-w-2xl text-[clamp(1.5rem,2.6vw,2.1rem)] leading-tight tracking-[-0.02em] text-ink"
              >
                Have a project in mind? Let&apos;s map the first week of it.
              </h2>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button href="/contact">Discuss Your Project</Button>
              <Button href="/work" variant="outline">
                Explore My Work
              </Button>
            </div>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section
      aria-labelledby="cta-final-heading"
      className="relative isolate flex min-h-[70svh] items-center overflow-hidden bg-[#060F0C] py-24 sm:py-32"
    >
      <EnvironmentScene />

      <Container className="relative z-10">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="inline-flex items-center gap-3 text-[0.68rem] font-medium uppercase tracking-[0.3em] text-[#9FD8D2]">
            <span
              aria-hidden="true"
              className="h-px w-8 bg-gradient-to-r from-transparent to-[#65E8E0]"
            />
            Final Scene
            <span
              aria-hidden="true"
              className="h-px w-8 bg-gradient-to-l from-transparent to-[#65E8E0]"
            />
          </span>

          <h2
            id="cta-final-heading"
            className="mt-7 text-[clamp(2rem,5vw,3.75rem)] font-medium leading-[1.05] tracking-[-0.03em] text-[#F4F8F5]"
          >
            Let&apos;s Build Something That{" "}
            <span className="font-editorial italic text-[#8FF2EC]">
              Moves Your Business Forward.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-[#C3D4CE] sm:text-lg">
            Have a website, e-commerce project, or tracking challenge in mind?
            Let&apos;s talk about the next step.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <MagneticButton>
              <Button href="/contact" size="lg" variant="light">
                Start a Project
              </Button>
            </MagneticButton>
            <MagneticButton strength={0.18}>
              <Button
                href={SITE.whatsappUrl}
                size="lg"
                variant="outlineLight"
              >
                Chat on WhatsApp
              </Button>
            </MagneticButton>
          </div>
        </motion.div>
      </Container>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-surface-2"
      />
    </section>
  );
}
