import type {
  User, Incident, Alert, ChatMessage, Conversation, AIAgent, Report,
  Notification, ThreatIntel, AuditLog, AnalyticsData,
  Workspace, Integration
} from '../types';

const now = new Date();
const daysAgo = (d: number) => new Date(now.getTime() - d * 86400000);
const hoursAgo = (h: number) => new Date(now.getTime() - h * 3600000);
const minutesAgo = (m: number) => new Date(now.getTime() - m * 60000);

const users: User[] = [
  { id: 'u1', email: 'sarah.chen@sentinelops.ai', name: 'Sarah Chen', role: 'admin', department: 'Security Operations', status: 'online', lastActive: now.toISOString(), createdAt: daysAgo(365).toISOString(), preferences: { theme: 'dark', sidebarCollapsed: false, notifications: { email: true, push: true, desktop: true, sound: true, severityFilter: ['critical', 'high', 'medium'], categories: ['incident', 'alert', 'system'] }, ai: { model: 'gpt-4o', temperature: 0.7, maxTokens: 4096, streamingEnabled: true, memoryEnabled: true, reasoningEnabled: true, autoTriage: true, autoInvestigate: false }, language: 'en', timezone: 'America/New_York', dateFormat: 'MMM D, YYYY HH:mm' }, apiKeys: [{ id: 'ak1', name: 'Production API', key: 'sk_prod_...', prefix: 'sk_prod', createdAt: daysAgo(30).toISOString(), expiresAt: daysAgo(-90).toISOString(), lastUsed: hoursAgo(2).toISOString(), permissions: ['read', 'write'], active: true }] },
  { id: 'u2', email: 'james.rodriguez@sentinelops.ai', name: 'James Rodriguez', role: 'analyst', department: 'Threat Intelligence', status: 'online', lastActive: minutesAgo(5).toISOString(), createdAt: daysAgo(200).toISOString(), preferences: { theme: 'dark', sidebarCollapsed: false, notifications: { email: true, push: true, desktop: false, sound: false, severityFilter: ['critical', 'high'], categories: ['incident', 'alert'] }, ai: { model: 'claude-3-5-sonnet', temperature: 0.5, maxTokens: 2048, streamingEnabled: true, memoryEnabled: true, reasoningEnabled: false, autoTriage: false, autoInvestigate: false }, language: 'en', timezone: 'America/Los_Angeles', dateFormat: 'MMM D, YYYY HH:mm' }, apiKeys: [] },
  { id: 'u3', email: 'emma.watson@sentinelops.ai', name: 'Emma Watson', role: 'analyst', department: 'Incident Response', status: 'away', lastActive: hoursAgo(2).toISOString(), createdAt: daysAgo(150).toISOString(), preferences: { theme: 'dark', sidebarCollapsed: true, notifications: { email: false, push: true, desktop: true, sound: true, severityFilter: ['critical', 'high', 'medium', 'low'], categories: ['incident', 'alert', 'agent'] }, ai: { model: 'gpt-4o', temperature: 0.8, maxTokens: 4096, streamingEnabled: true, memoryEnabled: true, reasoningEnabled: true, autoTriage: true, autoInvestigate: true }, language: 'en', timezone: 'Europe/London', dateFormat: 'DD MMM YYYY HH:mm' }, apiKeys: [] },
  { id: 'u4', email: 'michael.kim@sentinelops.ai', name: 'Michael Kim', role: 'viewer', department: 'Compliance', status: 'offline', lastActive: daysAgo(1).toISOString(), createdAt: daysAgo(100).toISOString(), preferences: { theme: 'system', sidebarCollapsed: false, notifications: { email: true, push: false, desktop: false, sound: false, severityFilter: ['critical'], categories: ['incident'] }, ai: { model: 'gemini-1.5-pro', temperature: 0.3, maxTokens: 1024, streamingEnabled: false, memoryEnabled: false, reasoningEnabled: false, autoTriage: false, autoInvestigate: false }, language: 'en', timezone: 'Asia/Tokyo', dateFormat: 'YYYY-MM-DD HH:mm' }, apiKeys: [] },
  { id: 'u5', email: 'alex.patel@sentinelops.ai', name: 'Alex Patel', role: 'analyst', department: 'Security Operations', status: 'busy', lastActive: minutesAgo(30).toISOString(), createdAt: daysAgo(80).toISOString(), preferences: { theme: 'dark', sidebarCollapsed: false, notifications: { email: true, push: true, desktop: true, sound: true, severityFilter: ['critical', 'high', 'medium'], categories: ['incident', 'alert', 'system', 'agent'] }, ai: { model: 'gpt-4o', temperature: 0.6, maxTokens: 4096, streamingEnabled: true, memoryEnabled: true, reasoningEnabled: true, autoTriage: true, autoInvestigate: false }, language: 'en', timezone: 'America/Chicago', dateFormat: 'MMM D, YYYY HH:mm' }, apiKeys: [] },
];

const incidents: Incident[] = [];
const incidentTitles = [
  'Ransomware Deployment on File Server FS-01',
  'Lateral Movement Detected from DMZ to Internal Network',
  'Phishing Campaign Targeting Executive Team',
  'Data Exfiltration via DNS Tunneling',
  'Suspicious PowerShell Execution on DC-01',
  'Unauthorized Access to AWS S3 Bucket',
  'Credential Dumping via LSASS Process',
  'Malicious DLL Injection in Web Application',
  'Supply Chain Compromise via Third-Party Update',
  'Insider Threat: Unauthorized Data Export',
  'DDoS Attack on Public-Facing API Gateway',
  'Zero-Day Exploit in VPN Appliance',
  'Business Email Compromise: Wire Transfer Fraud',
  'Cryptojacking on Kubernetes Cluster',
  'SQL Injection Attempt on Customer Portal',
  'Man-in-the-Middle Attack on Corporate WiFi',
  'Backdoor Installation on Web Server',
  'Privilege Escalation via Kernel Exploit',
  'Social Engineering: Fake IT Support Call',
  'USB Drop Attack in Parking Lot',
];

const categories = ['Malware', 'Phishing', 'Data Exfiltration', 'Lateral Movement', 'Privilege Escalation', 'Denial of Service', 'Insider Threat', 'Ransomware', 'Supply Chain', 'Credential Compromise', 'Web Attack', 'Network Intrusion'];
const severities: Array<'critical' | 'high' | 'medium' | 'low' | 'info'> = ['critical', 'high', 'medium', 'low', 'info'];
const statuses: Array<'open' | 'in_progress' | 'resolved' | 'closed' | 'escalated' | 'pending'> = ['open', 'in_progress', 'resolved', 'closed', 'escalated', 'pending'];

for (let i = 0; i < 100; i++) {
  const title = incidentTitles[i % incidentTitles.length] + (i >= incidentTitles.length ? ` #${i + 1}` : '');
  const severity = severities[Math.floor(Math.random() * (i < 20 ? 2 : severities.length))];
  const status = statuses[Math.floor(Math.random() * statuses.length)];
  const assignee = Math.random() > 0.3 ? users[Math.floor(Math.random() * users.length)] : undefined;
  const reporter = users[Math.floor(Math.random() * users.length)];
  const createdAt = daysAgo(Math.floor(Math.random() * 60)).toISOString();
  const updatedAt = daysAgo(Math.floor(Math.random() * 30)).toISOString();
  
  incidents.push({
    id: `INC-${2024}-${String(i + 1).padStart(4, '0')}`,
    title,
    description: `Investigation initiated for ${title.toLowerCase()}. Initial analysis indicates potential compromise of ${Math.random() > 0.5 ? 'multiple systems' : 'a critical asset'}. Further analysis required to determine scope and impact.`,
    severity,
    status,
    category: categories[Math.floor(Math.random() * categories.length)],
    subcategory: 'Unknown',
    assignee,
    reporter,
    createdAt,
    updatedAt,
    resolvedAt: status === 'resolved' || status === 'closed' ? daysAgo(Math.floor(Math.random() * 10)).toISOString() : undefined,
    closedAt: status === 'closed' ? daysAgo(Math.floor(Math.random() * 5)).toISOString() : undefined,
    source: ['CrowdStrike Falcon', 'Microsoft Sentinel', 'Splunk ES', 'Palo Alto Cortex', 'Custom Rule', 'User Report', 'VirusTotal', 'Threat Feed'][Math.floor(Math.random() * 8)],
    affectedAssets: [`WS-${String(Math.floor(Math.random() * 500) + 1).padStart(3, '0')}`, `SRV-${String(Math.floor(Math.random() * 100) + 1).padStart(3, '0')}`],
    indicators: [],
    comments: [],
    attachments: [],
    timeline: [],
    relatedIncidents: [],
    aiAnalysis: Math.random() > 0.5 ? {
      summary: `AI analysis suggests this incident is ${severity === 'critical' ? 'highly likely' : 'potentially'} related to ${['APT29', 'Lazarus Group', 'FIN7', 'Carbanak', 'MageCart', 'Unknown Actor'][Math.floor(Math.random() * 6)]}.`,
      threatLevel: Math.random() * 100,
      recommendedActions: ['Isolate affected systems', 'Collect forensic evidence', 'Reset compromised credentials', 'Review firewall rules'],
      similarIncidents: [`INC-2024-${String(Math.floor(Math.random() * 100) + 1).padStart(4, '0')}`],
      iocAnalysis: 'Multiple indicators of compromise identified. Further enrichment recommended.',
      attackPattern: ['Initial Access', 'Execution', 'Persistence', 'Privilege Escalation', 'Defense Evasion', 'Credential Access', 'Discovery', 'Lateral Movement', 'Collection', 'Exfiltration'][Math.floor(Math.random() * 10)],
      confidence: Math.random() * 0.5 + 0.5,
    } : undefined,
    metrics: {
      timeToDetect: Math.floor(Math.random() * 86400),
      timeToRespond: Math.floor(Math.random() * 3600),
      timeToResolve: status === 'resolved' || status === 'closed' ? Math.floor(Math.random() * 172800) : undefined,
      falsePositive: Math.random() > 0.9,
    },
    tags: ['investigation', 'active', 'enrichment-needed'].filter(() => Math.random() > 0.5),
  });
}

const alerts: Alert[] = [];
for (let i = 0; i < 50; i++) {
  const severity = severities[Math.floor(Math.random() * (i < 10 ? 2 : severities.length))];
  const status = ['new', 'acknowledged', 'suppressed', 'resolved', 'false_positive'][Math.floor(Math.random() * 5)] as Alert['status'];
  alerts.push({
    id: `ALT-${2024}-${String(i + 1).padStart(4, '0')}`,
    title: `Suspicious ${['Network Traffic', 'Process Execution', 'File Access', 'Login Attempt', 'DNS Query', 'Registry Modification', 'Service Installation', 'PowerShell Command'][Math.floor(Math.random() * 8)]} Detected`,
    description: `Anomalous activity detected matching signature ${['SIG-2024-0' + Math.floor(Math.random() * 100), 'TTP-APT29-' + Math.floor(Math.random() * 50), 'IOC-Hash-' + Math.floor(Math.random() * 1000)][Math.floor(Math.random() * 3)]}.`,
    severity,
    status,
    source: ['CrowdStrike Falcon', 'Microsoft Sentinel', 'Splunk ES', 'Palo Alto Cortex', 'Custom Rule', 'Sigma Rule'][Math.floor(Math.random() * 6)],
    createdAt: hoursAgo(Math.floor(Math.random() * 72)).toISOString(),
    updatedAt: hoursAgo(Math.floor(Math.random() * 24)).toISOString(),
    incidentId: Math.random() > 0.5 ? incidents[Math.floor(Math.random() * incidents.length)].id : undefined,
    ruleName: `Rule: ${['Suspicious PowerShell', 'Lateral Movement', 'Data Exfiltration', 'Malware Detection', 'Credential Access', 'Persistence Mechanism'][Math.floor(Math.random() * 6)]}`,
    ruleId: `RULE-${Math.floor(Math.random() * 1000)}`,
    rawData: {},
    enrichment: {
      geoLocation: Math.random() > 0.5 ? { country: ['US', 'CN', 'RU', 'KP', 'IR', 'BR', 'DE', 'GB'][Math.floor(Math.random() * 8)], city: 'Unknown', lat: Math.random() * 180 - 90, lng: Math.random() * 360 - 180, isp: 'Unknown', asn: 'AS' + Math.floor(Math.random() * 65535) } : undefined,
      reputation: { score: Math.floor(Math.random() * 100), source: 'VirusTotal', category: 'Malicious', lastChecked: hoursAgo(Math.floor(Math.random() * 24)).toISOString() },
      whois: undefined,
      vtResults: { positives: Math.floor(Math.random() * 70), total: 70, permalink: 'https://virustotal.com', scanDate: daysAgo(Math.floor(Math.random() * 30)).toISOString(), engines: {} },
      mitreTechniques: [
        { id: 'T1059', name: 'Command and Scripting Interpreter', tactic: 'Execution', description: 'Adversaries may abuse command and script interpreters...', url: 'https://attack.mitre.org/techniques/T1059/' },
        { id: 'T1055', name: 'Process Injection', tactic: 'Defense Evasion', description: 'Adversaries may inject code into processes...', url: 'https://attack.mitre.org/techniques/T1055/' },
      ].slice(0, Math.floor(Math.random() * 2) + 1),
    },
    falsePositiveScore: Math.random() * 100,
  });
}

const chatMessages: ChatMessage[] = [];
const chatConversations: Conversation[] = [];

const chatPrompts = [
  'Analyze the latest ransomware incident INC-2024-0001',
  'Show me all high severity incidents from last week',
  'Generate a threat intelligence report for APT29',
  'What are the top 10 IOCs from this month?',
  'Investigate the lateral movement on DC-01',
  'Create an incident for the phishing email targeting executives',
  'Run the malware analysis playbook on hash 5d41402abc4b2a76b9719d911017c592',
  'Summarize all incidents assigned to Sarah Chen',
  'What is the current MTTR for our SOC?',
  'Show me the threat landscape for the financial sector',
  'Analyze the DNS tunneling activity from 192.168.1.100',
  'Generate an executive summary of Q3 security posture',
  'Compare this incident to similar ones in our database',
  'What MITRE ATT&CK techniques were used in the latest breach?',
  'Enrich the IP address 185.220.101.42 with threat intel',
];

for (let i = 0; i < 10; i++) {
  const convId = `conv-${i + 1}`;
  const messages: ChatMessage[] = [];
  const msgCount = Math.floor(Math.random() * 8) + 3;
  
  for (let j = 0; j < msgCount; j++) {
    const isUser = j % 2 === 0;
    messages.push({
      id: `msg-${i}-${j}`,
      role: isUser ? 'user' : 'assistant',
      content: isUser 
        ? chatPrompts[Math.floor(Math.random() * chatPrompts.length)]
        : `I've analyzed the data and here are my findings:\n\n## Analysis Summary\n\nThe ${['incident', 'alert', 'threat actor', 'attack pattern'][Math.floor(Math.random() * 4)]} shows ${['clear indicators of compromise', 'sophisticated techniques', 'common attack patterns', 'advanced persistent threat behavior'][Math.floor(Math.random() * 4)]}.\n\n### Key Findings\n- **Severity**: ${['Critical', 'High', 'Medium', 'Low'][Math.floor(Math.random() * 4)]}\n- **Confidence**: ${(Math.random() * 0.4 + 0.6).toFixed(2)}\n- **Affected Systems**: ${Math.floor(Math.random() * 10) + 1}\n\n### Recommended Actions\n1. Isolate affected endpoints immediately\n2. Collect forensic evidence from compromised systems\n3. Reset all potentially compromised credentials\n4. Review and update firewall rules\n5. Deploy additional monitoring on lateral movement paths\n\n\`\`\`json\n{\n  "incident_id": "INC-2024-${String(Math.floor(Math.random() * 100) + 1).padStart(4, '0')}",\n  "severity": "${['critical', 'high', 'medium', 'low'][Math.floor(Math.random() * 4)]}",\n  "status": "${['open', 'in_progress', 'resolved'][Math.floor(Math.random() * 3)]}"\n}\n\`\`\`\n\nWould you like me to ${['create an incident', 'run a deeper investigation', 'generate a report', 'escalate to the IR team'][Math.floor(Math.random() * 4)]}?`,
      timestamp: hoursAgo(Math.floor(Math.random() * 48) + j * 0.5).toISOString(),
      conversationId: convId,
      metadata: !isUser ? { model: 'gpt-4o', tokensUsed: Math.floor(Math.random() * 2000) + 500, latency: Math.random() * 5 + 1, confidence: Math.random() * 0.3 + 0.7, sources: ['CrowdStrike', 'VirusTotal', 'MITRE ATT&CK', 'MISP'] } : undefined,
      reactions: [],
      reasoning: !isUser ? `1. Analyzed user query about ${['incident', 'threat', 'alert', 'report'][Math.floor(Math.random() * 4)]}\n2. Retrieved relevant data from ${['incident database', 'threat intel feeds', 'SIEM logs', 'enrichment services'][Math.floor(Math.random() * 4)]}\n3. Cross-referenced with ${['MITRE ATT&CK', 'VirusTotal', 'MISP', 'internal knowledge base'][Math.floor(Math.random() * 4)]}\n4. Generated structured response with actionable recommendations` : undefined,
    });
  }
  
  chatMessages.push(...messages);
  
  chatConversations.push({
    id: convId,
    title: `Investigation: ${['Ransomware Analysis', 'Threat Intel Query', 'Incident Triage', 'Report Generation', 'IOC Enrichment', 'Agent Coordination'][Math.floor(Math.random() * 6)]}`,
    messages,
    createdAt: daysAgo(Math.floor(Math.random() * 30)).toISOString(),
    updatedAt: hoursAgo(Math.floor(Math.random() * 24)).toISOString(),
    pinned: i < 3,
    archived: false,
    tags: ['investigation', 'ai-assisted', 'active'].filter(() => Math.random() > 0.5),
    memory: {
      entities: ['APT29', 'ransomware', 'lateral movement', 'credential dumping'],
      context: 'Ongoing investigation into potential APT activity',
      preferences: { detail_level: 'technical', format: 'structured' },
      lastSummary: 'Investigating suspicious activity on file server FS-01',
    },
    agent: {
      id: `agent-${i + 1}`,
      name: ['Triage Agent', 'Investigation Agent', 'Response Agent', 'Analyst Copilot'][i % 4],
      type: ['triage', 'investigation', 'response', 'analyst'][i % 4] as AIAgent['type'],
      status: 'idle',
      description: 'AI-powered security analysis agent',
      capabilities: ['incident analysis', 'threat hunting', 'ioc enrichment', 'report generation'],
      icon: 'Bot',
      color: '#00E5FF',
      config: { autoRun: false, maxIterations: 10, timeout: 300, tools: ['search', 'enrich', 'create_incident'], permissions: ['read', 'write'] },
      metrics: { totalRuns: Math.floor(Math.random() * 500) + 50, successRate: Math.random() * 0.2 + 0.8, avgExecutionTime: Math.random() * 30 + 10, incidentsResolved: Math.floor(Math.random() * 100), alertsProcessed: Math.floor(Math.random() * 1000) },
      logs: [],
    },
  });
}

const agents: AIAgent[] = [
  { id: 'agent-triage', name: 'Triage Agent', type: 'triage', status: 'running', description: 'Automatically triages incoming alerts and assigns severity', capabilities: ['alert triage', 'severity assessment', 'auto-assignment', 'false positive detection'], icon: 'Filter', color: '#00E5FF', config: { autoRun: true, maxIterations: 5, timeout: 120, tools: ['analyze_alert', 'query_threat_intel', 'check_history'], permissions: ['read', 'write'] }, metrics: { totalRuns: 1247, successRate: 0.94, avgExecutionTime: 15.3, lastRunAt: minutesAgo(5).toISOString(), incidentsResolved: 89, alertsProcessed: 3421 }, logs: [{ id: 'log-1', timestamp: minutesAgo(5).toISOString(), level: 'info', message: 'Processed 23 alerts in the last hour', step: 'triage_batch', duration: 15.3, metadata: { alerts_processed: 23, false_positives: 3 } }, { id: 'log-2', timestamp: minutesAgo(15).toISOString(), level: 'warning', message: 'High volume of alerts from CrowdStrike integration', step: 'monitor', duration: 0, metadata: { source: 'CrowdStrike', count: 45 } }] },
  { id: 'agent-investigation', name: 'Investigation Agent', type: 'investigation', status: 'thinking', description: 'Deep-dive investigation into complex incidents', capabilities: ['forensic analysis', 'timeline reconstruction', 'ioc hunting', 'attack pattern analysis'], icon: 'Search', color: '#8B5CF6', config: { autoRun: false, maxIterations: 20, timeout: 600, tools: ['hunt', 'enrich', 'correlate', 'analyze'], permissions: ['read', 'write'] }, metrics: { totalRuns: 456, successRate: 0.91, avgExecutionTime: 245.7, lastRunAt: minutesAgo(2).toISOString(), incidentsResolved: 67, alertsProcessed: 890 }, logs: [{ id: 'log-3', timestamp: minutesAgo(2).toISOString(), level: 'info', message: 'Analyzing lateral movement patterns in incident INC-2024-0042', step: 'investigate', duration: 180, metadata: { incident_id: 'INC-2024-0042', systems_affected: 5 } }] },
  { id: 'agent-response', name: 'Response Agent', type: 'response', status: 'idle', description: 'Executes automated response playbooks', capabilities: ['isolation', 'containment', 'eradication', 'recovery'], icon: 'Shield', color: '#22C55E', config: { autoRun: false, maxIterations: 10, timeout: 300, tools: ['isolate', 'block', 'quarantine', 'reset_credentials'], permissions: ['read', 'write', 'execute'] }, metrics: { totalRuns: 234, successRate: 0.97, avgExecutionTime: 45.2, lastRunAt: hoursAgo(3).toISOString(), incidentsResolved: 156, alertsProcessed: 0 }, logs: [{ id: 'log-4', timestamp: hoursAgo(3).toISOString(), level: 'info', message: 'Successfully isolated 3 endpoints and blocked malicious IPs', step: 'respond', duration: 45.2, metadata: { endpoints_isolated: 3, ips_blocked: 12 } }] },
  { id: 'agent-analyst', name: 'Analyst Copilot', type: 'analyst', status: 'idle', description: 'AI assistant for security analysts', capabilities: ['query generation', 'report writing', 'summarization', 'recommendation'], icon: 'Brain', color: '#FACC15', config: { autoRun: false, maxIterations: 15, timeout: 180, tools: ['query', 'summarize', 'generate', 'recommend'], permissions: ['read'] }, metrics: { totalRuns: 3892, successRate: 0.99, avgExecutionTime: 8.5, lastRunAt: minutesAgo(1).toISOString(), incidentsResolved: 0, alertsProcessed: 0 }, logs: [{ id: 'log-5', timestamp: minutesAgo(1).toISOString(), level: 'info', message: 'Generated executive summary for Q3 security posture', step: 'generate', duration: 8.5, metadata: { report_type: 'executive', pages: 12 } }] },
  { id: 'agent-hunt', name: 'Threat Hunt Agent', type: 'custom', status: 'running', description: 'Proactive threat hunting across the environment', capabilities: ['behavioral analysis', 'anomaly detection', 'threat hunting', 'ioc sweeping'], icon: 'Target', color: '#F97316', config: { autoRun: true, maxIterations: 50, timeout: 1800, tools: ['hunt', 'sweep', 'analyze', 'correlate'], permissions: ['read', 'write'] }, metrics: { totalRuns: 678, successRate: 0.88, avgExecutionTime: 520.4, lastRunAt: minutesAgo(30).toISOString(), incidentsResolved: 34, alertsProcessed: 2345 }, logs: [{ id: 'log-6', timestamp: minutesAgo(30).toISOString(), level: 'info', message: 'Completed weekly threat hunt sweep', step: 'hunt', duration: 520.4, metadata: { systems_scanned: 450, anomalies_found: 7 } }] },
];

const reports: Report[] = [];
for (let i = 0; i < 30; i++) {
  const type = ['executive', 'technical', 'incident', 'threat', 'compliance', 'custom'][Math.floor(Math.random() * 6)] as Report['type'];
  reports.push({
    id: `RPT-${2024}-${String(i + 1).padStart(4, '0')}`,
    title: `${['Q3', 'Q4', 'Monthly', 'Weekly', 'Incident', 'Threat'][Math.floor(Math.random() * 6)]} ${['Security Posture', 'Threat Landscape', 'Incident Analysis', 'Compliance Report', 'Executive Summary', 'Technical Deep Dive'][Math.floor(Math.random() * 6)]}`,
    type,
    status: ['draft', 'generated', 'reviewing', 'approved', 'archived'][Math.floor(Math.random() * 5)] as Report['status'],
    content: `# ${type.charAt(0).toUpperCase() + type.slice(1)} Report\n\n## Executive Summary\n\nThis report covers the security posture for the period...\n\n## Key Findings\n\n1. **Threat Landscape**: The organization faced ${Math.floor(Math.random() * 500) + 100} threats during this period.\n2. **Incident Response**: ${Math.floor(Math.random() * 50) + 10} incidents were successfully resolved.\n3. **Mean Time to Detect**: ${(Math.random() * 24 + 1).toFixed(1)} hours\n4. **Mean Time to Respond**: ${(Math.random() * 4 + 0.5).toFixed(1)} hours\n\n## Recommendations\n\n- Enhance endpoint detection capabilities\n- Implement zero-trust architecture\n- Increase security awareness training\n- Review and update incident response playbooks`,
    summary: `Comprehensive ${type} report covering security metrics, threat intelligence, and incident analysis for the reporting period.`,
    createdAt: daysAgo(Math.floor(Math.random() * 90)).toISOString(),
    updatedAt: daysAgo(Math.floor(Math.random() * 30)).toISOString(),
    generatedBy: Math.random() > 0.5 ? users[0] : agents[3],
    filters: {
      dateRange: { start: daysAgo(30).toISOString(), end: now.toISOString() },
      severity: ['critical', 'high', 'medium'],
      categories: ['Malware', 'Phishing', 'Data Exfiltration'],
      assignees: ['u1', 'u2', 'u3'],
      status: ['resolved', 'closed'],
    },
    charts: [
      { id: 'chart-1', type: 'line', title: 'Incident Trends', data: [], config: {} },
      { id: 'chart-2', type: 'pie', title: 'Severity Distribution', data: [], config: {} },
    ],
    incidents: incidents.slice(0, 10).map(i => i.id),
    aiSummary: `AI-generated summary: The organization experienced a ${Math.random() > 0.5 ? 'significant' : 'moderate'} increase in ${['phishing attempts', 'malware detections', 'lateral movement', 'data exfiltration'][Math.floor(Math.random() * 4)]}. Response times improved by ${Math.floor(Math.random() * 30)}%.`,
    exportFormats: ['pdf', 'docx', 'html', 'json'],
  });
}

const notifications: Notification[] = [];
for (let i = 0; i < 25; i++) {
  notifications.push({
    id: `notif-${i + 1}`,
    title: ['New Critical Alert', 'Incident Escalated', 'Agent Completed Task', 'Report Generated', 'Mentioned in Comment', 'System Update', 'Threat Intel Update'][Math.floor(Math.random() * 7)],
    message: `A ${['critical alert', 'high severity incident', 'new threat', 'system notification'][Math.floor(Math.random() * 4)]} requires your attention.`,
    type: ['alert', 'incident', 'system', 'agent', 'mention', 'report'][Math.floor(Math.random() * 6)] as Notification['type'],
    severity: severities[Math.floor(Math.random() * (i < 5 ? 2 : severities.length))],
    read: i > 10,
    createdAt: hoursAgo(Math.floor(Math.random() * 72)).toISOString(),
    sourceId: Math.random() > 0.5 ? incidents[Math.floor(Math.random() * incidents.length)].id : undefined,
    sourceType: 'incident',
    actionUrl: '/incidents',
  });
}

const threatIntel: ThreatIntel[] = [];
for (let i = 0; i < 20; i++) {
  threatIntel.push({
    id: `THREAT-${2024}-${String(i + 1).padStart(3, '0')}`,
    type: ['malware', 'phishing', 'apt', 'vulnerability', 'ioc', 'campaign'][Math.floor(Math.random() * 6)] as ThreatIntel['type'],
    name: ['APT29', 'Lazarus Group', 'FIN7', 'Carbanak', 'MageCart', 'Maze Ransomware', 'Ryuk', 'TrickBot', 'Emotet', 'QakBot'][Math.floor(Math.random() * 10)],
    description: `Advanced threat actor known for ${['targeting financial institutions', 'state-sponsored espionage', 'ransomware operations', 'supply chain attacks', 'cryptocurrency theft'][Math.floor(Math.random() * 5)]}.`,
    severity: severities[Math.floor(Math.random() * 3)],
    confidence: Math.random() * 0.3 + 0.7,
    sources: ['Mandiant', 'FireEye', 'CrowdStrike', 'Kaspersky', 'CISA', 'FBI'],
    iocs: [],
    mitreTechniques: [
      { id: 'T1059', name: 'Command and Scripting Interpreter', tactic: 'Execution', description: '...', url: 'https://attack.mitre.org/techniques/T1059/' },
      { id: 'T1055', name: 'Process Injection', tactic: 'Defense Evasion', description: '...', url: 'https://attack.mitre.org/techniques/T1055/' },
    ],
    firstSeen: daysAgo(Math.floor(Math.random() * 365) + 30).toISOString(),
    lastSeen: daysAgo(Math.floor(Math.random() * 30)).toISOString(),
    affectedIndustries: ['Finance', 'Healthcare', 'Government', 'Technology', 'Energy'],
    affectedRegions: ['North America', 'Europe', 'Asia Pacific'],
    threatActors: ['APT29', 'Lazarus Group', 'FIN7'],
    ttp: ['Spear Phishing', 'PowerShell', 'Lateral Movement', 'Data Exfiltration'],
    indicators: [],
  });
}

const auditLogs: AuditLog[] = [];
for (let i = 0; i < 100; i++) {
  auditLogs.push({
    id: `audit-${i + 1}`,
    action: ['CREATE_INCIDENT', 'UPDATE_INCIDENT', 'DELETE_INCIDENT', 'LOGIN', 'LOGOUT', 'EXPORT_REPORT', 'RUN_AGENT', 'UPDATE_SETTINGS', 'CREATE_USER', 'DELETE_USER'][Math.floor(Math.random() * 10)],
    actor: users[Math.floor(Math.random() * users.length)],
    target: `INC-2024-${String(Math.floor(Math.random() * 100) + 1).padStart(4, '0')}`,
    targetType: ['incident', 'user', 'report', 'agent', 'setting', 'integration'][Math.floor(Math.random() * 6)],
    details: { ip: `192.168.1.${Math.floor(Math.random() * 255)}`, userAgent: 'Mozilla/5.0', changes: { status: 'open -> in_progress' } },
    ipAddress: `192.168.1.${Math.floor(Math.random() * 255)}`,
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    timestamp: hoursAgo(Math.floor(Math.random() * 720)).toISOString(),
    severity: ['info', 'info', 'info', 'info', 'warning', 'critical'][Math.floor(Math.random() * 6)] as AuditLog['severity'],
  });
}

const analyticsData: AnalyticsData = {
  threatTrends: Array.from({ length: 30 }, (_, i) => ({
    date: daysAgo(30 - i).toISOString().split('T')[0],
    value: Math.floor(Math.random() * 100) + 20,
    category: 'Threats',
  })),
  incidentTrends: Array.from({ length: 30 }, (_, i) => ({
    date: daysAgo(30 - i).toISOString().split('T')[0],
    value: Math.floor(Math.random() * 50) + 5,
    category: 'Incidents',
  })),
  severityDistribution: [
    { name: 'Critical', value: 12, color: '#EF4444' },
    { name: 'High', value: 28, color: '#F97316' },
    { name: 'Medium', value: 45, color: '#FACC15' },
    { name: 'Low', value: 32, color: '#22C55E' },
    { name: 'Info', value: 18, color: '#00E5FF' },
  ],
  categoryDistribution: [
    { name: 'Malware', value: 25 },
    { name: 'Phishing', value: 30 },
    { name: 'Data Exfiltration', value: 15 },
    { name: 'Lateral Movement', value: 12 },
    { name: 'Privilege Escalation', value: 10 },
    { name: 'Other', value: 8 },
  ],
  mttr: 4.2,
  mttd: 1.8,
  analystProductivity: users.filter(u => u.role !== 'viewer').map(u => ({
    userId: u.id,
    name: u.name,
    incidentsResolved: Math.floor(Math.random() * 50) + 10,
    avgResolutionTime: Math.random() * 8 + 2,
    alertsProcessed: Math.floor(Math.random() * 500) + 100,
    falsePositiveRate: Math.random() * 0.15,
    score: Math.random() * 30 + 70,
  })),
  topThreats: threatIntel.slice(0, 5),
  attackDistribution: [
    { name: 'Initial Access', value: 35 },
    { name: 'Execution', value: 28 },
    { name: 'Persistence', value: 15 },
    { name: 'Privilege Escalation', value: 12 },
    { name: 'Defense Evasion', value: 10 },
  ],
  responseMetrics: {
    avgDetectTime: 1.8,
    avgRespondTime: 4.2,
    avgResolveTime: 12.5,
    escalationRate: 0.15,
    falsePositiveRate: 0.08,
    slaCompliance: 0.94,
  },
};

const workspaces: Workspace[] = [
  { id: 'ws-1', name: 'Production SOC', description: 'Main security operations center workspace', color: '#00E5FF', icon: 'Shield', members: users.map(u => ({ userId: u.id, role: u.id === 'u1' ? 'owner' : 'member', joinedAt: u.createdAt })), settings: { defaultSeverity: 'medium', autoAssignment: true, autoEscalation: true, retentionDays: 365, integrations: ['crowdstrike', 'sentinel', 'splunk'] }, createdAt: daysAgo(365).toISOString() },
  { id: 'ws-2', name: 'Threat Intel', description: 'Dedicated threat intelligence workspace', color: '#8B5CF6', icon: 'Target', members: users.filter(u => u.department === 'Threat Intelligence').map(u => ({ userId: u.id, role: 'member', joinedAt: u.createdAt })), settings: { defaultSeverity: 'high', autoAssignment: false, autoEscalation: false, retentionDays: 730, integrations: ['virustotal', 'misp'] }, createdAt: daysAgo(200).toISOString() },
  { id: 'ws-3', name: 'Incident Response', description: 'Incident response team workspace', color: '#EF4444', icon: 'AlertTriangle', members: users.filter(u => u.department === 'Incident Response').map(u => ({ userId: u.id, role: 'member', joinedAt: u.createdAt })), settings: { defaultSeverity: 'critical', autoAssignment: true, autoEscalation: true, retentionDays: 1095, integrations: ['thehive', 'slack'] }, createdAt: daysAgo(150).toISOString() },
];

const integrations: Integration[] = [
  { id: 'int-1', name: 'CrowdStrike Falcon', type: 'edr', status: 'connected', config: { apiKey: '***', url: 'https://api.crowdstrike.com' }, lastSyncAt: minutesAgo(5).toISOString(), metrics: { totalEvents: 2345678, eventsPerMinute: 45.2, latency: 120, errorRate: 0.001 } },
  { id: 'int-2', name: 'Microsoft Sentinel', type: 'siem', status: 'connected', config: { workspaceId: '***', tenantId: '***' }, lastSyncAt: minutesAgo(10).toISOString(), metrics: { totalEvents: 4567890, eventsPerMinute: 89.3, latency: 200, errorRate: 0.002 } },
  { id: 'int-3', name: 'Splunk Enterprise', type: 'siem', status: 'error', config: { host: 'splunk.internal', port: 8089 }, lastSyncAt: hoursAgo(2).toISOString(), lastError: 'Connection timeout after 30s', metrics: { totalEvents: 1234567, eventsPerMinute: 0, latency: 0, errorRate: 1.0 } },
  { id: 'int-4', name: 'VirusTotal', type: 'threat_intel', status: 'connected', config: { apiKey: '***' }, lastSyncAt: minutesAgo(15).toISOString(), metrics: { totalEvents: 45678, eventsPerMinute: 2.1, latency: 500, errorRate: 0.005 } },
  { id: 'int-5', name: 'Slack', type: 'notification', status: 'connected', config: { webhook: '***' }, lastSyncAt: minutesAgo(1).toISOString(), metrics: { totalEvents: 1234, eventsPerMinute: 0.5, latency: 300, errorRate: 0.0 } },
  { id: 'int-6', name: 'Palo Alto Cortex', type: 'edr', status: 'pending', config: {}, lastSyncAt: undefined, lastError: undefined, metrics: { totalEvents: 0, eventsPerMinute: 0, latency: 0, errorRate: 0 } },
];

export const mockData = {
  users,
  incidents,
  alerts,
  chatMessages,
  chatConversations,
  agents,
  reports,
  notifications,
  threatIntel,
  auditLogs,
  analyticsData,
  workspaces,
  integrations,
};

export default mockData;
