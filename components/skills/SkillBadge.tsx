import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const skillBadgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 font-mono text-xs transition-colors',
  {
    variants: {
      color: {
        gold: 'border-gold-500/30 bg-gold-500/10 text-gold-500',
        teal: 'border-teal-500/30 bg-teal-500/10 text-teal-500',
        ember: 'border-ember-500/30 bg-ember-500/10 text-ember-500',
        rose: 'border-rose-500/30 bg-rose-500/10 text-rose-500',
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
