---
sidebar_label: Error Handling
sidebar_position: 4
title: Error Handling
---

## How it works?

Errors are a part of web development. They can happen at any time, and they can be caused by a
variety of factors. When an error occurs, it's important to handle it appropriately to ensure
that your site remains accessible and functional. ISR has a feature that allows you to handle
errors during the regeneration or caching of your pages.

By default, when an **http error** occurs during the server-rendering of a page, we don't
cache the page but fall back to client-side rendering, because it probably will have error
messages or other content that is not intended to be cached.

## Configure error handling

To configure error handling, you can use the **skipCachingOnHttpError** flag in the ISR
configuration. By default, this flag is set to **true**.

In order to enable caching of pages with http errors, you should set this flag to **false**.

```typescript
const isr = new ISRHandler({
  // other options
  skipCachingOnHttpError: false,
});
```

> Warning!
> Be aware that this may cause some issues with your site. And you should handle these
> errors appropriately to ensure that your site remains accessible and functional.

In, order to see if the page has an error, you can check the errors property in the generated
html. Here's an example of a page with an error:

<img src="img/isr/errors-in-html.png" alt="ISR state of a page with an error" />

## Handle other errors

You can also handle other errors that are not http errors. For example, if you have a posts
page, but with no content, you can add an error the **errors** of the ISR state.

In order to do that, you can use the **addError** method of the **NgxIsrService**.

```typescript
import { NgxIsrService } from 'ngx-isr/browser';

@Component({})
export class PostSComponent {
  private isrService = inject(NgxIsrService);

  loadPosts() {
    this.otherService.getPosts().subscribe({
      next: (posts) => {
        if (posts.length === 0) {
          this.isrService.addError({
            name: 'No posts',
            message: 'There are no posts to show',
          } as Error);
        }

        // other logic
      },
    });
  }
}
```

So, if we have a page with no posts, by adding the error to the **errors** property, we
will be able to skip the caching of the page and fall back to client-side rendering.

> Benefits:
> You can use this feature to handle errors, or you can use it only to skip caching of
> pages.
