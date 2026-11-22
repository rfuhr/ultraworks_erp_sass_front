import { booleanAttribute, ChangeDetectionStrategy, Component, computed, contentChild, input, ViewEncapsulation } from '@angular/core';
import { UwCardHeaderDirective, UwCardFooterDirective } from './uw-card.directives';

export type UwCardVariant = 'outlined' | 'flat';
export type UwCardStripe = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';

@Component({
  selector: 'uw-card',
  standalone: true,
  imports: [UwCardHeaderDirective, UwCardFooterDirective],
  templateUrl: './uw-card.component.html',
  styleUrl: './uw-card.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UwCardComponent {
  readonly variant = input<UwCardVariant>('outlined');
  readonly hoverable = input(false, { transform: booleanAttribute });
  readonly stripe = input<UwCardStripe | 'none'>('none');
  readonly stripeBg = input(true, { transform: booleanAttribute });
  readonly bgColor = input<string>('');

  readonly hasHeader = contentChild(UwCardHeaderDirective);
  readonly hasFooter = contentChild(UwCardFooterDirective);

  readonly cardClass = computed(() => {
    const classes = ['uw-card'];
    classes.push(`uw-card--${this.variant()}`);
    if (this.hoverable()) {
      classes.push('uw-card--hoverable');
    }
    if (this.stripe() !== 'none') {
      classes.push('uw-card--has-stripe');
    }
    return classes.join(' ');
  });

  readonly stripeClass = computed(() => {
    return this.stripe() !== 'none' ? `uw-card__stripe uw-card__stripe--${this.stripe()}` : '';
  });

  readonly bgStyle = computed(() => {
    if (this.bgColor()) {
      return { 'background-color': this.bgColor() };
    }
    if (this.stripe() !== 'none' && this.stripeBg()) {
      return { 'background-color': `var(--uw-card-bg-${this.stripe()})` };
    }
    return {};
  });
}
