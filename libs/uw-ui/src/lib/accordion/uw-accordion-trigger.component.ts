import { ChangeDetectionStrategy, Component, input, ViewEncapsulation, inject } from '@angular/core';
import { UW_ACCORDION_ITEM, type UwItemApi } from './uw-accordion.token';

@Component({
  selector: 'uw-accordion-trigger',
  standalone: true,
  templateUrl: './uw-accordion-trigger.component.html',
  styleUrl: './uw-accordion-trigger.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UwAccordionTriggerComponent {
  protected readonly accordionItem = inject<UwItemApi>(UW_ACCORDION_ITEM);
  readonly customIcon = input<string | undefined>(undefined);
  readonly disabled = input(false);
}
