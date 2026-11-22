export interface AppErrorDetail {
  readonly field?: string;
  readonly message: string;
  readonly code?: string;
}

export interface AppError {
  readonly status: number;
  readonly code: string;
  readonly message: string;
  readonly traceId?: string;
  readonly details?: readonly AppErrorDetail[];
}

export function toAppError(error: unknown): AppError {
  if (isAppError(error)) {
    return error;
  }

  if (isHttpError(error)) {
    const body = error.error;
    return {
      status: error.status,
      code: typeof body?.error === 'string' ? body.error : `HTTP_${error.status}`,
      message:
        typeof body?.message === 'string'
          ? body.message
          : error.message || 'Não foi possível concluir a operação.',
      traceId: typeof body?.traceId === 'string' ? body.traceId : undefined,
      details: Array.isArray(body?.details) ? body.details : undefined,
    };
  }

  return {
    status: 0,
    code: 'UNKNOWN_ERROR',
    message: error instanceof Error ? error.message : 'Erro inesperado.',
  };
}

function isAppError(value: unknown): value is AppError {
  return (
    typeof value === 'object' &&
    value !== null &&
    'status' in value &&
    'code' in value &&
    'message' in value
  );
}

function isHttpError(value: unknown): value is {
  status: number;
  message?: string;
  error?: { error?: unknown; message?: unknown; traceId?: unknown; details?: unknown };
} {
  return typeof value === 'object' && value !== null && 'status' in value;
}
