import { Directive, Input } from '@angular/core';

import { ReplaySubject, Subject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { distinctUntilChanged, startWith, switchAll, tap } from 'rxjs/operators';
import { StrategyCredentials } from '../../../cdk/render-strategies/model/strategy-credentials';
import { StrategyProvider } from '../../../cdk/render-strategies/strategy-provider.service';
import { nameToStrategyCredentials } from '../../../cdk/render-strategies/utils/strategy-helper';
import { ngInputFlatten } from '../../../cdk/utils/rxjs/operators/ngInputFlatten';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[rxSwitch]',
})
export class RxSwitch<U> {
  @Input()
  set rxSwitch(potentialObservable: Observable<U> | null | undefined) {
    this.observables$.next(potentialObservable);
  }

  private strategyName$ = new Subject<string | Observable<string>>();
  readonly strategy$: Observable<StrategyCredentials> = this.strategyName$.pipe(
    ngInputFlatten(),
    startWith(this.strategyProvider.primaryStrategy),
    nameToStrategyCredentials(
      this.strategyProvider.strategies,
      this.strategyProvider.primaryStrategy
    )
  );

  @Input('rxLetStrategy')
  set strategy(strategyName: string | Observable<string> | undefined) {
    this.strategyName$.next(strategyName);
  }

  observables$ = new ReplaySubject(1);
  viewContext = { $implicit: undefined };

  values$ = this.observables$.pipe(
    distinctUntilChanged(),
    switchAll(),
    distinctUntilChanged()
  );

  constructor(private strategyProvider: StrategyProvider) {}
}
