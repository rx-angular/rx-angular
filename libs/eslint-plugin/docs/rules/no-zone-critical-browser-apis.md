# no-zone-critical-browser-apis

> Detects all scheduling APIs (`setTimeout`, `setInterval`, `requestAnimationFrame`).

## Rationale

Zone patched scheduling APIs might be overused and cause unnecessary change detection runs.

## Examples

<details>
<summary>❌ Examples of incorrect code for this rule</summary>

```ts
setTimeout(() => {
  console.log('hello');
}, 0);
```

</details>

<br />

<details>
<summary>✅ Examples of correct code for this rule</summary>

```ts
import { setTimeout } from '@rx-angular/cdk/zone-less';

setTimeout(() => {
  console.log('hello');
}, 0);
```

</details>
