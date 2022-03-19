# Angular Incremental Static Regeneration [Stackblitz](https://stackblitz.com/edit/node-cvlod6?file=server.ts)
This project tries to add a way to generate static pages in runtime and also gives an api to invalidate cached pages.

## How it works?
- [Explanation video](https://vimeo.com/687530247) (w/o voice)

The first time a user opens a pages, we server-side render that page, and save its result in cache.

Next time when a user requests the same page he will be served the first cached response.

If we want to invalidate the cache for a specific page we need to do a get request like this:
```bash
curl /api/invalidate?secret=MY_TOKEN&urlToInvalidate=/one
```

**CacheHandler** has two implementations:
- InMemory Cache
- FileSystem Cache (for the moment its in broken state)

## How to use it?
To handle Incremental Static Regeneration, we need to configure it from our route data.

For example:
```ts
const routes: Routes = [
  {
    path: "one",
    component: PageOneComponent,
  },
  {
    path: "two",
    component: PageTwoComponent,
    data: { revalidate: 5 },
  },
  {
    path: "three",
    component: PageThreeComponent,
    data: { revalidate: 0 },
  },
];
```

- Path `/one` won't be cached at all, and everytime it is requested it will be server-rendered and then will be served to the user.

- Path `/two` on the first request will be server-rendered and then will be cached. On the second request to it, the user will be served the cache that we got on the first request.
But, now we will start a timer, in order to re-generate the cache after `5` seconds.
On the third request to the same url, if the timer was finished before the third request, the user would be served with the new regenerated page that exists on cache. If the timer was not finished, the user would be served with the cached page of the first request.

- Path `/three` after the first request that is server-rendered, the page will be added to cache and the cache will never be deleted automatically as in path `/two`. So after the first request, all the other ones will come from the cache.

## Stackblitz info
- Open the [link](https://stackblitz.com/edit/node-cvlod6?file=server.ts)
- Wait until the dependecies are installed and the app is started.
- Open pages by clicking on the links: one, two, three.
- Check the time on each page, page one will change on every refresh, page two will change every 5 seconds, page three will only show the cache after the first refresh
- After you change the pages, you can see the logs on the console in stackblitz for what's happening.

## What's next?
- Add example with transfer state
- Add create cache at production build
- Add Redis implementation to handle cache
- Check-out what can be done with hybrid-rendering (using cached pages as prerendered ones)
- Add an api to invalidate (regenerate) multiple pages at once (using post request with urls in body)

# NgxIsr

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
