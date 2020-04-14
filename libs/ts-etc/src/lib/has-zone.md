# hasZone

A standalone function that checks if we run in a Zone patched environment.

## Usage

We want to to determine if we run in a Zone patched environment.

```typescript
import {hasZone} from '@ts-etc'

const inZone: boolean = hasZone(); 

console.log(`We are in a ${inZone ? 'ZoneFull' : 'ZoneFull'} environment`)
```
