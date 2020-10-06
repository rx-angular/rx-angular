import { EMPTY, Observable, Subject } from 'rxjs';
import { map, scan, switchAll, switchMap } from 'rxjs/operators';
import { toTick } from './utils';


export const schedulingHelper = () => {

  let active = false;

  const schedulerSubject = new Subject<string>();
  const tickSubject$ = new Subject<Observable<number>>();
  const ticks$ = tickSubject$.pipe(
    switchAll(),
    scan(a => ++a, 0)
  );

  const toggle = (): void => {
    tickSubject$.next(active ? EMPTY as Observable<any> : schedulerSubject.pipe(
      map((s) => toTick({ scheduler: s }))
    ));
    active = !active;
  }

  const scheduler = (schedulerName: string): void => {
    schedulerSubject.next(schedulerName);
  }

  const tick = (numTicks: number = 1): void => {
    tickSubject$.next(
      schedulerSubject.pipe(
        switchMap((s) => toTick({
          scheduler: s,
          numEmissions: numTicks
        }))
      )
    );
  }

  return {
    scheduler,
    tick,
    toggle,
    ticks$
  };

};
