import { ScrollReveal } from '@/components/effects/ScrollReveal';
import {
  categoryColors,
  categoryLabels,
  type SkillCategory,
  skills,
} from '@/data/skills';
import { SkillBadge } from './SkillBadge';

const categories: SkillCategory[] = [
  'frontend',
  'backend',
  'database',
  'tooling',
  'design',
];

export function SkillGrid() {
  return (
    <div className="space-y-8">
      {categories.map((category, ci) => {
        const categorySkills = skills.filter((s) => s.category === category);
        if (categorySkills.length === 0) return null;

        return (
          <ScrollReveal key={category} delay={ci * 0.05}>
            <h3 className="mb-3 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              {categoryLabels[category]}
            </h3>
            <div className="flex flex-wrap gap-2">
              {categorySkills.map((skill) => (
                <SkillBadge
                  key={skill.name}
                  name={skill.name}
                  color={
                    categoryColors[category] as
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
        );
      })}
    </div>
  );
}
