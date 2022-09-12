# prefer-no-lodash-is-equal

> Detects all usages of `isEqual` from Lodash.

## Rationale

Lodash's `isEqual` may be a costly operation and should be used with caution.

## Examples

<details>
<summary>❌ Examples of incorrect code for this rule</summary>

```ts
import { isEqual } from 'lodash-es';

if (isEqual(prevObj, currObj)) {
  // ...
}
```

</details>

<br />

<details>
<summary>✅ Examples of correct code for this rule</summary>

```ts
if (
  prevObj.prop === currObj.prop &&
  prevObj.arr.length === currObj.arr.length &&
  prevObj.arr.every(
    (prevItem, i) =>
      prevItem.x === currObj.arr[i].x && prevItem.y === currObj.arr[i].y
  )
) {
  // ...
}
```

```ts
if (isEqual(prevObj, currObj)) {
  // ...
}

function isEqual<T>(a: T, b: T): boolean {
  return JSON.stringify(a) === JSON.stringify(b);
}
```

</details>
