import { ChangeDetectionStrategy, Component, input, output, ViewEncapsulation } from '@angular/core';
import { UwIconComponent } from '../icon/uw-icon.component';
import type { UwLayoutUser, UwNavItem } from './uw-admin-layout.types';

@Component({
  selector: 'uw-sidebar',
  standalone: true,
  imports: [UwIconComponent],
  templateUrl: './uw-sidebar.component.html',
  styleUrl: './uw-sidebar.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UwSidebarComponent {
  readonly items = input<readonly UwNavItem[]>([]);
  readonly bottomItems = input<readonly UwNavItem[]>([]);
  readonly user = input<UwLayoutUser | null>(null);
  readonly collapsed = input(false);
  readonly title = input('Frontend Template');

  readonly navigate = output<string>();
  readonly logout = output<void>();
  readonly toggle = output<void>();
}
