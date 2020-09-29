import { ChangeDetectionStrategy, Component } from '@angular/core';
import { defer, Subject } from 'rxjs';
import { scan, startWith, tap, withLatestFrom } from 'rxjs/operators';

@Component({
  selector: 'rxa-cd-parent13',
  template: `
    <h2>
      CD 13
      <small>animationFrames triggers zone</small>
    </h2>
    <div class="case-info">
      <span>CD: <b class="cds">Default</b></span>
      <rxa-dirty-check></rxa-dirty-check>
    </div>
    <div class="case-interaction">
      Value: {{ value$ | push: 'optimistic1' }}<br/>
      <span
      >aF:{{
        (isPatchedAf$ | push: 'optimistic1') ? 'Patched' : 'UnPatched'
        }}</span
      ><br/>
      <button mat-raised-button [unpatch] (click)="btnClick$.next($event)">
        Run AF for 1 sec
      </button>
      <br/>
      <button mat-raised-button [unpatch] (click)="btnToggle$.next($event)">
        Toggle Observable
      </button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.Default
})
export class PatchedApisComponent {
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
