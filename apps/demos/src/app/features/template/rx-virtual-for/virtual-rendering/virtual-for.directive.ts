import {
  ChangeDetectorRef,
  Directive,
  ElementRef,
  EmbeddedViewRef,
  ErrorHandler,
  Input,
  IterableDiffers,
  NgIterable,
  NgZone,
  OnDestroy,
  OnInit,
  TemplateRef,
  TrackByFunction,
  ViewContainerRef,
} from '@angular/core';
import { RxListViewComputedContext } from '@rx-angular/cdk/template';
import {
  RxStrategyNames,
  RxStrategyProvider,
} from '@rx-angular/cdk/render-strategies';
import { coerceDistinctWith } from '@rx-angular/cdk/coercing';

import { Observable, ReplaySubject, Subject } from 'rxjs';
import { shareReplay, takeUntil } from 'rxjs/operators';
import {
  RxVirtualForViewContext,
  RxVirtualScrollStrategy,
  RxVirtualViewRepeater,
} from './model';
import {
  createVirtualListManager,
  VirtualListManager,
} from './virtual-template-manager';

@Directive({
  selector: '[rxVirtualFor]',
  providers: [{ provide: RxVirtualViewRepeater, useExisting: RxVirtualFor }],
})
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export class RxVirtualFor<T, U extends NgIterable<T> = NgIterable<T>>
  implements RxVirtualViewRepeater<T>, OnInit, OnDestroy
{
  /** @internal */
  static ngTemplateGuard_rxVirtualFor: 'binding';

  @Input()
  set rxVirtualFor(
    potentialObservable:
      | Observable<NgIterable<T>>
      | NgIterable<T>
      | null
      | undefined
  ) {
    this.observables$.next(potentialObservable);
  }

  @Input()
  set rxVirtualForOf(
    potentialObservable:
      | Observable<NgIterable<T>>
      | NgIterable<T>
      | null
      | undefined
  ) {
    this.observables$.next(potentialObservable);
  }

  /**
   * @internal
   * A reference to the template that is created for each item in the iterable.
   * @see [template reference variable](guide/template-reference-variables)
   * (inspired by @angular/common `ng_for_of.ts`)
   */
  private _template: TemplateRef<RxVirtualForViewContext<T, U>>;
  @Input()
  set rxForTemplate(value: TemplateRef<RxVirtualForViewContext<T, U>>) {
    this._template = value;
  }

  @Input('rxVirtualForStrategy')
  set strategy(
    strategyName:
      | RxStrategyNames<string>
      | Observable<RxStrategyNames<string>>
      | undefined
  ) {
    this.strategyInput$.next(strategyName);
  }

  @Input('rxVirtualForViewCacheSize') viewCacheSize = 50;

  @Input('rxVirtualForParent') renderParent =
    this.strategyProvider.config.parent;

  @Input('rxVirtualForPatchZone') patchZone =
    this.strategyProvider.config.patchZone;

  /*@Input('rxVirtualForTombstone') tombstone: TemplateRef<
   RxVirtualForViewContext<T>
   > | null = null;*/

  @Input('rxVirtualForTrackBy')
  set trackBy(trackByFnOrKey: string | ((idx: number, i: T) => any)) {
    this._trackBy =
      typeof trackByFnOrKey !== 'function'
        ? (i, a) => a[trackByFnOrKey]
        : trackByFnOrKey;
  }

  @Input('rxVirtualForRenderCallback') set renderCallback(
    renderCallback: Subject<U>
  ) {
    this._renderCallback = renderCallback;
  }

  /** @internal */
  readonly rendered$ = new Subject<any>();
  /** @internal */
  readonly viewsRendered$ = new Subject<EmbeddedViewRef<any>[]>();
  /** @internal */
  readonly viewRendered$ = new Subject<{
    view: EmbeddedViewRef<RxVirtualForViewContext<T, U>>;
    index: number;
    item: T;
  }>();
  /** @internal */
  readonly renderingStart$ = new Subject<void>();

  private get template(): TemplateRef<RxVirtualForViewContext<T, U>> {
    return this._template || this.templateRef;
  }

  /** @internal */
  constructor(
    private scrollStrategy: RxVirtualScrollStrategy<T, U>,
    private iterableDiffers: IterableDiffers,
    private cdRef: ChangeDetectorRef,
    private ngZone: NgZone,
    private eRef: ElementRef,
    private readonly templateRef: TemplateRef<RxVirtualForViewContext<T, U>>,
    private readonly viewContainerRef: ViewContainerRef,
    private strategyProvider: RxStrategyProvider,
    private errorHandler: ErrorHandler
  ) {}

  /** @internal */
  private strategyInput$ = new ReplaySubject<string | Observable<string>>(1);

  /** @internal */
  private observables$ = new ReplaySubject<
    Observable<NgIterable<T>> | NgIterable<T>
  >(1);

  /** @internal */
  private _renderCallback: Subject<any>;

  /** @internal */
  readonly values$ = this.observables$.pipe(
    coerceDistinctWith(),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  /** @internal */
  private values?: NgIterable<T>;

  /** @internal */
  private readonly strategy$ = this.strategyInput$.pipe(coerceDistinctWith());

  /** @internal */
  private listManager: VirtualListManager<T, RxVirtualForViewContext<T, U>>;

  /** @internal */
  private _destroy$ = new Subject<void>();

  /** @internal */
  static ngTemplateContextGuard<
    T,
    U extends NgIterable<T> = NgIterable<T>,
    K = keyof T
  >(
    dir: RxVirtualFor<T, U>,
    ctx: any
  ): ctx is RxVirtualForViewContext<T, U, K> {
    return true;
  }

  /** @internal */
  _trackBy: TrackByFunction<T> = (i, a) => a;

  /** @internal */
  ngOnInit() {
    this.listManager = createVirtualListManager<
      T,
      RxVirtualForViewContext<T, U>
    >({
      iterableDiffers: this.iterableDiffers,
      renderSettings: {
        cdRef: this.cdRef,
        strategies: this.strategyProvider.strategies as any, // TODO: move strategyProvider
        defaultStrategyName: this.strategyProvider.primaryStrategy,
        parent: !!this.renderParent,
        patchZone: this.patchZone ? this.ngZone : false,
        errorHandler: this.errorHandler,
      },
      templateSettings: {
        patchZone: false,
        viewContainerRef: this.viewContainerRef,
        templateRef: this.template,
        createViewContext: this.createViewContext.bind(this),
        updateViewContext: this.updateViewContext.bind(this),
        viewCacheSize: this.viewCacheSize,
      },
      trackBy: this._trackBy,
    });
    this.listManager.nextStrategy(this.strategy$);
    this.values$.pipe(takeUntil(this._destroy$)).subscribe((values) => {
      this.values = values;
    });
    this.listManager
      .render(this.values$, this.scrollStrategy.renderedRange$)
      .pipe(takeUntil(this._destroy$))
      .subscribe((v) => {
        this.rendered$.next(v);
        this._renderCallback?.next(v);
      });
    this.listManager.viewsRendered$
      .pipe(takeUntil(this._destroy$))
      .subscribe(this.viewsRendered$);
    this.listManager.viewRendered$
      .pipe(takeUntil(this._destroy$))
      .subscribe(this.viewRendered$);
    this.listManager.renderingStart$
      .pipe(takeUntil(this._destroy$))
      .subscribe(this.renderingStart$);
  }

  /** @internal */
  createViewContext(
    item: T,
    computedContext: RxListViewComputedContext
  ): RxVirtualForViewContext<T> {
    return new RxVirtualForViewContext<T>(item, this.values, computedContext);
  }

  /** @internal */
  updateViewContext(
    item: T,
    view: EmbeddedViewRef<RxVirtualForViewContext<T>>,
    computedContext: RxListViewComputedContext
  ): void {
    view.context.updateContext(computedContext);
    view.context.$implicit = item;
    view.context.rxVirtualForOf = this.values;
  }

  /** @internal */
  ngOnDestroy() {
    this._destroy$.next();
    this.listManager.detach();
  }
}
