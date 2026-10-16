import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ARTICLES } from "@/data/articles";
import { PROJECTS } from "@/data/projects";

/**
 * Dynamic detail routes are streamed, so `notFound()` thrown during render can
 * only flush a soft 404 (HTTP 200 + noindex) on a cache miss. Rejecting unknown
 * slugs here, before rendering starts, returns a real HTTP 404 for the very
 * first request. Known slugs fall through to the normal page render.
 */
const knownSlugs = new Set<string>([
  ...PROJECTS.map((project) => project.slug),
  ...ARTICLES.map((article) => article.slug),
]);

export default function proxy(request: NextRequest) {
  const segments = request.nextUrl.pathname.split("/").filter(Boolean);
  if (segments.length !== 2) return NextResponse.next();

  const [section, rawSlug] = segments;
  if (section !== "work" && section !== "insights") return NextResponse.next();

  const slug = decodeURIComponent(rawSlug);
  if (knownSlugs.has(slug)) return NextResponse.next();

  // Rewrite to a path with no matching route so the static not-found page is
  // served with its real 404 status instead of a streamed soft 404.
  return NextResponse.rewrite(new URL("/page-that-does-not-exist", request.url));
}

export const config = {
  matcher: ["/work/:path*", "/insights/:path*"],
};
