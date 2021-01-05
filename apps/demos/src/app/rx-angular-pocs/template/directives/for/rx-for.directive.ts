import {
  ChangeDetectorRef,
  Directive,
  Input,
  IterableChangeRecord,
  IterableDiffer,
  IterableDiffers,
  NgIterable,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

import { ReplaySubject, Subject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { filter, map } from 'rxjs/operators';
import { ngInputFlatten } from '../../../../shared/utils/ngInputFlatten';
import { StrategyProvider } from '../../../cdk/render-strategies/strategy-provider.service';
import {
  createListManager,
  ListManager,
} from '../../../cdk/template-management';
import { RxEffects } from '../../../state/rx-effects';
import { RxForViewContext } from './model/view-context';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[rxFor]',
  providers: [RxEffects],
})
export class RxFor<T, U extends NgIterable<T> = NgIterable<T>>
  implements OnInit {
  @Input()
  set rxFor(potentialObservable: Observable<NgIterable<T>> | NgIterable<T> | null | undefined) {
    this.observables$.next(potentialObservable);
  }

  @Input()
  set rxForOf(potentialObservable: Observable<NgIterable<T>> | NgIterable<T> | null | undefined) {
    this.observables$.next(potentialObservable);
  }

  @Input('rxForStrategy')
  set strategy(strategyName: string | Observable<string> | undefined) {
    this.listManager.nextStrategy(strategyName);
  }

  @Input()
  set rxForTrackBy(trackByFnOrKey: string | ((idx: number, i: T) => any)) {
    this._trackBy =
      typeof trackByFnOrKey !== 'function'
        ? (i, a) => a[trackByFnOrKey]
        : trackByFnOrKey;
  }

  @Input('rxForRenderCallback') set renderCallback(
    renderCallback: Subject<void>
  ) {
    this._renderCallback = renderCallback;
  }

  constructor(
    private iterableDiffers: IterableDiffers,
    private cdRef: ChangeDetectorRef,
    private readonly templateRef: TemplateRef<RxForViewContext<T>>,
    private readonly viewContainerRef: ViewContainerRef,
    private readonly rxEf: RxEffects,
    private strategyProvider: StrategyProvider
  ) {
    this.listManager = createListManager<T, RxForViewContext<T>>({
      cdRef,
      strategies: strategyProvider.strategies,
      defaultStrategyName: strategyProvider.primaryStrategy,
      viewContainerRef,
      templateRef,
      differ: this.iterableDiffers.find([]).create(this._trackBy),
      createViewContext: createViewContext as any,
    });
  }

  static ngTemplateGuard_rxFor: 'binding';
  private differ: IterableDiffer<T> | null = null;
  private observables$ = new ReplaySubject<Observable<NgIterable<T>> | NgIterable<T>>(1);

  private _renderCallback: Subject<any>;

  values$ = this.observables$.pipe(ngInputFlatten());

  private readonly listManager: ListManager<T, RxForViewContext<T>>;

  /** @internal */
  static ngTemplateContextGuard<U>(
    dir: RxFor<U>,
    ctx: unknown | null | undefined
  ): ctx is RxForViewContext<U> {
    return true;
  }

  _trackBy = (i, a) => a;

  ngOnInit() {
    this.differ = this.iterableDiffers.find([]).create(this._trackBy);

    this.rxEf.hold(this.listManager.render(this.values$), (v) => {
      this._renderCallback?.next(v);
    });
  }
}

function createViewContext<T>(
  item: T
): RxForViewContext<T> {
  return new RxForViewContext<T>(item);
}
