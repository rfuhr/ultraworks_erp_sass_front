import { TestBed } from '@angular/core/testing';
import { HomeDashboardService } from './home-dashboard.service';

describe('HomeDashboardService', () => {
  let service: HomeDashboardService;

  const flush = () => new Promise((resolve) => setTimeout(resolve, 0));

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomeDashboardService);
    service.latencyMs = 0;
  });

  it('inicia em carregamento', () => {
    expect(service.state()).toBe('loading');
  });

  it('carrega os indicadores no estado de sucesso', async () => {
    service.load('success');

    expect(service.state()).toBe('loading');

    await flush();

    expect(service.state()).toBe('success');
    expect(service.metrics().length).toBe(4);
    expect(service.activities().length).toBe(3);
    expect(service.progress().length).toBe(3);
    expect(service.unreadCount()).toBe(3);
  });

  it('carrega o estado vazio sem atividades', async () => {
    service.load('empty');
    await flush();

    expect(service.state()).toBe('empty');
    expect(service.metrics().length).toBe(4);
    expect(service.activities().length).toBe(0);
    expect(service.progress().length).toBe(3);
  });

  it('carrega o estado de erro sem dados', async () => {
    service.load('error');
    await flush();

    expect(service.state()).toBe('error');
    expect(service.metrics().length).toBe(0);
    expect(service.activities().length).toBe(0);
    expect(service.unreadCount()).toBe(0);
  });

  it('recarrega com sucesso após erro', async () => {
    service.load('error');
    await flush();

    service.retry();
    await flush();

    expect(service.state()).toBe('success');
    expect(service.activities().length).toBe(3);
  });
});
