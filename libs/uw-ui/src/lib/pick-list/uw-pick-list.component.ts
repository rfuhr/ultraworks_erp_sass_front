import { afterNextRender, ChangeDetectionStrategy, Component, computed, effect, ElementRef, forwardRef, input, output, signal, ViewChild, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import type { UwPickListOption } from './uw-pick-list.types';

@Component({
  selector: 'uw-pick-list',
  standalone: true,
  imports: [CommonModule, OverlayModule],
  templateUrl: './uw-pick-list.component.html',
  styleUrl: './uw-pick-list.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UwPickListComponent),
      multi: true,
    },
  ],
})
export class UwPickListComponent implements ControlValueAccessor {
  readonly options = input.required<UwPickListOption[]>();
  readonly value = input<string | number | null>(null);
  readonly placeholder = input<string>('Selecionar...');
  readonly clearable = input<boolean>(false);
  readonly disabled = input<boolean>(false);
  readonly error = input<string | null>(null);
  readonly hint = input<string | null>(null);

  readonly valueChange = output<string | number | null>();

  protected innerValue = signal<string | number | null>(null);
  private readonly formDisabled = signal(false);
  readonly isDisabled = computed(() => this.disabled() || this.formDisabled());

  private onChange: (v: string | number | null) => void = () => {};
  private onTouched: () => void = () => {};

  readonly isOpen = signal(false);
  readonly triggerWidth = signal(0);
  readonly searchBuffer = signal('');
  readonly highlightedIndex = signal(-1);

  private searchTimer: ReturnType<typeof setTimeout> | null = null;

  @ViewChild('triggerEl', { read: ElementRef })
  private set triggerRef(ref: ElementRef<HTMLElement> | null) {
    if (ref) {
      this.readTriggerWidth();
    }
  }

  @ViewChild('panelEl', { read: ElementRef })
  private panelRef: ElementRef<HTMLElement> | null = null;

  hasValue = computed(() => this.innerValue() !== null && this.innerValue() !== undefined);

  selectedLabel = computed(() => {
    const currentValue = this.innerValue();
    if (currentValue === null || currentValue === undefined) return '';
    const option = this.options().find(opt => opt.value === currentValue);
    return option ? option.label : '';
  });

  writeValue(v: string | number | null): void {
    this.innerValue.set(v ?? null);
  }

  registerOnChange(fn: (v: string | number | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.formDisabled.set(isDisabled);
  }

  constructor() {
    afterNextRender(() => this.readTriggerWidth());

    effect(() => {
      const v = this.value();
      if (v !== null && v !== undefined) {
        this.innerValue.set(v);
      }
    });

    effect(() => {
      if (this.isOpen()) {
        this.highlightedIndex.set(-1);
        this.searchBuffer.set('');
      }
    });
  }

  private readTriggerWidth() {
    const el = document.querySelector<HTMLElement>('.uw-pick-list__trigger');
    if (el) {
      this.triggerWidth.set(el.offsetWidth);
    }
  }

  toggleDropdown() {
    if (!this.isDisabled()) {
      this.readTriggerWidth();
      this.isOpen.update(v => !v);
    }
  }

  closeDropdown() {
    this.isOpen.set(false);
  }

  onKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.closeDropdown();
      return;
    }

    if (event.key === 'Enter' || event.key === ' ') {
      if (this.highlightedIndex() >= 0) {
        const opt = this.options()[this.highlightedIndex()];
        this.onSelect(opt);
      }
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      const next = this.highlightedIndex() + 1;
      if (next < this.options().length) {
        this.highlightedIndex.set(next);
        this.scrollToHighlighted();
      }
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      const prev = this.highlightedIndex() - 1;
      if (prev >= 0) {
        this.highlightedIndex.set(prev);
        this.scrollToHighlighted();
      }
      return;
    }

    if (event.key.length === 1) {
      this.searchBuffer.update(buf => buf + event.key.toLowerCase());
      this.matchSearch();
      this.resetSearchTimer();
    }
  }

  private matchSearch() {
    const buf = this.searchBuffer();
    if (!buf) return;

    const start = Math.max(0, this.highlightedIndex());
    const opts = this.options();

    for (let i = start; i < opts.length; i++) {
      if (opts[i].label.toLowerCase().startsWith(buf)) {
        this.highlightedIndex.set(i);
        this.scrollToHighlighted();
        return;
      }
    }

    for (let i = 0; i < start; i++) {
      if (opts[i].label.toLowerCase().startsWith(buf)) {
        this.highlightedIndex.set(i);
        this.scrollToHighlighted();
        return;
      }
    }
  }

  private resetSearchTimer() {
    if (this.searchTimer) clearTimeout(this.searchTimer);
    this.searchTimer = setTimeout(() => {
      this.searchBuffer.set('');
    }, 500);
  }

  private scrollToHighlighted() {
    if (!this.panelRef) return;
    const panel = this.panelRef.nativeElement;
    const items = panel.querySelectorAll('.uw-pick-list__option');
    const idx = this.highlightedIndex();
    if (idx >= 0 && idx < items.length) {
      items[idx].scrollIntoView?.({ block: 'nearest' });
    }
  }

  onSelect(option: UwPickListOption) {
    this.innerValue.set(option.value);
    this.onChange(option.value);
    this.onTouched();
    this.valueChange.emit(option.value);
    this.closeDropdown();
  }

  onClear(event: MouseEvent) {
    event.stopPropagation();
    if (this.isDisabled()) return;
    this.innerValue.set(null);
    this.onChange(null);
    this.onTouched();
    this.valueChange.emit(null);
  }
}
