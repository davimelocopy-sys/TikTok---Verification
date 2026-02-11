export type Severity = 'low' | 'medium' | 'high' | 'critical';
export type RiskLevel = 'safe' | 'warning' | 'critical';
export type ContentType = 'video' | 'script' | 'product';

export interface Violation {
  id: string;
  guidelineRef: string;
  severity: Severity;
  description: string;
  timestamp?: string;
}

export interface Audit {
  id: string;
  title: string;
  contentType: ContentType;
  healthScore: number;
  riskLevel: RiskLevel;
  violations: Violation[];
  createdAt: string;
  thumbnailUrl?: string;
}

export interface MetricTrend {
  value: number;
  direction: 'up' | 'down';
}

export interface FinancialMetric {
  label: string;
  value: string;
  trend: MetricTrend;
  type: 'currency' | 'percent' | 'number';
}

export interface Alert {
  id: string;
  type: 'violation' | 'policy_change' | 'account_warning';
  severity: Severity;
  title: string;
  description: string;
  actionLabel?: string;
}

export interface User {
  id: string;
  name: string;
  avatarUrl: string;
  role: 'creator' | 'seller' | 'agency_admin';
  tier: 'free' | 'pro' | 'enterprise';
}
