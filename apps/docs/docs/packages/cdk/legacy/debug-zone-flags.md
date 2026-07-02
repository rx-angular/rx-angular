---
id: debug-zone-flags
title: "How to debug zone flags"
diataxis_type: how-to
package: cdk
legacy_guard: "still-zoneful"
sidebar_label: "Debug zone flags (legacy)"
tags: [cdk, guides, migration]
concepts: [E2]
---

import LegacyGuard from '@site/src/components/LegacyGuard';

# How to debug zone flags

<LegacyGuard audience="still-zoneful">

Since **Angular v21, change detection is zoneless by default** and **Zone.js is
dropped from the default bundle**, a default v21 app has no Zone.js, so there
are no zone flags to debug. This technique applies only to apps still running
Zone.js (Angular &lt;21, or v21 with Zone.js opted back in). For new
applications, prefer the native zoneless path; see
[Zoneless &amp; how Zone.js affected change detection](../../../concepts/E2-zoneless-and-zonejs-change-detection.md).

</LegacyGuard>

## Goal

Confirm that a zone flag you set is taking effect, that Zone.js has
stopped patching the API you flagged.

## Setup

A minimal component whose handler schedules a timer:

```typescript
@Component({
  selector: 'app-name',
  template: `<div (click)="onClick()">click me</div>`,
})
export class AppComponent {
  onClick() {
    setTimeout(() => LOG, 0);
  }
}
```

Flag the `timers` API in `zone-flags.ts`:

```typescript
window.__Zone_disable_timers = true;
```

## Browser console

Besides patching APIs, Zone.js records the original (unpatched) versions on the
`globalThis` object (`window` in the browser) under a `__zone_symbol__` prefix.
Two checks:

1. **Is the flag set?** Read the flag directly:

   ```typescript
   console.log(window.__Zone_disable_timers); // true when the flag is active
   ```

2. **Did Zone.js patch the API?** When Zone.js patches an API it stashes the
   original under the zone symbol. If the symbol is `undefined`, Zone.js did not
   patch that API; the flag worked:

   ```typescript
   console.log(window.__zone_symbol__setTimeout);   // undefined ⇒ not patched
   console.log(window.__zone_symbol__clearTimeout);
   ```

### With `@rx-angular/cdk/zone-configurations`

Set the flag with the typed helper:

```typescript
import { zoneConfig } from '@rx-angular/cdk/zone-configurations';

zoneConfig.global.disable.timers();
```

And log all active flags at once with the debug helper it installs on `window`:

```typescript
window.__rxa_zone_config__log(); // logs all active flags
```

## DevTools performance tab

All executed JavaScript appears in flame charts, so you can compare a recording
with the flag on vs. off:

- Take two recordings (flags on, flags off) and diff them.
- Make the two recordings as identical as possible (same mouse moves, same
  waits) so the difference is easy to spot.
- Search the flame chart for `tick`; a hit indicates `ApplicationRef#tick` was
  most likely invoked by Zone.js. Fewer `tick` hits after flagging means the
  flag removed change-detection work.
- Enable **Timeline: event initiators** in DevTools experiments to trace who
  invoked a long timer curve.

## Timing marks

Zone.js's patching also shows up in the flame chart's **Timings** lane, before
Angular's bootstrap phase; every patched API is listed there. An API that no
longer appears in the timing lane is a further confirmation the flag took effect.

## Breakpoints

Navigate into the `zone.js` source in the Sources tab and set a breakpoint on the
patch for the API in question; if it is never hit, the API is unpatched.

## Result

For a working flag you should see: the flag reads back as set, the
`__zone_symbol__*` original is absent, and the API drops out of the flame chart's
timing lane.

## See also

- Reference: [`zoneConfig`](./zone-configurations.md)
- How-to: [Set up zone flags](./setup-zone-flags.md)
- Concept (legacy context): [Zoneless &amp; how Zone.js affected change detection](../../../concepts/E2-zoneless-and-zonejs-change-detection.md)
