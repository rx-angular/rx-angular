import { Directive, Input } from '@angular/core';
import { coerceAllFactory } from '@rx-angular/cdk/coercing';
import { RxStrategyProvider } from '@rx-angular/cdk/render-strategies';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { distinctUntilChanged, mergeAll, switchAll } from 'rxjs/operators';

@Directive({
  selector: '[rxSwitch]',
  standalone: false,
})
export class RxSwitch<U> {
  @Input()
  set rxSwitch(potentialObservable: Observable<U> | null | undefined) {
    this.observables$.next(potentialObservable);
  }

  private strategyHandler = coerceAllFactory<string>(
    () => new BehaviorSubject(this.strategyProvider.primaryStrategy),
    mergeAll(),
  );
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
    distinctUntilChanged(),
  );

  constructor(private strategyProvider: RxStrategyProvider) {}
}
