'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import type { Post } from '@/lib/content';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const { slug, frontmatter, readingTime } = post;

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <Link
        href={`/blog/${slug}`}
        className="relative flex flex-col gap-3 rounded-xl border border-border bg-card p-5 ring-1 ring-foreground/5 transition-all hover:border-violet-500/30 hover:shadow-[0_0_24px_-6px_oklch(0.7_0.18_290_/_0.15)] before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-foreground/[0.06] before:to-transparent"
      >
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <time dateTime={frontmatter.date}>
            {new Date(frontmatter.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
          <span aria-hidden>&middot;</span>
          <span>{readingTime}</span>
        </div>
        <h3 className="text-lg font-semibold leading-snug">
          {frontmatter.title}
        </h3>
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {frontmatter.description}
        </p>
        <div className="flex flex-wrap gap-1.5 pt-1">
          {frontmatter.tags.slice(0, 3).map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="font-mono text-xs"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </Link>
    </motion.article>
  );
}
