---
id: coerce-reactive-inputs
title: "How to coerce reactive inputs"
diataxis_type: how-to
package: cdk
legacy_guard: false
sidebar_label: "Coerce reactive inputs"
tags: [cdk, guides]
---

# How to coerce reactive inputs

**Goal:** accept an input that may be **either a static value or an `Observable`**, and
work with it internally as a single `Observable`, without branching on `isObservable`
by hand on every binding.

This is the case `@rx-angular/cdk/coercing` exists for. Angular has no native helper
for the "value _or_ stream on the same binding" pattern, so these helpers stay the
recommended path.

> **Coercing a primitive attribute instead?** For `string → boolean`/`number` input
> coercion, use the native `booleanAttribute` / `numberAttribute` functions or a
> signal-input `transform`, not these helpers. See the note at the end.

## Coerce a single value-or-Observable input

Use `coerceObservable` in a signal-input `transform` (or wherever you receive the raw
value) to normalize it to an `Observable` once:

```ts
import { Component, input } from '@angular/core';
import { Observable } from 'rxjs';
import { coerceObservable } from '@rx-angular/cdk/coercing';

@Component({
  selector: 'app-price',
  template: `{{ price$ | async }}`,
})
export class PriceComponent {
  readonly price = input(0, {
    transform: (v: Observable<number> | number) => v,
  });
  readonly price$ = coerceObservable(this.price());
}
```

`coerceObservable` returns an already-`Observable` input untouched and wraps a static
value with `of()`.

## Coerce a stream of inputs and drop duplicates

When the input changes over time and you want to forward only distinct values, pipe the
incoming values through the operator form `coerceDistinctWith`:

```ts
import { Component, input, effect } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { coerceDistinctWith } from '@rx-angular/cdk/coercing';

@Component({ /* … */ })
export class PriceComponent {
  private readonly priceInput$ = new Subject<Observable<number> | number>();
  readonly price$ = this.priceInput$.pipe(coerceDistinctWith());

  readonly price = input(0, {
    transform: (v: Observable<number> | number) => {
      this.priceInput$.next(v);
      return v;
    },
  });
}
```

`coerceDistinctWith` coerces each emission to an `Observable`, flattens with `switchAll`
by default, and applies `distinctUntilChanged` on both the incoming Observables and the
flattened result. Pass a different flatten operator (`mergeAll`, `concatAll`,
`exhaustAll`) as the argument if you need other higher-order semantics.

## Merge many value-or-Observable emissions into one stream

For a factory-style handle that exposes only `next()` on the input side and a merged,
distinct `values$` on the output side, use `coerceAllFactory`:

```ts
import { coerceAllFactory } from '@rx-angular/cdk/coercing';

private readonly price = coerceAllFactory<number>();
readonly price$ = this.price.values$;

setPrice(v: Observable<number> | number) {
  this.price.next(v);
}
```

## Result

Downstream code subscribes to a single `Observable<T>` and never has to check whether
the input was a value or a stream. Distinct variants also cut redundant emissions,
which keeps derived work and rendering to a minimum.

## Prefer native coercion for primitives

For plain attribute coercion, use the framework first:

```ts
import { booleanAttribute, numberAttribute, input } from '@angular/core';

readonly disabled = input(false, { transform: booleanAttribute });
readonly count = input(0, { transform: numberAttribute });
```

The CDK coercing helpers earn their place only for the value-or-`Observable` niche,
which has no native equivalent.

## See also

- Reference: [`@rx-angular/cdk/coercing`](../reference/coercing.md)
