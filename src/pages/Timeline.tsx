import { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, ChevronRight, ChevronDown, User, Bot, AlertTriangle, FileText, Shield, MessageSquare, CheckCircle } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { formatDate, formatDuration } from '../utils/format';
import { cn } from '../utils/cn';

interface TimelineNode {
  id: string;
  type: 'alert' | 'comment' | 'action' | 'evidence' | 'status_change' | 'assignment' | 'ai_analysis' | 'enrichment';
  title: string;
  description: string;
  timestamp: string;
  actor?: { name: string; type: 'user' | 'agent' | 'system' };
  metadata?: Record<string, string>;
  children?: TimelineNode[];
}

const timelineData: TimelineNode[] = [
  {
    id: '1',
    type: 'alert',
    title: 'Critical Alert Triggered',
    description: 'CrowdStrike Falcon detected suspicious PowerShell execution on WS-042',
    timestamp: '2024-07-02T08:15:00Z',
    actor: { name: 'CrowdStrike Falcon', type: 'system' },
    metadata: { severity: 'critical', rule: 'Suspicious PowerShell Execution' },
    children: [
      {
        id: '1-1',
        type: 'enrichment',
        title: 'Auto-Enrichment Complete',
        description: 'VirusTotal analysis: 45/70 engines flagged the process hash as malicious',
        timestamp: '2024-07-02T08:16:30Z',
        actor: { name: 'Triage Agent', type: 'agent' },
      }
    ]
  },
  {
    id: '2',
    type: 'action',
    title: 'Incident Auto-Created',
    description: 'Triage Agent created incident INC-2024-0042 based on critical alert correlation',
    timestamp: '2024-07-02T08:17:00Z',
    actor: { name: 'Triage Agent', type: 'agent' },
    metadata: { incident_id: 'INC-2024-0042', confidence: '0.94' },
  },
  {
    id: '3',
    type: 'assignment',
    title: 'Incident Assigned',
    description: 'Auto-assigned to Sarah Chen based on workload and expertise matching',
    timestamp: '2024-07-02T08:18:00Z',
    actor: { name: 'System', type: 'system' },
    metadata: { assignee: 'Sarah Chen', reason: 'workload_balance' },
  },
  {
    id: '4',
    type: 'ai_analysis',
    title: 'AI Investigation Started',
    description: 'Investigation Agent began deep-dive analysis of lateral movement patterns',
    timestamp: '2024-07-02T08:20:00Z',
    actor: { name: 'Investigation Agent', type: 'agent' },
    metadata: { systems_affected: '5', techniques: 'T1059, T1055' },
    children: [
      {
        id: '4-1',
        type: 'evidence',
        title: 'Evidence Collected',
        description: 'Memory dump and network capture collected from affected endpoints',
        timestamp: '2024-07-02T08:35:00Z',
        actor: { name: 'Investigation Agent', type: 'agent' },
      },
      {
        id: '4-2',
        type: 'enrichment',
        title: 'Threat Intel Enrichment',
        description: 'Correlated with APT29 campaign indicators from MISP and VirusTotal',
        timestamp: '2024-07-02T08:45:00Z',
        actor: { name: 'Investigation Agent', type: 'agent' },
      }
    ]
  },
  {
    id: '5',
    type: 'comment',
    title: 'Analyst Note Added',
    description: 'Confirmed APT29 activity pattern. Recommend immediate containment of affected systems.',
    timestamp: '2024-07-02T09:00:00Z',
    actor: { name: 'Sarah Chen', type: 'user' },
  },
  {
    id: '6',
    type: 'action',
    title: 'Containment Executed',
    description: 'Response Agent isolated 5 endpoints and blocked 12 malicious IPs at firewall',
    timestamp: '2024-07-02T09:15:00Z',
    actor: { name: 'Response Agent', type: 'agent' },
    metadata: { endpoints: '5', ips_blocked: '12', duration: '45s' },
  },
  {
    id: '7',
    type: 'status_change',
    title: 'Status Updated',
    description: 'Incident status changed from Open to In Progress',
    timestamp: '2024-07-02T09:20:00Z',
    actor: { name: 'Sarah Chen', type: 'user' },
    metadata: { from: 'open', to: 'in_progress' },
  },
  {
    id: '8',
    type: 'evidence',
    title: 'Forensic Report Generated',
    description: 'Complete forensic analysis report with timeline reconstruction generated',
    timestamp: '2024-07-02T10:00:00Z',
    actor: { name: 'Investigation Agent', type: 'agent' },
  },
];

const typeConfig: Record<string, { icon: React.ElementType; color: string; bg: string }> = {
  alert: { icon: AlertTriangle, color: 'text-danger', bg: 'bg-danger/10' },
  comment: { icon: MessageSquare, color: 'text-primary', bg: 'bg-primary/10' },
  action: { icon: Shield, color: 'text-success', bg: 'bg-success/10' },
  evidence: { icon: FileText, color: 'text-warning', bg: 'bg-warning/10' },
  status_change: { icon: CheckCircle, color: 'text-primary', bg: 'bg-primary/10' },
  assignment: { icon: User, color: 'text-muted', bg: 'bg-muted/10' },
  ai_analysis: { icon: Bot, color: 'text-primary', bg: 'bg-primary/10' },
  enrichment: { icon: FileText, color: 'text-success', bg: 'bg-success/10' },
};

function TimelineNodeComponent({ node, depth = 0 }: { node: TimelineNode; depth?: number }) {
  const [expanded, setExpanded] = useState(true);
  const config = typeConfig[node.type] || typeConfig.comment;
  const Icon = config.icon;
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className={cn('relative', depth > 0 && 'ml-8 mt-3')}> 
      <div className="flex gap-4">
        <div className="flex flex-col items-center">
          <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center', config.bg)}>
            <Icon className={cn('w-5 h-5', config.color)} />
          </div>
          {hasChildren && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="mt-1 p-0.5 rounded text-muted hover:text-foreground transition-colors"
            >
              {expanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>
          )}
          {depth === 0 && <div className="w-px flex-1 bg-border mt-2" />}
        </div>
        <div className="flex-1 pb-6">
          <Card className="p-4">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h4 className="font-semibold text-foreground">{node.title}</h4>
                <p className="text-sm text-muted mt-1">{node.description}</p>
              </div>
              <span className="text-xs text-muted whitespace-nowrap">{formatDate(node.timestamp, 'HH:mm')}</span>
            </div>
            {node.actor && (
              <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border">
                {node.actor.type === 'user' && <User className="w-3 h-3 text-muted" />}
                {node.actor.type === 'agent' && <Bot className="w-3 h-3 text-primary" />}
                {node.actor.type === 'system' && <Shield className="w-3 h-3 text-success" />}
                <span className="text-xs text-muted">{node.actor.name}</span>
              </div>
            )}
            {node.metadata && (
              <div className="flex flex-wrap gap-2 mt-3">
                {Object.entries(node.metadata).map(([key, value]) => (
                  <span key={key} className="px-2 py-1 rounded-md bg-card border border-border text-xs text-muted">
                    {key}: {value}
                  </span>
                ))}
              </div>
            )}
          </Card>
          {hasChildren && expanded && (
            <div className="mt-3 space-y-3">
              {node.children!.map(child => (
                <TimelineNodeComponent key={child.id} node={child} depth={depth + 1} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function Timeline() {
  const [filter, setFilter] = useState<string>('all');
  const filters = ['all', 'alert', 'action', 'ai_analysis', 'evidence', 'comment'];

  const filtered = filter === 'all' ? timelineData : timelineData.filter(n => n.type === filter);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Investigation Timeline</h1>
          <p className="text-muted text-sm mt-1">Incident INC-2024-0042 • Ransomware Deployment on File Server FS-01</p>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-muted" />
          <span className="text-sm text-muted">Duration: {formatDuration(7200)}</span>
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        {filters.map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              'px-3 py-1.5 rounded-lg text-xs font-medium transition-all capitalize',
              filter === f ? 'bg-primary/10 text-primary border border-primary/30' : 'text-muted hover:text-foreground hover:bg-card'
            )}
          >
            {f.replace('_', ' ')}
          </button>
        ))}
      </div>

      <div className="relative">
        <div className="space-y-0">
          {filtered.map((node, idx) => (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <TimelineNodeComponent node={node} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
