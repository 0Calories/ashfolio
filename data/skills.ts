export type SkillCategory =
  | 'frontend'
  | 'backend'
  | 'database'
  | 'tooling'
  | 'design';

export interface Skill {
  name: string;
  category: SkillCategory;
  proficiency: 'expert' | 'proficient' | 'familiar';
}

export const skills: Skill[] = [
  // Frontend
  { name: 'React', category: 'frontend', proficiency: 'expert' },
  { name: 'Next.js', category: 'frontend', proficiency: 'expert' },
  { name: 'TypeScript', category: 'frontend', proficiency: 'expert' },
  { name: 'Tailwind CSS', category: 'frontend', proficiency: 'expert' },
  { name: 'Framer Motion', category: 'frontend', proficiency: 'proficient' },
  { name: 'HTML/CSS', category: 'frontend', proficiency: 'expert' },

  // Backend
  { name: 'Node.js', category: 'backend', proficiency: 'expert' },
  { name: 'Express', category: 'backend', proficiency: 'proficient' },
  { name: 'REST APIs', category: 'backend', proficiency: 'expert' },
  { name: 'Server Actions', category: 'backend', proficiency: 'proficient' },

  // Database
  { name: 'PostgreSQL', category: 'database', proficiency: 'proficient' },
  { name: 'Supabase', category: 'database', proficiency: 'proficient' },
  { name: 'Prisma', category: 'database', proficiency: 'familiar' },

  // Tooling
  { name: 'Git', category: 'tooling', proficiency: 'expert' },
  { name: 'Vercel', category: 'tooling', proficiency: 'proficient' },
  { name: 'Biome', category: 'tooling', proficiency: 'proficient' },
  { name: 'pnpm', category: 'tooling', proficiency: 'proficient' },

  // Design
  { name: 'Figma', category: 'design', proficiency: 'familiar' },
  { name: 'shadcn/ui', category: 'design', proficiency: 'proficient' },
  { name: 'Radix UI', category: 'design', proficiency: 'proficient' },
];

export const categoryLabels: Record<SkillCategory, string> = {
  frontend: 'Frontend',
  backend: 'Backend',
  database: 'Database',
  tooling: 'Tooling',
  design: 'Design',
};

export const categoryColors: Record<SkillCategory, string> = {
  frontend: 'gold',
  backend: 'teal',
  database: 'ember',
  tooling: 'rose',
  design: 'muted',
};
