import { ChangeDetectionStrategy, Component, computed, input, output, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'uw-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './uw-pagination.component.html',
  styleUrl: './uw-pagination.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UwPaginationComponent {
  readonly page = input(0);
  readonly pageSize = input(10);
  readonly totalElements = input(0);
  readonly entityLabel = input('registros');

  readonly pageChange = output<number>();
  readonly pageSizeChange = output<number>();

  protected readonly totalPages = computed(() =>
    Math.max(1, Math.ceil(this.totalElements() / this.pageSize()))
  );

  protected readonly startItem = computed(() =>
    this.totalElements() === 0 ? 0 : this.page() * this.pageSize() + 1
  );

  protected readonly endItem = computed(() => {
    const end = (this.page() + 1) * this.pageSize();
    return Math.min(end, this.totalElements());
  });

  protected readonly pages = computed(() => {
    const total = this.totalPages();
    const current = this.page();
    const range: number[] = [];
    const start = Math.max(0, current - 2);
    const end = Math.min(total, current + 3);
    for (let i = start; i < end; i++) {
      range.push(i);
    }
    return range;
  });

  protected onPageChange(newPage: number): void {
    if (newPage >= 0 && newPage < this.totalPages()) {
      this.pageChange.emit(newPage);
    }
  }
}
