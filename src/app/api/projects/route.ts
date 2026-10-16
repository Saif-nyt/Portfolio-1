import { apiJson, listProjects } from "@/lib/api";

/** GET /api/projects — every case study, summary fields only. */
export async function GET() {
  const data = await listProjects();
  return apiJson({ count: data.length, data });
}
