---
sidebar_label: Extra
sidebar_position: 9
title: Extra
---

## Extra (Why We Built This?)

The main reason why we added **Extra** is because we wanted to store extra data in the cache. For example, we wanted to store the total time an API request took to respond. This way we can calculate how much time we saved by serving the page from cache.

Let's take a look at the following example:

```ts title="url-timings.interceptor.ts"
import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Injectable, Provider } from '@angular/core';
import { IsrService } from '@rx-angular/isr';
import { tap } from 'rxjs';

@Injectable()
export class UrlTimingsInterceptor implements HttpInterceptor {
  constructor(private isrService: IsrService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler) {
    let timing1 = performance.now();
    return next.handle(request).pipe(
      tap(() => {
        let timing2 = performance.now();

        const currentExtra = this.isrService.getExtra();

        const currentRequestsTimings = currentExtra['requestsTimings'] || [];

        const currentUrlTiming = {
          url: request.url,
          timing: (timing2 - timing1).toFixed(2) + 'ms',
        };

        if (currentRequestsTimings.find((t) => t.url === request.url)) {
          this.isrService.addExtra({
            requestsTimings: currentRequestsTimings.map((t) =>
              t.url === request.url ? currentUrlTiming : t
            ),
          });
        } else {
          this.isrService.addExtra({
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
```

In this example, we created an interceptor that calculates the time it takes for an API request to respond. Then, we store this data in the cache using the `addExtra` method.

Now we need to register this interceptor in our app server module:

```ts title="app.server.module.ts"
import { HTTP_URL_TIMINGS_INTERCEPTOR_ISR } from './url-timings.interceptor';

@NgModule({
  ...
  providers: [HTTP_URL_TIMINGS_INTERCEPTOR_ISR] // --> Add provider here for the interceptor
})
export class AppServerModule {}
```

Now, we can run our app and see the results:

![Extra data in isr cache](pathname:///img/isr/extra.png)
