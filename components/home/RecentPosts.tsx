import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { PostCard } from '@/components/blog/PostCard';
import { ScrollReveal } from '@/components/effects/ScrollReveal';
import { Button } from '@/components/ui/button';
import { getAllPosts } from '@/lib/content';

export function RecentPosts() {
  const posts = getAllPosts().slice(0, 3);

  if (posts.length === 0) return null;

  return (
    <section className="mx-auto max-w-5xl px-6 py-24">
      <ScrollReveal>
        <div className="flex items-end justify-between">
          <div>
            <div className="mb-4 h-0.5 w-8 rounded-full bg-violet-400" />
            <h2 className="text-3xl font-bold">Recent Posts</h2>
            <p className="mt-2 text-muted-foreground">
              Thoughts on building for the web.
            </p>
          </div>
          <Button asChild variant="ghost" size="sm" className="hidden sm:flex">
            <Link href="/blog">
              View all
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </ScrollReveal>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, i) => (
          <ScrollReveal key={post.slug} delay={i * 0.1}>
            <PostCard post={post} />
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
