import { ChangeDetectionStrategy, Component, computed, ElementRef, forwardRef, input, signal, viewChild, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'uw-textarea',
  standalone: true,
  templateUrl: './uw-textarea.component.html',
  styleUrl: './uw-textarea.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UwTextareaComponent),
      multi: true,
    },
  ],
})
export class UwTextareaComponent implements ControlValueAccessor {
  readonly label = input<string>();
  readonly placeholder = input<string>();
  readonly disabled = input(false);
  readonly required = input(false);
  readonly readonly = input(false);
  readonly maxlength = input<number>();
  readonly rows = input(3);
  readonly autoResize = input(false);
  readonly errorMessage = input<string>();

  readonly value = signal('');

  readonly hasError = computed(() => !!this.errorMessage());
  readonly charCount = computed(() => this.value().length);

  private readonly textareaEl = viewChild<ElementRef<HTMLTextAreaElement>>('textareaEl');

  private _onChange: (v: string) => void = () => {};
  private _onTouched: () => void = () => {};

  onInput(event: Event): void {
    const val = (event.target as HTMLTextAreaElement).value;
    this.value.set(val);
    this._onChange(val);
    if (this.autoResize()) {
      this.autoResizeTextarea();
    }
  }

  onFocus(): void {}

  onTouched(): void {
    this._onTouched();
  }

  private autoResizeTextarea(): void {
    const el = this.textareaEl();
    if (!el) return;
    const textarea = el.nativeElement;
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  }

  writeValue(val: string): void {
    this.value.set(val ?? '');
  }

  registerOnChange(fn: (v: string) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }
}
