---
title: 'no-zone-run-apis'
package: eslint-plugin
sidebar_label: 'no-zone-run-apis'
sidebar_position: 10
tags: [eslint-plugin, api-reference, migration]
---

import LegacyGuard from '@site/src/components/LegacyGuard';

# no-zone-run-apis

<LegacyGuard audience="apps still running Zone.js">

This rule only does anything when **Zone.js is present**. Since Angular v21, change
detection is zoneless by default and Zone.js is dropped from the default bundle, so
there is nothing to patch and this rule is a no-op. See
[Zoneless &amp; how Zone.js affected change detection](/docs/concepts/zoneless-and-zonejs-change-detection).

</LegacyGuard>

## What it flags

`NgZone` control-flow calls (`run`, `runGuarded`, `runTask`, and `runOutsideAngular`)
on an injected `NgZone`. `run`/`runGuarded`/`runTask` re-enter the Angular zone and
trigger a change-detection cycle across the whole app; `runOutsideAngular` adds
overhead and is easy to misuse. The rule only reports when `NgZone` is imported.

## Options

This rule has no options (`schema: []`).

```jsonc
// eslintrc
{
  "rules": {
    "@rx-angular/no-zone-run-apis": "error",
  },
}
```

```js
// eslint.config.js (flat config)
import rxAngular from '@rx-angular/eslint-plugin';

export default [
  {
    plugins: { '@rx-angular': rxAngular },
    rules: {
      '@rx-angular/no-zone-run-apis': 'error',
    },
  },
];
```

## Incorrect

```ts
// ❌ Incorrect — NgZone.run / runOutsideAngular steer Zone-based change detection
import { Component, NgZone } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectFoo } from '../../store/foo/foo.selectors';

@Component({
  templateUrl: './foo.component.html',
})
export class FooComponent {
  constructor(
    private zone: NgZone,
    private store: Store,
  ) {
    setTimeout(() => {
      this.zone.runOutsideAngular(() => {
        // ...
      });
    }, 500);
  }

  handleEvent(event: any) {
    this.store.select(selectFoo).subscribe((value) => {
      this.zone.run(() => {
        // ...
      });
    });
  }
}
```

## Correct

```ts
// ✅ Correct — in a zoneless app (v21+) there is no zone to enter or leave, so the
// NgZone.run* calls are removed entirely. Drive the view with signals (which mark
// the component automatically), or markForCheck() for the rare manual OnPush case.
import { ChangeDetectorRef, Component, inject, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectFoo } from '../../store/foo/foo.selectors';

@Component({
  templateUrl: './foo.component.html',
})
export class FooComponent {
  private readonly store = inject(Store);
  private readonly cdRef = inject(ChangeDetectorRef);

  readonly foo = signal<Foo | undefined>(undefined);

  handleEvent(event: Event) {
    this.store.select(selectFoo).subscribe((value) => {
      this.foo.set(value); // signal write schedules CD; no zone.run needed
    });
  }
}
```

:::note `NgZone.run*` no-ops under `NoopNgZone`
In a zoneless app Angular provides `NoopNgZone`, so `run`, `runGuarded`, `runTask`,
and `runOutsideAngular` do nothing useful: they only invoke the callback. The fix is
to **remove the calls**, not swap them for another wrapper, and let signals (or
`markForCheck`) drive change detection.
:::

## Why

`NgZone` run APIs steer Zone-based change detection and can trigger whole-app cycles.
Why &rarr; [Zoneless &amp; how Zone.js affected change detection](/docs/concepts/zoneless-and-zonejs-change-detection).
