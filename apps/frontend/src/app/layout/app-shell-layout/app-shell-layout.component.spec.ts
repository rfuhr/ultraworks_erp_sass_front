import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router, provideRouter } from '@angular/router';
import { provideTranslateService } from '@ngx-translate/core';
import { AuthService } from '@app/core';
import { ToastService, UwAdminLayoutComponent } from '@app/uw-ui';
import { NotificationsService } from '../../features/notifications/notifications.service';
import { AppShellLayoutComponent } from './app-shell-layout.component';

describe('AppShellLayoutComponent', () => {
  let fixture: ComponentFixture<AppShellLayoutComponent>;
  let component: AppShellLayoutComponent;
  let auth: AuthService;
  let router: Router;
  let toast: ToastService;
  let notifications: NotificationsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppShellLayoutComponent],
      providers: [provideRouter([]), provideTranslateService()],
    }).compileComponents();

    auth = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    toast = TestBed.inject(ToastService);
    notifications = TestBed.inject(NotificationsService);
    jest.spyOn(router, 'navigateByUrl').mockResolvedValue(true);
    jest.spyOn(router, 'navigate').mockResolvedValue(true);
  });

  function createComponent(): void {
    fixture = TestBed.createComponent(AppShellLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }

  it('mapeia usuário, título e breadcrumb da sessão', () => {
    auth.setSession({ id: '1', name: 'Ana Souza', email: 'ana@example.com', roles: ['admin'] });

    createComponent();

    expect(component.layoutUser()).toEqual({
      name: 'Ana Souza',
      role: 'shell.user.role.admin',
      initials: 'AS',
    });
    expect(component.pageTitle()).toBe('shell.page.overview');
    expect(component.breadcrumb().map((item) => item.label)).toEqual([
      'app.title',
      'shell.nav.overview',
    ]);
  });

  it('monta os itens de menu mockados', () => {
    createComponent();

    expect(component.menuItems().map((item) => item.label)).toEqual([
      'shell.nav.overview',
      'shell.nav.reports',
      'shell.nav.team',
      'shell.nav.settings',
    ]);
    expect(component.bottomItems()[0]?.label).toBe('shell.nav.help');
  });

  it('navega em itens com rota', () => {
    createComponent();

    component.onNavigate('/');

    expect(router.navigateByUrl).toHaveBeenCalledWith('/');
  });

  it('exibe aviso para itens de demonstração', () => {
    createComponent();

    component.onNavigate('');

    expect(router.navigateByUrl).not.toHaveBeenCalled();
    expect(toast.toasts()[0]?.message).toBe('shell.demo.unavailable');
  });

  it('mapeia as notificações recentes e os rótulos do painel', () => {
    createComponent();

    expect(component.unreadCount()).toBe(3);
    expect(component.notificationItems().length).toBe(5);
    expect(component.notificationItems()[0]?.title).toBe('notifications.item.report.title');
    expect(component.notificationLabels().showAll).toBe('notifications.showAll');
  });

  it('marca a notificação como lida e abre a tela de leitura', () => {
    createComponent();

    component.onNotificationItem(component.notificationItems()[0]!);

    expect(component.unreadCount()).toBe(2);
    expect(router.navigate).toHaveBeenCalledWith(['/notificacoes', 'report-approved']);
  });

  it('navega para a lista completa de notificações', () => {
    createComponent();

    component.onShowAllNotifications();

    expect(router.navigateByUrl).toHaveBeenCalledWith('/notificacoes');
  });

  it('monta o menu de perfil com ação de sair', () => {
    createComponent();

    expect(component.profileItems().map((item) => item.id)).toEqual([
      'profile',
      'settings',
      'separator',
      'logout',
    ]);
    expect(component.profileItems().at(-1)?.danger).toBe(true);
  });

  it('exibe aviso em ações de perfil que não fazem parte do demo', () => {
    createComponent();

    component.onProfileItem({ id: 'profile', label: 'Meu perfil' });

    expect(toast.toasts()[0]?.message).toBe('shell.demo.unavailable');
    expect(auth.isAuthenticated()).toBe(false);
  });

  it('encerra a sessão pelo menu de perfil', () => {
    auth.setSession({ id: '1', name: 'Ana', email: 'ana@example.com' });

    createComponent();

    component.onProfileItem({ id: 'logout', label: 'Sair', danger: true });

    expect(auth.isAuthenticated()).toBe(false);
    expect(router.navigateByUrl).toHaveBeenCalledWith('/login');
  });

  it('encerra a sessão e volta ao login', () => {
    auth.setSession({ id: '1', name: 'Ana', email: 'ana@example.com' });

    createComponent();

    component.onLogout();

    expect(auth.isAuthenticated()).toBe(false);
    expect(router.navigateByUrl).toHaveBeenCalledWith('/login');
    expect(toast.toasts()[0]?.message).toBe('shell.logout.success');
  });

  it('renderiza o layout com os inputs calculados', () => {
    auth.setSession({ id: '1', name: 'Ana Souza', email: 'ana@example.com', roles: ['admin'] });

    createComponent();

    const layout = fixture.debugElement.query(By.directive(UwAdminLayoutComponent))
      .componentInstance as UwAdminLayoutComponent;

    expect(layout.user()?.name).toBe('Ana Souza');
    expect(layout.title()).toBe('shell.page.overview');
    expect(layout.menuItems().length).toBe(4);
    expect(layout.notifications().length).toBe(5);
    expect(layout.profileItems().length).toBe(4);
  });

  it('usa o serviço de notificações como fonte da contagem', () => {
    createComponent();

    notifications.markAllRead();

    expect(component.unreadCount()).toBe(0);
  });
});
