export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "h2"; id: string; text: string }
  | { type: "h3"; id: string; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "note"; title: string; text: string }
  | { type: "quote"; text: string; cite?: string };

export interface Article {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  /** ISO date string — the real publication date of the article. */
  publishedAt: string;
  readingTime: string;
  excerpt: string;
  blocks: ArticleBlock[];
  related: string[];
}
