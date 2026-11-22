import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router, provideRouter } from '@angular/router';
import { provideTranslateService } from '@ngx-translate/core';
import { NotificationsService } from '../notifications.service';
import { NotificationDetailPageComponent } from './notification-detail-page.component';

describe('NotificationDetailPageComponent', () => {
  let fixture: ComponentFixture<NotificationDetailPageComponent>;
  let component: NotificationDetailPageComponent;
  let router: Router;
  let notifications: NotificationsService;
  let notificationId: string;

  beforeEach(async () => {
    notificationId = 'report-approved';

    await TestBed.configureTestingModule({
      imports: [NotificationDetailPageComponent],
      providers: [
        provideRouter([]),
        provideTranslateService(),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => (key === 'id' ? notificationId : null),
              },
            },
          },
        },
      ],
    }).compileComponents();

    router = TestBed.inject(Router);
    notifications = TestBed.inject(NotificationsService);
    jest.spyOn(router, 'navigateByUrl').mockResolvedValue(true);

    fixture = TestBed.createComponent(NotificationDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('exibe o conteúdo da notificação', () => {
    expect(component.notification()?.titleKey).toBe('notifications.item.report.title');
    expect(fixture.nativeElement.textContent).toContain('notifications.item.report.body');
  });

  it('marca a notificação como lida ao abrir', () => {
    expect(notifications.getById('report-approved')?.read).toBe(true);
    expect(notifications.unreadCount()).toBe(2);
  });

  it('volta para a lista de notificações', () => {
    component.back();

    expect(router.navigateByUrl).toHaveBeenCalledWith('/notificacoes');
  });

  it('exibe estado de não encontrada', () => {
    notifications.reload();
    notificationId = 'inexistente';
    const missingFixture = TestBed.createComponent(NotificationDetailPageComponent);
    const missing = missingFixture.componentInstance;
    missingFixture.detectChanges();

    expect(missing.notification()).toBeNull();
    expect(missingFixture.nativeElement.textContent).toContain('notifications.notFound.title');
  });
});
