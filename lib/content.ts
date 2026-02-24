import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

const contentDir = path.join(process.cwd(), 'content');

export interface PostFrontmatter {
  title: string;
  description: string;
  date: string;
  tags: string[];
  image?: string;
  published: boolean;
}

export interface Post {
  slug: string;
  frontmatter: PostFrontmatter;
  readingTime: string;
  content: string;
}

export interface ProjectFrontmatter {
  title: string;
  description: string;
  date: string;
  tags: string[];
  image?: string;
  video?: string;
  github?: string;
  live?: string;
  featured: boolean;
  published: boolean;
}

export interface Project {
  slug: string;
  frontmatter: ProjectFrontmatter;
  content: string;
}

function getMdxFiles(dir: string): string[] {
  const fullDir = path.join(contentDir, dir);
  if (!fs.existsSync(fullDir)) return [];
  return fs
    .readdirSync(fullDir)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => file.replace(/\.mdx$/, ''));
}

function readMdxFile(
  dir: string,
  slug: string,
): { data: Record<string, unknown>; content: string } {
  const filePath = path.join(contentDir, dir, `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, 'utf-8');
  return matter(raw);
}

// ─── Blog Posts ───

export function getAllPosts(): Post[] {
  const slugs = getMdxFiles('blog');
  return slugs
    .map((slug) => {
      const { data, content } = readMdxFile('blog', slug);
      const fm = data as unknown as PostFrontmatter;
      if (!fm.published) return null;
      return {
        slug,
        frontmatter: fm,
        readingTime: readingTime(content).text,
        content,
      };
    })
    .filter(Boolean)
    .sort(
      (a, b) =>
        new Date(b!.frontmatter.date).getTime() -
        new Date(a!.frontmatter.date).getTime(),
    ) as Post[];
}

export function getPostBySlug(slug: string): Post | null {
  try {
    const { data, content } = readMdxFile('blog', slug);
    const fm = data as unknown as PostFrontmatter;
    return {
      slug,
      frontmatter: fm,
      readingTime: readingTime(content).text,
      content,
    };
  } catch {
    return null;
  }
}

export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tagSet = new Set<string>();
  for (const post of posts) {
    for (const tag of post.frontmatter.tags) {
      tagSet.add(tag);
    }
  }
  return Array.from(tagSet).sort();
}

// ─── Projects ───

export function getAllProjects(): Project[] {
  const slugs = getMdxFiles('projects');
  return slugs
    .map((slug) => {
      const { data, content } = readMdxFile('projects', slug);
      const fm = data as unknown as ProjectFrontmatter;
      if (!fm.published) return null;
      return { slug, frontmatter: fm, content };
    })
    .filter(Boolean)
    .sort(
      (a, b) =>
        new Date(b!.frontmatter.date).getTime() -
        new Date(a!.frontmatter.date).getTime(),
    ) as Project[];
}

export function getProjectBySlug(slug: string): Project | null {
  try {
    const { data, content } = readMdxFile('projects', slug);
    const fm = data as unknown as ProjectFrontmatter;
    return { slug, frontmatter: fm, content };
  } catch {
    return null;
  }
}

export function getFeaturedProjects(): Project[] {
  return getAllProjects().filter((p) => p.frontmatter.featured);
}
