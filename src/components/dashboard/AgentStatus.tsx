// FILE: src/components/dashboard/AgentStatus.tsx
import { Card } from '../ui/Card';
import { Bot } from 'lucide-react';
import { mockData } from '../../utils/mockData';
import { cn } from '../../utils/cn';

export function AgentStatus() {
  const agents = mockData.agents;

  return (
    <Card>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Bot className="w-5 h-5 text-primary" />
          AI Agents
        </h3>
        <span className="text-xs text-muted">{agents.filter(a => a.status === 'running').length} active</span>
      </div>
      <div className="space-y-3">
        {agents.map((agent) => (
          <div key={agent.id} className="flex items-center gap-3 p-3 rounded-lg bg-background/50 border border-border">
            <div className={cn(
              'w-2 h-2 rounded-full',
              agent.status === 'running' && 'bg-success animate-pulse',
              agent.status === 'thinking' && 'bg-warning animate-pulse',
              agent.status === 'idle' && 'bg-muted',
              agent.status === 'error' && 'bg-danger'
            )} />
            <div className="flex-1">
              <div className="text-sm font-medium text-foreground">{agent.name}</div>
              <div className="text-xs text-muted">{agent.description}</div>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium text-foreground">{agent.metrics.totalRuns}</div>
              <div className="text-xs text-muted">runs</div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}