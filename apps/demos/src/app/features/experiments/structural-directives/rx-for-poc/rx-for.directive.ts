import {
  ChangeDetectorRef,
  Directive,
  EmbeddedViewRef,
  Inject,
  Input,
  IterableChangeRecord,
  IterableChanges,
  IterableDiffer,
  IterableDiffers,
  NgIterable,
  OnDestroy,
  OnInit,
  Optional,
  TemplateRef,
  TrackByFunction,
  ViewContainerRef, ɵdetectChanges as detectChanges
} from '@angular/core';

import {
  combineLatest,
  forkJoin,
  merge,
  Observable,
  ObservableInput,
  of,
  ReplaySubject,
  Subject,
  Subscription
} from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  map,
  shareReplay,
  startWith,
  switchAll,
  switchMap,
  take,
  tap
} from 'rxjs/operators';
import { RX_CUSTOM_STRATEGIES } from '../../../../shared/rx-angular-pocs/render-stragegies/custom-strategies-token';
import { RX_PRIMARY_STRATEGY } from '../../../../shared/rx-angular-pocs/render-stragegies/default-primary-strategy-token';
import { getDefaultStrategyCredentialsMap } from '../../../../shared/rx-angular-pocs/render-stragegies/default-strategies';
import { StrategyCredentialsMap } from '../../../../shared/rx-angular-pocs/render-stragegies/model';
import { mergeStrategies } from '../../../../shared/rx-angular-pocs/render-stragegies/strategy-helper';
import { RxForViewContext } from './rx-for-context';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  // tslint:disable-next-line:directive-selector
  selector: '[rxFor]'
})
export class RxForOf<T, U extends NgIterable<T> = NgIterable<T>>
  implements OnInit, OnDestroy {
  private differ: IterableDiffer<T> | null = null;
  private observables$ = new ReplaySubject<ObservableInput<U>>(1);
  private readonly strategies: StrategyCredentialsMap;

  values$ = this.observables$.pipe(
    switchAll(),
    distinctUntilChanged(),
    shareReplay({ refCount: true, bufferSize: 1 })
  );

  private _rxFor: ObservableInput<U> | null | undefined;
  @Input()
  set rxFor(potentialObservable: ObservableInput<U> | null | undefined) {
    this._rxFor = potentialObservable;
    this.observables$.next(potentialObservable);
  }

  @Input()
  set rxForOf(potentialObservable: ObservableInput<U> | null | undefined) {
    this._rxFor = potentialObservable;
    this.observables$.next(potentialObservable);
  }

  // true if affects view
  // private readonly __renderCallback = new Subject<any>();
  private _renderCallback: Subject<any>;
  @Input('rxForRenderCallback') set renderCallback(
    renderCallback: Subject<void>
  ) {
    this._renderCallback = renderCallback;
  }

  /* private readonly strategyName$ = new ReplaySubject<Observable<string>>(1);
   private readonly strategy$: Observable<StrategyCredentials> = strategyName$.pipe(
   ngInputFlatten(),
   startWith(this.defaultStrategyName),
   nameToStrategyCredentials(this.strategies, cfg.defaultStrategyName)
   );*/

  // TODO: handle observable as strategy input
  private _strategy: string;
  @Input('rxForStrategy') set strategy(strategy: string) {
    this._strategy = strategy;
  }
  get strategy(): string {
    return this._strategy || this.defaultStrategyName;
  }

  private _trackByFn;
  @Input()
  set rxForTrackBy(fn: TrackByFunction<T>) {
    this._trackByFn = fn;
  }

  private sub = new Subscription();

  @Input()
  rxForDistinctBy = (a, b) => a.value === b.value;

  constructor(
    @Optional()
    @Inject(RX_CUSTOM_STRATEGIES)
    private customStrategies: StrategyCredentialsMap[],
    @Inject(RX_PRIMARY_STRATEGY)
    private defaultStrategyName: string,
    private cdRef: ChangeDetectorRef,
    private readonly templateRef: TemplateRef<RxForViewContext<T, U>>,
    private readonly viewContainerRef: ViewContainerRef,
    private iterableDiffers: IterableDiffers
  ) {
    this.strategies = this.customStrategies.reduce((a, i) => mergeStrategies(a, i), getDefaultStrategyCredentialsMap());
  }

  initDiffer(iterable: U = [] as U) {
    this.differ = this.iterableDiffers
      .find(iterable)
      .create(this._trackByFn);
    this.sub.add(
      this.values$
        .pipe(
          startWith(iterable),
          map(i => this.differ.diff(i)),
          filter(diff => !!diff),
          switchMap(diff => this.applyChanges(diff)),
          tap(this?._renderCallback)
        )
        .subscribe()
    );
  }

  ngOnInit() {
    this.sub.add(
      this.values$
        .pipe(take(1))
        .subscribe(value => this.initDiffer(value))
    );
  }

  ngOnDestroy() {
    this.viewContainerRef.clear();
    this.sub.unsubscribe();
  }

  /**
   * Asserts the correct type of the context for the template that `NgForOf` will render.
   *
   * The presence of this method is a signal to the Ivy template type-check compiler that the
   * `NgForOf` structural directive renders its template with a specific context type.
   */
  static ngTemplateContextGuard<T, U extends NgIterable<T>>(dir: RxForOf<T, U>, ctx: any):
    ctx is RxForViewContext<T, U> {
    return true;
  }

  private applyChanges(changes: IterableChanges<T>): Observable<any[]> {
    let detectParent = false;
    // cache for duplication check so that we dont schedule multiple times for a single view. I am not even sure if
    // this is possible, but just in case
    const viewBehaviorCache = new WeakSet<EmbeddedViewRef<any>>();
    const behaviors$: Observable<any>[] = [];
    const strat = this.strategies[this.strategy];
    const scheduleCD = (view: EmbeddedViewRef<any>) => {
      if (!viewBehaviorCache.has(view)) {
        viewBehaviorCache.add(view);
        // detach the view so that the parent cd cycle does not render this view
        view.detach();
        const work = () => {
          view.reattach();
          strat.work(view);
        };
        behaviors$.push(of(null)
          .pipe(
            strat.behavior(work, view),
            take(1)
          ))
      }
    }
    changes.forEachOperation(
      (
        r: IterableChangeRecord<T>,
        previousIndex: number | null,
        currentIndex: number | null
      ) => {
        const idx = currentIndex == null ? undefined : currentIndex;
        // insert
        let view: EmbeddedViewRef<RxForViewContext<T, U>>;
        if (r.previousIndex == null) {
          view = this.viewContainerRef.createEmbeddedView(
            this.templateRef,
            new RxForViewContext(
              r.item,
              this._rxFor,
              this.rxForDistinctBy
            ),
            idx
          );
          // the view got inserted, so the parent has to get notified about this change
          detectParent = true;
        } else if (currentIndex == null) {  // remove
          this.viewContainerRef.remove(
            previousIndex === null ? undefined : previousIndex
          );
          // a view got removed, notify parent about the change
          detectParent = true;
        } else if (previousIndex !== null) { // move
          view = <EmbeddedViewRef<RxForViewContext<T, U>>>(
            this.viewContainerRef.get(previousIndex)
          );
          this.viewContainerRef.move(view, idx);
          view.context.$implicit = r.item;
        }
        if (view) {
          scheduleCD(view);
        }
      }
    );
    // update view contexts (index, count, odd/even and stuff)
    this._updateContext();
    // if views only had identityChanges, update the $implict value
    changes.forEachIdentityChange((record: IterableChangeRecord<T>) => {
      const view = <EmbeddedViewRef<RxForViewContext<T, U>>>(
        this.viewContainerRef.get(record.currentIndex)
      );
      view.context.$implicit = record.item;
      scheduleCD(view);
    });
    if (detectParent) {
      const work = () => {
        // reattach the parent in case it is detached. if the strategy is set to detach, it will get detached
        // afterwards anyway
        this.cdRef.reattach();
        strat.work(this.cdRef);
      }
      return merge(
        of(null).pipe(strat.behavior(work, (this.cdRef as any).context), take(1)),
        forkJoin(behaviors$)
      ).pipe(filter(v => v != null), take(1));
    }
    return forkJoin(behaviors$);
  }

  /** Update the `VirtualForOfContext` for all views. */
  private _updateContext() {
    for (
      let index = 0, count = this.viewContainerRef.length;
      index < count;
      index++
    ) {
      const viewRef = <EmbeddedViewRef<RxForViewContext<T, U>>>(
        this.viewContainerRef.get(index)
      );
      const even = index % 2 === 0;
      viewRef.context.rxForOf = this.values$;
      viewRef.context.setComputedContext({
        index,
        count,
        first: index === 0,
        last: index === count - 1,
        even,
        odd: !even
      });
    }
  }
}
