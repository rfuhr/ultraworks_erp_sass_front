import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { toAppError } from '../errors/app-error.model';

/**
 * Normaliza falhas HTTP em AppError. O produto decide a navegação e o feedback
 * visual na sua própria camada, mantendo a lib/core livre de regras de produto.
 */
export const errorInterceptor: HttpInterceptorFn = (request, next) =>
  next(request).pipe(catchError((error: unknown) => throwError(() => toAppError(error))));
