# getGlobalThis

A fallback for the new `globalThis` reference.

It should be used to replace `window` due to different environments in:

- SSR (Server Side Rendering)
- Tests
- Browser

```typescript
import { getGlobalThis } from '@ngx-rx/core';

const globalThis = getGlobalThis();

console.log(`globalThis is ${getGlobalThis}`);
```
