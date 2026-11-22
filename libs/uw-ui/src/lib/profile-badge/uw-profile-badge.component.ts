import { ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'uw-profile-badge',
  standalone: true,
  templateUrl: './uw-profile-badge.component.html',
  styleUrl: './uw-profile-badge.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class UwProfileBadgeComponent {
  readonly tipo = input.required<'avaliador' | 'administrativo'>();
}
