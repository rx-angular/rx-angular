import {
  ChangeDetectorRef,
  Directive,
  EmbeddedViewRef,
  ErrorHandler,
  inject,
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
import { coerceDistinctWith } from '@rx-angular/cdk/coercing';
import {
  RxStrategyNames,
  RxStrategyProvider,
} from '@rx-angular/cdk/render-strategies';
import { RxListViewComputedContext } from '@rx-angular/cdk/template';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { shareReplay, takeUntil } from 'rxjs/operators';

import {
  RxVirtualForViewContext,
  RxVirtualScrollStrategy,
  RxVirtualViewRepeater,
} from './model';
import {
  DEFAULT_VIEW_CACHE_SIZE,
  RX_VIRTUAL_SCROLL_DEFAULT_OPTIONS,
  RxVirtualScrollDefaultOptions,
} from './virtual-scroll.config';
import {
  createVirtualListManager,
  VirtualListManager,
} from './virtual-template-manager';

/**
 * @description Will be provided through Terser global definitions by Angular CLI
 * during the production build.
 */
declare const ngDevMode: boolean;

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
  selector: '[rxVirtualFor]',
  providers: [{ provide: RxVirtualViewRepeater, useExisting: RxVirtualFor }],
  standalone: true,
})
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export class RxVirtualFor<T, U extends NgIterable<T> = NgIterable<T>>
  implements RxVirtualViewRepeater<T>, OnInit, OnDestroy
{
  /** @internal */
  static ngTemplateGuard_rxVirtualFor: 'binding';

  private readonly scrollStrategy = inject(RxVirtualScrollStrategy<T, U>);
  private readonly iterableDiffers = inject(IterableDiffers);
  private readonly cdRef = inject(ChangeDetectorRef);
  private readonly ngZone = inject(NgZone);
  private readonly templateRef = inject(
    TemplateRef<RxVirtualForViewContext<T, U>>
  );
  private readonly viewContainerRef = inject(ViewContainerRef);
  private readonly strategyProvider = inject(RxStrategyProvider);
  private readonly errorHandler = inject(ErrorHandler);
  private readonly defaults? = inject(RX_VIRTUAL_SCROLL_DEFAULT_OPTIONS, {
    optional: true,
  });

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
   * @param potentialObservable
   */
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
   * @param potentialObservable
   */
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
  private _template?: TemplateRef<RxVirtualForViewContext<T, U>>;
  @Input()
  set rxVirtualForTemplate(value: TemplateRef<RxVirtualForViewContext<T, U>>) {
    this._template = value;
  }

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
    strategyName: RxStrategyNames<string> | Observable<RxStrategyNames<string>>
  ) {
    this.strategyInput$.next(strategyName);
  }

  /**
   * @description
   * Controls the amount if views held in cache for later re-use when a user is
   * scrolling the list. If this is set to 0, `rxVirtualFor` won't cache any view,
   * thus destroying & re-creating very often on scroll events.
   */
  @Input('rxVirtualForViewCacheSize') viewCacheSize =
    this.defaults?.viewCacheSize || DEFAULT_VIEW_CACHE_SIZE;

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
  set trackBy(trackByFnOrKey: keyof T | ((idx: number, i: T) => unknown)) {
    if (typeof trackByFnOrKey === 'function') {
      this._trackBy = trackByFnOrKey;
    } else if (typeof trackByFnOrKey === 'string') {
      this._trackBy = (i, a) => a[trackByFnOrKey];
    } else if (ngDevMode) {
      throw new Error(
        `Received incorrect value for trackBy, expected string | ((idx: number, i: T) => unknown), got ${typeof trackByFnOrKey}`
      );
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
    renderCallback: Subject<T>
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

  /** @internal */
  private get template(): TemplateRef<RxVirtualForViewContext<T, U>> {
    return this._template || this.templateRef;
  }

  /** @internal */
  private strategyInput$ = new ReplaySubject<string | Observable<string>>(1);

  /** @internal */
  private observables$ = new ReplaySubject<
    | Observable<NgIterable<T> | null | undefined>
    | NgIterable<T>
    | null
    | undefined
  >(1);

  /** @internal */
  private _renderCallback?: Subject<T>;

  /** @internal */
  readonly values$ = this.observables$.pipe(
    coerceDistinctWith(),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  /** @internal */
  private values?: NgIterable<T> | null | undefined;

  /** @internal */
  private readonly strategy$ = this.strategyInput$.pipe(coerceDistinctWith());

  /** @internal */
  private listManager!: VirtualListManager<T, RxVirtualForViewContext<T, U>>;

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
  ): ctx is RxVirtualForViewContext<T, U, RxListViewComputedContext, K> {
    return true;
  }

  /** @internal */
  _trackBy: TrackByFunction<T> = (i, a) => a;

  /** @internal */
  ngOnInit() {
    this.listManager = createVirtualListManager<
      T,
      RxVirtualForViewContext<T, U, RxListViewComputedContext>,
      RxListViewComputedContext
    >({
      iterableDiffers: this.iterableDiffers,
      renderSettings: {
        cdRef: this.cdRef,
        strategies: this.strategyProvider.strategies as any, // TODO: move strategyProvider
        defaultStrategyName: this.strategyProvider.primaryStrategy,
        parent: this.renderParent,
        patchZone: this.patchZone ? this.ngZone : undefined,
        errorHandler: this.errorHandler,
      },
      templateSettings: {
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
  ): RxVirtualForViewContext<T, U, RxListViewComputedContext> {
    return new RxVirtualForViewContext(
      item,
      this.values! as U,
      computedContext
    );
  }

  /** @internal */
  updateViewContext(
    item: T,
    view: EmbeddedViewRef<
      RxVirtualForViewContext<T, U, RxListViewComputedContext>
    >,
    computedContext?: RxListViewComputedContext
  ): void {
    view.context.updateContext(computedContext!);
    view.context.$implicit = item;
    view.context.rxVirtualForOf = this.values! as U;
  }

  /** @internal */
  ngOnDestroy() {
    this._destroy$.next();
    this.listManager.detach();
  }
}
