/**
 * KARNA Legal Ops — Mock Data
 * Used for UI development and prototyping.
 * Replace with real API calls when backend is ready.
 */

// ─────────────────────────────────────────────────────────────────────────────
// WORKFLOW DEFINITIONS
// ─────────────────────────────────────────────────────────────────────────────

export type WorkflowStatus = 'active' | 'coming-soon' | 'beta';

export interface Workflow {
  id: string;
  name: string;
  shortName: string;
  description: string;
  icon: string;
  status: WorkflowStatus;
  url: string;
  comingSoonNote: string | null;
  features: string[];
}

export const workflows: Workflow[] = [
  {
    id: 'ubo',
    name: 'UBO — Ultimate Beneficial Owner',
    shortName: 'UBO',
    description: 'Trace ownership chains to identify beneficial owners from Ditjen AHU documents.',
    icon: 'cascade',
    status: 'active',
    url: '/workflows/ubo',
    comingSoonNote: null,
    features: [
      'Automated UBO identification from Ditjen AHU PDFs',
      'Ownership chain visualization',
      'Risk scoring and threshold calculation',
      'Family group aggregation',
      'Exportable compliance reports',
    ],
  },
  {
    id: 'contract-review',
    name: 'Contract Review',
    shortName: 'Contracts',
    description: 'Streamline contract lifecycle management with AI-assisted analysis, automated redlines, and intelligent clause matching.',
    icon: 'document',
    status: 'coming-soon',
    url: '/workflows/contract-review',
    comingSoonNote: 'Coming soon — Q3 2026',
    features: [
      'AI-powered clause detection and risk flagging',
      'Automated redline against standard templates',
      'Counterparty negotiation timeline',
      'e-Signature integration (DocuSign, HelloSign)',
      'Version comparison and audit trail',
    ],
  },
  {
    id: 'due-diligence',
    name: 'Due Diligence',
    shortName: 'Due Diligence',
    description: 'Comprehensive M&A due diligence workspace with document management, checklist tracking, and team collaboration.',
    icon: 'shield',
    status: 'coming-soon',
    url: '/workflows/due-diligence',
    comingSoonNote: 'Coming soon — Q3 2026',
    features: [
      'Virtual data room with granular permissions',
      'Smart document classification and indexing',
      'Diligence checklist with assignee tracking',
      'Issue flagging and resolution workflow',
      'Automated findings summary generation',
    ],
  },
  {
    id: 'entity-management',
    name: 'Entity Management',
    shortName: 'Entities',
    description: 'Corporate secretarial automation for entity lifecycle management, officer tracking, and regulatory filings.',
    icon: 'building',
    status: 'coming-soon',
    url: '/workflows/entity-management',
    comingSoonNote: 'Coming soon — Q4 2026',
    features: [
      'Multi-entity hierarchy visualization',
      'Officer appointment and resignation tracking',
      'Automated regulatory filing calendar',
      'Share capital table management',
      'Document storage and retrieval',
    ],
  },
  {
    id: 'compliance-monitor',
    name: 'Compliance Monitor',
    shortName: 'Compliance',
    description: 'Continuous regulatory compliance monitoring with real-time sanctions screening, PEP checks, and adverse media alerts.',
    icon: 'radar',
    status: 'coming-soon',
    url: '/workflows/compliance-monitor',
    comingSoonNote: 'Coming soon — Q3 2026',
    features: [
      'Real-time sanctions list screening (OFAC, EU, UN)',
      'PEP (Politically Exposed Person) database checks',
      'Adverse media and news monitoring',
      'Automated alert triage and workflow routing',
      'Compliance report generation for regulators',
    ],
  },
  {
    id: 'more',
    name: 'More Workflows',
    shortName: 'More',
    description: 'Additional legal operations workflows are coming soon.',
    icon: 'plus',
    status: 'coming-soon',
    url: '#',
    comingSoonNote: 'More coming',
    features: [],
  },
];

// Alias for components expecting this name
export const mockWorkflows = workflows;

// ─────────────────────────────────────────────────────────────────────────────
// MOCK ACTIVITIES (for Dashboard ActivityFeed)
// ─────────────────────────────────────────────────────────────────────────────

export type ActivityAction =
  | 'upload'
  | 'report'
  | 'matter_create'
  | 'workflow_start'
  | 'system'
  | 'review'
  | 'analysis'
  | 'invite'
  | 'export'
  | 'share'
  | 'comment';

export interface ActivityItem {
  id: string;
  userName: string;
  userInitials: string;
  userColor: string;
  action: ActivityAction;
  description: string;
  meta?: string;
  timestamp: string;
  relativeTime: string;
}

export const mockActivities: ActivityItem[] = [
  {
    id: 'act-1',
    action: 'upload',
    userName: 'Alvin Hartono',
    userInitials: 'AH',
    userColor: '#fef3c7',
    description: 'uploaded 3 documents to',
    meta: 'PT Ekacitta — UBO Analysis',
    timestamp: '2026-04-23T10:30:00Z',
    relativeTime: '2 hours ago',
  },
  {
    id: 'act-2',
    action: 'report',
    userName: 'System',
    userInitials: 'SY',
    userColor: '#dbeafe',
    description: 'UBO Report generated for',
    meta: 'Acme Corp — 6 UBOs identified',
    timestamp: '2026-04-23T09:15:00Z',
    relativeTime: '3 hours ago',
  },
  {
    id: 'act-3',
    action: 'matter_create',
    userName: 'Sarah Wijaya',
    userInitials: 'SW',
    userColor: '#d1fae5',
    description: 'created new matter:',
    meta: 'Tokopedia Series B',
    timestamp: '2026-04-22T16:00:00Z',
    relativeTime: 'yesterday',
  },
  {
    id: 'act-4',
    action: 'workflow_start',
    userName: 'Aditya Pratama',
    userInitials: 'AP',
    userColor: '#fce7f3',
    description: 'started Contract Review for',
    meta: 'XYZ Enterprise',
    timestamp: '2026-04-22T14:20:00Z',
    relativeTime: 'yesterday',
  },
  {
    id: 'act-5',
    action: 'system',
    userName: 'System',
    userInitials: 'SY',
    userColor: '#dbeafe',
    description: 'automatically processed',
    meta: '4 documents from AHU queue',
    timestamp: '2026-04-21T11:00:00Z',
    relativeTime: '2 days ago',
  },
  {
    id: 'act-6',
    action: 'analysis',
    userName: 'Alvin Hartono',
    userInitials: 'AH',
    userColor: '#fef3c7',
    description: 'completed UBO analysis for',
    meta: 'PT Wijaya Karya — 4 UBOs',
    timestamp: '2026-04-21T08:45:00Z',
    relativeTime: '2 days ago',
  },
  {
    id: 'act-7',
    action: 'review',
    userName: 'Darin Putra',
    userInitials: 'DP',
    userColor: '#e9d5ff',
    description: 'approved draft report for',
    meta: 'PT Semen Indonesia',
    timestamp: '2026-04-20T17:30:00Z',
    relativeTime: '3 days ago',
  },
  {
    id: 'act-8',
    action: 'invite',
    userName: 'Admin',
    userInitials: 'AD',
    userColor: '#fed7aa',
    description: 'invited',
    meta: 'rachel@karna.id to workspace',
    timestamp: '2026-04-20T10:00:00Z',
    relativeTime: '3 days ago',
  },
  {
    id: 'act-9',
    action: 'export',
    userName: 'Sarah Wijaya',
    userInitials: 'SW',
    userColor: '#d1fae5',
    description: 'exported report for',
    meta: 'Tokopedia Series B — PDF',
    timestamp: '2026-04-19T15:20:00Z',
    relativeTime: '4 days ago',
  },
  {
    id: 'act-10',
    action: 'matter_create',
    userName: 'Alvin Hartono',
    userInitials: 'AH',
    userColor: '#fef3c7',
    description: 'created new matter:',
    meta: 'GoTo M&A Due Diligence',
    timestamp: '2026-04-19T09:00:00Z',
    relativeTime: '4 days ago',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// MOCK USERS (for admin page)
// ─────────────────────────────────────────────────────────────────────────────

export type UserRole = 'Admin' | 'User';
export type UserStatus = 'Active' | 'Pending' | 'Inactive';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  joined: string;
  lastActive: string;
  initials: string;
  color: string;
}

export interface PendingInvite {
  id: string;
  email: string;
  role: UserRole;
  invitedDate: string;
}

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Alvin Saptamandra',
    email: 'alvin@karnapartnership.com',
    role: 'Admin',
    status: 'Active',
    joined: 'Jan 2025',
    lastActive: '2h ago',
    initials: 'AS',
    color: '#fef3c7',
  },
  {
    id: '2',
    name: 'Aditya Bagus',
    email: 'aditya@karnapartnership.com',
    role: 'User',
    status: 'Active',
    joined: 'Feb 2025',
    lastActive: '1h ago',
    initials: 'AB',
    color: '#dbeafe',
  },
  {
    id: '3',
    name: 'Rizki D. Rildo',
    email: 'rizki@karnapartnership.com',
    role: 'User',
    status: 'Active',
    joined: 'Mar 2025',
    lastActive: '3h ago',
    initials: 'RR',
    color: '#4ade80',
  },
  {
    id: '4',
    name: 'Fitriyani Muharam',
    email: 'fitriyani@karnapartnership.com',
    role: 'User',
    status: 'Active',
    joined: 'Apr 2025',
    lastActive: '1d ago',
    initials: 'FM',
    color: '#f87171',
  },
  {
    id: '5',
    name: 'Farih Romdoni',
    email: 'farih@karnapartnership.com',
    role: 'User',
    status: 'Pending',
    joined: 'Pending',
    lastActive: 'Never',
    initials: 'FR',
    color: '#71717a',
  },
];

export const mockPendingInvites: PendingInvite[] = [
  {
    id: 'p1',
    email: 'dea.savitri@karnapartnership.com',
    role: 'User',
    invitedDate: 'Apr 20, 2026',
  },
  {
    id: 'p2',
    email: 'budi.santoso@karnapartnership.com',
    role: 'User',
    invitedDate: 'Apr 18, 2026',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// MOCK MATTERS (for UBO Workflow page)
// ─────────────────────────────────────────────────────────────────────────────

export type MatterType = 'M&A' | 'Due Diligence' | 'Compliance' | 'General';

export interface UBOAnalysis {
  id: string;
  name: string;
  date: string;
  status: 'Complete' | 'Processing' | 'Failed';
  uboCount: number;
  companyName: string;
  preparedFor: string;
}

export interface MatterDocument {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadDate: string;
  uploadedBy: string;
}

export interface MatterActivityItem {
  id: string;
  user: string;
  initials: string;
  action: string;
  timestamp: string;
  date: string;
}

export interface Matter {
  id: string;
  name: string;
  client: string;
  type: MatterType;
  description: string;
  createdDate: string;
  uboCount: number;
  lastActivity: string;
  analyses: UBOAnalysis[];
  documents: MatterDocument[];
  activities: MatterActivityItem[];
}

export const matterTypeColors: Record<MatterType, { bg: string; text: string; border: string }> = {
  'M&A': { bg: 'rgba(254, 243, 199, 0.1)', text: 'var(--accent-warm)', border: 'rgba(254, 243, 199, 0.2)' },
  'Due Diligence': { bg: 'rgba(219, 234, 254, 0.1)', text: 'var(--accent-cool)', border: 'rgba(219, 234, 254, 0.2)' },
  'Compliance': { bg: 'rgba(74, 222, 128, 0.08)', text: 'var(--success)', border: 'rgba(74, 222, 128, 0.15)' },
  'General': { bg: 'rgba(161, 161, 170, 0.08)', text: 'var(--text-secondary)', border: 'rgba(161, 161, 170, 0.15)' },
};

export const mockMatters: Matter[] = [
  {
    id: '1',
    name: 'PT Ekacitta Acquisition',
    client: 'PT Tata Investama',
    type: 'M&A',
    description: 'Due diligence for proposed acquisition of PT Ekacitta Dian Pertiwi. Full UBO tracing and compliance review required.',
    createdDate: '15 Apr 2026',
    uboCount: 2,
    lastActivity: '2h ago',
    analyses: [
      { id: 'a1', name: 'PT Ekacitta Dian Pertiwi', date: '17 Apr 2026', status: 'Complete', uboCount: 6, companyName: 'PT Ekacitta Dian Pertiwi', preparedFor: 'Darin Putra Bagaskara' },
      { id: 'a2', name: 'PT Laniros Gemala Sakti', date: '16 Apr 2026', status: 'Complete', uboCount: 4, companyName: 'PT Laniros Gemala Sakti', preparedFor: 'Darin Putra Bagaskara' },
    ],
    documents: [
      { id: 'd1', name: 'SK AHU PT Ekacitta Dian Pertiwi 2022.pdf', size: 2450000, type: 'application/pdf', uploadDate: '17 Apr 2026', uploadedBy: 'Darin Putra Bagaskara' },
      { id: 'd2', name: 'Profil Perseroan PT EDP 2025.pdf', size: 1820000, type: 'application/pdf', uploadDate: '17 Apr 2026', uploadedBy: 'Darin Putra Bagaskara' },
      { id: 'd3', name: 'Akta Notaris PT Laniros.pdf', size: 3100000, type: 'application/pdf', uploadDate: '16 Apr 2026', uploadedBy: 'Darin Putra Bagaskara' },
    ],
    activities: [
      { id: 'act1', user: 'Darin Putra Bagaskara', initials: 'DP', action: 'Created new UBO analysis for PT Ekacitta Dian Pertiwi', timestamp: '2h ago', date: 'Today' },
      { id: 'act2', user: 'Darin Putra Bagaskara', initials: 'DP', action: 'Uploaded document SK AHU PT EDP 2022.pdf', timestamp: '3h ago', date: 'Today' },
      { id: 'act3', user: 'Darin Putra Bagaskara', initials: 'DP', action: 'Created matter PT Ekacitta Acquisition', timestamp: '1d ago', date: 'Yesterday' },
    ],
  },
  {
    id: '2',
    name: 'Tokopedia Series B',
    client: 'Tokopedia Holdings',
    type: 'Due Diligence',
    description: 'Series B investment UBO and compliance review for Tokopedia Group entities.',
    createdDate: '10 Apr 2026',
    uboCount: 1,
    lastActivity: '1d ago',
    analyses: [
      { id: 'b1', name: 'Tokopedia Holdings UBO', date: '14 Apr 2026', status: 'Complete', uboCount: 3, companyName: 'Tokopedia Holdings', preparedFor: 'Tokopedia Legal' },
    ],
    documents: [],
    activities: [
      { id: 'act4', user: 'Sarah Wijaya', initials: 'SW', action: 'Created UBO analysis for Tokopedia Series B', timestamp: '1d ago', date: 'Yesterday' },
    ],
  },
  {
    id: '3',
    name: 'Regulatory Compliance 2026',
    client: 'Internal',
    type: 'Compliance',
    description: 'Annual AML compliance review for all active entities under KARNA Partnership.',
    createdDate: '05 Apr 2026',
    uboCount: 0,
    lastActivity: '3d ago',
    analyses: [],
    documents: [],
    activities: [
      { id: 'act5', user: 'Ahmad Hidayat', initials: 'AH', action: 'Created matter Regulatory Compliance 2026', timestamp: '3d ago', date: '3 days ago' },
    ],
  },
  {
    id: '4',
    name: 'Gojek Restructuring',
    client: 'Gojek Indonesia',
    type: 'M&A',
    description: 'Corporate restructuring and UBO tracing for merger of Gojek operational entities.',
    createdDate: '01 Apr 2026',
    uboCount: 3,
    lastActivity: '1w ago',
    analyses: [
      { id: 'c1', name: 'Gojek Holdings UBO', date: '10 Apr 2026', status: 'Complete', uboCount: 8, companyName: 'Gojek Indonesia', preparedFor: 'Gojek Legal' },
      { id: 'c2', name: 'PT Aplikasi Karya Anak Bangsa', date: '08 Apr 2026', status: 'Complete', uboCount: 5, companyName: 'PT AKAB', preparedFor: 'Gojek Legal' },
      { id: 'c3', name: 'Midi Utama Indonesia', date: '05 Apr 2026', status: 'Processing', uboCount: 0, companyName: 'Midi Utama', preparedFor: 'Gojek Legal' },
    ],
    documents: [
      { id: 'd4', name: 'Gojek AHU Profile 2025.pdf', size: 4200000, type: 'application/pdf', uploadDate: '10 Apr 2026', uploadedBy: 'Gojek Legal' },
    ],
    activities: [
      { id: 'act6', user: 'Rina Susanto', initials: 'RS', action: 'Started UBO analysis for Midi Utama Indonesia', timestamp: '1w ago', date: '1 week ago' },
      { id: 'act7', user: 'Rina Susanto', initials: 'RS', action: 'Created matter Gojek Restructuring', timestamp: '1w ago', date: '1 week ago' },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// HELPER FUNCTIONS
// ─────────────────────────────────────────────────────────────────────────────

export function getActiveWorkflows(): Workflow[] {
  return workflows.filter((w) => w.status === 'active');
}

export function getComingSoonWorkflows(): Workflow[] {
  return workflows.filter((w) => w.status === 'coming-soon');
}

export function getWorkflowById(id: string): Workflow | undefined {
  return workflows.find((w) => w.id === id);
}

export function getMatterById(id: string): Matter | undefined {
  return mockMatters.find((m) => m.id === id);
}
