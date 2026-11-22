import {
  ChangeDetectionStrategy,
  Component,
  computed,
  forwardRef,
  input,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { Subject, debounceTime, distinctUntilChanged, of, switchMap, tap } from 'rxjs';
import type { AutocompleteOption } from './uw-autocomplete.types';

@Component({
  selector: 'uw-autocomplete',
  standalone: true,
  imports: [CommonModule, FormsModule, OverlayModule],
  templateUrl: './uw-autocomplete.component.html',
  styleUrl: './uw-autocomplete.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UwAutocompleteComponent),
      multi: true,
    },
  ],
})
export class UwAutocompleteComponent implements ControlValueAccessor {
  readonly options = input<AutocompleteOption[]>([]);
  readonly searchFn = input<(term: string) => import('rxjs').Observable<AutocompleteOption[]> | null>();
  readonly placeholder = input('Buscar...');
  readonly disabled = input(false);
  readonly debounceMs = input(300);

  readonly searchTerm = signal('');
  readonly isOpen = signal(false);
  readonly highlightIndex = signal(-1);
  readonly loading = signal(false);
  readonly remoteResults = signal<AutocompleteOption[]>([]);

  readonly innerValue = signal<string>('');
  private onChange: (v: string) => void = () => {};
  private onTouched: () => void = () => {};

  private readonly searchSubject = new Subject<string>();

  readonly filteredOptions = computed(() => {
    const fn = this.searchFn();
    if (fn) return this.remoteResults();
    const term = this.searchTerm().toLowerCase();
    if (!term) return this.options();
    return this.options().filter((o) =>
      o.label.toLowerCase().includes(term),
    );
  });

  readonly activeDescendant = computed(() => {
    const idx = this.highlightIndex();
    return idx >= 0 ? `autocomplete-option-${idx}` : '';
  });

  constructor() {
    this.searchSubject
      .pipe(
        debounceTime(this.debounceMs()),
        distinctUntilChanged(),
        tap(() => {
          const fn = this.searchFn();
          if (fn) this.loading.set(true);
        }),
        switchMap((term) => {
          const fn = this.searchFn();
          if (fn) {
            const result = fn(term);
            return result ?? of([]);
          }
          return of([] as AutocompleteOption[]);
        }),
      )
      .subscribe((results) => {
        this.remoteResults.set(results);
        this.loading.set(false);
      });
  }

  writeValue(v: string): void {
    if (v === null || v === undefined) {
      this.innerValue.set('');
      this.searchTerm.set('');
      return;
    }
    this.innerValue.set(v);
    const option = this.options().find((o) => o.value === v);
    this.searchTerm.set(option?.label ?? v);
  }

  registerOnChange(fn: (v: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(_d: boolean): void {}

  onInputChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchTerm.set(value);
    const fn = this.searchFn();
    if (fn) {
      this.searchSubject.next(value);
    }
    this.isOpen.set(true);
  }

  onFocus(): void {
    if (this.disabled()) return;
    this.isOpen.set(true);
  }

  onBlur(): void {
    setTimeout(() => {
      this.isOpen.set(false);
      this.onTouched();
    }, 150);
  }

  onKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'Escape':
        this.isOpen.set(false);
        event.preventDefault();
        break;
      case 'Enter':
        if (this.highlightIndex() >= 0) {
          this.selectOption(this.filteredOptions()[this.highlightIndex()]);
        }
        event.preventDefault();
        break;
      case 'ArrowDown':
        event.preventDefault();
        this.highlightIndex.update((i) =>
          Math.min(i + 1, this.filteredOptions().length - 1),
        );
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.highlightIndex.update((i) => Math.max(i - 1, 0));
        break;
    }
  }

  selectOption(option: AutocompleteOption): void {
    this.searchTerm.set(option.label);
    this.innerValue.set(option.value);
    this.onChange(option.value);
    this.isOpen.set(false);
  }

  close(): void {
    this.isOpen.set(false);
  }
}
