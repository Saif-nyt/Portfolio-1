/**
 * Content backend location. Client-safe (no server-only imports) so the
 * artwork <img> URLs can be built in client components too.
 */
export const CONTENT_API_BASE =
  process.env.NEXT_PUBLIC_CONTENT_API_BASE ??
  "https://raw.githubusercontent.com/Saif-nyt/Portfolio-1/main/content";

/**
 * Images are served through the jsDelivr CDN instead of raw.githubusercontent:
 * jsDelivr sets a proper `image/svg+xml` content type, while GitHub raw sends
 * `text/plain`, which browsers block (ORB) inside <img> elements.
 */
export const CONTENT_IMAGE_BASE =
  process.env.NEXT_PUBLIC_CONTENT_IMAGE_BASE ??
  "https://cdn.jsdelivr.net/gh/Saif-nyt/Portfolio-1@main/content";

/** Hosted original artwork for a project. */
export function projectArtworkUrl(slug: string): string {
  return `${CONTENT_IMAGE_BASE}/images/${slug}.svg`;
}
