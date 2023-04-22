import { Injectable, Provider } from '@angular/core';
import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { NgxIsrService } from 'ngx-isr/browser';

@Injectable()
export class HttpErrorsInterceptor implements HttpInterceptor {
  constructor(private ngxIsrService: NgxIsrService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err) => {
        this.ngxIsrService.addError(err);
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
