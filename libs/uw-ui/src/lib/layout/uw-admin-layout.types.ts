import type { BreadcrumbItem } from '../breadcrumb/uw-breadcrumb.types';

export interface UwNavItem {
  readonly icon?: string;
  readonly label: string;
  readonly path?: string;
  readonly badge?: string;
  readonly children?: readonly UwNavItem[];
}

export interface UwLayoutUser {
  readonly name: string;
  readonly role?: string;
  readonly initials?: string;
}

export interface UwNotificationItem {
  readonly id: string;
  readonly title: string;
  readonly description?: string;
  readonly time?: string;
  readonly read?: boolean;
  readonly icon?: string;
}

export interface UwNotificationPanelLabels {
  readonly title: string;
  readonly empty: string;
  readonly loading: string;
  readonly error: string;
  readonly retry: string;
  readonly showAll: string;
}

export interface UwProfileMenuItem {
  readonly id: string;
  readonly label: string;
  readonly icon?: string;
  readonly danger?: boolean;
  readonly separator?: boolean;
}

export interface UwAdminLayoutInputs {
  readonly menuItems: readonly UwNavItem[];
  readonly bottomItems: readonly UwNavItem[];
  readonly breadcrumb: readonly BreadcrumbItem[];
  readonly user: UwLayoutUser | null;
  readonly unreadCount: number;
  readonly sidebarTitle?: string;
}
