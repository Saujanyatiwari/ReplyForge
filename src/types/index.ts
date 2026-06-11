// ─── Enums & Union Types ────────────────────────────────────────────────────

export type Situation =
  | 'payment-invoice'
  | 'negotiation-raise'
  | 'follow-up-no-reply'
  | 'polite-rejection'
  | 'complaint-response'
  | 'feedback-revision'
  | 'custom';

export type DesiredOutcome =
  | 'get-a-response'
  | 'get-paid-faster'
  | 'negotiate-better-terms'
  | 'set-boundaries'
  | 'maintain-relationship'
  | 'close-conversation'
  | 'appear-confident';

export type QuickAction =
  | 'firmer'
  | 'more-polite'
  | 'shorter'
  | 'more-human'
  | 'more-confident';

export type Theme = 'light' | 'dark';

// ─── Core Interfaces ─────────────────────────────────────────────────────────

export interface Reply {
  id: string;
  title: string;
  content: string;
}

export interface Playbook {
  id: string;
  name: string;
  situation: Situation;
  desiredOutcome: DesiredOutcome;
  writingExamples: string[];
  isBuiltIn: boolean;
  createdAt: number;
}

export interface Settings {
  apiKey: string;
  theme: Theme;
}

export interface GenerationResponse {
  replies: Array<{
    title: string;
    content: string;
  }>;
  risk_analysis: string[];
}

// ─── Form State ───────────────────────────────────────────────────────────────

export interface WorkspaceState {
  incomingMessage: string;
  situation: Situation;
  desiredOutcome: DesiredOutcome;
  role: string;
  writingExamples: string[];
}

// ─── UI State ────────────────────────────────────────────────────────────────

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

// ─── Display Data ────────────────────────────────────────────────────────────

export interface SituationOption {
  value: Situation;
  label: string;
  description: string;
}

export interface OutcomeOption {
  value: DesiredOutcome;
  label: string;
  icon: string;
}

export interface QuickActionOption {
  value: QuickAction;
  label: string;
  icon: string;
}

// ─── Constants ───────────────────────────────────────────────────────────────

export const SITUATION_OPTIONS: SituationOption[] = [
  { value: 'payment-invoice', label: 'Payment / Invoice', description: 'Follow up on outstanding payments' },
  { value: 'negotiation-raise', label: 'Negotiation / Raise', description: 'Negotiate salary or project terms' },
  { value: 'follow-up-no-reply', label: 'Follow-up (No Reply)', description: 'Chase a non-responsive contact' },
  { value: 'polite-rejection', label: 'Polite Rejection', description: 'Decline professionally and kindly' },
  { value: 'complaint-response', label: 'Complaint Response', description: 'Address a complaint or criticism' },
  { value: 'feedback-revision', label: 'Feedback / Revision Request', description: 'Ask for or respond to revisions' },
  { value: 'custom', label: 'Custom', description: 'Any other professional situation' },
];

export const OUTCOME_OPTIONS: OutcomeOption[] = [
  { value: 'get-a-response', label: 'Get a response', icon: '💬' },
  { value: 'get-paid-faster', label: 'Get paid faster', icon: '💰' },
  { value: 'negotiate-better-terms', label: 'Negotiate better terms', icon: '🤝' },
  { value: 'set-boundaries', label: 'Set boundaries firmly', icon: '🛡️' },
  { value: 'maintain-relationship', label: 'Maintain / build relationship', icon: '🌱' },
  { value: 'close-conversation', label: 'Close conversation professionally', icon: '✅' },
  { value: 'appear-confident', label: 'Appear confident', icon: '💪' },
];

export const QUICK_ACTION_OPTIONS: QuickActionOption[] = [
  { value: 'firmer', label: 'Make Firmer', icon: '🔒' },
  { value: 'more-polite', label: 'More Polite', icon: '🌸' },
  { value: 'shorter', label: 'Make Shorter', icon: '✂️' },
  { value: 'more-human', label: 'More Human', icon: '👤' },
  { value: 'more-confident', label: 'More Confident', icon: '⚡' },
];

export const BUILT_IN_PLAYBOOKS: Omit<Playbook, 'createdAt'>[] = [
  {
    id: 'builtin-payment',
    name: 'Payment / Invoice Follow-up',
    situation: 'payment-invoice',
    desiredOutcome: 'get-paid-faster',
    writingExamples: [],
    isBuiltIn: true,
  },
  {
    id: 'builtin-rejection',
    name: 'Polite Rejection',
    situation: 'polite-rejection',
    desiredOutcome: 'close-conversation',
    writingExamples: [],
    isBuiltIn: true,
  },
  {
    id: 'builtin-salary',
    name: 'Salary Negotiation / Raise',
    situation: 'negotiation-raise',
    desiredOutcome: 'negotiate-better-terms',
    writingExamples: [],
    isBuiltIn: true,
  },
];
