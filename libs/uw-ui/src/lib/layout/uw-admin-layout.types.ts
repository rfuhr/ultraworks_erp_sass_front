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

export interface UwAdminLayoutInputs {
  readonly menuItems: readonly UwNavItem[];
  readonly bottomItems: readonly UwNavItem[];
  readonly breadcrumb: readonly BreadcrumbItem[];
  readonly user: UwLayoutUser | null;
  readonly unreadCount: number;
  readonly sidebarTitle?: string;
}
