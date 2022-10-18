# no-zone-critical-lodash-apis

> Detects Zone related lodash APIs.

## Rationale

Lodash APIs that rely on Zone patched scheduling APIs might cause unnecessary change detection runs.

## Examples

<details>
<summary>❌ Examples of incorrect code for this rule</summary>

```ts
import { debounce, delay } from 'lodash-es';

const debouncedHandleHover = debounce(handleHover, 500);

for (let i = 1; i <= 5; i++) {
  delay(console.log, 2000 * (i + 1), i);
}
```

</details>
