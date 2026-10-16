import { CinematicHero } from "@/components/hero/CinematicHero";
import { AboutPreview } from "@/components/sections/AboutPreview";
import { SkillsExplorer } from "@/components/sections/SkillsExplorer";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { ProjectExplorer } from "@/components/projects/ProjectExplorer";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { getProjects } from "@/lib/content";

export default async function HomePage() {
  const projects = await getProjects();
  return (
    <>
      <CinematicHero />

      <AboutPreview />

      <SkillsExplorer />

      <ServicesGrid
        title={
          <>
            Services built for{" "}
            <span className="font-editorial italic text-accent dark:text-bio">
              measurable work.
            </span>
          </>
        }
        intro="Six ways I can help — from a complete build to the measurement layer that tells you whether it is working."
      />

      <ContactCTA variant="inline" />

      <ProjectExplorer
        projects={projects}
        eyebrow="Selected Work"
        title={
          <>
            Regions worth{" "}
            <span className="font-editorial italic text-accent dark:text-bio">
              exploring.
            </span>
          </>
        }
        intro="Concept and demonstration projects across development, commerce, marketing and measurement. Filter by discipline — every case study opens in full."
        id="work"
      />

      <ProcessTimeline />

      <ContactCTA />
    </>
  );
}
