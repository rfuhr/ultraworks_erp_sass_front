import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  forwardRef,
  input,
  signal,
  viewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'uw-slider',
  standalone: true,
  templateUrl: './uw-slider.component.html',
  styleUrl: './uw-slider.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UwSliderComponent),
      multi: true,
    },
  ],
})
export class UwSliderComponent implements ControlValueAccessor {
  readonly min = input(0);
  readonly max = input(100);
  readonly step = input(1);
  readonly range = input(false);
  readonly disabled = input(false);

  protected innerValue = signal<number | [number, number]>(0);

  private onChange: (v: number | [number, number]) => void = () => {};
  private onTouched: () => void = () => {};

  readonly trackEl = viewChild<ElementRef<HTMLElement>>('trackEl');

  protected readonly isRange = computed(() => this.range());

  protected readonly singleValue = computed(() => this.innerValue() as number);

  protected readonly rangeValue = computed(() => this.innerValue() as [number, number]);

  protected readonly handleLeft = computed(() => {
    const v = this.singleValue();
    return ((v - this.min()) / (this.max() - this.min())) * 100 + '%';
  });

  protected readonly handleLeftMin = computed(() => {
    const v = this.rangeValue();
    return ((v[0] - this.min()) / (this.max() - this.min())) * 100 + '%';
  });

  protected readonly handleLeftMax = computed(() => {
    const v = this.rangeValue();
    return ((v[1] - this.min()) / (this.max() - this.min())) * 100 + '%';
  });

  protected readonly fillLeft = computed(() => {
    return this.isRange() ? this.handleLeftMin() : '0%';
  });

  protected readonly fillWidth = computed(() => {
    if (this.isRange()) {
      const v = this.rangeValue();
      const minPct = ((v[0] - this.min()) / (this.max() - this.min())) * 100;
      const maxPct = ((v[1] - this.min()) / (this.max() - this.min())) * 100;
      return (maxPct - minPct) + '%';
    }
    return this.handleLeft();
  });

  private dragging: 'single' | 'min' | 'max' | null = null;

  protected onPointerDown(event: PointerEvent): void {
    if (this.disabled()) return;
    event.preventDefault();

    if (this.isRange()) {
      const v = this.rangeValue();
      const clickValue = this.calcValueFromEvent(event);
      const distToMin = Math.abs(clickValue - v[0]);
      const distToMax = Math.abs(clickValue - v[1]);
      this.dragging = distToMin <= distToMax ? 'min' : 'max';
    } else {
      this.dragging = 'single';
    }

    this.updateValueFromEvent(event);
    document.addEventListener('pointermove', this.onPointerMove);
    document.addEventListener('pointerup', this.onPointerUp);
    document.addEventListener('pointercancel', this.onPointerUp);
  }

  protected onHandlePointerDown(event: PointerEvent, handle: 'single' | 'min' | 'max'): void {
    if (this.disabled()) return;
    event.stopPropagation();
    event.preventDefault();
    this.dragging = handle;

    document.addEventListener('pointermove', this.onPointerMove);
    document.addEventListener('pointerup', this.onPointerUp);
    document.addEventListener('pointercancel', this.onPointerUp);
  }

  private onPointerMove = (event: PointerEvent): void => {
    if (!this.dragging) return;
    event.preventDefault();
    this.updateValueFromEvent(event);
  };

  private onPointerUp = (): void => {
    this.dragging = null;
    this.onTouched();
    document.removeEventListener('pointermove', this.onPointerMove);
    document.removeEventListener('pointerup', this.onPointerUp);
    document.removeEventListener('pointercancel', this.onPointerUp);
  };

  private calcValueFromEvent(event: PointerEvent): number {
    const track = this.trackEl()?.nativeElement;
    if (!track) return 0;

    const rect = track.getBoundingClientRect();
    const trackWidth = rect.width;
    if (trackWidth === 0) return 0;

    const relativeX = event.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, relativeX / trackWidth));
    return ratio * (this.max() - this.min()) + this.min();
  }

  private updateValueFromEvent(event: PointerEvent): void {
    const rawValue = this.calcValueFromEvent(event);
    const snapped = this.snapToStep(rawValue);

    if (this.isRange()) {
      const current = this.rangeValue();
      if (this.dragging === 'min') {
        const newMin = Math.min(snapped, current[1] - (this.step() || 1));
        this.innerValue.set([newMin, current[1]]);
      } else {
        const newMax = Math.max(snapped, current[0] + (this.step() || 1));
        this.innerValue.set([current[0], newMax]);
      }
    } else {
      this.innerValue.set(snapped);
    }

    this.onChange(this.innerValue());
  }

  private snapToStep(value: number): number {
    const step = this.step();
    if (step <= 0) return value;
    const snapped = Math.round((value - this.min()) / step) * step + this.min();
    return Math.max(this.min(), Math.min(this.max(), snapped));
  }

  writeValue(v: number | [number, number] | null): void {
    if (v === null || v === undefined) {
      this.innerValue.set(this.range() ? [this.min(), this.max()] : this.min());
      return;
    }
    this.innerValue.set(v);
  }

  registerOnChange(fn: (v: number | [number, number]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(_isDisabled: boolean): void {
    // handled by input signal + template
  }
}
