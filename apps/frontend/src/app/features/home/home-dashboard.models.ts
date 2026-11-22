export type HomeState = 'loading' | 'success' | 'empty' | 'error';

export interface DashboardMetric {
  readonly id: string;
  readonly labelKey: string;
  readonly value: string;
  readonly delta: string;
  readonly deltaPositive: boolean;
  readonly icon: string;
  readonly iconBg: string;
  readonly iconColor: string;
}

export interface ActivityItem {
  readonly id: string;
  readonly titleKey: string;
  readonly metaKey: string;
  readonly timeKey: string;
  readonly icon: string;
  readonly color: string;
}

export interface ProgressItem {
  readonly id: string;
  readonly labelKey: string;
  readonly value: number;
}

export interface HomeDashboardData {
  readonly metrics: readonly DashboardMetric[];
  readonly activities: readonly ActivityItem[];
  readonly progress: readonly ProgressItem[];
  readonly unreadCount: number;
}
