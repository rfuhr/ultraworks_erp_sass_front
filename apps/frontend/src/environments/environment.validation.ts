import type { AppEnvironment } from './environment.model';

/**
 * Falha cedo quando a configuração do ambiente está incompleta.
 * A mensagem é explícita para facilitar o diagnóstico no build ou no deploy.
 */
export function validateEnvironment(
  environment: Partial<AppEnvironment>,
): asserts environment is AppEnvironment {
  if (!environment.name) {
    throw new Error('[config] O nome do ambiente não foi definido.');
  }

  if (!environment.apiUrl) {
    throw new Error(`[config] apiUrl não foi definida para o ambiente "${environment.name}".`);
  }

  if (!/^https?:\/\//i.test(environment.apiUrl)) {
    throw new Error(
      `[config] apiUrl deve começar com http:// ou https:// (recebido: "${environment.apiUrl}").`,
    );
  }
}
