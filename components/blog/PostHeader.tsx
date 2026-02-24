import { Badge } from '@/components/ui/badge';
import type { PostFrontmatter } from '@/lib/content';

interface PostHeaderProps {
  frontmatter: PostFrontmatter;
  readingTime: string;
}

export function PostHeader({ frontmatter, readingTime }: PostHeaderProps) {
  return (
    <header className="mb-10">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
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
      <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
        {frontmatter.title}
      </h1>
      <p className="mt-4 text-lg text-muted-foreground">
        {frontmatter.description}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {frontmatter.tags.map((tag) => (
          <Badge key={tag} variant="secondary" className="font-mono text-xs">
            {tag}
          </Badge>
        ))}
      </div>
    </header>
  );
}
