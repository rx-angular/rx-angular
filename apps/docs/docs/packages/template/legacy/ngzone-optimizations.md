---
id: ngzone-optimizations
title: 'How to run rx-template listeners outside NgZone (patchZone)'
diataxis_type: how-to
package: template
legacy_guard: 'Zone.js only'
sidebar_label: 'NgZone optimizations (legacy)'
tags: [template, guides, migration]
---

import LegacyGuard from '@site/src/components/LegacyGuard';

# Running listeners outside `NgZone` with `patchZone`

<LegacyGuard audience="Zone.js only">

`patchZone` controls whether a `@rx-angular/template` directive processes its
updates inside `NgZone`. Setting `patchZone: false` only matters when Zone.js is
present: under **zoneless** change detection there is no `NgZone` cycle to avoid,
so the option is **inert**. This recipe applies only to apps still running
Zone.js with high-frequency event listeners.

</LegacyGuard>

## Goal

In a Zone.js application, keep a directive's high-frequency updates (and the
event handlers bound inside its view) from triggering `NgZone` change detection
cycles, by processing them outside the zone.

## Why it helps (Zone.js only)

By default a directive such as `*rxLet` processes updates inside `NgZone`. When
those updates come in batches, each batch triggers an `NgZone` cycle: extra work
and possible over-rendering of unrelated components. Setting `patchZone: false`
runs the directive's view creation and its bound listeners outside `NgZone`.

Note the trade-off: handlers bound inside a `patchZone: false` view also run
outside `NgZone`, so state they change is **not** automatically picked up by
change detection.

## Per-directive: the `patchZone` input

```typescript
import { Component } from '@angular/core';
import { RxLet } from '@rx-angular/template/let';

@Component({
  selector: 'app-root',
  imports: [RxLet],
  template: `
    <!-- clickedHeroName won't update: the click runs outside NgZone -->
    {{ clickedHeroName }}
    <button *rxLet="heroes$; let hero; patchZone: false" (click)="heroClicked(hero)">
      {{ hero.name }}
    </button>
  `,
})
export class AppComponent {
  clickedHeroName = '';

  heroClicked(hero: Hero) {
    // runs outside NgZone and will probably not update the DOM
    this.clickedHeroName = hero.name;
  }
}
```

## Globally: `provideRxRenderStrategies`

Set the default for every directive with `provideRxRenderStrategies`. Its
`patchZone` default is `true`.

```typescript
import { provideRxRenderStrategies } from '@rx-angular/cdk/render-strategies';
import { ApplicationConfig } from '@angular/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRxRenderStrategies({
      patchZone: false, // applies to all rx-template directives
    }),
  ],
};
```

## Result

In a Zone.js app, the directive's updates and the listeners inside its view no
longer trigger `NgZone` cycles. Under zoneless change detection this
configuration has no effect.

For the `patchZone` option alongside the other rendering controls, see
[How to tune rendering with strategies](../how-to/tune-rendering-with-strategies.md).

## See also

- Concept (legacy context): [Zoneless & how Zone.js affected change detection](../../../concepts/E2-zoneless-and-zonejs-change-detection.md)
- How-to: [Tune rendering with strategies](../how-to/tune-rendering-with-strategies.md)
