import { BehaviorSubject, EMPTY, Observable, Subject } from 'rxjs';
import { scan, share, switchAll, switchMap } from 'rxjs/operators';
import { toTick } from './utils';
import { SchedulingPriority } from '@rx-angular/template';

export const schedulingHelper = () => {

  let active = false;

  const schedulerSubject = new BehaviorSubject<SchedulingPriority>(SchedulingPriority.animationFrame);
  const tickSubject$ = new Subject<Observable<number>>();
  const ticks$ = tickSubject$.pipe(
    switchAll(),
    scan(a => ++a, 0),
    share()
  );

  const toggle = (): void => {
    tickSubject$.next(active ? EMPTY as Observable<any> : schedulerSubject.pipe(
      switchMap((s) => toTick({ scheduler: s }))
    ));
    active = !active;
  };


  const duration = (d: number): void => {
    tickSubject$.next(active ? EMPTY as Observable<any> : schedulerSubject.pipe(
      switchMap((s) => toTick({ scheduler: s, duration: d }))
    ));
    active = !active;
  };


  const scheduler = (schedulerName: SchedulingPriority): void => {
    schedulerSubject.next(schedulerName);
  };

  const tick = (numTicks: number = 1): void => {
    tickSubject$.next(
      schedulerSubject.pipe(
        switchMap((s) => toTick({
            scheduler: s,
            numEmissions: numTicks
          })
        )
      )
    );
  };

  return {
    scheduler,
    ticks$,
    tick,
    toggle,
    duration
  };

};
