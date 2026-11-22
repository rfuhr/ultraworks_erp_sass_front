import { ChangeDetectionStrategy, Component, computed, contentChild, input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import type { UwPanelVariant } from './uw-panel.types';
import { UwPanelFooterDirective } from './uw-panel-footer.directive';

@Component({
  selector: 'uw-panel',
  standalone: true,
  imports: [CommonModule, UwPanelFooterDirective],
  templateUrl: './uw-panel.component.html',
  styleUrl: './uw-panel.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[attr.title]': 'null' },
})
export class UwPanelComponent {
  readonly variant = input<UwPanelVariant>('default');
  readonly customColor = input<string | undefined>(undefined);
  readonly headerBgColor = input<string | undefined>(undefined);
  readonly title = input<string | undefined>(undefined);
  readonly icon = input<string | undefined>(undefined);

  readonly panelClass = computed(() => {
    const base = 'uw-panel';
    const variant = `uw-panel--${this.variant()}`;
    return `${base} ${variant}`.trim();
  });

  readonly hasHeader = computed(() => !!this.title() || !!this.icon());

  readonly footerDirective = contentChild(UwPanelFooterDirective);
}
