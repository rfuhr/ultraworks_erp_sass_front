import { firstValueFrom } from 'rxjs';
import { DEMO_USER, InvalidCredentialsError } from './login.mock-fixtures';
import { MockLoginRepository } from './login.mock-repository';

describe('MockLoginRepository', () => {
  let repository: MockLoginRepository;

  beforeEach(() => {
    repository = new MockLoginRepository();
    repository.latencyMs = 0;
  });

  it('autentica as credenciais de demonstração', async () => {
    const user = await firstValueFrom(
      repository.login({ email: ' Demo@Frontend.dev ', password: 'demo1234' }),
    );

    expect(user).toEqual(DEMO_USER);
  });

  it('rejeita credenciais inválidas com erro tipado', async () => {
    await expect(
      firstValueFrom(repository.login({ email: 'demo@frontend.dev', password: 'errada' })),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it('expõe o código de erro esperado', async () => {
    try {
      await firstValueFrom(repository.login({ email: 'outra@conta.dev', password: 'demo1234' }));
      throw new Error('deveria falhar');
    } catch (error) {
      expect((error as InvalidCredentialsError).code).toBe('AUTH_INVALID_CREDENTIALS');
    }
  });
});
