# isIvy

A standalone function that checks if we run in ivy.

## Usage

We want to to determine if we run in Ivy or ViewEngine at runtime.

```typescript
import {isIvy} from '@ts-etc'

const inIvy: boolean = isIvy(); 

console.log(`We are in ${inIvy ? 'Ivy' : 'ViewEngine'} `)
```
