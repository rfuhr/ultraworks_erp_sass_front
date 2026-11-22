import { Injectable } from '@angular/core';
import { defer, delay, Observable, of, throwError } from 'rxjs';
import type { SessionUser } from '@app/core';
import { LoginCredentials, LoginRepository } from './login.repository';
import { DEMO_CREDENTIALS, DEMO_USER, InvalidCredentialsError } from './login.mock-fixtures';

@Injectable()
export class MockLoginRepository implements LoginRepository {
  /** Latência simulada para reproduzir o estado de carregamento. */
  latencyMs = 600;

  login(credentials: LoginCredentials): Observable<SessionUser> {
    return defer(() => {
      const email = credentials.email.trim().toLowerCase();
      const valid = email === DEMO_CREDENTIALS.email && credentials.password === DEMO_CREDENTIALS.password;

      if (!valid) {
        return throwError(() => new InvalidCredentialsError());
      }

      return of(DEMO_USER);
    }).pipe(delay(this.latencyMs));
  }
}
