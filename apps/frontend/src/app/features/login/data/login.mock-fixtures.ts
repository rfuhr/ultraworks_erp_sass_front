import type { SessionUser } from '@app/core';

export const DEMO_CREDENTIALS = {
  email: 'demo@frontend.dev',
  password: 'demo1234',
} as const;

export const DEMO_USER: SessionUser = {
  id: 'demo-user',
  name: 'Ana Souza',
  email: DEMO_CREDENTIALS.email,
  roles: ['admin'],
};

export class InvalidCredentialsError extends Error {
  readonly code = 'AUTH_INVALID_CREDENTIALS';

  constructor() {
    super('Credenciais inválidas.');
    this.name = 'InvalidCredentialsError';
  }
}
