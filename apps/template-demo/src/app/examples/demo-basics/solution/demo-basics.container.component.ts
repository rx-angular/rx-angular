import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'demo-basics4-container',
  template: `
    <h1>Solution</h1>
    <demo-basics> </demo-basics>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DemoBasicsContainerComponent {
  refreshIntervalInput$ = new Subject<Event>();
  refreshInterval$ = this.refreshIntervalInput$.pipe(
    map((e: any) => e.target.value)
  );

  numRenders = 0;
  rerenders(): number {
    return ++this.numRenders;
  }
}
