---
title: 'How to set up zone flags'
package: cdk
sidebar_label: 'Set up zone flags'
sidebar_position: 5
tags: [cdk, guides, migration]
---

import LegacyGuard from '@site/src/components/LegacyGuard';

# How to set up zone flags

<LegacyGuard audience="apps still running Zone.js">

Since **Angular v21, change detection is zoneless by default** and **Zone.js is
dropped from the default bundle**, a default app has no Zone.js to
configure, so there are no zone flags to set up. Follow this recipe only if your
app still runs Zone.js. For
new applications, prefer the native zoneless path; see
[Zoneless &amp; how Zone.js affected change detection](../../../concepts/zoneless-and-zonejs-change-detection.md).

</LegacyGuard>

## Goal

In a Zone.js application, stop Zone.js from monkey-patching selected browser
APIs, so those APIs no longer trigger change detection. You do this by setting
**zone flags** before Zone.js initializes.

## Why order matters

Zone.js reads its flags off the `window` object the first time it initializes,
so the flag code must run **before** the `zone.js` import. Put the flags in their
own module and import it first. Do not set a flag inline right above the
`zone.js` import, because bundlers hoist all `import` statements to the top of
the file, ahead of any executable statements:

```typescript
// ❌ hoisted: the zone.js import runs before this assignment
window.__Zone_disable_XHR = true;
import 'zone.js';
```

```typescript
// ✅ the flags module is imported (and runs) before zone.js
import './zone-flags';
import 'zone.js';
```

## Steps (vanilla)

1. Create `zone-flags.ts` and set the flags directly on `window`:

   ```typescript
   (window as any).__Zone_disable_requestAnimationFrame = true;
   (window as any).__Zone_disable_timers = true;
   (window as any).__zone_symbol__UNPATCHED_EVENTS = ['load', 'error', 'close', 'open'];
   (window as any).__Zone_disable_XHR = true;
   ```

2. Import `zone-flags.ts` **before** `zone.js`. In an app that opts back into Zone.js, it is
   added as a polyfill in the build target rather than through a
   `polyfills.ts` file; add both imports to the target's `polyfills` array in
   `angular.json`, keeping `zone-flags` ahead of `zone.js`:

   ```jsonc
   // angular.json → architect.build.options
   "polyfills": ["src/zone-flags.ts", "zone.js"]
   ```

   In an older CLI project that still has a `polyfills.ts`, put the imports there
   in the same order:

   ```typescript
   // polyfills.ts
   import './zone-flags';
   import 'zone.js';
   ```

   Import `zone.js`, not `zone.js/dist/zone`; the `/dist/zone` deep path is
   obsolete.

## Steps (`@rx-angular/cdk/zone-configurations`)

The `zoneConfig` helper gives you typed methods, autocompletion, and an
assertion that errors if the flags run in the wrong order.

1. Create `zone-flags.ts` using `zoneConfig`:

   ```typescript
   import { zoneConfig } from '@rx-angular/cdk/zone-configurations';

   zoneConfig.global.disable.requestAnimationFrame();
   zoneConfig.global.disable.timers();
   zoneConfig.unpatchXHR();
   ```

   Disabling XHR patching is the top-level convenience method
   `zoneConfig.unpatchXHR()`: it disables the global `XHR` patch **and** unpatches
   the XHR events in one call. There is no `zoneConfig.events.disableXHR()`; the
   `events.disable` scope exposes only `UNPATCHED_EVENTS([...])` and
   `PASSIVE_EVENTS([...])`.

2. Import `zone-flags.ts` before `zone.js`, exactly as in the vanilla steps
   above (`angular.json` polyfills array, `zone-flags` first).

### Runtime settings (after Zone.js)

Runtime settings must run **after** Zone.js loads. Put them in a separate module
imported after `zone.js`:

```typescript
// zone-runtime.ts
import { zoneConfig } from '@rx-angular/cdk/zone-configurations';

zoneConfig.runtime.disable.ignoreConsoleErrorUncaughtError();
```

```jsonc
// angular.json → polyfills: zone-runtime after zone.js
"polyfills": ["src/zone-flags.ts", "zone.js", "src/zone-runtime.ts"]
```

## Result

The flagged APIs are no longer patched by Zone.js, so they stop triggering change
detection. If the flags run in the wrong order, `zoneConfig` logs a console.error; check the
console. You can confirm the active flags with the debug helper (see below).

## See also

- Reference: [`zoneConfig`](./zone-configurations.md)
- How-to: [Debug zone flags](./debug-zone-flags.md)
- Concept (legacy context): [Zoneless &amp; how Zone.js affected change detection](../../../concepts/zoneless-and-zonejs-change-detection.md)
