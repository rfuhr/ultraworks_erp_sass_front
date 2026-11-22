import { ChangeDetectionStrategy, Component, computed, input, signal, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { UwTagComponent } from '../tag/uw-tag.component';

@Component({
  selector: 'uw-input-tag',
  standalone: true,
  imports: [CommonModule, UwTagComponent],
  templateUrl: './uw-input-tag.component.html',
  styleUrl: './uw-input-tag.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: UwInputTagComponent,
      multi: true,
    },
  ],
})
export class UwInputTagComponent implements ControlValueAccessor {
  readonly placeholder = input<string>('Adicionar tag e pressionar Enter...');
  readonly maxTags = input<number>(Infinity);
  readonly disabled = input<boolean>(false);

  readonly tags = signal<string[]>([]);
  readonly inputValue = signal('');

  private readonly cvaDisabled = signal(false);
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private onChange: (value: string[]) => void = () => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private onTouched: () => void = () => {};

  readonly isDisabled = computed(() => this.disabled() || this.cvaDisabled());

  readonly containerClass = computed(() => {
    const base = 'uw-input-tag';
    const disabled = this.isDisabled() ? 'uw-input-tag--disabled' : '';
    return `${base} ${disabled}`.trim();
  });

  onInputKeydown(event: Event): void {
    const keyboardEvent = event as KeyboardEvent;
    if (keyboardEvent.key === 'Enter') {
      keyboardEvent.preventDefault();
      const input = keyboardEvent.target as HTMLInputElement;
      this.addTag(input.value);
    }
  }

  addTag(value: string): void {
    const trimmed = value.trim();
    if (!trimmed) return;

    if (this.tags().length >= this.maxTags()) return;

    const isDuplicate = this.tags().some(
      t => t.localeCompare(trimmed, undefined, { sensitivity: 'base' }) === 0,
    );
    if (isDuplicate) return;

    this.tags.update(list => [...list, trimmed]);
    this.inputValue.set('');
    this.onChange(this.tags());
    this.onTouched();
  }

  removeTag(index: number): void {
    this.tags.update(list => list.filter((_, i) => i !== index));
    this.onChange(this.tags());
    this.onTouched();
  }

  onInput(event: Event): void {
    this.inputValue.set((event.target as HTMLInputElement).value);
  }

  writeValue(value: string[] | null): void {
    this.tags.set(value ?? []);
  }

  registerOnChange(fn: (value: string[]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.cvaDisabled.set(isDisabled);
  }
}
