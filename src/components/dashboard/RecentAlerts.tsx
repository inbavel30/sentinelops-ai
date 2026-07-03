// FILE: src/components/dashboard/RecentAlerts.tsx
import { Card } from '../ui/Card';
import { Bell, ChevronRight } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { mockData } from '../../utils/mockData';
import { formatRelative } from '../../utils/format';

export function RecentAlerts() {
  const alerts = mockData.alerts.slice(0, 5);

  return (
    <Card className="h-full p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground">
            <Bell className="h-5 w-5 text-primary" />
            Recent alerts
          </h3>
          <p className="mt-1 text-sm text-slate-400">High priority events requiring analyst attention.</p>
        </div>
        <button className="flex items-center gap-1 text-xs font-semibold text-primary transition-colors hover:text-primary/80">
          View all <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>
      <div className="space-y-3">
        {alerts.map((alert) => (
          <div key={alert.id} className="flex cursor-pointer items-start gap-3 rounded-2xl border border-border/70 bg-slate-900/50 p-3 transition-all hover:border-primary/20 hover:bg-slate-900/80">
            <Badge variant="severity" value={alert.severity} />
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-semibold text-foreground">{alert.title}</div>
              <div className="mt-1 text-xs text-slate-500">{alert.source}</div>
            </div>
            <span className="whitespace-nowrap text-xs text-slate-500">{formatRelative(alert.createdAt)}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}