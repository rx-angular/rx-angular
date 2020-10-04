# Zone Configuration
  
  ## Event Coalescing

  ```typescript
  // main.ts

  platformBrowserDynamic()
  .bootstrapModule(AppModule, { ngZoneEventCoalescing: true })
  .catch(err => console.error(err));
  ```

  ## Global API patching

  ```typescript
  // main.ts
  import { disableGlobalAPIs, globalAPIs } from './zone-global-aps';

  disableGlobalAPIs(globalAPIs);
  ```

  ## Event intersection

  ```typescript
  // main.ts
  import { eventTargets, setupTargets } from './zone-events';

  setupTargets(eventTargets);
  ```

