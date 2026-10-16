import type { MetadataRoute } from "next";
import { PRIMARY_NAV } from "@/data/navigation";
import { SITE_URL } from "@/config/site";
import { getArticles, getProjects } from "@/lib/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Dates come from article content (never from the clock), so the sitemap
  // stays deterministic even though the content is read from the API.
  const pages: MetadataRoute.Sitemap = PRIMARY_NAV.map((item) => ({
    url: `${SITE_URL}${item.href === "/" ? "" : item.href}`,
    changeFrequency: item.href === "/" ? "weekly" : "monthly",
    priority: item.href === "/" ? 1 : 0.8,
  }));

  const projects: MetadataRoute.Sitemap = (await getProjects()).map(
    (project) => ({
      url: `${SITE_URL}/work/${project.slug}`,
      changeFrequency: "monthly",
      priority: 0.6,
    }),
  );

  const articles: MetadataRoute.Sitemap = (await getArticles()).map(
    (article) => ({
      url: `${SITE_URL}/insights/${article.slug}`,
      lastModified: new Date(`${article.publishedAt}T00:00:00Z`),
      changeFrequency: "yearly",
      priority: 0.5,
    }),
  );

  return [...pages, ...projects, ...articles];
}
