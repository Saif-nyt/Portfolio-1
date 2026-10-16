import { social } from "@/lib/metadata";
import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { SERVICES } from "@/data/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Full-stack web development, WordPress and Shopify builds, Meta Ads campaigns, server-side tracking with Facebook Conversion API, and e-commerce growth solutions.",
  alternates: { canonical: "/services" },
  ...social({
    title: "Services — Development, Commerce, Ads & Tracking",
    description:
      "Full-stack development, WordPress, Shopify, Meta Ads, Conversion API tracking and e-commerce growth work.",
    url: "/services",
  }),
};

const HONESTY = [
  {
    heading: "What measurement changes",
    body: "A correct tracking setup means you can see which events fired, which path led to a purchase, and whether your reports match reality. That makes decisions faster and cheaper to reverse.",
  },
  {
    heading: "What measurement does not do",
    body: "It does not guarantee a ROAS, a revenue figure, or a conversion lift. No one can promise those numbers without evidence from your own offer, audience and budget.",
  },
  {
    heading: "How I scope work",
    body: "Each engagement starts from one clear objective. Some businesses need a build first, some need the measurement layer first, and some need both in phases.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title={
          <>
            The tools of{" "}
            <span className="font-editorial italic text-accent dark:text-bio">
              creation.
            </span>
          </>
        }
        intro="Six services covering the build, the storefront, the campaign, and the measurement underneath — offered individually or as a connected package."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
        meta={
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[0.78rem] text-muted">
            {SERVICES.map((service) => (
              <li key={service.slug}>{service.title}</li>
            ))}
          </ul>
        }
      />

      <ServicesGrid
        eyebrow="All Services"
        title={
          <>
            Every service, with its{" "}
            <span className="font-editorial italic text-accent dark:text-bio">
              fine print.
            </span>
          </>
        }
        intro="Each card lists what is actually delivered. Where a service is often over-promised, the honest limits are written on the card itself."
        id="all-services"
      />

      {/* Measurement vs performance honesty block */}
      <section
        aria-labelledby="honesty-heading"
        className="relative isolate overflow-hidden bg-surface-2 py-20 sm:py-28"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_50%_at_20%_0%,var(--glow-soft),transparent_70%)] opacity-70" />
        <Container className="relative z-10">
          <Reveal className="max-w-3xl">
            <span className="eyebrow">An important distinction</span>
            <h2
              id="honesty-heading"
              className="mt-6 text-[clamp(1.9rem,4vw,3rem)] leading-tight tracking-[-0.02em] text-ink"
            >
              Improving measurement is not the same as guaranteeing
              performance.
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {HONESTY.map((item, index) => (
              <Reveal key={item.heading} delay={index * 0.08}>
                <div className="h-full rounded-[1.25rem] border border-line bg-surface-raised/70 p-6">
                  <span
                    aria-hidden="true"
                    className="block h-px w-10 bg-gradient-to-r from-glow to-transparent"
                  />
                  <h3 className="mt-5 font-display text-lg font-medium tracking-tight text-ink">
                    {item.heading}
                  </h3>
                  <p className="mt-3 text-[0.9rem] leading-relaxed text-ink-soft">
                    {item.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1} className="mt-10">
            <div className="flex flex-col gap-4 rounded-[1.25rem] border border-glow/35 bg-glow/[0.06] p-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-2xl text-[0.92rem] leading-relaxed text-ink-soft">
                Tell me the objective and the constraint — budget, timeline, or
                technical debt — and I&apos;ll suggest the smallest useful
                starting point.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button href="/contact">Discuss Your Project</Button>
                <Button href="/work" variant="outline">
                  See Related Work
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <ProcessTimeline />

      <ContactCTA />
    </>
  );
}
