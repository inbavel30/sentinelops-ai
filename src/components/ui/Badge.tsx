// FILE: src/components/ui/Badge.tsx
import { cn } from '../../utils/cn';
import { formatSeverity, formatStatus } from '../../utils/format';

interface BadgeProps {
  variant: 'severity' | 'status' | 'custom';
  value: string;
  className?: string;
}

export function Badge({ variant, value, className }: BadgeProps) {
  const style = variant === 'severity'
    ? formatSeverity(value)
    : variant === 'status'
    ? formatStatus(value)
    : { label: value, color: 'text-muted', bg: 'bg-muted/10 border-muted/30' };

  return (
    <span className={cn(
      'inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-[0.16em]',
      style.color,
      style.bg,
      className
    )}>
      {style.label}
    </span>
  );
}