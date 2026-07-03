---
id: custom-strategies
title: 'Custom render strategies'
diataxis_type: reference
package: cdk
legacy_guard: 'Angular <21 / zoneful'
sidebar_label: 'Custom strategies'
tags: [cdk, migration]
concepts: [E1, E2]
---

import LegacyGuard from '@site/src/components/LegacyGuard';

# Custom render strategies

<LegacyGuard audience="Angular <21 / zoneful">

Authoring a custom render strategy means writing your own change-detection
render method and scheduling behaviour, a niche that mattered when Angular's
change detection ran globally through Zone.js. Since Angular v21 change detection
is zoneless by default and signals re-render only what changed, so hand-rolled
strategies are rarely needed. For the built-in sets, prefer the
[native and concurrent strategies](../reference/concurrent-strategies.md); reach
for a custom strategy only for the audience named above. See
[Zoneless & how Zone.js affected change detection](../../../concepts/E2-zoneless-and-zonejs-change-detection.md).

</LegacyGuard>

A custom strategy is a `RxStrategyCredentials` object registered through
`provideRxRenderStrategies({ customStrategies })`. It defines a **render method**
(`work`) and a **scheduling behaviour** (`behavior`). For why the strategy system
exists at all, and how vanilla change detection over-renders, see
[Understanding change detection in Angular](../../../concepts/E1-change-detection.md).

## Import path

```ts
import { provideRxRenderStrategies } from '@rx-angular/cdk/render-strategies';
```

## The types you implement

```ts
export type RxRenderWork = <T = unknown>(cdRef: ChangeDetectorRef, scope?: coalescingObj, notification?: RxNotification<T>) => void;

export type RxRenderBehavior = <T = unknown>(params: { work: () => any; scope?: coalescingObj; ngZone?: NgZone }) => (o: Observable<T>) => Observable<T>;

export interface RxStrategyCredentials<S = string> {
  name: S;
  work: RxRenderWork;
  behavior: RxRenderBehavior;
}

export type RxCustomStrategyCredentials<T extends string> = Record<T, RxStrategyCredentials>;

export type RxNativeStrategyNames = 'native' | 'local' | 'noop';
export type RxConcurrentStrategyNames = 'immediate' | 'userBlocking' | 'normal' | 'low' | 'idle';
export type RxDefaultStrategyNames = RxNativeStrategyNames | RxConcurrentStrategyNames;

export type RxStrategyNames<T extends string = string> = RxDefaultStrategyNames | T;
export type RxStrategies<T extends string> = RxCustomStrategyCredentials<RxStrategyNames<T>>;
```

Two shapes are easy to get wrong:

- **`behavior` takes a single params object**, not positional arguments. Its
  parameter is `{ work, scope?, ngZone? }`; a `RxRenderBehavior` returns an
  operator that pipes the source through your scheduling of `work()`.
- **`RxStrategyNames<T>` is generic-defaulted** as `RxStrategyNames<T extends string = string>`.
  The built-in native names are exactly `native | local | noop`; there is **no**
  `global` native strategy.

## Configuration type

```ts
export interface RxRenderStrategiesConfig<T extends string> {
  primaryStrategy?: RxStrategyNames<T>;
  customStrategies?: RxCustomStrategyCredentials<T>;
  patchZone?: boolean;
  /** @deprecated dropped soon; not required with signal-based view & content queries */
  parent?: boolean;
}
```

`RxRenderStrategiesConfig` also carries a `parent?` flag (deprecated; it is no
longer required with signal-based view and content queries).

## Registering a custom strategy

```ts
import { provideRxRenderStrategies } from '@rx-angular/cdk/render-strategies';
import { asapScheduler } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRxRenderStrategies({
      primaryStrategy: 'asap',
      customStrategies: {
        asap: {
          name: 'asap',
          work: (cdRef) => cdRef.detectChanges(),
          behavior:
            ({ work }) =>
            (o$) =>
              o$.pipe(
                delay(0, asapScheduler),
                tap(() => work()),
              ),
        },
      },
    }),
  ],
};
```

## See also

- Reference: [Concurrent strategies](../reference/concurrent-strategies.md)
- Reference: [`RxStrategyProvider`](../reference/rx-strategy-provider.md)
- Concept: [Understanding change detection in Angular](../../../concepts/E1-change-detection.md)
- Concept: [Zoneless & how Zone.js affected change detection](../../../concepts/E2-zoneless-and-zonejs-change-detection.md)
