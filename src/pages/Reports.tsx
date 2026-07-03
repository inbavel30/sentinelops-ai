import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Plus, Download, Filter, Search, Eye, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { mockData } from '../utils/mockData';
import { formatDate } from '../utils/format';
import { cn } from '../utils/cn';

export function Reports() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [showGenerateModal, setShowGenerateModal] = useState(false);

  const filtered = mockData.reports.filter(r => {
    const matchesSearch = r.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || r.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || r.status === selectedStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const reportTypes = ['all', 'executive', 'technical', 'incident', 'threat', 'compliance', 'custom'];
  const reportStatuses = ['all', 'draft', 'generated', 'reviewing', 'approved', 'archived'];

  const statusIcons: Record<string, React.ElementType> = {
    draft: Clock,
    generated: FileText,
    reviewing: AlertCircle,
    approved: CheckCircle,
    archived: FileText,
  };

  const typeColors: Record<string, string> = {
    executive: 'bg-primary/10 text-primary',
    technical: 'bg-success/10 text-success',
    incident: 'bg-danger/10 text-danger',
    threat: 'bg-warning/10 text-warning',
    compliance: 'bg-muted/10 text-muted',
    custom: 'bg-card border border-border text-muted',
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Reports</h1>
          <p className="text-muted text-sm mt-1">Generate, manage, and export security reports</p>
        </div>
        <Button onClick={() => setShowGenerateModal(true)}>
          <Plus className="w-4 h-4" /> Generate Report
        </Button>
      </div>

      <Card className="p-4">
        <div className="flex gap-3 flex-wrap mb-4">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search reports..."
              className="pl-10"
            />
          </div>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-4 py-2.5 bg-card border border-border rounded-lg text-foreground"
          >
            {reportTypes.map(t => <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
          </select>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2.5 bg-card border border-border rounded-lg text-foreground"
          >
            {reportStatuses.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
          </select>
          <Button variant="secondary" size="icon"><Filter className="w-4 h-4" /></Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((report, idx) => {
            const StatusIcon = statusIcons[report.status] || FileText;
            return (
              <motion.div
                key={report.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <Card hover className="h-full flex flex-col">
                  <div className="flex items-start justify-between mb-3">
                    <span className={cn('px-2 py-1 rounded-md text-xs font-medium', typeColors[report.type])}>
                      {report.type}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-muted">
                      <StatusIcon className="w-3 h-3" />
                      {report.status}
                    </div>
                  </div>
                  <h3 className="font-semibold text-foreground mb-2 line-clamp-2">{report.title}</h3>
                  <p className="text-sm text-muted line-clamp-2 mb-4 flex-1">{report.summary}</p>
                  <div className="pt-4 border-t border-border space-y-2">
                    <div className="flex items-center justify-between text-xs text-muted">
                      <span>Generated: {formatDate(report.createdAt, 'MMM D, YYYY')}</span>
                      <span>{report.incidents.length} incidents</span>
                    </div>
                    {report.aiSummary && (
                      <div className="text-xs text-primary bg-primary/5 p-2 rounded-lg line-clamp-2">
                        AI: {report.aiSummary}
                      </div>
                    )}
                    <div className="flex gap-2 pt-2">
                      <Button variant="secondary" size="sm" className="flex-1">
                        <Eye className="w-3 h-3" /> View
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Download className="w-3 h-3" /> PDF
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </Card>

      {showGenerateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm" onClick={() => setShowGenerateModal(false)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="glass-strong rounded-xl border border-border p-6 w-full max-w-lg mx-4"
          >
            <h2 className="text-xl font-bold text-foreground mb-4">Generate New Report</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Report Type</label>
                <select className="w-full px-4 py-2.5 bg-card border border-border rounded-lg text-foreground">
                  <option value="executive">Executive Summary</option>
                  <option value="technical">Technical Report</option>
                  <option value="incident">Incident Report</option>
                  <option value="threat">Threat Intelligence</option>
                  <option value="compliance">Compliance Report</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Date Range</label>
                <div className="flex gap-2">
                  <input type="date" className="flex-1 px-4 py-2.5 bg-card border border-border rounded-lg text-foreground" />
                  <input type="date" className="flex-1 px-4 py-2.5 bg-card border border-border rounded-lg text-foreground" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Severity Filter</label>
                <div className="flex gap-2 flex-wrap">
                  {['critical', 'high', 'medium', 'low'].map(s => (
                    <label key={s} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-card border border-border cursor-pointer">
                      <input type="checkbox" defaultChecked className="rounded text-primary" />
                      <span className="text-sm text-foreground capitalize">{s}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <Button className="flex-1" onClick={() => setShowGenerateModal(false)}>Generate Report</Button>
                <Button variant="secondary" className="flex-1" onClick={() => setShowGenerateModal(false)}>Cancel</Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
