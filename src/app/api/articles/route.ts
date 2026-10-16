import { apiJson, listArticles } from "@/lib/api";

/** GET /api/articles — every article, newest first, summary fields only. */
export async function GET() {
  const data = await listArticles();
  return apiJson({ count: data.length, data });
}
