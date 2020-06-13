import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject, EMPTY, interval, merge, Subject } from 'rxjs';
import { map, scan, switchMap } from 'rxjs/operators';

@Component({
  selector: 'let1-container',
  template: `
    <h1>Stop rendering if directive is out of the viewport</h1>
    rerenders: {{ rerenders() }}<br />
    <button [unpatch] (click)="incrementTrigger.next()">
      count up
    </button>
    <button [unpatch] (click)="toggleAutoIncrement.next('')">
      auto
    </button>
    <br />
    <b>viewPort</b>
    <div #viewPort class="view-port">
      <div class="target" [viewport-prio] *rxLet="count$; let count">
        <b>target</b> <br />
        value: {{ count }}
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      .view-port {
        height: 250px;
        overflow-y: scroll;
        border: 1px solid red;
      }
      .target {
        margin: 300px 0;
        padding: 20px;
      }

      .noop {
        border: 1px solid blue;
      }
      .ɵlocal {
        border: 1px dashed green;
      }
    `
  ]
})
export class Let1ContainerComponent {
  incrementTrigger = new Subject<Event>();
  toggleAutoIncrement = new BehaviorSubject<any>(false);

  count$ = merge(
    this.incrementTrigger,
    this.toggleAutoIncrement.pipe(
      scan(v => !v, true),
      switchMap(v => (v ? interval(300) : EMPTY))
    )
  ).pipe(scan(v => ++v, 0));

  numRenders = 0;
  rerenders(): number {
    return ++this.numRenders;
  }
}
