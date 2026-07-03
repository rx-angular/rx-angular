---
id: no-zone-critical-lodash-apis
title: 'no-zone-critical-lodash-apis'
diataxis_type: reference
package: eslint-plugin
legacy_guard: 'Zone.js only'
sidebar_label: 'no-zone-critical-lodash-apis'
tags: [eslint-plugin, api-reference, migration]
concepts: [E2]
---

import LegacyGuard from '@site/src/components/LegacyGuard';

# no-zone-critical-lodash-apis

<LegacyGuard audience="Zone.js only">

This rule only does anything when **Zone.js is present**. Since Angular v21, change
detection is zoneless by default and Zone.js is dropped from the default bundle, so
there is nothing to patch and this rule is a no-op. See
[Zoneless &amp; how Zone.js affected change detection](../../../concepts/E2-zoneless-and-zonejs-change-detection.md).

</LegacyGuard>

## What it flags

Calls to `lodash-es` helpers that internally rely on Zone-patched scheduling APIs:
`throttle` and `debounce` (which use `requestAnimationFrame`), and `delay`, `defer`,
`now` (which use `setTimeout`). The rule only fires when the helper is imported from
`lodash-es`.

## Options

This rule has no options (`schema: []`).

```jsonc
// eslintrc
{
  "rules": {
    "@rx-angular/no-zone-critical-lodash-apis": "error",
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
      '@rx-angular/no-zone-critical-lodash-apis': 'error',
    },
  },
];
```

## Incorrect

```ts
// ❌ Incorrect — debounce/delay schedule work through Zone-patched timers
import { debounce, delay } from 'lodash-es';

const debouncedHandleHover = debounce(handleHover, 500);

for (let i = 1; i <= 5; i++) {
  delay(console.log, 2000 * (i + 1), i);
}
```

## Correct

```ts
// ✅ Correct — in a zoneless app (v21+) the underlying timers no longer trigger
// change detection, so the plain lodash-es helpers are fine as-is.
import { debounce, delay } from 'lodash-es';

const debouncedHandleHover = debounce(handleHover, 500);

for (let i = 1; i <= 5; i++) {
  delay(console.log, 2000 * (i + 1), i);
}
```

For the residual Zone.js case, prefer moving the scheduling to an unpatched timer
(`@rx-angular/cdk/zone-less/browser`, or `getZoneUnPatchedApi` from
`@rx-angular/cdk/internals/core`) rather than reaching for a Zone-aware lodash
wrapper.

## Why

Lodash helpers that build on Zone-patched schedulers can trigger unnecessary
change-detection runs.
Why &rarr; [Zoneless &amp; how Zone.js affected change detection](../../../concepts/E2-zoneless-and-zonejs-change-detection.md).
