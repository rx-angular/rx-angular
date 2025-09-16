import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpHandler,
  HttpHandlerFn,
  HttpInterceptor,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject, Injectable, Provider } from '@angular/core';
import { IsrService } from 'libs/isr/browser/src';
import { catchError, Observable, throwError } from 'rxjs';

export const httpErrorInterceptorISR: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
) => {
  const isrService = inject(IsrService);

  return next(req).pipe(
    catchError((err) => {
      isrService.addError(err);
      return throwError(() => err);
    }),
  );
};

@Injectable()
export class HttpErrorsInterceptor implements HttpInterceptor {
  constructor(private isrService: IsrService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err) => {
        this.isrService.addError(err);
        return throwError(() => err);
      }),
    );
  }
}

export const HTTP_ERROR_PROVIDER_ISR: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: HttpErrorsInterceptor,
  multi: true,
};
