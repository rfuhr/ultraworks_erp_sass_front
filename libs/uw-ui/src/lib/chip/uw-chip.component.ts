import { ChangeDetectionStrategy, Component, computed, input, output, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChipVariant, ChipSize } from './uw-chip.types';

@Component({
  selector: 'uw-chip',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './uw-chip.component.html',
  styleUrl: './uw-chip.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class UwChipComponent {
  readonly label = input.required<string>();
  readonly variant = input<ChipVariant>('outlined');
  readonly size = input<ChipSize>('md');
  readonly color = input<string>();
  readonly textColor = input<string>();
  readonly removable = input(false);
  readonly disabled = input(false);

  readonly removed = output<string>();

  readonly chipClasses = computed(() => [
    'uw-chip',
    `uw-chip--${this.variant()}`,
    `uw-chip--${this.size()}`,
    this.disabled() ? 'uw-chip--disabled' : '',
  ].filter(Boolean).join(' '));

  onRemove(event: Event): void {
    event.stopPropagation();
    if (!this.disabled()) {
      this.removed.emit(this.label());
    }
  }
}
