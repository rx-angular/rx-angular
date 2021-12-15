# no-zone-run-apis

> Detects Zone.run APIs.

## Rationale

Zone `run`, `runGuarded` and `runTask` will trigger change detection in whole application and should be used with caution. Improper uses of `runOutsideAngular` may bring overhead and cause performance issues.

## Examples

<details>
<summary>❌ Examples of incorrect code for this rule</summary>

```ts
import { Component, NgZone } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectFoo } from '../../store/foo/foo.selectors';

@Component({
  templateUrl: './foo.component.html',
})
export class FooComponent {
  constructor(private zone: NgZone, private store: Store) {
    setTimeout(() => {
      this.zone.runOutsideAngular(() => {
        // ...
      });
    }, 500);
  }

  handleEvent(event: any) {
    this.store.select(selectFoo).subscribe((value) => {
      this.zone.run(() => {
        // ...
      });
    });
  }
}
```

</details>
