import { ChangeDetectorRef, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { pluck, distinctUntilChanged, filter } from 'rxjs/operators';
import { DefaultStrategies } from './default-strategies.interface';

@Injectable()
export class RxLetPocService {
  private state$ = new BehaviorSubject<{
    currentStrategy: keyof DefaultStrategies;
    currentInvisibleStrategy: keyof DefaultStrategies;
  }>({
    currentStrategy: null,
    currentInvisibleStrategy: null,
  });

  strategy$: Observable<keyof DefaultStrategies> = this.state$.pipe(
    pluck('currentStrategy'),
    filter<keyof DefaultStrategies>(Boolean),
    distinctUntilChanged()
  );

  outOfViewportStrategy$: Observable<
    keyof DefaultStrategies
  > = this.state$.pipe(
    pluck('currentInvisibleStrategy'),
    filter<keyof DefaultStrategies>(Boolean),
    distinctUntilChanged()
  );

  constructor(public cdRef: ChangeDetectorRef) {}

  setStrategy(strategy: keyof DefaultStrategies) {
    const snapshot = this.snapshot;

    this.state$.next({
      ...snapshot,
      currentStrategy: strategy,
    });
  }

  setInvisibleStrategy(strategy: keyof DefaultStrategies) {
    const snapshot = this.snapshot;

    this.state$.next({
      ...snapshot,
      currentInvisibleStrategy: strategy,
    });
  }

  private get snapshot() {
    return this.state$.getValue();
  }
}
