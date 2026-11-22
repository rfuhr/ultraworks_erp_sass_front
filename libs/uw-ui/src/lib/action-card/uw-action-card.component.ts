import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { UwIconComponent, UwIconSize } from '../icon/uw-icon.component';

@Component({
  selector: 'uw-action-card',
  standalone: true,
  imports: [CommonModule, UwIconComponent],
  templateUrl: './uw-action-card.component.html',
  styleUrl: './uw-action-card.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UwActionCardComponent {
  readonly label = input.required<string>();
  readonly statusLabel = input.required<string>();
  readonly ctaLabel = input<string>();
  readonly icon = input<string>('');
  readonly color = input('var(--color-primary)');
  readonly bg = input('');
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly actionable = input(true, { transform: booleanAttribute });
  readonly iconSize = input<UwIconSize>('sm');

  readonly cta = output<void>();

  readonly statusText = computed(() => this.ctaLabel() || this.statusLabel());
  readonly borderColor = computed(() => `color-mix(in srgb, ${this.color()} 25%, transparent)`);
  readonly interactive = computed(() => !this.disabled() && this.actionable());
  readonly ariaLabel = computed(() => (this.interactive() ? this.label() : undefined));

  onClick(): void {
    if (this.interactive()) {
      this.cta.emit();
    }
  }
}
