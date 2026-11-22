import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  HostListener,
  booleanAttribute,
  computed,
  forwardRef,
  input,
  linkedSignal,
  numberAttribute,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { UwIconComponent } from '../icon/uw-icon.component';
import { ToggleCardClickableArea, ToggleCardVariant } from './uw-toggle-card.types';

@Component({
  selector: 'uw-toggle-card',
  standalone: true,
  imports: [UwIconComponent],
  templateUrl: './uw-toggle-card.component.html',
  styleUrl: './uw-toggle-card.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UwToggleCardComponent),
      multi: true,
    },
  ],
})
export class UwToggleCardComponent implements ControlValueAccessor {
  readonly checked = input(false, { transform: booleanAttribute });
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly isDisabled = computed(() => this.disabled() || this._formDisabled());
  private readonly _formDisabled = signal(false);
  readonly icon = input.required<string>();
  readonly label = input.required<string>();
  readonly description = input.required<string>();
  readonly variant = input<ToggleCardVariant>('primary');
  readonly opacity = input(100, { transform: numberAttribute });
  readonly clickableArea = input<ToggleCardClickableArea>('card');

  protected innerValue = signal(false);
  private isControlValueAccessor = false;

  protected readonly displayValue = linkedSignal(() =>
    this.isControlValueAccessor ? this.innerValue() : this.checked(),
  );

  private onChange: (v: boolean) => void = () => {};
  private onTouched: () => void = () => {};

  @HostBinding('attr.role') get role() {
    return this.clickableArea() === 'card' ? 'switch' : null;
  }

  @HostBinding('attr.aria-checked') get ariaChecked() {
    return this.clickableArea() === 'card' ? this.displayValue() : null;
  }

  @HostBinding('attr.aria-disabled') get ariaDisabled() {
    return this.isDisabled() ? true : null;
  }

  @HostBinding('attr.tabindex') get tabindex() {
    return this.clickableArea() === 'card' && !this.isDisabled() ? 0 : null;
  }

  @HostListener('keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    if (this.clickableArea() !== 'card') return;
    if (this.isDisabled()) return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.toggle();
    }
  }

  toggle(): void {
    if (this.isDisabled()) return;
    const next = !this.displayValue();
    this.displayValue.set(next);
    this.innerValue.set(next);
    this.onChange(next);
    this.onTouched();
  }

  writeValue(v: boolean): void {
    this.innerValue.set(v ?? false);
  }

  registerOnChange(fn: (v: boolean) => void): void {
    this.isControlValueAccessor = true;
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._formDisabled.set(isDisabled);
  }
}
