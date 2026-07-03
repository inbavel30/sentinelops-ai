// FILE: src/components/dashboard/IncidentTrend.tsx
import { Card } from '../ui/Card';
import { TrendingUp } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { mockData } from '../../utils/mockData';

export function IncidentTrend() {
  const data = mockData.analyticsData.incidentTrends;

  return (
    <Card>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          Incident Trends
        </h3>
        <span className="text-xs text-muted">30 days</span>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorIncidents" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00E5FF" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#00E5FF" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" />
            <XAxis dataKey="date" tick={{ fill: '#94A3B8', fontSize: 12 }} tickFormatter={(v) => v.slice(5)} />
            <YAxis tick={{ fill: '#94A3B8', fontSize: 12 }} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1E293B', border: '1px solid rgba(148,163,184,0.1)', borderRadius: '8px' }}
              itemStyle={{ color: '#F1F5F9' }}
            />
            <Area type="monotone" dataKey="value" stroke="#00E5FF" fillOpacity={1} fill="url(#colorIncidents)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}