import { ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';

export type DividerOrientation = 'horizontal' | 'vertical';

@Component({
  selector: 'uw-divider',
  standalone: true,
  templateUrl: './uw-divider.component.html',
  styleUrl: './uw-divider.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class UwDividerComponent {
  readonly orientation = input<DividerOrientation>('horizontal');
  readonly label = input<string>();
  readonly icon = input<string>();
  readonly thickness = input<1 | 2>(1);
}
