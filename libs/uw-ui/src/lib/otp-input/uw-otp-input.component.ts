import {
  ChangeDetectionStrategy,
  Component,
  effect,
  ElementRef,
  forwardRef,
  input,
  output,
  QueryList,
  signal,
  ViewChildren,
  ViewEncapsulation,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'uw-otp-input',
  standalone: true,
  templateUrl: './uw-otp-input.component.html',
  styleUrl: './uw-otp-input.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UwOtpInputComponent),
      multi: true,
    },
  ],
})
export class UwOtpInputComponent implements ControlValueAccessor {
  readonly length = input(6);
  readonly type = input<'number' | 'alphanumeric'>('number');
  readonly disabled = input(false);

  readonly complete = output<string>();

  protected digits = signal<string[]>([]);
  protected hasError = signal(false);
  protected errorMessage = signal('');

  private onChange: (v: string) => void = () => {};
  private onTouched: () => void = () => {};

  @ViewChildren('otpInputs') otpInputs!: QueryList<ElementRef<HTMLInputElement>>;

  constructor() {
    effect(() => {
      const len = this.length();
      const prev = this.digits();
      if (prev.length !== len) {
        this.digits.set(Array.from({ length: len }, (_, i) => prev[i] ?? ''));
      }
    });
  }

  protected onInput(event: Event, index: number): void {
    if (this.disabled()) return;

    const input = event.target as HTMLInputElement;
    const char = input.value.slice(-1);

    if (!this.isValidChar(char)) {
      input.value = this.digits()[index];
      return;
    }

    const updated = [...this.digits()];
    updated[index] = char;
    this.digits.set(updated);
    this.emitValue();

    if (index < this.length() - 1 && char !== '') {
      this.focusIndex(index + 1);
    }
  }

  protected onKeydown(event: KeyboardEvent, index: number): void {
    if (this.disabled()) return;

    if (event.key === 'Backspace') {
      event.preventDefault();
      const updated = [...this.digits()];
      if (updated[index] !== '') {
        updated[index] = '';
        this.digits.set(updated);
        this.emitValue();
      } else if (index > 0) {
        this.focusIndex(index - 1);
      }
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      if (index > 0) this.focusIndex(index - 1);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      if (index < this.length() - 1) this.focusIndex(index + 1);
    }
  }

  protected onPaste(event: ClipboardEvent): void {
    if (this.disabled()) return;
    event.preventDefault();

    const data = event.clipboardData?.getData('text') ?? '';
    const chars = data.replace(/\s/g, '').split('').slice(0, this.length());

    const updated = [...this.digits()];
    let filledCount = 0;

    for (let i = 0; i < chars.length; i++) {
      if (this.isValidChar(chars[i])) {
        updated[i] = chars[i];
        filledCount++;
      }
    }

    this.digits.set(updated);
    this.emitValue();

    const nextIndex = Math.min(filledCount, this.length() - 1);
    this.focusIndex(nextIndex);
  }

  protected onFocus(index: number): void {
    const inputs = this.otpInputs;
    if (inputs) {
      inputs.toArray()[index]?.nativeElement.select();
    }
  }

  private focusIndex(index: number): void {
    const inputs = this.otpInputs;
    if (inputs) {
      inputs.toArray()[index]?.nativeElement.focus();
    }
  }

  private isValidChar(char: string): boolean {
    if (char === '') return true;
    if (this.type() === 'number') {
      return /^\d$/.test(char);
    }
    return /^[a-zA-Z0-9]$/.test(char);
  }

  private emitValue(): void {
    const value = this.digits().join('');
    this.onChange(value);
    this.onTouched();

    if (value.length === this.length() && !value.includes('')) {
      this.hasError.set(false);
      this.errorMessage.set('');
      this.complete.emit(value);
    }
  }

  writeValue(v: string | null): void {
    const str = v ?? '';
    const chars = str.split('').slice(0, this.length());
    const updated = Array.from({ length: this.length() }, (_, i) => {
      return i < chars.length && this.isValidChar(chars[i]) ? chars[i] : '';
    });
    this.digits.set(updated);
  }

  registerOnChange(fn: (v: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(_isDisabled: boolean): void {
    // handled by input signal + template
  }
}
