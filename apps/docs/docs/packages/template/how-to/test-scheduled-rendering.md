---
id: test-scheduled-rendering
title: "How to test components that use scheduled rendering"
diataxis_type: how-to
package: template
legacy_guard: false
sidebar_label: "Test scheduled rendering"
tags: [template, guides]
---

# How to test components that use scheduled rendering

**Goal.** Get deterministic, synchronous assertions in unit tests for components
that use `rxFor`, `rxIf`, `rxLet`, or `rxVirtualFor`.

**When to use.** By default these directives render through a **concurrent**
render strategy (`normal`), which runs change detection **asynchronously** across
frames. That is what you want in production (it keeps the UI responsive),
but in a test the DOM will not have updated by the time your assertion runs, so
expectations flake or fail. Switch the render strategy to `native` for the test
environment: it runs change detection **synchronously**, the same way Angular's
built-in `AsyncPipe` schedules, so the view is up to date the moment the microtask
settles.

This one recipe replaces the per-directive testing sections that previously
duplicated it on the `rxFor`, `rxIf`, and `rxLet` pages.

## Steps

### 1. Provide the `native` strategy in the test module

Set the primary strategy to `native` with `provideRxRenderStrategies`. Do this in
`TestBed.configureTestingModule` so every directive under test schedules
synchronously.

```ts
import { TestBed } from '@angular/core/testing';
import { provideRxRenderStrategies } from '@rx-angular/cdk/render-strategies';
import { RxLet } from '@rx-angular/template/let';
import { of } from 'rxjs';
import { Component } from '@angular/core';

@Component({
  imports: [RxLet],
  template: `<span *rxLet="value$; let value">{{ value }}</span>`,
})
class TestComponent {
  value$ = of(42);
}

function setupTestComponent() {
  TestBed.configureTestingModule({
    imports: [TestComponent],
    providers: [
      // run change detection synchronously in tests
      provideRxRenderStrategies({ primaryStrategy: 'native' }),
    ],
  });
}
```

The imports mirror the directive under test: swap in `RxFor` from
`@rx-angular/template/for`, `RxIf` from `@rx-angular/template/if`, or
`RxVirtualFor` from `@rx-angular/template/virtual-scrolling` as
needed. The `provideRxRenderStrategies` line is identical regardless of directive.

### 2. Await stability, then assert

Under zoneless change detection (default since Angular v21), prefer
`await fixture.whenStable()` over a manual `fixture.detectChanges()` call. Because
the `native` strategy schedules synchronously, the view is settled once the
returned promise resolves.

```ts
it('renders the bound value', async () => {
  const fixture = TestBed.createComponent(TestComponent);
  await fixture.whenStable();

  expect(fixture.nativeElement.textContent).toContain('42');
});
```

If your suite still runs with Zone.js, `fixture.detectChanges()` remains valid;
`whenStable()` works in both modes and is the portable choice.

### 3. (When needed) override a custom strategy instead of the primary one

If your component pins an explicit strategy (for example `[strategy]="'userBlocking'"`),
setting `primaryStrategy` alone will not redirect it; the component's own choice
wins. Redefine that named strategy so it behaves like `native` for the duration of
the test:

```ts
import {
  provideRxRenderStrategies,
  RX_NATIVE_STRATEGIES,
} from '@rx-angular/cdk/render-strategies';

provideRxRenderStrategies({
  primaryStrategy: 'native',
  customStrategies: {
    userBlocking: {
      ...RX_NATIVE_STRATEGIES.native,
      name: 'userBlocking',
    },
  },
});
```

Every directive, whether it falls back to the primary strategy or requests
`userBlocking`, now renders synchronously.

## Result

`TestBed.createComponent(...)` followed by `await fixture.whenStable()` leaves the
DOM fully rendered, so synchronous `expect(...)` assertions on
`fixture.nativeElement` pass deterministically. No fake timers, no `tick()`, no
polling for the async concurrent scheduler.

## See also

- Reference: [`rxFor`](../reference/rx-for.md)
- Reference: [`rxIf`](../reference/rx-if.md)
- Reference: [`rxLet`](../reference/rx-let.md)
- How-to: [Tune rendering with strategies](./tune-rendering-with-strategies.md)
- Concept: [Change detection](../../../concepts/E1-change-detection.md)
- Concept: [Concurrent scheduling & the frame budget](../../../concepts/E5-concurrent-scheduling.md)
