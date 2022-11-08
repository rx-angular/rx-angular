# How to set up zone flags

## Resources

**Example application:**
A demo application is available on [GitHub](https://github.com/BioPhoton/rx-angular-cdk-zone-configuration).

## Concepts

### The patching mechanism

API patching or monkey-patching means we take an existing API and override its behavior globally or in specific places.

An example on what zone.js is doing under the hood can look like this:

```typescript
const originalMethod = EventTarget.prototype.addEventListener;

const patchedAddEventListener = (eventName, originalCallback, useCapture) => {
  console.log(`Add event listener for ${eventName}`);

  const patchedCallback = (event) => {
    console.log(`Fire ${eventName} callback for with event ${event}`);
    if (__zone_symbol__UNPATCHED_EVENTS.includes(eventName)) {
      return originalCallback(event);
    }
    // wrap callback in zone
  };
  return originalMethod.apply(this, [type, patchedCallback, useCapture]);
};

EventTarget.prototype.addEventListener = patchedAddEventListener;
```

Here we patch the global `addEventListener` API.
Every fired event in the Browser will now pass our patch from above.

### The flagging mechanism

When `zone.js` is first time initialised on the page, it takes values of flags already located in `window` object.
So it's important to set them **before `zone.js` is init**. So we need to inject `zone-flags.js` code **above** the zone code.

```typescript
import './zone-flags';
import 'zone.js/dist/zone';
```

![Zone-flags import order](https://raw.githubusercontent.com/rx-angular/rx-angular/main/libs/cdk/zone-configurations/docs/images/angular-zone-flags_import-order_michael-hladky.png)

It is **not efficient** to do like that:
![Webpack import hoisting](https://raw.githubusercontent.com/rx-angular/rx-angular/main/libs/cdk/zone-configurations/docs/images/angular-zone-flags_webpack-import-hoisting_michael-hladky.png)

```typescript
window.__Zone_disable_XHR = true;
import 'zone.js/dist/zone';
```

Because all imports get hoisted by webpack and then imported code is injected into a bundle before any meaningful JS in the file itself.

## Set up using vanilla JavaScript

1. Create file `zone-flags.ts` parallel to your `polyfills.ts` and insert the following content:

```typescript
(window as any).__Zone_disable_requestAnimationFrame = true;
(window as any).__Zone_disable_timers = true;
(window as any).__zone_symbol__UNPATCHED_EVENTS = [
  'load',
  'error',
  'close',
  'open',
];
(window as any).__Zone_disable_XHR = true;
```

2. In `polyfills.ts` above the zone import, import `zone-flags.ts`:

```typescript
// ☝️ Make sure zone-flags are imported before zone.js
import './zone-flags';
// Zone JS is required by default for Angular itself.
import 'zone.js/dist/zone';
```

## Set up using `@rx-angular/cdk/zone-configuration` helpers

1. Create file `zone-flags.ts` next to your `polyfills.ts` and insert the following content:

```typescript
import { zoneConfig } from '@rx-angular/cdk/zone-flags';

zoneConfig.global.disable.requestAnimationFrame();
zoneConfig.global.disable.timers();
zoneConfig.events.disableXHR();
```

In this file, we disable some global APIs and a couple of DOM events by using the typed methods and extra convenience methods.

As you type, you will see `zoneConfig` provides autocompletion:
![IDE autocomplete for zoneConfig methods](https://raw.githubusercontent.com/rx-angular/rx-angular/main/libs/cdk/zone-configurations/docs/images/angular-zone-flags_ide-documentation-zoneConfig-api.png)
![IDE autocomplete for zoneConfig](https://raw.githubusercontent.com/rx-angular/rx-angular/main/libs/cdk/zone-configurations/docs/images/angular-zone-flags_ide-documentation-zoneConfig-global-flags.png)

As well as inline documentation of scopes, methods and configuration details in the IDE:
![IDE documentation for zoneConfig](https://raw.githubusercontent.com/rx-angular/rx-angular/main/libs/cdk/zone-configurations/docs/images/angular-zone-flags_ide-documentation-zoneConfig.png)
![IDE documentation for zoneConfig](https://raw.githubusercontent.com/rx-angular/rx-angular/main/libs/cdk/zone-configurations/docs/images/angular-zone-flags_ide-documentation-zoneConfig-global.png)
![IDE documentation for zoneConfig](https://raw.githubusercontent.com/rx-angular/rx-angular/main/libs/cdk/zone-configurations/docs/images/angular-zone-flags_ide-documentation-zoneConfig-global-flags-timers.png)

2. In `polyfills.ts` above the zone import, import `zone-flags.ts`:

```typescript
// ☝️ Make sure zoneflags are imported before zone.js
import './zone-flags';
// Zone JS is required by default for Angular itself.
import 'zone.js/dist/zone';
```

> **💡 Pro Tip:** > `@rx-angular/cdk/zone-configuration` errors if it is used incorrectly.
> If you used zone-flags wrong (not executing it before zone.js runs) you should see the following error in the console:
> ![Log zone-flags](https://raw.githubusercontent.com/rx-angular/rx-angular/main/libs/cdk/zone-configurations/docs/images/angular-zone-flags_log-zone-flags_michael-hladky.png)

## Configure Zone runtime settings using `@rx-angular/cdk/zone-configuration` helpers

1. Create file `zone-runtime.ts` parallel to your `polyfills.ts` and insert the following content:

```typescript
import { zoneConfig } from '@rx-angular/cdk/zone-flags';

zoneConfig.runtime.disable.ignoreConsoleErrorUncaughtError();
```

2. In `polyfills.ts` below the zone import, import `zone-runtime.ts`:

```typescript
// Zone JS is required by default for Angular itself.
import 'zone.js/dist/zone';
// ☝️ Make sure zoneflags are imported before zone.js
import './zone-runtime';
```

> **💡 Pro Tip:** > `@rx-angular/cdk/zone-configuration` errors if it is used incorrectly.
> If you used zone-runtime configurations wrong (not executing it after zone.js runs) you should see the following error in the console:
> ![Log zone-runtime](https://raw.githubusercontent.com/rx-angular/rx-angular/main/libs/cdk/zone-configurations/docs/images/angular-zone-flags_log-zone-flags-runtime_michael-hladky.png)
