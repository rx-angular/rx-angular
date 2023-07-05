import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Injectable, Provider } from '@angular/core';
import { NgxIsrService } from 'ngx-isr/browser';
import { tap } from 'rxjs';

@Injectable()
export class UrlTimingsInterceptor implements HttpInterceptor {
  constructor(private ngxIsrService: NgxIsrService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler) {
    let timing1 = performance.now();
    return next.handle(request).pipe(
      tap(() => {
        let timing2 = performance.now();

        const currentExtra = this.ngxIsrService.getExtra();

        const currentRequestsTimings = currentExtra['requestsTimings'] || [];

        const currentUrlTiming = {
          url: request.url,
          timing: (timing2 - timing1).toFixed(2) + 'ms',
        };

        if (currentRequestsTimings.find((t) => t.url === request.url)) {
          this.ngxIsrService.addExtra({
            requestsTimings: currentRequestsTimings.map((t) =>
              t.url === request.url ? currentUrlTiming : t
            ),
          });
        } else {
          this.ngxIsrService.addExtra({
            requestsTimings: [...currentRequestsTimings, currentUrlTiming],
          });
        }
      })
    );
  }
}

export const HTTP_URL_TIMINGS_INTERCEPTOR_ISR: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: UrlTimingsInterceptor,
  multi: true,
};
