---
id: no-explicit-change-detection-apis
title: 'no-explicit-change-detection-apis'
diataxis_type: reference
package: eslint-plugin
legacy_guard: false
tags: [eslint-plugin, api-reference]
---

# no-explicit-change-detection-apis

## What it flags

Explicit calls to change-detection APIs — viewEngine member calls (`ChangeDetectorRef.detectChanges()`, `ChangeDetectorRef.markForCheck()`) and Ivy standalone calls (`ɵdetectChanges()`, `detectChanges()`, `ɵmarkDirty()`, `markDirty()`). Reaching for these by hand usually signals that the framework is being prevented from scheduling change detection on its own.

## Options

This rule has no options.

```js
// eslint.config.js (flat config)
import rxAngular from '@rx-angular/eslint-plugin';

export default [
  {
    plugins: { '@rx-angular': rxAngular },
    rules: {
      '@rx-angular/no-explicit-change-detection-apis': 'error',
    },
  },
];
```

```json
// .eslintrc (legacy)
"rules": {
  "@rx-angular/no-explicit-change-detection-apis": "error"
}
```

## ❌ Incorrect

```ts
@Component({
  template: '<div>{{ data }}</div>',
})
class NotOkDetectChangesComponent {
  data: TData;

  constructor(service: SomeService, cdRef: ChangeDetectorRef) {
    service.getData().subscribe((data) => {
      this.data = data;
      cdRef.detectChanges();
    });
  }
}
```

```ts
@Component({
  template: '<div>{{ data }}</div>',
})
class NotOkMarkForCheckComponent {
  data: TData;

  constructor(
    private service: SomeService,
    private cdRef: ChangeDetectorRef,
  ) {
    this.service.getData().subscribe((data) => {
      this.data = data;
      this.cdRef.markForCheck();
    });
  }
}
```

The rule also applies to Ivy standalone calls, not just `ChangeDetectorRef` methods:

```ts
import { detectChanges } from '@angular/core';

function refresh(componentRef: MyComponent) {
  detectChanges(componentRef);
}
```

## ✅ Correct

```ts
@Component({
  template: '<div>{{ data$ | async }}</div>',
})
class OkComponent {
  readonly data$: Observable<any>;

  constructor(service: SomeService) {
    this.data$ = service.getData();
  }
}
```

```ts
@Component({
  template: '<div>{{ data }}</div>',
})
class OkishComponent {
  data: any;

  constructor(service: SomeService) {
    service.getData().subscribe((data) => {
      this.data = data;
    });
  }
}
```

The rule still applies under zoneless change detection (default since Angular v21): prefer the `async` pipe or signals so reads auto-track and the framework schedules change detection for you, rather than calling `detectChanges`/`markForCheck` by hand.

## Why

See [Understanding change detection in Angular](../../../concepts/E1-change-detection.md).
