import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  NgZone
} from '@angular/core';
import { BehaviorSubject, EMPTY, interval, merge, Subject } from 'rxjs';
import { scan, startWith, switchMap } from 'rxjs/operators';
import { getStrategies } from '@rx-angular/template';

@Component({
  selector: 'let1-container',
  template: `
    <h1>Stop rendering if directive is out of the viewport</h1>
    <renders></renders><br />
    <button mat-raised-button [unpatch] (click)="incrementTrigger.next()">
      count up
    </button>
    <button mat-raised-button [unpatch] (click)="toggleAutoIncrement.next('')">
      auto
    </button>
    <br />

    <b>viewPort</b>
    <div #viewPort class="view-port">
      <div class="view-port-inner">
        <div
          class="target"
          viewport-prio
          *rxLet="count$; let count;">
          <b>target</b>
          value: {{ count }}
        </div>
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

      .view-port-inner {
        height: 1000px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .target {
        height: 100px;
        width: 100px;
        border: 1px solid red;
        display: flex;
        flex-flow: column;
        align-items: center;
        justify-content: center;
      }

      .noop {
        border: 1px solid blue;
      }
    `
  ]
})
export class BasicExampleComponent {
  incrementTrigger = new Subject<Event>();
  toggleAutoIncrement = new BehaviorSubject<any>(false);

  strategies = Object.keys(getStrategies({ cdRef: this.cdRef }));

  visibleStrategy$ = new BehaviorSubject('local');
  invisibleStrategy$ = new BehaviorSubject('noop');

  count$ = merge(
    this.incrementTrigger,
    this.toggleAutoIncrement.pipe(
      scan(v => !v, true),
      switchMap(v => (v ? interval(200) : EMPTY))
    )
  ).pipe(
    startWith(1),
    scan(v => ++v, 0)
  );

  constructor(private ngZone: NgZone, private cdRef: ChangeDetectorRef) {}

  numRenders = 0;

  rerenders(): number {
    return ++this.numRenders;
  }
}
