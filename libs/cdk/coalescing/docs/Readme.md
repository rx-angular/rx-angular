# Coalescing

Coalescing in general means, bring togeather multiple things into one. This can be anything starting from values to whole systems.
In RxAngular coalescing always referes to any sort of emissions or calls that will merge into one. The logic is implemented as RxJS operators and used to improve the change detection mechanism of Angular.

Before we dive into the usage we may want to understand already existing coalescing mechanisms in Angular.

There are 2 places in Angular we have coalescing already implemented in the framework:

- Coalescing of `ApplicationRef#tick` calls (re-rendering/re-evaluation of the app) triggered by e.g. `ChangeDetectorRef#markForCheck` or `ɵmarkDirty`.
- The flag `ngZoneEventCoalescing` in `CompilerOption`

## Coalescing of `ApplicationRef#tick` calls

As chances are high multiple changes occour at the same time Angular's change detection would end up getting triggered also multiple times.
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

As detectChanges has no coalescing of render calls like ChangeDetectorRef#markForCheck or ɵmarkDirty have, we apply our own coalescing, 'scoped' oncomponent level.

Coalescing, in this very manner, means collecting all events in the same EventLoop tick, that would cause a re-render. Then execute re-rendering only once.

'Scoped' coalescing, in addition, means grouping the collected events by a specific context. E. g. the component from which the re-rendering was initiated.

This context could be the Component instance or a ViewContextRef, both accessed over the context over ChangeDetectorRef#context.
