import {
  ChangeDetectorRef,
  Directive,
  DoCheck,
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
import {
  coerceDistinctWith,
  coerceObservableWith,
} from '@rx-angular/cdk/coercing';
import {
  RxStrategyNames,
  RxStrategyProvider,
} from '@rx-angular/cdk/render-strategies';
import {
  createListTemplateManager,
  RxListManager,
  RxListViewComputedContext,
} from '@rx-angular/cdk/template';
import {
  isObservable,
  Observable,
  ReplaySubject,
  Subject,
  Subscription,
} from 'rxjs';
import { shareReplay, switchAll } from 'rxjs/operators';
import { RxForViewContext } from './for-view-context';

/**
 * @description Will be provided through Terser global definitions by Angular CLI
 * during the production build.
 */
declare const ngDevMode: boolean;

/**
 * @Directive RxFor
 *
 * @description
 *
 * The most common way to render lists in angular is by using the `*ngFor` structural directive. `*ngFor` is able
 * to take an arbitrary list of data and repeat a defined template per item of the list. However, it can
 * only do it synchronously.
 *
 * Compared to the `NgFor`, `RxFor` treats each child template as single renderable unit.
 * The change detection of the child templates get prioritized, scheduled and executed by
 * leveraging `RenderStrategies` under the hood.
 * This technique enables non-blocking rendering of lists and can be referred to as `concurrent mode`.
 *
 * Read more about this in the [strategies
 * section](https://www.rx-angular.io/docs/template/api/rx-for-directive#rxfor-with-concurrent-strategies).
 *
 * Furthermore, `RxFor` provides hooks to react to rendered items in form of a `renderCallback: Subject`.
 *
 * Together with the `RxRenderStrategies`, this makes the rendering behavior extremely versatile
 * and transparent for the developer.
 * Each instance of `RxFor` can be configured to render with different settings.
 *
 * Read more in the [official docs](https://www.rx-angular.io/docs/template/api/rx-for-directive)
 *
 * @docsCategory RxFor
 * @docsPage RxFor
 * @publicApi
 */
@Directive({
  selector: '[rxFor][rxForOf]',
  standalone: true,
})
export class RxFor<T, U extends NgIterable<T> = NgIterable<T>>
  implements OnInit, DoCheck, OnDestroy
{
  /** @internal */
  private iterableDiffers = inject(IterableDiffers);
  /** @internal */
  private cdRef = inject(ChangeDetectorRef);
  /** @internal */
  private ngZone = inject(NgZone);
  /** @internal */
  private viewContainerRef = inject(ViewContainerRef);
  /** @internal */
  private strategyProvider = inject(RxStrategyProvider);
  /** @internal */
  private errorHandler = inject(ErrorHandler);

  /** @internal */
  private staticValue?: U;
  /** @internal */
  private renderStatic = false;

  /**
   * @description
   * The iterable input
   *
   * @example
   * <ng-container *rxFor="heroes$; let hero">
   *   <app-hero [hero]="hero"></app-hero>
   * </ng-container>
   *
   * @param { Observable<(U & NgIterable<T>) | undefined | null>
   *       | (U & NgIterable<T>)
   *       | null
   *       | undefined } potentialObservable
   */
  @Input()
  set rxForOf(
    potentialObservable:
      | Observable<(U & NgIterable<T>) | undefined | null>
      | (U & NgIterable<T>)
      | null
      | undefined,
  ) {
    if (!isObservable(potentialObservable)) {
      this.staticValue = potentialObservable;
      this.renderStatic = true;
    } else {
      this.staticValue = undefined;
      this.renderStatic = false;
      this.observables$.next(potentialObservable);
    }
  }

  /**
   * @internal
   * A reference to the template that is created for each item in the iterable.
   * @see [template reference variable](guide/template-reference-variables)
   * (inspired by @angular/common `ng_for_of.ts`)
   */
  private _template: TemplateRef<RxForViewContext<T, U>>;
  @Input()
  set rxForTemplate(value: TemplateRef<RxForViewContext<T, U>>) {
    this._template = value;
  }

  /**
   * @description
   *
   * You can change the used `RenderStrategy` by using the `strategy` input of the `*rxFor`. It accepts
   * an `Observable<RxStrategyNames>` or [`RxStrategyNames`](https://github.com/rx-angular/rx-angular/blob/b0630f69017cc1871d093e976006066d5f2005b9/libs/cdk/render-strategies/src/lib/model.ts#L52).
   *
   * The default value for strategy is
   * [`normal`](https://www.rx-angular.io/docs/template/cdk/render-strategies/strategies/concurrent-strategies).
   *
   * Read more about this in the
   * [official docs](https://www.rx-angular.io/docs/template/api/rx-for-directive#use-render-strategies-strategy).
   *
   * @example
   *
   * \@Component({
   *   selector: 'app-root',
   *   template: `
   *     <ng-container *rxFor="let hero of heroes$; strategy: strategy">
   *       <app-hero [hero]="hero"></app-hero>
   *     </ng-container>
   *
   *     <ng-container *rxFor="let hero of heroes$; strategy: strategy$">
   *       <app-hero [hero]="hero"></app-hero>
   *     </ng-container>
   *   `
   * })
   * export class AppComponent {
   *   strategy = 'low';
   *   strategy$ = of('immediate');
   * }
   *
   * @param {string | Observable<string> | undefined} strategyName
   * @see {@link strategies}
   */
  @Input()
  set rxForStrategy(
    strategyName: RxStrategyNames | Observable<RxStrategyNames> | undefined,
  ) {
    this.strategyInput$.next(strategyName);
  }

  /**
   * @description
   *
   * When local rendering strategies are used, we need to treat view and content queries in a
   * special way.
   * To make `*rxFor` in such situations, a certain mechanism is implemented to
   * execute change detection on the parent (`parent`).
   *
   * This is required if your components state is dependent on its view or content children:
   *
   * - `@ViewChild`
   * - `@ViewChildren`
   * - `@ContentChild`
   * - `@ContentChildren`
   *
   * Read more about this in the
   * [official docs](https://www.rx-angular.io/docs/template/api/rx-for-directive#local-strategies-and-view-content-queries-parent).
   *
   * @example
   * \@Component({
   *   selector: 'app-root',
   *   template: `
   *    <app-list-component>
   *      <app-list-item
   *        *rxFor="
   *          let item of items$;
   *          trackBy: trackItem;
   *          parent: true;
   *        "
   *      >
   *        <div>{{ item.name }}</div>
   *      </app-list-item>
   *    </app-list-component>
   *   `
   * })
   * export class AppComponent {
   *   items$ = itemService.getItems();
   * }
   *
   * @param {boolean} renderParent
   *
   * @deprecated this flag will be dropped soon, as it is no longer required when using signal based view & content queries
   */
  @Input('rxForParent') renderParent = this.strategyProvider.config.parent;

  /**
   * @description
   *
   * A flag to control whether *rxFor templates are created within `NgZone` or not.
   * The default value is `true, `*rxFor` will create it's `EmbeddedViews` inside `NgZone`.
   *
   * Event listeners normally trigger zone. Especially high frequently events cause performance issues.
   *
   * Read more about this in the
   * [official docs](https://www.rx-angular.io/docs/template/api/rx-for-directive#working-with-event-listeners-patchzone).
   *
   * @example
   * \@Component({
   *   selector: 'app-root',
   *   template: `
   *    <app-list-component>
   *      <app-list-item
   *        *rxFor="
   *          let item of items$;
   *          trackBy: trackItem;
   *          patchZone: false;
   *        "
   *      >
   *        <div>{{ item.name }}</div>
   *      </app-list-item>
   *    </app-list-component>
   *   `
   * })
   * export class AppComponent {
   *   items$ = itemService.getItems();
   * }
   *
   * @param {boolean} patchZone
   */
  @Input('rxForPatchZone') patchZone = this.strategyProvider.config.patchZone;

  /**
   * @description
   * A function or key that defines how to track changes for items in the iterable.
   *
   * When items are added, moved, or removed in the iterable,
   * the directive must re-render the appropriate DOM nodes.
   * To minimize churn in the DOM, only nodes that have changed
   * are re-rendered.
   *
   * By default, rxFor assumes that the object instance identifies the node in the iterable (equality check `===`).
   * When a function or key is supplied, rxFor uses the result to identify the item node.
   *
   * @example
   * \@Component({
   *   selector: 'app-root',
   *   template: `
   *    <app-list-component>
   *      <app-list-item
   *        *rxFor="
   *          let item of items$;
   *          trackBy: 'id';
   *        "
   *      >
   *        <div>{{ item.name }}</div>
   *      </app-list-item>
   *    </app-list-component>
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
   *    <app-list-component>
   *      <app-list-item
   *        *rxFor="
   *          let item of items$;
   *          trackBy: trackItem;
   *        "
   *      >
   *        <div>{{ item.name }}</div>
   *      </app-list-item>
   *    </app-list-component>
   *   `
   * })
   * export class AppComponent {
   *   items$ = itemService.getItems();
   *   trackItem = (idx, item) => item.id;
   * }
   *
   * @param trackByFnOrKey
   */
  @Input('rxForTrackBy')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  set trackBy(trackByFnOrKey: keyof T | ((idx: number, i: T) => any)) {
    if (
      (typeof ngDevMode === 'undefined' || ngDevMode) &&
      trackByFnOrKey != null &&
      typeof trackByFnOrKey !== 'string' &&
      typeof trackByFnOrKey !== 'function'
    ) {
      console.warn(
        `trackBy must be a function, but received ${JSON.stringify(
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
   * A `Subject` which emits whenever *rxFor finished rendering a set changes to the view.
   * This enables developers to perform actions when a list has finished rendering.
   * The `renderCallback` is useful in situations where you rely on specific DOM properties like the `height` a
   * table after all items got rendered.
   * It is also possible to use the renderCallback in order to determine if a view should be visible or not. This
   * way developers can hide a list as long as it has not finished rendering.
   *
   * The result of the `renderCallback` will contain the currently rendered set of items in the iterable.
   *
   * @example
   * \Component({
   *   selector: 'app-root',
   *   template: `
   *   <app-list-component>
   *     <app-list-item
   *       *rxFor="
   *         let item of items$;
   *         trackBy: trackItem;
   *         renderCallback: itemsRendered;
   *       ">
   *       <div>{{ item.name }}</div>
   *     </app-list-item>
   *   </app-list-component>
   * `
   * })
   * export class AppComponent {
   *   items$: Observable<Item[]> = itemService.getItems();
   *   trackItem = (idx, item) => item.id;
   *   // this emits whenever rxFor finished rendering changes
   *   itemsRendered = new Subject<Item[]>();
   *
   *   constructor(elementRef: ElementRef<HTMLElement>) {
   *     itemsRendered.subscribe(() => {
   *       // items are rendered, we can now scroll
   *       elementRef.scrollTo({bottom: 0});
   *     })
   *   }
   * }
   *
   * @param {Subject<U>} renderCallback
   */
  @Input('rxForRenderCallback') set renderCallback(renderCallback: Subject<U>) {
    this._renderCallback = renderCallback;
  }

  private get template(): TemplateRef<RxForViewContext<T, U>> {
    return this._template || this.templateRef;
  }

  /** @internal */
  private strategyInput$ = new ReplaySubject<
    RxStrategyNames | Observable<RxStrategyNames>
  >(1);

  /** @internal */
  private observables$ = new ReplaySubject<Observable<U> | U>(1);

  /** @internal */
  private _renderCallback: Subject<any>;

  /** @internal */
  private readonly values$ = this.observables$.pipe(
    coerceObservableWith(),
    switchAll(),
    shareReplay({ refCount: true, bufferSize: 1 }),
  );

  /** @internal */
  private values: U | undefined | null = null;

  /** @internal */
  private readonly strategy$ = this.strategyInput$.pipe(coerceDistinctWith());

  /** @internal */
  private listManager: RxListManager<T>;

  /** @internal */
  private _subscription = new Subscription();

  /** @internal */
  _trackBy: TrackByFunction<T>;
  /** @internal */
  _distinctBy = (a: T, b: T) => a === b;

  constructor(
    private readonly templateRef: TemplateRef<RxForViewContext<T, U>>,
  ) {}

  /** @internal */
  ngOnInit() {
    this._subscription.add(this.values$.subscribe((v) => (this.values = v)));
    this.listManager = createListTemplateManager<T, RxForViewContext<T>>({
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
        viewContainerRef: this.viewContainerRef,
        templateRef: this.template,
        createViewContext: this.createViewContext.bind(this),
        updateViewContext: this.updateViewContext.bind(this),
      },
      trackBy: this._trackBy,
    });
    this.listManager.nextStrategy(this.strategy$);
    this._subscription.add(
      this.listManager
        .render(this.values$)
        .subscribe((v) => this._renderCallback?.next(v)),
    );
  }

  /** @internal */
  createViewContext(
    item: T,
    computedContext: RxListViewComputedContext,
  ): RxForViewContext<T, U> {
    return new RxForViewContext<T, U>(item, this.values, computedContext);
  }

  /** @internal */
  updateViewContext(
    item: T,
    view: EmbeddedViewRef<RxForViewContext<T>>,
    computedContext: RxListViewComputedContext,
  ): void {
    view.context.updateContext(computedContext);
    view.context.rxForOf = this.values;
    view.context.$implicit = item;
  }

  /** @internal */
  ngDoCheck() {
    if (this.renderStatic) {
      this.observables$.next(this.staticValue);
    }
  }

  /** @internal */
  ngOnDestroy() {
    this._subscription.unsubscribe();
    this.viewContainerRef.clear();
  }

  /** @internal */
  static ngTemplateContextGuard<
    T,
    U extends NgIterable<T> = NgIterable<T>,
    K = keyof T,
  >(dir: RxFor<T, U>, ctx: any): ctx is RxForViewContext<T, U, K> {
    return true;
  }
}
