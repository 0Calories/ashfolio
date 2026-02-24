import { ExternalLink, Github } from 'lucide-react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ScrollReveal } from '@/components/effects/ScrollReveal';
import { VideoEmbed } from '@/components/projects/VideoEmbed';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getAllProjects, getProjectBySlug } from '@/lib/content';
import { renderMDX } from '@/lib/mdx';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  return {
    title: project.frontmatter.title,
    description: project.frontmatter.description,
    openGraph: {
      title: project.frontmatter.title,
      description: project.frontmatter.description,
      type: 'article',
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const content = await renderMDX(project.content);
  const { frontmatter } = project;

  return (
    <div className="mx-auto max-w-3xl px-6 pt-32 pb-16">
      <ScrollReveal>
        <header className="mb-10">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            {frontmatter.title}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            {frontmatter.description}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {frontmatter.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="font-mono text-xs"
              >
                {tag}
              </Badge>
            ))}
          </div>
          <div className="mt-6 flex gap-3">
            {frontmatter.github && (
              <Button asChild variant="outline" size="sm">
                <a
                  href={frontmatter.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="size-4" />
                  Source
                </a>
              </Button>
            )}
            {frontmatter.live && (
              <Button asChild size="sm">
                <a
                  href={frontmatter.live}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="size-4" />
                  Live Demo
                </a>
              </Button>
            )}
          </div>
        </header>
      </ScrollReveal>

      {frontmatter.video && (
        <ScrollReveal className="mb-10">
          <VideoEmbed src={frontmatter.video} title={frontmatter.title} />
        </ScrollReveal>
      )}

      <ScrollReveal>
        <article className="prose prose-neutral dark:prose-invert max-w-none">
          {content}
        </article>
      </ScrollReveal>
    </div>
  );
}
