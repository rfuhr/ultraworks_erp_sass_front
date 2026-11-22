import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { UwBadgeComponent, BadgeVariant, BadgeSize } from '../badge/uw-badge.component';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'soft' | 'text' | 'link' | 'premium' | 'danger' | 'alert' | 'success';
export type ButtonSize    = 'sm' | 'md';
export type IconPosition  = 'left' | 'right';

@Component({
  selector: 'uw-button',
  standalone: true,
  imports: [UwBadgeComponent],
  templateUrl: './uw-button.component.html',
  styleUrl: './uw-button.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UwButtonComponent {
  readonly label = input<string>();

  readonly icon = input<string>();

  readonly iconPosition = input<IconPosition>('left');

  readonly iconOnly = input(false);

  readonly variant = input<ButtonVariant>('primary');

  readonly size = input<ButtonSize>('md');

  readonly type = input<'button' | 'submit' | 'reset'>('button');

  readonly disabled = input(false);

  readonly fullWidth = input(false);

  readonly clicked = output<MouseEvent>();

  readonly badge = input<string | number>();

  readonly badgeVariant = input<BadgeVariant>('danger');

  readonly badgeSize = input<BadgeSize>('sm');

  readonly badgeDot = input(false);

  readonly iconSize = computed(() => this.size() === 'sm' ? '16px' : '20px');

  readonly sizeClasses = computed(() => {
    if (this.variant() === 'link') {
      return 'gap-1 p-0';
    }
    if (this.iconOnly()) {
      return this.size() === 'sm' ? 'p-1.5' : 'p-2.5';
    }
    return this.size() === 'sm' ? 'gap-1 px-3 py-1.5' : 'gap-2 px-4 py-2.5';
  });

  readonly variantClasses = computed(() => {
    const map: Record<ButtonVariant, string> = {
      primary:   'hover:opacity-90',
      secondary: 'hover:opacity-80',
      outline:   'hover:opacity-80',
      ghost:     'hover:opacity-90',
      soft:      'hover:opacity-80',
      text:      'hover:opacity-70',
      link:      'hover:opacity-70',
      premium:   'hover:opacity-90',
      danger:    'hover:opacity-90',
      alert:     'hover:opacity-90',
      success:   'hover:opacity-90',
    };
    return map[this.variant()];
  });

  readonly classes = computed(() => `${this.sizeClasses()} ${this.variantClasses()}`);

  readonly styles = computed((): Record<string, string> => {
    const fontSize   = this.size() === 'sm' ? '0.75rem' : '0.8125rem';
    const fontWeight = this.variant() === 'primary' || this.variant() === 'premium' ? '700'
                     : this.variant() === 'success' || this.variant() === 'danger' || this.variant() === 'alert' || this.variant() === 'link' ? '600'
                     : this.variant() === 'soft' && this.size() === 'md' ? '600'
                     : '500';
    const fontFamily = this.variant() === 'primary' || this.variant() === 'premium'
      ? 'var(--font-family-display)'
      : 'var(--font-family-body)';

    if (this.disabled()) {
      return {
        fontFamily: 'var(--font-family-body)',
        fontSize,
        fontWeight: '400',
        background: 'var(--color-surface-container)',
        color: 'var(--color-outline)',
        border: '1px solid var(--color-outline-variant)',
        boxShadow: 'none',
        cursor: 'not-allowed',
      };
    }

    const map: Record<ButtonVariant, Record<string, string>> = {
      primary:   { background: 'var(--color-primary)', color: 'var(--color-on-primary)' },
      premium:   { background: 'linear-gradient(135deg, #6c47ff, #3b82f6)', color: '#fff', boxShadow: '0 4px 20px rgba(108,71,255,0.35)' },
      secondary: { background: 'var(--color-secondary-container)', border: '1px solid var(--color-secondary)', color: 'var(--color-secondary)' },
      outline:   { background: 'transparent', border: '1px solid var(--color-primary)', color: 'var(--color-primary)' },
      ghost:     { background: 'color-mix(in srgb, var(--color-primary) 35%, transparent)', border: '1px solid color-mix(in srgb, var(--color-primary) 50%, transparent)', color: 'var(--color-primary-container)' },
      soft:      { background: 'var(--color-violet-100)', border: '1px solid color-mix(in srgb, var(--color-primary) 20%, transparent)', color: 'var(--color-primary)' },
      text:      { background: 'transparent', color: 'var(--color-on-surface-variant)' },
      link:      { background: 'transparent', color: 'var(--color-primary)' },
      danger:    { background: 'var(--color-red-100)', border: '1px solid color-mix(in srgb, var(--color-error) 20%, transparent)', color: 'var(--color-error)' },
      alert:     { background: 'var(--color-warning)', color: 'var(--color-on-warning)' },
      success:   { background: 'var(--color-green-100)', border: '1px solid color-mix(in srgb, var(--color-green-600) 20%, transparent)', color: 'var(--color-green-700)' },
    };

    return { fontFamily, fontSize, fontWeight, ...map[this.variant()] };
  });
}