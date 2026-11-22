import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  HostListener,
  computed,
  effect,
  forwardRef,
  input,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'uw-toggle',
  standalone: true,
  templateUrl: './uw-toggle.component.html',
  styleUrl: './uw-toggle.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UwToggleComponent),
      multi: true,
    },
  ],
})
export class UwToggleComponent implements ControlValueAccessor {
  readonly checked = input(false);
  readonly disabled = input(false);
  readonly label = input('');
  readonly labelPosition = input<'left' | 'right'>('right');
  readonly size = input<'sm' | 'md'>('md');

  protected innerValue = signal(false);
  private readonly formDisabled = signal(false);
  readonly isDisabled = computed(() => this.disabled() || this.formDisabled());

  constructor() {
    effect(() => {
      this.innerValue.set(this.checked());
    });
  }

  private onChange: (v: boolean) => void = () => {};
  private onTouched: () => void = () => {};

  @HostBinding('attr.role') role = 'switch';
  @HostBinding('attr.aria-checked') get ariaChecked() {
    return this.checked();
  }

  @HostListener('keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    if (this.isDisabled()) return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.toggle();
    }
  }

  toggle(): void {
    if (this.isDisabled()) return;
    this.innerValue.set(!this.innerValue());
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
