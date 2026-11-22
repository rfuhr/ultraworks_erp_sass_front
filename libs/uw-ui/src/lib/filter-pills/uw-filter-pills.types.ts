export interface UwFilterPillItem<T = string> {
  value: T;
  label: string;
  badge?: number;
  icon?: string;
}

export type UwFilterPillsSize = 'default' | 'small';
