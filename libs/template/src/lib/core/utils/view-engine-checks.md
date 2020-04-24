# View Engine Checks

This file contains a set stand-alone functions to
check Angular environments at run time for their used View Engine.

## isViewEngineIvy

Determines the used view engine of an Angular project is Ivy or not.

The check is done based on following table:

| render       | ViewEngine | ViewEngine | Ivy         | Ivy         |
| ------------ | ---------- | ---------- | ----------- | ----------- |
| **mode**     | prod       | dev        | prod        | dev         |
| **ng**       | present    | present    | `undefined` | present     |
| **ng.probe** | present    | present    | `undefined` | `undefined` |

So for Ivy we need to make sure that ng is undefined or,
in case of dev environment, ng.probe is undefined.

```typescript
import { isViewEngineIvy } from '@rx-angular/template';

const isViewEngineUsingIvy: boolean = isViewEngineIvy();

console.log(
  `The angular application ${isViewEngineUsingIvy ? 'DOES' : "DOESN'T"} run Ivy`
);
```
