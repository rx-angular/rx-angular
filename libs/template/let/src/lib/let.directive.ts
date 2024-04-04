import {
  ChangeDetectorRef,
  Directive,
  ErrorHandler,
  inject,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { coerceAllFactory } from '@rx-angular/cdk/coercing';
import {
  createTemplateNotifier,
  RxNotification,
  RxNotificationKind,
} from '@rx-angular/cdk/notifications';
import {
  RxStrategyNames,
  RxStrategyProvider,
} from '@rx-angular/cdk/render-strategies';
import {
  createTemplateManager,
  RxBaseTemplateNames,
  RxTemplateManager,
  RxViewContext,
} from '@rx-angular/cdk/template';
import {
  defer,
  merge,
  NEVER,
  NextObserver,
  Observable,
  ObservableInput,
  ReplaySubject,
  Subject,
  Subscription,
} from 'rxjs';
import { filter, map } from 'rxjs/operators';

/** @internal */
type RxLetTemplateNames = 'nextTpl' | RxBaseTemplateNames;

/** @internal */
const RxLetTemplateNames = {
  ...RxBaseTemplateNames,
  next: 'nextTpl',
} as const;

/** @internal */
export interface RxLetViewContext<T> extends RxViewContext<T> {
  // to enable `as` syntax we have to assign the directives selector (var as v)
  rxLet: T;
}

/**
 * @Directive RxLet
 *
 * @description
 * In Angular there is one way to handle asynchronous values or streams in the template, the `async` pipe.
 * Even though the async pipe evaluates such values in the template, it is insufficient in many ways.
 * To name a few:
 * * it will only update the template when `NgZone` is also aware of the value change
 * * it leads to over rendering because it can only run global change detection
 * * it leads to too many subscriptions in the template
 * * it is cumbersome to work with values in the template
 *
 * read more about the LetDirective in the [official docs](https://www.rx-angular.io/docs/template/api/let-directive)
 *
 * **Conclusion - Structural directives**
 *
 * In contrast to global change detection, structural directives allow fine-grained control of change detection on a per directive basis.
 * The `LetDirective` comes with its own way to handle change detection in templates in a very efficient way.
 * However, the change detection behavior is configurable on a per directive or global basis.
 * This makes it possible to implement your own strategies, and also provides a migration path from large existing apps running with Angulars default change detection.
 *
 * This package helps to reduce code used to create composable action streams.
 * It mostly is used in combination with state management libs to handle user interaction and backend communication.
 *
 * ```html
 * <ng-container *rxLet="observableNumber$; let n">
 *  ...
 * </ng-container>
 * ```
 *
 *
 * @docsCategory LetDirective
 * @docsPage LetDirective
 * @publicApi
 */
@Directive({ selector: '[rxLet]', standalone: true })
export class RxLet<U> implements OnInit, OnDestroy, OnChanges {
  /** @internal */
  private strategyProvider = inject(RxStrategyProvider);
  /** @internal */
  private cdRef = inject(ChangeDetectorRef);
  /** @internal */
  private ngZone = inject(NgZone);
  /** @internal */
  private viewContainerRef = inject(ViewContainerRef);
  /** @internal */
  private errorHandler = inject(ErrorHandler);

  static ngTemplateGuard_rxLet: 'binding';

  /**
   * @description
   * The Observable or value to be bound to the context of a template.
   *
   * @example
   * const hero1 = {name: 'Batman'};
   * const hero$ = of(hero);
   *
   * <ng-container *rxLet="hero1; let hero">
   *   <app-hero [hero]="hero"></app-hero>
   * </ng-container>
   *
   * <ng-container *rxLet="hero$; let hero">
   *   <app-hero [hero]="hero"></app-hero>
   * </ng-container>
   *
   * @param { ObservableInput<U> | U | null | undefined } rxLet
   */
  @Input() rxLet: ObservableInput<U> | U | null | undefined;

  /**
   * @description
   *
   * You can change the used `RenderStrategy` by using the `strategy` input of the `*rxLet`. It accepts
   * an `Observable<RxStrategyNames>` or [`RxStrategyNames`](https://github.com/rx-angular/rx-angular/blob/b0630f69017cc1871d093e976006066d5f2005b9/libs/cdk/render-strategies/src/lib/model.ts#L52).
   *
   * The default value for strategy is
   * [`normal`](https://www.rx-angular.io/docs/template/cdk/render-strategies/strategies/concurrent-strategies).
   *
   * Read more about this in the
   * [official docs](https://www.rx-angular.io/docs/template/api/let-directive#use-render-strategies-strategy).
   *
   * @example
   *
   * \@Component({
   *   selector: 'app-root',
   *   template: `
   *     <ng-container *rxLet="hero$; let hero; strategy: strategy">
   *       <app-hero [hero]="hero"></app-hero>
   *     </ng-container>
   *
   *     <ng-container *rxLet="hero$; let hero; strategy: strategy$">
   *       <app-hero [hero]="hero"></app-hero>
   *     </ng-container>
   *   `
   * })
   * export class AppComponent {
   *   strategy = 'low';
   *   strategy$ = of('immediate');
   * }
   *
   * @param { string | Observable<string> | undefined } strategyName
   * @see {@link RxStrategyNames}
   */
  @Input('rxLetStrategy')
  set strategy(strategyName: string | Observable<string> | undefined) {
    this.strategyHandler.next(strategyName);
  }

  /**
   * @description
   * Defines the template for the complete state. Will be
   * shown when the bound Observable is in "complete" state.
   *
   * @example
   * <ng-container *rxLet="hero$; let hero; complete: completeTemplate">
   *   <app-hero [hero]="hero"></app-hero>
   * </ng-container>
   * <ng-template #completeTemplate>
   *   <mat-icon>thumb_up</mat-icon>
   * </ng-template>
   *
   * @param { TemplateRef<RxLetViewContext<U | undefined | null> | null> } complete
   */
  @Input('rxLetComplete')
  complete: TemplateRef<RxLetViewContext<U | undefined | null> | null>;

  /**
   * @description
   * Defines the template for the error state. Will be
   * shown when the bound Observable is in "error" state.
   *
   * @example
   * <ng-container *rxLet="hero$; let hero; error: errorTemplate">
   *   <app-hero [hero]="hero"></app-hero>
   * </ng-container>
   * <ng-template #errorTemplate>
   *   <mat-icon>thumb_down</mat-icon>
   * </ng-template>
   *
   * @param { TemplateRef<RxLetViewContext<U | undefined | null> | null> } error
   */
  @Input('rxLetError')
  error: TemplateRef<RxLetViewContext<U | undefined | null> | null>;

  /**
   * @description
   * Defines the template for the suspense state. Will be
   * shown when the bound Observable is in "suspense" state.
   * Suspense means any undefined value, a never emitted value or `NEVER` itself.
   *
   * @example
   * <ng-container *rxLet="hero$; let hero; suspense: suspenseTemplate">
   *   <app-hero [hero]="hero"></app-hero>
   * </ng-container>
   * <ng-template #suspenseTemplate>
   *   <mat-progress-spinner></mat-progress-spinner>
   * </ng-template>
   *
   * @param { TemplateRef<RxLetViewContext<U | undefined | null> | null> } suspense
   */
  @Input('rxLetSuspense')
  suspense: TemplateRef<RxLetViewContext<U | undefined | null> | null>;

  /**
   * @description
   * A trigger to manually set the active template. It accepts a `RxNotificationKind`
   * which determines what template to display. If no template is given, a context
   * variable resembling the notification state is put into the `Next`
   * template of the directive
   *
   * @example
   * <ng-container
   *  *rxLet="
   *    hero$;
   *    let hero;
   *    let e = error;
   *    contextTrigger: contextTrigger$
   * ">
   *
   *   <app-hero [hero]="hero"></app-hero>
   *   <error *ngIf="e"></error>
   * </ng-container>
   *
   * // trigger template from component.ts
   * contextTrigger$.next(RxNotificationKind.error)
   *
   * @param { Observable<RxNotificationKind> } contextTrigger
   * @see {@link RxNotificationKind}
   */
  @Input('rxLetContextTrigger') contextTrigger?: Observable<RxNotificationKind>;

  /**
   * @description
   * A trigger to manually activate the complete template. It accepts any value,
   * on emission it will display the error template. If no template is given,
   * the complete context variable will complete set to true instead.
   *
   * @example
   * <ng-container
   *  *rxLet="
   *    hero$;
   *    let hero;
   *    let c = complete;
   *    completeTrigger: completeTrigger$
   * ">
   *
   *   <app-hero [hero]="hero"></app-hero>
   *   <done *ngIf="c"></done>
   * </ng-container>
   *
   * // trigger template from component.ts
   * completeTrigger$.next()
   *
   * @param { Observable<unknown> } completeTrigger
   */
  @Input('rxLetCompleteTrigger') completeTrigger?: Observable<unknown>;

  /**
   * @description
   * A trigger to manually activate the error template. It accepts any value,
   * on emission it will display the error template. If no template is given,
   * the error context variable will be set to true instead.
   *
   * @example
   * <ng-container
   *  *rxLet="
   *    hero$;
   *    let hero;
   *    let e = error;
   *    errorTrigger: errorTrigger$
   * ">
   *
   *   <app-hero [hero]="hero"></app-hero>
   *   <error *ngIf="e"></error>
   * </ng-container>
   *
   * // trigger template from component.ts
   * errorTrigger$.next()
   *
   * @param { Observable<unknown> } errorTrigger
   */
  @Input('rxLetErrorTrigger') errorTrigger?: Observable<unknown>;

  /**
   * @description
   * A trigger to manually activate the suspense template. It accepts any value,
   * on emission it will display the suspense template. If no template is given,
   * the suspense context variable will be set to true instead.
   *
   * @example
   * <ng-container
   *  *rxLet="
   *    hero$;
   *    let hero;
   *    let s = suspense;
   *    suspenseTrigger: suspenseTrigger$
   * ">
   *
   *   <app-hero [hero]="hero"></app-hero>
   *   <loader *ngIf="s"></loader>
   * </ng-container>
   *
   *
   * // trigger template from component.ts
   * suspenseTrigger$.next()
   *
   * @param { Observable<unknown> } suspenseTrigger
   */
  @Input('rxLetSuspenseTrigger') suspenseTrigger?: Observable<unknown>;

  /**
   * @description
   * A trigger to manually activate the default template. It accepts any value,
   * on emission it will switch to the let directives default template.
   *
   * @example
   * <ng-container
   *  *rxLet="
   *    hero$;
   *    let hero;
   *    suspense: suspense
   *    nextTrigger: nextTrigger$
   * ">
   *
   *   <app-hero [hero]="hero"></app-hero>
   * </ng-container>
   *
   * <ng-template #suspense><loader></loader></ng-template>
   *
   * // trigger template from component.ts
   * nextTrigger$.next()
   *
   * @param { Observable<unknown> } nextTrigger
   */
  @Input('rxLetNextTrigger') nextTrigger?: Observable<unknown>;

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
  @Input('rxLetRenderCallback')
  set renderCallback(callback: NextObserver<U>) {
    this._renderObserver = callback;
  }

  /**
   * @description
   *
   * When local rendering strategies are used, we need to treat view and content queries in a
   * special way.
   * To make `*rxLet` in such situations, a certain mechanism is implemented to
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
   * [official
   * docs](https://www.rx-angular.io/docs/template/api/let-directive#local-strategies-and-view-content-queries-parent).
   *
   * @example
   * \@Component({
   *   selector: 'app-root',
   *   template: `
   *    <app-list-component>
   *      <app-list-item
   *        *rxLet="
   *          item$;
   *          let item;
   *          parent: true;
   *        "
   *      >
   *        <div>{{ item.name }}</div>
   *      </app-list-item>
   *    </app-list-component>
   *   `
   * })
   * export class AppComponent {
   *   item$ = itemService.getItem();
   * }
   *
   * @param boolean
   *
   * @deprecated this flag will be dropped soon, as it is no longer required when using signal based view & content queries
   */
  @Input('rxLetParent') renderParent = this.strategyProvider.config.parent;

  /**
   * @description
   * A flag to control whether *rxLet templates are created within `NgZone` or not.
   * The default value is `true, `*rxLet` will create it's `EmbeddedViews` inside `NgZone`.
   *
   * Event listeners normally trigger zone. Especially high frequently events cause performance issues.
   *
   * Read more about this in the
   * [official docs](https://www.rx-angular.io/docs/template/api/let-directive#working-with-event-listeners-patchzone).
   *
   * @example
   * \@Component({
   *   selector: 'app-root',
   *   template: `
   *    <app-list-component>
   *      <app-list-item
   *        *rxLet="
   *          item$;
   *          let item;
   *          patchZone: false;
   *        "
   *      >
   *        <div>{{ item.name }}</div>
   *      </app-list-item>
   *    </app-list-component>
   *   `
   * })
   * export class AppComponent {
   *   item$ = itemService.getItem();
   * }
   */
  @Input('rxLetPatchZone') patchZone = this.strategyProvider.config.patchZone;

  /** @internal */
  private observablesHandler = createTemplateNotifier<U>();
  /** @internal */
  private strategyHandler = coerceAllFactory<string>(
    () => new ReplaySubject<RxStrategyNames>(1),
  );
  /** @internal */
  private triggerHandler = new ReplaySubject<RxNotificationKind>(1);

  /** @internal */
  private _renderObserver: NextObserver<any>;

  /** @internal */
  private subscription: Subscription = new Subscription();

  /** @internal */
  private templateManager: RxTemplateManager<
    U,
    RxLetViewContext<U | undefined | null>,
    RxLetTemplateNames
  >;

  /** @internal */
  private rendered$ = new Subject<void>();

  /** @internal */
  readonly templateNotification$ = new Subject<RxNotification<U>>();

  /** @internal */
  readonly values$ = this.observablesHandler.values$;

  @Output() readonly rendered = defer(() => this.rendered$);

  /** @internal */
  static ngTemplateContextGuard<U>(
    dir: RxLet<U>,
    ctx: unknown | null | undefined,
  ): ctx is RxLetViewContext<U> {
    return true;
  }

  constructor(private templateRef: TemplateRef<RxLetViewContext<U>>) {}

  /** @internal */
  ngOnInit() {
    this.subscription.add(
      this.templateManager
        .render(merge(this.values$, this.templateNotification$))
        .subscribe((n) => {
          this.rendered$.next(n);
          this._renderObserver?.next(n);
        }),
    );
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
  }

  /** @internal */
  ngOnChanges(changes: SimpleChanges) {
    if (!this.templateManager) {
      this._createTemplateManager();
    }

    if (changes.complete) {
      this.templateManager.addTemplateRef(
        RxLetTemplateNames.complete,
        this.complete,
      );
    }

    if (changes.suspense) {
      this.templateManager.addTemplateRef(
        RxLetTemplateNames.suspense,
        this.suspense,
      );
      this.observablesHandler.withInitialSuspense(!!this.suspense);
    }

    if (changes.error) {
      this.templateManager.addTemplateRef(RxLetTemplateNames.error, this.error);
    }

    if (changes.rxLet) {
      this.observablesHandler.next(this.rxLet);
    }
  }

  /** @internal */
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  /** @internal */
  private _createTemplateManager(): void {
    this.templateManager = createTemplateManager<
      U,
      RxLetViewContext<U>,
      RxLetTemplateNames
    >({
      templateSettings: {
        viewContainerRef: this.viewContainerRef,
        customContext: (rxLet) => ({ rxLet }),
      },
      renderSettings: {
        cdRef: this.cdRef,
        parent: !!this.renderParent,
        patchZone: this.patchZone ? this.ngZone : false,
        defaultStrategyName: this.strategyProvider.primaryStrategy,
        strategies: this.strategyProvider.strategies,
        errorHandler: this.errorHandler,
      },
      notificationToTemplateName: {
        [RxNotificationKind.Suspense]: () =>
          this.suspense ? RxLetTemplateNames.suspense : RxLetTemplateNames.next,
        [RxNotificationKind.Next]: () => RxLetTemplateNames.next,
        [RxNotificationKind.Error]: () =>
          this.error ? RxLetTemplateNames.error : RxLetTemplateNames.next,
        [RxNotificationKind.Complete]: () =>
          this.complete ? RxLetTemplateNames.complete : RxLetTemplateNames.next,
      },
      templateTrigger$: this.triggerHandler,
    });

    this.templateManager.addTemplateRef(
      RxLetTemplateNames.next,
      this.templateRef,
    );
    this.templateManager.nextStrategy(this.strategyHandler.values$);
  }
}
