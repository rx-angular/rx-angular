import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'dynamic-counter1-container',
  template: `
    <h1>Step 1</h1>
    <small>Parent re-renders: {{ rerenders() }}</small
    ><br />
    <dynamic-counter> </dynamic-counter>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicCounterContainerComponent {
  refreshIntervalInput$ = new Subject<Event>();
  refreshInterval$ = this.refreshIntervalInput$.pipe(
    map((e: any) => e.target.value)
  );
  listExpandedChange$ = new Subject<Event>();

  numRenders = 0;
  rerenders(): number {
    return ++this.numRenders;
  }
}
