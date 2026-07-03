import { useState } from 'react';
import { motion } from 'framer-motion';
import { ClipboardList, Download, Search, User, AlertTriangle, FileText, Settings, Bot } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { mockData } from '../utils/mockData';
import { formatDate } from '../utils/format';
import { cn } from '../utils/cn';

export function Audit() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');
  const [selectedAction, setSelectedAction] = useState<string>('all');

  const filtered = mockData.auditLogs.filter(log => {
    const matchesSearch = log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         log.actor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         log.target.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSeverity = selectedSeverity === 'all' || log.severity === selectedSeverity;
    const matchesAction = selectedAction === 'all' || log.action === selectedAction;
    return matchesSearch && matchesSeverity && matchesAction;
  });

  const actionIcons: Record<string, React.ElementType> = {
    CREATE_INCIDENT: FileText,
    UPDATE_INCIDENT: FileText,
    DELETE_INCIDENT: AlertTriangle,
    LOGIN: User,
    LOGOUT: User,
    EXPORT_REPORT: Download,
    RUN_AGENT: Bot,
    UPDATE_SETTINGS: Settings,
    CREATE_USER: User,
    DELETE_USER: AlertTriangle,
  };

  const severityConfig = {
    critical: { color: 'text-danger', bg: 'bg-danger/10', border: 'border-danger/30' },
    high: { color: 'text-orange-500', bg: 'bg-orange-500/10', border: 'border-orange-500/30' },
    medium: { color: 'text-warning', bg: 'bg-warning/10', border: 'border-warning/30' },
    low: { color: 'text-success', bg: 'bg-success/10', border: 'border-success/30' },
    info: { color: 'text-primary', bg: 'bg-primary/10', border: 'border-primary/30' },
  };

  const uniqueActions = Array.from(new Set(mockData.auditLogs.map(l => l.action)));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Audit Logs</h1>
          <p className="text-muted text-sm mt-1">Complete activity and change tracking</p>
        </div>
        <Button variant="secondary">
          <Download className="w-4 h-4" /> Export CSV
        </Button>
      </div>

      <Card className="p-4">
        <div className="flex gap-3 flex-wrap mb-4">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search audit logs..."
              className="pl-10"
            />
          </div>
          <select
            value={selectedSeverity}
            onChange={(e) => setSelectedSeverity(e.target.value)}
            className="px-4 py-2.5 bg-card border border-border rounded-lg text-foreground"
          >
            <option value="all">All Severities</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
            <option value="info">Info</option>
          </select>
          <select
            value={selectedAction}
            onChange={(e) => setSelectedAction(e.target.value)}
            className="px-4 py-2.5 bg-card border border-border rounded-lg text-foreground"
          >
            <option value="all">All Actions</option>
            {uniqueActions.map(action => (
              <option key={action} value={action}>{action.replace(/_/g, ' ')}</option>
            ))}
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left text-xs font-medium text-muted uppercase tracking-wider py-3 px-4">Action</th>
                <th className="text-left text-xs font-medium text-muted uppercase tracking-wider py-3 px-4">Actor</th>
                <th className="text-left text-xs font-medium text-muted uppercase tracking-wider py-3 px-4">Target</th>
                <th className="text-left text-xs font-medium text-muted uppercase tracking-wider py-3 px-4">Severity</th>
                <th className="text-left text-xs font-medium text-muted uppercase tracking-wider py-3 px-4">IP Address</th>
                <th className="text-left text-xs font-medium text-muted uppercase tracking-wider py-3 px-4">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {filtered.slice(0, 50).map((log, idx) => {
                const ActionIcon = actionIcons[log.action] || ClipboardList;
                const sev = severityConfig[log.severity] || severityConfig.info;
                return (
                  <motion.tr
                    key={log.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: idx * 0.02 }}
                    className="border-b border-border hover:bg-card/50 transition-colors"
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <ActionIcon className="w-4 h-4 text-muted" />
                        <span className="text-sm text-foreground">{log.action.replace(/_/g, ' ')}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-primary text-xs font-bold">{log.actor.name.charAt(0)}</span>
                        </div>
                        <span className="text-sm text-foreground">{log.actor.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-muted font-mono">{log.target}</td>
                    <td className="py-3 px-4">
                      <span className={cn('px-2 py-1 rounded-full text-xs font-medium border', sev.bg, sev.color, sev.border)}>
                        {log.severity}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-muted font-mono">{log.ipAddress}</td>
                    <td className="py-3 px-4 text-sm text-muted">{formatDate(log.timestamp)}</td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
          <span className="text-sm text-muted">Showing {Math.min(50, filtered.length)} of {filtered.length} entries</span>
          <div className="flex gap-2">
            <Button variant="secondary" size="sm">Previous</Button>
            <Button variant="secondary" size="sm">Next</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
