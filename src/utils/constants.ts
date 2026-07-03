
export const APP_NAME = 'SentinelOps AI';
export const APP_VERSION = import.meta.env.VITE_APP_VERSION || '1.0.0';
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';
export const WS_URL = import.meta.env.VITE_WS_URL || 'http://localhost:8000';

export const SEVERITY_ORDER = ['critical', 'high', 'medium', 'low', 'info'] as const;
export const INCIDENT_STATUS_ORDER = ['open', 'in_progress', 'pending', 'escalated', 'resolved', 'closed'] as const;
export const ALERT_STATUS_ORDER = ['new', 'acknowledged', 'suppressed', 'resolved', 'false_positive'] as const;

export const SEVERITY_COLORS = {
  critical: '#EF4444',
  high: '#F97316',
  medium: '#FACC15',
  low: '#22C55E',
  info: '#00E5FF',
};

export const STATUS_COLORS = {
  open: '#EF4444',
  in_progress: '#FACC15',
  resolved: '#22C55E',
  closed: '#94A3B8',
  escalated: '#F97316',
  pending: '#00E5FF',
};

export const CHART_COLORS = [
  '#00E5FF',
  '#22C55E',
  '#FACC15',
  '#EF4444',
  '#8B5CF6',
  '#F97316',
  '#EC4899',
  '#14B8A6',
  '#6366F1',
  '#84CC16',
];

export const INCIDENT_CATEGORIES = [
  'Malware',
  'Phishing',
  'Data Exfiltration',
  'Lateral Movement',
  'Privilege Escalation',
  'Denial of Service',
  'Insider Threat',
  'Ransomware',
  'Supply Chain',
  'Credential Compromise',
  'Web Attack',
  'Network Intrusion',
];

export const THREAT_CATEGORIES = [
  'APT',
  'Ransomware',
  'Phishing',
  'Malware',
  'DDoS',
  'Insider Threat',
  'Zero-Day',
  'Supply Chain',
  'Social Engineering',
  'Cryptojacking',
];

export const AI_MODELS = [
  { id: 'gpt-4o', name: 'GPT-4o', provider: 'OpenAI' },
  { id: 'claude-3-5-sonnet', name: 'Claude 3.5 Sonnet', provider: 'Anthropic' },
  { id: 'gemini-1.5-pro', name: 'Gemini 1.5 Pro', provider: 'Google' },
  { id: 'llama-3-70b', name: 'Llama 3 70B', provider: 'Meta' },
  { id: 'sentinel-custom', name: 'Sentinel Custom', provider: 'SentinelOps' },
];

export const INTEGRATIONS = [
  { id: 'crowdstrike', name: 'CrowdStrike Falcon', icon: 'Shield' },
  { id: 'sentinel', name: 'Microsoft Sentinel', icon: 'Monitor' },
  { id: 'splunk', name: 'Splunk Enterprise', icon: 'BarChart3' },
  { id: 'paloalto', name: 'Palo Alto Cortex', icon: 'Network' },
  { id: 'chronicle', name: 'Google Chronicle', icon: 'Clock' },
  { id: 'qradar', name: 'IBM QRadar', icon: 'Radar' },
  { id: 'virustotal', name: 'VirusTotal', icon: 'Search' },
  { id: 'misp', name: 'MISP', icon: 'Database' },
  { id: 'thehive', name: 'TheHive', icon: 'Hexagon' },
  { id: 'slack', name: 'Slack', icon: 'MessageSquare' },
  { id: 'teams', name: 'Microsoft Teams', icon: 'Users' },
  { id: 'jira', name: 'Jira', icon: 'Ticket' },
];

export const SIDEBAR_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard', path: '/' },
  { id: 'chat', label: 'AI Chat', icon: 'MessageSquare', path: '/chat' },
  { id: 'incidents', label: 'Incidents', icon: 'AlertTriangle', path: '/incidents' },
  { id: 'threat', label: 'Threat Intel', icon: 'Shield', path: '/threat-intel' },
  { id: 'timeline', label: 'Timeline', icon: 'Clock', path: '/timeline' },
  { id: 'reports', label: 'Reports', icon: 'FileText', path: '/reports' },
  { id: 'analytics', label: 'Analytics', icon: 'BarChart3', path: '/analytics' },
  { id: 'agents', label: 'AI Agents', icon: 'Bot', path: '/agents' },
  { id: 'audit', label: 'Audit Logs', icon: 'ClipboardList', path: '/audit' },
];

export const KB_SHORTCUTS = [
  { key: 'k', modifier: 'ctrl', action: 'Open Command Palette', global: true },
  { key: '/', modifier: 'ctrl', action: 'Focus Search', global: true },
  { key: 'n', modifier: 'ctrl', action: 'New Incident', global: true },
  { key: 'c', modifier: 'ctrl', action: 'Open AI Chat', global: true },
  { key: 'h', modifier: 'ctrl', action: 'Go Home', global: true },
  { key: 'i', modifier: 'ctrl', action: 'Go to Incidents', global: true },
  { key: 'r', modifier: 'ctrl', action: 'Go to Reports', global: true },
  { key: 'a', modifier: 'ctrl', action: 'Go to Analytics', global: true },
  { key: 's', modifier: 'ctrl', action: 'Open Settings', global: true },
  { key: 'p', modifier: 'ctrl', action: 'Open Profile', global: true },
  { key: 'b', modifier: 'ctrl', action: 'Toggle Sidebar', global: true },
  { key: 'Escape', modifier: '', action: 'Close Modal / Go Back', global: true },
];
