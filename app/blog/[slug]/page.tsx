import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PostHeader } from '@/components/blog/PostHeader';
import { TableOfContents } from '@/components/blog/TableOfContents';
import { getAllPosts, getPostBySlug } from '@/lib/content';
import { renderMDX } from '@/lib/mdx';
import { jsonLdBlogPosting } from '@/lib/metadata';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      type: 'article',
      publishedTime: post.frontmatter.date,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const content = await renderMDX(post.content);

  return (
    <div className="mx-auto max-w-5xl px-6 pt-32 pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            jsonLdBlogPosting({
              title: post.frontmatter.title,
              description: post.frontmatter.description,
              date: post.frontmatter.date,
              slug,
            }),
          ),
        }}
      />
      <div className="lg:grid lg:grid-cols-[1fr_220px] lg:gap-12">
        <article className="max-w-prose">
          <PostHeader
            frontmatter={post.frontmatter}
            readingTime={post.readingTime}
          />
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            {content}
          </div>
        </article>
        <aside className="hidden lg:block">
          <TableOfContents />
        </aside>
      </div>
    </div>
  );
}
