import { computed, Injectable, signal } from '@angular/core';

export interface SessionUser {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly roles?: readonly string[];
}

/**
 * Contrato de sessão do template. A estratégia concreta de autenticação
 * (JWT, cookie, OAuth) é definida na change de produto, conforme ADR-0014.
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly sessionSignal = signal<SessionUser | null>(null);

  readonly session = this.sessionSignal.asReadonly();
  readonly isAuthenticated = computed(() => this.sessionSignal() !== null);

  setSession(session: SessionUser | null): void {
    this.sessionSignal.set(session);
  }

  clearSession(): void {
    this.sessionSignal.set(null);
  }
}
