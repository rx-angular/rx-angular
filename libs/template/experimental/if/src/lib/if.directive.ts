import {
  ChangeDetectorRef,
  Directive,
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
  NextObserver,
  Observable,
  ObservableInput,
  ReplaySubject,
  Subject,
  Subscription,
} from 'rxjs';
import { mergeAll } from 'rxjs/operators';
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
 * Read more about the RxIf directive in the [official docs](https://www.rx-angular.io/docs/template/api/rx-if-directive).
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
})
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export class RxIf implements OnInit, OnChanges, OnDestroy, OnChanges {
  /** @internal */
  private subscription = new Subscription();
  /** @internal */
  private _renderObserver: NextObserver<unknown>;
  /** @internal */
  private templateManager: RxTemplateManager<
    boolean,
    RxIfViewContext,
    rxIfTemplateNames
  >;

  /** @internal */
  private lastValidValue: boolean | null;

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
   * @param { ObservableInput<boolean> | boolean } rxIf
   */
  @Input() rxIf: ObservableInput<boolean> | boolean;

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
   * [official docs](https://www.rx-angular.io/docs/template/api/let-directive#use-render-strategies-strategy).
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
  set strategy(
    strategyName: Observable<RxStrategyNames<string>> | RxStrategyNames<string>
  ) {
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
  @Input('rxIfElse') else: TemplateRef<RxIfViewContext>;

  /**
   * @description
   * Defines the template to be used when the bound value is truthy
   *
   * @example
   * <ng-container *rxIf="show$; then: hero"></ng-container>
   * <ng-template #hero><app-hero></app-hero></ng-template>
   */
  @Input('rxIfThen') then: TemplateRef<RxIfViewContext>;

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
  @Input('rxIfSuspense') suspense: TemplateRef<RxIfViewContext>;

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
  @Input('rxIfComplete') complete: TemplateRef<RxIfViewContext>;

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
  @Input('rxIfError') error: TemplateRef<RxIfViewContext>;

  /**
   * @description
   *
   * Structural directives maintain `EmbeddedView`s within a components' template.
   * Depending on the bound value as well as the configured `RxRenderStrategy`,
   * updates processed by the `*rxIf` directive might be asynchronous.
   *
   * Whenever a template gets inserted into, or removed from, its parent component, the directive has to inform the parent in order to
   * update any view- or contentquery (`@ViewChild`, `@ViewChildren`, `@ContentChild`, `@ContentChildren`).
   *
   * Read more about this in the
   * [official docs](https://www.rx-angular.io/docs/template/api/rx-if-directive#local-strategies-and-view-content-queries-parent).
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
  private observablesHandler = createTemplateNotifier<boolean>();

  /** @internal */
  private readonly strategyHandler = coerceAllFactory<RxStrategyNames<string>>(
    () =>
      new ReplaySubject<
        RxStrategyNames<string> | Observable<RxStrategyNames<string>>
      >(1),
    mergeAll()
  );
  /** @internal */
  private readonly rendered$ = new Subject<void>();
  /** @internal */
  private get thenTemplate(): TemplateRef<RxIfViewContext> {
    return this.then ? this.then : this.templateRef;
  }

  constructor(
    private strategyProvider: RxStrategyProvider,
    private cdRef: ChangeDetectorRef,
    private ngZone: NgZone,
    private readonly templateRef: TemplateRef<RxIfViewContext>,
    private readonly viewContainerRef: ViewContainerRef
  ) {}

  /** @internal */
  ngOnInit() {
    this.subscription.add(
      this.observablesHandler.values$.subscribe(({ kind, value }) => {
        if (kind === 'next' && value !== undefined) {
          this.lastValidValue = value;
        }
      })
    );
    this.subscription.add(
      this.templateManager
        .render(this.observablesHandler.values$)
        .subscribe((n) => {
          this.rendered$.next(n);
          this._renderObserver?.next(n);
        })
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
        this.thenTemplate
      );
    }

    if (changes.else) {
      this.templateManager.addTemplateRef(RxIfTemplateNames.else, this.else);
    }

    if (changes.complete) {
      this.templateManager.addTemplateRef(
        RxIfTemplateNames.complete,
        this.complete
      );
    }

    if (changes.suspense) {
      this.templateManager.addTemplateRef(
        RxIfTemplateNames.suspense,
        this.suspense
      );
      this.observablesHandler.withInitialSuspense(!!this.suspense);
    }

    if (changes.error) {
      this.templateManager.addTemplateRef(RxIfTemplateNames.error, this.error);
    }

    if (changes.rxIf) {
      this.observablesHandler.next(this.rxIf);
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
      boolean,
      RxIfViewContext,
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
        [RxNotificationKind.Suspense]: () =>
          this.suspense
            ? RxIfTemplateNames.suspense
            : getNextTemplate(this.lastValidValue),
        [RxNotificationKind.Next]: getNextTemplate.bind(this),
        [RxNotificationKind.Error]: () =>
          this.error
            ? RxIfTemplateNames.error
            : getNextTemplate(this.lastValidValue),
        [RxNotificationKind.Complete]: () =>
          this.complete
            ? RxIfTemplateNames.complete
            : getNextTemplate(this.lastValidValue),
      },
    });
    this.templateManager.addTemplateRef(
      RxIfTemplateNames.then,
      this.thenTemplate
    );
    this.templateManager.nextStrategy(this.strategyHandler.values$);
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
