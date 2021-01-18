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
 * The `*rxFor` structural directive provides a convenient and very performance optimised way for rendering
* templates out of a list of items.
 * Input values can be provided either as `Observable` or `static` values. Just as the `*ngFor` directive, the
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
 * the configured strategy every template will get processed in an individual task.
 *
 * As further improvement compared to the basic `*ngFor` implementation, `*rxFor` is able to take care of
 * `ChangeDetection` for `projected views` (aka `@ContentChild` or `@ViewChild`).
 *
 * Read more about this in the example section
 *
 * ### Context Variables
 *
 * The following context variables are available for each template:
 *
 * - $implicit: `T`
 * - item$: `Observable<T>`
 * - index: `number`
 * - count: `number`
 * - first: `boolean`
 * - last: `boolean`
 * - even: `boolean`
 * - odd: `boolean`
 * - index$: `Observable<number>`
 * - count$: `Observable<number>`
 * - first$: `Observable<boolean>`
 * - last$: `Observable<boolean>`
 * - even$: `Observable<boolean>`
 * - odd$: `Observable<boolean>`
 * - select: (keys: string[], distinctByMap): Observable<Partial<T>> (reactivity in the embedded view)
 *
 * ### Input properties
 *
 *  - trackBy: `(index: number, item: T) => any`
 *  - trackBy: `keyof T`
 *  - distinctBy: `(item: T, item: T) => boolean`
 *  - strategy: `string`
 *  - strategy: `Observable<string>`
 *  - parent: boolean;
 *  - renderCallback: Subject<T[]>
 *
 *
 * ### Features of `*rxFor`
 *
 * Included features for `*rxFor`:
 * - Push based architecture
 * - Immutable as well as mutable data structures (with `trackBy` & `distinctBy`)
 * - Control `updates` via `distinctBy` and `moves` via `trackBy`
 * - Reactive as well as imperative values in the template (`ngFor` drop-in replacement)
 * - `ListManager`: special logic for differ mechanism to avoid over-rendering; abstracts away low level logic
 * - render every EmbeddedView on its own while applying the configured StrategyCredentials#behavior
 * - detach EmbeddedView to avoid ChangeDetection top-down rendering interference when scheduling
 * - cancel any scheduled work if a remove was triggered for an `trackById` / `distinctById`
 * - cancel an update if a new update was triggered for the same `trackById` / `distinctById`
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
 *       strategy: 'normal';
 *       parent: true;
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
 * This situation leads to the problem that `AppListComponent` needs to get informed updates of its child views.
 * This is a known issue which has never been solved for `ngFor` (or other structural directives) especially in
 * combination with `CD OnPush` see here: (https://github.com/angular/angular/pull/35428)
 * `RxFor` solves this issue for you by providing a simple input parameter `parent: boolean`.
 * If set to `true`, `*rxFor` will automatically detect every other `Component` where its
 * `EmbeddedView`s where inserted into. Those `Components` will get `Changedetected` as well in order to force
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
 *     <div>{{ count }}</div>
 *     <div>{{ index }}</div>
 *   </li>
 * </ul>
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

  @Input('rxForStrategy')
  set strategy(strategyName: string | Observable<string> | undefined) {
    this.strategyInput$.next(strategyName);
  }

  @Input('rxForParent') renderParent = false;

  @Input()
  set rxForTrackBy(trackByFnOrKey: string | ((idx: number, i: T) => any)) {
    this._trackBy =
      typeof trackByFnOrKey !== 'function'
        ? (i, a) => a[trackByFnOrKey]
        : trackByFnOrKey;
  }

  @Input()
  set rxForDistinctBy(distinctBy: (a: T, b: T) => boolean) {
    this._distinctBy = distinctBy;
  }

  @Input('rxForRenderCallback') set renderCallback(
    renderCallback: Subject<void>
  ) {
    this._renderCallback = renderCallback;
  }

  constructor(
    private iterableDiffers: IterableDiffers,
    private cdRef: ChangeDetectorRef,
    private eRef: ElementRef,
    private readonly templateRef: TemplateRef<RxForViewContext<T>>,
    private readonly viewContainerRef: ViewContainerRef,
    private readonly rxEf: RxEffects,
    private strategyProvider: StrategyProvider
  ) {}

  static ngTemplateGuard_rxFor: 'binding';

  private strategyInput$ = new ReplaySubject<string | Observable<string>>(1);
  private differ: IterableDiffer<T> | null = null;
  private observables$ = new ReplaySubject<
    Observable<NgIterable<T>> | NgIterable<T>
  >(1);
  private _renderCallback: Subject<any>;

  values$ = this.observables$.pipe(ngInputFlatten());

  strategy$ = this.strategyInput$.pipe(ngInputFlatten());

  private listManager: ListManager<T, RxForViewContext<T>>;

  /** @internal */
  static ngTemplateContextGuard<U>(
    dir: RxFor<U>,
    ctx: unknown | null | undefined
  ): ctx is RxForViewContext<U> {
    return true;
  }

  _trackBy: TrackByFunction<T> = (i, a) => a;
  _distinctBy = (a:T, b:T) => a === b;

  ngOnInit() {
    // this.differ = this.iterableDiffers.find([]).create(this._trackBy);
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

  ngOnDestroy() {
    this.viewContainerRef.clear();
    console.log('onDestroy');
  }
}

function createViewContext<T>(item: T): RxForViewContext<T> {
  return new RxForViewContext<T>(item);
}
