import {
  ChangeDetectorRef,
  Directive,
  EmbeddedViewRef,
  ErrorHandler,
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
import { map, filter } from 'rxjs/operators';

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
 * @Directive LetDirective
 *
 * @description
 *
 * The `*rxLet` directive serves a convenient way of binding observables to a view context. Furthermore, it helps
 * you structure view-related models into view context scope (DOM element's scope).
 *
 * Under the hood, it leverages a `RenderStrategy` which in turn takes care of optimizing the change detection
 * of your component or embedded view. The `LetDirective` will render its template and manage change detection after it
 *   got an initial value. So if the incoming `Observable` emits its value lazily (e.g. data coming from `Http`), your
 *   template will be rendered lazily as well. This can very positively impact the initial render performance of your
 *   application.
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
 * - display custom templates for different observable notifications (suspense, next, error, complete)
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
 * <ng-container *rxLet="observableNumber$; let n; let e = error, let c = complete">
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
 *     error: error;
 *     complete: complete;
 *     suspense: suspense;
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
 *
 * @docsCategory LetDirective
 * @docsPage LetDirective
 * @publicApi
 */
@Directive({ selector: '[rxLet]' })
export class LetDirective<U> implements OnInit, OnDestroy, OnChanges {
  static ngTemplateGuard_rxLet: 'binding';

  /**
   * @description
   * The Observable to be bound to the context of a template.
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
   * @param potentialObservable
   */
  @Input() rxLet: ObservableInput<U> | U | null | undefined;

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
  @Input('rxLetStrategy')
  set strategy(strategyName: string | Observable<string> | undefined) {
    this.strategyHandler.next(strategyName);
  }

  /**
   * @description
   * A template to show if the bound Observable is in "complete" state.
   *
   * @example
   * <ng-container *rxLet="hero$; let hero; complete: completeTemplate">
   *   <app-hero [hero]="hero"></app-hero>
   * </ng-container>
   * <ng-template #completeTemplate>
   *   <mat-icon>thumb_up</mat-icon>
   * </ng-template>
   *
   * @param templateRef
   */
  @Input('rxLetComplete')
  complete: TemplateRef<RxLetViewContext<U | undefined | null> | null>;

  /**
   * @description
   * A template to show if the bound Observable is in "error" state.
   *
   * @example
   * <ng-container *rxLet="hero$; let hero; error: errorTemplate">
   *   <app-hero [hero]="hero"></app-hero>
   * </ng-container>
   * <ng-template #errorTemplate>
   *   <mat-icon>thumb_down</mat-icon>
   * </ng-template>
   *
   * @param templateRef
   */
  @Input('rxLetError')
  error: TemplateRef<RxLetViewContext<U | undefined | null> | null>;

  /**
   * @description
   * A template to show before the first value is emitted from the bound Observable.
   *
   * @example
   * <ng-container *rxLet="hero$; let hero; suspense: suspenseTemplate">
   *   <app-hero [hero]="hero"></app-hero>
   * </ng-container>
   * <ng-template #suspenseTemplate>
   *   <mat-progress-spinner></mat-progress-spinner>
   * </ng-template>
   *
   * @param templateRef
   */
  @Input('rxLetSuspense')
  suspense: TemplateRef<RxLetViewContext<U | undefined | null> | null>;

  /**
   * @description
   * A trigger to manually set the active template. It accepts a RxNotificationKind
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
   *    templateTrg: templateTrigger$
   * ">
   *
   *   <app-hero [hero]="hero"></app-hero>
   *   <error *ngIf="e"></error>
   * </ng-container>
   *
   * // trigger template from component.ts
   * templateTrigger$.next(RxNotificationKind.error)
   *
   * @param Observable<RxNotificationKind>
   */
  @Input('rxLetTemplateTrg') templateTrigger?: Observable<RxNotificationKind>;

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
   *    completeTrg: completeTrigger$
   * ">
   *
   *   <app-hero [hero]="hero"></app-hero>
   *   <done *ngIf="c"></done>
   * </ng-container>
   *
   * // trigger template from component.ts
   * completeTrigger$.next()
   *
   * @param Observable<RxNotificationKind>
   */
  @Input('rxLetCompleteTrg') completeTrigger?: Observable<unknown>;

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
   *    errorTrg: errorTrigger$
   * ">
   *
   *   <app-hero [hero]="hero"></app-hero>
   *   <error *ngIf="e"></error>
   * </ng-container>
   *
   * // trigger template from component.ts
   * errorTrigger$.next()
   *
   * @param Observable<unknown>
   */
  @Input('rxLetErrorTrg') errorTrigger?: Observable<unknown>;

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
   *    suspenseTrg: suspenseTrigger$
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
   * @param Observable<unknown>
   */
  @Input('rxLetSuspenseTrg') suspenseTrigger?: Observable<unknown>;

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
   *    nextTrg: nextTrigger$
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
   * @param Observable<unknown>
   */
  @Input('rxLetNextTrg') nextTrigger?: Observable<unknown>;

  @Input('rxLetRenderCallback')
  set renderCallback(callback: NextObserver<U>) {
    this._renderObserver = callback;
  }

  @Input('rxLetParent') renderParent = this.strategyProvider.config.parent;

  @Input('rxLetPatchZone') patchZone = this.strategyProvider.config.patchZone;

  constructor(
    private strategyProvider: RxStrategyProvider,
    public cdRef: ChangeDetectorRef,
    private ngZone: NgZone,
    private readonly nextTemplateRef: TemplateRef<RxLetViewContext<U>>,
    private readonly viewContainerRef: ViewContainerRef,
    private errorHandler: ErrorHandler
  ) {}

  /** @internal */
  private observablesHandler = createTemplateNotifier<U>();
  /** @internal */
  private strategyHandler = coerceAllFactory<string>(
    () => new ReplaySubject<RxStrategyNames<string>>(1)
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
    dir: LetDirective<U>,
    ctx: unknown | null | undefined
  ): ctx is RxLetViewContext<U> {
    return true;
  }

  /** @internal */
  ngOnInit() {
    this.subscription.add(
      this.templateManager
        .render(merge(this.values$, this.templateNotification$))
        .subscribe((n) => {
          this.rendered$.next(n);
          this._renderObserver?.next(n);
        })
    );
    this.subscription.add(
      merge(
        this.templateTrigger || NEVER,
        this.nextTrigger?.pipe(map(() => RxNotificationKind.Next)) || NEVER,
        this.suspenseTrigger?.pipe(map(() => RxNotificationKind.Suspense)) ||
          NEVER,
        this.completeTrigger?.pipe(map(() => RxNotificationKind.Complete)) ||
          NEVER,
        this.errorTrigger?.pipe(map(() => RxNotificationKind.Error)) || NEVER
      )
        .pipe(filter((v) => !!v))
        .subscribe((t) => this.triggerHandler.next(t))
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
        this.complete
      );
    }

    if (changes.suspense) {
      this.templateManager.addTemplateRef(
        RxLetTemplateNames.suspense,
        this.suspense
      );
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
        createViewContext,
        updateViewContext,
        customContext: (rxLet) => ({ rxLet }),
        patchZone: this.patchZone ? this.ngZone : false,
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
      this.nextTemplateRef
    );
    this.templateManager.nextStrategy(this.strategyHandler.values$);
  }
}

/** @internal */
function createViewContext<T>(value: T): RxLetViewContext<T> {
  return {
    rxLet: value,
    $implicit: value,
    error: false,
    complete: false,
    suspense: false,
  };
}
/** @internal */
function updateViewContext<T>(
  value: T,
  view: EmbeddedViewRef<RxLetViewContext<T>>,
  context: RxLetViewContext<T>
): void {
  Object.keys(context).forEach((k) => {
    view.context[k] = context[k];
  });
}
