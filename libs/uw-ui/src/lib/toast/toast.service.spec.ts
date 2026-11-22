import { TestBed } from '@angular/core/testing';
import { ToastService } from './toast.service';

describe('ToastService', () => {
  let service: ToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToastService);
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  it('deve adicionar toast na fila', () => {
    service.show('Teste', 'info');
    expect(service.toasts().length).toBe(1);
    expect(service.toasts()[0].message).toBe('Teste');
  });

  it('deve remover toast da fila', () => {
    const id = service.show('Teste', 'info');
    service.remove(id);
    expect(service.toasts().length).toBe(0);
  });

  it('deve limpar todos os toasts', () => {
    service.show('Um', 'info');
    service.show('Dois', 'success');
    service.clear();
    expect(service.toasts().length).toBe(0);
  });

  it('não deve ultrapassar 5 toasts visíveis', () => {
    for (let i = 0; i < 7; i++) {
      service.show(`Toast ${i}`, 'info');
    }
    expect(service.toasts().length).toBe(5);
  });

  it('deve remover toast após duration', (done) => {
    jest.useFakeTimers();
    service.show('Rápido', 'info', { duration: 100 });
    expect(service.toasts().length).toBe(1);
    jest.advanceTimersByTime(100);
    expect(service.toasts().length).toBe(0);
    jest.useRealTimers();
    done();
  });
});
