import {
  ChangeDetectorRef,
  Directive,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import {
  createTemplateManager,
  rxMaterialize,
  RxNotificationKind,
  RxTemplateObserver,
  RxViewContext,
  TemplateManager
} from '@rx-angular/template';
import { defer, Observable, ObservableInput, ReplaySubject, Subscription, Unsubscribable } from 'rxjs';
import { startWith, tap } from 'rxjs/operators';

import {
  applyStrategy,
  getDefaultStrategyCredentialsMap,
  mergeStrategies,
  nameToStrategyCredentials, RX_CUSTOM_STRATEGIES, RX_DEFAULT_STRATEGY,
  StrategyCredentials,
  StrategyCredentialsMap
} from '../render-stragegies';
import { StrategyProvider } from '../render-stragegies/strategy-provider.service';
import { ngInputFlatten } from '../utils/ngInputFlatten';

export interface LetViewContext<T> extends RxViewContext<T> {
  // to enable `as` syntax we have to assign the directives selector (var as v)
  rxLet: T;
}

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[rxLet]',
  exportAs: 'renderNotifier',
  providers: [StrategyProvider]
})
export class LetPocDirective<U> implements OnInit, OnDestroy {
  static ngTemplateGuard_rxLet: 'binding';

  strategies: StrategyCredentialsMap;

  @Input()
  set rxLet(potentialObservable: ObservableInput<U> | null | undefined) {
    this.observable$Subject$.next(potentialObservable);
  }

  @Input('rxLetStrategy')
  set strategy(strategyName: string | Observable<string>) {
    this.strategy$Subject$.next(strategyName);
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
    ngInputFlatten()
  );
  strategy$Subject$ = new ReplaySubject<string | Observable<string>>(1);
  strategy$: Observable<StrategyCredentials> = defer(() => this.strategy$Subject$.pipe(
    ngInputFlatten(),
    startWith(this.defaultStrategy),
    nameToStrategyCredentials(this.strategies, this.defaultStrategy)
  ));

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
    @Optional()
    @Inject(RX_CUSTOM_STRATEGIES)
    private customStrategies: StrategyCredentialsMap[],
    @Inject(RX_DEFAULT_STRATEGY)
    private defaultStrategy: string,
    public cdRef: ChangeDetectorRef,
    private readonly nextTemplateRef: TemplateRef<LetViewContext<U>>,
    private readonly viewContainerRef: ViewContainerRef
  ) {
    this.templateManager = createTemplateManager(
      this.viewContainerRef,
      this.initialViewContext
    );
    this.strategies = this.customStrategies.reduce((a, i) => mergeStrategies(a, i), getDefaultStrategyCredentialsMap());
  }

  ngOnInit() {
    this.templateManager.addTemplateRef('rxNext', this.nextTemplateRef);
    this.displayInitialView();
    this.subscription = this.observable$
      .pipe(
        tap((value: any) => this.templateObserver.next(value)),
        rxMaterialize(),
        applyStrategy(this.strategy$, (this.cdRef as any).context, this.templateManager.getEmbeddedView)
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

