import { booleanAttribute, ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ProgressBarMode = 'determinate' | 'indeterminate';
export type ProgressBarSize = 'sm' | 'md' | 'lg';
export type ProgressBarColor = 'primary' | 'success' | 'warning' | 'error';

const COLOR_MAP_CSS: Record<ProgressBarColor, string> = {
  primary: 'var(--color-primary)',
  success: 'var(--color-emerald-400)',
  warning: 'var(--color-amber-500)',
  error: 'var(--color-error)',
};

const SIZE_MAP: Record<ProgressBarSize, string> = {
  sm: 'h-1',
  md: 'h-2',
  lg: 'h-3',
};

function parseHex(hex: string): [number, number, number] {
  const clean = hex.replace('#', '');
  return [
    Number.parseInt(clean.slice(0, 2), 16),
    Number.parseInt(clean.slice(2, 4), 16),
    Number.parseInt(clean.slice(4, 6), 16),
  ];
}

function interpolateColor(c1: string, c2: string, ratio: number): string {
  const [r1, g1, b1] = parseHex(c1);
  const [r2, g2, b2] = parseHex(c2);
  const r = Math.round(r1 + (r2 - r1) * ratio);
  const g = Math.round(g1 + (g2 - g1) * ratio);
  const b = Math.round(b1 + (b2 - b1) * ratio);
  return `rgb(${r}, ${g}, ${b})`;
}

function getGradientColor(colors: string[], value: number): string {
  if (colors.length === 0) return '';
  if (colors.length === 1) return colors[0];

  const clampedValue = Math.max(0, Math.min(100, value));
  const segments = colors.length - 1;
  const segmentSize = 100 / segments;
  const segmentIndex = Math.min(Math.floor(clampedValue / segmentSize), segments - 1);
  const ratioInSegment = (clampedValue - segmentIndex * segmentSize) / segmentSize;

  return interpolateColor(colors[segmentIndex], colors[segmentIndex + 1], ratioInSegment);
}

@Component({
  selector: 'uw-progress-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './uw-progress-bar.component.html',
  styleUrl: './uw-progress-bar.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UwProgressBarComponent {
  readonly value = input<number>(0);
  readonly mode = input<ProgressBarMode>('determinate');
  readonly size = input<ProgressBarSize>('md');
  readonly color = input<ProgressBarColor>('primary');
  readonly colorProgress = input<string[]>([]);
  readonly showLabel = input(false, { transform: booleanAttribute });

  protected readonly clampedValue = computed(() => {
    return Math.max(0, Math.min(100, this.value()));
  });

  protected readonly trackClass = computed(() => {
    const sizeClass = SIZE_MAP[this.size()];
    const isIndeterminate = this.mode() === 'indeterminate';
    return `uw-progress-bar uw-progress-bar--${this.size()} ${sizeClass}${isIndeterminate ? ' uw-progress-bar--indeterminate' : ''}`;
  });

  protected readonly barStyle = computed(() => {
    if (this.mode() === 'indeterminate') {
      return { width: '40%' };
    }

    const progressColors = this.colorProgress();
    const displayValue = this.clampedValue();

    if (progressColors.length > 0) {
      const bg = getGradientColor(progressColors, displayValue);
      return { width: `${displayValue}%`, background: bg };
    }

    const cssVar = COLOR_MAP_CSS[this.color()];
    return { width: `${displayValue}%`, background: cssVar };
  });

  protected readonly showLabelText = computed(() => {
    return this.showLabel() && this.mode() === 'determinate';
  });
}
