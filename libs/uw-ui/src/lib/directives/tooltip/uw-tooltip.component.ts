import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'uw-tooltip',
  standalone: true,
  template: `<div class="uw-tooltip">{{ text }}</div>`,
  styleUrl: './uw-tooltip.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UwTooltipComponent {
  text = '';
}
