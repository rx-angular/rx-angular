import {
  ChangeDetectorRef,
  Directive,
  DoCheck,
  EmbeddedViewRef,
  ErrorHandler,
  inject,
  Injector,
  Input,
  isSignal,
  IterableChanges,
  IterableDiffer,
  IterableDiffers,
  NgIterable,
  NgZone,
  OnDestroy,
  OnInit,
  Signal,
  TemplateRef,
  TrackByFunction,
  ViewContainerRef,
} from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { coerceObservableWith } from '@rx-angular/cdk/coercing';
import {
  onStrategy,
  RxStrategyCredentials,
  RxStrategyNames,
  RxStrategyProvider,
  strategyHandling,
} from '@rx-angular/cdk/render-strategies';
import { RxListViewComputedContext } from '@rx-angular/cdk/template';
import { Promise } from '@rx-angular/cdk/zone-less/browser';
import {
  combineLatest,
  concat,
  ConnectableObservable,
  isObservable,
  MonoTypeOperatorFunction,
  NEVER,
  Observable,
  of,
  ReplaySubject,
  Subject,
} from 'rxjs';
import {
  catchError,
  distinctUntilChanged,
  ignoreElements,
  map,
  shareReplay,
  switchAll,
  switchMap,
  take,
  takeUntil,
  tap,
} from 'rxjs/operators';
import {
  CollectionViewer,
  DataSource,
  ListRange,
  RxVirtualForViewContext,
  RxVirtualScrollStrategy,
  RxVirtualViewRepeater,
} from './model';
import {
  createVirtualListTemplateManager,
  RxVirtualListTemplateManager,
} from './virtual-list-template-manager';
import {
  DEFAULT_TEMPLATE_CACHE_SIZE,
  RX_VIRTUAL_SCROLL_DEFAULT_OPTIONS,
} from './virtual-scroll.config';

/**
 * @description Will be provided through Terser global definitions by Angular CLI
 * during the production build.
 */
declare const ngDevMode: boolean;

const NG_DEV_MODE = typeof ngDevMode === 'undefined' || !!ngDevMode;

/**
 * @Directive RxVirtualFor
 *
 * @description
 *
 * The `*rxVirtualFor` structural directive provides a convenient and performant
 * way for rendering huge lists of items. It brings all the benefits `rxFor` does,
 * and implements virtual rendering.
 *
 * Instead of rendering every item provided, rxVirtualFor only renders what is
 * currently visible to the user, thus providing excellent runtime performance
 * for huge sets of data.
 *
 * The technique to render items is comparable to the on used by twitter and
 * explained in very much detail by @DasSurma in his blog post about the [complexities
 * of infinite scrollers](https://developer.chrome.com/blog/infinite-scroller/).
 *
 * "Each recycling of a DOM element would normally relayout the entire runway which
 * would bring us well below our target of 60 frames per second.
 * To avoid this, we are taking the burden of layout onto ourselves and use
 * absolutely positioned elements with transforms." (@DasSurma)
 *
 * ## API
 * The API is a combination of \@rx-angular/template/for &
 *  \@angular/cdk `*cdkVirtualFor`.
 * * trackBy: `(index: number, item: T) => any` | `keyof T`
 * * strategy: `string` | `Observable<string>`
 * * parent: `boolean`;
 * * renderCallback: `Subject<T[]>`
 * * viewCache: `number`
 * * (Injected) scrollStrategy: `RxVirtualScrollStrategy<T, U>`
 * * provides itself as RxVirtualViewRepeater for RxVirtualViewPortComponent to operate
 *
 * ## Features
 * * Push based architecture
 * * Comprehensive set of context variables
 * * Opt-out of `NgZone` with `patchZone`
 * * Notify when rendering of child templates is finished (`renderCallback`)
 * * Super efficient layouting with css transformations
 * * Define a viewCache in order to re-use views instead of re-creating them
 * * Configurable RxVirtualScrollStrategy<T, U> providing the core logic to calculate the viewRange and position DOM
 * Nodes
 *
 * ### Context Variables
 *
 * The following context variables are available for each template:
 *
 * - $implicit: `T` // the default variable accessed by `let val`
 * - item$: `Observable<T>` // the same value as $implicit, but as `Observable`
 * - index: `number` // current index of the item
 * - count: `number` // count of all items in the list
 * - first: `boolean` // true if the item is the first in the list
 * - last: `boolean` // true if the item is the last in the list
 * - even: `boolean` // true if the item has on even index (index % 2 === 0)
 * - odd: `boolean` // the opposite of even
 * - index$: `Observable<number>` // index as `Observable`
 * - count$: `Observable<number>` // count as `Observable`
 * - first$: `Observable<boolean>` // first as `Observable`
 * - last$: `Observable<boolean>` // last as `Observable`
 * - even$: `Observable<boolean>` // even as `Observable`
 * - odd$: `Observable<boolean>` // odd as `Observable`
 * - select: `(keys: (keyof T)[], distinctByMap) => Observable<Partial<T>>`
 * // returns a selection function which
 * // accepts an array of properties to pluck out of every list item. The function returns the selected properties of
 * // the current list item as distinct `Observable` key-value-pair. See the example below:
 *
 * This example showcases the `select` view-context function used for deeply nested lists.
 *
 *  ```html
 * <rx-virtual-scroll-viewport>
 *   <div
 *    autosized
 *    *rxVirtualFor="let hero of heroes$; trackBy: trackItem; let select = select;">
 *     <div>
 *       <strong>{{ hero.name }}</strong></br>
 *       Defeated enemies:
 *     </div>
 *      <span *rxFor="let enemy of select(['defeatedEnemies']); trackBy: trackEnemy;">
 *        {{ enemy.name }}
 *      </span>
 *   </div>
 * </rx-virtual-scroll-viewport>
 *  ```
 *
 * ### Using the context variables
 *
 * ```html
 * <rx-virtual-scroll-viewport>
 *  <div
 *     *rxVirtualFor="
 *       let item of observableItems$;
 *       let count = count;
 *       let index = index;
 *       let first = first;
 *       let last = last;
 *       let even = even;
 *       let odd = odd;
 *       trackBy: trackItem;
 *     "
 *   >
 *     <div>{{ count }}</div>
 *     <div>{{ index }}</div>
 *     <div>{{ item }}</div>
 *     <div>{{ first }}</div>
 *     <div>{{ last }}</div>
 *     <div>{{ even }}</div>
 *     <div>{{ odd }}</div>
 *   </div>
 * </rx-virtual-scroll-viewport>
 * ```
 *
 * @docsCategory RxVirtualFor
 * @docsPage RxVirtualFor
 * @publicApi
 */
@Directive({
  selector: '[rxVirtualFor][rxVirtualForOf]',
  providers: [{ provide: RxVirtualViewRepeater, useExisting: RxVirtualFor }],
  standalone: true,
})
export class RxVirtualFor<T, U extends NgIterable<T> = NgIterable<T>>
  implements RxVirtualViewRepeater<T>, OnInit, DoCheck, OnDestroy
{
  private readonly scrollStrategy = inject(RxVirtualScrollStrategy<T, U>);
  private readonly iterableDiffers = inject(IterableDiffers);
  private readonly cdRef = inject(ChangeDetectorRef);
  private readonly ngZone = inject(NgZone);
  /** @internal */
  private injector = inject(Injector);
  readonly viewContainer = inject(ViewContainerRef);
  private readonly strategyProvider = inject(RxStrategyProvider);
  private readonly errorHandler = inject(ErrorHandler);
  private readonly defaults? = inject(RX_VIRTUAL_SCROLL_DEFAULT_OPTIONS, {
    optional: true,
  });

  /** @internal */
  private _differ?: IterableDiffer<T>;

  /** @internal */
  private partiallyFinished = false;

  /** @internal */
  private staticValue?: U;
  /** @internal */
  private renderStatic = false;

  /**
   * @description
   * The iterable input
   *
   * @example
   * <rx-virtual-scroll-viewport>
   *   <app-hero *rxVirtualFor="heroes$; let hero"
   *     [hero]="hero"></app-hero>
   * </rx-virtual-scroll-viewport>
   *
   * @param potentialSignalOrObservable
   */
  @Input()
  set rxVirtualForOf(
    potentialSignalOrObservable:
      | Observable<(U & NgIterable<T>) | undefined | null>
      | Signal<(U & NgIterable<T>) | undefined | null>
      | DataSource<T>
      | (U & NgIterable<T>)
      | null
      | undefined,
  ) {
    if (isSignal(potentialSignalOrObservable)) {
      this.staticValue = undefined;
      this.renderStatic = false;
      this.observables$.next(
        toObservable(potentialSignalOrObservable, { injector: this.injector }),
      );
    } else if (this.isDataSource(potentialSignalOrObservable)) {
      this.staticValue = undefined;
      this.renderStatic = false;

      const collectionViewer: CollectionViewer = {
        viewChange: this.scrollStrategy.renderedRange$,
      };

      this.observables$.next(
        potentialSignalOrObservable.connect(collectionViewer),
      );

      this._destroy$.pipe(take(1)).subscribe(() => {
        potentialSignalOrObservable.disconnect(collectionViewer);
      });
    } else if (!isObservable(potentialSignalOrObservable)) {
      this.staticValue = potentialSignalOrObservable;
      this.renderStatic = true;
    } else {
      this.staticValue = undefined;
      this.renderStatic = false;
      this.observables$.next(potentialSignalOrObservable);
    }
  }

  /** @internal */
  private isDataSource(
    value:
      | (U & NgIterable<T>)
      | Observable<U & NgIterable<T>>
      | DataSource<T>
      | null
      | undefined,
  ): value is DataSource<T> {
    return (
      value !== null &&
      value !== undefined &&
      'connect' in value &&
      typeof value.connect === 'function' &&
      !(value instanceof ConnectableObservable)
    );
  }

  /**
   * @internal
   * A reference to the template that is created for each item in the iterable.
   * @see [template reference variable](guide/template-reference-variables)
   * (inspired by @angular/common `ng_for_of.ts`)
   */
  private _template?: TemplateRef<RxVirtualForViewContext<T, U>>;
  @Input()
  set rxVirtualForTemplate(value: TemplateRef<RxVirtualForViewContext<T, U>>) {
    this._template = value;
  }

  /** @internal */
  private strategyHandler = strategyHandling(
    this.strategyProvider.primaryStrategy,
    this.strategyProvider.strategies,
  );
  /**
   * @description
   * The rendering strategy to be used to render updates to the DOM.
   * Use it to dynamically manage your rendering strategy. You can switch the strategy
   * imperatively (with a string) or by binding an Observable.
   * The default strategy is `'normal'` if not configured otherwise.
   *
   * @example
   * \@Component({
   *   selector: 'app-root',
   *   template: `
   *     <rx-virtual-scroll-viewport>
   *       <app-hero
   *        autosized
   *        *rxVirtualFor="let hero of heroes$; strategy: strategy"
   *        [hero]="hero"></app-hero>
   *     </rx-virtual-scroll-viewport>
   *   `
   * })
   * export class AppComponent {
   *   strategy = 'low';
   * }
   *
   * // OR
   *
   * \@Component({
   *   selector: 'app-root',
   *   template: `
   *     <rx-virtual-scroll-viewport>
   *       <app-hero
   *        autosized
   *        *rxVirtualFor="let hero of heroes$; strategy: strategy$"
   *        [hero]="hero"></app-hero>
   *     </rx-virtual-scroll-viewport>
   *   `
   * })
   * export class AppComponent {
   *   strategy$ = new BehaviorSubject('immediate');
   * }
   *
   * @param strategyName
   * @see {@link strategies}
   */
  @Input('rxVirtualForStrategy')
  set strategy(
    strategyName: RxStrategyNames<string> | Observable<RxStrategyNames<string>>,
  ) {
    this.strategyHandler.next(strategyName);
  }

  /**
   * @description
   * Controls the amount if views held in cache for later re-use when a user is
   * scrolling the list. If this is set to 0, `rxVirtualFor` won't cache any view,
   * thus destroying & re-creating very often on scroll events.
   */
  @Input('rxVirtualForTemplateCacheSize') templateCacheSize =
    this.defaults?.templateCacheSize || DEFAULT_TEMPLATE_CACHE_SIZE;

  /**
   * @description
   *  If `parent` is set to `true` (default to `false`), `*rxVirtualFor` will
   *  automatically run change-detection for its parent component when its scheduled
   *  tasks are done in order to update any pending `@ContentChild` or `@ViewChild`
   *  relation to be updated according to the updated ViewContainer.
   *
   * @example
   * \@Component({
   *   selector: 'app-root',
   *   template: `
   *   <rx-virtual-scroll-viewport>
   *      <app-list-item
   *        *rxVirtualFor="
   *          let item of items$;
   *          trackBy: trackItem;
   *          parent: true;
   *        "
   *        [item]="item"
   *        autosized
   *      ></app-list-item>
   *    </rx-virtual-scroll-viewport>
   *   `
   * })
   * export class AppComponent {
   *   // those queries won't be in sync with what `rxVirtualFor` is rendering
   *   // when parent is set to false.
   *   \@ViewChildren(AppListItem) listItems: QueryList<AppListItem>;
   *
   *   items$ = itemService.getItems();
   * }
   *
   * @param renderParent
   *
   * @deprecated this flag will be dropped soon, as it is no longer required when using signal based view & content queries
   */
  @Input('rxVirtualForParent') renderParent = false;

  /**
   * @description
   * A flag to control whether `*rxVirtualFor` rendering happens within
   * `NgZone` or not. The default value is set to `true` if not configured otherwise.
   * If `patchZone` is set to `false` `*rxVirtualFor` will operate completely outside of `NgZone`.
   *
   * @example
   * \@Component({
   *   selector: 'app-root',
   *   template: `
   *    <rx-virtual-scroll-viewport>
   *      <app-list-item
   *        *rxVirtualFor="
   *          let item of items$;
   *          trackBy: trackItem;
   *          patchZone: false;
   *        "
   *        [item]="item"
   *        autosized
   *      ></app-list-item>
   *    </rx-virtual-scroll-viewport>
   *   `
   * })
   * export class AppComponent {
   *   items$ = itemService.getItems();
   * }
   *
   * @param patchZone
   */
  @Input('rxVirtualForPatchZone') patchZone =
    this.strategyProvider.config.patchZone;

  /*@Input('rxVirtualForTombstone') tombstone: TemplateRef<
   RxVirtualForViewContext<T>
   > | null = null;*/

  /**
   * @description
   * A function or key that defines how to track changes for items in the provided
   * iterable data.
   *
   * When items are added, moved, or removed in the iterable,
   * the directive must re-render the appropriate DOM nodes.
   * To minimize operations on the DOM, only nodes that have changed
   * are re-rendered.
   *
   * By default, `rxVirtualFor` assumes that the object instance identifies
   * the node in the iterable (equality check `===`).
   * When a function or key is supplied, `rxVirtualFor` uses the result to identify the item node.
   *
   * @example
   * \@Component({
   *   selector: 'app-root',
   *   template: `
   *    <rx-virtual-scroll-viewport>
   *      <app-list-item
   *        *rxVirtualFor="
   *          let item of items$;
   *          trackBy: 'id';
   *        "
   *        autosized
   *        [item]="item"
   *      >
   *      </app-list-item>
   *    </rx-virtual-scroll-viewport>
   *   `
   * })
   * export class AppComponent {
   *   items$ = itemService.getItems();
   * }
   *
   * // OR
   *
   * \@Component({
   *   selector: 'app-root',
   *   template: `
   *   <rx-virtual-scroll-viewport>
   *      <app-list-item
   *        *rxVirtualFor="
   *          let item of items$;
   *          trackBy: trackItem;
   *        "
   *        autosized
   *        [item]="item"
   *      >
   *      </app-list-item>
   *    </rx-virtual-scroll-viewport>
   *   `
   * })
   * export class AppComponent {
   *   items$ = itemService.getItems();
   *   trackItem = (idx, item) => item.id;
   * }
   *
   * @param trackByFnOrKey
   */
  @Input('rxVirtualForTrackBy')
  set trackBy(trackByFnOrKey: keyof T | TrackByFunction<T>) {
    if (
      NG_DEV_MODE &&
      trackByFnOrKey != null &&
      typeof trackByFnOrKey !== 'string' &&
      typeof trackByFnOrKey !== 'symbol' &&
      typeof trackByFnOrKey !== 'function'
    ) {
      throw new Error(
        `trackBy must be typeof function or keyof T, but received ${JSON.stringify(
          trackByFnOrKey,
        )}.`,
      );
    }
    if (trackByFnOrKey == null) {
      this._trackBy = null;
    } else {
      this._trackBy =
        typeof trackByFnOrKey !== 'function'
          ? (i, a) => a[trackByFnOrKey]
          : trackByFnOrKey;
    }
  }

  /**
   * @description
   * A `Subject` which emits whenever `*rxVirtualFor` finished rendering a
   * set of changes to the view.
   * This enables developers to perform actions exactly at the timing when the
   * updates passed are rendered to the DOM.
   * The `renderCallback` is useful in situations where you rely on specific DOM
   * properties like the `height` of a table after all items got rendered.
   * It is also possible to use the renderCallback in order to determine if a
   * view should be visible or not. This way developers can hide a list as
   * long as it has not finished rendering.
   *
   * The result of the `renderCallback` will contain the currently rendered set
   * of items in the iterable.
   *
   * @example
   * \@Component({
   *   selector: 'app-root',
   *   template: `
   *    <rx-virtual-scroll-viewport>
   *      <app-list-item
   *        *rxVirtualFor="
   *          let item of items$;
   *          trackBy: trackItem;
   *          renderCallback: itemsRendered;
   *        "
   *        autosized
   *        [item]="item"
   *      >
   *      </app-list-item>
   *    </rx-virtual-scroll-viewport>
   *   `
   * })
   * export class AppComponent {
   *   items$: Observable<Item[]> = itemService.getItems();
   *   trackItem = (idx, item) => item.id;
   *   // this emits whenever rxVirtualFor finished rendering changes
   *   itemsRendered = new Subject<Item[]>();
   * }
   *
   * @param renderCallback
   */
  @Input('rxVirtualForRenderCallback') set renderCallback(
    renderCallback: Subject<U>,
  ) {
    this._renderCallback = renderCallback;
  }

  /** @internal */
  readonly viewsRendered$ = new Subject<
    EmbeddedViewRef<RxVirtualForViewContext<T, U, RxListViewComputedContext>>[]
  >();
  /** @internal */
  readonly viewRendered$ = new Subject<{
    view: EmbeddedViewRef<RxVirtualForViewContext<T, U>>;
    index: number;
    item: T;
  }>();
  /** @internal */
  readonly renderingStart$ = new Subject<Set<number>>();

  /** @internal */
  private get template(): TemplateRef<RxVirtualForViewContext<T, U>> {
    return this._template || this.templateRef;
  }

  /** @internal */
  private observables$ = new ReplaySubject<
    | Observable<NgIterable<T> | null | undefined>
    | NgIterable<T>
    | null
    | undefined
  >(1);

  /** @internal */
  private _renderCallback?: Subject<U>;

  /** @internal */
  readonly values$ = this.observables$.pipe(
    coerceObservableWith(),
    switchAll(),
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  /** @internal */
  private values?: NgIterable<T> | null | undefined;

  /** @internal */
  private templateManager!: RxVirtualListTemplateManager<
    T,
    RxVirtualForViewContext<T, U>
  >;

  /** @internal */
  private _destroy$ = new Subject<void>();

  /** @internal */
  _trackBy: TrackByFunction<T> | null = null;

  /** @internal */
  static ngTemplateContextGuard<
    T,
    U extends NgIterable<T> = NgIterable<T>,
    K = keyof T,
  >(
    dir: RxVirtualFor<T, U>,
    ctx: any,
  ): ctx is RxVirtualForViewContext<T, U, RxListViewComputedContext, K> {
    return true;
  }

  constructor(
    private readonly templateRef: TemplateRef<RxVirtualForViewContext<T, U>>,
  ) {}

  /** @internal */
  ngOnInit() {
    this.values$.pipe(takeUntil(this._destroy$)).subscribe((values) => {
      this.values = values;
    });
    this.templateManager = createVirtualListTemplateManager({
      viewContainerRef: this.viewContainer,
      templateRef: this.template,
      createViewContext: this.createViewContext.bind(this),
      updateViewContext: this.updateViewContext.bind(this),
      templateCacheSize: this.templateCacheSize,
    });
    // let the scroll strategy initialize before
    Promise.resolve().then(() => {
      this.render()
        .pipe(takeUntil(this._destroy$))
        .subscribe((v) => {
          this._renderCallback?.next(v as U);
        });
    });
  }

  /** @internal */
  ngDoCheck() {
    if (this.renderStatic) {
      this.observables$.next(this.staticValue);
    }
  }

  /** @internal */
  ngOnDestroy() {
    this._destroy$.next();
    this.templateManager.detach();
  }

  private render() {
    return combineLatest<[T[], ListRange, RxStrategyCredentials]>([
      this.values$.pipe(
        map((values) =>
          Array.isArray(values)
            ? values
            : values != null
              ? Array.from(values)
              : [],
        ),
      ),
      this.scrollStrategy.renderedRange$.pipe(
        distinctUntilChanged(
          (oldRange, newRange) =>
            oldRange.start === newRange.start && oldRange.end === newRange.end,
        ),
      ),
      this.strategyHandler.strategy$.pipe(distinctUntilChanged()),
    ]).pipe(
      switchMap(([items, range, strategy]) =>
        // wait for scrollStrategy to be stable until computing new state
        this.scrollStrategy.isStable.pipe(
          take(1),
          // map iterable to latest diff
          switchMap(() => {
            const iterable = items.slice(range.start, range.end);
            const differ = this.getDiffer(iterable);
            let changes: IterableChanges<T> | null = null;
            if (differ) {
              if (this.partiallyFinished) {
                const currentIterable = [];
                for (
                  let i = 0, ilen = this.viewContainer.length;
                  i < ilen;
                  i++
                ) {
                  const viewRef = <EmbeddedViewRef<any>>(
                    this.viewContainer.get(i)
                  );
                  currentIterable[i] = viewRef.context.$implicit;
                }
                differ.diff(currentIterable);
              }
              changes = differ.diff(iterable);
            }
            if (!changes) {
              return NEVER;
            }
            const listChanges = this.templateManager.getListChanges(
              changes,
              iterable,
              items.length,
              range.start,
            );
            const updates = listChanges[0].sort((a, b) => a[0] - b[0]);

            const indicesToPosition = new Set<number>();
            const insertedOrRemoved = listChanges[1];
            const work$ = updates.map(([index, work, removed]) => {
              if (!removed) {
                indicesToPosition.add(index);
              }
              return onStrategy(
                null,
                strategy,
                () => {
                  const update = work();
                  if (update.view) {
                    this.viewRendered$.next(update as any);
                  }
                },
                { ngZone: this.patchZone ? this.ngZone : undefined },
              );
            });
            this.partiallyFinished = true;
            const notifyParent = insertedOrRemoved && this.renderParent;
            this.renderingStart$.next(indicesToPosition);
            return combineLatest(
              // emit after all changes are rendered
              work$.length > 0 ? work$ : [of(iterable)],
            ).pipe(
              tap(() => {
                this.templateManager.setItemCount(items.length);
                this.partiallyFinished = false;
                const viewsRendered = [];
                const end = this.viewContainer.length;
                let i = 0;
                for (i; i < end; i++) {
                  viewsRendered.push(this.viewContainer.get(i));
                }
                this.viewsRendered$.next(viewsRendered as any);
              }),
              notifyParent
                ? switchMap((v) =>
                    concat(
                      of(v),
                      onStrategy(
                        null,
                        strategy,
                        (_, work, options) => {
                          work(this.cdRef, options.scope);
                        },
                        {
                          ngZone: this.patchZone ? this.ngZone : undefined,
                          scope: (this.cdRef as any).context || this.cdRef,
                        },
                      ).pipe(ignoreElements()),
                    ),
                  )
                : (o$) => o$,
              this.handleError(),
              map(() => iterable),
            );
          }),
        ),
      ),
      this.handleError(),
    );
  }

  private handleError<T>(): MonoTypeOperatorFunction<T | null> {
    return (o$) =>
      o$.pipe(
        catchError((err: Error) => {
          this.partiallyFinished = false;
          this.errorHandler.handleError(err);
          return of(null);
        }),
      );
  }

  private getDiffer(values: NgIterable<T>): IterableDiffer<T> | null {
    if (this._differ) {
      return this._differ;
    }
    return values
      ? (this._differ = this.iterableDiffers.find(values).create(this._trackBy))
      : null;
  }

  /** @internal */
  private createViewContext(
    item: T,
    computedContext: RxListViewComputedContext,
  ): RxVirtualForViewContext<T, U, RxListViewComputedContext> {
    return new RxVirtualForViewContext(
      item,
      this.values! as U,
      computedContext,
    );
  }

  /** @internal */
  private updateViewContext(
    item: T,
    view: EmbeddedViewRef<
      RxVirtualForViewContext<T, U, RxListViewComputedContext>
    >,
    computedContext?: RxListViewComputedContext,
  ): void {
    view.context.updateContext(computedContext!);
    view.context.$implicit = item;
    view.context.rxVirtualForOf = this.values! as U;
  }
}
