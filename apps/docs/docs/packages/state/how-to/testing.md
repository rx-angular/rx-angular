---
id: testing
title: "How to test components and services that use RxState"
diataxis_type: how-to
package: state
legacy_guard: false
sidebar_label: "Test RxState"
sidebar_position: 7
tags: [state, guides]
concepts: [E3]
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# How to test components and services that use RxState

## Goal

Unit-test state and its transformations when using `@rx-angular/state`. There are two levels: test the **behaviour of a whole component** through its DOM, or test the **state and its transformations in isolation**. This page uses `jest`, but the mechanics carry to any runner.

:::info
Make sure you are familiar with the basics of testing Angular applications: the [official testing guide](https://angular.dev/guide/testing) and [component testing basics](https://angular.dev/guide/testing/components-basics).
:::

:::tip

- Keep tests unrelated to implementation details as much as possible.
- Testing a component through its DOM nodes rather than the component instance is a best practice.

:::

## Test a component through the DOM

Drive the component through its rendered output. Under zoneless change detection (default since Angular v21), await `fixture.whenStable()` to flush pending change detection instead of calling `fixture.detectChanges()` synchronously.

<Tabs>

<TabItem value="component" label="counter.component.ts">

```typescript title="/src/counter.component.ts"
import { rxState } from '@rx-angular/state';
import { Component } from '@angular/core';
import { Subject, map, merge } from 'rxjs';

@Component({
  selector: 'rx-counter',
  template: `
    <button id="increment" (click)="increment.next()">Increment</button>
    <button id="decrement" (click)="decrement.next()">Decrement</button>
    <div id="counter">{{ count() }}</div>
  `,
})
export class CounterComponent {
  readonly increment = new Subject<void>();
  readonly decrement = new Subject<void>();

  private readonly state = rxState<{ count: number }>(({ connect, set }) => {
    set({ count: 0 });
    connect(
      'count',
      merge(
        this.increment.pipe(map(() => 1)),
        this.decrement.pipe(map(() => -1)),
      ),
      ({ count }, slice) => count + slice,
    );
  });

  // signals-first template surface
  readonly count = this.state.signal('count');
}
```

</TabItem>

<TabItem value="spec" label="counter.component.spec.ts">

```typescript title="/src/counter.component.spec.ts"
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CounterComponent } from './counter.component';

describe('CounterComponent', () => {
  let fixture: ComponentFixture<CounterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CounterComponent],
    });
    fixture = TestBed.createComponent(CounterComponent);
  });

  it('should increment', async () => {
    const incrementButton = fixture.debugElement.query(By.css('#increment'));
    incrementButton.triggerEventHandler('click', null);
    await fixture.whenStable();
    expect(
      fixture.debugElement.query(By.css('#counter')).nativeElement.textContent,
    ).toBe('1');
  });

  it('should decrement', async () => {
    const decrementButton = fixture.debugElement.query(By.css('#decrement'));
    decrementButton.triggerEventHandler('click', null);
    await fixture.whenStable();
    expect(
      fixture.debugElement.query(By.css('#counter')).nativeElement.textContent,
    ).toBe('-1');
  });
});
```

</TabItem>

</Tabs>

## Assert the state signal directly

When you do not need the DOM, assert the state's signal surface on the component instance. No fixture stabilisation is required, since a signal read returns the current value synchronously.

```typescript title="/src/counter.component.spec.ts"
it('should expose the incremented count as a signal', () => {
  const fixture = TestBed.createComponent(CounterComponent);
  const component = fixture.componentInstance;

  fixture.debugElement
    .query(By.css('#increment'))
    .triggerEventHandler('click', null);

  // read the signal directly — no whenStable(), no async pipe
  expect(component.count()).toBe(1);
});
```

## Test state transformations in isolation

To test the state and its transformations on their own, use the `TestScheduler` from `rxjs/testing` with marble diagrams against the `select`-backed `Observable`.

<Tabs>

<TabItem value="state" label="counter.service.ts">

```typescript title="/src/counter.service.ts"
import { rxState } from '@rx-angular/state';
import { Injectable } from '@angular/core';
import { Subject, map, merge } from 'rxjs';

@Injectable()
export class CounterService {
  readonly increment = new Subject<void>();
  readonly decrement = new Subject<void>();

  private readonly state = rxState<{ count: number }>(({ connect, set }) => {
    set({ count: 0 });
    connect(
      'count',
      merge(
        this.increment.pipe(map(() => 1)),
        this.decrement.pipe(map(() => -1)),
      ),
      ({ count }, slice) => count + slice,
    );
  });

  readonly count$ = this.state.select('count');
}
```

</TabItem>

<TabItem value="spec" label="counter.service.spec.ts">

```typescript title="/src/counter.service.spec.ts"
import { TestScheduler } from 'rxjs/testing';
import { TestBed } from '@angular/core/testing';
import { CounterService } from './counter.service';

const testScheduler = new TestScheduler((actual, expected) => {
  expect(actual).toEqual(expected);
});

describe('CounterService', () => {
  let service: CounterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CounterService],
    });
    service = TestBed.inject(CounterService);
  });

  it('should increment', () => {
    testScheduler.run(({ expectObservable }) => {
      service.increment.next();
      expectObservable(service.count$).toBe('a', { a: 1 });
    });
  });

  it('should decrement', () => {
    testScheduler.run(({ expectObservable }) => {
      service.decrement.next();
      expectObservable(service.count$).toBe('a', { a: -1 });
    });
  });
});
```

</TabItem>

</Tabs>

## Result

Both test styles pass without touching RxState internals: the DOM test proves the wired-up behaviour, the signal assertion proves the state surface, and the marble test proves the transformation in isolation.

## See also

- Reference: [`RxState` (functional)](../reference/rx-state-functional.md) · [`select`](../reference/select.md)
- Concept: [Reactive state: global vs local, RxState + signals](../../../concepts/E3-reactive-state-global-vs-local.md)
