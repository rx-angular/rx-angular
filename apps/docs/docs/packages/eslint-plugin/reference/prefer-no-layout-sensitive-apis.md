---
id: prefer-no-layout-sensitive-apis
title: 'prefer-no-layout-sensitive-apis'
diataxis_type: reference
package: eslint-plugin
legacy_guard: false
tags: [eslint-plugin, api-reference]
---

# prefer-no-layout-sensitive-apis

## What it flags

Access to layout-sensitive DOM APIs (`offsetLeft`, `scrollTop`, `clientWidth`, `getBoundingClientRect()`, `scrollIntoView()`, and similar) that force a synchronous style/layout recalculation.

## Options

This rule has no options.

```js
// eslint.config.js (flat config)
import rxAngular from '@rx-angular/eslint-plugin';

export default [
  {
    plugins: { '@rx-angular': rxAngular },
    rules: {
      '@rx-angular/prefer-no-layout-sensitive-apis': 'error',
    },
  },
];
```

```json
// .eslintrc (legacy)
"rules": {
  "@rx-angular/prefer-no-layout-sensitive-apis": "error"
}
```

## ❌ Incorrect

```ts
el.offsetLeft += 10;
```

```ts
el.scrollTop = 0;
```

```ts
const { innerWidth: elemWidth } = elem;
```

```ts
const { x, y, width, height } = el.getBoundingClientRect();
```

```ts
el.scrollIntoView();
```

```ts
const orientation = el.clientHeight > el.clientWidth ? 'portrait' : 'landscape';
```

## ✅ Correct

```ts
const el = document.getElementById('myEl');
el.addEventListener('click', () => {
  console.log('element clicked');
});
```

## Why

See [Understanding change detection in Angular](../../../concepts/E1-change-detection.md).
