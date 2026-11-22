import { ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BreadcrumbItem } from './uw-breadcrumb.types';

export interface DisplayBreadcrumbItem extends BreadcrumbItem {
  isCollapsed?: boolean;
}

@Component({
  selector: 'uw-breadcrumb',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './uw-breadcrumb.component.html',
  styleUrl: './uw-breadcrumb.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UwBreadcrumbComponent {
  readonly items = input<readonly BreadcrumbItem[]>([]);
  readonly separator = input<string>('chevron_right');
  readonly maxItems = input<number>(0);

  readonly displayItems = computed<readonly DisplayBreadcrumbItem[]>(() => {
    const all = this.items();
    const max = this.maxItems();

    if (max <= 0 || all.length <= max) {
      return all;
    }

    const collapsed: DisplayBreadcrumbItem[] = [
      all[0],
      { label: '...', isCollapsed: true },
      all[all.length - 1],
    ];

    return collapsed;
  });

  showAll(): void {
    // Expand all items — could be enhanced with dropdown overlay
  }
}
