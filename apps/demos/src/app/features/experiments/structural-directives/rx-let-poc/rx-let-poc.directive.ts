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

export interface LetViewContext<T> extends RxViewContext<T> {
  // to enable `as` syntax we have to assign the directives selector (var as v)
  rxLet: T;
}
export interface StrategyCredentials {
  renderMethod: string;
  priority: SchedulingPriority;
  detach: boolean;
  queued: boolean;
}

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

  set strategy(strategyCredentials: Observable<StrategyCredentials>) {
    this.strategy$Subject$.next(strategyCredentials);
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
  strategy$Subject$ = new ReplaySubject<Observable<StrategyCredentials>>(1);
  strategy$: Observable<StrategyCredentials> = this.strategy$Subject$.pipe(
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

function renderByStrategyName(renderMethod: string, detach: boolean, evCdRef, context): void {
  switch (renderMethod) {
    case 'detectChanges':
      if(detach) {
        evCdRef.reattach();
      }
      evCdRef.detectChanges();
      if(detach) {
        evCdRef.detach();
      }
      break;
    case 'markDirty':
      // could be solved with intermediate last strategy
      evCdRef.reattach();
      markDirty(context);
      break;
    case 'markForCheck':
      // could be solved with intermediate last strategy
      evCdRef.reattach();
      evCdRef.markForCheck();
      break;
    case 'noop':
      // do nothing

  }
}

function scheduleByPriority<T>(prio: SchedulingPriority): (o$: Observable<T>) => Observable<T> {
  return o$ => {
    switch (prio) {
      case SchedulingPriority.sync:
        return o$;
      default:
        return o$.pipe(coalesceWith(priorityTickMap[prio]));
    }
  };
}

function applyStrategy<T>(strategyCredentials$: Observable<StrategyCredentials>, context): (o$: Observable<T>) => Observable<T> {
  return view$ => view$.pipe(
    publish(v$ => strategyCredentials$.pipe(
      switchMap(strategyCredentials => {
        const {priority, renderMethod, detach} = strategyCredentials;
        return v$.pipe(
            scheduleByPriority(priority),
            tap((evcDRef) => renderByStrategyName(renderMethod, detach, evcDRef, context))
          )
        }
      ))
    )
  );
}

