import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const skillBadgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 font-mono text-xs transition-colors',
  {
    variants: {
      color: {
        indigo: 'border-indigo-500/30 bg-indigo-500/10 text-indigo-400',
        cyan: 'border-cyan-500/30 bg-cyan-500/10 text-cyan-400',
        violet: 'border-violet-500/30 bg-violet-500/10 text-violet-400',
        warm: 'border-warm-500/30 bg-warm-500/10 text-warm-400',
        muted: 'border-border bg-muted text-muted-foreground',
      },
      proficiency: {
        expert: 'font-semibold',
        proficient: 'font-medium',
        familiar: 'font-normal opacity-80',
      },
    },
    defaultVariants: {
      color: 'muted',
      proficiency: 'proficient',
    },
  },
);

interface SkillBadgeProps extends VariantProps<typeof skillBadgeVariants> {
  name: string;
  className?: string;
}

export function SkillBadge({
  name,
  color,
  proficiency,
  className,
}: SkillBadgeProps) {
  return (
    <span className={cn(skillBadgeVariants({ color, proficiency }), className)}>
      {name}
    </span>
  );
}
