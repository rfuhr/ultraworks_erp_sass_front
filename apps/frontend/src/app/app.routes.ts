import { Routes } from '@angular/router';
import { authGuard } from '@app/core';
import { MockLoginRepository } from './features/login/data/login.mock-repository';
import { LOGIN_REPOSITORY } from './features/login/data/login.repository';
import { NotFoundComponent } from './features/not-found/not-found.component';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./features/login/login-page/login-page.component').then((m) => m.LoginPageComponent),
    providers: [
      MockLoginRepository,
      { provide: LOGIN_REPOSITORY, useExisting: MockLoginRepository },
    ],
    title: 'Entrar — Frontend Template',
  },
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./layout/app-shell-layout/app-shell-layout.component').then(
        (m) => m.AppShellLayoutComponent,
      ),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/home/home-page.component').then((m) => m.HomePageComponent),
        title: 'Visão geral — Frontend Template',
      },
      {
        path: 'notificacoes',
        loadComponent: () =>
          import('./features/notifications/notification-list/notification-list-page.component').then(
            (m) => m.NotificationListPageComponent,
          ),
        title: 'Notificações — Frontend Template',
      },
      {
        path: 'notificacoes/:id',
        loadComponent: () =>
          import('./features/notifications/notification-detail/notification-detail-page.component').then(
            (m) => m.NotificationDetailPageComponent,
          ),
        title: 'Notificação — Frontend Template',
      },
    ],
  },
  {
    path: '404',
    component: NotFoundComponent,
    title: 'Página não encontrada — Frontend Template',
  },
  {
    path: '**',
    component: NotFoundComponent,
    title: 'Página não encontrada — Frontend Template',
  },
];
