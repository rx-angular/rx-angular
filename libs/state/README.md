# @rx-angular/state

[![npm](https://img.shields.io/npm/v/%40rx-angular%2Fstate.svg)](https://www.npmjs.com/package/%40rx-angular%2Fstate)
![rx-angular CI](https://github.com/rx-angular/rx-angular/workflows/rx-angular%20CI/badge.svg?branch=main)

> Reactive Component State for Angular

RxState is a lightweight, flexible, strongly typed and tested tool dedicated to reduce the complexity of managing component state in Angular.

![state logo](https://raw.githubusercontent.com/rx-angular/rx-angular/main/libs/state/docs/images/state_logo.png)

## Sub Modules

- [🧩 Selections](https://rx-angular.io/docs/state/selections)
- [☁ Effects](https://rx-angular.io/docs/state/effects)
- [? Actions](https://rx-angular.io/docs/state/actions)

## Intro Video

[![intro-video_rx-angular--state-rx-state](https://user-images.githubusercontent.com/10064416/147395467-876ec499-645f-4f84-bde9-9bffaac22c62.PNG)](https://www.youtube.com/watch?v=CcQYj4V2IKw)

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

Its lightweight and intuitive API and the automatic subscription handling make `@rx-angular/state` the **perfect fit** for handling state in any Angular component.

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
- Lazy state (no BehaviorSubject)
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

[Usage Documentation](https://rx-angular.io/docs/state/setup)

## Testing

[Testing](https://rx-angular.io/docs/state/testing)

## API

[API Documentation](https://rx-angular.io/docs/state/api)

## Tutorials

- [Basic Tutorial](https://www.rx-angular.io/docs/state/tutorials/basic-tutorial/setup)
- [Counter - StackBlitz](https://stackblitz.com/edit/rx-angular-state-counter-demo?file=src%2Fapp%2Fcounter%2Fcounter.component.ts)

## Snippets

- [Logic comparison - Increment a Value](https://rx-angular.io/docs/state/tutorials/increment-a-value)
- [Loading state and data fetching](https://rx-angular.io/docs/state/recipes/load-data-on-route-change)
- [Passing Observables directly](https://rx-angular.io/docs/state/tutorials/passing-observables-directly)
- [How to run partial state updates](https://rx-angular.io/docs/state/recipes/run-partial-updates)
- [Get nested state slices](https://rx-angular.io/docs/state/concepts-and-best-practices/get-nested-state-slices)
- [Deriving simple state](https://rx-angular.io/docs/state/concepts-and-best-practices/deriving-simple-state)
- [Composing state using NgRx selectors](https://rx-angular.io/docs/state/integrations/resuse-ngrx-selectors-to-compose-state)
- [Manage entities using NgRx entity adapter](https://rx-angular.io/docs/state/integrations/manage-entities-using-ngrx-entity)
- [BehaviorSubject vs RxState](https://rx-angular.io/docs/state/tutorials/migrating-to-rxstate)
- [Managing ViewModels with selectSlice](https://rx-angular.io/docs/state/recipes/manage-viewmodel)
- [Manage reactive HostBindings](https://rx-angular.io/docs/state/recipes/work-with-hostbindings)
- [Difference between Global and Local state](https://rx-angular.io/docs/state/recipes/determine-state-type)
- [Using RxState as Global State](https://rx-angular.io/docs/state/recipes/use-rxstate-as-global-state)

## Videos

[![intro-video_rx-angular--state-rx-state](https://user-images.githubusercontent.com/10064416/147395467-876ec499-645f-4f84-bde9-9bffaac22c62.PNG)_🎥 RxAngular State, The Component Reactive Store | Marmicode Tasting Session_](https://www.youtube.com/watch?v=CcQYj4V2IKw)

[![tackling-component-state-reactively](https://user-images.githubusercontent.com/10064416/147395866-031704dc-837d-4d1f-82d6-e758e4cb9556.PNG)_🎥 Tackling Component State Reactively (Live Demo at 24:47)_](https://www.youtube.com/watch?v=I8uaHMs8rw0)

- [🎥 Extending Angular for the Reactive Web](https://youtu.be/pkN6CeZ8h_U?t=5913)

- [German content | 🎥 Michael explains rx-state to webdave_de (Livestream)](https://youtu.be/cKUFcY8QkYM)

## Blogs/Documents

- [💾 Research on Reactive Ephemeral State](https://dev.to/rxjs/research-on-reactive-ephemeral-state-in-component-oriented-frameworks-38lk)

- [📜 Design Documents](https://hackmd.io/wVkWRc3XQWmtM6YcktRTrA)

## OSS Example Applications

- [📑 Fully-reactive Zone-Less Angular/Ionic Progressive Web Application](https://startrack-ng.web.app/search) - [Mike Hartington](https://twitter.com/mhartington)
- [📑 High performant zone-Less Angular Progressive Web Application](https://angular-movies-a12d3.web.app/list/category/popular) - [TasteJS](https://github.com/tastejs/angular-movies)
- [📑 Zone-Less Angular Application - Tour of heros](https://github.com/BioPhoton/tour-of-heroes) - [Michael_Hladky](https://twitter.com/Michael_Hladky)
- [📑 Zone-Less Todo MVC](https://github.com/edbzn/rx-angular-todo-mvc) - [Edouard Bozon](https://twitter.com/edbzn)

## Version Compatibility

| Angular                | RxJS                 | @rx-angular/state |
| ---------------------- | -------------------- | ----------------- |
| `14`                   | `^7.4.0`             | `> 1.4.6`         |
| `^12.0.0` or `^13.0.0` | `^6.5.5` or `^7.4.0` | `> 1.4.6`         |
| `^11.0.0`              | `^6.5.5`             | `<= 1.4.6`        |

Regarding the compatibility with RxJS, we generally stick to the compatibilities of the Angular framework itself.
All the packages support RxJS versions `^6.5.5` || `^7.4.0`.
For more information about the compatibilities of Angular itself see this [gist](https://gist.github.com/LayZeeDK/c822cc812f75bb07b7c55d07ba2719b3).
