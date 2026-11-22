import {
  ChangeDetectionStrategy,
  Component,
  computed,
  forwardRef,
  input,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'uw-checkbox',
  standalone: true,
  templateUrl: './uw-checkbox.component.html',
  styleUrl: './uw-checkbox.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UwCheckboxComponent),
      multi: true,
    },
  ],
})
export class UwCheckboxComponent implements ControlValueAccessor {
  readonly checked = input(false);
  readonly indeterminate = input(false);
  readonly disabled = input(false);
  readonly label = input('');
  readonly labelPosition = input<'left' | 'right'>('right');
  readonly size = input<'sm' | 'md'>('md');

  protected innerValue = signal(false);
  private readonly formDisabled = signal(false);

  protected readonly isDisabled = computed(() => this.disabled() || this.formDisabled());

  private onChange: (v: boolean) => void = () => {};
  private onTouched: () => void = () => {};

  get isVisibleChecked(): boolean {
    return this.innerValue() || this.indeterminate();
  }

  toggle(): void {
    if (this.isDisabled()) return;
    this.innerValue.update((v) => !v);
    this.onChange(this.innerValue());
    this.onTouched();
  }

  writeValue(v: boolean): void {
    this.innerValue.set(v ?? false);
  }

  registerOnChange(fn: (v: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.formDisabled.set(isDisabled);
  }
}
