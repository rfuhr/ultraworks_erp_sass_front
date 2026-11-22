import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import type { SessionUser } from '@app/core';

export interface LoginCredentials {
  readonly email: string;
  readonly password: string;
}

/**
 * Contrato de autenticação consumido pela feature de login. O mock de
 * demonstração pode ser trocado por um repositório HTTP no provider da rota,
 * conforme ADR-0016.
 */
export interface LoginRepository {
  login(credentials: LoginCredentials): Observable<SessionUser>;
}

export const LOGIN_REPOSITORY = new InjectionToken<LoginRepository>('LOGIN_REPOSITORY');
