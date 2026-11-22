import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { filter, map } from 'rxjs';
import { AuthService } from '@app/core';
import { I18nService } from '@app/i18n';
import {
  BreadcrumbItem,
  ToastService,
  UwAdminLayoutComponent,
  UwLayoutUser,
  UwNavItem,
  UwNotificationItem,
  UwNotificationPanelLabels,
  UwProfileMenuItem,
} from '@app/uw-ui';
import { NotificationsService } from '../../features/notifications/notifications.service';
import {
  SHELL_BOTTOM_ITEMS,
  SHELL_MENU_ITEMS,
  ShellMenuItem,
  resolveShellRouteLabel,
} from '../navigation/shell-menu.mock';

@Component({
  selector: 'app-shell-layout',
  standalone: true,
  imports: [RouterOutlet, TranslatePipe, UwAdminLayoutComponent],
  templateUrl: './app-shell-layout.component.html',
  styleUrl: './app-shell-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppShellLayoutComponent {
  private readonly router = inject(Router);
  private readonly auth = inject(AuthService);
  private readonly i18n = inject(I18nService);
  private readonly translate = inject(TranslateService);
  private readonly toast = inject(ToastService);
  private readonly notificationsService = inject(NotificationsService);

  readonly collapsed = signal(false);
  readonly unreadCount = this.notificationsService.unreadCount;

  private readonly currentUrl = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map((event) => event.urlAfterRedirects),
    ),
    { initialValue: this.router.url },
  );

  private readonly routeLabel = computed(() => {
    const path = this.currentUrl().split('?')[0] || '/';
    return resolveShellRouteLabel(path);
  });

  readonly pageTitle = computed(() => {
    this.i18n.currentLanguage();
    return this.translate.instant(this.routeLabel().titleKey);
  });

  readonly breadcrumb = computed<readonly BreadcrumbItem[]>(() => {
    this.i18n.currentLanguage();
    return this.routeLabel().breadcrumbKeys.map((key) => ({
      label: this.translate.instant(key),
    }));
  });

  readonly layoutUser = computed<UwLayoutUser | null>(() => {
    const session = this.auth.session();
    if (!session) return null;

    this.i18n.currentLanguage();
    const roleKey = session.roles?.includes('admin') ? 'shell.user.role.admin' : 'shell.user.role.member';

    return {
      name: session.name,
      role: this.translate.instant(roleKey),
      initials: this.initials(session.name),
    };
  });

  readonly menuItems = computed<readonly UwNavItem[]>(() => {
    this.i18n.currentLanguage();
    return this.toNavItems(SHELL_MENU_ITEMS);
  });

  readonly bottomItems = computed<readonly UwNavItem[]>(() => {
    this.i18n.currentLanguage();
    return this.toNavItems(SHELL_BOTTOM_ITEMS);
  });

  readonly notificationItems = computed<readonly UwNotificationItem[]>(() => {
    this.i18n.currentLanguage();
    return this.notificationsService.recent().map((item) => ({
      id: item.id,
      title: this.translate.instant(item.titleKey),
      description: this.translate.instant(item.bodyKey),
      time: this.translate.instant(item.timeKey),
      read: item.read,
      icon: item.icon,
    }));
  });

  readonly notificationLabels = computed<UwNotificationPanelLabels>(() => {
    this.i18n.currentLanguage();
    return {
      title: this.translate.instant('notifications.title'),
      empty: this.translate.instant('notifications.empty.title'),
      loading: this.translate.instant('notifications.loading'),
      error: this.translate.instant('notifications.error'),
      retry: this.translate.instant('notifications.error.retry'),
      showAll: this.translate.instant('notifications.showAll'),
    };
  });

  readonly profileItems = computed<readonly UwProfileMenuItem[]>(() => {
    this.i18n.currentLanguage();
    return [
      {
        id: 'profile',
        label: this.translate.instant('profile.myProfile'),
        icon: 'person',
      },
      {
        id: 'settings',
        label: this.translate.instant('profile.settings'),
        icon: 'settings',
      },
      {
        id: 'separator',
        label: '',
        separator: true,
      },
      {
        id: 'logout',
        label: this.translate.instant('profile.logout'),
        icon: 'logout',
        danger: true,
      },
    ];
  });

  onNavigate(path: string): void {
    if (!path) {
      this.toast.show(this.translate.instant('shell.demo.unavailable'), 'info');
      return;
    }

    void this.router.navigateByUrl(path);
  }

  onNotificationItem(item: UwNotificationItem): void {
    this.notificationsService.markRead(item.id);
    void this.router.navigate(['/notificacoes', item.id]);
  }

  onShowAllNotifications(): void {
    void this.router.navigateByUrl('/notificacoes');
  }

  onProfileItem(item: UwProfileMenuItem): void {
    if (item.id === 'logout') {
      this.onLogout();
      return;
    }

    this.toast.show(this.translate.instant('shell.demo.unavailable'), 'info');
  }

  onLogout(): void {
    this.auth.clearSession();
    this.toast.show(this.translate.instant('shell.logout.success'), 'success');
    void this.router.navigateByUrl('/login');
  }

  private toNavItems(items: readonly ShellMenuItem[]): readonly UwNavItem[] {
    return items.map((item) => ({
      icon: item.icon,
      label: this.translate.instant(item.labelKey),
      path: item.path,
      badge: item.badge,
    }));
  }

  private initials(name: string): string {
    return (
      name
        .trim()
        .split(/\s+/)
        .map((part) => part[0])
        .join('')
        .toUpperCase()
        .slice(0, 2) || 'U'
    );
  }
}
