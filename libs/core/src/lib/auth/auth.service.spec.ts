import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('deve iniciar sem sessão', () => {
    expect(service.session()).toBeNull();
    expect(service.isAuthenticated()).toBe(false);
  });

  it('deve definir e limpar a sessão', () => {
    service.setSession({ id: '1', name: 'Ana', email: 'ana@example.com' });

    expect(service.isAuthenticated()).toBe(true);
    expect(service.session()?.name).toBe('Ana');

    service.clearSession();

    expect(service.session()).toBeNull();
    expect(service.isAuthenticated()).toBe(false);
  });
});
