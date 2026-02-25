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
        className="relative flex flex-col overflow-hidden rounded-xl border border-border bg-card ring-1 ring-foreground/5 transition-all hover:border-primary/30 hover:shadow-[0_0_24px_-6px_oklch(0.75_0.14_200_/_0.15)] before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-foreground/[0.06] before:to-transparent"
      >
        {frontmatter.image && (
          <div className="relative aspect-video overflow-hidden bg-muted">
            <Image
              src={frontmatter.image}
              alt={frontmatter.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
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
                className="font-mono text-xs"
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
