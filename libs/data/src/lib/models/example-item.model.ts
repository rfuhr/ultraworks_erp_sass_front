export interface ExampleItem {
  readonly id: string;
  readonly title: string;
  readonly description?: string;
}

export interface ListMeta {
  readonly page: number;
  readonly pageSize: number;
  readonly total: number;
}

export interface ListResponse<T> {
  readonly data: readonly T[];
  readonly meta?: ListMeta;
}
