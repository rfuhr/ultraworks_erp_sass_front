import { booleanAttribute, ChangeDetectionStrategy, Component, computed, input, output, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UwIconComponent } from '../icon/uw-icon.component';

export type StatCardVariant = 'default' | 'compact';
export type StatCardValueSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'uw-stat-card',
  standalone: true,
  imports: [CommonModule, RouterLink, UwIconComponent],
  templateUrl: './uw-stat-card.component.html',
  styleUrl: './uw-stat-card.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UwStatCardComponent {
  readonly icon = input<string>('');
  readonly iconBg = input('var(--color-violet-100)');
  readonly iconColor = input('var(--color-primary)');
  readonly value = input<string>('');
  readonly valueColor = input<string>('');
  readonly bgColor = input<string>('');
  readonly label = input<string>('');
  readonly valueSize = input<StatCardValueSize>('md');
  readonly variant = input<StatCardVariant>('default');
  readonly loading = input(false, { transform: booleanAttribute });
  readonly href = input<string>('');
  readonly delta = input<string>('');
  readonly deltaColor = input('var(--color-success)');
  readonly sparkline = input<number[]>([]);
  readonly sparklineColor = input('var(--color-chart-1)');

  readonly clicked = output<void>();

  readonly isClickable = computed(() => !!this.href());
  readonly iconSize = computed(() => this.variant() === 'compact' ? 'xs' : 'md');
  readonly compPadding = computed(() => this.variant() === 'compact' ? 'p-2.5' : 'p-4');
  readonly compGap = computed(() => this.variant() === 'compact' ? 'gap-2' : 'gap-3');
  readonly compBoxSize = computed(() => this.variant() === 'compact' ? 'w-7 h-7' : 'w-10 h-10');

  readonly sparklinePath = computed(() => {
    const pontos = this.sparkline();
    if (pontos.length < 2) {
      return '';
    }
    const max = Math.max(...pontos);
    const min = Math.min(...pontos);
    const range = max - min || 1;
    const step = 100 / (pontos.length - 1);
    return pontos
      .map((p, i) => {
        const x = i * step;
        const y = 40 - ((p - min) / range) * 36;
        return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(' ');
  });

  onClick(): void {
    if (!this.href()) {
      this.clicked.emit();
    }
  }
}
