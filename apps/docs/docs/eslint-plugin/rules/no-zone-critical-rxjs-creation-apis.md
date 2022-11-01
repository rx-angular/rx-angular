# no-zone-critical-rxjs-creation-apis

> Detects Zone critical RxJS creation APIs.

## Rationale

RxJS creation APIs that rely on Zone patched scheduling APIs might cause unnecessary change detection runs.

## Examples

<details>
<summary>❌ Examples of incorrect code for this rule</summary>

```ts
import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';

const source = fromEvent(document, 'click');
const example = source.pipe(map((event) => 'Event time: ' + event.timeStamp));
const subscribe = example.subscribe((val) => console.log(val));
```

```ts
import { interval } from 'rxjs';

const source = interval(1000);
const subscribe = source.subscribe((val) => console.log(val));
```

```ts
import { timer } from 'rxjs';

const source = timer(1000, 2000);
const subscribe = source.subscribe((val) => console.log(val));
```

</details>

<br />

<details>
<summary>✅ Examples of correct code for this rule</summary>

```ts
import { interval } from 'rxjs-zone-less';

const source = interval(1000);
const subscribe = source.subscribe((val) => console.log(val));
```

</details>
