import { ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from '@angular/core';

export type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type SpinnerColor = 'primary' | 'white' | 'inherit';
export type SpinnerMode = 'indeterminate' | 'determinate';

@Component({
  selector: 'uw-spinner',
  standalone: true,
  templateUrl: './uw-spinner.component.html',
  styleUrl: './uw-spinner.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class UwSpinnerComponent {
  readonly size = input<SpinnerSize>('md');
  readonly color = input<SpinnerColor>('primary');
  readonly mode = input<SpinnerMode>('indeterminate');
  readonly value = input(0);
  readonly label = input<string>();
  readonly overlay = input(false);

  private readonly sizeMap: Record<SpinnerSize, { diameter: number; borderWidth: number }> = {
    xs: { diameter: 16, borderWidth: 2 },
    sm: { diameter: 24, borderWidth: 2 },
    md: { diameter: 32, borderWidth: 3 },
    lg: { diameter: 48, borderWidth: 3 },
    xl: { diameter: 64, borderWidth: 4 },
  };

  readonly diameter = computed(() => this.sizeMap[this.size()].diameter);
  readonly borderWidth = computed(() => this.sizeMap[this.size()].borderWidth);
  readonly circumference = computed(() => 2 * Math.PI * 16);
  readonly offset = computed(() => this.circumference() * (1 - this.value() / 100));
  readonly strokeColor = computed(() => {
    const map: Record<SpinnerColor, string> = {
      primary: '#0041c8',
      white: '#ffffff',
      inherit: 'currentColor',
    };
    return map[this.color()];
  });
  readonly labelSize = computed(() => Math.max(12, this.diameter() * 0.4) + 'px');
}
