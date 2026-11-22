import { ChangeDetectionStrategy, Component, input, output, ViewEncapsulation } from '@angular/core';
import { UwAvatarComponent } from '../avatar/uw-avatar.component';
import { UwIconComponent } from '../icon/uw-icon.component';
import type { UwLayoutUser } from './uw-admin-layout.types';

@Component({
  selector: 'uw-header',
  standalone: true,
  imports: [UwAvatarComponent, UwIconComponent],
  templateUrl: './uw-header.component.html',
  styleUrl: './uw-header.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UwHeaderComponent {
  readonly title = input('');
  readonly user = input<UwLayoutUser | null>(null);
  readonly unreadCount = input(0);
  readonly showSidebarToggle = input(true);

  readonly toggleSidebar = output<void>();
  readonly notificationsClick = output<void>();
  readonly profileClick = output<void>();
}
