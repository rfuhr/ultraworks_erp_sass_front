import { ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';
import { UwBreadcrumbComponent } from '../breadcrumb/uw-breadcrumb.component';
import type { BreadcrumbItem } from '../breadcrumb/uw-breadcrumb.types';

@Component({
  selector: 'uw-subheader',
  standalone: true,
  imports: [UwBreadcrumbComponent],
  templateUrl: './uw-subheader.component.html',
  styleUrl: './uw-subheader.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UwSubheaderComponent {
  readonly items = input<readonly BreadcrumbItem[]>([]);
}
