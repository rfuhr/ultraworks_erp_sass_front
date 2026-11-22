import { ChangeDetectionStrategy, Component, input, output, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UwButtonComponent } from '../button/uw-button.component';

@Component({
  selector: 'uw-page-header',
  standalone: true,
  imports: [CommonModule, UwButtonComponent],
  templateUrl: './uw-page-header.component.html',
  styleUrl: './uw-page-header.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UwPageHeaderComponent {
  readonly title = input<string>('');
  readonly description = input<string>('');
  readonly backLabel = input<string>('');

  readonly backClick = output<void>();
}
