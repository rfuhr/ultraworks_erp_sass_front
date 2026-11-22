import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { provideTranslateService } from '@ngx-translate/core';
import { NotificationsService } from '../notifications.service';
import { NotificationListPageComponent } from './notification-list-page.component';

describe('NotificationListPageComponent', () => {
  let fixture: ComponentFixture<NotificationListPageComponent>;
  let component: NotificationListPageComponent;
  let router: Router;
  let notifications: NotificationsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationListPageComponent],
      providers: [provideRouter([]), provideTranslateService()],
    }).compileComponents();

    router = TestBed.inject(Router);
    notifications = TestBed.inject(NotificationsService);
    jest.spyOn(router, 'navigate').mockResolvedValue(true);

    fixture = TestBed.createComponent(NotificationListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('lista todas as notificações mockadas', () => {
    expect(component.items().length).toBe(6);
    expect(fixture.nativeElement.textContent).toContain('notifications.item.report.title');
  });

  it('abre a tela de leitura da notificação', () => {
    component.open('report-approved');

    expect(router.navigate).toHaveBeenCalledWith(['/notificacoes', 'report-approved']);
  });

  it('marca todas como lidas', () => {
    component.markAllRead();
    fixture.detectChanges();

    expect(notifications.unreadCount()).toBe(0);
  });
});
