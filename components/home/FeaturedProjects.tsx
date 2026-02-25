import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { ScrollReveal } from '@/components/effects/ScrollReveal';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { Button } from '@/components/ui/button';
import { getFeaturedProjects } from '@/lib/content';

export function FeaturedProjects() {
  const projects = getFeaturedProjects();

  if (projects.length === 0) return null;

  return (
    <section className="mx-auto max-w-5xl px-6 py-24">
      <ScrollReveal>
        <div className="flex items-end justify-between">
          <div>
            <div className="mb-4 h-0.5 w-8 rounded-full bg-indigo-400" />
            <h2 className="text-3xl font-bold">Featured Projects</h2>
            <p className="mt-2 text-muted-foreground">
              Things I&apos;ve built recently.
            </p>
          </div>
          <Button asChild variant="ghost" size="sm" className="hidden sm:flex">
            <Link href="/projects">
              View all
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </ScrollReveal>
      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {projects.map((project, i) => (
          <ScrollReveal key={project.slug} delay={i * 0.1}>
            <ProjectCard project={project} />
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
