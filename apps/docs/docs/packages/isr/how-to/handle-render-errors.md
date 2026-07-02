---
id: handle-render-errors
title: "Handle render errors"
diataxis_type: how-to
package: isr
legacy_guard: false
sidebar_label: "Handle render errors"
sidebar_position: 4
tags: [isr, guides]
---

# Handle render errors

By default ISR does not cache a page whose server render produced an HTTP error. It falls back to client-side rendering so an error page never gets cached and served to every visitor. This recipe shows how to change that default and how to flag your own non-HTTP errors.

> **Why the default skips caching:** an error render usually contains messages that should not be frozen into the cache. See [How ISR works](../../../concepts/E8-how-isr-works.md) for where the cache decision happens.

## Preconditions

- A working ISR setup with an `ISRHandler` instance.
- For custom errors: a component that renders on the server and can inject [`IsrService`](../reference/api.md#isrservice).

## Steps

1. **Choose whether to cache pages that errored.** The [`skipCachingOnHttpError`](../reference/isr-handler-config.md) flag defaults to `true` (skip caching). Set it to `false` only if you deliberately want error responses cached.

   ```typescript title="server.ts"
   const isr = new ISRHandler({
     // ...other config
     skipCachingOnHttpError: false,
   });
   ```

   :::caution
   Caching error responses can serve broken content to every visitor. Only disable the skip if you handle those errors so the page stays functional.
   :::

2. **Flag your own errors** for cases HTTP status codes don't cover, such as a page that rendered successfully but has no content. Inject `IsrService` and call [`addError`](../reference/api.md#isrserviceinterface); a page with a recorded error is not cached and falls back to client-side rendering.

   ```typescript title="posts.component.ts"
   import { Component, inject } from '@angular/core';
   import { IsrService } from '@rx-angular/isr/browser';

   @Component({
     selector: 'app-posts',
     standalone: true,
     template: '',
   })
   export class PostsComponent {
     private readonly isrService = inject(IsrService);
     private readonly postsService = inject(PostsService);

     loadPosts(): void {
       this.postsService.getPosts().subscribe((posts) => {
         if (posts.length === 0) {
           this.isrService.addError({
             name: 'No posts',
             message: 'There are no posts to show',
           } as Error);
         }
       });
     }
   }
   ```

## Result

Pages that error during the server render are not cached and fall back to client-side rendering, unless you opted in via `skipCachingOnHttpError: false`. Pages you flag with `addError` are treated the same way. You can inspect recorded errors in the `errors` property embedded in the generated HTML.

## See also

- Reference: [`skipCachingOnHttpError`](../reference/isr-handler-config.md) field on `ISRHandlerConfig`
- Reference: [`IsrService.addError`](../reference/api.md#isrserviceinterface) · [`IsrState`](../reference/api.md#isrstate)
