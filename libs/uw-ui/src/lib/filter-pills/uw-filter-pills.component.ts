import { ChangeDetectionStrategy, Component, computed, input, output, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UwIconComponent } from '../icon/uw-icon.component';
import type { UwFilterPillItem, UwFilterPillsSize } from './uw-filter-pills.types';

@Component({
  selector: 'uw-filter-pills',
  standalone: true,
  imports: [CommonModule, UwIconComponent],
  templateUrl: './uw-filter-pills.component.html',
  styleUrl: './uw-filter-pills.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UwFilterPillsComponent<T = string> {
  readonly items = input.required<UwFilterPillItem<T>[]>();
  readonly active = input<T | null>(null);
  readonly size = input<UwFilterPillsSize>('default');

  readonly activeChange = output<T>();

  readonly containerClass = computed(() => {
    return `uw-filter-pills uw-filter-pills--${this.size()}`;
  });

  isActive(item: UwFilterPillItem<T>): boolean {
    return this.active() === item.value;
  }

  select(item: UwFilterPillItem<T>): void {
    if (this.active() !== item.value) {
      this.activeChange.emit(item.value);
    }
  }
}
