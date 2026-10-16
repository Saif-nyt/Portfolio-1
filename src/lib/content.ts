import { cacheLife, cacheTag } from "next/cache";
import { CONTENT_API_BASE } from "@/config/content";
import { ARTICLES } from "@/data/articles";
import { PROJECTS } from "@/data/projects";
import type { Article } from "@/types/article";
import type { Project } from "@/types/project";

/**
 * Remote-first content layer.
 *
 * The JSON in this repository's `/content` folder is the online backend the
 * site reads from (served over HTTPS by GitHub raw). Every read is cached with
 * `use cache`, and if the network is unavailable the bundled copy in
 * `src/data/*` is used, so the site never renders empty.
 */
export { CONTENT_API_BASE, projectArtworkUrl } from "@/config/content";

async function fetchJson<T>(file: string, fallback: T): Promise<T> {
  try {
    const response = await fetch(`${CONTENT_API_BASE}/${file}`, {
      signal: AbortSignal.timeout(5_000),
    });
    if (!response.ok) throw new Error(`content API responded ${response.status}`);
    return (await response.json()) as T;
  } catch {
    return fallback;
  }
}

function asList<T>(value: T[], fallback: T[]): T[] {
  return Array.isArray(value) && value.length > 0 ? value : fallback;
}

export async function getProjects(): Promise<Project[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("projects");
  return asList(await fetchJson<Project[]>("projects.json", PROJECTS), PROJECTS);
}

export async function getProject(slug: string): Promise<Project | null> {
  const projects = await getProjects();
  return projects.find((project) => project.slug === slug) ?? null;
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const projects = await getProjects();
  return projects.filter((project) => project.featured);
}

export async function getRelatedProjects(
  slug: string,
  limit = 2,
): Promise<Project[]> {
  const projects = await getProjects();
  const current = projects.find((project) => project.slug === slug);
  if (!current) return projects.slice(0, limit);
  const sameCategory = projects.filter(
    (project) => project.slug !== slug && project.category === current.category,
  );
  const others = projects.filter(
    (project) => project.slug !== slug && project.category !== current.category,
  );
  return [...sameCategory, ...others].slice(0, limit);
}

export async function getArticles(): Promise<Article[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("articles");
  return asList(
    await fetchJson<Article[]>("articles.json", ARTICLES),
    ARTICLES,
  );
}

export async function getArticle(slug: string): Promise<Article | null> {
  const articles = await getArticles();
  return articles.find((article) => article.slug === slug) ?? null;
}

export async function getRelatedArticles(slug: string): Promise<Article[]> {
  const article = await getArticle(slug);
  if (!article) return [];
  const articles = await getArticles();
  return article.related
    .map((relatedSlug) =>
      articles.find((item) => item.slug === relatedSlug),
    )
    .filter((item): item is Article => Boolean(item));
}
