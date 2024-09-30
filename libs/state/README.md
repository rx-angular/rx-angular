# @rx-angular/state

[![npm](https://img.shields.io/npm/v/%40rx-angular%2Fstate.svg)](https://www.npmjs.com/package/%40rx-angular%2Fstate)
[![npm](https://img.shields.io/npm/dt/%40rx-angular%2Fstate.svg)](https://www.npmjs.com/package/%40rx-angular%2Fstate)
![rx-angular CI](https://github.com/rx-angular/rx-angular/workflows/rx-angular%20CI/badge.svg?branch=main)
[![codecov](https://codecov.io/gh/rx-angular/rx-angular/branch/main/graph/badge.svg?token=Jxy4xLJSs1&flag=state)](https://codecov.io/gh/rx-angular/rx-angular)

![state logo](https://raw.githubusercontent.com/rx-angular/rx-angular/main/libs/state/docs/images/state_logo.png)

## Description

`@rx-angular/state` is a library designed to help developers effectively manage component-level state in Angular.
It offers a lightweight and intuitive API and automatic subscription handling, making it a perfect solution for handling state in any Angular component, service or directive.
This library offers unique features such as merging global state into local state, shared state selections, subscription-free interaction, and integration with imperative functions like component lifecycle and HostBindings.
It is an ideal alternative or complimentary library to global state management solutions like Akita, NgRx, and NgXs.

### Key features

- ⚡️ Fully reactive
- 🛡️ Strongly typed
- 🚀 Highly performant

### Introduction Video

[![intro-video_rx-angular--state-rx-state](https://user-images.githubusercontent.com/10064416/147395467-876ec499-645f-4f84-bde9-9bffaac22c62.PNG)](https://www.youtube.com/watch?v=CcQYj4V2IKw)

## Installation

```
npm install @rx-angular/state
```

## Usage

### Functional Creation (NEW)

The new functional creation API lets you create and configure `RxState` in only one place.

```ts
import { rxState } from '@rx-angular/state';
import { RxFor } from '@rx-angular/template/for';

@Component({
  template: `<movie *rxFor="let movie of movies$" [movie]="movie" />`,
  imports: [RxFor],
})
export class MovieListComponent {
  private movieResource = inject(MovieResource);

  private state = rxState<{ movies: Movie[] }>(({ set, connect }) => {
    // set initial state
    set({ movies: [] });
    // connect data source to state
    connect('movies', this.movieResource.fetchMovies());
  });

  // select a property for the template to consume as an observable
  movies$ = this.state.select('movies');
  // select a property for the template to consume as a signal
  movies = this.state.signal('movies');
}
```

The functional approach will be the new default approach for newer versions.

Read the [Migration Guide](https://rx-angular.io/docs/state/getting-started#migrate-to-new-functional-api) for a migration guide explaining how to upgrade your codebase to the new API.

### Class Based

Local Provider: Use RxState as a local provider in your component to make use of Angular's Dependency Injection.

With the new `inject` method:

```ts
@Component({
  /*...*/
  providers: [RxState],
})
export class RxStateInjectionComponent {
  private state: RxState<{ foo: string }> = inject(RxState);

  state$ = this.state.select();
}
```

With constructor based injection:

```ts
@Component({
  /*...*/
  providers: [RxState],
})
export class RxStateInjectionComponent {
  state$ = this.state.select();

  constructor(private state: RxState<{ foo: string }>) {}
}
```

Inheritance: Use RxState by extending it in your component.

```ts
@Component({
  /*...*/
})
export class RxStateInheritanceClass extends RxState<{ foo: string }> {
  value$ = this.select();
}
```

- [📄 Detailed Usage Documentation](https://rx-angular.io/docs/state/setup)
- [🧪 Extensive Testing Guide](https://www.rx-angular.io/docs/state/testing)

## API overview

With `@rx-angular/state`, you can easily manage your component state with a range of powerful methods. You can find a detailed API documentation [here](https://rx-angular.io/docs/state/api).

## Addons

The following complimentary tools are recommended for use with RxState to improve the development experience and optimize application performance.

### [🚀 @rx-angular/template](https://www.rx-angular.io/docs/template)

Reduce the amount of boilerplate code required in templates and bring rendering performance to next level.

### [⚒️ @rx-angular/state/effects](https://rx-angular.io/docs/state/effects)

Reactively handle side effects, forget about the `subscribe` API and potential memory leaks.

### [📡 @rx-angular/state/actions](https://rx-angular.io/docs/state/actions)

Create composable action streams for user interaction and backend communication with a minimal memory footprint.

### [✨ @rx-angular/cdk/transformations](https://www.rx-angular.io/docs/cdk/api/transformation-helpers)

Simplify data structures management. Create, modify, convert arrays and objects with ease.

### [🔬 @rx-angular/eslint-plugin](https://www.rx-angular.io/docs/eslint-plugin)

Enforce best practices for building reactive, performant, and Zone-less Angular applications.

### [🧩 Selections](https://www.rx-angular.io/docs/state/api/rxjs-operators)

Optimize state selections and data transfer, ensure only the necessary data is transferred.

## Version Compatibility

| RxAngular | Angular    |
|-----------|------------|
| `^18.0.0` | `^18.0.0`  |
| `^17.0.0` | `^17.0.0`  |
| `^16.0.0` | `^16.0.0`  |
| `^15.0.0` | `^15.0.0`  |
| `^14.0.0` | `^14.0.0`  |
| `^2.0.0`  | `>=13.0.0` |
| `^1.0.0`  | `>=12.0.0` |

Regarding the compatibility with RxJS, we generally stick to the compatibilities of the Angular framework itself, for more information about the compatibilities of Angular itself see the [official guide](https://angular.dev/reference/versions).

## Contribution

If you want to contribute to this project, please follow [our guideline](https://github.com/rx-angular/rx-angular/blob/main/CONTRIBUTING.md).

## Additional materials

- [💾 Research on Reactive Ephemeral State](https://dev.to/rxjs/research-on-reactive-ephemeral-state-in-component-oriented-frameworks-38lk)
- [📜 Design Documents](https://hackmd.io/wVkWRc3XQWmtM6YcktRTrA)
- [✍️Tutorials](https://www.rx-angular.io/docs/state/tutorials/basic-tutorial/setup)
- [🍳 Recipes](https://rx-angular.io/docs/state/recipes/use-rxstate-as-global-state)
- [💻Counter Demo](https://stackblitz.com/edit/rx-angular-state-counter-demo?file=src%2Fapp%2Fcounter%2Fcounter.component.ts)
- [🎥 Tackling Component State Reactively (Live Demo at 24:47)](https://www.youtube.com/watch?v=I8uaHMs8rw0)
- [🎥 Extending Angular for the Reactive Web](https://youtu.be/pkN6CeZ8h_U?t=5913)
- [🎥 Michael explains rx-state to webdave_de (Livestream, German)](https://youtu.be/cKUFcY8QkYM)

### OSS Example Applications

- [‍💻 Fully-reactive Zone-Less Angular/Ionic Progressive Web Application](https://startrack-ng.web.app/search) - [Mike Hartington](https://twitter.com/mhartington)
- [‍💻 High performant zone-Less Angular Progressive Web Application](https://angular-movies-a12d3.web.app/list/category/popular) - [TasteJS](https://github.com/tastejs/angular-movies)
- [‍💻 Zone-Less Angular Application - Tour of heroes](https://github.com/BioPhoton/tour-of-heroes) - [Michael_Hladky](https://twitter.com/Michael_Hladky)
- [‍💻 Zone-Less Todo MVC](https://github.com/edbzn/rx-angular-todo-mvc) - [Edouard Bozon](https://twitter.com/edbzn)
