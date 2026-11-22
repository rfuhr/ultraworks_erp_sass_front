import {
  afterNextRender,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  computed,
  effect,
  ElementRef,
  forwardRef,
  inject,
  Injector,
  input,
  output,
  signal,
  untracked,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule, ConnectedPosition } from '@angular/cdk/overlay';
import { ScrollingModule, CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormsModule,
} from '@angular/forms';
import type { FilterField, ColumnFilter } from './uw-select.types';
import type { LazyParams, OpcaoFiltro } from '../models/lazy-params.models';

@Component({
  selector: 'uw-select',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    OverlayModule,
    ScrollingModule,
  ],
  templateUrl: './uw-select.component.html',
  styleUrl: './uw-select.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UwSelectComponent),
      multi: true,
    },
  ],
})
export class UwSelectComponent implements ControlValueAccessor {
  readonly registros = input<any[]>([]);
  readonly totalRegistros = input(0);
  readonly loading = input(false);
  readonly label = input('');
  readonly placeholder = input('Selecione...');
  readonly required = input(false);
  readonly optionLabel = input('nome');
  readonly optionValue = input('id');
  readonly sortField = input('');
  readonly disabled = input(false);
  readonly isDisabled = computed(() => this.disabled() || this._formDisabled());
  private readonly _formDisabled = signal(false);
  readonly clearable = input(true);
  readonly pageSize = input(50);
  readonly maxSizeOptions = input(100);
  readonly maxSizeLabel = input(90);
  readonly noShowGeneral = input(true);
  readonly filtersSearch = input<FilterField[]>([]);

  readonly overlayPositions: ConnectedPosition[] = [
    { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top' },
    { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom' },
    { originX: 'end', originY: 'bottom', overlayX: 'end', overlayY: 'top' },
    { originX: 'end', originY: 'top', overlayX: 'end', overlayY: 'bottom' },
  ];
  readonly fieldSearchDefault = input('nome');
  readonly columnsFilters = input<ColumnFilter[]>([]);
  readonly error = input<string>('');

  readonly lazyLoad = output<LazyParams>();
  readonly changeObject = output<any | null>();

  readonly isOpen = signal(false);
  readonly page = signal(0);
  readonly highlightedIndex = signal(-1);
  readonly valorFiltro = signal('');
  readonly filtroAtivo = signal(false);
  readonly filterSelectedLabel = signal('');
  readonly filterSearchAtivo = signal<FilterField>({
    field: 'nome',
    fieldFilter: 'nome',
    labelFilter: 'Nome',
    matchMode: 'contains',
    tipoField: 'text',
  });

  readonly displayRegistros = signal<any[]>([]);
  readonly loadingMore = signal(false);

  readonly totalExibido = computed(() => this.totalRegistros() > 0 ? this.totalRegistros() : this.displayRegistros().length);
  readonly totalLabel = computed(() => {
    const total = this.totalExibido();
    const loaded = this.displayRegistros().length;
    if (total > 0 && loaded < total) {
      return `${loaded} de ${total} registro(s)`;
    }
    return `${total} registro(s)`;
  });
  readonly optionsHeight = computed(() => {
    const count = this.displayRegistros().length;
    if (count === 0) return '200px';
    const itemSize = 36;
    const maxHeight = 200;
    const calculatedHeight = count * itemSize;
    return `${Math.min(calculatedHeight, maxHeight)}px`;
  });
  readonly hasMorePages = computed(() => {
    return (this.page() + 1) * this.pageSize() < this.totalExibido();
  });

  protected triggerWidth = signal(200);

  private triggerElRef: HTMLElement | null = null;

  @ViewChild('triggerEl', { read: ElementRef })
  private set triggerRef(ref: ElementRef<HTMLElement> | null) {
    if (ref) {
      this.triggerElRef = ref.nativeElement;
      this.readTriggerWidth();
    }
  }

  @ViewChild('panelEl', { read: ElementRef })
  private panelRef: ElementRef<HTMLElement> | null = null;

  @ViewChild('optionsEl', { read: CdkVirtualScrollViewport })
  private virtualScroll!: CdkVirtualScrollViewport;

  @ViewChild('searchInput')
  private searchInputRef!: ElementRef<HTMLInputElement>;

  private readonly injector = inject(Injector);

  private readonly innerValue = signal<any>(null);
  private _onChange: (v: any) => void = () => {};
  private _onTouched: () => void = () => {};

  get value(): any {
    return this.innerValue();
  }

  set value(v: any) {
    if (v !== this.innerValue()) {
      this.innerValue.set(v);
      this._onChange(v);
      const reg = this.displayRegistros().find((r) => r[this.optionValue()] === v) ?? null;
      this.changeObject.emit(reg);
    }
  }

  constructor(private cdr: ChangeDetectorRef) {
    afterNextRender(() => this.readTriggerWidth());

    effect(() => {
      if (this.isOpen()) {
        this.highlightedIndex.set(-1);
      }
    }, { injector: this.injector });

    effect(() => {
      const data = this.registros() ?? [];
      const currentPage = untracked(this.page);
      
      if (currentPage === 0) {
        this.displayRegistros.set(data);
      } else {
        const currentLength = untracked(() => this.displayRegistros().length);
        const anchorIndex = currentLength - 1;
        this.displayRegistros.update(prev => [...prev, ...data]);
        setTimeout(() => {
          if (this.virtualScroll && anchorIndex >= 0) {
            this.virtualScroll.scrollToIndex(anchorIndex, 'instant');
          }
        });
      }

      this.loadingMore.set(false);
      setTimeout(() => this.virtualScroll?.checkViewportSize());
    }, { injector: this.injector });
  }

  writeValue(v: any): void {
    // Idempotente e sem guard: o NgModel aplica o valor inicial e as
    // alterações de forma assíncrona (microtask), enquanto um guard
    // reiniciado por `setTimeout` (macrotask) descartaria a escrita
    // seguinte. Esta direção (forms → view) não emite `changeObject`
    // nem `_onChange`, então não há feedback a proteger.
    this.innerValue.set(v);
    this.cdr.markForCheck();
  }

  registerOnChange(fn: any): void { this._onChange = fn; }
  registerOnTouched(fn: any): void { this._onTouched = fn; }

  setDisabledState(d: boolean): void {
    this._formDisabled.set(d);
    this.cdr.markForCheck();
  }

  private readTriggerWidth(): void {
    if (this.triggerElRef) {
      this.triggerWidth.set(this.triggerElRef.offsetWidth);
    }
  }

  selectedLabel = computed(() => {
    const currentValue = this.innerValue();
    if (currentValue === null || currentValue === undefined) return '';
    const reg = this.displayRegistros().find((r) => r[this.optionValue()] === currentValue);
    return reg ? this.truncate(reg[this.optionLabel()], this.maxSizeLabel()) : '';
  });

  hasValue = computed(() => this.innerValue() !== null && this.innerValue() !== undefined);

  protected initFilterSearch(): void {
    const filters = this.filtersSearch();
    if (filters.length === 0) return;
    const def = filters.find((f) => f.field === this.fieldSearchDefault()) ?? filters[0];
    this.filterSearchAtivo.set({ ...def });
    this.filterSelectedLabel.set(def.labelFilter);
  }

  protected emitSearch(forceId?: any): void {
    const filters: Record<string, OpcaoFiltro> = {};
    const active = this.filterSearchAtivo();

    filters[active.field] = {
      value: this.valorFiltro(),
      matchMode: active.matchMode,
      tipo: active.tipoField,
      fieldFilter: active.fieldFilter,
    };

    this.columnsFilters().forEach((col) => {
      filters[col.field] = {
        value: col.value ?? (col.tipoField === 'boolean' ? false : ''),
        matchMode: col.matchMode,
        tipo: col.tipoField,
        fieldFilter: col.fieldFilter,
      };
    });

    const params: LazyParams = {
      first: this.page() * this.pageSize(),
      page: this.page(),
      rows: this.pageSize(),
      sortField: this.sortField() || this.optionLabel(),
      sortOrder: 1,
      noShowGeneral: this.noShowGeneral(),
      id: forceId ?? (this.innerValue() && this.innerValue() > 0 ? this.innerValue() : null),
      filters,
    };

    this.lazyLoad.emit(params);
  }

  onPanelOpen(): void {
    this.initFilterSearch();
    this.page.set(0);
    this.valorFiltro.set('');
    this.filtroAtivo.set(false);
    this.displayRegistros.set(this.registros() ?? []);
    this.emitSearch();
    setTimeout(() => this.searchInputRef?.nativeElement.focus());
  }

  onPanelClose(): void {
    this.isOpen.set(false);
    this._onTouched();
  }

  toggleDropdown(): void {
    if (this.isDisabled()) return;
    if (this.isOpen()) {
      this.onPanelClose();
    } else {
      this.readTriggerWidth();
      this.isOpen.set(true);
      this.onPanelOpen();
    }
  }

  closeDropdown(): void {
    this.isOpen.set(false);
    this.valorFiltro.set('');
    this._onTouched();
  }

  pesquisar(): void {
    this.page.set(0);
    this.filtroAtivo.set(this.valorFiltro().trim().length > 0);
    this.displayRegistros.set([]);
    this.emitSearch();
  }

  limparFiltro(): void {
    this.valorFiltro.set('');
    this.filtroAtivo.set(false);
    this.displayRegistros.set([]);
    this.page.set(0);
    this.emitSearch();
  }

  onSearchInput(value: string): void {
    this.valorFiltro.set(value);
  }

  protected onScrolled(): void {
    const offset = this.virtualScroll?.measureScrollOffset('bottom') ?? 0;
    if (offset < 50 && !this.loadingMore() && this.hasMorePages()) {
      this.loadMore();
    }
  }

  private loadMore(): void {
    this.loadingMore.set(true);
    this.page.update(p => p + 1);
    this.emitSearch();
  }

  onFilterFieldChange(label: string): void {
    const found = this.filtersSearch().find((f) => f.labelFilter === label);
    if (found) {
      this.filterSearchAtivo.set({ ...found });
      this.filterSelectedLabel.set(label);
      this.valorFiltro.set('');
      this.filtroAtivo.set(false);
      this.displayRegistros.set([]);
      this.page.set(0);
      this.emitSearch();
    }
  }

  onClear(event: MouseEvent): void {
    event.stopPropagation();
    event.preventDefault();
    this.filtroAtivo.set(false);
    this.valorFiltro.set('');
    this.displayRegistros.set([]);
    this.value = null;
    if (this.isOpen()) {
      this.isOpen.set(false);
      this._onTouched();
    }
    this.cdr.markForCheck();
  }

  onSelect(item: any): void {
    this.value = item[this.optionValue()];
    this.closeDropdown();
  }

  onKeydown(event: KeyboardEvent): void {
    if (!this.isOpen()) return;

    switch (event.key) {
      case 'Escape':
        this.closeDropdown();
        event.preventDefault();
        break;
      case 'Enter':
      case ' ':
        if (this.highlightedIndex() >= 0) {
          const item = this.displayRegistros()[this.highlightedIndex()];
          if (item) {
            this.onSelect(item);
          }
        }
        event.preventDefault();
        break;
      case 'ArrowDown':
        event.preventDefault();
        this.highlightedIndex.update((i) => Math.min(i + 1, this.displayRegistros().length - 1));
        this.scrollToHighlighted();
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.highlightedIndex.update((i) => Math.max(i - 1, 0));
        this.scrollToHighlighted();
        break;
      default:
        if (event.key.length === 1) {
          const idx = this.displayRegistros().findIndex((r) =>
            String(r[this.optionLabel()] ?? '').toLowerCase().startsWith(event.key.toLowerCase())
          );
          if (idx >= 0) {
            this.highlightedIndex.set(idx);
            this.scrollToHighlighted();
          }
        }
        break;
    }
  }

  onTriggerBlur(): void {
    if (!this.isOpen()) {
      this._onTouched();
    }
  }

  private scrollToHighlighted(): void {
    if (!this.virtualScroll) return;
    const idx = this.highlightedIndex();
    if (idx >= 0) {
      this.virtualScroll.scrollToIndex(idx, 'smooth');
    }
  }

  truncate(str: string, max: number): string {
    if (!str) return '';
    return str.length > max ? str.slice(0, max) + '…' : str;
  }

  getLabel(value: any): string {
    const reg = this.displayRegistros().find((r) => r[this.optionValue()] === value);
    return reg ? this.truncate(reg[this.optionLabel()], this.maxSizeLabel()) : '';
  }

  readonly trackByValue = (index: number, item: any): any => {
    return item[this.optionValue()];
  };

  reload(id?: any): void {
    this.emitSearch(id);
  }
}
