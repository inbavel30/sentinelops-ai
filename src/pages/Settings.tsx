import { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings as SettingsIcon, Bell, Shield, Cpu, Plug, Save, CheckCircle } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { mockData } from '../utils/mockData';
import { formatDate } from '../utils/format';
import { cn } from '../utils/cn';

export function Settings() {
  const [activeTab, setActiveTab] = useState<'general' | 'notifications' | 'ai' | 'security' | 'integrations'>('general');
  const [saved, setSaved] = useState(false);

  const tabs = [
    { id: 'general', label: 'General', icon: SettingsIcon },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'ai', label: 'AI Configuration', icon: Cpu },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'integrations', label: 'Integrations', icon: Plug },
  ] as const;

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-muted text-sm mt-1">Configure your SentinelOps AI workspace</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-64 space-y-1">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all text-left',
                  activeTab === tab.id ? 'bg-primary/10 text-primary border border-primary/30' : 'text-muted hover:text-foreground hover:bg-card'
                )}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="flex-1">
          <Card className="p-6">
            {activeTab === 'general' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">Workspace Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1 block">Workspace Name</label>
                      <Input defaultValue="Production SOC" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1 block">Description</label>
                      <textarea className="w-full px-4 py-2.5 bg-card border border-border rounded-lg text-foreground placeholder:text-muted focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all min-h-[80px] resize-y" defaultValue="Main security operations center workspace" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-foreground mb-1 block">Default Severity</label>
                        <select className="w-full px-4 py-2.5 bg-card border border-border rounded-lg text-foreground">
                          <option>Critical</option>
                          <option>High</option>
                          <option selected>Medium</option>
                          <option>Low</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground mb-1 block">Data Retention (days)</label>
                        <Input type="number" defaultValue="365" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-lg bg-card border border-border">
                      <div>
                        <div className="text-sm font-medium text-foreground">Auto Assignment</div>
                        <div className="text-xs text-muted">Automatically assign incidents based on workload</div>
                      </div>
                      <button className="w-12 h-6 rounded-full bg-primary relative">
                        <div className="w-5 h-5 rounded-full bg-white absolute top-0.5 left-6" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-lg bg-card border border-border">
                      <div>
                        <div className="text-sm font-medium text-foreground">Auto Escalation</div>
                        <div className="text-xs text-muted">Automatically escalate critical incidents</div>
                      </div>
                      <button className="w-12 h-6 rounded-full bg-primary relative">
                        <div className="w-5 h-5 rounded-full bg-white absolute top-0.5 left-6" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Notification Preferences</h3>
                <div className="space-y-4">
                  {[
                    { label: 'Email Notifications', desc: 'Receive email alerts for critical events', enabled: true },
                    { label: 'Push Notifications', desc: 'Browser push notifications', enabled: true },
                    { label: 'Desktop Notifications', desc: 'Native desktop notifications', enabled: false },
                    { label: 'Sound Alerts', desc: 'Play sound on new alerts', enabled: true },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 rounded-lg bg-card border border-border">
                      <div>
                        <div className="text-sm font-medium text-foreground">{item.label}</div>
                        <div className="text-xs text-muted">{item.desc}</div>
                      </div>
                      <button className={cn('w-12 h-6 rounded-full relative transition-all', item.enabled ? 'bg-primary' : 'bg-muted/30')}>
                        <div className={cn('w-5 h-5 rounded-full bg-white absolute top-0.5 transition-all', item.enabled ? 'left-6' : 'left-0.5')} />
                      </button>
                    </div>
                  ))}
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Severity Filter</label>
                  <div className="flex gap-2 flex-wrap">
                    {['critical', 'high', 'medium', 'low', 'info'].map(sev => (
                      <label key={sev} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-card border border-border cursor-pointer">
                        <input type="checkbox" defaultChecked={['critical', 'high', 'medium'].includes(sev)} className="rounded text-primary" />
                        <span className="text-sm text-foreground capitalize">{sev}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'ai' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">AI Configuration</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 block">AI Model</label>
                    <select className="w-full px-4 py-2.5 bg-card border border-border rounded-lg text-foreground">
                      <option>GPT-4o (OpenAI)</option>
                      <option>Claude 3.5 Sonnet (Anthropic)</option>
                      <option>Gemini 1.5 Pro (Google)</option>
                      <option>Llama 3 70B (Meta)</option>
                      <option>Sentinel Custom</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1 block">Temperature</label>
                      <Input type="number" step="0.1" min="0" max="2" defaultValue="0.7" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1 block">Max Tokens</label>
                      <Input type="number" defaultValue="4096" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    {[
                      { label: 'Streaming Responses', desc: 'Enable real-time streaming of AI responses', enabled: true },
                      { label: 'Conversation Memory', desc: 'Maintain context across conversations', enabled: true },
                      { label: 'Reasoning Display', desc: 'Show AI reasoning process', enabled: true },
                      { label: 'Auto Triage', desc: 'Automatically triage incoming alerts', enabled: true },
                      { label: 'Auto Investigate', desc: 'Automatically investigate critical incidents', enabled: false },
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 rounded-lg bg-card border border-border">
                        <div>
                          <div className="text-sm font-medium text-foreground">{item.label}</div>
                          <div className="text-xs text-muted">{item.desc}</div>
                        </div>
                        <button className={cn('w-12 h-6 rounded-full relative transition-all', item.enabled ? 'bg-primary' : 'bg-muted/30')}>
                          <div className={cn('w-5 h-5 rounded-full bg-white absolute top-0.5 transition-all', item.enabled ? 'left-6' : 'left-0.5')} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Security Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg bg-card border border-border">
                    <div>
                      <div className="text-sm font-medium text-foreground">Multi-Factor Authentication</div>
                      <div className="text-xs text-muted">Require MFA for all users</div>
                    </div>
                    <button className="w-12 h-6 rounded-full bg-primary relative">
                      <div className="w-5 h-5 rounded-full bg-white absolute top-0.5 left-6" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg bg-card border border-border">
                    <div>
                      <div className="text-sm font-medium text-foreground">Session Timeout</div>
                      <div className="text-xs text-muted">Auto-logout after 30 minutes of inactivity</div>
                    </div>
                    <button className="w-12 h-6 rounded-full bg-primary relative">
                      <div className="w-5 h-5 rounded-full bg-white absolute top-0.5 left-6" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg bg-card border border-border">
                    <div>
                      <div className="text-sm font-medium text-foreground">IP Whitelisting</div>
                      <div className="text-xs text-muted">Restrict access to specific IP ranges</div>
                    </div>
                    <button className="w-12 h-6 rounded-full bg-muted/30 relative">
                      <div className="w-5 h-5 rounded-full bg-white absolute top-0.5 left-0.5" />
                    </button>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 block">Allowed IP Ranges</label>
                    <textarea className="w-full px-4 py-2.5 bg-card border border-border rounded-lg text-foreground placeholder:text-muted focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all min-h-[80px] resize-y font-mono text-sm" placeholder="192.168.1.0/24\n10.0.0.0/8" defaultValue="192.168.1.0/24\n10.0.0.0/8" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 block">Password Policy</label>
                    <div className="space-y-2 p-4 rounded-lg bg-card border border-border">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted">Minimum Length</span>
                        <span className="text-foreground font-medium">12 characters</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted">Require Uppercase</span>
                        <CheckCircle className="w-4 h-4 text-success" />
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted">Require Numbers</span>
                        <CheckCircle className="w-4 h-4 text-success" />
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted">Require Special Characters</span>
                        <CheckCircle className="w-4 h-4 text-success" />
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted">Password Expiry</span>
                        <span className="text-foreground font-medium">90 days</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'integrations' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Integrations</h3>
                <div className="space-y-3">
                  {mockData.integrations.map(integration => (
                    <div key={integration.id} className="flex items-center justify-between p-4 rounded-lg bg-card border border-border">
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          'w-10 h-10 rounded-lg flex items-center justify-center',
                          integration.status === 'connected' && 'bg-success/10',
                          integration.status === 'error' && 'bg-danger/10',
                          integration.status === 'pending' && 'bg-warning/10',
                          integration.status === 'disconnected' && 'bg-muted/10'
                        )}>
                          <Plug className={cn(
                            'w-5 h-5',
                            integration.status === 'connected' && 'text-success',
                            integration.status === 'error' && 'text-danger',
                            integration.status === 'pending' && 'text-warning',
                            integration.status === 'disconnected' && 'text-muted'
                          )} />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-foreground">{integration.name}</div>
                          <div className="text-xs text-muted capitalize">{integration.type} • {integration.status}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {integration.lastSyncAt && (
                          <span className="text-xs text-muted">Last sync: {formatDate(integration.lastSyncAt, 'HH:mm')}</span>
                        )}
                        <Button variant="secondary" size="sm">
                          {integration.status === 'connected' ? 'Configure' : 'Connect'}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center gap-3 mt-6 pt-6 border-t border-border">
              <Button onClick={handleSave} className="flex items-center gap-2">
                <Save className="w-4 h-4" /> Save Changes
              </Button>
              {saved && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-2 text-sm text-success"
                >
                  <CheckCircle className="w-4 h-4" /> Saved successfully
                </motion.div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
