import { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Clock, Target, Users, Shield, AlertTriangle } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { mockData } from '../utils/mockData';
import { cn } from '../utils/cn';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Legend
} from 'recharts';
import { CHART_COLORS } from '../utils/constants';

export function Analytics() {
  const [activeTab, setActiveTab] = useState<'overview' | 'trends' | 'productivity' | 'attacks'>('overview');
  const { analyticsData } = mockData;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const responseMetrics = [
    { label: 'MTTD', value: analyticsData.mttd, unit: 'h', icon: Clock, color: 'primary' },
    { label: 'MTTR', value: analyticsData.mttr, unit: 'h', icon: TrendingUp, color: 'success' },
    { label: 'Avg Resolve', value: analyticsData.responseMetrics.avgResolveTime, unit: 'h', icon: Target, color: 'warning' },
    { label: 'SLA Compliance', value: analyticsData.responseMetrics.slaCompliance * 100, unit: '%', icon: Shield, color: 'primary' },
  ];

  const radarData = analyticsData.attackDistribution.map(d => ({
    subject: d.name,
    A: d.value,
    fullMark: 50,
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
          <p className="text-muted text-sm mt-1">Security operations metrics and KPIs</p>
        </div>
        <div className="flex gap-2">
          {(['overview', 'trends', 'productivity', 'attacks'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                'px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize',
                activeTab === tab ? 'bg-primary/10 text-primary border border-primary/30' : 'text-muted hover:text-foreground hover:bg-card'
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'overview' && (
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {responseMetrics.map((metric) => {
              const Icon = metric.icon;
              return (
                <motion.div key={metric.label} variants={itemVariants}>
                  <Card className="p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center', `bg-${metric.color}/10`)}>
                        <Icon className={cn('w-5 h-5', `text-${metric.color}`)} />
                      </div>
                      <span className="text-sm text-muted">{metric.label}</span>
                    </div>
                    <div className="text-3xl font-bold text-foreground">
                      {metric.value.toFixed(1)}<span className="text-lg text-muted ml-1">{metric.unit}</span>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div variants={itemVariants}>
              <Card>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-foreground flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-primary" />
                    Threat vs Incident Trends
                  </h3>
                  <span className="text-xs text-muted">30 days</span>
                </div>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={analyticsData.threatTrends.map((t, i) => ({ ...t, incidents: analyticsData.incidentTrends[i]?.value || 0 }))}>
                      <defs>
                        <linearGradient id="colorThreats" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorIncidents2" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#00E5FF" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#00E5FF" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" />
                      <XAxis dataKey="date" tick={{ fill: '#94A3B8', fontSize: 12 }} tickFormatter={(v) => v.slice(5)} />
                      <YAxis tick={{ fill: '#94A3B8', fontSize: 12 }} />
                      <Tooltip contentStyle={{ backgroundColor: '#1E293B', border: '1px solid rgba(148,163,184,0.1)', borderRadius: '8px' }} />
                      <Legend />
                      <Area type="monotone" dataKey="value" name="Threats" stroke="#EF4444" fill="url(#colorThreats)" strokeWidth={2} />
                      <Area type="monotone" dataKey="incidents" name="Incidents" stroke="#00E5FF" fill="url(#colorIncidents2)" strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-foreground flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-primary" />
                    Severity Distribution
                  </h3>
                </div>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={analyticsData.severityDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={80}
                        outerRadius={110}
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {analyticsData.severityDistribution.map((entry, index) => (
                          <Cell key={index} fill={entry.color || CHART_COLORS[index]} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ backgroundColor: '#1E293B', border: '1px solid rgba(148,163,184,0.1)', borderRadius: '8px' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </motion.div>
          </div>

          <motion.div variants={itemVariants}>
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  Attack Distribution (MITRE ATT&CK)
                </h3>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="rgba(148,163,184,0.2)" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#94A3B8', fontSize: 12 }} />
                    <PolarRadiusAxis tick={{ fill: '#94A3B8', fontSize: 10 }} />
                    <Radar name="Attacks" dataKey="A" stroke="#00E5FF" fill="#00E5FF" fillOpacity={0.3} strokeWidth={2} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      )}

      {activeTab === 'productivity' && (
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <motion.div variants={itemVariants}>
              <Card className="p-5 text-center">
                <div className="text-3xl font-bold text-primary">{analyticsData.analystProductivity.reduce((a, b) => a + b.incidentsResolved, 0)}</div>
                <div className="text-sm text-muted mt-1">Total Incidents Resolved</div>
              </Card>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Card className="p-5 text-center">
                <div className="text-3xl font-bold text-success">{(analyticsData.analystProductivity.reduce((a, b) => a + b.falsePositiveRate, 0) / analyticsData.analystProductivity.length * 100).toFixed(1)}%</div>
                <div className="text-sm text-muted mt-1">Avg False Positive Rate</div>
              </Card>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Card className="p-5 text-center">
                <div className="text-3xl font-bold text-warning">{(analyticsData.analystProductivity.reduce((a, b) => a + b.score, 0) / analyticsData.analystProductivity.length).toFixed(0)}</div>
                <div className="text-sm text-muted mt-1">Avg Analyst Score</div>
              </Card>
            </motion.div>
          </div>

          <motion.div variants={itemVariants}>
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  Analyst Productivity
                </h3>
              </div>
              <div className="space-y-4">
                {analyticsData.analystProductivity.map((analyst) => (
                  <div key={analyst.userId} className="flex items-center gap-4 p-4 rounded-lg bg-background/50 border border-border">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-bold text-sm">{analyst.name.charAt(0)}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-foreground">{analyst.name}</span>
                        <span className="text-sm text-primary font-medium">Score: {analyst.score.toFixed(0)}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-xs text-muted">
                        <div><span className="text-foreground font-medium">{analyst.incidentsResolved}</span> resolved</div>
                        <div><span className="text-foreground font-medium">{analyst.avgResolutionTime.toFixed(1)}h</span> avg time</div>
                        <div><span className="text-foreground font-medium">{(analyst.falsePositiveRate * 100).toFixed(1)}%</span> FP rate</div>
                      </div>
                      <div className="mt-2 h-2 bg-card rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-primary to-primary/50 rounded-full transition-all"
                          style={{ width: `${analyst.score}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </motion.div>
      )}

      {activeTab === 'trends' && (
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
          <motion.div variants={itemVariants}>
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground">Category Distribution</h3>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={analyticsData.categoryDistribution} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" />
                    <XAxis type="number" tick={{ fill: '#94A3B8', fontSize: 12 }} />
                    <YAxis dataKey="name" type="category" tick={{ fill: '#94A3B8', fontSize: 12 }} width={120} />
                    <Tooltip contentStyle={{ backgroundColor: '#1E293B', border: '1px solid rgba(148,163,184,0.1)', borderRadius: '8px' }} />
                    <Bar dataKey="value" fill="#00E5FF" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      )}

      {activeTab === 'attacks' && (
        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          <motion.div variants={itemVariants}>
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground">Attack Technique Distribution</h3>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={analyticsData.attackDistribution}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" />
                    <XAxis dataKey="name" tick={{ fill: '#94A3B8', fontSize: 11 }} angle={-45} textAnchor="end" height={80} />
                    <YAxis tick={{ fill: '#94A3B8', fontSize: 12 }} />
                    <Tooltip contentStyle={{ backgroundColor: '#1E293B', border: '1px solid rgba(148,163,184,0.1)', borderRadius: '8px' }} />
                    <Bar dataKey="value" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}