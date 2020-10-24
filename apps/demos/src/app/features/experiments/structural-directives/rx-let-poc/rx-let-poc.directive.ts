import {
  ChangeDetectorRef,
  Directive,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef,
  ɵmarkDirty as markDirty
} from '@angular/core';
import {
  coalesceWith,
  createTemplateManager,
  priorityTickMap,
  rxMaterialize,
  RxTemplateObserver,
  RxViewContext,
  SchedulingPriority,
  TemplateManager
} from '@rx-angular/template';
// tslint:disable-next-line: nx-enforce-module-boundaries
import { RenderAware, RxNotificationKind } from 'libs/template/src/lib/core';
// tslint:disable-next-line: nx-enforce-module-boundaries
import { DEFAULT_STRATEGY_NAME } from 'libs/template/src/lib/render-strategies/strategies/strategies-map';
import { isObservable, Observable, ObservableInput, of, ReplaySubject, Subscription, Unsubscribable } from 'rxjs';
import { distinctUntilChanged, map, publish, switchAll, switchMap, tap } from 'rxjs/operators';
import { RxChangeDetectorRef } from '../../../../shared/rx-change-detector-ref/rx-change-detector-ref.service';
import { DefaultStrategies } from '../../../../shared/rx-change-detector-ref/default-strategies.interface';

// import { createRenderAware, RenderAware, StrategySelection } from './core';
// import {
//   RxTemplateObserver,
//   RxViewContext,
//   RxNotificationKind,
// } from './core/model';
// import {
//   createTemplateManager,
//   TemplateManager,
// } from './core/utils/template-manager_creator';
// import {
//   DEFAULT_STRATEGY_NAME,
//   getStrategies,
// } from './render-strategies/strategies/strategies-map';

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
 *
 * @docsCategory LetDirective
 * @docsPage LetDirective
 * @publicApi
 */
@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[rxLet]',
  exportAs: 'renderNotifier',
  providers: [RxChangeDetectorRef]
})
export class LetPocDirective<U> implements OnInit, OnDestroy {
  static ngTemplateGuard_rxLet: 'binding';

  readonly renderAware: RenderAware<U | null | undefined>;

  @Input()
  set rxLet(potentialObservable: ObservableInput<U> | null | undefined) {
    this.observable$Subject$.next(
      isObservable(potentialObservable)
        ? potentialObservable
        : of(potentialObservable)
    );
  }

  @Input('rxLetStrategy')

  set strategy(strategy: string | Observable<string> | undefined) {
    const o$: Observable<string> = isObservable(strategy) ? strategy : of(strategy || DEFAULT_STRATEGY_NAME);
    this.strategy$Subject$.next(o$);
  }

  @Input('rxLetRxComplete')
  set rxComplete(
    templateRef: TemplateRef<LetViewContext<U | undefined | null> | null>
  ) {
    this.templateManager.addTemplateRef('rxComplete', templateRef);
  }

  @Input('rxLetRxError')
  set rxError(
    templateRef: TemplateRef<LetViewContext<U | undefined | null> | null>
  ) {
    this.templateManager.addTemplateRef('rxError', templateRef);
  }

  @Input('rxLetRxSuspense')
  set rxSuspense(
    templateRef: TemplateRef<LetViewContext<U | undefined | null> | null>
  ) {
    this.templateManager.addTemplateRef('rxSuspense', templateRef);
  }

  public currentStrategy: string;

  private subscription: Unsubscribable = Subscription.EMPTY;
  private strategyChangeSubscription: Unsubscribable = Subscription.EMPTY;

  private readonly templateManager: TemplateManager<LetViewContext<U | undefined | null>,
    RxNotificationKind>;

  private readonly initialViewContext: LetViewContext<U> = {
    $implicit: undefined,
    rxLet: undefined,
    $rxError: false,
    $rxComplete: false,
    $rxSuspense: false
  };

  observable$Subject$ = new ReplaySubject(1);
  observable$ = this.observable$Subject$.pipe(
    distinctUntilChanged(),
    switchAll(),
    distinctUntilChanged()
  );
  strategy$Subject$ = new ReplaySubject<Observable<string>>(1);
  strategy$: Observable<string> = this.strategy$Subject$.pipe(
    distinctUntilChanged(),
    switchAll(),
    distinctUntilChanged()
  );

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
    dir: LetPocDirective<U>,
    ctx: unknown | null | undefined
  ): ctx is LetViewContext<U> {
    return true;
  }

  constructor(
    public cdRef: ChangeDetectorRef,
    public cdRefServiceNext: RxChangeDetectorRef,
    private readonly nextTemplateRef: TemplateRef<LetViewContext<U>>,
    private readonly viewContainerRef: ViewContainerRef
  ) {
    this.templateManager = createTemplateManager(
      this.viewContainerRef,
      this.initialViewContext
    );
  }

  public changeStrategy(strategy: keyof DefaultStrategies) {
    this.cdRefServiceNext.setStrategy(strategy);
  }

  ngOnInit() {
    this.templateManager.addTemplateRef('rxNext', this.nextTemplateRef);
    this.displayInitialView();
    this.subscription = this.observable$
      .pipe(
        tap((value: any) => this.templateObserver.next(value)),
        rxMaterialize(),
        map((n) => this.templateManager.getEmbeddedView(n.kind) as ChangeDetectorRef),
        applyStrategy(this.strategy$, (this.cdRef as any).context)
      )
      .subscribe();
  }

  /** @internal */
  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.strategyChangeSubscription.unsubscribe();
    this.templateManager.destroy();
  }

  /** @internal */
  private displayInitialView = () => {
    // Display "suspense" template if provided
    if (this.templateManager.hasTemplateRef('rxSuspense')) {
      this.templateManager.displayView('rxSuspense');
    }
  };
}

/**
 * VIEW RENDERING
 *
 * Global - only works with component,
 * Noop - not needed,
 * Native - works only with ChangeDetectorRef,
 * Local - needs to coalesce embeddedViews, scoping is not necessary (only in pipes)
 * Detach - could be a problem in switching from and to it,
 *
 * SCHEDULING
 *
 * Global - not yet configurable,
 * Noop - not needed,
 * Native - not configurable,
 * Local - fully configurable
 */

function renderByStrategyName(strategyName: string, evCdRef, context): void {
  switch (strategyName) {
    case 'local':
      evCdRef.reattach();
      evCdRef.detectChanges();
      evCdRef.detach();
      break;
    case 'global':
      // could be solved with intermediate last strategy
      evCdRef.reattach();
      markDirty(context);
      break;
    case 'native':
      // could be solved with intermediate last strategy
      evCdRef.reattach();
      evCdRef.markForCheck();
      break;
    case 'noop':
      // do nothing

  }
}

function scheduleByStrategyName<T>(strategyName: string): (o$: Observable<T>) => Observable<T> {
  return o$ => {
    switch (strategyName) {
      case 'local':
        return o$.pipe(coalesceWith(priorityTickMap[SchedulingPriority.animationFrame]));
      default:
        return o$;
    }
  };
}

function applyStrategy<T>(strategyName$: Observable<string>, context): (o$: Observable<T>) => Observable<T> {
  return view$ => view$.pipe(
    publish(v$ => strategyName$.pipe(
      switchMap(strategyName => v$.pipe(
        scheduleByStrategyName(strategyName),
        tap((evcDRef) => renderByStrategyName(strategyName, evcDRef, context))
        )
      ))
    )
  );
}

