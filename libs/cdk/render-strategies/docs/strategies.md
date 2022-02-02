# Strategies

Before we go into detail with the provided strategies, let's understand angulars vanilla behaviour first.

![rx-angular-cdk-render-strategies__strategy-angular](https://user-images.githubusercontent.com/4904455/116009556-ac98fd00-a61a-11eb-9fce-866995582943.gif)

This diagram renders the actual component where the change got introduced and all its children that are on a path
that is marked as dirty or has components with `ChangeDetectionStrategy.Default`.

A present triangle shows that `ChangeDetectionStrategy.OnPush` is used on the component.
Components that are marked as dirty show up with a red triangle. Those get always re-rendered.
Components with a grey triangle are untouched from re-evaluation of template or re-rendering.
Black triangles show us components with `OnPush` change detection. They weren't evaluated since no changes were detected.

![rx-angular-cdk-render-strategies__vanilla-angular-overrendering](https://user-images.githubusercontent.com/10064416/116155426-5bf0d500-a6ea-11eb-9cbc-5274a3bd0578.png)

As we can see in the diagram, the yellowish components get re-evaluated (if no re-rendered). This is unneeded work that slows down the performance of Angular.
In many cases, this leads to heavy refactorings to get the performance flaw out or even end up in situations where we can't fix the performance issues.

Strategies give us a way to control how Angular's rendering is executed and which render method is used.

**Strategy Sets:**
- [Basic Strategies](https://github.com/rx-angular/rx-angular/blob/master/libs/cdk/render-strategies/docs/basic-strategies.md)
- [Concurrent Strategies](https://github.com/rx-angular/rx-angular/blob/master/libs/cdk/render-strategies/docs/concurrent-strategies.md)

## Usage

### Configure existing features
```typescript
@Component({
  selector: 'immediate',
  template: `
    <button id="btn" (mouseenter)="showTooltip()" (mouseleave)="hideTooltip()">
      Button with Tooltip
    </button>
  `,
})
export class RenderCallbackComponent {
  constructor(private strategyProvider: RxStrategyProvider) {}

  showTooltip() {
    this.strategyProvider.schedule(
      () => {
        // create tooltip
      },
      { strategy: 'immediate' }
    );
  }

  hideTooltip() {
    this.strategyProvider.schedule(
      () => {
        // destroy tooltip
      },
      { strategy: 'immediate' }
    );
  }
}
```


### Custom Strategies

```typescript
export type RxRenderWork = <T = unknown>(
  cdRef: ChangeDetectorRef,
  scope?: coalescingObj,
  notification?: RxNotification<T>
) => void;

export type RxRenderBehavior = <T = unknown>(
  work: any,
  scope?: coalescingObj
) => (o: Observable<T>) => Observable<T>;

export interface RxStrategyCredentials<S = string> {
  name: S;
  work: RxRenderWork;
  behavior: RxRenderBehavior;
}

export type RxCustomStrategyCredentials<T extends string> = Record<
  T,
  RxStrategyCredentials
>;
export type RxNativeStrategyNames = 'native' | 'local' | 'global' | 'noop';

export type RxConcurrentStrategyNames =
  | 'immediate'
  | 'userBlocking'
  | 'normal'
  | 'low'
  | 'idle';

export type RxDefaultStrategyNames =
  | RxNativeStrategyNames
  | RxConcurrentStrategyNames;

export type RxStrategyNames<T> = RxDefaultStrategyNames | T;
export type RxStrategies<T extends string> = RxCustomStrategyCredentials<
  RxStrategyNames<T>
>;

export interface RxRenderStrategiesConfig<T extends string> {
  primaryStrategy?: RxStrategyNames<T>;
  customStrategies?: RxCustomStrategyCredentials<T>;
  patchZone?: boolean;
}
```
