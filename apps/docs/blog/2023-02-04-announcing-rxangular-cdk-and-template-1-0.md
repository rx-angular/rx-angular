---
title: Announcing the RxAngular CDK and Template 1.0 releases
description: The @rx-angular/cdk and @rx-angular/template packages are now stable and follow semantic versioning.
authors:
  - BioPhoton
  - edbzn
  - hoebbelsB
  - Karnaukhov-kh
  - LayZeeDK
tags: [cdk, release, template]
image: /img/logo.png
hide_table_of_contents: false
---

- [ ] Supported Angular versions
- [x] We follow Semantic Versioning
- [ ] Recent breaking changes/deprecations?
- [x] Introduction to each package
- [ ] Recent features in each package
- [x] Major features in each package

We are pleased to announce the stable release of RxAngular CDK and RxAngular Template 1.0. With this release, we enter semantic versioning which means no breaking changes in minor or patch version releases. This includes version requirements for our peer dependencies, Angular and RxJS.

Thank you to all contributors and users who have helped us to get here. We are excited to see what the future holds for RxAngular.

## Packages introduction

### @rx-angular/template

The @rx-angular/template library simplifies building Angular applications of any scale.
It improves the DX by reducing boilerplate code and provides fast and reliable change detection.
It's implementation is zone agnostic by default and optimizes internally regardless of the environment.
By leveraging the `@rx-angular/cdk/render-strategies` package, it enables the concurrent mode for #angular

#### [Push pipe:](https://www.rx-angular.io/docs/template/api/push-pipe) A Better Alternative to Async Pipe

The push pipe works like the async pipe but offers prioritized scheduling and local change detection.
This means optimized cd cycles resulting in better performance.
Unlike the async pipe, the push pipe can work in environments without zone.js.

#### [RxLet directive:](https://www.rx-angular.io/docs/template/api/let-directive) Advanced Template Control

<p align="center">
 <img src="/img/template/rx-let.png" alt="rxLet directive"/>
</p>

The rxLet directive is a tool that replaces the standard async pipe.
In addition to prioritized scheduling it also offers a scoped rendering.
This directive allows you to fine-tune change detection in specific parts of your **components template**, without affecting the rest of the component or application.
The scoped rendering gives you more control over how Angular updates your user interface.

#### [Reactive context and context triggers:](https://www.rx-angular.io/docs/template/concepts/reactive-context) Dynamic Templates

<p align="center">
 <img src="/img/template/context-triggers.png" alt="context triggers"/>
</p>

With the rxLet directive, you can bind observables, promises, and other reactive data sources to display different templates based on their state.
This includes feedback for suspense, next, error, and complete. You can also provide an observable as a trigger to switch between template types.

#### [RxFor directive:](https://www.rx-angular.io/docs/template/api/rx-for-directive) Efficient Lists

<p align="center">
 <img src="/img/template/rx-for.png" alt="rxFor directive"/>
</p>

The rxFor directive is a more performant and efficient alternative to the ngFor directive.
Unlike ngFor, it allows for non-blocking rendering of large sets of data by treating each child template as a separate renderable unit and executing change detection as separate tasks.
This results in a smoother user experience, even when dealing with large or complex lists.
You can provide input values as observables, promises, or static values.
The rendering behavior can also be customized through the RenderStrategies API.

Check this [tweet by Chau Tran](https://twitter.com/Nartc1410/status/1614114301970886656) to see the ultimate difference between ngFor and rxFor performance.

#### [RxIf directive:](https://www.rx-angular.io/docs/template/api/rx-if-directive) Switch Templates Easily

The rxIf directive is an alternative to the ngIf directive.
It makes switching templates based on an observable condition easier.
Instead of using ngIf with the async pipe, you can bind observables directly to the rxIf directive.
This eliminates the need for interactions with NgZone or triggering global change detection, making the process of switching templates more efficient.

### @rx-angular/cdk

@rx-angular/cdk offers tools for Angular developers to create efficient directives, components and services.
It includes features like zone configuration, zone-less implementation, coercion, coalescing, render-strategies, and more, to improve the performance of Angular applications.

#### [Concurrent strategies:](https://www.rx-angular.io/docs/cdk/render-strategies/strategies/concurrent-strategies) Unblock Main Thread

<p align="center">
 <img src="/img/cdk/concurrent-strategies.png" alt="concurrent strategies"/>
</p>

The browser has one main UI thread that performs tasks one after another. Long tasks, over 50ms, affect users experience and it's important to optimize and prioritize code to meet the 50ms frame budget.

@rx-angular/cdk provides concurrent scheduling strategies with a frame budget awareness, task prioritization and execution deadline.

- **Notion of frame budget**. The strategies are designed to be aware of the frame budget and schedules work accordingly.
- **Priority**. Each strategy is assigned a priority, determining the order in which tasks are executed.
- **Execution deadline**. Each strategy has its own execution deadline. If the deadline is exceeded, any remaining work will be executed in a single browser task.

<p align="center">
 <img src="/img/cdk/userBlocking-strategy.png" alt="userBlocking strategy"/>
</p>

The image shows the execution deadline concept.
6 userBlocking tasks are scheduled.
The first 2 tasks meet the deadline and are executed in separate tasks, but the third task exceeds the deadline of 250ms and the scheduler executes all remaining tasks with a deadline <= 250ms in one task.

#### [Native strategies:](https://www.rx-angular.io/docs/cdk/render-strategies/strategies/basic-strategies) Improve Default Change Detection

<p align="center">
 <img src="/img/references/global-vs-local-rendering.png" alt="Global vs Local rendering"/>
</p>

The library also offers non-chunked rendering strategies, which improve the default Angular rendering approach.
By default, Angular evaluates and potentially re-renders the entire component tree, starting from the trigger point and working up to the root of the app.
However, our rendering strategies use "detectChanges" to evaluate and update only changed components, making the rendering process more efficient and faster.

#### [Strategy provider:](https://www.rx-angular.io/docs/cdk/render-strategies/rx-strategy-provider) Schedule Any Work

The main way to use RenderStrategies is through template directives and pipes, but the library also provides the `RxStrategyProvider` service for component-level interaction.
This service offers the `schedule` and `scheduleWith` methods for scheduling any type of work, with `schedule` returning an observable and `scheduleWith` returning a MonoTypeOperatorFunction for use in an rxjs pipe.

The `scheduleCD` method is an imperative option for scheduling change detection cycles.

Try the RxStrategyProvider and see rendering strategies in action in this [stackblitz demo](https://stackblitz.com/edit/angular-ivy-1vfpoe?file=src%2Fapp%2Fapp.component.ts).

#### [Zone configuration](https://www.rx-angular.io/docs/cdk/zone-configurations) and [Zone-less utils:](https://www.rx-angular.io/docs/cdk/zone-less) Reliable Zone.js tuning

Our CDK provides zone-configuration utils for partially disabling zone.js, reducing the risk of unexpected bugs.
These utils provide autocompletion, event groups, and assertions to ensure proper usage.
The zone-less utils allow for selective disabling of zone patching for specific browser APIs, including requestAnimationFrame, cancelAnimationFrame, setInterval, clearInterval, setTimeout, clearTimeout.
The utility function `getZoneUnpatchedApi` can be used to get an unpatched version of any browser API.

#### [Coalescing:](https://www.rx-angular.io/docs/cdk/coalescing) Optimize Frequent Events

Coalescing sub-package provides set of utilities that implement a technique of merging multiple emissions, streams, or calls into one during a given time frame to improve the performance.
This helps to minimize the number of updates made to the user interface, improving the overall efficiency and speed of the application.
This technique is one of the key building blocks for optimizing change detection cycles in Angular, and is utilized to ensure that the application is functioning smoothly and effectively.

#### [Coercing:](https://www.rx-angular.io/docs/cdk/coercing) Seamless Type Conversion

Our coercion package provides a set of utilities to perform type coercion (data type conversion) in a seamless and efficient manner.
These utilities include factories, such as 'coerceObservable' and 'coerceDistinctObservable', and operators, such as 'coerceObservableWith' and 'coerceDistinctWith'.
These tools help to ensure that data is in the desired format before it is used in the application, improving overall functionality and preventing unexpected errors.

#### [Transformations](https://www.rx-angular.io/docs/cdk/api/transformation-helpers) Tree Shakable Entity Management

The transformation helpers provided by the `@rx-angular/cdk/transformations` are a complete set of utilities to manage entities. They are immutable by default and include transformation functions to handle insertions, updates, dictionary <-> array conversions & more to help you build store like state management systems.

