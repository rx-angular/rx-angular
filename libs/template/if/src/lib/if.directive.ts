import {
  ChangeDetectorRef,
  Directive,
  inject,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { coerceAllFactory } from '@rx-angular/cdk/coercing';
import {
  createTemplateNotifier,
  RxNotificationKind,
} from '@rx-angular/cdk/notifications';
import {
  RxStrategyNames,
  RxStrategyProvider,
} from '@rx-angular/cdk/render-strategies';
import {
  createTemplateManager,
  RxTemplateManager,
} from '@rx-angular/cdk/template';
import {
  merge,
  NEVER,
  NextObserver,
  Observable,
  ObservableInput,
  ReplaySubject,
  Subject,
  Subscription,
} from 'rxjs';
import { filter, map, mergeAll } from 'rxjs/operators';
import {
  RxIfTemplateNames,
  rxIfTemplateNames,
  RxIfViewContext,
} from './model/index';

/**
 * @Directive IfDirective
 * @description
 *
 * The `RxIf` directive is drop-in replacement for the `NgIf` directive, but with additional features.
 * `RxIf` allows you to bind observables directly without having the need of using the `async`
 * pipe in addition.
 *
 * This enables `rxIf` to completely operate on its own without having to interact with `NgZone`
 * or triggering global change detection.
 *
 * Read more about the RxIf directive in the [official
 *   docs](https://www.rx-angular.io/docs/template/api/rx-if-directive).
 *
 * @example
 * <app-item *rxIf="show$"></app-item>
 *
 * @docsCategory RxIf
 * @docsPage RxIf
 * @publicApi
 */
@Directive({
  selector: '[rxIf]',
  standalone: true,
})
export class RxIf<T = unknown>
  implements OnInit, OnChanges, OnDestroy, OnChanges
{
  /** @internal */
  private strategyProvider = inject(RxStrategyProvider);
  /** @internal */
  private cdRef = inject(ChangeDetectorRef);
  /** @internal */
  private ngZone = inject(NgZone);
  /** @internal */
  private viewContainerRef = inject(ViewContainerRef);

  /** @internal */
  private subscription = new Subscription();
  /** @internal */
  private _renderObserver: NextObserver<unknown>;
  /** @internal */
  private templateManager: RxTemplateManager<
    T,
    RxIfViewContext<T>,
    rxIfTemplateNames
  >;

  /**
   * @description
   * The Observable or value to representing the condition.
   *
   * @example
   * showHero = true;
   * showHero$ = new BehaviorSubject<boolean>(true);
   *
   * <ng-container *rxIf="showHero">
   *   <app-hero></app-hero>
   * </ng-container>
   *
   * <ng-container *rxIf="showHero$">
   *   <app-hero></app-hero>
   * </ng-container>
   *
   * @param { ObservableInput<T> | T } rxIf
   */
  @Input() rxIf: ObservableInput<T> | T;

  /**
   * @description
   *
   * You can change the used `RenderStrategy` by using the `strategy` input of the `*rxIf`. It accepts
   * an `Observable<RxStrategyNames>` or
   *   [`RxStrategyNames`](https://github.com/rx-angular/rx-angular/blob/b0630f69017cc1871d093e976006066d5f2005b9/libs/cdk/render-strategies/src/lib/model.ts#L52).
   *
   * The default value for strategy is
   * [`normal`](https://www.rx-angular.io/docs/template/cdk/render-strategies/strategies/concurrent-strategies).
   *
   * Read more about this in the
   * [official docs](https://www.rx-angular.io/docs/template/api/rx-if-directive#use-render-strategies-strategy).
   *
   * @example
   *
   * \@Component({
   *   selector: 'app-root',
   *   template: `
   *     <ng-container *rxIf="showHero$; strategy: 'userBlocking'">
   *       <app-hero></app-hero>
   *     </ng-container>
   *
   *     <ng-container *rxIf="showHero$; strategy: strategy$">
   *       <app-hero></app-hero>
   *     </ng-container>
   *   `
   * })
   * export class AppComponent {
   *   strategy$ = of('immediate');
   * }
   *
   * @param { string | Observable<string> | undefined } strategyName
   * @see {@link RxStrategyNames}
   */
  @Input('rxIfStrategy')
  set strategy(strategyName: Observable<RxStrategyNames> | RxStrategyNames) {
    this.strategyHandler.next(strategyName);
  }

  /**
   * @description
   * Defines the template to be used when the bound value is falsy
   *
   * @example
   * <app-hero *rxIf="show$; else: noHero"></app-hero>
   * <ng-template #noHero><no-hero></no-hero></ng-template>
   */
  @Input('rxIfElse') else: TemplateRef<RxIfViewContext<T>>;

  /**
   * @description
   * Defines the template to be used when the bound value is truthy
   *
   * @example
   * <ng-container *rxIf="show$; then: hero"></ng-container>
   * <ng-template #hero><app-hero></app-hero></ng-template>
   */
  @Input('rxIfThen') then: TemplateRef<RxIfViewContext<T>>;

  /**
   * @description
   * Defines the template for the suspense state. Will be
   * shown when the bound Observable is in "suspense" state.
   * Suspense state is active when the current value is undefined or no value
   * was ever emitted.
   *
   * Read more about the reactive context in the
   * [official docs](https://www.rx-angular.io/docs/template/concepts/reactive-context).
   *
   * @example
   * <app-hero *rxIf="show$; suspense: suspenseTemplate" ></app-hero>
   * <ng-template #suspenseTemplate>
   *   <mat-progress-spinner></mat-progress-spinner>
   * </ng-template>
   *
   * @param { TemplateRef<RxIfViewContext> } suspense
   */
  @Input('rxIfSuspense') suspense: TemplateRef<RxIfViewContext<T>>;

  /**
   * @description
   * Defines the template for the complete state. Will be
   * shown when the bound Observable is in "complete" state.
   *
   * Read more about the reactive context in the
   * [official docs](https://www.rx-angular.io/docs/template/concepts/reactive-context).
   *
   * @example
   * <app-hero *rxIf="show$; complete: completeTemplate" ></app-hero>
   * <ng-template #completeTemplate>
   *   <icon>thumbs_up</icon>
   * </ng-template>
   *
   * @param { TemplateRef<RxIfViewContext> } suspense
   */
  @Input('rxIfComplete') complete: TemplateRef<RxIfViewContext<T>>;

  /**
   * @description
   * Defines the template for the error state. Will be
   * shown when the bound Observable is in "error" state.
   *
   * Read more about the reactive context in the
   * [official docs](https://www.rx-angular.io/docs/template/concepts/reactive-context).
   *
   * @example
   * <app-hero *rxIf="show$; error: errorTemplate" ></app-hero>
   * <ng-template #errorTemplate>
   *   <icon>error</icon>
   * </ng-template>
   *
   * @param { TemplateRef<RxIfViewContext> } suspense
   */
  @Input('rxIfError') error: TemplateRef<RxIfViewContext<T>>;

  /**
   * @description
   * A trigger to manually set the active template. It accepts a `RxNotificationKind`
   * which determines what template to display. If no template is given, a context
   * variable resembling the notification state is put into the `Next`
   * template of the directive
   *
   * @example
   * <ng-container
   *  *rxIf="
   *    show$;
   *    let e = error;
   *    contextTrigger: contextTrigger$
   * ">
   *
   *   <app-hero></app-hero>
   *   <error *ngIf="e"></error>
   * </ng-container>
   *
   * // trigger template from component.ts
   * contextTrigger$.next(RxNotificationKind.error)
   *
   * @param { Observable<RxNotificationKind> } contextTrigger
   * @see {@link RxNotificationKind}
   */
  @Input('rxIfContextTrigger') contextTrigger?: Observable<RxNotificationKind>;

  /**
   * @description
   * A trigger to manually activate the default template. It accepts any value,
   * on emission it will switch to the let directives default template.
   *
   * @example
   * <ng-container
   *  *rxIf="
   *    show$;
   *    suspense: suspense
   *    nextTrigger: nextTrigger$
   * ">
   *
   *   <app-hero></app-hero>
   * </ng-container>
   *
   * <ng-template #suspense><loader></loader></ng-template>
   *
   * // trigger template from component.ts
   * nextTrigger$.next()
   *
   * @param { Observable<unknown> } nextTrigger
   */
  @Input('rxIfNextTrigger') nextTrigger?: Observable<unknown>;

  /**
   * @description
   * A trigger to manually activate the suspense template. It accepts any value,
   * on emission it will display the suspense template. If no template is given,
   * the suspense context variable will be set to true instead.
   *
   * @example
   * <ng-container
   *  *rxIf="
   *    show$;
   *    let s = suspense;
   *    suspenseTrigger: suspenseTrigger$
   * ">
   *
   *   <app-hero></app-hero>
   *   <loader *ngIf="s"></loader>
   * </ng-container>
   *
   *
   * // trigger template from component.ts
   * suspenseTrigger$.next()
   *
   * @param { Observable<unknown> } suspenseTrigger
   */
  @Input('rxIfSuspenseTrigger') suspenseTrigger?: Observable<unknown>;

  /**
   * @description
   * A trigger to manually activate the error template. It accepts any value,
   * on emission it will display the error template. If no template is given,
   * the error context variable will be set to true instead.
   *
   * @example
   * <ng-container
   *  *rxIf="
   *    show$;
   *    let e = error;
   *    errorTrigger: errorTrigger$
   * ">
   *
   *   <app-hero></app-hero>
   *   <error *ngIf="e"></error>
   * </ng-container>
   *
   * // trigger template from component.ts
   * errorTrigger$.next()
   *
   * @param { Observable<unknown> } errorTrigger
   */
  @Input('rxIfErrorTrigger') errorTrigger?: Observable<unknown>;

  /**
   * @description
   * A trigger to manually activate the complete template. It accepts any value,
   * on emission it will display the error template. If no template is given,
   * the complete context variable will complete set to true instead.
   *
   * @example
   * <ng-container
   *  *rxIf="
   *    show$;
   *    let c = complete;
   *    completeTrigger: completeTrigger$
   * ">
   *
   *   <app-hero></app-hero>
   *   <done *ngIf="c"></done>
   * </ng-container>
   *
   * // trigger template from component.ts
   * completeTrigger$.next()
   *
   * @param { Observable<unknown> } completeTrigger
   */
  @Input('rxIfCompleteTrigger') completeTrigger?: Observable<unknown>;

  /**
   * @description
   *
   * Structural directives maintain `EmbeddedView`s within a components' template.
   * Depending on the bound value as well as the configured `RxRenderStrategy`,
   * updates processed by the `*rxIf` directive might be asynchronous.
   *
   * Whenever a template gets inserted into, or removed from, its parent component, the directive has to inform the
   *   parent in order to update any view- or contentquery (`@ViewChild`, `@ViewChildren`, `@ContentChild`,
   *   `@ContentChildren`).
   *
   * Read more about this in the
   * [official
   *   docs](https://www.rx-angular.io/docs/template/api/rx-if-directive#local-strategies-and-view-content-queries-parent).
   *
   * @example
   * \@Component({
   *   selector: 'app-root',
   *   template: `
   *    <app-component>
   *      <app-item
   *        *rxIf="
   *          show$;
   *          parent: true;
   *        "
   *      >
   *      </app-item>
   *    </app-component>
   *   `
   * })
   * export class AppComponent {
   *   show$ = state.select('showItem');
   * }
   *
   * @param {boolean} renderParent
   *
   * @deprecated this flag will be dropped soon, as it is no longer required when using signal based view & content queries
   */
  @Input('rxIfParent') renderParent = this.strategyProvider.config.parent;

  /**
   * @description
   * A flag to control whether `*rxIf` templates are created within `NgZone` or not.
   * The default value is `true, `*rxIf` will create its `EmbeddedView` inside `NgZone`.
   *
   * Event listeners normally trigger zone.
   * Especially high frequency events can cause performance issues.
   *
   * Read more about this in the
   * [official docs](https://www.rx-angular.io/docs/template/api/let-directive#working-with-event-listeners-patchzone).
   *
   * @example
   * \@Component({
   *   selector: 'app-root',
   *   template: `
   *    <app-component>
   *      <app-item
   *        *rxIf="
   *          show$;
   *          patchZone: false;
   *        "
   *        (drag)="itemDrag($event)"
   *      >
   *      </app-item>
   *    </app-component>
   *   `
   * })
   * export class AppComponent {
   *   show$ = state.select('showItem');
   * }
   *
   * @param {boolean} patchZone
   */
  @Input('rxIfPatchZone') patchZone = this.strategyProvider.config.patchZone;

  /**
   * @description
   * A `Subject` which emits whenever `*rxIf` rendered a change to the view.
   * This enables developers to perform actions when rendering has been done.
   * The `renderCallback` is useful in situations where you
   * rely on specific DOM properties like the dimensions of an item after it got rendered.
   *
   * The `renderCallback` emits the latest value causing the view to update.
   *
   * @example
   * \@Component({
   *   selector: 'app-root',
   *   template: `
   *    <app-component>
   *      <app-item
   *        *rxIf="
   *          show$;
   *          renderCallback: rendered;
   *        "
   *      >
   *      </app-item>
   *    </app-component>
   *   `
   * })
   * export class AppComponent {
   *  show$ = state.select('showItem');
   *  // this emits whenever rxIf finished rendering changes
   *  rendered = new Subject<boolean>();
   *
   *   constructor(elementRef: ElementRef<HTMLElement>) {
   *     rendered.subscribe(() => {
   *       // item is rendered, we can access its dom now
   *     })
   *   }
   * }
   *
   * @param {Subject<boolean>} callback
   */
  @Input('rxIfRenderCallback')
  set renderCallback(callback: NextObserver<boolean>) {
    this._renderObserver = callback;
  }

  /** @internal */
  private triggerHandler = new ReplaySubject<RxNotificationKind>(1);

  /** @internal */
  private templateNotifier = createTemplateNotifier<T>();

  /** @internal */
  private readonly strategyHandler = coerceAllFactory<RxStrategyNames>(
    () => new ReplaySubject<RxStrategyNames | Observable<RxStrategyNames>>(1),
    mergeAll(),
  );
  /** @internal */
  private readonly rendered$ = new Subject<void>();
  /** @internal */
  private get thenTemplate(): TemplateRef<RxIfViewContext<T>> {
    return this.then ? this.then : this.templateRef;
  }

  constructor(private readonly templateRef: TemplateRef<RxIfViewContext<T>>) {}

  /** @internal */
  ngOnInit() {
    this.subscription.add(
      merge(
        this.contextTrigger || NEVER,
        this.nextTrigger?.pipe(map(() => RxNotificationKind.Next)) || NEVER,
        this.suspenseTrigger?.pipe(map(() => RxNotificationKind.Suspense)) ||
          NEVER,
        this.completeTrigger?.pipe(map(() => RxNotificationKind.Complete)) ||
          NEVER,
        this.errorTrigger?.pipe(map(() => RxNotificationKind.Error)) || NEVER,
      )
        .pipe(filter((v) => !!v))
        .subscribe((t) => this.triggerHandler.next(t)),
    );
    this.subscription.add(
      this.templateManager
        .render(this.templateNotifier.values$)
        .subscribe((n) => {
          this.rendered$.next(n);
          this._renderObserver?.next(n);
        }),
    );
  }

  /** @internal */
  ngOnChanges(changes: SimpleChanges): void {
    if (!this.templateManager) {
      this._createTemplateManager();
    }

    if (changes.then && !changes.then.firstChange) {
      this.templateManager.addTemplateRef(
        RxIfTemplateNames.then,
        this.thenTemplate,
      );
    }

    if (changes.else) {
      this.templateManager.addTemplateRef(RxIfTemplateNames.else, this.else);
    }

    if (changes.complete) {
      this.templateManager.addTemplateRef(
        RxIfTemplateNames.complete,
        this.complete,
      );
    }

    if (changes.suspense) {
      this.templateManager.addTemplateRef(
        RxIfTemplateNames.suspense,
        this.suspense,
      );
      this.templateNotifier.withInitialSuspense(!!this.suspense);
    }

    if (changes.error) {
      this.templateManager.addTemplateRef(RxIfTemplateNames.error, this.error);
    }
    if (changes.rxIf) {
      this.templateNotifier.next(this.rxIf);
    }
  }

  /** @internal */
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  /** @internal */
  private _createTemplateManager(): void {
    const getNextTemplate = (value) => {
      return value
        ? RxIfTemplateNames.then
        : this.else
          ? RxIfTemplateNames.else
          : undefined;
    };
    this.templateManager = createTemplateManager<
      T,
      RxIfViewContext<T>,
      rxIfTemplateNames
    >({
      templateSettings: {
        viewContainerRef: this.viewContainerRef,
        customContext: (rxIf) => ({ rxIf }),
      },
      renderSettings: {
        cdRef: this.cdRef,
        parent: coerceBooleanProperty(this.renderParent),
        patchZone: this.patchZone ? this.ngZone : false,
        defaultStrategyName: this.strategyProvider.primaryStrategy,
        strategies: this.strategyProvider.strategies,
      },
      notificationToTemplateName: {
        [RxNotificationKind.Suspense]: (value) =>
          this.suspense ? RxIfTemplateNames.suspense : getNextTemplate(value),
        [RxNotificationKind.Next]: (value) => getNextTemplate(value),
        [RxNotificationKind.Error]: (value) =>
          this.error ? RxIfTemplateNames.error : getNextTemplate(value),
        [RxNotificationKind.Complete]: (value) =>
          this.complete ? RxIfTemplateNames.complete : getNextTemplate(value),
      },
      templateTrigger$: this.triggerHandler,
    });
    this.templateManager.addTemplateRef(
      RxIfTemplateNames.then,
      this.thenTemplate,
    );
    this.templateManager.nextStrategy(this.strategyHandler.values$);
  }

  /** @internal */
  public static rxIfUseIfTypeGuard: void;

  /**
   * Assert the correct type of the expression bound to the `ngIf` input within the template.
   *
   * The presence of this static field is a signal to the Ivy template type check compiler that
   * when the `NgIf` structural directive renders its template, the type of the expression bound
   * to `ngIf` should be narrowed in some way. For `NgIf`, the binding expression itself is used to
   * narrow its type, which allows the strictNullChecks feature of TypeScript to work with `NgIf`.
   */
  static ngTemplateGuard_rxIf: 'binding';

  /**
   * Asserts the correct type of the context for the template that `NgIf` will render.
   *
   * The presence of this method is a signal to the Ivy template type-check compiler that the
   * `NgIf` structural directive renders its template with a specific context type.
   */
  static ngTemplateContextGuard<T>(
    dir: RxIf<T>,
    ctx: any,
  ): ctx is RxIfViewContext<Exclude<T, false | 0 | '' | null | undefined>> {
    return true;
  }
}

/**
 * @internal
 * @description
 * Coerces a data-bound value (typically a string) to a boolean.
 *
 */
function coerceBooleanProperty(value: unknown): boolean {
  return value != null && `${value}` !== 'false';
}
