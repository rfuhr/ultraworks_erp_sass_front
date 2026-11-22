export interface AppNotification {
  readonly id: string;
  readonly titleKey: string;
  readonly bodyKey: string;
  readonly timeKey: string;
  readonly icon: string;
  readonly read: boolean;
}
