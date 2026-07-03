import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bot, Play, Pause, Settings, Activity, AlertTriangle, Clock, Brain, Search } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { mockData } from '../utils/mockData';
import { formatDate } from '../utils/format';
import { cn } from '../utils/cn';

export function Agents() {
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'logs' | 'config'>('overview');
  const [searchQuery, setSearchQuery] = useState('');

  const agents = mockData.agents;
  const activeAgent = agents.find(a => a.id === selectedAgent);

  const statusConfig: Record<string, { color: string; bg: string; label: string; icon: React.ElementType }> = {
    idle: { color: 'text-muted', bg: 'bg-muted/10', label: 'Idle', icon: Clock },
    running: { color: 'text-success', bg: 'bg-success/10', label: 'Running', icon: Activity },
    thinking: { color: 'text-warning', bg: 'bg-warning/10', label: 'Thinking', icon: Brain },
    error: { color: 'text-danger', bg: 'bg-danger/10', label: 'Error', icon: AlertTriangle },
    paused: { color: 'text-primary', bg: 'bg-primary/10', label: 'Paused', icon: Pause },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">AI Agents</h1>
          <p className="text-muted text-sm mt-1">Monitor and manage autonomous security agents</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-success/10 border border-success/30">
            <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <span className="text-xs text-success font-medium">{agents.filter(a => a.status === 'running').length} Active</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search agents..."
              className="pl-10"
            />
          </div>

          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-3">
            {agents.filter(a => a.name.toLowerCase().includes(searchQuery.toLowerCase())).map((agent) => {
              const status = statusConfig[agent.status];
              const StatusIcon = status.icon;
              return (
                <motion.div key={agent.id} variants={itemVariants}>
                  <Card
                    hover
                    className={cn(
                      'cursor-pointer p-4 transition-all',
                      selectedAgent === agent.id && 'border-primary/50 ring-1 ring-primary/30'
                    )}
                    onClick={() => setSelectedAgent(agent.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${agent.color}20` }}>
                          <Bot className="w-5 h-5" style={{ color: agent.color }} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground text-sm">{agent.name}</h3>
                          <p className="text-xs text-muted">{agent.type}</p>
                        </div>
                      </div>
                      <div className={cn('flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium', status.bg, status.color)}>
                        <StatusIcon className="w-3 h-3" />
                        {status.label}
                      </div>
                    </div>
                    <p className="text-xs text-muted mt-2 line-clamp-2">{agent.description}</p>
                    <div className="flex items-center gap-4 mt-3 pt-3 border-t border-border text-xs text-muted">
                      <span>{agent.metrics.totalRuns} runs</span>
                      <span>{(agent.metrics.successRate * 100).toFixed(0)}% success</span>
                      <span>{agent.metrics.avgExecutionTime.toFixed(0)}s avg</span>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        <div className="lg:col-span-2">
          {activeAgent ? (
            <Card className="h-full">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${activeAgent.color}20` }}>
                    <Bot className="w-6 h-6" style={{ color: activeAgent.color }} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-foreground">{activeAgent.name}</h2>
                    <p className="text-sm text-muted">{activeAgent.description}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="secondary" size="sm">
                    <Play className="w-4 h-4" /> Run
                  </Button>
                  <Button variant="secondary" size="sm">
                    <Pause className="w-4 h-4" /> Pause
                  </Button>
                  <Button variant="secondary" size="sm">
                    <Settings className="w-4 h-4" /> Config
                  </Button>
                </div>
              </div>

              <div className="flex gap-2 mb-6">
                {(['overview', 'logs', 'config'] as const).map(tab => (
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

              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-4 rounded-lg bg-card border border-border text-center">
                      <div className="text-2xl font-bold text-foreground">{activeAgent.metrics.totalRuns}</div>
                      <div className="text-xs text-muted mt-1">Total Runs</div>
                    </div>
                    <div className="p-4 rounded-lg bg-card border border-border text-center">
                      <div className="text-2xl font-bold text-success">{(activeAgent.metrics.successRate * 100).toFixed(0)}%</div>
                      <div className="text-xs text-muted mt-1">Success Rate</div>
                    </div>
                    <div className="p-4 rounded-lg bg-card border border-border text-center">
                      <div className="text-2xl font-bold text-primary">{activeAgent.metrics.avgExecutionTime.toFixed(1)}s</div>
                      <div className="text-xs text-muted mt-1">Avg Time</div>
                    </div>
                    <div className="p-4 rounded-lg bg-card border border-border text-center">
                      <div className="text-2xl font-bold text-warning">{activeAgent.metrics.incidentsResolved}</div>
                      <div className="text-xs text-muted mt-1">Resolved</div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-foreground mb-3">Capabilities</h3>
                    <div className="flex flex-wrap gap-2">
                      {activeAgent.capabilities.map(cap => (
                        <span key={cap} className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-sm border border-primary/30">
                          {cap}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-foreground mb-3">Configuration</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 rounded-lg bg-card border border-border">
                        <div className="text-xs text-muted">Auto Run</div>
                        <div className="text-sm font-medium text-foreground">{activeAgent.config.autoRun ? 'Enabled' : 'Disabled'}</div>
                      </div>
                      <div className="p-3 rounded-lg bg-card border border-border">
                        <div className="text-xs text-muted">Max Iterations</div>
                        <div className="text-sm font-medium text-foreground">{activeAgent.config.maxIterations}</div>
                      </div>
                      <div className="p-3 rounded-lg bg-card border border-border">
                        <div className="text-xs text-muted">Timeout</div>
                        <div className="text-sm font-medium text-foreground">{activeAgent.config.timeout}s</div>
                      </div>
                      <div className="p-3 rounded-lg bg-card border border-border">
                        <div className="text-xs text-muted">Tools</div>
                        <div className="text-sm font-medium text-foreground">{activeAgent.config.tools.join(', ')}</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'logs' && (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {activeAgent.logs.length > 0 ? activeAgent.logs.map((log) => (
                    <div key={log.id} className={cn(
                      'p-3 rounded-lg border',
                      log.level === 'error' && 'bg-danger/5 border-danger/30',
                      log.level === 'warning' && 'bg-warning/5 border-warning/30',
                      log.level === 'info' && 'bg-card border-border'
                    )}>
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span className={cn(
                            'text-xs font-medium',
                            log.level === 'error' && 'text-danger',
                            log.level === 'warning' && 'text-warning',
                            log.level === 'info' && 'text-primary'
                          )}>{log.level.toUpperCase()}</span>
                          {log.step && <span className="text-xs text-muted">• {log.step}</span>}
                        </div>
                        <span className="text-xs text-muted">{formatDate(log.timestamp, 'HH:mm:ss')}</span>
                      </div>
                      <p className="text-sm text-foreground">{log.message}</p>
                      {log.duration && <span className="text-xs text-muted mt-1">Duration: {log.duration}s</span>}
                    </div>
                  )) : (
                    <div className="text-center py-8 text-muted">No logs available</div>
                  )}
                </div>
              )}

              {activeTab === 'config' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg bg-card border border-border">
                    <div>
                      <div className="text-sm font-medium text-foreground">Auto Run</div>
                      <div className="text-xs text-muted">Automatically execute when triggered</div>
                    </div>
                    <button className={cn(
                      'w-12 h-6 rounded-full transition-all relative',
                      activeAgent.config.autoRun ? 'bg-primary' : 'bg-muted/30'
                    )}>
                      <div className={cn(
                        'w-5 h-5 rounded-full bg-white absolute top-0.5 transition-all',
                        activeAgent.config.autoRun ? 'left-6' : 'left-0.5'
                      )} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg bg-card border border-border">
                    <div>
                      <div className="text-sm font-medium text-foreground">Max Iterations</div>
                      <div className="text-xs text-muted">Maximum number of execution steps</div>
                    </div>
                    <input type="number" defaultValue={activeAgent.config.maxIterations} className="w-20 px-3 py-2 bg-background border border-border rounded-lg text-foreground text-sm text-center" />
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg bg-card border border-border">
                    <div>
                      <div className="text-sm font-medium text-foreground">Timeout</div>
                      <div className="text-xs text-muted">Maximum execution time in seconds</div>
                    </div>
                    <input type="number" defaultValue={activeAgent.config.timeout} className="w-20 px-3 py-2 bg-background border border-border rounded-lg text-foreground text-sm text-center" />
                  </div>
                  <div className="p-4 rounded-lg bg-card border border-border">
                    <div className="text-sm font-medium text-foreground mb-2">Enabled Tools</div>
                    <div className="flex flex-wrap gap-2">
                      {['search', 'enrich', 'hunt', 'analyze', 'correlate', 'isolate', 'block'].map(tool => (
                        <label key={tool} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-background border border-border cursor-pointer">
                          <input type="checkbox" defaultChecked={activeAgent.config.tools.includes(tool)} className="rounded text-primary" />
                          <span className="text-sm text-foreground capitalize">{tool}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <Button className="w-full">Save Configuration</Button>
                </div>
              )}
            </Card>
          ) : (
            <Card className="h-full flex items-center justify-center">
              <div className="text-center">
                <Bot className="w-12 h-12 text-muted mx-auto mb-4" />
                <p className="text-muted">Select an agent to view details</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}