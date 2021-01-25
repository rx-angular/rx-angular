import {
  ChangeDetectorRef,
  Directive, ElementRef,
  Input,
  IterableDiffer,
  IterableDiffers,
  NgIterable,
  OnDestroy,
  OnInit,
  TemplateRef, TrackByFunction,
  ViewContainerRef,
} from '@angular/core';

import { ReplaySubject, Subject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { ngInputFlatten } from '../../../../shared/utils/ngInputFlatten';
import { StrategyProvider } from '../../../cdk/render-strategies/strategy-provider.service';
import {
  createListManager,
  ListManager,
} from '../../../cdk/template-management';
import { RxEffects } from '../../../state/rx-effects';
import { RxForViewContext } from './model/view-context';

/**
 * @Directive RxFor
 *
 * @description
 *
 * The `*rxFor` structural directive provides a convenient and performant way for rendering
 * templates out of a list of items.
 * Input values can be provided either as `Observable`, `Promise` or `static` values. Just as the `*ngFor` directive, the
 * `*rxFor` is placed on an
 * element, which becomes the parent of the cloned templates.
 *
 * The `RxFor` implements `EmbeddedView Rendering`.
 * Compared to the `NgForOf`, `RxFor` treats each child template as single renderable entity. For each
 * change in the provided list of items it will apply and detect changes to only affected views.
 *
 * Under the hood, it leverages the power of the `StrategyCredential`s which in turn take care of scheduling and
 * prioritizing the change detection for each child template (aka item in the list).
 * This way the rendering behavior of each instance of `RxFor` can be configured individually.
 *
 * `StrategyCredentials` and `EmbeddedView Rendering` together build the basis for the `concurrent mode`. Based on
 * the configured strategy every template will get processed in an individual task, which enables chunked and
 * cancellable rendering of the list.
 *
 * As further improvement compared to the basic `*ngFor` implementation, `*rxFor` is able to take care of
 * `ChangeDetection` in situations which include `projected views` (aka `@ContentChild` or `@ViewChild`).
 * Learn more about this in the example section.
 *
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
 * - select: `(keys: (keyof T)[], distinctByMap) => Observable<Partial<T>>` // returns a selection function which
 * accepts an array of properties to pluck out of every list item. The function returns the selected properties of
 * the current list item as distinct `Observable` key-value-pair. See the example below:
 *
 * This example showcases the `select` view-context function used for deeply nested lists.
 *
 *  ```html
 * <ul>
 *   <li *rxFor="let hero of heroes$; trackBy: trackItem; let select = select;">
 *     <div>
 *       <strong>{{ hero.name }}</strong></br>
 *       Defeated enemies:
 *     </div>
 *      <span *rxFor="let enemy of select(['defeatedEnemies']); trackBy: trackEnemy;">
 *        {{ enemy.name }}
 *      </span>
 *   </li>
 * </ul>
 *  ```
 *
 * ### Input properties
 *
 *  - trackBy: `(index: number, item: T) => any`
 *  - trackBy: `keyof T`
 *  - distinctBy: `(item: T, item: T) => boolean`
 *  - strategy: `string`
 *  - strategy: `Observable<string>`
 *  - parent: `boolean`;
 *  - renderCallback: `Subject<T[]>`
 *
 *
 * ### Features of `*rxFor`
 *
 * Included features for `*rxFor`:
 * - Push based architecture
 * - Immutable as well as mutable data structures (with `trackBy` & `distinctBy`)
 * - Provide a comprehensive set of context variables for each view
 * - Provide a way to fix `ChangeDetection` issues in `Projected Views` scenarios
 * - Notify about when rendering of child templates is finished (`renderCallback`)
 * - Fine-control template updates via the `distinctBy` function
 * - Reactive as well as imperative values in the template (`ngFor` drop-in replacement)
 * - `ListManager`: special logic for differ mechanism to avoid over-rendering; abstracts away low level logic
 * - render every `EmbeddedView` on its own while applying the configured `StrategyCredentials#behavior`
 * - cancel any scheduled work if a remove was triggered for a `trackById`
 * - cancel any update if a new update was triggered for the same `trackById`
 *
 *
 * ### Simple example using `*rxFor` with `Observable` values
 * ```html
 * <ul>
 *   <li *rxFor="let item of observableItems$; trackBy: trackItem">
 *      {{ item }}
 *   </li>
 * </ul>
 * ```
 *
 * ### Simple example using `*rxFor` with simple static values
 * ```html
 * <ul>
 *   <li *rxFor="let item of items; trackBy: trackItem">
 *      {{ item }}
 *   </li>
 * </ul>
 * ```
 *
 *
 * ### Using the context variables
 *
 * ```html
 * <ul>
 *   <li
 *     *rxFor="
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
 *   </li>
 * </ul>
 * ```
 *
 * ### Projected Views (`parent`)
 *
 * Imagine the following situation:
 *
 * ```ts
 * \@Component({
 *   selector: 'app-list-component',
 *   template: `
 *     <ng-content select="app-list-item"></ng-content>
 *   `
 * })
 * export class AppListComponent {
 *  \@ContentChildren(AppListItemComponent) appListItems: QueryList<AppListItemComponent>:
 * }
 * ```
 *
 * `AppListComponent` has a `contentOutlet` where it expects `AppListItemComponents` to be inserted into. In this case
 * `AppListComponent`s state is dependent on its `ContentChildren`.
 * This situation leads to the problem that `AppListComponent` needs to get informed about updates of its child views.
 * This is a known issue which has never been solved for `ngFor` (or other structural directives) especially in
 * combination with `CD OnPush` see here: (https://github.com/angular/angular/pull/35428)
 * `RxFor` solves this issue for you by providing a simple input parameter `parent: boolean`.
 * If set to `true`, `*rxFor` will automatically detect every other `Component` where its
 * `EmbeddedView`s were inserted into. Those components will get change detected as well in order to force
 * update their state accordingly.
 *
 * The usage of `AppListComponent` looks like this:
 *
 * ```html
 * <app-list-component>
 *   <app-list-item
 *     *rxFor="
 *       let item of observableItems$;
 *       trackBy: trackItem;
 *       strategy: 'normal';
 *       parent: true;
 *     "
 *   >
 *     <div>{{ item.name }}</div>
 *   </app-list-item>
 * </app-list-component>
 * ```
 *
 *
 * @docsCategory RxFor
 * @docsPage RxFor
 * @publicApi
 */
@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[rxFor]',
  providers: [RxEffects],
})
export class RxFor<T, U extends NgIterable<T> = NgIterable<T>>
  implements OnInit, OnDestroy {

  /** @internal */
  static ngTemplateGuard_rxFor: 'binding';

  /**
   * @description
   * The iterable input
   *
   * @example
   * <ng-container *rxFor="heroes$; let hero">
   *   <app-hero [hero]="hero"></app-hero>
   * </ng-container>
   *
   * @param potentialObservable
   */
  @Input()
  set rxFor(
    potentialObservable:
      | Observable<NgIterable<T>>
      | NgIterable<T>
      | null
      | undefined
  ) {
    this.observables$.next(potentialObservable);
  }

  /** @internal */
  @Input()
  set rxForOf(
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
   * The rendering strategy to be used for each template of the list of items.
   * Use it to dynamically manage your rendering strategy. You can switch the strategies
   * imperatively (with a string) or by binding an Observable.
   * The default strategy is `'normal'`.
   *
   * @example
   * \@Component({
   *   selector: 'app-root',
   *   template: `
   *     <ng-container *rxFor="let hero of heroes$; strategy: strategy">
   *       <app-hero [hero]="hero"></app-hero>
   *     </ng-container>
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
   *     <ng-container *rxFor="let hero of heroes$; strategy: strategy$">
   *       <app-hero [hero]="hero"></app-hero>
   *     </ng-container>
   *   `
   * })
   * export class AppComponent {
   *   strategy$ = new BehaviorSubject('immediate');
   * }
   *
   * @param strategyName
   * @see {@link strategies}
   */
  @Input('rxForStrategy')
  set strategy(strategyName: string | Observable<string> | undefined) {
    this.strategyInput$.next(strategyName);
  }

  /**
   * @description
   * If set to `true`, `*rxFor` will automatically detect every other `Component` where its
   * `EmbeddedView`s were inserted into. Those components will get change detected as well in order to force
   * update their state accordingly. In the given example, `AppListComponent` will get notified about which insert
   * or remove any `AppListItemComponent`.
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
   * @param renderParent
   */
    // tslint:disable-next-line:no-input-rename
  @Input('rxForParent') renderParent = false;

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
  set trackBy(trackByFnOrKey: string | ((idx: number, i: T) => any)) {
    this._trackBy =
      typeof trackByFnOrKey !== 'function'
        ? (i, a) => a[trackByFnOrKey]
        : trackByFnOrKey;
  }

  /**
   * @description
   * A function that defines how to track `updates` of items.
   * In addition to track when items are added, moved, or removed you can provide a function that determines if any
   * updates happened to an item. Use this is if you want to have even more control about what changes lead to
   * re-renderings of the DOM.
   *
   * By default, rxFor identifies if an update happens by doing an (equality check `===`).
   * When a function supplied, rxFor uses the result to identify the item node.
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
   *          distinctBy: distinctItem;
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
   *   // only changes to the name lead to a re-rendering of a child template
   *   distinctItem = (itemA, itemB) => itemA.name === itemB.name;
   * }
   *
   * @param distinctBy
   */
  @Input('rxForDistinctBy')
  set distinctBy(distinctBy: (a: T, b: T) => boolean) {
    this._distinctBy = distinctBy;
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
   * \@Component({
   *   selector: 'app-root',
   *   template: `
   *    <app-list-component>
   *      <app-list-item
   *        *rxFor="
   *          let item of items$;
   *          trackBy: trackItem;
   *          distinctBy: distinctItem;
   *          renderCallback: itemsRendered;
   *        "
   *      >
   *        <div>{{ item.name }}</div>
   *      </app-list-item>
   *    </app-list-component>
   *   `
   * })
   * export class AppComponent {
   *   items$: Observable<Item[]> = itemService.getItems();
   *   trackItem = (idx, item) => item.id;
   *   // only changes to the name lead to a re-rendering of a child template
   *   distinctItem = (itemA, itemB) => itemA.name === itemB.name;
   *   // this emits whenever rxFor finished rendering changes
   *   itemsRendered = new Subject<Item[]>();
   * }
   *
   * @param renderCallback
   */
  @Input('rxForRenderCallback') set renderCallback(
    renderCallback: Subject<U>
  ) {
    this._renderCallback = renderCallback;
  }

  /** @internal */
  constructor(
    private iterableDiffers: IterableDiffers,
    private cdRef: ChangeDetectorRef,
    private eRef: ElementRef,
    private readonly templateRef: TemplateRef<RxForViewContext<T>>,
    private readonly viewContainerRef: ViewContainerRef,
    private readonly rxEf: RxEffects,
    private strategyProvider: StrategyProvider
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
  private readonly values$ = this.observables$.pipe(ngInputFlatten());

  /** @internal */
  private readonly strategy$ = this.strategyInput$.pipe(ngInputFlatten());

  /** @internal */
  private listManager: ListManager<T, RxForViewContext<T>>;

  /** @internal */
  static ngTemplateContextGuard<U>(
    dir: RxFor<U>,
    ctx: unknown | null | undefined
  ): ctx is RxForViewContext<U> {
    return true;
  }

  /** @internal */
  _trackBy: TrackByFunction<T> = (i, a) => a;
  /** @internal */
  _distinctBy = (a:T, b:T) => a === b;

  /** @internal */
  ngOnInit() {
    this.listManager = createListManager<T, RxForViewContext<T>>({
      cdRef: this.cdRef,
      eRef: this.eRef,
      renderParent: this.renderParent,
      strategies: this.strategyProvider.strategies,
      defaultStrategyName: this.strategyProvider.primaryStrategy,
      viewContainerRef: this.viewContainerRef,
      templateRef: this.templateRef,
      trackBy: this._trackBy,
      distinctBy: this._distinctBy,
      createViewContext: createViewContext as any,
    });
    this.listManager.nextStrategy(this.strategy$);
    this.rxEf.hold(this.listManager.render(this.values$), (v) => {
      this._renderCallback?.next(v);
    });
  }

  /** @internal */
  ngOnDestroy() {
    this.viewContainerRef.clear();
  }
}
/** @internal */
function createViewContext<T>(item: T): RxForViewContext<T> {
  return new RxForViewContext<T>(item);
}
