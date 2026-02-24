import type { Metadata } from 'next';
import { ScrollReveal } from '@/components/effects/ScrollReveal';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { getAllProjects } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Things I have built.',
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <div className="mx-auto max-w-5xl px-6 pt-32 pb-16">
      <ScrollReveal>
        <h1 className="text-4xl font-bold">Projects</h1>
        <p className="mt-2 text-muted-foreground">Things I&apos;ve built.</p>
      </ScrollReveal>

      {projects.length === 0 ? (
        <p className="mt-12 text-muted-foreground">No projects yet.</p>
      ) : (
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {projects.map((project, i) => (
            <ScrollReveal key={project.slug} delay={i * 0.05}>
              <ProjectCard project={project} />
            </ScrollReveal>
          ))}
        </div>
      )}
    </div>
  );
}
