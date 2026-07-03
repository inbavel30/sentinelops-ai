// FILE: src/pages/Incidents.tsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Filter, Search, Download } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { mockData } from '../utils/mockData';
import { formatDate } from '../utils/format';

export function Incidents() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const filtered = mockData.incidents.filter(i => {
    const matchesSearch = i.title.toLowerCase().includes(searchQuery.toLowerCase()) || i.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSeverity = selectedSeverity === 'all' || i.severity === selectedSeverity;
    const matchesStatus = selectedStatus === 'all' || i.status === selectedStatus;
    return matchesSearch && matchesSeverity && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Incidents</h1>
          <p className="text-muted text-sm mt-1">{mockData.incidents.length} total incidents</p>
        </div>
        <Button><Plus className="w-4 h-4" /> New Incident</Button>
      </div>

      <Card className="p-4">
        <div className="flex gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
            <Input 
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)} 
              placeholder="Search incidents..." 
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
          </select>
          <select 
            value={selectedStatus} 
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2.5 bg-card border border-border rounded-lg text-foreground"
          >
            <option value="all">All Statuses</option>
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>
          <Button variant="secondary" size="icon"><Filter className="w-4 h-4" /></Button>
          <Button variant="secondary" size="icon"><Download className="w-4 h-4" /></Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left text-xs font-medium text-muted uppercase tracking-wider py-3 px-4">ID</th>
                <th className="text-left text-xs font-medium text-muted uppercase tracking-wider py-3 px-4">Title</th>
                <th className="text-left text-xs font-medium text-muted uppercase tracking-wider py-3 px-4">Severity</th>
                <th className="text-left text-xs font-medium text-muted uppercase tracking-wider py-3 px-4">Status</th>
                <th className="text-left text-xs font-medium text-muted uppercase tracking-wider py-3 px-4">Assignee</th>
                <th className="text-left text-xs font-medium text-muted uppercase tracking-wider py-3 px-4">Created</th>
              </tr>
            </thead>
            <tbody>
              {filtered.slice(0, 20).map((incident) => (
                <motion.tr 
                  key={incident.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="border-b border-border hover:bg-card/50 transition-colors cursor-pointer"
                >
                  <td className="py-3 px-4 text-sm font-mono text-primary">{incident.id}</td>
                  <td className="py-3 px-4 text-sm text-foreground max-w-xs truncate">{incident.title}</td>
                  <td className="py-3 px-4"><Badge variant="severity" value={incident.severity} /></td>
                  <td className="py-3 px-4"><Badge variant="status" value={incident.status} /></td>
                  <td className="py-3 px-4 text-sm text-muted">{incident.assignee?.name || 'Unassigned'}</td>
                  <td className="py-3 px-4 text-sm text-muted">{formatDate(incident.createdAt)}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}