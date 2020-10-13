import {
  ChangeDetectorRef,
  Directive,
  Input,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
  ViewContainerRef} from '@angular/core';

import { defer, NextObserver, Observable, ObservableInput, Subscription, Unsubscribable, } from 'rxjs';
import { filter, map, share } from 'rxjs/operators';
import {
  createTemplateManager,
  getStrategies,
  LetDirective,
  RxTemplateObserver,
  RxViewContext,
  TemplateManager
} from '@rx-angular/template';
// tslint:disable:nx-enforce-module-boundaries
import {
  createRenderAware,
  RenderAware,
  RxNotificationKind,
  StrategySelection
} from '../../../../../../../../libs/template/src/lib/core/render-aware';
import { DEFAULT_STRATEGY_NAME } from '../../../../../../../../libs/template/src/lib/render-strategies/strategies/strategies-map';

export interface LetViewContext<T> extends RxViewContext<T> {
  // to enable `as` syntax we have to assign the directives selector (var as v)
  rxLet: T;
}

/**
 * @Directive LetDirective
 *
 * @description
 *
 * The `*rxLet` directive serves a convenient way of binding observables to a view context. Furthermore, it helps
 * you structure view-related models into view context scope (DOM element's scope).
 *
 * Under the hood, it leverages a `RenderStrategy` which in turn takes care of optimizing the change detection
 * of your component or embedded view. The `LetDirective` will render its template and manage change detection after it got an initial
 *   value. So if the incoming `Observable` emits its value lazily (e.g. data coming from `Http`), your template will
 *   be rendered lazily as well. This can very positively impact the initial render performance of your application.
 *
 *
 * ### Problems with `async` and `*ngIf`
 *
 * In Angular, a way of binding an observable to the view could look like that:
 * ```html
 * <ng-container *ngIf="observableNumber$ | async as n">
 *   <app-number [number]="n"></app-number>
 *   <app-number-special [number]="n"></app-number-special>
 * </ng-container>
 * ```
 *
 * The problem is that `*ngIf` interferes with rendering and in case of a `0` (a falsy value) the component
 * would be hidden. This issue doesn't concern the `LetDirective`.
 *
 * The `AsyncPipe` relies on the Zone to be present - it doesn't really trigger change detection by itself.
 * It marks the component and its children as dirty waiting for the Zone to trigger change detection. So, in case
 * you want to create a zone-less application, the `AsyncPipe` won't work as desired. `LetDirective` comes
 * with its own strategies to manage change detection every time a new notification is sent from
 * the bound Observable.
 *
 *
 * ### Features of `*rxLet`
 *
 * Included features for `*rxLet`:
 * - binding is always present. (see "Problems with `async` and `*ngIf`" section below)
 * - it takes away the multiple usages of the `async` or `push` pipe
 * - a unified/structured way of handling null and undefined
 * - triggers change-detection differently if `zone.js` is present or not (`ChangeDetectorRef.detectChanges` or
 *   `ChangeDetectorRef.markForCheck`)
 * - triggers change-detection differently if ViewEngine or Ivy is present (`ChangeDetectorRef.detectChanges` or
 *   `ɵdetectChanges`)
 * - distinct same values in a row (`distinctUntilChanged` operator),
 * - display custom templates for different observable notifications (rxSuspense, rxNext, rxError, rxComplete)
 * - notify about after changes got rendered to the template (RenderCallback)
 *
 *
 * ### Binding an Observable and using the view context
 *
 * The `*rxLet` directive takes over several things and makes it more convenient and save to work with streams in the
 * template:
 *
 * ```html
 * <ng-container *rxLet="observableNumber$; let n">
 *   <app-number [number]="n"></app-number>
 * </ng-container>
 *
 * <ng-container *rxLet="observableNumber$ as n">
 *   <app-number [number]="n"></app-number>
 * </ng-container>
 * ```
 *
 * In addition to that it provides us information from the whole observable context.
 * We can track the observables:
 * - next value
 * - error occurrence
 * - complete occurrence
 *
 * ```html
 * <ng-container *rxLet="observableNumber$; let n; let e = $rxError, let c = $rxComplete">
 *   <app-number [number]="n" *ngIf="!e && !c"></app-number>
 *   <ng-container *ngIf="e">
 *     There is an error: {{ e }}
 *   </ng-container>
 *   <ng-container *ngIf="c">
 *     Observable completed: {{ c }}
 *   </ng-container>
 * </ng-container>
 * ```
 *
 *
 * ### Using the template-binding
 *
 * You can also use template anchors and display template's content for different observable states:
 * - on complete
 * - on error
 * - on suspense - before the first value is emitted
 *
 * ```html
 * <ng-container
 *   *rxLet="
 *     observableNumber$;
 *     let n;
 *     rxError: error;
 *     rxComplete: complete;
 *     rxSuspense: suspense;
 *   "
 * >
 *   <app-number [number]="n"></app-number>
 * </ng-container>
 * <ng-template #error>ERROR</ng-template>
 * <ng-template #complete>COMPLETE</ng-template>
 * <ng-template #suspense>SUSPENSE</ng-template>
 * ```
 *
 * Internally, `*rxLet` is using a simple "view memoization" - it caches all anchored template references and re-uses
 * them whenever the observable notification (next/error/complete) is sent. Then, it only updates the context
 * (e.g. a value from the observable) in the view.
 *
 * ### Using the RenderCallback
 * The RenderCallback notifies users about when the `LetDirective` "rendered" the latest values of the
 * active template.
 * At the time the `rendered` callback emits, the DOM should be already updated with the latest changes connected
 * to this instance.
 * The callback will emit the latest value rendered to the template.
 *
 * Since structural directives currently do not support `@Output` bindings, developers have to use other mechanics
 * to access this event.
 * Beyond the traditional approach the `LetDirectives` offers an input property as renderCallback.
 * This enables developers to bind a `NextObserver` (e.g. `Subject`) to the `LetDirective`which will emit after
 * rendering happened.
 *
 * You can choose between using the [Template syntax](https://angular.io/guide/template-syntax), injecting the
 * `LetDirective` as `@ViewChild()` and subscribe the event manually or providing a RenderCallback on your own.
 *
 * Please note that due to the built-in
 *   [coalescing][https://github.com/rx-angular/rx-angular/blob/master/libs/template/docs/concepts.md] can cause this
 *   callback different in situations where multiple `LetDirectives` are used to render the same
 * `Component`. Make sure to subscribe to every instance in your component to avoid missing render
 * notifications.
 *
 * #### RenderCallback Input
 * ```html
 * <ng-container *rxLet="content$; let content; strategy: strategyName$; renderCallback: renderCallback$">
 *    <div class="example-box">
 *        {{ content }}
 *    </div>
 * </ng-container>
 * ```
 * ```ts
 * // inside component:
 * readonly renderCallback$ = new Subject<string>();
 * ```
 * #### Template syntax
 * ```html
 * <!-- template syntax with output binding -->
 * <ng-template let-content
 *    [rxLet]="content$"
 *    (rendered)="onTemplateRendered($event)">
 *  <div class="example-box">
 *    {{ content }}
 *  </div>
 * </ng-template>
 * ```
 * #### ViewChild
 * ```html
 * <div *rxLet="content$; let content" class="example-box">
 *  {{ content }}
 * </div>
 * ```
 * ```ts
 * // inside of your component
 * \@ViewChild(LetDirective) rxLet: LetDirective<string>;
 * this.rxLet.rendered.subscribe(value => console.log('afterRender', value));
 * ```
 *
 *
 * @docsCategory LetDirective
 * @docsPage LetDirective
 * @publicApi
 */
@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[rxLetRcb]',
  exportAs: 'renderNotifier'
})
export class LetRcbDirective<U> implements OnInit, OnDestroy {

  /** @internal */
  static ngTemplateGuard_rxLet: 'binding';

  /**
   * @description
   * All strategies initialized and registered for the `LetDirective`. Pass a name of one the
   * `strategies` to the `strategy` input to switch between them on the fly.
   *
   * @see {@link strategy}
   */
  readonly strategies: StrategySelection;

  /**
   * @description
   * Object holding logic for managing strategies and change detection for the `LetDirective`.
   *
   * @internal
   */
  readonly renderAware: RenderAware<U | null | undefined>;

  /**
   * @description
   * The Observable to be bound to the context of a template.
   *
   * @example
   * <ng-container *rxLet="hero$; let hero">
   *   <app-hero [hero]="hero"></app-hero>
   * </ng-container>
   *
   * @param potentialObservable
   */
  @Input()
  set rxLetRcb(potentialObservable: ObservableInput<U> | null | undefined) {
    this.renderAware.nextPotentialObservable(potentialObservable);
  }

  /**
   * @description
   * The rendering strategy to be used when rendering with the reactive context within a template.
   * Use it to dynamically manage your rendering strategy. You can switch the strategies
   * imperatively (with a string) or by bounding an Observable.
   * The default strategy is `'local'`.
   *
   * @example
   * \@Component({
   *   selector: 'app-root',
   *   template: `
   *     <ng-container *rxLet="hero$; let hero; strategy: strategy">
   *       <app-hero [hero]="hero"></app-hero>
   *     </ng-container>
   *   `
   * })
   * export class AppComponent {
   *   strategy = 'local';
   * }
   *
   * // OR
   *
   * \@Component({
   *   selector: 'app-root',
   *   template: `
   *     <ng-container *rxLet="hero$; let hero; strategy: strategy$">
   *       <app-hero [hero]="hero"></app-hero>
   *     </ng-container>
   *   `
   * })
   * export class AppComponent {
   *   strategy$ = new BehaviorSubject('local');
   * }
   *
   * @param strategy
   * @see {@link strategies}
   */
  @Input('rxLetRcbStrategy')
  set strategy(strategy: string | Observable<string> | undefined) {
    this.renderAware.nextStrategy(strategy || DEFAULT_STRATEGY_NAME);
  }

  /**
   * @description
   * A template to show if the bound Observable is in "complete" state.
   *
   * @example
   * <ng-container *rxLet="hero$; let hero; rxComplete: completeTemplate">
   *   <app-hero [hero]="hero"></app-hero>
   * </ng-container>
   * <ng-template #completeTemplate>
   *   <mat-icon>thumb_up</mat-icon>
   * </ng-template>
   *
   * @param templateRef
   */
  @Input('rxLetRcbRxComplete')
  set rxComplete(
    templateRef: TemplateRef<LetViewContext<U | undefined | null> | null>
  ) {
    this.templateManager.addTemplateRef('rxComplete', templateRef);
  }

  /**
   * @description
   * A template to show if the bound Observable is in "error" state.
   *
   * @example
   * <ng-container *rxLet="hero$; let hero; rxError: errorTemplate">
   *   <app-hero [hero]="hero"></app-hero>
   * </ng-container>
   * <ng-template #errorTemplate>
   *   <mat-icon>thumb_down</mat-icon>
   * </ng-template>
   *
   * @param templateRef
   */
  @Input('rxLetRcbRxError')
  set rxError(
    templateRef: TemplateRef<LetViewContext<U | undefined | null> | null>
  ) {
    this.templateManager.addTemplateRef('rxError', templateRef);
  }

  /**
   * @description
   * A template to show before the first value is emitted from the bound Observable.
   *
   * @example
   * <ng-container *rxLet="hero$; let hero; rxSuspense: suspenseTemplate">
   *   <app-hero [hero]="hero"></app-hero>
   * </ng-container>
   * <ng-template #suspenseTemplate>
   *   <mat-progress-spinner></mat-progress-spinner>
   * </ng-template>
   *
   * @param templateRef
   */
  @Input('rxLetRcbRxSuspense')
  set rxSuspense(
    templateRef: TemplateRef<LetViewContext<U | undefined | null> | null>
  ) {
    this.templateManager.addTemplateRef('rxSuspense', templateRef);
  }

  /**
   *
   * @internal
   */
  private _renderObserver: NextObserver<U>;
  /**
   * @description
   * A callback for when the `LetDirective` "rendered" the latest values of the active template.
   * At the time the `rendered` callback emits, the DOM should be already updated with the latest changes connected
   * to this instance.
   * The callback will emit the latest value rendered to the template.
   *
   * Since structural directives currently do not support `@Output` bindings, the `LetDirective` offers an input
   * property as renderCallback. This enables developers to bind a `NextObserver` (e.g. `Subject`) to the `LetDirective`
   * which will emit after rendering happened.
   *
   * Please note that due to the built in
   *   [coalescing][https://github.com/rx-angular/rx-angular/blob/master/libs/template/docs/concepts.md] can cause this
   *   callback different in situations where multiple `LetDirectives` are used to render the same
   * `Component`. Make sure to subscribe to every instance in your component to make sure you don't miss render
   * notifications.
   *
   * @example
   *  <ng-container *rxLet="content$; let content; strategy: strategyName$; renderCallback: renderCallback$">
   *    <div class="example-box">
   *        {{ content }}
   *    </div>
   *  </ng-container>
   *
   * // inside component:
   * readonly renderCallback$ = new Subject<string>();
   */
  @Input('rxLetRcbRenderCallback')
  set renderCallback(callback: NextObserver<U>) {
    this._renderObserver = callback;
    this.subscribeRenderCallback();
  }

  /**
   * @description
   * A callback for when the `LetDirective` "rendered" the latest values of the active template.
   * At the time the `rendered` callback emits, the DOM should be already updated with the latest changes connected
   * to this instance.
   * The callback will emit the latest value rendered to the template.
   *
   * Since structural directives currently do not support `@Output` bindings, developers have to use other mechanics
   * to access this event.
   *
   * You can still use this Output event by using either the [Template
   * syntax](https://angular.io/guide/template-syntax) or
   * injecting the `LetDirective` as `@ViewChild()` and subscribe the event manually.
   *
   * Please note that due to the built in
   *   [coalescing][https://github.com/rx-angular/rx-angular/blob/master/libs/template/docs/concepts.md] can cause this
   *   callback different in situations where multiple `LetDirectives` are used to render the same
   * `Component`. Make sure to subscribe to every instance in your component to make sure you don't miss render
   * notifications.
   *
   * @example
   * <ng-template let-content
   *    [rxLet]="content$"
   *    (rendered)="onTemplateRendered($event)">
   *  <div class="example-box">
   *    {{ content }}
   *  </div>
   * </ng-template>
   *
   * <div *rxLet="content$; let content" class="example-box">
   *  {{ content }}
   * </div>
   *
   * `@ViewChild(LetDirective) rxLet: LetDirective<string>;`
   * this.rxLet.rendered.subscribe(value => console.log('afterRender', value));
   */
  @Output() readonly rendered = defer(() => this.renderAware.rendered$.pipe(
    // We use defer here as the as otherwise the the `@Output` decorator subscribes earlier than the renderAware
    // property is assigned
    filter(({ kind }) => this.templateManager.hasTemplateRef(kind)),
    map(({ value }) => value),
    share()
  ));

  /** @internal */
  private subscription: Unsubscribable = Subscription.EMPTY;

  /** @internal */
  private renderCallBackSubscription: Unsubscribable = Subscription.EMPTY;

  /** @internal */
  private readonly templateManager: TemplateManager<LetViewContext<U | undefined | null>, RxNotificationKind>;

  /** @internal */
  private readonly initialViewContext: LetViewContext<U> = {
    $implicit: undefined,
    rxLet: undefined,
    $rxError: false,
    $rxComplete: false,
    $rxSuspense: false
  };

  /** @internal */
  private readonly templateObserver: RxTemplateObserver<U | null | undefined> = {
    suspense: () => {
      this.displayInitialView();
      this.templateManager.updateViewContext({
        $implicit: undefined,
        rxLet: undefined,
        $rxError: false,
        $rxComplete: false,
        $rxSuspense: true
      });
    },
    next: (value: U | null | undefined) => {
      this.templateManager.displayView('rxNext');
      this.templateManager.updateViewContext({
        $implicit: value,
        rxLet: value
      });
    },
    error: (error: Error) => {
      // fallback to rxNext when there's no template for rxError
      this.templateManager.hasTemplateRef('rxError')
      ? this.templateManager.displayView('rxError')
      : this.templateManager.displayView('rxNext');
      this.templateManager.updateViewContext({
        $rxError: error
      });
    },
    complete: () => {
      // fallback to rxNext when there's no template for rxComplete
      this.templateManager.hasTemplateRef('rxComplete')
      ? this.templateManager.displayView('rxComplete')
      : this.templateManager.displayView('rxNext');
      this.templateManager.updateViewContext({
        $rxComplete: true
      });
    }
  };

  /** @internal */
  static ngTemplateContextGuard<U>(
    dir: LetDirective<U>,
    ctx: unknown | null | undefined
  ): ctx is LetViewContext<U> {
    return true;
  }

  /** @internal */
  constructor(
    cdRef: ChangeDetectorRef,
    private readonly nextTemplateRef: TemplateRef<LetViewContext<U>>,
    private readonly viewContainerRef: ViewContainerRef
  ) {
    this.strategies = getStrategies({ cdRef });
    this.templateManager = createTemplateManager(this.viewContainerRef, this.initialViewContext);

    this.renderAware = createRenderAware({
      strategies: this.strategies,
      templateObserver: this.templateObserver
    });
    this.renderAware.nextStrategy(DEFAULT_STRATEGY_NAME);
  }

  /** @internal */
  ngOnInit() {
    this.templateManager.addTemplateRef('rxNext', this.nextTemplateRef);
    this.displayInitialView();
    this.subscription = this.renderAware.subscribe();
  }

  /** @internal */
  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.renderCallBackSubscription.unsubscribe();
    this.templateManager.destroy();
  }

  /** @internal */
  private subscribeRenderCallback(): void {
    this.renderCallBackSubscription.unsubscribe();
    if (this._renderObserver) {
      this.renderCallBackSubscription = this.rendered.subscribe(this._renderObserver);
    }
  }

  /** @internal */
  private displayInitialView = () => {
    // Display "suspense" template if provided
    if (this.templateManager.hasTemplateRef('rxSuspense')) {
      this.templateManager.displayView('rxSuspense');
    }
  };
}
