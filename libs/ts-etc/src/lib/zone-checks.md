# Zone Checks

This file contains a set stand-alone functions to
check environments and class instances for that 
are related to, or effected by `zone.js`.

## envZonePatched

This function checks the window object `zone.js` was instantiated.
If so, the `window` object maintains a property named `Zone`.

```typescript
import {envZonePatched} from '@ts-etc'

const envIsZonePatched: boolean = envZonePatched(); 

console.log(`The environment ${envIsZonePatched ? 'IS' : 'IS NOT'} patched by zone.js`)
```

## isNgZone

This function takes any instance of a class and checks 
if the constructor name is equal to `NgZone`.

This means the Angular application that instantiated this service assumes it runs in a ZuneLess environment,
and therefor it's change detection will not be triggered by zone related logic.

However, keep in mind this does not mean `zone.js` is not present.
The environment could still run in ZoneFull mode even if Angular turned it off.

Consider the situation of a Angular element configured for ZoneLess 
environments is used in an Angular application relining on the zone mechanism.


```typescript
import {isNgZone} from '@ts-etc'

const isInstanceNgZone: boolean = isNgZone(); 

console.log(`The instance ${isInstanceNgZone ? 'IS' : 'IS NOT'} of type NgZone`)
```


## isNgNoopZone

This function takes any instance of a class and checks 
if the constructor name is equal to `NgNoopZone`.

For more detailed information read the description of [isNgZone](#isngzone).

```typescript
import {isNgNoopZone} from '@ts-etc'

const isInstanceNgNoopZone: boolean = isNgNoopZone(); 

console.log(`The instance ${isInstanceNgNoopZone ? 'IS' : 'IS NOT'} of type NgNoopZone`)
```
