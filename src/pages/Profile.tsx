import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { User, Shield, Key, Camera, Save, CheckCircle, Copy, Eye, EyeOff } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { mockData } from '../utils/mockData';
import { formatDate } from '../utils/format';
import { cn } from '../utils/cn';

export function Profile() {
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'api'>('profile');
  const [saved, setSaved] = useState(false);
  const [showApiKey, setShowApiKey] = useState<Record<string, boolean>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const user = mockData.users[0];

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const toggleApiKeyVisibility = (id: string) => {
    setShowApiKey(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Profile</h1>
        <p className="text-muted text-sm mt-1">Manage your account and preferences</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-72">
          <Card className="p-6 text-center">
            <div className="relative inline-block">
              <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                <User className="w-12 h-12 text-primary" />
              </div>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 p-2 rounded-full bg-primary text-background hover:bg-primary/90 transition-all"
              >
                <Camera className="w-4 h-4" />
              </button>
              <input ref={fileInputRef} type="file" accept="image/*" className="hidden" />
            </div>
            <h2 className="text-xl font-bold text-foreground">{user.name}</h2>
            <p className="text-sm text-muted">{user.email}</p>
            <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
              <Shield className="w-3 h-3" />
              {user.role}
            </div>
            <div className="mt-4 pt-4 border-t border-border text-left space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted">Department</span>
                <span className="text-foreground">{user.department}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted">Status</span>
                <span className="text-success capitalize">{user.status}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted">Joined</span>
                <span className="text-foreground">{formatDate(user.createdAt, 'MMM YYYY')}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted">Last Active</span>
                <span className="text-foreground">{formatDate(user.lastActive, 'HH:mm')}</span>
              </div>
            </div>
          </Card>
        </div>

        <div className="flex-1">
          <div className="flex gap-2 mb-4">
            {(['profile', 'security', 'api'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize',
                  activeTab === tab ? 'bg-primary/10 text-primary border border-primary/30' : 'text-muted hover:text-foreground hover:bg-card'
                )}
              >
                {tab === 'api' ? 'API Keys' : tab}
              </button>
            ))}
          </div>

          <Card className="p-6">
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-foreground">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 block">Full Name</label>
                    <Input defaultValue={user.name} />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 block">Email</label>
                    <Input type="email" defaultValue={user.email} />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 block">Department</label>
                    <Input defaultValue={user.department} />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 block">Role</label>
                    <select className="w-full px-4 py-2.5 bg-card border border-border rounded-lg text-foreground">
                      <option selected>{user.role}</option>
                      <option>admin</option>
                      <option>analyst</option>
                      <option>viewer</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Timezone</label>
                  <select className="w-full px-4 py-2.5 bg-card border border-border rounded-lg text-foreground">
                    <option selected>{user.preferences.timezone}</option>
                    <option>America/New_York</option>
                    <option>America/Los_Angeles</option>
                    <option>Europe/London</option>
                    <option>Asia/Tokyo</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Date Format</label>
                  <select className="w-full px-4 py-2.5 bg-card border border-border rounded-lg text-foreground">
                    <option selected>{user.preferences.dateFormat}</option>
                    <option>MMM D, YYYY HH:mm</option>
                    <option>DD MMM YYYY HH:mm</option>
                    <option>YYYY-MM-DD HH:mm</option>
                  </select>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-foreground">Security Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 block">Current Password</label>
                    <Input type="password" placeholder="••••••••" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 block">New Password</label>
                    <Input type="password" placeholder="Enter new password" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 block">Confirm New Password</label>
                    <Input type="password" placeholder="Confirm new password" />
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-card border border-border">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium text-foreground">Two-Factor Authentication</div>
                      <div className="text-xs text-muted">Add an extra layer of security</div>
                    </div>
                    <button className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-sm font-medium border border-primary/30 hover:bg-primary/20 transition-all">
                      Enable 2FA
                    </button>
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-card border border-border">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium text-foreground">Active Sessions</div>
                      <div className="text-xs text-muted">Manage your active login sessions</div>
                    </div>
                    <span className="text-xs text-success">1 active session</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'api' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-foreground">API Keys</h3>
                  <Button size="sm">
                    <Key className="w-4 h-4" /> Generate New Key
                  </Button>
                </div>
                <div className="space-y-3">
                  {user.apiKeys.length > 0 ? user.apiKeys.map(key => (
                    <div key={key.id} className="p-4 rounded-lg bg-card border border-border">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <div className="text-sm font-medium text-foreground">{key.name}</div>
                          <div className="text-xs text-muted">Prefix: {key.prefix} • Created: {formatDate(key.createdAt, 'MMM D, YYYY')}</div>
                        </div>
                        <span className={cn('px-2 py-1 rounded-full text-xs font-medium', key.active ? 'bg-success/10 text-success border border-success/30' : 'bg-muted/10 text-muted border border-muted/30')}>
                          {key.active ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 px-3 py-2 bg-background border border-border rounded-lg font-mono text-sm text-foreground flex items-center gap-2">
                          <Key className="w-3 h-3 text-muted" />
                          {showApiKey[key.id] ? key.key : '••••••••••••••••••••••••••'}
                        </div>
                        <button
                          onClick={() => toggleApiKeyVisibility(key.id)}
                          className="p-2 rounded-lg bg-card border border-border text-muted hover:text-foreground transition-all"
                        >
                          {showApiKey[key.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={() => copyToClipboard(key.key)}
                          className="p-2 rounded-lg bg-card border border-border text-muted hover:text-foreground transition-all"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex items-center gap-4 mt-3 text-xs text-muted">
                        <span>Last used: {formatDate(key.lastUsed, 'MMM D, HH:mm')}</span>
                        <span>Expires: {formatDate(key.expiresAt, 'MMM D, YYYY')}</span>
                        <span>Permissions: {key.permissions.join(', ')}</span>
                      </div>
                    </div>
                  )) : (
                    <div className="text-center py-8 text-muted">No API keys generated yet</div>
                  )}
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
