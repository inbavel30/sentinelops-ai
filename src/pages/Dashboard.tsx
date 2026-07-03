// FILE: src/pages/Dashboard.tsx
import { motion } from 'framer-motion';
import { AlertTriangle, Shield, Clock, Bot, Activity, ArrowRight, Cpu } from 'lucide-react';
import { KPICard } from '../components/dashboard/KPICard';
import { ThreatOverview } from '../components/dashboard/ThreatOverview';
import { RecentAlerts } from '../components/dashboard/RecentAlerts';
import { IncidentTrend } from '../components/dashboard/IncidentTrend';
import { AgentStatus } from '../components/dashboard/AgentStatus';
import { RecentActivity } from '../components/dashboard/RecentActivity';
import { mockData } from '../utils/mockData';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

export function Dashboard() {
  const { incidents, alerts, agents } = mockData;
  const openIncidents = incidents.filter(i => i.status === 'open').length;
  const criticalAlerts = alerts.filter(a => a.severity === 'critical').length;
  const avgResponseTime = 4.2;
  const activeAgents = agents.filter(a => a.status === 'running').length;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
      <div className="page-shell rounded-[28px] p-6 lg:p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-primary">
              <Activity className="h-3.5 w-3.5" />
              SOC Command Center
            </div>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground">Security posture overview</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-400">A focused operations view for rapid triage, alert pacing, and agent orchestration.</p>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-success/20 bg-success/10 px-4 py-3 text-sm text-success">
            <span className="status-dot online" />
            <span className="font-medium">Live telemetry connected</span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <KPICard title="Open Incidents" value={openIncidents} trend={{ value: 12, direction: 'up' }} icon={AlertTriangle} color="danger" variants={itemVariants} />
          <KPICard title="Critical Alerts" value={criticalAlerts} trend={{ value: 5, direction: 'down' }} icon={Shield} color="warning" variants={itemVariants} />
          <KPICard title="Avg Response Time" value={`${avgResponseTime}h`} trend={{ value: 8, direction: 'down' }} icon={Clock} color="primary" variants={itemVariants} />
          <KPICard title="Active Agents" value={activeAgents} trend={{ value: 2, direction: 'up' }} icon={Bot} color="success" variants={itemVariants} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.4fr_0.9fr]">
        <motion.div variants={itemVariants}><ThreatOverview /></motion.div>
        <motion.div variants={itemVariants}><RecentAlerts /></motion.div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div variants={itemVariants}><IncidentTrend /></motion.div>
        <motion.div variants={itemVariants}><AgentStatus /></motion.div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <motion.div variants={itemVariants}><RecentActivity /></motion.div>
        <motion.div variants={itemVariants}>
          <Card className="h-full p-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-sm font-semibold text-foreground">Rapid response playbook</div>
                <p className="mt-1 text-sm text-slate-400">Escalate, correlate, and act with a single click.</p>
              </div>
              <div className="rounded-2xl border border-primary/20 bg-primary/10 p-2.5 text-primary">
                <Cpu className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-6 space-y-3">
              {['Review current escalations', 'Open investigation context', 'Launch containment workflow'].map((item) => (
                <div key={item} className="flex items-center justify-between rounded-2xl border border-border/70 bg-slate-900/50 px-4 py-3">
                  <span className="text-sm text-slate-300">{item}</span>
                  <Button variant="ghost" size="sm" className="gap-1 text-primary">
                    Open <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}