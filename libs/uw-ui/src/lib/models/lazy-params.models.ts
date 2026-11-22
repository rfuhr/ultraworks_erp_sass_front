export interface OpcaoFiltro {
  value: string;
  matchMode: string;
  tipo?: string;
  fieldFilter?: string;
}

export interface LazyFilterField {
  key: string;
  label: string;
}

export interface LazyParams {
  filters?: Record<string, OpcaoFiltro>;
  first?: number;
  last?: number;
  rows?: number;
  sortField?: string;
  sortOrder?: number;
  page?: number;
  id?: number | null;
  noShowGeneral?: boolean;
}
