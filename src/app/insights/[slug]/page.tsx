import { social } from "@/lib/metadata";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ArticleBody } from "@/components/insights/ArticleBody";
import { TableOfContents } from "@/components/insights/TableOfContents";
import { ShareLinks } from "@/components/insights/ShareLinks";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { formatDate } from "@/data/articles";
import {
  getArticle,
  getArticles,
  getRelatedArticles,
} from "@/lib/content";
import { SITE, SITE_URL } from "@/config/site";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);
  // Keep this a return, not notFound(): a throw here flips the response to 200.
  if (!article) return { title: "Article not found" };

  const url = `/insights/${article.slug}`;

  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: url },
    authors: [{ name: SITE.name }],
    ...social({
      title: article.title,
      description: article.excerpt,
      url,
      type: "article",
      publishedTime: `${article.publishedAt}T00:00:00.000Z`,
      authors: [SITE.name],
      section: article.category,
    }),
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();

  const tocItems = article.blocks
    .filter(
      (block): block is { type: "h2"; id: string; text: string } =>
        block.type === "h2",
    )
    .map((block) => ({ id: block.id, text: block.text }));

  const related = await getRelatedArticles(slug);
  const canonicalUrl = `${SITE_URL}/insights/${article.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt,
    author: {
      "@type": "Person",
      name: SITE.name,
      jobTitle: SITE.role,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Person",
      name: SITE.name,
    },
    mainEntityOfPage: canonicalUrl,
    articleSection: article.category,
    inLanguage: "en",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <PageHero
        eyebrow={`${article.category} — ${article.readingTime}`}
        title={article.title}
        intro={article.subtitle}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Insights", href: "/insights" },
          { label: article.title },
        ]}
        meta={
          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.82rem] text-muted">
            <span className="text-ink-soft">{SITE.name}</span>
            <span aria-hidden="true" className="text-line-strong">
              ·
            </span>
            <time dateTime={article.publishedAt}>
              {formatDate(article.publishedAt)}
            </time>
            <span aria-hidden="true" className="text-line-strong">
              ·
            </span>
            <span>{article.readingTime}</span>
          </div>
        }
      />

      <Container className="py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-8">
            <article aria-labelledby="article-title">
              <h2 id="article-title" className="sr-only">
                {article.title}
              </h2>
              <ArticleBody blocks={article.blocks} />
            </article>

            <div className="mt-12 border-t border-line pt-6">
              <ShareLinks url={canonicalUrl} title={article.title} />
            </div>

            <div className="mt-8 rounded-[1.25rem] border border-line bg-surface-2 p-6">
              <p className="eyebrow">Continue the conversation</p>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-soft">
                If one of these topics maps to something you are working on, I am
                happy to look at the specifics with you.
              </p>
              <Link
                href="/contact"
                className="mt-4 inline-flex h-11 items-center rounded-full bg-ink px-5 text-[0.84rem] font-medium text-surface transition-colors hover:bg-accent-strong dark:bg-bio dark:text-forest"
              >
                Discuss Your Project
              </Link>
            </div>
          </div>

          <aside className="lg:col-span-4">
            <div className="flex flex-col gap-6 lg:sticky lg:top-28">
              <TableOfContents items={tocItems} />

              <div className="rounded-[1.25rem] border border-line bg-surface-2 p-6">
                <p className="text-[0.7rem] font-medium uppercase tracking-[0.22em] text-muted">
                  Author
                </p>
                <p className="mt-3 font-display text-base font-medium text-ink">
                  {SITE.name}
                </p>
                <p className="mt-1 text-[0.85rem] leading-relaxed text-muted">
                  {SITE.role}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Link
                    href="/about"
                    className="inline-flex h-9 items-center rounded-full border border-line px-4 text-[0.78rem] text-ink-soft transition-colors hover:border-accent hover:text-accent"
                  >
                    About
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex h-9 items-center rounded-full border border-line px-4 text-[0.78rem] text-ink-soft transition-colors hover:border-accent hover:text-accent"
                  >
                    Contact
                  </Link>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </Container>

      {related.length > 0 ? (
        <section
          aria-labelledby="related-heading"
          className="border-t border-line bg-surface-2 py-16 sm:py-20"
        >
          <Container>
            <Reveal>
              <span className="eyebrow">Related articles</span>
              <h2
                id="related-heading"
                className="mt-5 text-[clamp(1.6rem,3vw,2.3rem)] tracking-[-0.02em] text-ink"
              >
                Read next
              </h2>
            </Reveal>

            <ul className="mt-8 grid gap-5 md:grid-cols-2">
              {related.map((item, index) => (
                <Reveal key={item.slug} delay={index * 0.08} className="h-full">
                  <li className="group flex h-full flex-col rounded-[1.25rem] border border-line bg-surface p-6 transition-all duration-500 hover:-translate-y-1 hover:border-glow/40">
                    <span className="text-[0.7rem] uppercase tracking-[0.16em] text-muted">
                      {item.category}
                    </span>
                    <h3 className="mt-3 font-display text-lg font-medium leading-snug text-ink">
                      <Link
                        href={`/insights/${item.slug}`}
                        className="transition-colors hover:text-accent dark:hover:text-bio"
                      >
                        {item.title}
                      </Link>
                    </h3>
                    <p className="mt-3 text-[0.88rem] leading-relaxed text-muted">
                      {item.excerpt}
                    </p>
                    <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-[0.82rem] font-medium text-ink transition-colors group-hover:text-accent dark:group-hover:text-bio">
                      Open article
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </li>
                </Reveal>
              ))}
            </ul>
          </Container>
        </section>
      ) : null}

      <ContactCTA variant="inline" />
    </>
  );
}
