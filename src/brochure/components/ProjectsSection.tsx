import { ProjectCard } from "@/brochure/components/ProjectCard";
import type { Project } from "@/brochure/data/data";

interface ProjectsSectionProps {
  projects: Project[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section id="proyectos" className="space-y-16 pb-12">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </section>
  );
}
