export type UwTableSelectionMode = 'none' | 'single' | 'multiple';
export type UwTableRowSize = 'xs' | 'sm' | 'md' | 'lg';
export type UwTableSortOrder = 'asc' | 'desc';

export interface UwTableColumn {
  key: string;
  header: string;
  sortable?: boolean;
  filterable?: boolean;
  width?: string;
  hidden?: boolean;
  headerClass?: string;
}

export interface UwTableSortEvent {
  field: string;
  order: UwTableSortOrder;
}

export type UwTableFilterEvent = Record<string, { value: string; matchMode: string }>;
