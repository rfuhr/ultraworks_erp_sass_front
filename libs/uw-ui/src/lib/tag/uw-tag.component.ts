import { ChangeDetectionStrategy, Component, computed, input, output, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UwIconComponent } from '../icon/uw-icon.component';
import type { UwTagVariant, UwTagSize } from './uw-tag.types';

@Component({
  selector: 'uw-tag',
  standalone: true,
  imports: [CommonModule, UwIconComponent],
  templateUrl: './uw-tag.component.html',
  styleUrl: './uw-tag.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UwTagComponent<T = string> {
  readonly label = input<string>('');
  readonly value = input.required<T>();
  readonly variant = input<UwTagVariant>('primary');
  readonly size = input<UwTagSize>('md');
  readonly removable = input<boolean>(true);
  readonly customColor = input<string>('');

  readonly removed = output<T>();

  readonly tagClass = computed(() => {
    const variant = `uw-tag--${this.variant()}`;
    const size = `uw-tag--${this.size()}`;
    return `uw-tag ${variant} ${size}`.trim();
  });

  readonly customStyles = computed(() => {
    const color = this.customColor();
    if (!color) return {};

    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);

    return {
      '--uw-tag-custom-color': color,
      'color': color,
      'background': `rgba(${r}, ${g}, ${b}, 0.10)`,
      'border-color': `rgba(${r}, ${g}, ${b}, 0.25)`,
    };
  });

  onRemove(): void {
    this.removed.emit(this.value());
  }
}
