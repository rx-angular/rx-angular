import type { Provider } from '@angular/core';
import { Injectable } from '@angular/core';
import type {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import type { Observable } from 'rxjs';
import { catchError, throwError } from 'rxjs';
import type { IsrService } from '@rx-angular/isr/browser';

@Injectable()
export class HttpErrorsInterceptor implements HttpInterceptor {
  constructor(private isrService: IsrService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err) => {
        this.isrService.addError(err);
        return throwError(() => err);
      })
    );
  }
}

export const HTTP_ERROR_PROVIDER_ISR: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: HttpErrorsInterceptor,
  multi: true,
};
