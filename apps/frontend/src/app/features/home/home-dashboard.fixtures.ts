import type { ActivityItem, DashboardMetric, HomeDashboardData, ProgressItem } from './home-dashboard.models';

export const HOME_METRICS: readonly DashboardMetric[] = [
  {
    id: 'projects',
    labelKey: 'home.metrics.projects',
    value: '24',
    delta: '+12%',
    deltaPositive: true,
    icon: 'folder_open',
    iconBg: 'var(--color-violet-100)',
    iconColor: 'var(--color-primary)',
  },
  {
    id: 'tasks',
    labelKey: 'home.metrics.tasks',
    value: '132',
    delta: '+8%',
    deltaPositive: true,
    icon: 'task_alt',
    iconBg: 'var(--color-emerald-100)',
    iconColor: 'var(--color-emerald-700)',
  },
  {
    id: 'members',
    labelKey: 'home.metrics.members',
    value: '18',
    delta: '+2',
    deltaPositive: true,
    icon: 'group',
    iconBg: 'var(--color-sky-100)',
    iconColor: 'var(--color-sky-700)',
  },
  {
    id: 'response',
    labelKey: 'home.metrics.response',
    value: '2h 15m',
    delta: '-4%',
    deltaPositive: false,
    icon: 'schedule',
    iconBg: 'var(--color-amber-100)',
    iconColor: 'var(--color-amber-700)',
  },
];

export const HOME_ACTIVITIES: readonly ActivityItem[] = [
  {
    id: 'report',
    titleKey: 'home.activity.report.title',
    metaKey: 'home.activity.report.meta',
    timeKey: 'home.activity.time.hours2',
    icon: 'check',
    color: 'var(--color-emerald-500)',
  },
  {
    id: 'member',
    titleKey: 'home.activity.member.title',
    metaKey: 'home.activity.member.meta',
    timeKey: 'home.activity.time.hours5',
    icon: 'person_add',
    color: 'var(--color-primary)',
  },
  {
    id: 'sync',
    titleKey: 'home.activity.sync.title',
    metaKey: 'home.activity.sync.meta',
    timeKey: 'home.activity.time.yesterday',
    icon: 'sync',
    color: 'var(--color-sky-500)',
  },
];

export const HOME_PROGRESS: readonly ProgressItem[] = [
  { id: 'planning', labelKey: 'home.progress.planning', value: 100 },
  { id: 'execution', labelKey: 'home.progress.execution', value: 72 },
  { id: 'review', labelKey: 'home.progress.review', value: 31 },
];

export const HOME_DASHBOARD_FIXTURES: HomeDashboardData = {
  metrics: HOME_METRICS,
  activities: HOME_ACTIVITIES,
  progress: HOME_PROGRESS,
  unreadCount: 3,
};
