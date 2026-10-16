import { SITE, SITE_URL } from "@/config/site";
import { apiJson } from "@/lib/api";

/** API root: discovery document for the read-only portfolio API. */
export async function GET() {
  return apiJson({
    data: {
      name: `${SITE.name} — Portfolio API`,
      description:
        "Read-only public JSON API for the case studies, articles and health of this portfolio site.",
      origin: SITE_URL,
      version: "1",
      endpoints: [
        { path: "/api", method: "GET", description: "This discovery document" },
        {
          path: "/api/projects",
          method: "GET",
          description: "All case studies (summary fields)",
        },
        {
          path: "/api/projects/[slug]",
          method: "GET",
          description: "One full case study, or 404",
        },
        {
          path: "/api/articles",
          method: "GET",
          description: "All articles (summary fields, newest first)",
        },
        {
          path: "/api/articles/[slug]",
          method: "GET",
          description: "One full article with content blocks, or 404",
        },
        {
          path: "/api/health",
          method: "GET",
          description: "Liveness probe",
        },
      ],
    },
  });
}
