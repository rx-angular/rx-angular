# prefer-no-lodash-clone-deep

> Detects all usages of `cloneDeep` from Lodash.

## Rationale

Lodash's `cloneDeep` is a very costly operation and should be used only when it is really needed.

## Examples

<details>
<summary>❌ Examples of incorrect code for this rule</summary>

```ts
import { cloneDeep } from 'lodash-es';

const clone = cloneDeep(orig);
```

</details>

<br />

<details>
<summary>✅ Examples of correct code for this rule</summary>

```ts
// see: https://developer.mozilla.org/en-US/docs/Web/API/structuredClone
const clone = structuredClone(original);
```

```ts
type T = {
  prop: string;
  arr: { x: number; y: number }[];
};

const shallowClone: T = { ...orig };
const deepClone: T = { ...orig, arr: orig.arr.map((item) => ({ ...item })) };
```

```ts
import { cloneDeep } from './utils';

const clone = cloneDeep(orig);
```

</details>
