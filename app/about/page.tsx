import { Download } from 'lucide-react';
import type { Metadata } from 'next';
import { ScrollReveal } from '@/components/effects/ScrollReveal';
import { SkillGrid } from '@/components/skills/SkillGrid';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'About',
  description:
    'About Ash — full-stack developer building polished web experiences.',
};

const timeline = [
  {
    year: '2025',
    title: 'Building Hibana',
    description:
      'Created a gamified habit tracker with Next.js 16, Supabase, and Framer Motion.',
  },
  {
    year: '2024',
    title: 'Full-Stack Development',
    description:
      'Deepened expertise in React Server Components, Server Actions, and modern Next.js patterns.',
  },
  {
    year: '2023',
    title: 'React & TypeScript',
    description:
      'Focused on building production applications with React, TypeScript, and Node.js.',
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 pt-32 pb-16">
      <ScrollReveal>
        <h1 className="text-4xl font-bold">About</h1>
      </ScrollReveal>

      {/* Bio */}
      <ScrollReveal delay={0.1}>
        <div className="mt-8 space-y-4 text-muted-foreground leading-relaxed">
          <p>
            I&apos;m a full-stack developer who builds polished, performant web
            experiences. I work primarily with{' '}
            <span className="font-medium text-foreground">React</span>,{' '}
            <span className="font-medium text-foreground">Next.js</span>, and{' '}
            <span className="font-medium text-foreground">Node.js</span>.
          </p>
          <p>
            I care deeply about user experience, design systems, and writing
            clean, maintainable code. I believe the best software is built with
            attention to detail — from the architecture to the animations.
          </p>
          <p>
            Currently, I&apos;m building{' '}
            <span className="font-medium text-foreground">Hibana</span>, a
            gamified habit tracker that uses fire metaphors to make building
            habits engaging.
          </p>
        </div>
      </ScrollReveal>

      {/* Resume */}
      <ScrollReveal delay={0.15}>
        <div className="mt-8">
          <Button asChild variant="outline" size="sm">
            <a href="/resume.pdf" download>
              <Download className="size-4" />
              Download Resume
            </a>
          </Button>
        </div>
      </ScrollReveal>

      {/* Skills */}
      <ScrollReveal delay={0.2}>
        <h2 className="mt-16 mb-8 text-2xl font-bold">Skills</h2>
      </ScrollReveal>
      <SkillGrid />

      {/* Timeline */}
      <ScrollReveal delay={0.1}>
        <h2 className="mt-16 mb-8 text-2xl font-bold">Timeline</h2>
      </ScrollReveal>
      <div className="space-y-0">
        {timeline.map((item, i) => (
          <ScrollReveal key={item.year} delay={i * 0.05}>
            <div className="relative border-l-2 border-border py-6 pl-8">
              <div className="absolute -left-[9px] top-7 size-4 rounded-full border-2 border-primary bg-background" />
              <span className="font-mono text-sm text-primary">
                {item.year}
              </span>
              <h3 className="mt-1 text-lg font-semibold">{item.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {item.description}
              </p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
