# @rx-angular/state

[![npm](https://img.shields.io/npm/v/%40rx-angular%2Fstate.svg)](https://www.npmjs.com/package/%40rx-angular%2Fstate)
![rx-angular CI](https://github.com/rx-angular/rx-angular/workflows/rx-angular%20CI/badge.svg?branch=master)
[![Coverage Status](https://raw.githubusercontent.com/rx-angular/rx-angular/github-pages/docs/test-coverage/state/jest-coverage-badge.svg)](https://rx-angular.github.io/rx-angular/test-coverage/state/lcov-report/index.html)

## Reactive Component State for Angular

RxState is a lightweight, flexible, strongly typed and tested tool dedicated to reduce the complexity of managing component state in Angular.

![state logo](https://raw.githubusercontent.com/rx-angular/rx-angular/master/libs/state/docs/images/state_logo.png)

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
  <img src="https://raw.githubusercontent.com/rx-angular/rx-angular/master/libs/state/docs/images/state_API-names.png" width="49%" />
  <img src="https://raw.githubusercontent.com/rx-angular/rx-angular/master/libs/state/docs/images/state_API-types.png" width="49%" />
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

## API

[API Documentation](https://github.com/rx-angular/rx-angular/tree/master/libs/state/docs/api/overview.md)

## Usage

[Usage Documentation](https://github.com/rx-angular/rx-angular/tree/master/libs/state/docs/usage.md)

## Tutorials

- [Basic Tutorial](https://github.com/rx-angular/rx-angular/tree/master/apps/demos/src/app/features/tutorials/basics)
- [Counter - StackBlitz](https://stackblitz.com/edit/rx-angular-state-counter-demo?file=src%2Fapp%2Fcounter%2Fcounter.component.ts)

## Snippets

- [Logic comparison - Increment a Value](https://github.com/rx-angular/rx-angular/tree/master/libs/state/docs/snippets/logic-comparison--increment-a-value.md)
- [Loading state and data fetching](https://github.com/rx-angular/rx-angular/tree/master/libs/state/docs/snippets/loading-state-and-data-fetching.md)
- [Passing Observables directly](https://github.com/rx-angular/rx-angular/tree/master/libs/state/docs/snippets/passing-observables-directly.md)
- [How to run partial state updates](https://github.com/rx-angular/rx-angular/tree/master/libs/state/docs/snippets/how-can-i-run-partial-state-updates.md)
- [Get nested state slices](https://github.com/rx-angular/rx-angular/tree/master/libs/state/docs/snippets/get-nested-state-slices.md)
- [Deriving simple state](https://github.com/rx-angular/rx-angular/tree/master/libs/state/docs/snippets/deriving-simple-state.md)
- [Composing state using NgRx selectors](https://github.com/rx-angular/rx-angular/tree/master/libs/state/docs/snippets/composing-state-using-ngrx-selectors.md)
- [Manage entities using NgRx entity adapter](https://github.com/rx-angular/rx-angular/tree/master/libs/state/docs/snippets/manage-collections-with-ngrx-entity.md)
- [BehaviorSubject vs RxState](https://github.com/rx-angular/rx-angular/tree/master/libs/state/docs/snippets/behavior-subject-vs-rx-state.md)
- [Managing ViewModels with selectSlice](https://github.com/rx-angular/rx-angular/tree/master/libs/state/docs/snippets/selecting-the-viewmodel.md)
- [Manage reactive HostBindings](https://github.com/rx-angular/rx-angular/tree/master/libs/state/docs/snippets/hostbindings.md)
- [Difference between Global and Local state](https://github.com/rx-angular/rx-angular/tree/master/libs/state/docs/snippets/global-state-vs-local-state.md)
- [Using RxState as Global State](https://github.com/rx-angular/rx-angular/blob/master/libs/state/docs/snippets/manage-global-state.md)

## Resources

- [🎥 Tackling Component State Reactively (Live Demo at 24:47)](https://www.youtube.com/watch?v=I8uaHMs8rw0)
- [🎥 Extending Angular for the Reactive Web](https://youtu.be/pkN6CeZ8h_U?t=5913)
- [💾 Research on Reactive Ephemeral State](https://dev.to/rxjs/research-on-reactive-ephemeral-state-in-component-oriented-frameworks-38lk)
- [📜 Design Documents](https://hackmd.io/wVkWRc3XQWmtM6YcktRTrA)
- [📑 Fully-reactive Zone-Less Angular/Ionic Progressive Web Application](https://startrack-ng.web.app/search) by [Mike Hartington](https://twitter.com/mhartington)

## Browsers support

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari-ios/safari-ios_48x48.png" alt="iOS Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>iOS Safari |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| IE11, Edge                                                                                                                                                                                                      | last version                                                                                                                                                                                                      | last version                                                                                                                                                                                                  | last 2 versions                                                                                                                                                                                               | last 2 versions                                                                                                                                                                                                               |
