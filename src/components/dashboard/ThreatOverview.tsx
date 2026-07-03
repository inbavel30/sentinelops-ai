// FILE: src/components/dashboard/ThreatOverview.tsx
import { Card } from '../ui/Card';
import { Target } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { mockData } from '../../utils/mockData';
import { CHART_COLORS } from '../../utils/constants';

export function ThreatOverview() {
  const data = mockData.analyticsData.severityDistribution;

  return (
    <Card className="h-full p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground">
            <Target className="h-5 w-5 text-primary" />
            Threat overview
          </h3>
          <p className="mt-1 text-sm text-slate-400">Current distribution across priority detections.</p>
        </div>
        <span className="rounded-full border border-border/70 bg-slate-900/60 px-2.5 py-1 text-[11px] uppercase tracking-[0.24em] text-slate-500">Last 30 days</span>
      </div>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
        <div className="h-48 w-full max-w-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} cx="50%" cy="50%" innerRadius={58} outerRadius={84} paddingAngle={4} dataKey="value">
                {data.map((entry, index) => (
                  <Cell key={index} fill={entry.color || CHART_COLORS[index]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#111827', border: '1px solid rgba(148,163,184,0.16)', borderRadius: '12px' }} itemStyle={{ color: '#F8FAFC' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex-1 space-y-3">
          {data.map((item, index) => (
            <div key={item.name} className="flex items-center justify-between rounded-2xl border border-border/70 bg-slate-900/50 px-3 py-2.5">
              <div className="flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color || CHART_COLORS[index] }} />
                <span className="text-sm text-slate-300">{item.name}</span>
              </div>
              <span className="text-sm font-semibold text-foreground">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}