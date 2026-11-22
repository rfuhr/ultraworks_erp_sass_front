import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { provideTranslateService } from '@ngx-translate/core';
import { NEVER, Observable, of, throwError } from 'rxjs';
import { AuthService } from '@app/core';
import { ToastService } from '@app/uw-ui';
import { DEMO_USER } from '../data/login.mock-fixtures';
import { LoginCredentials, LoginRepository, LOGIN_REPOSITORY } from '../data/login.repository';
import { LoginPageComponent } from './login-page.component';

describe('LoginPageComponent', () => {
  let fixture: ComponentFixture<LoginPageComponent>;
  let component: LoginPageComponent;
  let auth: AuthService;
  let router: Router;
  let loginMock: jest.Mock<Observable<unknown>, [LoginCredentials]>;

  beforeEach(async () => {
    loginMock = jest.fn<Observable<unknown>, [LoginCredentials]>();

    await TestBed.configureTestingModule({
      imports: [LoginPageComponent],
      providers: [
        provideRouter([]),
        provideTranslateService(),
        { provide: LOGIN_REPOSITORY, useValue: { login: loginMock } as LoginRepository },
      ],
    }).compileComponents();

    auth = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    jest.spyOn(router, 'navigateByUrl').mockResolvedValue(true);
  });

  function createComponent(): void {
    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }

  function fillValidCredentials(): void {
    component.form.setValue({ email: 'demo@frontend.dev', password: 'demo1234' });
  }

  it('exige os campos obrigatórios', () => {
    createComponent();

    component.onSubmit();
    fixture.detectChanges();

    expect(loginMock).not.toHaveBeenCalled();
    expect(component.emailError()).toBe('login.error.required');
    expect(component.passwordError()).toBe('login.error.required');
  });

  it('valida o formato do e-mail', () => {
    createComponent();
    component.form.setValue({ email: 'email-invalido', password: '123456' });

    component.onSubmit();

    expect(loginMock).not.toHaveBeenCalled();
    expect(component.emailError()).toBe('login.error.email');
  });

  it('valida o tamanho mínimo da senha', () => {
    createComponent();
    component.form.setValue({ email: 'demo@frontend.dev', password: '123' });

    component.onSubmit();

    expect(loginMock).not.toHaveBeenCalled();
    expect(component.passwordError()).toBe('login.error.password');
  });

  it('entra em carregamento e bloqueia envios duplicados', () => {
    loginMock.mockReturnValue(NEVER);
    createComponent();
    fillValidCredentials();

    component.onSubmit();
    component.onSubmit();

    expect(component.loading()).toBe(true);
    expect(loginMock).toHaveBeenCalledTimes(1);
  });

  it('exibe erro de credenciais inválidas', () => {
    loginMock.mockReturnValue(throwError(() => new Error('inválidas')));
    createComponent();
    fillValidCredentials();

    component.onSubmit();
    fixture.detectChanges();

    expect(component.errorMessage()).toBe('login.error.invalid');
    expect(auth.isAuthenticated()).toBe(false);
    expect(router.navigateByUrl).not.toHaveBeenCalled();
  });

  it('autentica, exibe toast e navega para a home', () => {
    loginMock.mockReturnValue(of(DEMO_USER));
    createComponent();
    fillValidCredentials();

    component.onSubmit();
    fixture.detectChanges();

    expect(auth.session()).toEqual(DEMO_USER);
    expect(TestBed.inject(ToastService).toasts().length).toBe(1);
    expect(router.navigateByUrl).toHaveBeenCalledWith('/', { replaceUrl: true });
  });

  it('redireciona usuário já autenticado para a home', () => {
    auth.setSession(DEMO_USER);

    createComponent();

    expect(router.navigateByUrl).toHaveBeenCalledWith('/', { replaceUrl: true });
  });
});
