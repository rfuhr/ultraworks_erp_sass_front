import { ChangeDetectionStrategy, Component, computed, forwardRef, input, signal, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import type { SelectButtonOption, UwSelectButtonGroupVariant, UwSelectButtonGroupSize } from './uw-select-button-group.types';

@Component({
  selector: 'uw-select-button-group',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './uw-select-button-group.component.html',
  styleUrl: './uw-select-button-group.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UwSelectButtonGroupComponent),
      multi: true,
    },
  ],
})
export class UwSelectButtonGroupComponent<T = string> implements ControlValueAccessor {
  readonly options = input<SelectButtonOption<T>[]>([]);
  readonly multiple = input<boolean>(false);
  readonly variant = input<UwSelectButtonGroupVariant>('primary');
  readonly size = input<UwSelectButtonGroupSize>('md');
  readonly disabled = input<boolean>(false);
  readonly error = input<string | null>(null);
  readonly hint = input<string | null>(null);

  private readonly selectedValue = signal<T | null>(null);
  private readonly selectedValues = signal<Set<T>>(new Set());
  private readonly cvaDisabled = signal(false);

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private onChange: (value: T | T[] | null) => void = () => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private onTouched: () => void = () => {};

  readonly isDisabled = computed(() => this.disabled() || this.cvaDisabled());

  readonly containerClass = computed(() => {
    const variant = `uw-select-button-group--${this.variant()}`;
    const size = `uw-select-button-group--${this.size()}`;
    const disabled = this.isDisabled() ? 'uw-select-button-group--disabled' : '';
    return `uw-select-button-group ${variant} ${size} ${disabled}`.trim();
  });

  isActive(optionValue: T): boolean {
    if (this.multiple()) {
      return this.selectedValues().has(optionValue);
    }
    return this.selectedValue() === optionValue;
  }

  onToggle(option: SelectButtonOption<T>): void {
    if (this.isDisabled()) return;

    this.onTouched();

    if (this.multiple()) {
      this.selectedValues.update(set => {
        const newSet = new Set(set);
        if (newSet.has(option.value)) {
          newSet.delete(option.value);
        } else {
          newSet.add(option.value);
        }
        return newSet;
      });
      this.onChange([...this.selectedValues()]);
    } else {
      this.selectedValue.set(option.value);
      this.onChange(option.value);
    }
  }

  writeValue(value: T | T[] | null): void {
    if (this.multiple() && Array.isArray(value)) {
      this.selectedValues.set(new Set(value));
    } else if (!this.multiple()) {
      this.selectedValue.set(value as T | null);
    }
  }

  registerOnChange(fn: (value: T | T[] | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.cvaDisabled.set(isDisabled);
  }
}
