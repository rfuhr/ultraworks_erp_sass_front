import { ChangeDetectionStrategy, Component, inject, signal, ViewEncapsulation } from '@angular/core';
import { UwAccordionComponent } from './uw-accordion.component';
import { UW_ACCORDION_ITEM, type UwItemApi } from './uw-accordion.token';

@Component({
  selector: 'uw-accordion-item',
  standalone: true,
  templateUrl: './uw-accordion-item.component.html',
  styleUrl: './uw-accordion-item.component.scss',
  providers: [
    {
      provide: UW_ACCORDION_ITEM,
      useFactory: (): UwItemApi => {
        const accordion = inject(UwAccordionComponent);
        const expanded = signal(false);
        accordion.addItem(expanded);
        return {
          expanded,
          toggle: () => {
            const next = !expanded();
            expanded.set(next);
            accordion.onItemToggle(expanded, next);
          },
        };
      },
    },
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UwAccordionItemComponent {
  protected readonly api = inject(UW_ACCORDION_ITEM);
}
