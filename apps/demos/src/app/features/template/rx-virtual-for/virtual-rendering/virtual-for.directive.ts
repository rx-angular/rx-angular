import { coerceBooleanProperty } from '@angular/cdk/coercion';
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
import {
  RxDefaultListViewContext,
  RxListViewComputedContext,
  RxListViewContext,
} from '@rx-angular/cdk/template';
import { RxStrategyProvider } from '@rx-angular/cdk/render-strategies';
import { coerceDistinctWith } from '@rx-angular/cdk/coercing';

import { Observable, ReplaySubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
  RxVirtualScrollStrategy,
  RxVirtualScrollViewport,
  RxVirtualViewRepeater,
} from './model';
import { RxVirtualScrollViewportComponent } from './virtual-scroll-viewport.component';
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
  static ngTemplateGuard_rxFor: 'binding';

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

  @Input('rxVirtualForStrategy')
  set strategy(strategyName: string | Observable<string> | undefined) {
    this.strategyInput$.next(strategyName);
  }

  @Input('rxVirtualForParent') renderParent = true;

  @Input('rxVirtualForPatchZone') patchZone =
    this.strategyProvider.config.patchZone;

  @Input('rxVirtualForTombstone') tombstone: TemplateRef<
    RxListViewContext<T>
  > | null = null;

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
  readonly contentRendered$ = new Subject<any>();

  /** @internal */
  constructor(
    private scrollStrategy: RxVirtualScrollStrategy,
    private iterableDiffers: IterableDiffers,
    private cdRef: ChangeDetectorRef,
    private ngZone: NgZone,
    private eRef: ElementRef,
    private readonly templateRef: TemplateRef<RxDefaultListViewContext<T>>,
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
  readonly values$ = this.observables$.pipe(coerceDistinctWith());

  /** @internal */
  private readonly strategy$ = this.strategyInput$.pipe(coerceDistinctWith());

  /** @internal */
  private listManager: VirtualListManager<T>;

  /** @internal */
  private _destroy$ = new Subject<void>();

  /** @internal */
  static ngTemplateContextGuard<U>(
    dir: RxVirtualFor<U>,
    ctx: unknown | null | undefined
  ): ctx is RxDefaultListViewContext<U> {
    return true;
  }

  /** @internal */
  _trackBy: TrackByFunction<T> = (i, a) => a;
  /** @internal */
  _distinctBy = (a: T, b: T) => a === b;

  /** @internal */
  ngOnInit() {
    this.listManager = createVirtualListManager<T, RxDefaultListViewContext<T>>(
      {
        iterableDiffers: this.iterableDiffers,
        renderSettings: {
          cdRef: this.cdRef,
          eRef: this.eRef,
          strategies: this.strategyProvider.strategies as any, // TODO: move strategyProvider
          defaultStrategyName: this.strategyProvider.primaryStrategy,
          parent: coerceBooleanProperty(this.renderParent),
          patchZone: this.patchZone ? this.ngZone : false,
          errorHandler: this.errorHandler,
        },
        templateSettings: {
          patchZone: false,
          viewContainerRef: this.viewContainerRef,
          templateRef: this.templateRef,
          createViewContext: this.createViewContext,
          updateViewContext: this.updateViewContext,
        },
        trackBy: this._trackBy,
      }
    );
    this.listManager.nextStrategy(this.strategy$);
    this.listManager
      .render(this.values$, this.scrollStrategy.renderedRange$)
      .pipe(takeUntil(this._destroy$))
      .subscribe((v) => {
        this._renderCallback?.next(v);
      });
    this.listManager.viewsRendered$
      .pipe(takeUntil(this._destroy$))
      .subscribe((v) => {
        this.contentRendered$.next(v);
      });
  }

  /** @internal */
  createViewContext(
    item: T,
    computedContext: RxListViewComputedContext
  ): RxDefaultListViewContext<T> {
    return new RxDefaultListViewContext<T>(item, computedContext);
  }

  /** @internal */
  updateViewContext(
    item: T,
    view: EmbeddedViewRef<RxListViewContext<T>>,
    computedContext: RxListViewComputedContext
  ): void {
    view.context.updateContext(computedContext);
    view.context.$implicit = item;
  }

  /** @internal */
  ngOnDestroy() {
    this._destroy$.next();
    this.viewContainerRef.clear();
  }
}
