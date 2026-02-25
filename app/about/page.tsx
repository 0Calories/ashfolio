import { Download } from 'lucide-react';
import type { Metadata } from 'next';
import { ScrollReveal } from '@/components/effects/ScrollReveal';
import { SkillGrid } from '@/components/skills/SkillGrid';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'About',
  description: 'More about me',
};

const timeline = [
  {
    year: '2025 - 2026',
    title: 'Building Hibana ',
    description:
      'Creating a gamified productivity platform that leverages behavioural neuroscience research to make it easy and addicting to take control of your life. Built using Next.js 16 and Supabase.',
  },
  {
    year: '2022 – 2025',
    title: 'Software Engineer at Sentry',
    description: `Worked full-time as a software engineer at Sentry.io - a SaaS used by 4M+ developers and 150K+ organizations worldwide. 
      Launched MongoDB Query Insights feature to over 1,500+ orgs. 
      Authored a build-time Babel plugin for the Sentry ecosystem with 4.6M+ weekly NPM downloads.`,
  },
  {
    year: '2020 – 2021',
    title: 'Software Developer at Agriculture Canada',
  },
  {
    year: '2015 – 2019',
    title: 'BASc Software Engineering — University of Ottawa',
    description: 'Studied software engineering',
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
            I&apos;m a fullstack software engineer with 4.5 years of
            professional experience building developer tools at scale. Based in{' '}
            <span className="font-medium text-foreground">Toronto, Canada</span>
            .
          </p>
          <p>
            Most recently, I was a core contributor to{' '}
            <span className="font-medium text-foreground">
              Sentry&apos;s open-source platform
            </span>
            , serving 100K+ organizations and millions of developers. I authored{' '}
            <span className="font-medium text-foreground">
              @sentry/babel-plugin-component-annotate
            </span>
            , a Babel plugin that sees 4.6M+ weekly downloads on NPM.
          </p>
          <p>
            I care deeply about performance, developer experience, and shipping
            reliable software. I&apos;ve delivered features from conception
            through general availability with zero-incident launches — across a
            globally distributed SaaS platform built with React, TypeScript, and
            Python.
          </p>
          <p>
            Right now, I&apos;m building{' '}
            <span className="font-medium text-foreground">Hibana</span> — a
            gamified productivity platform that leverages behavioral psychology
            to help users build lasting habits.
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
        {timeline.map((entry, i) => (
          <ScrollReveal key={entry.year} delay={i * 0.05}>
            <div className="relative border-l-2 border-border py-6 pl-8">
              <div className="absolute -left-[9px] top-7 size-4 rounded-full border-2 border-primary bg-background" />
              <span className="font-mono text-sm text-primary">
                {entry.year}
              </span>
              <h3 className="mt-1 text-lg font-semibold">{entry.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {entry.description}
              </p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
