import { social } from "@/lib/metadata";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { ARTICLES, formatDate } from "@/data/articles";

export const metadata: Metadata = {
  title: "Insights — Practical Notes on Web, Commerce & Measurement",
  description:
    "Practical articles about WordPress and Shopify choices, Meta Pixel and Conversion API tracking, mobile product pages, site speed, and advertising measurement.",
  alternates: { canonical: "/insights" },
  ...social({
    title: "Insights — Practical Notes on Web, Commerce & Measurement",
    description:
      "Practical articles about e-commerce platforms, conversion tracking, product pages, speed and advertising measurement.",
    url: "/insights",
  }),
};

export default function InsightsPage() {
  const sorted = [...ARTICLES].sort((a, b) =>
    a.publishedAt < b.publishedAt ? 1 : -1,
  );

  return (
    <>
      <PageHero
        eyebrow="Insights"
        title={
          <>
            Field notes from{" "}
            <span className="font-editorial italic text-accent dark:text-bio">
              the build.
            </span>
          </>
        }
        intro="Practical writing about the work itself: platforms, tracking, product pages, performance and measurement — written to be used, not just read."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Insights" }]}
        meta={
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[0.78rem] text-muted">
            <li>{ARTICLES.length} articles</li>
            <li aria-hidden="true" className="text-line-strong">
              ·
            </li>
            <li>Web development</li>
            <li aria-hidden="true" className="text-line-strong">
              ·
            </li>
            <li>E-commerce</li>
            <li aria-hidden="true" className="text-line-strong">
              ·
            </li>
            <li>Marketing & analytics</li>
          </ul>
        }
      />

      <section className="bg-surface py-16 sm:py-24">
        <Container>
          <ol className="grid gap-6 md:grid-cols-2">
            {sorted.map((article, index) => (
              <Reveal
                key={article.slug}
                delay={Math.min(index * 0.06, 0.3)}
                className="h-full"
              >
                <li className="group flex h-full flex-col overflow-hidden rounded-[1.375rem] border border-line bg-surface-2 transition-all duration-500 hover:-translate-y-1 hover:border-glow/40">
                  <div className="flex flex-1 flex-col p-6 sm:p-7">
                    <div className="flex items-center justify-between gap-4 text-[0.7rem] uppercase tracking-[0.16em] text-muted">
                      <span>{article.category}</span>
                      <span className="font-mono tracking-[0.18em]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <h2 className="mt-4 font-display text-xl font-medium leading-snug tracking-[-0.01em] text-ink sm:text-2xl">
                      <Link
                        href={`/insights/${article.slug}`}
                        className="transition-colors duration-300 after:absolute after:inset-0 after:content-[''] hover:text-accent dark:hover:text-bio"
                      >
                        {article.title}
                      </Link>
                    </h2>

                    <p className="mt-3 text-[0.92rem] leading-relaxed text-ink-soft">
                      {article.subtitle}
                    </p>

                    <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-6 text-[0.78rem] text-muted">
                      <span>
                        <time dateTime={article.publishedAt}>
                          {formatDate(article.publishedAt)}
                        </time>
                        <span aria-hidden="true"> · </span>
                        {article.readingTime}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-ink transition-colors group-hover:text-accent dark:group-hover:text-bio">
                        Read article
                        <ArrowUpRight
                          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          strokeWidth={1.7}
                          aria-hidden="true"
                        />
                      </span>
                    </div>
                  </div>
                  <span
                    aria-hidden="true"
                    className="block h-px w-full origin-left scale-x-0 bg-gradient-to-r from-glow via-glow/50 to-transparent transition-transform duration-700 group-hover:scale-x-100"
                  />
                </li>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      <ContactCTA variant="inline" />
    </>
  );
}
