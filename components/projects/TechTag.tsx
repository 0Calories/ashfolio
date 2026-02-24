import { Badge } from '@/components/ui/badge';

interface TechTagProps {
  name: string;
}

export function TechTag({ name }: TechTagProps) {
  return (
    <Badge variant="secondary" className="font-mono text-xs">
      {name}
    </Badge>
  );
}
