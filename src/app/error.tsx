"use client";

import { useEffect } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Errors are reported by the framework in development; this keeps a record
    // for production diagnostics without exposing details to visitors.
    console.error(error);
  }, [error]);

  return (
    <section className="relative isolate flex min-h-[70svh] items-center overflow-hidden bg-surface-2 pt-36 pb-24">
      <div className="pointer-events-none absolute -left-20 top-1/3 h-80 w-80 rounded-full bg-glow/12 blur-3xl" />

      <Container className="relative z-10">
        <span className="eyebrow">Something went wrong</span>
        <h1 className="mt-6 max-w-3xl text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] tracking-[-0.03em] text-ink">
          The signal dropped for a moment.
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg">
          This page could not be rendered. Trying again usually resolves it — if
          it keeps happening, please get in touch and tell me what you were
          doing.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Button onClick={reset}>Try again</Button>
          <Button href="/contact" variant="outline">
            Report a problem
          </Button>
        </div>
      </Container>
    </section>
  );
}
