# Resources

**Example applications:**  
A demo application is available on [GitHub](https://github.com/BioPhoton/rx-angular-cdk-coalescing).

# Motivation

![RxAngular - CDK/Coalescing](https://github.com/rx-angular/rx-angular/blob/master/libs/cdk/coalescing/docs/images/rx-angular-cdk-coalescing.png)

Coalescing in general means, bring together multiple things into one. This can be anything starting from values to whole systems.
In RxAngular coalescing always refers to any sort of emissions or calls that will merge into one. The logic is implemented as RxJS operators and used to improve the change detection mechanism of Angular.

# Available Approaches

There are 2 places in Angular we have coalescing already implemented in the framework:

- Coalescing of `ApplicationRef#tick` calls (re-rendering/re-evaluation of the app) triggered by e.g. `ChangeDetectorRef#markForCheck` or `ɵmarkDirty`.
- The flag `ngZoneEventCoalescing` in `CompilerOption`
- RxAngular add another option where we can apply that techniques manually wherever we want.

**The Benefits of RxAngular**

- ✅ Coalescing techniques as RxJS operators
- ✅ Configurable durationSelector for all kind of scheduling methods
- ✅ Scope coalescing to a specific component or object
- ✅ Typed methods
- ✅ IDE inline documentation

Before we dive into the usage of this package we may want to understand already existing coalescing mechanisms in Angular and why it is used to get better performance.

## Coalescing of `ApplicationRef#tick` calls

As chances are high multiple changes occur at the same time Angular's change detection would end up getting triggered also multiple times.
This is the reason why Angular implemented coalescing for those calls.

In the following image we see 3 changes that call `ChangeDetectorRef#markForCheck`.
The internal logic then delay's these calls for a while by using `requestAnimationFrame` and calls `ApplicationRef#tick` only one time after the next animation frame arrives.
This way Angular's change detection and re-evaluation/re-rendering of the app get executed only once for all calls that fall into the duration from invocation until the next animation frame lands.

![Angular - Coalescing re-render caused by `markForCheck` diagram](https://github.com/rx-angular/rx-angular/blob/master/libs/cdk/coalescing/docs/images/rx-angular-cdk-coalescing__appRef-tick-coalescing.png)

If we visualize the same behavior based on flame charts we can understand the interlan logic and naming of the different steps in that process more technically.
The graphic shows start of the coalescing duration, the differen browser events and where the execution of certain logic is moved to.

![Angular - Coalescing re-render caused by `markForCheck` flame charts](https://github.com/rx-angular/rx-angular/blob/master/libs/cdk/coalescing/docs/images/rx-angular-cdk-coalescing__appRef-tick-coalescing-flames.png)

With that information we should be able to reflect this concept also onto other usages in Angular.

## Coalescing with `ngZoneEventCoalescing` settings

Angular's bootstrap method can be configured to use a config property called `ngZoneEventCoalescing`.

```typescript
platformBrowserDynamic()
  .bootstrapModule(AppModule, { ngZoneCoalescing: true })
  .catch((err) => console.error(err));
```

This setting applies the technique of coalescing to fired events bound by Angular. It will coalesce multiple event emissions caused by event bubbling together and run `ApplicationRef#tick` only one time instead of multiple times.

![Angular - ngZoneEventCoalescing diagram])()

# RxAngular Coalescing operators

While developing RxAngular one of the first things we had to tackle for performant change detection, was coalescing of `ChangeDetectorRef#detectChanges` calls on component level,
but in fact the shipped logic can be applied anywhere.

There are 2 main pieces to understand:

- the coalescing mechanism
- the scoping mechanism

In the section usage we will go into more detail.

## Diagram

![Angular - coalesceWith shifted version](https://github.com/rx-angular/rx-angular/blob/master/libs/cdk/coalescing/docs/images/rx-angular-cdk-coalescing_coalesceWith1.png)

![Angular - coalesceWith aligned version](https://github.com/rx-angular/rx-angular/blob/master/libs/cdk/coalescing/docs/images/rx-angular-cdk-coalescing_coalesceWith2.png)

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
  console.log(value);
}
```

If we would call it mutiple times we would cause 3 times the computation.

```typescript
from([1, 2, 3]).subscribe(doStuff); // 3 x doStuff logs 1, 2, 3
```

RxAngular's `coalesceWith` operator helps to merge together when applied to the source.

```typescript
from([1, 2, 3]).pipe(coalesceWith()).subscribe(doStuff); // 1 x doStuff logs 3
```

### Coalescing duration

By default, the duration in which values get united is derived from a micro taks which executes immediately after the synchronous code got executed.

See the diagram for details:
![coalesceWith - micro taks duration selector](https://github.com/rx-angular/rx-angular/blob/master/libs/cdk/coalescing/docs/images/rx-angular-cdk-coalescing_duration-selector-micro-task.png)

To have more fine-grained control over the duration of coalescing an optional parameter `durationSelector` is provided.
`durationSelector` is of type `Observable<unknown>` and the first emission of it terminates the coalescing duration.

You could pass e.g. `interval(0)` as `durationSelector` to use a `setInterval` as duration period.

See the diagram for details:
![coalesceWith - macro taks duration selector](https://github.com/rx-angular/rx-angular/blob/master/libs/cdk/coalescing/docs/images/rx-angular-cdk-coalescing_duration-selector-micro-task-flames.png)

> **💡 Pro Tip**  
> Even a longer duration based on milliseconds e.g. `interval(500)` can be used as duration.
> 
> For more information on the different scheduling options you could have a look at the different scheduling API's like
> `queueMicroTask`, `requestAnimationFrame`, `setTimeout`, `postMessage` or `requestIdleCallback`.


A real life example where `coalesceWith` comes in handy is runnning manual change detection with `ChangeDetectorRef#detectChanges()`.
The below diagram display the cycle of updates, coalescing and rendering of values in a component.  

![coalesceWith - one component](https://github.com/rx-angular/rx-angular/blob/master/libs/cdk/coalescing/docs/images/rx-angular-cdk-coalescing__coalesceWith-on-component.png)

### Coalescing scope

If we think about the underlying principle of coalescing a little bit more we may ask our self how the logic knows what to do? How is it done that some work that is scheduled multiple times get executed only once?
Surely there must be a variable stored somewhere that knows if coalescing it currently ongoing or not. 

Let's make up a small example to understand the situation a little bit better. 

In the following snippet we see the same logic from above but applied to 2 different subscription. 
Both components schedule changes and use `coalesceWith` inside. 

```typescript
  from([1, 2, 3]).pipe(coalesceWith(queueMicroTask)).subscribe(detectChanges); // 1 x detectChanges renders 3
  from([1, 2, 3]).pipe(coalesceWith(queueMicroTask)).subscribe(detectChanges); // 1 x detectChanges renders 3
```

The result is quite unintuitive. Both subscriptions trigger the detect changes call and the component got re-rendered 2 times.

Why is this the case? 

If we recall the code snippet from above we see the number loged to to console was `3` out of the series of `1`, `2`, `3`.

```typescript
from([1, 2, 3]).pipe(coalesceWith()).subscribe(doStuff); // 1 x doStuff logs 3
```

It makes sense because we want to render only the last update to the component. To do this `coalesceWith` maintains a flag for each subscription.
The wante bevavior should execute change detection only once per component. 

This canbe acheaved by scoping the flag that maintains coalescing to a specific thing. e.g. the component.

```typescript
  from([1, 2, 3]).pipe(coalesceWith(queueMicroTask, this)).subscribe(detectChanges); // 0 x detectChanges no render
  from([1, 2, 3]).pipe(coalesceWith(queueMicroTask, this)).subscribe(detectChanges); // 1 x detectChanges renders 3
```

With this in mind we can go one step further and look at change detection across muntiple coponents. 

The following diagram illustrates cnage detection in component level:

![coalesceWith - multiple components with component scope](https://github.com/rx-angular/rx-angular/blob/master/libs/cdk/coalescing/docs/images/rx-angular-cdk-coalescing__coalesceWith-on-component-component-scope.png)

> **⚠ Notice:**  
> Be cautious with globally shared coalescing scopes, it could lead to un wanted behaviour ans loss of updates when used incorrectly.

![coalesceWith - multiple components with global scope](https://github.com/rx-angular/rx-angular/blob/master/libs/cdk/coalescing/docs/images/rx-angular-cdk-coalescing__coalesceWith-on-component-global-scope.png)

Again, why is this the case?

As we have now only one scope for every scheduled work form multiple components we will end up updating only the last one.
Same as in the first example where we only logs the last emission.

```typescript
from([1, 2, 3]).pipe(coalesceWith()).subscribe(doStuff); // 1 x doStuff logs 3
```
