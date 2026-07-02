---
id: prefer-no-lodash-is-equal
title: "prefer-no-lodash-is-equal"
diataxis_type: reference
package: eslint-plugin
legacy_guard: false
tags: [eslint-plugin, api-reference]
---

# prefer-no-lodash-is-equal

## What it flags

Usages of `isEqual` imported from Lodash (`lodash-es`). Deep structural equality can be costly; a hand-written comparison of the fields that matter is usually cheaper and clearer.

## Options

This rule has no options.

```js
// eslint.config.js (flat config)
import rxAngular from '@rx-angular/eslint-plugin';

export default [
  {
    plugins: { '@rx-angular': rxAngular },
    rules: {
      '@rx-angular/prefer-no-lodash-is-equal': 'error',
    },
  },
];
```

```json
// .eslintrc (legacy)
"rules": {
  "@rx-angular/prefer-no-lodash-is-equal": "error"
}
```

## ❌ Incorrect

```ts
import { isEqual } from 'lodash-es';

if (isEqual(prevObj, currObj)) {
  // ...
}
```

## ✅ Correct

```ts
if (
  prevObj.prop === currObj.prop &&
  prevObj.arr.length === currObj.arr.length &&
  prevObj.arr.every(
    (prevItem, i) =>
      prevItem.x === currObj.arr[i].x && prevItem.y === currObj.arr[i].y
  )
) {
  // ...
}
```

```ts
if (isEqual(prevObj, currObj)) {
  // ...
}

function isEqual<T>(a: T, b: T): boolean {
  return JSON.stringify(a) === JSON.stringify(b);
}
```

## Why

The immutability rationale (comparing serializable state cheaply instead of deep-equality on arbitrary objects) belongs to the [immutability & serializable state](../../../concepts/E7-immutability-and-serializable-state.md) concept.
