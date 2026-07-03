# @rx-angular/speculative-link

An Angular implementation of the [Speculation Rules API](https://developer.mozilla.org/en-US/docs/Web/API/Speculation_Rules_API) inspired by [quicklink](https://github.com/GoogleChromeLabs/quicklink) and [ngx-quicklink](https://github.com/mgechev/ngx-quicklink).

> **IMPORTANT**
> This library is currently in **developer preview**. Expect changes to the underlying implementation and its APIs.

## Motivation

In Single Page Applications (SPAs), subsequent navigations are handled client-side without full page reloads. While this is faster than traditional multi-page apps, fetching the JavaScript chunks for the new route and making the necessary API calls still takes time, leading to noticeable delays.

Recently, the Chrome team introduced the **[Soft Navigations API](https://developer.chrome.com/docs/web-platform/soft-navigations-experiment)** to accurately measure perceived performance during these client-side transitions. Consequently, the **Largest Contentful Paint (LCP)** metric is now measured for these "soft navigations" (Soft-Nav LCP). If a user clicks a link and waits for chunks and data to load before the next view renders, your Soft-Nav LCP will suffer.

This library aims to make those navigations **instant** by proactively loading everything required for the next route _before_ the user even clicks, drastically improving your Soft-Nav LCP and the overall perceived performance.

## How it works

Inspired by Google Chrome Labs' `quicklink`, `@rx-angular/speculative-link` speeds up future navigations by prefetching resources for links that are visible to the user.

Under the hood, it uses an `IntersectionObserver` to identify which `[speculativeLink]` elements are currently in the viewport, representing potential future navigations.

When a link enters the viewport, the library automatically:

1. **Preloads the JavaScript**: It triggers Angular's `PreloadingStrategy` to fetch the associated lazy-loaded route chunk.
2. **Prefetches the Data**: It identifies any custom `preResolve` functions attached to the route configuration and executes them, allowing you to prefetch API data.

By the time the user clicks the link, the JavaScript is already parsed and the data is already in the cache. This results in an instant soft navigation and an optimal Soft-Nav LCP score.

## Installation

```bash
npm install @rx-angular/speculative-link
```

Or using yarn or pnpm:

```bash
yarn add @rx-angular/speculative-link
# or
pnpm add @rx-angular/speculative-link
```

## Getting Started

### 1. Configure the Router

Provide the Speculative Link Preloading Strategy to the Angular router when bootstrapping your application.

```ts
import { provideRouter } from '@angular/router';
import { withSpeculativeLinkPreloading } from '@rx-angular/speculative-link';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      appRoutes,
      withSpeculativeLinkPreloading(), // <-- Add this to enable speculative preloading
    ),
  ],
};
```

### 2. Use the Directive

Add the `speculativeLink` directive to your links. Pass the target route path as the input.

```html
<!-- Static routes -->
<a href="/dashboard" speculativeLink="/dashboard">Dashboard</a>

<!-- Dynamic routes -->
<a [href]="'/event/' + eventId" [speculativeLink]="'/event/' + eventId">View Event</a>
```

### 3. Add `preResolve` to your Routes (Optional)

You can attach custom logic that runs as soon as a link pointing to the route enters the viewport. This is extremely useful for prefetching API data.

The `preResolve` function receives an object containing the route's `data` and matched `params`. It runs in the route's injection context, meaning you can use the `inject()` function to access services.

```ts
import { Route } from '@angular/router';
import { inject } from '@angular/core';

export const routes: Route[] = [
  {
    path: 'event/:id',
    loadComponent: () => import('./event.component').then((m) => m.EventComponent),
    data: {
      preResolve: ({ params, data }) => {
        // This executes as soon as an <a [speculativeLink]="'/event/123'"> enters the viewport!
        const eventService = inject(EventService);
        const eventId = params['id'];

        // Example: Prefetch the data.
        // Note: Your service should cache this request so the actual
        // EventComponent can instantly access the prefetched data when the user navigates.
        eventService.preloadEvent(eventId);
      },
    },
  },
];
```

## Known Limitations

- **Route Guards**: Guards (`canActivate`, `canActivateChild`, `canLoad`, `canMatch`) are **not** supported during preloading and pre-resolving. This means that if a route is protected by a guard (e.g., authentication), the `preResolve` function will still be executed when the link enters the viewport. Be careful to ensure that your pre-resolving logic does not trigger unwanted side-effects or unauthorized requests.
