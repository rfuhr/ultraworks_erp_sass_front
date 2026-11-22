export interface ShellMenuItem {
  readonly icon: string;
  readonly labelKey: string;
  readonly path?: string;
  readonly badge?: string;
}

export const SHELL_MENU_ITEMS: readonly ShellMenuItem[] = [
  {
    icon: 'dashboard',
    labelKey: 'shell.nav.overview',
    path: '/',
  },
  {
    icon: 'bar_chart',
    labelKey: 'shell.nav.reports',
    badge: '3',
  },
  {
    icon: 'group',
    labelKey: 'shell.nav.team',
  },
  {
    icon: 'settings',
    labelKey: 'shell.nav.settings',
  },
];

export const SHELL_BOTTOM_ITEMS: readonly ShellMenuItem[] = [
  {
    icon: 'help',
    labelKey: 'shell.nav.help',
  },
];

export interface ShellRouteLabel {
  readonly titleKey: string;
  readonly breadcrumbKeys: readonly string[];
}

export const SHELL_ROUTE_LABELS: Record<string, ShellRouteLabel> = {
  '/': {
    titleKey: 'shell.page.overview',
    breadcrumbKeys: ['app.title', 'shell.nav.overview'],
  },
  '/notificacoes': {
    titleKey: 'shell.page.notifications',
    breadcrumbKeys: ['app.title', 'notifications.title'],
  },
  '/notificacoes/:id': {
    titleKey: 'shell.page.notification',
    breadcrumbKeys: ['app.title', 'notifications.title', 'shell.page.notification'],
  },
};

export const SHELL_FALLBACK_LABEL: ShellRouteLabel = {
  titleKey: 'shell.page.overview',
  breadcrumbKeys: ['app.title', 'shell.nav.overview'],
};

export function resolveShellRouteLabel(path: string): ShellRouteLabel {
  if (SHELL_ROUTE_LABELS[path]) {
    return SHELL_ROUTE_LABELS[path];
  }

  if (path.startsWith('/notificacoes/')) {
    return SHELL_ROUTE_LABELS['/notificacoes/:id'];
  }

  return SHELL_FALLBACK_LABEL;
}
