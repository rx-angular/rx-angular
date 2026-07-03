---
id: rx-actions-api
title: 'rxActions'
diataxis_type: reference
package: state
legacy_guard: false
sidebar_label: 'rxActions'
sidebar_position: 6
tags: [state, api-reference]
---

# `rxActions`

The functional way to create an `RxActions` instance: a typed set of event channels that turns an actions interface into a dispatcher (`login(...)`), an observable stream (`login$`), and a side-effect binder (`onLogin(...)`) for each key. It is imported from the `@rx-angular/state/actions` secondary entry point and must be called within an injection context; the instance is destroyed automatically when the host component/directive/service is destroyed.

Every signature below is source-derived (package `21.1.1`, entry point `@rx-angular/state/actions`).

> **Why actions, and how they fit the reactive discipline:** see the [RxState reactive discipline & effects](../../../concepts/E6-rxstate-discipline-and-effects.md) concept, and the [manage actions](../how-to/manage-actions.md) how-to for the dispatch/subscribe recipes.

**Import**

```ts
import { rxActions } from '@rx-angular/state/actions';
```

## Signature

```ts
export function rxActions<T extends Partial<Actions>, U extends ActionTransforms<T> = object>(setupFn?: (cfg: { transforms: (t: U) => void }) => void): RxActions<T, U>;
```

| Param     | Type                                            | Meaning                                                                                                                               |
| --------- | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `setupFn` | `(cfg: { transforms: (t: U) => void }) => void` | Optional. Runs once on creation. Use `cfg.transforms({...})` to register per-key transform functions (see [Transforms](#transforms)). |
| _returns_ | `RxActions<T, U>`                               | The actions proxy (see [Returned handle](#returned-handle--rxactionst-u)).                                                            |

Type parameters:

| Param | Constraint                              | Meaning                                                                                                                                                                     |
| ----- | --------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `T`   | `Partial<Actions>` (`Actions = object`) | The actions interface, e.g. `{ login: Credentials; refresh: void }`. Each property is one channel; the value type is the channel's payload (`void` = a no-payload trigger). |
| `U`   | `ActionTransforms<T>`                   | The map of transform functions, inferred from `setupFn`. Defaults to `object` (no transforms).                                                                              |

Must be called within an injection context (it asserts via `assertInInjectionContext`), and it injects the current [`ErrorHandler`](https://angular.dev/api/core/ErrorHandler) and [`DestroyRef`](https://angular.dev/api/core/DestroyRef).

## Returned handle: `RxActions<T, U>`

The return value is a callable `Proxy`. For each key `K` in `T` it lazily exposes a dispatcher, an observable, and an `on`-binder; the proxy itself is also callable and carries a `$` selector.

```ts
export type RxActions<T extends Actions, U extends object = T> = ActionDispatchers<T, U> &
  ActionObservables<T> &
  ActionEffects<T> &
  ((slice: Partial<T>) => void) & {
    $: (props: (keyof T)[]) => Observable<ValuesOf<T>>;
  };
```

| Member (per key `K`)  | Shape                                                                                 | Meaning                                                                                                                                                                                |
| --------------------- | ------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `K` (dispatcher)      | `(value: T[K]) => void`                                                               | Emit a value on the `K` channel. For `void` keys, call with no argument (`refresh()`); if a transform is registered for `K`, the dispatcher's parameter type is the transform's input. |
| `K$` (observable)     | `Observable<T[K]>`                                                                    | The stream of values dispatched on `K`. Multicast; completes on destroy.                                                                                                               |
| `onK` (effect binder) | `<R>(fn: OperatorFunction<T[K], R>, sideEffectFn?: (value: R) => void) => () => void` | Bind a side effect: pipe the `K` stream through `fn`, run `sideEffectFn` per result. Returns a teardown function that stops the effect when called.                                    |

Whole-handle members:

| Member         | Shape                                             | Meaning                                                                                       |
| -------------- | ------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| call signature | `(slice: Partial<T>) => void`                     | Dispatch several channels at once by calling the handle itself with a partial actions object. |
| `$`            | `(props: (keyof T)[]) => Observable<ValuesOf<T>>` | Merge several channels into one observable of their combined values.                          |

> Assigning to a channel (`actions.search = 'x'`) throws, because channels are callable dispatchers, not setters.

## Transforms

Register per-key transform functions to normalize inputs before they are emitted, the action equivalent of Angular input transforms. Pass them through `setupFn`'s `transforms` callback:

```ts
import { rxActions, eventValue } from '@rx-angular/state/actions';

actions = rxActions<{ search: string }>(({ transforms }) => transforms({ search: eventValue }));
```

### `ActionTransforms<T>`

```ts
export type ActionTransforms<T extends object> = Partial<{
  [K in keyof T]: (...args: any[]) => T[K];
}>;
```

A transform is any function whose return type is the channel's payload type; its parameter type then becomes the dispatcher's parameter type. This lets a template bind `(change)="actions.search($event)"` while the `search$` stream still emits a `string`.

### Predefined transforms

Exported from `@rx-angular/state/actions`:

| Transform                       | Signature                          | Behaviour                                                                                 |
| ------------------------------- | ---------------------------------- | ----------------------------------------------------------------------------------------- |
| `preventDefault`                | `(e: Event) => Event`              | Calls `e.preventDefault()`, returns the event.                                            |
| `stopPropagation`               | `(e: Event) => Event`              | Calls `e.stopPropagation()`, returns the event.                                           |
| `preventDefaultStopPropagation` | `(e: Event) => Event`              | Calls both, returns the event.                                                            |
| `eventValue`                    | `<T = string>(e: Event \| T) => T` | Returns `e.target.value` if `e` looks like a DOM event, otherwise forwards `e` unchanged. |

## `RxActionFactory` (deprecated class API)

> **`@deprecated`**: use [`rxActions`](#rxactions) instead. The class-based factory predates the functional API and requires a `providers` entry; the functional creator needs no providers. See the [manage actions](../how-to/manage-actions.md) how-to for the migration.

```ts
@Injectable()
export class RxActionFactory<T extends Partial<Actions>> {
  create<U extends ActionTransforms<T> = object>(transforms?: U): RxActions<T, U>;
  destroy(): void;
}
```

| Member    | Shape                                 | Meaning                                                                                                                          |
| --------- | ------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `create`  | `(transforms?: U) => RxActions<T, U>` | Build an `RxActions` instance. Optionally pass the transforms map directly (the functional API passes it via `setupFn` instead). |
| `destroy` | `() => void`                          | Complete all subjects for every instance created by this factory. Called automatically on the injection context's destroy.       |

Because it is `@Injectable()`, the factory must be listed in `providers` and injected, then `create()` called: three steps the functional `rxActions()` collapses into one call.

## Exported types

For advanced typing, the entry point also exports the building-block types: `RxActions`, `ActionDispatchers`, `ActionDispatchFn`, `ActionObservables`, and `ActionTransforms`.

## See also

- How-to: [Manage actions](../how-to/manage-actions.md), covering dispatch, subscribe, and bind side effects.
- Reference: [`rxState`](./rx-state-functional.md); actions pair naturally with an `RxState` container.
