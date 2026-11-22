import { toAppError } from './app-error.model';

describe('toAppError', () => {
  it('deve mapear um HttpErrorResponse para AppError', () => {
    const error = toAppError({
      status: 422,
      message: 'Http failure response',
      error: {
        error: 'VALIDATION_ERROR',
        message: 'Erro de validação',
        traceId: 'trace-1',
        details: [{ field: 'nome', message: 'Nome é obrigatório' }],
      },
    });

    expect(error.status).toBe(422);
    expect(error.code).toBe('VALIDATION_ERROR');
    expect(error.message).toBe('Erro de validação');
    expect(error.traceId).toBe('trace-1');
    expect(error.details).toHaveLength(1);
  });

  it('deve preservar um AppError existente', () => {
    const original = { status: 404, code: 'NOT_FOUND', message: 'Não encontrado' };

    expect(toAppError(original)).toBe(original);
  });

  it('deve lidar com erro desconhecido', () => {
    const error = toAppError(new Error('falha inesperada'));

    expect(error.status).toBe(0);
    expect(error.code).toBe('UNKNOWN_ERROR');
    expect(error.message).toBe('falha inesperada');
  });

  it('deve gerar código HTTP e mensagem padrão quando o corpo não traz detalhes', () => {
    const error = toAppError({ status: 500, message: '', error: null });

    expect(error.code).toBe('HTTP_500');
    expect(error.message).toBe('Não foi possível concluir a operação.');
    expect(error.traceId).toBeUndefined();
    expect(error.details).toBeUndefined();
  });

  it('deve usar mensagem padrão para valor desconhecido que não é Error', () => {
    const error = toAppError('falha');

    expect(error.status).toBe(0);
    expect(error.code).toBe('UNKNOWN_ERROR');
    expect(error.message).toBe('Erro inesperado.');
  });
});
