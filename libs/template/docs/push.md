# PushPipe

The `push` pipe serves as a drop-in replacement for the `async` pipe.

The current way of binding an observable to the view looks like that:

```html
{{ observable$ | async }}
<ng-container *ngIf="observable$ | async as o">{{ o }}</ng-container>
<component [value]="observable$ | async"></component>
```

## Problems with `async` pipe

`async` pipe just marks the component and all its ancestors as dirty.
It needs zone.js microtask queue to exhaust until `ApplicationRef.tick` is called to render all dirty marked
components and does not work in zone-less mode.

## Solution

`push` pipe solves that problem. It contains intelligent handling of change detection by leveraging a [RenderStrategy](https://github.com/rx-angular/rx-angular/tree/main/libs/cdk/docs/render-strategies/README.md) under the hood, which in turn, takes care of optimizing the `ChangeDetection` of your component. The `push` pipe can be used in zone-full as well as zone-less mode without any changes to the code.

_Example_

```html
<hero-search [term]="searchTerm$ | push"> </hero-search>
<hero-list-component [heroes]="heroes$ | push"> </hero-list-component>
```

The rendering behavior can be configured per PushPipe instance using the strategy parameter.

_Example_

```html
<hero-search [term]="searchTerm$ | push: 'global'"> </hero-search>
<hero-list-component [heroes]="heroes$ | push: 'global'"> </hero-list-component>
```

## Included features

- Take observables or promises, retrieve their values and render the value to the template
- Handling null and undefined values in a clean unified/structured way
- Distinct same values in a row to increase performance
- Coalescing of change detection calls to boost performance
- Lazy rendering (see [LetDirective](https://github.com/rx-angular/rx-angular/tree/main/libs/template/docs/api/let-directive.md))
- Chunked rendering

## Signature

```typescript
class PushPipe<U> implements PipeTransform, OnDestroy {
  constructor(strategyProvider: RxStrategyProvider, cdRef: ChangeDetectorRef)
  transform(potentialObservable: null, config?: string | Observable<string>) => null;
  transform(potentialObservable: undefined, config?: string | Observable<string>) => undefined;
  transform(potentialObservable: ObservableInput<U>, config?: string | Observable<string>) => U;
  transform(potentialObservable: ObservableInput<U> | null | undefined, config: string | Observable<string> | undefined) => U | null | undefined;
  ngOnDestroy() => void;
}
```
