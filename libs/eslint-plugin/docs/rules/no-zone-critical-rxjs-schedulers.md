# no-zone-critical-rxjs-schedulers

> Detects all RxJS schedulers.

## Rationale

RxJS schedulers rely on zone patched scheduling APIs, which might cause unnecessary change detection runs.

## Examples

<details>
<summary>❌ Examples of incorrect code for this rule</summary>

```ts
import { interval, animationFrameScheduler } from 'rxjs';
import { observeOn } from 'rxjs/operators';

const someDiv = document.querySelector('#someDiv');
interval(10)
  .pipe(observeOn(animationFrameScheduler))
  .subscribe((val) => {
    someDiv.style.height = val + 'px';
  });
```

```ts
import { interval, asyncScheduler } from 'rxjs';
import { observeOn } from 'rxjs/operators';

interval(10).pipe(observeOn(asyncScheduler)).subscribe(console.log);
```

</details>

<br />

<details>
<summary>✅ Examples of correct code for this rule</summary>

```ts
import { interval } from 'rxjs';
import { observeOn } from 'rxjs/operators';
import { asyncScheduler } from 'rxjs-zone-less';

interval(10).pipe(observeOn(asyncScheduler)).subscribe(console.log);
```

</details>
