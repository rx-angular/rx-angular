---
id: zone-configurations
title: "zoneConfig"
diataxis_type: reference
package: cdk
legacy_guard: "Angular <21 / still running Zone.js"
sidebar_label: "zoneConfig (legacy)"
tags: [cdk, api-reference, migration]
concepts: [E2]
---

import LegacyGuard from '@site/src/components/LegacyGuard';

# `zoneConfig`

<LegacyGuard audience="Angular <21 / still running Zone.js">

Since **Angular v21, change detection is zoneless by default** and **Zone.js is
dropped from the default bundle**, a default v21 app ships no Zone.js, so there
are no zone flags to tune. `zoneConfig` only does anything when Zone.js is
present. Use this reference only if you are on Angular &lt;21, or on v21
with Zone.js opted back in, or migrating a brownfield app that still runs
Zone.js. For new applications, prefer the native zoneless path; see
[Zoneless &amp; how Zone.js affected change detection](../../../concepts/E2-zoneless-and-zonejs-change-detection.md).

</LegacyGuard>

`zoneConfig` is the typed entry point from `@rx-angular/cdk/zone-configurations`
for setting Zone.js zone-flags before Zone.js initializes. Zone-flags tell
Zone.js which browser APIs **not** to monkey-patch, which removes the change
detection those APIs would otherwise trigger.

## Import

```typescript
import { zoneConfig } from '@rx-angular/cdk/zone-configurations';
```

The correct subpath is `@rx-angular/cdk/zone-configurations`. There is no
`@rx-angular/cdk/zone-config` entry point.

## Shape

`zoneConfig` exposes four scopes plus two convenience methods:

```typescript
zoneConfig.global.disable.<flag>();     // patch-time global flags
zoneConfig.events.disable.<method>([...eventNames]);
zoneConfig.runtime.disable.<flag>();    // after-zone runtime settings
zoneConfig.test.disable.<flag>();       // test-bundle flags

zoneConfig.unpatchXHR();                // convenience
zoneConfig.useUnpatchedPassiveScrollEvents();
```

Each `disable.*` member is a function you **call**; invoking it writes the
corresponding `window` flag. Global, events, and test flags must run **before**
Zone.js is imported; runtime settings must run **after**.

## `zoneConfig.global.disable`

Each key below is a method that disables Zone.js patching of that global API
(sets the matching `__Zone_disable_*` / `__zone_symbol__*` flag). Names mirror
`RxZoneGlobalDisableConfigurationsKey`.

| Method | Disables patching of |
| --- | --- |
| `EventTarget()` | `EventTarget.addEventListener` / `removeEventListener` |
| `EventTargetLegacy()` | legacy event-target patching |
| `timers()` | `setTimeout` / `setInterval` |
| `requestAnimationFrame()` | `requestAnimationFrame` |
| `XHR()` | `XMLHttpRequest` |
| `blocking()` | `alert` / `confirm` / `prompt` |
| `FileReader()` | `FileReader` |
| `MutationObserver()` | `MutationObserver` |
| `IntersectionObserver()` | `IntersectionObserver` |
| `geolocation()` | `navigator.geolocation` |
| `canvas()` | `HTMLCanvasElement.toBlob` |
| `customElements()` | custom-elements callbacks |
| `on_property()` | `on*` property handlers |
| `defineProperty()` | `Object.defineProperty` patch |
| `registerElement()` | `document.registerElement` |
| `ZoneAwarePromise()` | `Promise` |
| `EventEmitter()`, `fs()`, `node_timers()`, `nextTick()`, `crypto()` | Node-only APIs |

## `zoneConfig.events.disable`

Two methods, each taking an array of event names. This scope exposes **only**
these two members; there is no `events.disableXHR()` or any other per-API
helper here.

| Method | Effect |
| --- | --- |
| `UNPATCHED_EVENTS(eventNames: string[])` | run the named events' listeners outside Zone.js (`__zone_symbol__UNPATCHED_EVENTS`) |
| `PASSIVE_EVENTS(eventNames: string[])` | register the named events as passive listeners (`__zone_symbol__PASSIVE_EVENTS`) |

Predefined event-name arrays are exported from the same subpath (`mouseEvents`,
`keyboardEvents`, `wheelEvents`, `inputEvents`, `touchEvents`, `xhrEvents`,
`focusEvents`, …); pass them into these methods instead of hand-typing strings.

## `zoneConfig.runtime.disable`

| Method | Effect |
| --- | --- |
| `ignoreConsoleErrorUncaughtError()` | stop Zone.js from wrapping uncaught errors reported to the console |

Runtime settings must be applied **after** Zone.js has loaded.

## `zoneConfig.test.disable`

Test-bundle flags (`jasmine()`, `mocha()`, `jest()`, …)
for `zone-testing`. Relevant only to a Zone.js-based test setup.

## Convenience methods

| Method | Equivalent to |
| --- | --- |
| `zoneConfig.unpatchXHR()` | `global.disable.XHR()` **and** `events.disable.UNPATCHED_EVENTS([...xhrEvents])` |
| `zoneConfig.useUnpatchedPassiveScrollEvents()` | `events.disable.PASSIVE_EVENTS(['scroll'])` **and** `events.disable.UNPATCHED_EVENTS(['scroll'])` |

## Minimal example

```typescript
// zone-flags.ts — imported before zone.js
import { zoneConfig } from '@rx-angular/cdk/zone-configurations';

zoneConfig.global.disable.requestAnimationFrame();
zoneConfig.global.disable.timers();
zoneConfig.unpatchXHR();
```

## See also

- Concept (legacy context): [Zoneless &amp; how Zone.js affected change detection](../../../concepts/E2-zoneless-and-zonejs-change-detection.md)
- How-to: [Set up zone flags](./setup-zone-flags.md)
- How-to: [Debug zone flags](./debug-zone-flags.md)
