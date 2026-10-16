import {
  getArticle,
  getArticles,
  getProject,
  getProjects,
} from "@/lib/content";
import type { Article } from "@/types/article";
import type { Project } from "@/types/project";

/**
 * Thin data-access layer behind the public JSON API. Reads go through the
 * remote-first content layer (`src/lib/content.ts`), which caches with
 * `use cache` and falls back to the bundled copy when the API is unreachable.
 */

/** Public, cacheable, CORS-open headers for every read-only API response. */
export function apiHeaders(extra: Record<string, string> = {}): Headers {
  return new Headers({
    "Cache-Control":
      "public, max-age=300, s-maxage=3600, stale-while-revalidate=86400",
    "Access-Control-Allow-Origin": "*",
    ...extra,
  });
}

/** JSON response helper so every endpoint ships the same headers. */
export function apiJson(body: unknown, init: ResponseInit = {}): Response {
  const headers = apiHeaders();
  new Headers(init.headers).forEach((value, key) => headers.set(key, value));
  return Response.json(body, { ...init, headers });
}

export interface ProjectSummary {
  slug: string;
  title: string;
  kicker: string;
  category: string;
  secondaryCategory: string;
  summary: string;
  year: string;
  role: string;
  technologies: string[];
  isDemo: boolean;
  featured: boolean;
  href: string;
}

export interface ArticleSummary {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  publishedAt: string;
  readingTime: string;
  excerpt: string;
  href: string;
}

function toProjectSummary(project: Project): ProjectSummary {
  return {
    slug: project.slug,
    title: project.title,
    kicker: project.kicker,
    category: project.category,
    secondaryCategory: project.secondaryCategory,
    summary: project.summary,
    year: project.year,
    role: project.role,
    technologies: project.technologies,
    isDemo: project.isDemo,
    featured: project.featured,
    href: `/work/${project.slug}`,
  };
}

function toArticleSummary(article: Article): ArticleSummary {
  return {
    slug: article.slug,
    title: article.title,
    subtitle: article.subtitle,
    category: article.category,
    publishedAt: article.publishedAt,
    readingTime: article.readingTime,
    excerpt: article.excerpt,
    href: `/insights/${article.slug}`,
  };
}

export async function listProjects(): Promise<ProjectSummary[]> {
  const projects = await getProjects();
  return projects.map(toProjectSummary);
}

export async function readProject(slug: string): Promise<Project | null> {
  return getProject(slug);
}

export async function listArticles(): Promise<ArticleSummary[]> {
  const articles = await getArticles();
  return [...articles]
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1))
    .map(toArticleSummary);
}

export async function readArticle(slug: string): Promise<Article | null> {
  return getArticle(slug);
}
