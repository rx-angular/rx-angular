# no-zone-critical-rxjs-operators

> Detects Zone critical RxJS operators.

## Rationale

RxJS operators that rely on Zone patched scheduling APIs might cause unnecessary change detection runs.

## Examples

<details>
<summary>❌ Examples of incorrect code for this rule</summary>

```ts
import { fromEvent } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

const searchBox = document.getElementById('search');
const keyup$ = fromEvent(searchBox, 'keyup');

keyup$
  .pipe(
    map((i) => i.currentTarget.value),
    debounceTime(500)
  )
  .subscribe(console.log);
```

```ts
import { fromEvent, of } from 'rxjs';
import { mergeMap, delay, takeUntil } from 'rxjs/operators';

const mousedown$ = fromEvent(document, 'mousedown');
const mouseup$ = fromEvent(document, 'mouseup');

mousedown$
  .pipe(mergeMap((event) => of(event).pipe(delay(700), takeUntil(mouseup$))))
  .subscribe((event) => console.log('Long Press!', event));
```

```ts
import { interval } from 'rxjs';
import { throttleTime } from 'rxjs/operators';

const source = interval(1000);
const example = source.pipe(throttleTime(5000));
const subscription = example.subscribe((val) => console.log(val));
```

</details>

<br />

<details>
<summary>✅ Examples of correct code for this rule</summary>

```ts
import { fromEvent, of } from 'rxjs';
import { mergeMap, takeUntil } from 'rxjs/operators';
import { delay } from './rxjs-zoneless-operators';

const mousedown$ = fromEvent(document, 'mousedown');
const mouseup$ = fromEvent(document, 'mouseup');

mousedown$
  .pipe(mergeMap((event) => of(event).pipe(delay(700), takeUntil(mouseup$))))
  .subscribe((event) => console.log('Long Press!', event));
```

</details>
