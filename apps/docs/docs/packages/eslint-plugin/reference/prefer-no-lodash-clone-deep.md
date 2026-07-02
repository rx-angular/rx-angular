---
id: prefer-no-lodash-clone-deep
title: "prefer-no-lodash-clone-deep"
diataxis_type: reference
package: eslint-plugin
legacy_guard: false
tags: [eslint-plugin, api-reference]
---

# prefer-no-lodash-clone-deep

## What it flags

Usages of `cloneDeep` imported from Lodash (`lodash-es`). It is a costly operation and should be reserved for cases that need it; the native `structuredClone` or a targeted shallow/deep spread is usually enough.

## Options

This rule has no options.

```js
// eslint.config.js (flat config)
import rxAngular from '@rx-angular/eslint-plugin';

export default [
  {
    plugins: { '@rx-angular': rxAngular },
    rules: {
      '@rx-angular/prefer-no-lodash-clone-deep': 'error',
    },
  },
];
```

```json
// .eslintrc (legacy)
"rules": {
  "@rx-angular/prefer-no-lodash-clone-deep": "error"
}
```

## ❌ Incorrect

```ts
import { cloneDeep } from 'lodash-es';

const clone = cloneDeep(orig);
```

## ✅ Correct

```ts
// see: https://developer.mozilla.org/en-US/docs/Web/API/structuredClone
const clone = structuredClone(original);
```

```ts
type T = {
  prop: string;
  arr: { x: number; y: number }[];
};

const shallowClone: T = { ...orig };
const deepClone: T = { ...orig, arr: orig.arr.map((item) => ({ ...item })) };
```

```ts
import { cloneDeep } from './utils';

const clone = cloneDeep(orig);
```

## Why

The immutability rationale (why cheap, native cloning of serializable state is preferred) belongs to the [immutability & serializable state](../../../concepts/E7-immutability-and-serializable-state.md) concept.
