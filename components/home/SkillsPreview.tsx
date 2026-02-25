import { ScrollReveal } from '@/components/effects/ScrollReveal';
import { SkillBadge } from '@/components/skills/SkillBadge';
import {
  categoryColors,
  skills,
  type SkillCategory,
} from '@/data/skills';

const featured = skills.filter((s) => s.proficiency === 'expert');

export function SkillsPreview() {
  return (
    <section className="relative mx-auto max-w-5xl px-6 py-24 before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:bg-gradient-to-b before:from-cyan-500/[0.03] before:via-transparent before:to-transparent">
      <ScrollReveal>
        <div className="mb-4 h-0.5 w-8 rounded-full bg-cyan-400" />
        <h2 className="text-3xl font-bold">Skills</h2>
        <p className="mt-2 text-muted-foreground">
          Technologies I work with daily.
        </p>
      </ScrollReveal>
      <ScrollReveal delay={0.1}>
        <div className="mt-8 flex flex-wrap gap-2">
          {featured.map((skill) => (
            <SkillBadge
              key={skill.name}
              name={skill.name}
              color={
                categoryColors[skill.category as SkillCategory] as
                  | 'indigo'
                  | 'cyan'
                  | 'violet'
                  | 'warm'
                  | 'muted'
              }
              proficiency={skill.proficiency}
            />
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}
