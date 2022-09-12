# @rx-angular/state

[![npm](https://img.shields.io/npm/v/%40rx-angular%2Fstate.svg)](https://www.npmjs.com/package/%40rx-angular%2Fstate)
![rx-angular CI](https://github.com/rx-angular/rx-angular/workflows/rx-angular%20CI/badge.svg?branch=main)
[![Coverage Status](https://raw.githubusercontent.com/rx-angular/rx-angular/github-pages/docs/test-coverage/state/jest-coverage-badge.svg)](https://rx-angular.github.io/rx-angular/test-coverage/state/lcov-report/index.html)

## Reactive Component State for Angular

RxState is a lightweight, flexible, strongly typed and tested tool dedicated to reduce the complexity of managing component state in Angular.

![state logo](https://raw.githubusercontent.com/rx-angular/rx-angular/main/libs/state/docs/images/state_logo.png)

## Sub Modules

- [🧩 Selections](https://github.com/rx-angular/rx-angular/blob/main/libs/state/selections/README.md)
- [☁ Effects](https://github.com/rx-angular/rx-angular/blob/main/libs/state/effects/README.md)
- [? Actions](https://github.com/rx-angular/rx-angular/blob/main/libs/state/actions/README.md)

## Intro Video

<a target="_blank" href="https://www.youtube.com/watch?v=CcQYj4V2IKw">![intro-video_rx-angular--state-rx-state](https://user-images.githubusercontent.com/10064416/147395467-876ec499-645f-4f84-bde9-9bffaac22c62.PNG)</a>


## Description

Developing modern, **reactive** user interfaces imposes a variety of challenging tasks. Naming some of those:

- reacting to events from different sources
- transforming and composing state
- handling state lifetime
- handling subscriptions

There are plenty of solutions available for managing these challenges on a **global level** (Akita, NgRx, NgXs, ...).
None of them is dedicated to targeting the particular needs of the **component level**.

`@rx-angular/state` was specifically designed to give developers a tool for mastering **component state** without forcing
them to use complex design patterns.

Its lightweight and intuitive API and the automatic subscription handling makes `@rx-angular/state`
the **perfect fit** for handling state in any Angular component.

Using this library allows you to implement things like:

- merge global into local state
- shared state selections
- subscription-less interaction
- hook into imperative functions (e.g. component lifecycle or HostBindings)

with very little effort in any component.

<p float="left">
  <img src="https://raw.githubusercontent.com/rx-angular/rx-angular/main/libs/state/docs/images/state_API-names.png" width="49%" />
  <img src="https://raw.githubusercontent.com/rx-angular/rx-angular/main/libs/state/docs/images/state_API-types.png" width="49%" />
</p>

## Key features

- Slim and intuitive API
- Automated subscription handling
- Intuitive way for handling ViewModels
- Connect any Observable source to the state
- Partial state updates
- Reactive state selection
- Lazy state (no BehaviourSubject)
- Foundation for zone-less Angular applications

## Install

```bash
npm install --save @rx-angular/state
# or
yarn add @rx-angular/state
```

## Update

If you are using `@rx-angular/state` already, please consider upgrading with the `@angular/cli update` command in order
to make sure all provided code migrations are processed properly.

```bash
ng update @rx-angular/state
# or with nx
nx migrate @rx-angular/state
```

## Usage

[Usage Documentation](https://github.com/rx-angular/rx-angular/tree/main/libs/state/docs/usage.md)

## Testing

[Testing](https://github.com/rx-angular/rx-angular/tree/main/libs/state/docs/testing.md)

## API

[API Documentation](https://github.com/rx-angular/rx-angular/tree/main/libs/state/docs/api/overview.md)

## Tutorials

- [Basic Tutorial](https://github.com/rx-angular/rx-angular/tree/main/apps/demos/src/app/features/tutorials/basics)
- [Counter - StackBlitz](https://stackblitz.com/edit/rx-angular-state-counter-demo?file=src%2Fapp%2Fcounter%2Fcounter.component.ts)

## Snippets

- [Logic comparison - Increment a Value](https://github.com/rx-angular/rx-angular/tree/main/libs/state/docs/snippets/logic-comparison--increment-a-value.md)
- [Loading state and data fetching](https://github.com/rx-angular/rx-angular/tree/main/libs/state/docs/snippets/loading-state-and-data-fetching.md)
- [Passing Observables directly](https://github.com/rx-angular/rx-angular/tree/main/libs/state/docs/snippets/passing-observables-directly.md)
- [How to run partial state updates](https://github.com/rx-angular/rx-angular/tree/main/libs/state/docs/snippets/how-can-i-run-partial-state-updates.md)
- [Get nested state slices](https://github.com/rx-angular/rx-angular/tree/main/libs/state/docs/snippets/get-nested-state-slices.md)
- [Deriving simple state](https://github.com/rx-angular/rx-angular/tree/main/libs/state/docs/snippets/deriving-simple-state.md)
- [Composing state using NgRx selectors](https://github.com/rx-angular/rx-angular/tree/main/libs/state/docs/snippets/composing-state-using-ngrx-selectors.md)
- [Manage entities using NgRx entity adapter](https://github.com/rx-angular/rx-angular/tree/main/libs/state/docs/snippets/manage-collections-with-ngrx-entity.md)
- [BehaviorSubject vs RxState](https://github.com/rx-angular/rx-angular/tree/main/libs/state/docs/snippets/behavior-subject-vs-rx-state.md)
- [Managing ViewModels with selectSlice](https://github.com/rx-angular/rx-angular/tree/main/libs/state/docs/snippets/selecting-the-viewmodel.md)
- [Manage reactive HostBindings](https://github.com/rx-angular/rx-angular/tree/main/libs/state/docs/snippets/hostbindings.md)
- [Difference between Global and Local state](https://github.com/rx-angular/rx-angular/tree/main/libs/state/docs/snippets/global-state-vs-local-state.md)
- [Using RxState as Global State](https://github.com/rx-angular/rx-angular/blob/main/libs/state/docs/snippets/manage-global-state.md)

## Videos

<a target="_blank" href="https://www.youtube.com/watch?v=CcQYj4V2IKw">![intro-video_rx-angular--state-rx-state](https://user-images.githubusercontent.com/10064416/147395467-876ec499-645f-4f84-bde9-9bffaac22c62.PNG)_🎥 RxAngular State, The Component Reactive Store | Marmicode Tasting Session_</a>

<a target="_blank" href="https://www.youtube.com/watch?v=I8uaHMs8rw0">![tackling-component-state-reactively](https://user-images.githubusercontent.com/10064416/147395866-031704dc-837d-4d1f-82d6-e758e4cb9556.PNG)_🎥 Tackling Component State Reactively (Live Demo at 24:47)_</a>

- [🎥 Extending Angular for the Reactive Web](https://youtu.be/pkN6CeZ8h_U?t=5913)

- [German content | 🎥 Michael explains rx-state to webdave_de (Livestream)](https://youtu.be/cKUFcY8QkYM)

## Blogs/Documents

- [💾 Research on Reactive Ephemeral State](https://dev.to/rxjs/research-on-reactive-ephemeral-state-in-component-oriented-frameworks-38lk)

- [📜 Design Documents](https://hackmd.io/wVkWRc3XQWmtM6YcktRTrA)

## OSS Example Applications

- [📑 Fully-reactive Zone-Less Angular/Ionic Progressive Web Application](https://startrack-ng.web.app/search) - [Mike Hartington](https://twitter.com/mhartington)
- [📑 High performant zone-Less Angular Progressive Web Application](https://angular-movies-a12d3.web.app/list/category/popular) - [TasteJS](https://github.com/tastejs/angular-movies)
- [📑 Zone-Less Angular Application - Tour of heros](https://github.com/BioPhoton/tour-of-heroes) - [Michael_Hladky](https://twitter.com/Michael_Hladky)

## Version Compatibility

| Angular                | RxJS                 | @rx-angular/state |
|------------------------|----------------------|-------------------|
| `14`                   | `^7.4.0`             | `> 1.4.6`         |
| `^12.0.0` or `^13.0.0` | `^6.5.5` or `^7.4.0` | `> 1.4.6`         |
| `^11.0.0`              | `^6.5.5`             | `<= 1.4.6`        |

Regarding the compatibility to RxJs, we generally stick to the compatibilities of the angular framework itself.
All the packages support RxJs versions `^6.5.5` || `^7.4.0`.
For more information about the compatibilities of angular itself see this [gist](https://gist.github.com/LayZeeDK/c822cc812f75bb07b7c55d07ba2719b3) 
