# prefer-no-layout-sensitive-apis

> Detects all layout sensitive APIs that may cause style recalculation.

## Rationale

Accessing layout sensitive APIs may cause unnecessary synchronous style recalculation.

## Examples

<details>
<summary>❌ Examples of incorrect code for this rule</summary>

```ts
el.offsetLeft += 10;
```

```ts
el.scrollTop = 0;
```

```ts
const { innerWidth: elemWidth } = elem;
```

```ts
const maxChildWidth = Array.from(el.children).reduce(
  (acc, { clientWidth }) => Math.max(acc, clientWidth),
  0
);
```

```ts
document.getElementById('foo').innerText = 'bar';
```

```ts
const orientation = el.clientHeight > el.clientWidth ? 'portrait' : 'landscape';
```

```ts
const { x, y, width, height } = el.getBoundingClientRect();
```

```ts
el.scrollIntoView();
```

```ts
function isElementInViewport(elem: HTMLElement): boolean {
  const rect = elem.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

if (!isElementInViewport(el)) {
  el.scrollIntoView();
  (el.firstChild as HTMLInputElement).focus();
}
```

</details>

<br />

<details>
<summary>✅ Examples of correct code for this rule</summary>

```ts
const el = document.getElementById('myEl');
el.addEventListener('click', () => {
  console.log('element clicked');
});
```

</details>
