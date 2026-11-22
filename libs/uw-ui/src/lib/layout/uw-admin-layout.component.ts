import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  input,
  model,
  output,
  signal,
} from '@angular/core';
import type { BreadcrumbItem } from '../breadcrumb/uw-breadcrumb.types';
import { UwHeaderComponent } from './uw-header.component';
import { UwSidebarComponent } from './uw-sidebar.component';
import { UwSubheaderComponent } from './uw-subheader.component';
import type {
  UwLayoutUser,
  UwNavItem,
  UwNotificationItem,
  UwNotificationPanelLabels,
  UwProfileMenuItem,
} from './uw-admin-layout.types';

@Component({
  selector: 'uw-admin-layout',
  standalone: true,
  imports: [UwSidebarComponent, UwHeaderComponent, UwSubheaderComponent],
  templateUrl: './uw-admin-layout.component.html',
  styleUrl: './uw-admin-layout.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UwAdminLayoutComponent {
  readonly menuItems = input<readonly UwNavItem[]>([]);
  readonly bottomItems = input<readonly UwNavItem[]>([]);
  readonly breadcrumb = input<readonly BreadcrumbItem[]>([]);
  readonly user = input<UwLayoutUser | null>(null);
  readonly unreadCount = input(0);
  readonly title = input('');
  readonly sidebarTitle = input('Frontend Template');

  readonly notifications = input<readonly UwNotificationItem[]>([]);
  readonly notificationsLoading = input(false);
  readonly notificationsError = input(false);
  readonly notificationLabels = input<UwNotificationPanelLabels | null>(null);
  readonly profileItems = input<readonly UwProfileMenuItem[]>([]);

  readonly collapsed = model(false);
  readonly mobileOpen = signal(false);

  readonly navigate = output<string>();
  readonly logout = output<void>();
  readonly notificationsClick = output<void>();
  readonly notificationItemClick = output<UwNotificationItem>();
  readonly notificationsRetry = output<void>();
  readonly notificationsShowAll = output<void>();
  readonly profileItemClick = output<UwProfileMenuItem>();

  toggleSidebar(): void {
    if (typeof window !== 'undefined' && window.matchMedia('(max-width: 900px)').matches) {
      this.mobileOpen.update((open) => !open);
      return;
    }

    this.collapsed.update((collapsed) => !collapsed);
  }

  closeMobile(): void {
    this.mobileOpen.set(false);
  }
}
