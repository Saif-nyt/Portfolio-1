import { social } from "@/lib/metadata";
import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { ProjectExplorer } from "@/components/projects/ProjectExplorer";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { PROJECTS } from "@/data/projects";

export const metadata: Metadata = {
  title: "Work — Case Studies & Concept Projects",
  description:
    "Selected web development, WordPress, Shopify, marketing and tracking projects, each documented as a full case study with roles, decisions and deliverables.",
  alternates: { canonical: "/work" },
  ...social({
    title: "Work — Case Studies & Concept Projects",
    description:
      "Web development, WordPress, Shopify, marketing and tracking projects documented as full case studies.",
    url: "/work",
  }),
};

export default function WorkPage() {
  return (
    <>
      <PageHero
        eyebrow="Work"
        title={
          <>
            Regions of{" "}
            <span className="font-editorial italic text-accent dark:text-bio">
              Pandora
            </span>{" "}
            worth scanning.
          </>
        }
        intro="Every project below is clearly marked as a concept or demonstration. Open a case study to see the problem, the decisions, the deliverable, and what is honestly not claimed."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Work" }]}
        meta={
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[0.78rem] text-muted">
            <li>{PROJECTS.length} projects</li>
            <li aria-hidden="true" className="text-line-strong">
              ·
            </li>
            <li>All clearly labelled as concept / demo work</li>
            <li aria-hidden="true" className="text-line-strong">
              ·
            </li>
            <li>Full case-study template on every project</li>
          </ul>
        }
      />

      <ProjectExplorer
        projects={PROJECTS}
        eyebrow="Interactive Projects Explorer"
        title={
          <>
            Filter by{" "}
            <span className="font-editorial italic text-accent dark:text-bio">
              discipline.
            </span>
          </>
        }
        intro="Scan each region of the work the way you would scan a landscape: narrow the view, then step closer."
        id="work"
      />

      <ContactCTA variant="inline" />
    </>
  );
}
