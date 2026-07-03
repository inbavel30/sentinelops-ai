// FILE: src/components/dashboard/KPICard.tsx
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, type LucideIcon } from 'lucide-react';
import { cn } from '../../utils/cn';

interface KPICardProps {
  title: string;
  value: string | number;
  trend: { value: number; direction: 'up' | 'down' };
  icon: LucideIcon;
  color: 'primary' | 'success' | 'warning' | 'danger';
  variants: any;
}

export function KPICard({ title, value, trend, icon: Icon, color, variants }: KPICardProps) {
  const colorMap = {
    primary: 'text-primary bg-primary/10 border-primary/25',
    success: 'text-success bg-success/10 border-success/25',
    warning: 'text-warning bg-warning/10 border-warning/25',
    danger: 'text-danger bg-danger/10 border-danger/25',
  };

  return (
    <motion.div variants={variants} className="card-hover rounded-[24px] border border-border/70 bg-slate-950/60 p-5 shadow-[0_12px_32px_rgba(2,6,23,0.22)]">
      <div className="flex items-start justify-between">
        <div className={cn('rounded-2xl border p-2.5', colorMap[color])}>
          <Icon className="h-5 w-5" />
        </div>
        <div className={cn('flex items-center gap-1 text-xs font-semibold', trend.direction === 'up' ? 'text-success' : 'text-danger')}>
          {trend.direction === 'up' ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
          {trend.value}%
        </div>
      </div>
      <div className="mt-5">
        <div className="text-3xl font-semibold tracking-tight text-foreground">{value}</div>
        <div className="mt-1 text-sm text-slate-400">{title}</div>
      </div>
    </motion.div>
  );
}