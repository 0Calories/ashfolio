import { ScrollReveal } from '@/components/effects/ScrollReveal';
import { Badge } from '@/components/ui/badge';
import { skills } from '@/data/skills';

const featured = skills.filter((s) => s.proficiency === 'expert');

export function SkillsPreview() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-24">
      <ScrollReveal>
        <h2 className="text-3xl font-bold">Skills</h2>
        <p className="mt-2 text-muted-foreground">
          Technologies I work with daily.
        </p>
      </ScrollReveal>
      <ScrollReveal delay={0.1}>
        <div className="mt-8 flex flex-wrap gap-2">
          {featured.map((skill) => (
            <Badge
              key={skill.name}
              variant="secondary"
              className="font-mono text-xs"
            >
              {skill.name}
            </Badge>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}
