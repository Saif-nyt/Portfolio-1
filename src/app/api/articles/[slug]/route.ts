import { getArticles } from "@/lib/content";
import { apiJson, readArticle } from "@/lib/api";

/** Known slugs are prerendered; anything else resolves to a JSON 404. */
export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((article) => ({ slug: article.slug }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const article = await readArticle(decodeURIComponent(slug));

  if (!article) {
    return apiJson(
      {
        error: "not_found",
        message: `No article exists for slug "${slug}".`,
        availableAt: "/api/articles",
      },
      { status: 404 },
    );
  }

  return apiJson({ data: { ...article, href: `/insights/${article.slug}` } });
}
