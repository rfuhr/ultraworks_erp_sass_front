import type { AppNotification } from './notifications.models';

export const INITIAL_NOTIFICATIONS: readonly AppNotification[] = [
  {
    id: 'report-approved',
    titleKey: 'notifications.item.report.title',
    bodyKey: 'notifications.item.report.body',
    timeKey: 'notifications.item.report.time',
    icon: 'check_circle',
    read: false,
  },
  {
    id: 'member-added',
    titleKey: 'notifications.item.member.title',
    bodyKey: 'notifications.item.member.body',
    timeKey: 'notifications.item.member.time',
    icon: 'person_add',
    read: false,
  },
  {
    id: 'sync-updated',
    titleKey: 'notifications.item.sync.title',
    bodyKey: 'notifications.item.sync.body',
    timeKey: 'notifications.item.sync.time',
    icon: 'sync',
    read: false,
  },
  {
    id: 'meeting-moved',
    titleKey: 'notifications.item.meeting.title',
    bodyKey: 'notifications.item.meeting.body',
    timeKey: 'notifications.item.meeting.time',
    icon: 'event',
    read: true,
  },
  {
    id: 'billing-available',
    titleKey: 'notifications.item.billing.title',
    bodyKey: 'notifications.item.billing.body',
    timeKey: 'notifications.item.billing.time',
    icon: 'receipt_long',
    read: true,
  },
  {
    id: 'maintenance-scheduled',
    titleKey: 'notifications.item.maintenance.title',
    bodyKey: 'notifications.item.maintenance.body',
    timeKey: 'notifications.item.maintenance.time',
    icon: 'build',
    read: true,
  },
];
