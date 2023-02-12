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

### Introduction Video

[![intro-video_rx-angular--state-rx-state](https://user-images.githubusercontent.com/10064416/147395467-876ec499-645f-4f84-bde9-9bffaac22c62.PNG)](https://www.youtube.com/watch?v=CcQYj4V2IKw)

## Install and Update

```bash
npm install --save @rx-angular/state
# or
pnpm install --save @rx-angular/state
# or
yarn add @rx-angular/state
```

For those currently using @rx-angular/state, we recommend updating with the @angular/cli update command to ensure a smooth transition and proper processing of all code migrations.
Simply run the following command:

```bash
ng update @rx-angular/state
# or with nx
nx migrate @rx-angular/state
```

## Usage

Local Provider (recommended): Use RxState as a local provider in your component to make use of Angular's Dependency Injection.

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

With `@rx-angular/state`, you can easily manage your component state with a range of powerful methods.
You find a detailed API documentation [here](https://rx-angular.io/docs/state/api).

#### [.connect()](https://www.rx-angular.io/docs/state/api/rx-state#connect)

Link an Observable source to your component state and update it with emitted changes.
With three signatures, this method offers automatic subscription handling,
making it easy to merge the source, update specific properties, or map to a projection function.

#### [.select()](https://www.rx-angular.io/docs/state/api/rx-state#select)

Get a cached, distinct Observable of your state, with options to access single properties, transform single properties, or transform state slices.
With reactive composition support from rxjs, this method gives you complete control over selected data.

#### [.get()](https://www.rx-angular.io/docs/state/api/rx-state#get)

Retrieve your current state in an imperative manner.
Whether you want the entire state or just a part of it, `.get()` makes it easy to access your data,
with the ability to access deeply nested values.

#### [.set()](https://www.rx-angular.io/docs/state/api/rx-state#set)

Easily update one or many properties of your state. Whether you provide a partial state object or a function to calculate the new value,
`.set()` provides two signatures for updating multiple properties or a single property by name.

#### [.hold()](https://www.rx-angular.io/docs/state/api/rx-state#hold)

Manage side-effects of your state with the `.hold()` method, which holds the trigger Observable and executes an optional handler function.
With automatic subscription handling, this method is an effective way to manage side-effects without the hassle.

#### [.setAccumulator()](https://www.rx-angular.io/docs/state/api/rx-state#setaccumulator)

Customize your state accumulation function with `.setAccumulator()`.
Whether you want to update the accumulation logic for deep updates or solve immutability problems, this method is a powerful tool for fine-tuning your state management.

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

| Angular                | RxJS                 | @rx-angular/state |
| ---------------------- | -------------------- | ----------------- |
| `14+`                  | `^7.4.0`             | `> 1.4.6`         |
| `^12.0.0` or `^13.0.0` | `^6.5.5` or `^7.4.0` | `> 1.4.6`         |
| `^11.0.0`              | `^6.5.5`             | `<= 1.4.6`        |

We follow the compatibility of Angular for RxJS in our packages.
The supported RxJS versions are ^6.5.5 or ^7.4.0.
For further details on Angular compatibility, please refer to this [gist](https://gist.github.com/LayZeeDK/c822cc812f75bb07b7c55d07ba2719b3).

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
