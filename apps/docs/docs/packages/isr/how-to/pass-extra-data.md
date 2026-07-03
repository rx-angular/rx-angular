---
id: pass-extra-data
title: 'Pass extra data into the cache'
diataxis_type: how-to
package: isr
legacy_guard: false
sidebar_label: 'Pass extra data'
sidebar_position: 7
tags: [isr, guides]
---

# Pass extra data into the cache

ISR can store arbitrary extra data alongside a cached page, for example how long the API requests behind that page took, so you can show how much time serving from cache saved. You write to the bag with [`IsrService.addExtra`](../reference/api.md#isrserviceinterface) and read it back with [`getExtra`](../reference/api.md#isrserviceinterface).

> **Why this exists:** see the extra-data rationale in [How ISR works](../../../concepts/E8-how-isr-works.md).

## Preconditions

- A working ISR setup rendering on `@angular/ssr`.
- `provideHttpClient` in your application config so you can register a functional interceptor.

## Steps

1. **Write a functional interceptor** (`HttpInterceptorFn`) that times each request and records the result via `addExtra`. Inject `IsrService` with `inject()` inside the interceptor.

   ```typescript title="url-timings.interceptor.ts"
   import { HttpInterceptorFn } from '@angular/common/http';
   import { inject } from '@angular/core';
   import { IsrService } from '@rx-angular/isr';
   import { tap } from 'rxjs';

   export const urlTimingsInterceptor: HttpInterceptorFn = (req, next) => {
     const isrService = inject(IsrService);
     const start = performance.now();

     return next(req).pipe(
       tap(() => {
         const timing = {
           url: req.url,
           timing: (performance.now() - start).toFixed(2) + 'ms',
         };

         const currentTimings = (isrService.getExtra()['requestsTimings'] as (typeof timing)[]) ?? [];

         const exists = currentTimings.some((t) => t.url === req.url);
         isrService.addExtra({
           requestsTimings: exists ? currentTimings.map((t) => (t.url === req.url ? timing : t)) : [...currentTimings, timing],
         });
       }),
     );
   };
   ```

2. **Register the interceptor** with `withInterceptors` in your application config: no `HTTP_INTERCEPTORS` token, no NgModule.

   ```typescript title="app.config.ts"
   import { ApplicationConfig } from '@angular/core';
   import { provideHttpClient, withInterceptors } from '@angular/common/http';
   import { urlTimingsInterceptor } from './url-timings.interceptor';

   export const appConfig: ApplicationConfig = {
     providers: [provideHttpClient(withInterceptors([urlTimingsInterceptor]))],
   };
   ```

## Result

Each server-side API request is timed and its duration is stored in the ISR extra bag, embedded into the cached page. On later cache hits you can read `requestsTimings` back via `getExtra()` to report the time saved by serving from cache.

## See also

- Reference: [`IsrService.addExtra` / `getExtra`](../reference/api.md#isrserviceinterface) · [`IsrState`](../reference/api.md#isrstate)
