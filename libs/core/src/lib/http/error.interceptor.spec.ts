import { HttpErrorResponse, HttpRequest, HttpResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { firstValueFrom, of, throwError } from 'rxjs';
import { errorInterceptor } from './error.interceptor';

describe('errorInterceptor', () => {
  const request = new HttpRequest('GET', '/exemplo');

  it('repassa respostas bem-sucedidas', async () => {
    const response = new HttpResponse({ status: 200, body: { ok: true } });
    const next = jest.fn(() => of(response));

    const result = await firstValueFrom(
      TestBed.runInInjectionContext(() => errorInterceptor(request, next)),
    );

    expect(result).toBe(response);
  });

  it('normaliza falhas HTTP em AppError', async () => {
    const failure = new HttpErrorResponse({
      status: 422,
      error: { error: 'VALIDATION_ERROR', message: 'Erro de validação' },
    });
    const next = jest.fn(() => throwError(() => failure));

    await expect(
      firstValueFrom(TestBed.runInInjectionContext(() => errorInterceptor(request, next))),
    ).rejects.toMatchObject({
      status: 422,
      code: 'VALIDATION_ERROR',
      message: 'Erro de validação',
    });
  });
});
