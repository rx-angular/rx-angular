# Logic comparison - Increment a Value

This snippet compares 3 different implementations of the same problem.
It serves as a small refactoring guide
and shows the difference of imperative and declarative/reactive programming.

This snippet uses the `rxLet` directive (`@rx-angular/template`, not released yet) as replacement for angulars `async` pipe.
All examples will work with the `async`.

**Problem**:
We have a component that:

- maintains a state `{ count: number }`
- displays the actual value of `count`
- increments the count over a button click binding

## Imperative

**State**:
The components' state is a simple object `state: { count: number } = {};`.

**Display**:
To display the value we use a template expression `{{ state.count }}`.
This expression gets reevaluated whenever the component re-renders.

**Action**:
The state gets incremented by one whenever the button gets clicked.
The click binding is set-up over an event binding `(click)` and fires the callback `onClick`.
This callback increments the state's `count` property, `this.state.count = this.state.count + 1;`

**Rendering**:
The click binding gets detected by zone which in turn flags this component and all of its ancestors as dirty.
This results in an `ApplicationRef.tick` call which re-renders all dirty flagged components.

```typescript
@Component({
  selector: 'my-comp',
  template: `
    <div>Value: {{ state.count }}</div>
    <button (click)="onClick($event)">Increment</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyComponent {
  state: { count: number } = {};
  onClick(e) {
    this.state.count = this.state.count + 1;
  }
}
```

## Reactive reading

**State**:
The components' state gets managed with `RxState` by extending the class. `export class MyComponent extends RxState<{ count: number }> {`
The components' state is a simple interface: `{ count: number }`.
Inside the class we expose our state as Observable `readonly state$ = this.select();`

**Display**:
To display the value we use a simple structural directive called `*rxLet` which binds the `state$` property of the component to its `host element`. We can then assign our state observable to a `local template variable`.

Whenever the bound Observable emits a new value the `rxLet` directive flags this component and all of its ancestors as dirty.

**Action**:
The state gets incremented by one whenever the button gets clicked.
The click binding is set-up over an event binding `(click)` and fires the callback `onClick`.
This callback increments the state's `count` property by sending the new value `this.set('count', s => s.count + 1);`

**Rendering**:
The click binding gets detected by zone which in turn flags this component and all of its ancestors as dirty.
This results in an `ApplicationRef.tick` call which re-renders all dirty flagged components.

```typescript
@Component({
  selector: 'my-comp',
  template: `
    <div *rxLet="state$; let s">Value: {{ s.count }}</div>
    <button (click)="onClick($event)">Increment</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyComponent extends RxState<{ count: number }> {
  state$ = this.select();
  onClick(e) {
    this.set('count', (s) => s.count + 1);
  }
}
```

## Reactive Writing

**State**:
The components' state gets managed with `RxState` by extending the class. `export class MyComponent extends RxState<{ count: number }> {`
The components state is a simple interface `{ count: number }`.
Inside the class we expose our state as Observable `readonly state$ = this.select();`

**Display**:
To display the value we use a a simple structural directive called `*rxLet` which binds the `state$` property of the component to its `host element`. We can then assign our state observable to a `local template variable`.

Whenever the bound Observable emits a new value the `rxLet` directive flags this component and all of its ancestors as dirty.

**Action**:
The state gets incremented by one whenever the button gets clicked.
In the class we use a Subject to track clicks `btn$ = new Subject();`.
The click binding is set-up over an event binding `(click)` and fires the Subjects `next` method.

This Observable gets connected to the components' state in the constructor `this.connect(btn$, (oldState, clickEvent) => ({ count: s.count + 1 }));`.
Whenever the Subject emits, we apply the increment logic passed as a function.
The function signature looks like this: `(oldState: T, newValue: T[K]) => T`.

**Rendering**:
The click binding gets detected by zone which in turn flags this component and all of its ancestors as dirty.
This results in an `ApplicationRef.tick` call which re-renders all dirty flagged components.

```typescript
@Component({
  selector: 'my-comp',
  template: `
    <div *rxLet="state$; let s">Value: {{ s.count }}</div>
    <button (click)="btn$.next($event)">Increment</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyComponent extends RxState<{ count: number }> {
  readonly state$ = this.select();
  readonly btn$ = new Subject();
  constructor() {
    this.connect(this.btn$, (s, e) => ({ count: s.count + 1 }));
  }
}
```

## Control rendering with `zoneless`

In this section we use the `zoneless` directive to get control over rendering.

The sections State ans Action are identical.
The Display has a small difference. We use the `zoneless` directive to get rid of renderings caused by the button eventListener.

Rendering:
A rerender gets only triggered by the `rxLet` directive. The process is the same as before.

```typescript
@Component({
  selector: 'my-comp',
  template: `
    <div *rxLet="state$; let s">Value: {{ s.count }}</div>
    <button [zoneless] (click)="btn$.next($event)">Increment</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyComponent extends RxState<{ count: number }> {
  state$ = this.select();
  btn$ = new Subject();
  constructor() {
    this.connect(this.btn$, (oldState, clickEvent) => ({ count: s.count + 1 }));
  }
}
```

## Control rendering direction with rendering strategies

In this section we use the `strategy` option of the `rxLet` directive to get advanced control over rendering.

The sections **State** and **Action** are identical to the previous examples.

**Rendering**:
The rendering still gets managed by the `rxLet` Directive. But with the `strategy` set to `local` changes will not result in a re-render of any ancestor component. Thus saving you tons of rendering cycles.

```typescript
@Component({
  selector: 'my-comp',
  template: `
    <div *rxLet="state$; let s; strategy: 'local'">Value: {{ s.count }}</div>
    <button [zoneless] (click)="btn$.next($event)">Increment</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyComponent extends RxState<{ count: number }> {
  state$ = this.select();
  btn$ = new Subject();
  constructor() {
    this.connect(this.btn$, (s, e) => ({ count: s.count + 1 }));
  }
}
```
