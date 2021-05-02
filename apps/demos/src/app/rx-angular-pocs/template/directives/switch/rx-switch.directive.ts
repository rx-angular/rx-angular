import { Directive, Input } from '@angular/core';

import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { distinctUntilChanged, mergeAll, switchAll } from 'rxjs/operators';
import { hotFlatten, RxStrategyProvider } from '@rx-angular/cdk';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[rxSwitch]',
})
export class RxSwitch<U> {
  @Input()
  set rxSwitch(potentialObservable: Observable<U> | null | undefined) {
    this.observables$.next(potentialObservable);
  }

  private strategyHandler = hotFlatten<string>(() => new BehaviorSubject(this.strategyProvider.primaryStrategy), mergeAll());
  readonly strategies$ = this.strategyHandler.values$;

  @Input('rxLetStrategy')
  set strategy(strategyName: string | Observable<string> | undefined) {
    this.strategyHandler.next(strategyName);
  }

  observables$ = new ReplaySubject(1);
  viewContext = { $implicit: undefined };

  values$ = this.observables$.pipe(
    distinctUntilChanged(),
    switchAll(),
    distinctUntilChanged()
  );

  constructor(private strategyProvider: RxStrategyProvider) {}
}
