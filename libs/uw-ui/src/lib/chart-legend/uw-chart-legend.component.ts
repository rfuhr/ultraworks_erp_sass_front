import { ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';

export interface UwChartLegendItem {
  label: string;
  value: string | number;
  color: string;
}

@Component({
  selector: 'uw-chart-legend',
  standalone: true,
  templateUrl: './uw-chart-legend.component.html',
  styleUrl: './uw-chart-legend.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UwChartLegendComponent {
  readonly items = input<UwChartLegendItem[]>([]);
}
