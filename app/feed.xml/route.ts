import RSS from 'rss';
import { siteConfig } from '@/data/site';
import { getAllPosts } from '@/lib/content';

export async function GET() {
  const feed = new RSS({
    title: siteConfig.title,
    description: siteConfig.description,
    site_url: siteConfig.url,
    feed_url: `${siteConfig.url}/feed.xml`,
    language: 'en',
  });

  const posts = getAllPosts();

  for (const post of posts) {
    feed.item({
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      url: `${siteConfig.url}/blog/${post.slug}`,
      date: new Date(post.frontmatter.date),
      categories: post.frontmatter.tags,
    });
  }

  return new Response(feed.xml({ indent: true }), {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
