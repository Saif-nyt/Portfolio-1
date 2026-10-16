export type ProjectCategory =
  | "Web Development"
  | "WordPress"
  | "Shopify"
  | "Marketing"
  | "Tracking & Analytics";

export interface ProjectLink {
  label: string;
  href: string;
}

export interface ProjectShowcaseItem {
  title: string;
  description: string;
}

export interface ProjectSection {
  heading: string;
  body: string[];
}

export interface Project {
  slug: string;
  title: string;
  kicker: string;
  category: ProjectCategory;
  secondaryCategory: string;
  summary: string;
  /** Identifier used to render the original artwork for this project. */
  artwork: string;
  technologies: string[];
  isDemo: boolean;
  featured: boolean;
  year: string;
  role: string;
  audience: string;
  problem: string;
  showcase: ProjectShowcaseItem[];
  sections: ProjectSection[];
  deliverable: string;
  results: string | null;
  lessons: string[];
  links: {
    live?: ProjectLink;
    source?: ProjectLink;
  };
}
