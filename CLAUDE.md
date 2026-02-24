# Ashfolio

Developer portfolio for Ash — a full-stack engineer specializing in React, Next.js, and Node.js.

## Stack

- **Framework**: Next.js 16 (App Router, React 19, React Compiler enabled)
- **Language**: TypeScript 5 (strict mode)
- **Styling**: Tailwind CSS 4 + shadcn/ui + Radix UI
- **Animation**: Framer Motion (via `motion` package)
- **Content**: MDX files in repo (next-mdx-remote/rsc)
- **Syntax highlighting**: Shiki via rehype-pretty-code
- **Forms**: React Hook Form + Zod
- **Email**: Resend (server action)
- **Theme**: next-themes + CSS custom properties (dark default + light toggle)
- **Fonts**: Bricolage Grotesque (display) + Instrument Sans (body) + JetBrains Mono (code)
- **Linting/Formatting**: Biome (single quotes, 2-space indent, organized imports)
- **Deployment**: Vercel
- **Package Manager**: pnpm

## Project Structure

```
app/
  layout.tsx              # Root layout: fonts, theme provider, header/footer
  page.tsx                # Home (hero, featured projects, skills, recent posts)
  blog/
    page.tsx              # Blog listing
    [slug]/page.tsx       # Blog post (MDX, TOC, syntax highlighting)
  projects/
    page.tsx              # Project grid
    [slug]/page.tsx       # Project detail (gallery, video, MDX writeup)
  about/page.tsx          # Bio, skill badges, timeline, resume download
  contact/
    page.tsx              # Contact form + social links
    actions.ts            # Resend server action
  sitemap.ts              # Dynamic sitemap
  robots.ts               # robots.txt
  feed.xml/route.ts       # RSS feed
  og/[...slug]/route.tsx  # Dynamic OG images
  not-found.tsx           # Custom 404
  globals.css             # Full design system (OKLCH colors, dark/light themes)
components/
  ui/                     # shadcn/ui components
  layout/                 # Header, Footer, ThemeToggle
  home/                   # Hero, FeaturedProjects, SkillsPreview, RecentPosts
  blog/                   # PostCard, MDXComponents, TableOfContents, PostHeader
  projects/               # ProjectCard, TechTag, VideoEmbed
  skills/                 # SkillBadge, SkillGrid
  contact/                # ContactForm
  effects/                # EmberParticles, ScrollReveal, PageTransition
  theme-provider.tsx
content/
  blog/                   # .mdx blog posts
  projects/               # .mdx project pages
lib/
  mdx.ts                  # MDX compilation with Shiki
  content.ts              # Content fetching (frontmatter parsing, reading time)
  resend.ts               # Email client
  fonts.ts                # Font configuration
  metadata.ts             # JSON-LD helpers
  utils.ts                # cn() utility
data/
  skills.ts               # Skill definitions
  navigation.ts           # Nav config
  site.ts                 # Site metadata
```

## Design System

### Color System (OKLCH)

- Dark mode (default): Deep charcoal-navy background with warm amber-gold accents
- Light mode: Warm off-white with deeper amber for contrast
- Named accent palette: ember, gold, teal, rose (400/500/600 shades)

### Color Usage Rules

- Backgrounds: `bg-background`, `bg-card`, `bg-muted` — NEVER `bg-white` or `bg-gray-*`
- Text: `text-foreground`, `text-muted-foreground` — NEVER `text-gray-*`
- Borders: `border-border`, `ring-foreground/10` — NEVER `border-gray-*`
- Accents: Named ember/gold/teal/rose colors for intentional highlights only
- No `dark:` overrides for theme-controlled properties

### Typography

- Display (h1-h3): `font-display` (Bricolage Grotesque)
- Body: `font-sans` (Instrument Sans)
- Code: `font-mono` (JetBrains Mono)

## Architecture Patterns

- **Server Components by default.** Add `'use client'` only when interactivity is needed.
- **Content via MDX.** Blog posts and project pages are `.mdx` files in `content/`.
- **Server Actions for mutations only.** Contact form uses a server action.
- **Theme via CSS custom properties.** Mapped through Tailwind's `@theme inline`.

## Adding Content

### New blog post
Create `content/blog/my-post.mdx`:
```yaml
---
title: My Post Title
description: A short description.
date: '2025-01-01'
tags: ['React', 'Next.js']
published: true
---
```

### New project
Create `content/projects/my-project.mdx`:
```yaml
---
title: Project Name
description: What it does.
date: '2025-01-01'
tags: ['React', 'TypeScript']
image: /images/projects/my-project.png
github: https://github.com/...
live: https://...
featured: true
published: true
---
```

## Common Commands

```bash
pnpm dev              # Start dev server
pnpm build            # Production build
pnpm biome check --write  # Lint + format
pnpm biome format --write .  # Format only
```

## Environment Variables

```
RESEND_API_KEY=       # Resend API key for contact form
CONTACT_EMAIL=        # Email to receive contact form submissions
```
