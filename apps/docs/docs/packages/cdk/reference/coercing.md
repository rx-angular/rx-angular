---
id: coercing
title: '@rx-angular/cdk/coercing'
diataxis_type: reference
package: cdk
legacy_guard: false
sidebar_label: 'Coercing'
tags: [cdk, api-reference]
---

# @rx-angular/cdk/coercing

`@rx-angular/cdk/coercing` coerces a value that may be **either a static value or an
`Observable`** into a single, well-behaved `Observable`. This is its unique niche:
Angular has no native helper for the "accept a value _or_ a stream on the same
binding" pattern, so these helpers stay the recommended path.

For **primitive** attribute coercion (string → `boolean`/`number`), reach for the
native `booleanAttribute` / `numberAttribute` functions or a signal-input `transform`
instead. See [How to coerce reactive inputs](../how-to/coerce-reactive-inputs.md).

## Import

```ts
import { coerceObservable, coerceObservableWith, coerceDistinctObservable, coerceDistinctWith, coerceAllFactory } from '@rx-angular/cdk/coercing';
```

## Exports

| Export                     | Kind     | Purpose                                                                                 |
| -------------------------- | -------- | --------------------------------------------------------------------------------------- |
| `coerceObservable`         | factory  | Turn a static value or `Observable` into an `Observable`.                               |
| `coerceObservableWith`     | operator | Operator form of `coerceObservable`.                                                    |
| `coerceDistinctObservable` | factory  | `coerceObservable` + inner/outer `distinctUntilChanged` and a flatten strategy.         |
| `coerceDistinctWith`       | operator | Operator form of `coerceDistinctObservable`.                                            |
| `coerceAllFactory`         | factory  | A `{ next, values$ }` handle that merges higher-order values into one optimized stream. |

---

## `coerceObservable`

```ts
function coerceObservable<T>(o: Observable<T> | T): Observable<T>;
```

Returns the input unchanged if it is already an `Observable`, otherwise wraps it with
`of()`.

| Parameter | Type                 | Description          |
| --------- | -------------------- | -------------------- |
| `o`       | `Observable<T> \| T` | The value to coerce. |

**Returns:** `Observable<T>`

```ts
readonly value = input<Observable<number> | number>(0);
readonly value$ = coerceObservable(this.value());
```

---

## `coerceObservableWith`

```ts
function coerceObservableWith<T>(): OperatorFunction<Observable<T | null | undefined> | T | null | undefined, Observable<T | null | undefined>>;
```

The operator form of `coerceObservable`, applied inside a `pipe()`. It maps each
incoming static-or-`Observable` value to an `Observable`.

**Returns:** an `OperatorFunction` producing an `Observable` of `Observable`.

```ts
private readonly value$ = new Subject<Observable<number> | number>();
readonly coerced$ = this.value$.pipe(coerceObservableWith());
```

---

## `coerceDistinctObservable`

```ts
function coerceDistinctObservable<T>(o$: Observable<Observable<T> | T>, flattenOperator?: OperatorFunction<Observable<T>, T>): Observable<T>;
```

Coerces to an `Observable` and forwards only **distinct** values: a
`distinctUntilChanged()` is applied both across incoming Observables and across the
flattened result.

| Parameter         | Type                                 | Default       | Description                                                                        |
| ----------------- | ------------------------------------ | ------------- | ---------------------------------------------------------------------------------- |
| `o$`              | `Observable<Observable<T> \| T>`     | —             | The source of values or Observables.                                               |
| `flattenOperator` | `OperatorFunction<Observable<T>, T>` | `switchAll()` | The flattening strategy (e.g. `mergeAll`, `concatAll`, `exhaustAll`, `switchAll`). |

**Returns:** `Observable<T>`

---

## `coerceDistinctWith`

```ts
function coerceDistinctWith<T>(flattenOperator?: OperatorFunction<Observable<T>, T>): (o$: Observable<Observable<T> | T>) => Observable<T>;
```

The operator form of `coerceDistinctObservable`.

| Parameter         | Type                                 | Default       | Description              |
| ----------------- | ------------------------------------ | ------------- | ------------------------ |
| `flattenOperator` | `OperatorFunction<Observable<T>, T>` | `switchAll()` | The flattening strategy. |

**Returns:** an operator from `Observable<Observable<T> \| T>` to `Observable<T>`.

```ts
private readonly value$ = new Subject<Observable<number> | number>();
readonly coerced$ = this.value$.pipe(coerceDistinctWith());
```

---

## `coerceAllFactory`

```ts
function coerceAllFactory<U, R = U>(
  subjectFactory?: () => Subject<Observable<U> | U>,
  flattenOperator?: OperatorFunction<Observable<U>, R>,
): {
  values$: Observable<R>;
  next(observable: Observable<U> | U): void;
};
```

Returns a small handle for the higher-order case: `next()` any static value or
`Observable`, and read the merged, distinct result from `values$`. Only `next` is
exposed on the input side, so the underlying subject cannot be completed or errored by
consumers.

| Parameter         | Type                                 | Default         | Description                       |
| ----------------- | ------------------------------------ | --------------- | --------------------------------- |
| `subjectFactory`  | `() => Subject<Observable<U> \| U>`  | `new Subject()` | Factory for the backing subject.  |
| `flattenOperator` | `OperatorFunction<Observable<U>, R>` | `switchAll()`   | Higher-order flattening strategy. |

**Returns:** `{ values$: Observable<R>; next(observable: Observable<U> | U): void }`

```ts
private readonly value = coerceAllFactory<number>();
readonly value$ = this.value.values$;

setValue(v: Observable<number> | number) {
  this.value.next(v);
}
```

---

## See also

- Task: [How to coerce reactive inputs](../how-to/coerce-reactive-inputs.md)
