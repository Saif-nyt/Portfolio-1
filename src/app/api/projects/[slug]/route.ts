import { getProjects } from "@/lib/content";
import { apiJson, readProject } from "@/lib/api";

/** Known slugs are prerendered; anything else resolves to a JSON 404. */
export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const project = await readProject(decodeURIComponent(slug));

  if (!project) {
    return apiJson(
      {
        error: "not_found",
        message: `No case study exists for slug "${slug}".`,
        availableAt: "/api/projects",
      },
      { status: 404 },
    );
  }

  return apiJson({ data: { ...project, href: `/work/${project.slug}` } });
}
