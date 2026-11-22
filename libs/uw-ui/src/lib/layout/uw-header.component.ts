import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { UwAvatarComponent } from '../avatar/uw-avatar.component';
import { UwIconComponent } from '../icon/uw-icon.component';
import { UwPopoverComponent } from '../popover/uw-popover.component';
import { UWPopoverTrigger } from '../directives/popover-trigger/uw-popover-trigger.directive';
import type {
  UwLayoutUser,
  UwNotificationItem,
  UwNotificationPanelLabels,
  UwProfileMenuItem,
} from './uw-admin-layout.types';

@Component({
  selector: 'uw-header',
  standalone: true,
  imports: [UwAvatarComponent, UwIconComponent, UwPopoverComponent, UWPopoverTrigger],
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

  readonly notifications = input<readonly UwNotificationItem[]>([]);
  readonly notificationsLoading = input(false);
  readonly notificationsError = input(false);
  readonly notificationLabels = input<UwNotificationPanelLabels | null>(null);
  readonly profileItems = input<readonly UwProfileMenuItem[]>([]);

  readonly toggleSidebar = output<void>();
  readonly notificationsClick = output<void>();
  readonly profileClick = output<void>();
  readonly notificationItemClick = output<UwNotificationItem>();
  readonly notificationsRetry = output<void>();
  readonly notificationsShowAll = output<void>();
  readonly profileItemClick = output<UwProfileMenuItem>();

  @ViewChild('notificationsPanel')
  private notificationsPanel?: UwPopoverComponent;

  @ViewChild('profilePanel')
  private profilePanel?: UwPopoverComponent;

  onNotificationClick(item: UwNotificationItem): void {
    this.notificationsPanel?.close();
    this.notificationItemClick.emit(item);
  }

  onShowAllNotifications(): void {
    this.notificationsPanel?.close();
    this.notificationsShowAll.emit();
  }

  onProfileItemClick(item: UwProfileMenuItem): void {
    this.profilePanel?.close();
    this.profileItemClick.emit(item);
  }
}
