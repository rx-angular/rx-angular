import {
  asapScheduler,
  BehaviorSubject,
  EMPTY,
  from,
  interval,
  Observable,
  Subject,
} from 'rxjs';
import {
  concatMap,
  mergeMap,
  scan,
  switchMap,
  take,
  takeUntil,
  tap,
} from 'rxjs/operators';

export class CoalescingTestService {
  ms = 10;
  strategy$ = new BehaviorSubject('noop');
  nextValues = new Subject<any>();
  toggle = new Subject<any>();
  value$: Observable<string> = this.nextValues.pipe(
    mergeMap(() => ['1', '2', Math.random() + ''])
  );
  value;

  toggleTick = this.toggle.pipe(
    scan(isTrue => !isTrue, true),
    switchMap(isTrue => (isTrue ? interval(this.ms) : EMPTY)),
    tap(() => this.nextValues.next(1))
  );

  updateValue() {
    this.nextValues.next(1);
  }

  updatePattern() {
    interval(this.ms)
      .pipe(take(20))
      .subscribe(() => this.nextValues.next(1));
  }

  updatePatternSet(strategyNames: string[]) {
    from(strategyNames)
      .pipe(
        concatMap(strategyName => {
          this.strategy$.next(strategyName);
          console.log('strategy', strategyName);
          return interval(this.ms, asapScheduler).pipe(
            takeUntil(interval(5000))
          );
        })
      )
      .subscribe(() => {
        this.nextValues.next(1);
      });
  }
}
