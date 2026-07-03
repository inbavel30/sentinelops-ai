// FILE: src/components/dashboard/RecentActivity.tsx
import { Card } from '../ui/Card';
import { Activity, Bot, AlertTriangle, FileText } from 'lucide-react';
import type { Incident, Alert, AIAgent } from '../../types';
import { mockData } from '../../utils/mockData';
import { formatRelative } from '../../utils/format';

type ActivityItem =
  | { type: 'incident'; data: Incident }
  | { type: 'alert'; data: Alert }
  | { type: 'agent'; data: AIAgent };

export function RecentActivity() {
  const activities: ActivityItem[] = [
    ...mockData.incidents.slice(0, 3).map(i => ({ type: 'incident' as const, data: i })),
    ...mockData.alerts.slice(0, 3).map(a => ({ type: 'alert' as const, data: a })),
    ...mockData.agents.slice(0, 2).map(a => ({ type: 'agent' as const, data: a })),
  ].sort(() => Math.random() - 0.5).slice(0, 6);

  const getIcon = (type: string) => {
    switch (type) {
      case 'incident': return AlertTriangle;
      case 'alert': return Activity;
      case 'agent': return Bot;
      default: return FileText;
    }
  };

  return (
    <Card>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Activity className="w-5 h-5 text-primary" />
          Recent Activity
        </h3>
      </div>
      <div className="space-y-4">
        {activities.map((activity, idx) => {
          const Icon = getIcon(activity.type);
          const timestamp =
            activity.type === 'agent'
              ? activity.data.metrics.lastRunAt
              : activity.data.createdAt;

          return (
            <div key={idx} className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Icon className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1">
                <div className="text-sm text-foreground">
                  {activity.type === 'incident' && `Incident ${activity.data.id} created: ${activity.data.title}`}
                  {activity.type === 'alert' && `Alert triggered: ${activity.data.title}`}
                  {activity.type === 'agent' && `Agent ${activity.data.name} completed ${activity.data.metrics.totalRuns} runs`}
                </div>
                <div className="text-xs text-muted mt-1">{timestamp ? formatRelative(timestamp) : ''}</div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}