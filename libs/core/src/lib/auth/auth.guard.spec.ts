import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, provideRouter } from '@angular/router';
import { AuthService } from './auth.service';
import { authGuard } from './auth.guard';

describe('authGuard', () => {
  let auth: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
    auth = TestBed.inject(AuthService);
  });

  function runGuard(): boolean | UrlTree {
    return TestBed.runInInjectionContext(() =>
      authGuard(
        { url: '/' } as unknown as ActivatedRouteSnapshot,
        { url: '/' } as unknown as RouterStateSnapshot,
      ),
    ) as boolean | UrlTree;
  }

  it('permite a rota quando existe sessão', () => {
    auth.setSession({ id: '1', name: 'Ana', email: 'ana@example.com' });

    expect(runGuard()).toBe(true);
  });

  it('redireciona para o login quando não existe sessão', () => {
    const result = runGuard();

    expect(result).toBeInstanceOf(UrlTree);
    expect((result as UrlTree).toString()).toBe('/login');
  });
});
