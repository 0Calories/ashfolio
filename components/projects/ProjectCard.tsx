'use client';

import { ExternalLink, Github } from 'lucide-react';
import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import type { Project } from '@/lib/content';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { slug, frontmatter } = project;

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="group"
    >
      <Link
        href={`/projects/${slug}`}
        className="flex flex-col overflow-hidden rounded-xl border border-border bg-card ring-1 ring-foreground/5 transition-shadow hover:shadow-lg"
      >
        {frontmatter.image && (
          <div className="relative aspect-video overflow-hidden bg-muted">
            <Image
              src={frontmatter.image}
              alt={frontmatter.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}
        <div className="flex flex-1 flex-col gap-3 p-5">
          <h3 className="text-lg font-semibold leading-snug">
            {frontmatter.title}
          </h3>
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {frontmatter.description}
          </p>
          <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
            {frontmatter.tags.slice(0, 4).map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="font-mono text-[0.65rem]"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
