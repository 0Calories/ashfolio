import type { Metadata } from 'next';
import { PostCard } from '@/components/blog/PostCard';
import { ScrollReveal } from '@/components/effects/ScrollReveal';
import { getAllPosts } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Thoughts on web development, React, and building things.',
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-5xl px-6 pt-32 pb-16">
      <ScrollReveal>
        <h1 className="text-4xl font-bold">Blog</h1>
        <p className="mt-2 text-muted-foreground">
          Thoughts on web development, React, and building things.
        </p>
      </ScrollReveal>

      {posts.length === 0 ? (
        <p className="mt-12 text-muted-foreground">No posts yet.</p>
      ) : (
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <ScrollReveal key={post.slug} delay={i * 0.05}>
              <PostCard post={post} />
            </ScrollReveal>
          ))}
        </div>
      )}
    </div>
  );
}
