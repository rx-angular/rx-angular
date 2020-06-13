import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject, EMPTY, interval, merge, Subject } from 'rxjs';
import { map, scan, switchMap } from 'rxjs/operators';

@Component({
  selector: 'demo-basics4-container',
  template: `
    <h1>Solution</h1>
    rerenders: {{ rerenders() }}<br />
    <!-- <demo-basics></demo-basics> -->

    <button [unpatch] (click)="incrementTrigger.next()">
      count up
    </button>
    <button [unpatch] (click)="toggleAutoIncrement.next('')">
      auto
    </button>

    <div #viewPort class="view-port">
      <div class="target" [viewport-prio] *rxLet="count$; let count">
        test: {{ count }}
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      .view-port {
        height: 300px;
        overflow: scroll;
        border: 1px solid red;
      }
      .target {
        margin: 500px 0 500px 0;
      }
    `
  ]
})
export class DemoBasicsContainerComponent {
  incrementTrigger = new Subject<Event>();
  toggleAutoIncrement = new BehaviorSubject<any>(false);

  count$ = merge(
    this.incrementTrigger,
    this.toggleAutoIncrement.pipe(
      scan(v => !v, false),
      switchMap(v => (v ? interval(300) : EMPTY))
    )
  ).pipe(scan(v => ++v, 0));

  numRenders = 0;
  rerenders(): number {
    return ++this.numRenders;
  }
}
