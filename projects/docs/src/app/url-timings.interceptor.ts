import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxIsrService } from 'ngx-isr/browser';
import { tap } from 'rxjs';

export const urlTimingInterceptor: HttpInterceptorFn = (
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const ngxIsrService = inject(NgxIsrService);

  const timing1 = performance.now();
  return next(request).pipe(
    tap(() => {
      const timing2 = performance.now();
      const currentExtra = ngxIsrService.getExtra();
      const currentRequestsTimings = currentExtra['requestsTimings'] || [];

      const currentUrlTiming = {
        url: request.url,
        timing: (timing2 - timing1).toFixed(2) + 'ms',
      };

      if (currentRequestsTimings.find(t => t.url === request.url)) {
        ngxIsrService.addExtra({
          requestsTimings: currentRequestsTimings.map(t =>
            t.url === request.url ? currentUrlTiming : t
          ),
        });
      } else {
        ngxIsrService.addExtra({
          requestsTimings: [...currentRequestsTimings, currentUrlTiming],
        });
      }
    })
  );
};
