import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { UW_ACCORDION_ITEM } from './uw-accordion.token';

@Component({
  selector: 'uw-accordion-content',
  standalone: true,
  templateUrl: './uw-accordion-content.component.html',
  styleUrl: './uw-accordion-content.component.scss',
  host: {
    '[class.uw-accordion-content--expanded]': 'itemApi.expanded()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UwAccordionContentComponent {
  protected readonly itemApi = inject(UW_ACCORDION_ITEM);
}
