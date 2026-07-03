import { useState } from 'react';
import { Search, Globe, Hash, Link, ExternalLink, Target } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { mockData } from '../utils/mockData';
import { formatDate } from '../utils/format';
import { cn } from '../utils/cn';
import { motion } from 'framer-motion';

export function ThreatIntel() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'threats' | 'iocs' | 'mitre'>('threats');
  const [selectedThreat, setSelectedThreat] = useState<string | null>(null);
  const [iocInput, setIocInput] = useState('');
  const [iocType, setIocType] = useState<'ip' | 'domain' | 'hash' | 'url'>('ip');

  const filtered = mockData.threatIntel.filter(t => 
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const iocData = [
    { value: '192.168.100.45', type: 'ip' as const, severity: 'high' as const, confidence: 0.92, firstSeen: '2024-06-15T10:30:00Z', lastSeen: '2024-07-02T14:22:00Z', sources: ['VirusTotal', 'AbuseIPDB'], reputation: 85 },
    { value: 'malicious-domain.com', type: 'domain' as const, severity: 'critical' as const, confidence: 0.98, firstSeen: '2024-05-20T08:15:00Z', lastSeen: '2024-07-02T16:45:00Z', sources: ['MISP', 'ThreatFox'], reputation: 95 },
    { value: '5d41402abc4b2a76b9719d911017c592', type: 'hash' as const, severity: 'critical' as const, confidence: 0.99, firstSeen: '2024-06-01T12:00:00Z', lastSeen: '2024-07-01T09:30:00Z', sources: ['VirusTotal', 'MalwareBazaar'], reputation: 98 },
    { value: 'https://phishing-site.example/login', type: 'url' as const, severity: 'high' as const, confidence: 0.89, firstSeen: '2024-06-28T15:20:00Z', lastSeen: '2024-07-02T11:10:00Z', sources: ['URLhaus', 'PhishTank'], reputation: 78 },
    { value: '10.0.0.55', type: 'ip' as const, severity: 'medium' as const, confidence: 0.75, firstSeen: '2024-06-10T09:00:00Z', lastSeen: '2024-06-30T18:00:00Z', sources: ['Internal'], reputation: 45 },
  ];

  const mitreTechniques = [
    { id: 'T1059', name: 'Command and Scripting Interpreter', tactic: 'Execution', count: 45, description: 'Adversaries may abuse command and script interpreters to execute commands, scripts, or binaries.' },
    { id: 'T1055', name: 'Process Injection', tactic: 'Defense Evasion', count: 32, description: 'Adversaries may inject code into processes in order to evade process-based defenses.' },
    { id: 'T1078', name: 'Valid Accounts', tactic: 'Initial Access', count: 28, description: 'Adversaries may obtain and abuse credentials of existing accounts.' },
    { id: 'T1003', name: 'OS Credential Dumping', tactic: 'Credential Access', count: 24, description: 'Adversaries may attempt to dump credentials to obtain account login and credential material.' },
    { id: 'T1021', name: 'Remote Services', tactic: 'Lateral Movement', count: 19, description: 'Adversaries may use Valid Accounts to log into a service specifically designed to accept remote connections.' },
    { id: 'T1567', name: 'Exfiltration Over Web Service', tactic: 'Exfiltration', count: 15, description: 'Adversaries may use an existing, legitimate external Web service to exfiltrate data.' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Threat Intelligence</h1>
          <p className="text-muted text-sm mt-1">IOC enrichment, WHOIS, VirusTotal, and MITRE ATT&CK</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="status-dot online" />
          <span className="text-sm text-success">Feeds Active</span>
        </div>
      </div>

      <div className="flex gap-2">
        {(['threats', 'iocs', 'mitre'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              'px-4 py-2 rounded-lg text-sm font-medium transition-all',
              activeTab === tab ? 'bg-primary/10 text-primary border border-primary/30' : 'text-muted hover:text-foreground hover:bg-card'
            )}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {activeTab === 'threats' && (
        <>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search threat actors, campaigns, malware..."
              className="pl-12"
            />
          </div>

          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((threat) => (
              <motion.div key={threat.id} variants={itemVariants}>
                <Card hover className="cursor-pointer" onClick={() => setSelectedThreat(selectedThreat === threat.id ? null : threat.id)}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Target className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{threat.name}</h3>
                        <span className="text-xs text-muted">{threat.type.toUpperCase()}</span>
                      </div>
                    </div>
                    <Badge variant="severity" value={threat.severity} />
                  </div>
                  <p className="text-sm text-muted line-clamp-2 mb-3">{threat.description}</p>
                  <div className="flex items-center gap-4 text-xs text-muted">
                    <span>Confidence: {(threat.confidence * 100).toFixed(0)}%</span>
                    <span>Sources: {threat.sources.length}</span>
                  </div>
                  <div className="mt-3 pt-3 border-t border-border flex items-center gap-2 text-xs text-muted">
                    <span>First: {formatDate(threat.firstSeen, 'MMM D')}</span>
                    <span>Last: {formatDate(threat.lastSeen, 'MMM D')}</span>
                  </div>
                  {selectedThreat === threat.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-4 pt-4 border-t border-border space-y-3"
                    >
                      <div>
                        <h4 className="text-sm font-medium text-foreground mb-2">MITRE ATT&CK Techniques</h4>
                        <div className="flex flex-wrap gap-2">
                          {threat.mitreTechniques.map(tech => (
                            <span key={tech.id} className="px-2 py-1 rounded-md bg-primary/10 text-primary text-xs font-mono">
                              {tech.id}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-foreground mb-2">Affected Industries</h4>
                        <div className="flex flex-wrap gap-2">
                          {threat.affectedIndustries.map(ind => (
                            <span key={ind} className="px-2 py-1 rounded-md bg-card border border-border text-muted text-xs">
                              {ind}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-foreground mb-2">TTPs</h4>
                        <div className="flex flex-wrap gap-2">
                          {threat.ttp.map(ttp => (
                            <span key={ttp} className="px-2 py-1 rounded-md bg-card border border-border text-muted text-xs">
                              {ttp}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </>
      )}

      {activeTab === 'iocs' && (
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Hash className="w-5 h-5 text-primary" />
              IOC Enrichment
            </h3>
            <div className="flex gap-3">
              <select
                value={iocType}
                onChange={(e) => setIocType(e.target.value as typeof iocType)}
                className="px-4 py-2.5 bg-card border border-border rounded-lg text-foreground"
              >
                <option value="ip">IP Address</option>
                <option value="domain">Domain</option>
                <option value="hash">File Hash</option>
                <option value="url">URL</option>
              </select>
              <Input
                value={iocInput}
                onChange={(e) => setIocInput(e.target.value)}
                placeholder={`Enter ${iocType} to enrich...`}
                className="flex-1"
              />
              <Button><Search className="w-4 h-4" /> Enrich</Button>
            </div>
          </Card>

          <div className="space-y-3">
            {iocData.map((ioc, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <Card className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        'w-10 h-10 rounded-lg flex items-center justify-center',
                        ioc.type === 'ip' && 'bg-primary/10',
                        ioc.type === 'domain' && 'bg-warning/10',
                        ioc.type === 'hash' && 'bg-danger/10',
                        ioc.type === 'url' && 'bg-success/10'
                      )}>
                        {ioc.type === 'ip' && <Globe className="w-5 h-5 text-primary" />}
                        {ioc.type === 'domain' && <Link className="w-5 h-5 text-warning" />}
                        {ioc.type === 'hash' && <Hash className="w-5 h-5 text-danger" />}
                        {ioc.type === 'url' && <ExternalLink className="w-5 h-5 text-success" />}
                      </div>
                      <div>
                        <div className="font-mono text-sm text-foreground">{ioc.value}</div>
                        <div className="text-xs text-muted mt-0.5">{ioc.type.toUpperCase()} • Confidence: {(ioc.confidence * 100).toFixed(0)}%</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="severity" value={ioc.severity} />
                      <div className="text-right text-xs text-muted">
                        <div>Reputation: {ioc.reputation}/100</div>
                        <div>Sources: {ioc.sources.join(', ')}</div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'mitre' && (
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
            <Input placeholder="Search MITRE ATT&CK techniques..." className="pl-12" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mitreTechniques.map((tech, idx) => (
              <motion.div
                key={tech.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <Card hover>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 rounded-md bg-primary/10 text-primary text-xs font-mono font-medium">{tech.id}</span>
                      <span className="text-xs text-muted">{tech.tactic}</span>
                    </div>
                    <span className="text-xs font-medium text-primary">{tech.count} occurrences</span>
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{tech.name}</h3>
                  <p className="text-sm text-muted">{tech.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
