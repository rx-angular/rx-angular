import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { defer, fromEvent, interval, Observable, Subject } from 'rxjs';
import {
  scan,
  startWith,
  switchMap,
  takeUntil,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { BaseComponent } from '../../base.component.ts/base.component';

@Component({
  selector: 'app-cd-parent13',
  template: `
    <h2>
      CD 13
      <small>animationFrames triggers zone</small>
    </h2>
    <div class="case-info">
      <span>CD: <b class="cds">Default</b></span>
      <span
        >dirty: <b class="dirty">{{ isMarkedDirty }}</b></span
      >
      <span
        >render: <b class="num-renders">{{ getNumOfRenderings() }}</b></span
      >
    </div>
    <div class="case-interaction">
      Value: {{ value$ | push: 'optimistic1' }}<br />
      <span
        >aF:{{
          (isPatchedAf$ | push: 'optimistic1') ? 'Patched' : 'UnPatched'
        }}</span
      ><br />
      <button [unpatch] (click)="btnClick$.next($event)">
        Run AF for 1 sec
      </button>
      <br />
      <button [unpatch] (click)="btnToggle$.next($event)">
        Toggle Observable
      </button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.Default,
})
export class CdParent13Component extends BaseComponent {
  btnClick$ = new Subject<Event>();

  btnToggle$ = new Subject();

  isPatchedAf$ = this.btnToggle$.pipe(
    startWith(true),
    scan((isPatched) => !isPatched)
  );

  value$;

  baseEffects$ = defer(() => {
    return this.btnClick$.pipe(
      withLatestFrom(this.isPatchedAf$),
      tap(() => console.error('Not implemented'))
    );
  });
}
