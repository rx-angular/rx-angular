import {
  ChangeDetectorRef,
  Directive,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';

import {
  ConnectableObservable,
  defer,
  NextObserver,
  Observable,
  ObservableInput,
  ReplaySubject,
  Subscription,
  Unsubscribable
} from 'rxjs';
import { filter, map, pluck, publish, share, startWith, switchMap, tap } from 'rxjs/operators';
import {
  createTemplateManager,
  getEnsureStrategy,
  getStrategies,
  rxMaterialize,
  RxNotificationKind,
  RxTemplateObserver,
  RxViewContext,
  TemplateManager
} from '@rx-angular/template';

import {
  applyStrategy,
  getDefaultStrategyCredentialsMap,
  mergeStrategies,
  nameToStrategyCredentials,
  RX_CUSTOM_STRATEGIES,
  RX_PRIMARY_STRATEGY,
  StrategyCredentials,
  StrategyCredentialsMap
} from '../render-stragegies';
import { StrategyProvider } from '../render-stragegies/strategy-provider.service';
import { ngInputFlatten } from '../../utils/ngInputFlatten';
import { Hooks } from '../../debug-helper/hooks';

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
export class LetDirective<U> extends Hooks implements OnInit, OnDestroy {
  static ngTemplateGuard_rxLet: 'binding';

  readonly strategies: StrategyCredentialsMap;

  @Input()
  set rxLet(potentialObservable: ObservableInput<U> | null | undefined) {
    this.observable$Subject$.next(potentialObservable);
  }

  @Input('rxLetStrategy')
  set strategy(strategy: string | Observable<string> | undefined) {
    this.strategy$Subject$.next(strategy);
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

  private _renderObserver: NextObserver<U>;

  @Input('rxLetRenderCallback')
  set renderCallback(callback: NextObserver<U>) {
    this._renderObserver = callback;
    this.subscribeRenderCallback();
  }

  @Output() readonly rendered = defer(() => this.rendered$.pipe(
      filter(({ kind }) => this.templateManager.hasTemplateRef(kind)),
      pluck('value')
    )
  );
  ensureStrategy;

  private subscription: Unsubscribable = Subscription.EMPTY;
  private strategyChangeSubscription: Unsubscribable = Subscription.EMPTY;
  private renderCallBackSubscription: Unsubscribable = Subscription.EMPTY;

  private readonly templateManager: TemplateManager<LetViewContext<U | undefined | null>,
    RxNotificationKind>;

  private readonly initialViewContext: LetViewContext<U> = {
    $implicit: undefined,
    rxLet: undefined,
    $rxError: false,
    $rxComplete: false,
    $rxSuspense: false
  };

  private readonly observable$Subject$ = new ReplaySubject(1);
  private readonly observable$ = this.observable$Subject$.pipe(
    ngInputFlatten()
  );
  private readonly strategy$Subject$ = new ReplaySubject<string | Observable<string>>(1);
  private readonly strategy$: Observable<StrategyCredentials> = defer(() => this.strategy$Subject$.pipe(
    ngInputFlatten(),
    startWith(this.defaultStrategy),
    nameToStrategyCredentials(this.strategies, this.defaultStrategy)
  ));
  private rendered$ = this.afterViewInit$.pipe(
    switchMap(() => this.observable$.pipe(
      tap((value: any) => this.templateObserver.next(value)),
      rxMaterialize(),
      applyStrategy(this.strategy$, (this.cdRef as any).context, this.templateManager.getEmbeddedView)
      )
    ),
    publish()
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
    dir: LetDirective<U>,
    ctx: unknown | null | undefined
  ): ctx is LetViewContext<U> {
    return true;
  }

  constructor(
    @Optional()
    @Inject(RX_CUSTOM_STRATEGIES)
    private customStrategies: StrategyCredentialsMap[],
    @Inject(RX_PRIMARY_STRATEGY)
    private defaultStrategy: string,
    public cdRef: ChangeDetectorRef,
    private readonly nextTemplateRef: TemplateRef<LetViewContext<U>>,
    private readonly viewContainerRef: ViewContainerRef
  ) {
    super();
    this.ensureStrategy = getEnsureStrategy(getStrategies({ cdRef }));
    this.templateManager = createTemplateManager(
      this.viewContainerRef,
      this.initialViewContext
    );
    this.strategies = this.customStrategies.reduce((a, i) => mergeStrategies(a, i), getDefaultStrategyCredentialsMap());
  }

  ngOnInit() {
    this.templateManager.addTemplateRef('rxNext', this.nextTemplateRef);
    this.displayInitialView();
    this.subscription = (this.rendered$ as ConnectableObservable<any>).connect();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.strategyChangeSubscription.unsubscribe();
    this.renderCallBackSubscription.unsubscribe();
    this.templateManager.destroy();
  }

  private subscribeRenderCallback(): void {
    this.renderCallBackSubscription.unsubscribe();
    if (this._renderObserver) {
      this.renderCallBackSubscription = this.rendered.subscribe(
        this._renderObserver
      );
    }
  }

  private displayInitialView = () => {
    // Display "suspense" template if provided
    if (this.templateManager.hasTemplateRef('rxSuspense')) {
      this.templateManager.displayView('rxSuspense');
    }
  };
}
