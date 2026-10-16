import { social } from "@/lib/metadata";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/layout/PageHero";
import { CaseStudyLayout } from "@/components/projects/CaseStudyLayout";
import { ContactCTA } from "@/components/sections/ContactCTA";
import {
  getProject,
  getProjects,
  getRelatedProjects,
} from "@/lib/content";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  // Keep this a return, not notFound(): a throw here flips the response to 200.
  if (!project) return { title: "Project not found" };

  return {
    title: `${project.title} — ${project.kicker}`,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
    ...social({
      title: `${project.title} — ${project.kicker}`,
      description: project.summary,
      url: `/work/${project.slug}`,
      type: "article",
    }),
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  const nextProject = (await getRelatedProjects(slug, 1))[0];

  return (
    <>
      <PageHero
        eyebrow={`${project.kicker} — ${project.category}`}
        title={project.title}
        intro={project.summary}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Work", href: "/work" },
          { label: project.title },
        ]}
        meta={
          <ul className="mt-8 flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <li
                key={tech}
                className="rounded-full border border-line bg-surface px-3.5 py-1.5 text-[0.75rem] text-muted"
              >
                {tech}
              </li>
            ))}
          </ul>
        }
      />

      <CaseStudyLayout project={project} nextProject={nextProject} />

      <ContactCTA variant="inline" />
    </>
  );
}
