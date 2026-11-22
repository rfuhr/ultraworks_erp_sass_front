import { TestBed } from '@angular/core/testing';
import { NotificationsService } from './notifications.service';

describe('NotificationsService', () => {
  let service: NotificationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationsService);
  });

  it('inicia com notificações mockadas e três não lidas', () => {
    expect(service.items().length).toBe(6);
    expect(service.unreadCount()).toBe(3);
    expect(service.recent().length).toBe(5);
  });

  it('busca uma notificação por id', () => {
    expect(service.getById('report-approved')?.titleKey).toBe('notifications.item.report.title');
    expect(service.getById('inexistente')).toBeNull();
  });

  it('marca uma notificação como lida', () => {
    service.markRead('report-approved');

    expect(service.getById('report-approved')?.read).toBe(true);
    expect(service.unreadCount()).toBe(2);
  });

  it('marca todas como lidas', () => {
    service.markAllRead();

    expect(service.unreadCount()).toBe(0);
    expect(service.items().every((item) => item.read)).toBe(true);
  });

  it('recarrega o estado inicial', () => {
    service.markAllRead();
    service.reload();

    expect(service.unreadCount()).toBe(3);
  });
});
