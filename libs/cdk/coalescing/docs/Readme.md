# Resources

**Example applications:**  
A demo application is available on [GitHub](https://github.com/BioPhoton/rx-angular-cdk-coalescing).

# Motivation

![Angular - Coalescing re-render caused by `markForCheck` diagram]()

Coalescing in general means, bring together multiple things into one. This can be anything starting from values to whole systems.
In RxAngular coalescing always refers to any sort of emissions or calls that will merge into one. The logic is implemented as RxJS operators and used to improve the change detection mechanism of Angular.

Before we dive into the usage we may want to understand already existing coalescing mechanisms in Angular and why it is used to get better performance.

There are 2 places in Angular we have coalescing already implemented in the framework:

- Coalescing of `ApplicationRef#tick` calls (re-rendering/re-evaluation of the app) triggered by e.g. `ChangeDetectorRef#markForCheck` or `ɵmarkDirty`.
- The flag `ngZoneEventCoalescing` in `CompilerOption`

## Coalescing of `ApplicationRef#tick` calls

As chances are high multiple changes occur at the same time Angular's change detection would end up getting triggered also multiple times.
This is the reason why Angular implemented coalescing for those calls.

In the following image we see 3 changes that call `ChangeDetectorRef#markForCheck`.
The internal logic then delay's these calls for a while by using `requestAnimationFrame` and calls `ApplicationRef#tick` only one time after the next animation frame arrives.
This way Angular's change detection and re-evaluation/re-rendering of the app get executed only once for all calls that fall into the duration from invocation until the next animation frame lands.

![Angular - Coalescing re-render caused by `markForCheck` diagram]()

If we visualize the same behavior based on flame charts we can understand the interlan logic and naming of the different steps in that process more technically.
The graphic shows start of the coalescing duration, the differen browser events and where the execution of certain logic is moved to.

![Angular - Coalescing re-render caused by `markForCheck` flame charts]()

With that information we should be able to reflect this concept also onto other usages in Angular.

## Coalescing of `ApplicationRef#tick` calls

@TODO

# RxAngular Coalescing operators

While developing RxAngular one of the first things we had to tackle for performant change detection, was coalescing of `ChangeDetectorRef#detectChanges` calls on component level,
but in fact the shipped logic can be applied anywhere.

There are 2 main pieces to understand:

- the coalescing mechanism
- the scoping mechanism

In the section usage we gill go into more detail.

## Setup

The coalescing features can be used directly from the `cdk` package or indirectly through the `template` package.
To do so install the the cdk package and if needed the packages depending on it.

1. Install `@rx-angular/cdk`

```bash
npm i @rx-angular/cdk
// or
yarn add @rx-angular/cdk
```

## Usage

As coalescing was already explained in the Angular context we can take that one step forther and look at it in a more agnostic way.

Imagine the following code snippet which executes heavy computation:

```typescript
function doStuff(value) {
  console.log('heavy computation', value);
}
```

If we would call it mutiple times we would cause 3 times the computation.

```typescript
from([1, 2, 3]).subscribe(doStuff); // 3 x doStuff
```

RxAngular's `coalesceWith` operator helps to merge together when applied to the source.

```typescript
from([1, 2, 3]).pipe(coalesceWith()).subscribe(doStuff); // 1 x doStuff
```

### Coalescing duration

By default, the duration in which values get united is derived from a `Promise` which executes immediately after the synchronous code got executed.

See the diagram for details:
![coalesceWith - micro taks duration selector]()

To have more fine-grained control over the duration of coalescing an optional parameter `durationSelector` is provided.
`durationSelector` is of type `Observable<unknown>` and the first emission of it terminates the coalescing duration.

You could pass e.g. `timer(0, 0)` as `durationSelector` to use a `setInterval` as duration period.

See the diagram for details:
![coalesceWith - macro taks duration selector]()

Even a longer duration based on milliseconds e.g. `timer(0, 500)` can be used as duration.

See the diagram for details:
![coalesceWith - 500ms duration selector]()

For more information on the different scheduling options you could have a look at the different scheduling API's like
`queueMicroTask`, `requestAnimationFrame`, `setTimeout`, `postMessage` or `requestIdleCallback`.

### Coalescing scope

@TODO
