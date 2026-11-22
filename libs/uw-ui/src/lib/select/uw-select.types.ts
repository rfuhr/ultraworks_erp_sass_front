export interface FilterField {
  field: string;
  fieldFilter: string;
  labelFilter: string;
  matchMode: 'contains' | 'equals' | 'startsWith' | 'endsWith';
  tipoField: 'text' | 'number' | 'boolean' | 'date';
}

export interface ColumnFilter {
  field: string;
  fieldFilter: string;
  value?: any;
  matchMode: string;
  tipoField: string;
}


