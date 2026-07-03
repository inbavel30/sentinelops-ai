export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'admin' | 'analyst' | 'viewer';
  department: string;
  status: 'online' | 'away' | 'busy' | 'offline';
  lastActive: string;
  createdAt: string;
  preferences: UserPreferences;
  apiKeys: ApiKey[];
}

export interface UserPreferences {
  theme: 'dark' | 'light' | 'system';
  sidebarCollapsed: boolean;
  notifications: NotificationPreferences;
  ai: AIConfiguration;
  language: string;
  timezone: string;
  dateFormat: string;
}

export interface NotificationPreferences {
  email: boolean;
  push: boolean;
  desktop: boolean;
  sound: boolean;
  severityFilter: Severity[];
  categories: string[];
}

export interface AIConfiguration {
  model: string;
  temperature: number;
  maxTokens: number;
  streamingEnabled: boolean;
  memoryEnabled: boolean;
  reasoningEnabled: boolean;
  autoTriage: boolean;
  autoInvestigate: boolean;
}

export interface ApiKey {
  id: string;
  name: string;
  key: string;
  prefix: string;
  createdAt: string;
  expiresAt: string;
  lastUsed: string;
  permissions: string[];
  active: boolean;
}

export type Severity = 'critical' | 'high' | 'medium' | 'low' | 'info';
export type IncidentStatus = 'open' | 'in_progress' | 'resolved' | 'closed' | 'escalated' | 'pending';
export type AlertStatus = 'new' | 'acknowledged' | 'suppressed' | 'resolved' | 'false_positive';

export interface Incident {
  id: string;
  title: string;
  description: string;
  severity: Severity;
  status: IncidentStatus;
  category: string;
  subcategory: string;
  assignee?: User;
  reporter: User;
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
  closedAt?: string;
  source: string;
  affectedAssets: string[];
  indicators: IOC[];
  comments: Comment[];
  attachments: Attachment[];
  timeline: TimelineEvent[];
  relatedIncidents: string[];
  aiAnalysis?: AIAnalysis;
  metrics: IncidentMetrics;
  tags: string[];
}

export interface IncidentMetrics {
  timeToDetect: number;
  timeToRespond: number;
  timeToResolve?: number;
  falsePositive: boolean;
}

export interface IncidentFilters {
  severity?: string[];
  status?: string[];
  category?: string[];
  assignee?: string[];
  dateFrom?: string;
  dateTo?: string;
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface AIAnalysis {
  summary: string;
  threatLevel: number;
  recommendedActions: string[];
  similarIncidents: string[];
  iocAnalysis: string;
  attackPattern?: string;
  confidence: number;
}

export interface Alert {
  id: string;
  title: string;
  description: string;
  severity: Severity;
  status: AlertStatus;
  source: string;
  createdAt: string;
  updatedAt: string;
  incidentId?: string;
  ruleName: string;
  ruleId: string;
  rawData: Record<string, unknown>;
  enrichment: AlertEnrichment;
  falsePositiveScore: number;
}

export interface AlertEnrichment {
  geoLocation?: GeoLocation;
  reputation?: ReputationScore;
  whois?: WhoisData;
  vtResults?: VirusTotalResult;
  mitreTechniques: MitreTechnique[];
}

export interface GeoLocation {
  country: string;
  city: string;
  lat: number;
  lng: number;
  isp: string;
  asn: string;
}

export interface ReputationScore {
  score: number;
  source: string;
  category: string;
  lastChecked: string;
}

export interface WhoisData {
  registrar: string;
  createdDate: string;
  expiresDate: string;
  nameServers: string[];
  registrant: string;
  privacyProtected: boolean;
}

export interface VirusTotalResult {
  positives: number;
  total: number;
  permalink: string;
  scanDate: string;
  engines: Record<string, string>;
}

export interface MitreTechnique {
  id: string;
  name: string;
  tactic: string;
  description: string;
  url: string;
}

export interface IOC {
  id: string;
  type: 'ip' | 'domain' | 'hash' | 'url' | 'email' | 'file';
  value: string;
  severity: Severity;
  confidence: number;
  firstSeen: string;
  lastSeen: string;
  sources: string[];
  tags: string[];
  reputation: ReputationScore;
  enrichment: IOCEnrichment;
}

export interface IOCEnrichment {
  geoLocation?: GeoLocation;
  whois?: WhoisData;
  vtResults?: VirusTotalResult;
  passiveDns: PassiveDnsRecord[];
}

export interface PassiveDnsRecord {
  domain: string;
  ip: string;
  firstSeen: string;
  lastSeen: string;
}

export interface Comment {
  id: string;
  content: string;
  author: User;
  createdAt: string;
  updatedAt: string;
  attachments: Attachment[];
  mentions: string[];
}

export interface Attachment {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
  uploadedAt: string;
  uploadedBy: User;
}

export interface TimelineEvent {
  id: string;
  type: 'alert' | 'comment' | 'action' | 'evidence' | 'status_change' | 'assignment' | 'ai_analysis' | 'enrichment';
  title: string;
  description: string;
  timestamp: string;
  actor?: User;
  metadata: Record<string, unknown>;
  evidence?: Evidence[];
}

export interface Evidence {
  id: string;
  type: 'screenshot' | 'log' | 'file' | 'network_capture' | 'memory_dump' | 'registry';
  name: string;
  description: string;
  url: string;
  size: number;
  hash: string;
  createdAt: string;
  collectedBy: User;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  conversationId: string;
  metadata?: ChatMessageMetadata;
  reactions?: MessageReaction[];
  attachments?: Attachment[];
  reasoning?: string;
  actions?: ChatAction[];
}

export interface ChatMessageMetadata {
  model: string;
  tokensUsed: number;
  latency: number;
  confidence: number;
  sources: string[];
}

export interface MessageReaction {
  emoji: string;
  userId: string;
  timestamp: string;
}

export interface ChatAction {
  type: 'create_incident' | 'update_incident' | 'query_data' | 'run_playbook' | 'generate_report' | 'send_notification';
  label: string;
  payload: Record<string, unknown>;
  executed: boolean;
  result?: Record<string, unknown>;
}

export interface Conversation {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: string;
  updatedAt: string;
  pinned: boolean;
  archived: boolean;
  tags: string[];
  memory: ConversationMemory;
  agent: AIAgent;
}

export interface ConversationMemory {
  entities: string[];
  context: string;
  preferences: Record<string, unknown>;
  lastSummary: string;
}

export interface AIAgent {
  id: string;
  name: string;
  type: 'triage' | 'investigation' | 'response' | 'analyst' | 'custom';
  status: 'idle' | 'running' | 'thinking' | 'error' | 'paused';
  description: string;
  capabilities: string[];
  icon: string;
  color: string;
  config: AgentConfig;
  metrics: AgentMetrics;
  logs: AgentLog[];
}

export interface AgentConfig {
  autoRun: boolean;
  maxIterations: number;
  timeout: number;
  tools: string[];
  permissions: string[];
}

export interface AgentMetrics {
  totalRuns: number;
  successRate: number;
  avgExecutionTime: number;
  lastRunAt?: string;
  incidentsResolved: number;
  alertsProcessed: number;
}

export interface AgentLog {
  id: string;
  timestamp: string;
  level: 'info' | 'warning' | 'error' | 'debug';
  message: string;
  step?: string;
  duration?: number;
  metadata?: Record<string, unknown>;
}

export interface Report {
  id: string;
  title: string;
  type: 'executive' | 'technical' | 'incident' | 'threat' | 'compliance' | 'custom';
  status: 'draft' | 'generated' | 'reviewing' | 'approved' | 'archived';
  content: string;
  summary: string;
  createdAt: string;
  updatedAt: string;
  generatedBy: User | AIAgent;
  filters: ReportFilters;
  charts: ReportChart[];
  incidents: string[];
  aiSummary?: string;
  exportFormats: string[];
}

export interface ReportFilters {
  dateRange: { start: string; end: string };
  severity: Severity[];
  categories: string[];
  assignees: string[];
  status: IncidentStatus[];
}

export interface ReportChart {
  id: string;
  type: 'line' | 'bar' | 'pie' | 'area' | 'radar' | 'heatmap';
  title: string;
  data: Record<string, unknown>[];
  config: Record<string, unknown>;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'alert' | 'incident' | 'system' | 'agent' | 'mention' | 'report';
  severity: Severity;
  read: boolean;
  createdAt: string;
  sourceId?: string;
  sourceType?: string;
  actionUrl?: string;
  metadata?: Record<string, unknown>;
}

export interface DashboardWidget {
  id: string;
  type: 'kpi' | 'chart' | 'list' | 'map' | 'table' | 'agent' | 'alert';
  title: string;
  position: { x: number; y: number; w: number; h: number };
  config: Record<string, unknown>;
  data?: Record<string, unknown>;
}

export interface AuditLog {
  id: string;
  action: string;
  actor: User;
  target: string;
  targetType: string;
  details: Record<string, unknown>;
  ipAddress: string;
  userAgent: string;
  timestamp: string;
  severity: Severity;
}

export interface ThreatIntel {
  id: string;
  type: 'malware' | 'phishing' | 'apt' | 'vulnerability' | 'ioc' | 'campaign';
  name: string;
  description: string;
  severity: Severity;
  confidence: number;
  sources: string[];
  iocs: IOC[];
  mitreTechniques: MitreTechnique[];
  firstSeen: string;
  lastSeen: string;
  affectedIndustries: string[];
  affectedRegions: string[];
  threatActors: string[];
  ttp: string[];
  indicators: IOC[];
}

export interface Integration {
  id: string;
  name: string;
  type: string;
  status: 'connected' | 'disconnected' | 'error' | 'pending';
  config: Record<string, unknown>;
  lastSyncAt?: string;
  lastError?: string;
  metrics: IntegrationMetrics;
}

export interface IntegrationMetrics {
  totalEvents: number;
  eventsPerMinute: number;
  latency: number;
  errorRate: number;
}

export interface AnalyticsData {
  threatTrends: TimeSeriesData[];
  incidentTrends: TimeSeriesData[];
  severityDistribution: DistributionData[];
  categoryDistribution: DistributionData[];
  mttr: number;
  mttd: number;
  analystProductivity: AnalystProductivity[];
  topThreats: ThreatIntel[];
  attackDistribution: DistributionData[];
  responseMetrics: ResponseMetrics;
}

export interface TimeSeriesData {
  date: string;
  value: number;
  category?: string;
}

export interface DistributionData {
  name: string;
  value: number;
  color?: string;
}

export interface AnalystProductivity {
  userId: string;
  name: string;
  incidentsResolved: number;
  avgResolutionTime: number;
  alertsProcessed: number;
  falsePositiveRate: number;
  score: number;
}

export interface ResponseMetrics {
  avgDetectTime: number;
  avgRespondTime: number;
  avgResolveTime: number;
  escalationRate: number;
  falsePositiveRate: number;
  slaCompliance: number;
}

export interface Workspace {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
  members: WorkspaceMember[];
  settings: WorkspaceSettings;
  createdAt: string;
}

export interface WorkspaceMember {
  userId: string;
  role: 'owner' | 'admin' | 'member';
  joinedAt: string;
}

export interface WorkspaceSettings {
  defaultSeverity: Severity;
  autoAssignment: boolean;
  autoEscalation: boolean;
  retentionDays: number;
  integrations: string[];
}

export interface SearchResult {
  id: string;
  type: 'incident' | 'alert' | 'report' | 'threat' | 'user' | 'chat';
  title: string;
  description: string;
  url: string;
  metadata: Record<string, unknown>;
  relevance: number;
}

export interface CommandPaletteItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  shortcut?: string;
  action: () => void;
  category: string;
}
