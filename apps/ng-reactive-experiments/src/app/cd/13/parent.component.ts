import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild
} from '@angular/core';
import { defer, fromEvent, interval, Observable } from 'rxjs';
import {
  scan,
  startWith,
  switchMap,
  takeUntil,
  withLatestFrom
} from 'rxjs/operators';
import { generateFrames } from '@rxjs-etc';
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
      Value: {{ value$ | ngrxPush: 'optimistic1' }}<br />
      <span
        >aF:{{
          (isPatchedAf$ | ngrxPush: 'optimistic1') ? 'Patched' : 'UnPatched'
        }}</span
      ><br />
      <button #button>Run AF for 1 sec</button>
      <br />
      <button #buttonToggle>Toggle Observable</button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.Default
})
export class CdParent13Component extends BaseComponent {
  @ViewChild('button') button: ElementRef<HTMLButtonElement>;
  btnClick$ = this.afterViewInit$.pipe(
    switchMap(_ => fromEvent(this.button.nativeElement, 'click'))
  );

  @ViewChild('buttonToggle') buttonToggle: ElementRef<HTMLButtonElement>;
  btnToggle$ = this.afterViewInit$.pipe(
    switchMap(_ => fromEvent(this.buttonToggle.nativeElement, 'click'))
  );
  isPatchedAf$ = this.btnToggle$.pipe(
    startWith(true),
    scan(isPatched => !isPatched)
  );

  value$;

  baseEffects$ = defer(() => {
    const asyncProducer = (window as any).__zone_symbol__requestAnimationFrame;
    const asyncCanceler = (window as any).__zone_symbol__cancelAnimationFrame;
    const afPatched$: Observable<number> = generateFrames();
    const afUnPatched$: Observable<number> = generateFrames(
      asyncProducer,
      asyncCanceler
    );
    return this.btnClick$.pipe(
      withLatestFrom(this.isPatchedAf$),
      switchMap((_, isPatchedAf) =>
        (isPatchedAf ? afUnPatched$ : afPatched$).pipe(
          takeUntil(interval(1000))
        )
      )
    );
  });
}
