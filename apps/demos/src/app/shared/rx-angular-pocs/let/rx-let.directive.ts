import {
  AfterViewInit,
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

import { defer, isObservable, NextObserver, Observable, ObservableInput, of, Subscription, Unsubscribable } from 'rxjs';
import { distinctUntilChanged, filter, pluck, switchAll } from 'rxjs/operators';
import {
  createTemplateManager,
  RxNotification,
  RxNotificationKind,
  RxTemplateObserver,
  RxViewContext,
  TemplateManager
} from '@rx-angular/template';

import {
  getDefaultStrategyCredentialsMap,
  mergeStrategies,
  RX_CUSTOM_STRATEGIES,
  RX_PRIMARY_STRATEGY,
  StrategyCredentialsMap
} from '../render-stragegies';
import { StrategyProvider } from '../render-stragegies/strategy-provider.service';
import { Hooks } from '../../debug-helper/hooks';
import { createRenderAware, RenderAware } from '../cdk/render-aware';
import { ngInputFlatten } from '../../utils/ngInputFlatten';

type RxLetTemplateNames = RxNotificationKind;

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
export class LetDirective<U> extends Hooks implements OnInit, AfterViewInit, OnDestroy {
  static ngTemplateGuard_rxLet: 'binding';

  readonly renderAware: RenderAware<U>;
  readonly strategies: StrategyCredentialsMap;

  @Input()
  set rxLet(potentialObservable: ObservableInput<U> | null | undefined) {
    this.renderAware.nextPotentialObservable(potentialObservable);
  }

  @Input('rxLetStrategy')
  set strategy(strategyName: string | Observable<string> | undefined) {
    this.renderAware.nextStrategy(strategyName);
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
  private renderCallBackSubscription: Unsubscribable = Subscription.EMPTY;

  private readonly templateManager: TemplateManager<LetViewContext<U | undefined | null>,
    RxLetTemplateNames>;

  private readonly initialViewContext: LetViewContext<U> = {
    $implicit: undefined,
    rxLet: undefined,
    $rxError: false,
    $rxComplete: false,
    $rxSuspense: false
  };

  private rendered$ = defer(() => this.renderAware.rendered$);

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
      this.rxLetObserveNext(value);
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

  private rxLetObserveNext(value: U) {
    this.templateManager.displayView('rxNext');
    this.templateManager.updateViewContext({
      $implicit: value,
      rxLet: value
    });
  }

  constructor(
    @Optional()
    @Inject(RX_CUSTOM_STRATEGIES)
    private customStrategies: StrategyCredentialsMap[],
    @Inject(RX_PRIMARY_STRATEGY)
    private defaultStrategyName: string,
    public cdRef: ChangeDetectorRef,
    private readonly nextTemplateRef: TemplateRef<LetViewContext<U>>,
    private readonly viewContainerRef: ViewContainerRef
  ) {
    super();
    this.templateManager = createTemplateManager(
      this.viewContainerRef,
      this.initialViewContext
    );
    this.strategies = this.customStrategies.reduce((a, i) => mergeStrategies(a, i), getDefaultStrategyCredentialsMap());
    this.renderAware = createRenderAware<U>({
      templateObserver: this.templateObserver,
      context: (cdRef as any).context,
      strategies: this.strategies,
      defaultStrategyName: this.defaultStrategyName,
      getCdRef: (notification: RxNotification<U>) => this.templateManager.getEmbeddedView(notification.kind)
    });
  }

  ngOnInit() {
    this.templateManager.addTemplateRef('rxNext', this.nextTemplateRef);
    this.displayInitialView();
  }

  ngAfterViewInit() {
    this.subscription = this.renderAware.rendered$.subscribe();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
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
