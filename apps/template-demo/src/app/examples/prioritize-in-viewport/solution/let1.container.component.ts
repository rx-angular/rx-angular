import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject, EMPTY, interval, merge, Subject } from 'rxjs';
import { scan, startWith, switchMap } from 'rxjs/operators';
import { getStrategies } from '@rx-angular/template';

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
    <label>VisibleStrategy</label>
    <select (change)="visibleStrategy = $event?.target?.value">
      <option [value]="s" *ngFor="let s of strategies">{{ s }}</option>
    </select>
    <label>InVisibleStrategy</label>
    <select (change)="invisibleStrategy = $event?.target?.value">
      <option [value]="s" *ngFor="let s of strategies">{{ s }}</option>
    </select>
    <br />
    <b>viewPort</b>
    <div #viewPort class="view-port">
      <div
        class="target"
        [viewport-prio]="invisibleStrategy"
        *rxLet="count$; let count; strategy: visibleStrategy"
      >
        <b>target</b> <br />
        value: {{ count }}
      </div>
    </div>

    <button [unpatch] (click)="signals.complete()">
      complete
    </button>
    <button [unpatch] (click)="signals.next('a')">
      next
    </button>
    <button [unpatch] (click)="signals.error(error)">
      error
    </button>

    <div
      *rxLet="
        signals;
        let count;
        strategy: visibleStrategy;
        complete: complete;
        error: error;
        suspense: suspense
      "
    >
      value: {{ count }}
    </div>

    <ng-template #complete>
      <h1>COMPLETE</h1>
    </ng-template>
    <ng-template #error>
      <h1>ERRor</h1>
    </ng-template>
    <ng-template #suspense>
      <h1>LAZY</h1>
    </ng-template>
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

      .local {
        border: 1px dashed green;
      }
    `
  ]
})
export class Let1ContainerComponent {
  incrementTrigger = new Subject<Event>();
  signals = new Subject<any>();
  toggleAutoIncrement = new BehaviorSubject<any>(false);

  strategies = Object.keys(getStrategies({ cdRef: {} } as any));
  error = new Error();

  visibleStrategy = 'local';
  invisibleStrategy: string;

  count$ = merge(
    this.incrementTrigger,
    this.toggleAutoIncrement.pipe(
      scan(v => !v, true),
      switchMap(v => (v ? interval(0) : EMPTY))
    )
  ).pipe(
    startWith(1),
    scan(v => ++v, 0)
  );

  numRenders = 0;

  rerenders(): number {
    return ++this.numRenders;
  }
}
