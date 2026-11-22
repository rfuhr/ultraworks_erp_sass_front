import { ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';
import { UwCardComponent } from '../card/uw-card.component';

@Component({
  selector: 'uw-chart-card',
  standalone: true,
  imports: [UwCardComponent],
  templateUrl: './uw-chart-card.component.html',
  styleUrl: './uw-chart-card.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UwChartCardComponent {
  readonly title = input.required<string>();
  readonly subtitle = input<string>('');
  readonly badge = input<string>('');
}
