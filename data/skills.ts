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
  { name: 'JavaScript', category: 'frontend', proficiency: 'expert' },
  { name: 'Tailwind CSS', category: 'frontend', proficiency: 'expert' },
  { name: 'HTML/CSS', category: 'frontend', proficiency: 'expert' },
  { name: 'TanStack Query', category: 'frontend', proficiency: 'proficient' },
  { name: 'Zustand', category: 'frontend', proficiency: 'proficient' },
  { name: 'Framer Motion', category: 'frontend', proficiency: 'proficient' },
  { name: 'Jest', category: 'frontend', proficiency: 'proficient' },
  {
    name: 'React Testing Library',
    category: 'frontend',
    proficiency: 'proficient',
  },

  // Backend
  { name: 'Node.js', category: 'backend', proficiency: 'expert' },
  { name: 'Express', category: 'backend', proficiency: 'proficient' },
  { name: 'Python', category: 'backend', proficiency: 'proficient' },
  { name: 'Django', category: 'backend', proficiency: 'familiar' },
  { name: 'REST APIs', category: 'backend', proficiency: 'expert' },

  // Database
  { name: 'PostgreSQL', category: 'database', proficiency: 'proficient' },
  { name: 'MongoDB', category: 'database', proficiency: 'proficient' },
  { name: 'Supabase', category: 'database', proficiency: 'proficient' },

  // Tooling
  { name: 'Git', category: 'tooling', proficiency: 'expert' },
  { name: 'Docker', category: 'tooling', proficiency: 'proficient' },
  { name: 'GitHub Actions', category: 'tooling', proficiency: 'proficient' },
  { name: 'Vercel', category: 'tooling', proficiency: 'proficient' },
  { name: 'GCP', category: 'tooling', proficiency: 'familiar' },
  { name: 'Webpack', category: 'tooling', proficiency: 'proficient' },
  { name: 'Vite', category: 'tooling', proficiency: 'proficient' },
  { name: 'Biome', category: 'tooling', proficiency: 'proficient' },

  // Design
  { name: 'Figma', category: 'design', proficiency: 'proficient' },
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
  frontend: 'indigo',
  backend: 'cyan',
  database: 'violet',
  tooling: 'warm',
  design: 'muted',
};
