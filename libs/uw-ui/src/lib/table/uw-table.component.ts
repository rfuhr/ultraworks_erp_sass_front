import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChildren,
  effect,
  inject,
  input,
  Injector,
  output,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UwPaginationComponent } from '../pagination/uw-pagination.component';
import { UwColTplDirective } from './uw-col-tpl.directive';
import type { TemplateRef } from '@angular/core';
import type { UwTableColumn, UwTableRowSize, UwTableSelectionMode, UwTableSortOrder } from './uw-table.types';
import type { LazyParams } from '../models/lazy-params.models';

@Component({
  selector: 'uw-table',
  standalone: true,
  imports: [CommonModule, FormsModule, UwPaginationComponent, UwColTplDirective],
  templateUrl: './uw-table.component.html',
  styleUrl: './uw-table.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UwTableComponent<T extends object> {
  readonly columns = input<UwTableColumn[]>([]);
  readonly data = input<T[]>([]);
  readonly lazy = input(false);
  readonly lazyParams = input<LazyParams>({});
  readonly totalRecords = input(0);
  readonly loading = input(false);
  readonly globalFilter = input('');
  readonly selectionMode = input<UwTableSelectionMode>('none');
  readonly dataKey = input<string>('id');
  readonly rowSize = input<UwTableRowSize>('md');
  readonly emptyMessage = input('Nenhum registro encontrado');

  readonly clickable = input(false);
  readonly lazyLoad = output<LazyParams>();
  readonly selectionChange = output<T[]>();
  readonly rowClick = output<T>();

  private readonly injector = inject(Injector);
  private firstLoad = true;

  constructor() {
    effect(() => {
      if (this.lazy() && this.firstLoad) {
        this.firstLoad = false;
        this.emitLazyLoad();
      }
    }, { injector: this.injector });
  }

  protected readonly colTemplates = contentChildren(UwColTplDirective);

  protected readonly tplMap = computed(() => {
    const map = new Map<string, TemplateRef<unknown>>();
    for (const tpl of this.colTemplates()) {
      map.set(tpl.columnKey(), tpl.templateRef);
    }
    return map;
  });

  protected readonly visibleColumns = computed(() =>
    this.columns().filter(c => !c.hidden)
  );

  protected readonly hasFilterableColumns = computed(() =>
    this.visibleColumns().some(c => c.filterable)
  );

  protected readonly colspan = computed(() =>
    this.visibleColumns().length + (this.selectionMode() !== 'none' ? 1 : 0)
  );

  protected readonly sort = signal<{ field: string; order: UwTableSortOrder } | null>(null);

  protected readonly columnFilters = signal<Map<string, string>>(new Map());

  protected readonly page = signal(0);
  protected readonly pageSize = signal(10);

  protected readonly filteredData = computed(() => {
    if (this.lazy()) return this.data();
    let items = this.data();

    const global = this.globalFilter()?.toLowerCase();
    if (global) {
      items = items.filter(item =>
        Object.values(item).some(v =>
          String(v ?? '').toLowerCase().includes(global)
        )
      );
    }

    const filters = this.columnFilters();
    if (filters.size > 0) {
      filters.forEach((value, key) => {
        if (!value) return;
        const q = value.toLowerCase();
        items = items.filter(item => {
          const v = (item as Record<string, unknown>)[key];
          return String(v ?? '').toLowerCase().includes(q);
        });
      });
    }

    return items;
  });

  protected readonly sortedData = computed(() => {
    const s = this.sort();
    if (!s) return this.filteredData();
    const items = [...this.filteredData()];
    items.sort((a, b) => {
      const va = String((a as Record<string, unknown>)[s.field] ?? '');
      const vb = String((b as Record<string, unknown>)[s.field] ?? '');
      const cmp = va.localeCompare(vb, 'pt-BR', { sensitivity: 'base' });
      return s.order === 'asc' ? cmp : -cmp;
    });
    return items;
  });

  protected readonly displayData = computed(() => {
    if (this.lazy()) return this.data();
    const start = this.page() * this.pageSize();
    return this.sortedData().slice(start, start + this.pageSize());
  });

  protected readonly total = computed(() => {
    if (this.lazy()) return this.totalRecords();
    return this.filteredData().length;
  });

  protected toggleSort(field: string): void {
    const current = this.sort();
    if (!current || current.field !== field) {
      this.sort.set({ field, order: 'asc' });
    } else if (current.order === 'asc') {
      this.sort.set({ field, order: 'desc' });
    } else {
      this.sort.set(null);
    }
    this.page.set(0);
    if (this.lazy()) {
      this.emitLazyLoad();
    }
  }

  private filterDebounceTimers = new Map<string, ReturnType<typeof setTimeout>>();

  protected onColumnFilter(key: string, value: string): void {
    const map = new Map(this.columnFilters());
    if (value) {
      map.set(key, value);
    } else {
      map.delete(key);
    }
    this.columnFilters.set(map);
    this.page.set(0);
    if (this.lazy()) {
      if (this.filterDebounceTimers.has(key)) {
        clearTimeout(this.filterDebounceTimers.get(key)!);
      }
      this.filterDebounceTimers.set(key, setTimeout(() => {
        this.filterDebounceTimers.delete(key);
        this.emitLazyLoad();
      }, 300));
    }
  }

  protected onPageChange(newPage: number): void {
    this.page.set(newPage);
    if (this.lazy()) {
      this.emitLazyLoad();
    }
  }

  protected onPageSizeChange(newSize: number): void {
    this.pageSize.set(newSize);
    this.page.set(0);
    if (this.lazy()) {
      this.emitLazyLoad();
    }
  }

  private emitLazyLoad(): void {
    const params: LazyParams = {
      page: this.page(),
      rows: this.pageSize(),
    };
    const s = this.sort();
    if (s) {
      params.sortField = s.field;
      params.sortOrder = s.order === 'asc' ? 1 : -1;
    }
    const filters: Record<string, { value: string; matchMode: string }> = {};
    const global = this.globalFilter();
    if (global) {
      filters['global'] = { value: global, matchMode: 'contains' };
    }
    this.columnFilters().forEach((value, key) => {
      filters[key] = { value, matchMode: 'contains' };
    });
    if (Object.keys(filters).length > 0) {
      params.filters = filters;
    }
    this.lazyLoad.emit(params);
  }

  protected selectedKeys = signal<Set<string | number>>(new Set());

  protected isAllSelected = computed(() => {
    if (this.selectionMode() !== 'multiple') return false;
    const keys = this.selectedKeys();
    const items = this.displayData();
    return items.length > 0 && items.every(item => keys.has(String((item as Record<string, unknown>)[this.dataKey()])));
  });

  protected toggleAll(): void {
    if (this.isAllSelected()) {
      this.selectedKeys.set(new Set());
    } else {
      const keys = new Set<string | number>();
      for (const item of this.displayData()) {
        keys.add(String((item as Record<string, unknown>)[this.dataKey()]));
      }
      this.selectedKeys.set(keys);
    }
    this.emitSelection();
  }

  protected toggleOne(id: string | number): void {
    const keys = new Set(this.selectedKeys());
    if (keys.has(id)) {
      if (this.selectionMode() === 'single') {
        keys.clear();
      } else {
        keys.delete(id);
      }
    } else {
      if (this.selectionMode() === 'single') {
        keys.clear();
      }
      keys.add(id);
    }
    this.selectedKeys.set(keys);
    this.emitSelection();
  }

  protected isSelected(id: string | number): boolean {
    return this.selectedKeys().has(id);
  }

  private emitSelection(): void {
    const keys = this.selectedKeys();
    const keyField = this.dataKey();
    const selected = this.data().filter(item => keys.has(String((item as Record<string, unknown>)[keyField])));
    this.selectionChange.emit(selected);
  }

  protected getValue(item: T, key: string): unknown {
    return (item as Record<string, unknown>)[key];
  }

  protected keyOf(item: T): string {
    return String((item as Record<string, unknown>)[this.dataKey()] ?? '');
  }

  protected getSortIcon(field: string): string {
    const s = this.sort();
    if (!s || s.field !== field) return 'both';
    return s.order;
  }
}
