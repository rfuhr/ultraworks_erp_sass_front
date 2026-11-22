import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';

export type BadgeVariant = 'primary' | 'success' | 'danger' | 'warning' | 'neutral' | 'soft';
export type BadgeSize    = 'sm' | 'md' | 'lg';

@Component({
  selector: 'uw-badge',
  standalone: true,
  templateUrl: './uw-badge.component.html',
  styleUrl: './uw-badge.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UwBadgeComponent {
  readonly label = input<string | number | undefined>('');

  readonly variant = input<BadgeVariant>('primary');

  readonly dot = input(false);

  readonly badgeSize = input<BadgeSize>('sm');

  private readonly variantMap: Record<BadgeVariant, { bg: string; color: string; border: string }> = {
    primary: { bg: 'var(--color-primary)', color: '#fff', border: 'none' },
    success: { bg: 'var(--color-green-500)', color: '#fff', border: 'none' },
    danger:  { bg: 'var(--color-error)', color: '#fff', border: 'none' },
    warning: { bg: 'var(--color-amber-500)', color: '#fff', border: 'none' },
    neutral: { bg: 'var(--color-neutral-500)', color: '#fff', border: 'none' },
    soft:    { bg: 'var(--color-violet-100)', color: 'var(--color-primary)', border: '1px solid color-mix(in srgb, var(--color-primary) 20%, transparent)' },
  };

  readonly fontFamily = 'var(--font-family-mono)';

  readonly bg = computed(() => this.variantMap[this.variant()].bg);
  readonly color = computed(() => this.variantMap[this.variant()].color);
  readonly border = computed(() => this.variantMap[this.variant()].border);

  readonly fontSize = computed(() => {
    if (this.dot()) return '0';
    const map: Record<BadgeSize, string> = { sm: '0.5625rem', md: '0.625rem', lg: '0.6875rem' };
    return map[this.badgeSize()];
  });

  readonly dimension = computed(() => {
    if (this.dot()) {
      const map: Record<BadgeSize, string> = { sm: '0.375rem', md: '0.5rem', lg: '0.625rem' };
      return map[this.badgeSize()];
    }
    const map: Record<BadgeSize, string> = { sm: '1rem', md: '1.25rem', lg: '1.5rem' };
    return map[this.badgeSize()];
  });

  readonly padding = computed(() => {
    if (this.dot()) return '0';
    return String(this.label()).length > 2 ? '0 0.3125rem' : '0';
  });
}
