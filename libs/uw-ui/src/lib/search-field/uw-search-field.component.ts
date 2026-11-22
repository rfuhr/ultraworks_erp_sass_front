import {
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
  OnDestroy,
  output,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import type { LazyParams } from '../models/lazy-params.models';

@Component({
  selector: 'uw-search-field',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './uw-search-field.component.html',
  styleUrl: './uw-search-field.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UwSearchFieldComponent implements OnDestroy {
  readonly placeholder = input<string>('Buscar...');
  readonly initialValue = input<string>('');
  readonly disabled = input(false);
  readonly appliedFilter = input<string>('');
  readonly lazy = input(false);
  readonly liveSearch = input(false);

  readonly searchChange = output<string>();
  readonly cleared = output<void>();
  readonly lazyLoad = output<LazyParams>();

  searchTerm = signal('');

  private debounceTimer: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    effect(() => {
      const val = this.initialValue();
      this.searchTerm.set(val);
    });
  }

  ngOnDestroy(): void {
    if (this.debounceTimer !== null) {
      clearTimeout(this.debounceTimer);
    }
  }

  onTermChange(value: string): void {
    this.searchTerm.set(value);
    if (this.liveSearch()) {
      if (this.debounceTimer !== null) {
        clearTimeout(this.debounceTimer);
      }
      this.debounceTimer = setTimeout(() => {
        this.debounceTimer = null;
        this.onSearch();
      }, 300);
    }
  }

  onSearch() {
    this.searchChange.emit(this.searchTerm());
    if (this.lazy()) {
      this.emitLazyParams();
    }
  }

  onClear() {
    if (this.debounceTimer !== null) {
      clearTimeout(this.debounceTimer);
      this.debounceTimer = null;
    }
    this.searchTerm.set('');
    this.searchChange.emit('');
    this.cleared.emit();
    if (this.lazy()) {
      this.emitLazyParams();
    }
  }

  private emitLazyParams(): void {
    const params: LazyParams = {};
    const term = this.searchTerm();
    if (term) {
      params.filters = {
        search: { value: term, matchMode: 'contains' },
      };
    }
    this.lazyLoad.emit(params);
  }
}
