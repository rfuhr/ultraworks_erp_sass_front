import {
  ChangeDetectionStrategy,
  Component,
  computed,
  forwardRef,
  HostListener,
  input,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export type RatingSize = 'sm' | 'md' | 'lg';

const SIZE_MAP: Record<RatingSize, string> = {
  sm: '1.25rem',
  md: '1.75rem',
  lg: '2.5rem',
};

@Component({
  selector: 'uw-rating',
  standalone: true,
  templateUrl: './uw-rating.component.html',
  styleUrl: './uw-rating.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UwRatingComponent),
      multi: true,
    },
  ],
})
export class UwRatingComponent implements ControlValueAccessor {
  readonly max = input(5);
  readonly half = input(false);
  readonly readonly = input(false);
  readonly disabled = input(false);
  readonly size = input<RatingSize>('md');
  readonly showLabel = input(false);

  protected innerValue = signal(0);

  private onChange: (v: number) => void = () => {};
  private onTouched: () => void = () => {};

  protected readonly stars = computed(() => {
    return Array.from({ length: this.max() }, (_, i) => i);
  });

  protected readonly starSize = computed(() => SIZE_MAP[this.size()]);

  protected readonly Math = Math;

  protected onStarClick(event: MouseEvent, index: number): void {
    if (this.readonly() || this.disabled()) return;
    event.stopPropagation();

    let newValue: number;
    if (this.half()) {
      const target = event.currentTarget as HTMLElement;
      const rect = target.getBoundingClientRect();
      const isLeftHalf = event.clientX - rect.left < rect.width / 2;
      newValue = isLeftHalf ? index + 0.5 : index + 1;
    } else {
      newValue = index + 1;
    }

    this.innerValue.set(newValue);
    this.onChange(this.innerValue());
    this.onTouched();
  }

  @HostListener('keydown', ['$event'])
  protected onKeydown(event: KeyboardEvent): void {
    if (this.readonly() || this.disabled()) return;

    const step = this.half() ? 0.5 : 1;

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      const newValue = Math.min(this.max(), this.innerValue() + step);
      this.innerValue.set(newValue);
      this.onChange(this.innerValue());
      this.onTouched();
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      const newValue = Math.max(0, this.innerValue() - step);
      this.innerValue.set(newValue);
      this.onChange(this.innerValue());
      this.onTouched();
    }
  }

  writeValue(v: number | null): void {
    this.innerValue.set(v ?? 0);
  }

  registerOnChange(fn: (v: number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(_isDisabled: boolean): void {
    // handled by input signal + template
  }
}
