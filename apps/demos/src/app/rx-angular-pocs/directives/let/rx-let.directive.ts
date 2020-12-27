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

import { defer, NextObserver, Observable, ObservableInput, Subject, Subscription, Unsubscribable } from 'rxjs';
import { filter, map, mapTo, tap } from 'rxjs/operators';
import { RxBaseTemplateNames, RxNotification, RxTemplateObserver } from '../../cdk/model';

import { getDefaultStrategyCredentialsMap } from '../../render-strategies/default-strategies';
import { RX_CUSTOM_STRATEGIES } from '../../render-strategies/custom-strategies-token';
import { RX_PRIMARY_STRATEGY } from '../../render-strategies/default-primary-strategy-token';
import { StrategyProvider } from '../../render-strategies/strategy-provider.service';
import { StrategyCredentialsMap } from '../../render-strategies/model';
import { mergeStrategies } from '../../render-strategies/strategy-helper';

import { Hooks } from '../../cdk/hooks';
import { createTemplateManager, TemplateManager } from '../../cdk/utils/template-manager_creator';

import { toRxCompleteNotification, toRxErrorNotification, toRxSuspenseNotification } from '../../cdk/utils/utils';
import { createRenderAware, RenderAware } from '../../cdk/render-aware/render-aware';
import { RxLetTemplateNames, rxLetTemplateNames, RxLetViewContext } from './model';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[rxLet]',
  providers: [StrategyProvider]
})
// tslint:disable-next-line:directive-class-suffix
export class RxLet<U> extends Hooks implements OnInit, OnDestroy {


  @Input()
  set rxLet(potentialObservable: ObservableInput<U> | null | undefined) {
    this.renderAware.nextPotentialObservable(potentialObservable);
  }

  @Input('rxLetStrategy')
  set strategy(strategyName: string | Observable<string> | undefined) {
    this.renderAware.nextStrategy(strategyName);
  }

  @Input('rxLetCompleteTpl')
  set rxComplete(templateRef: TemplateRef<RxLetViewContext<U | undefined | null> | null>) {
    this.templateManager.addTemplateRef(RxLetTemplateNames.complete, templateRef);
  }

  @Input('rxLetErrorTpl')
  set rxError(templateRef: TemplateRef<RxLetViewContext<U | undefined | null> | null>) {
    this.templateManager.addTemplateRef(RxLetTemplateNames.error, templateRef);
  }

  @Input('rxLetSuspenseTpl')
  set rxSuspense(templateRef: TemplateRef<RxLetViewContext<U | undefined | null> | null>) {
    this.templateManager.addTemplateRef(RxLetTemplateNames.suspense, templateRef);
  }

  @Input('rxLetCompleteTrg')
  set rxCompleteTrigger(trigger$: Observable<any>) {
    this.renderAware.nextTemplateTrigger(trigger$.pipe(mapTo(toRxCompleteNotification() as any)));
  }

  @Input('rxLetErrorTrg')
  set rxErrorTrigger(error$: Observable<any>) {
    this.renderAware.nextTemplateTrigger(error$.pipe(map(toRxErrorNotification as any)));
  }

  @Input('rxLetSuspenseTrg')
  set rxSuspenseTrigger(trigger$: Observable<any>) {
    console.log('rxSuspense', trigger$);
    this.renderAware.nextTemplateTrigger(trigger$.pipe(map(toRxSuspenseNotification as any)));
  }

  @Input('rxLetRenderCallback')
  set renderCallback(callback: NextObserver<U>) {
    this._renderObserver = callback;
  }

  constructor(
    @Optional()
    @Inject(RX_CUSTOM_STRATEGIES)
    private customStrategies: StrategyCredentialsMap[],
    @Inject(RX_PRIMARY_STRATEGY)
    private defaultStrategyName: string,
    public cdRef: ChangeDetectorRef,
    private readonly nextTemplateRef: TemplateRef<RxLetViewContext<U>>,
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
      strategies: this.strategies,
      defaultStrategyName: this.defaultStrategyName,
      // @NOTICE this is checked every emmit. Templates are IMHO statically assigned, so we could find a way to check only once?
      getCdRef: (notification: RxNotification<U>): ChangeDetectorRef => this.getEmbeddeViewByNotification(notification),
      getContext: (notification: RxNotification<U>): ChangeDetectorRef => this.getEmbeddeViewByNotification(notification)
    });
  }

  static ngTemplateGuard_rxLet: 'binding';

  private readonly strategies: StrategyCredentialsMap;

  private _renderObserver: NextObserver<any>;

  private subscription: Unsubscribable = Subscription.EMPTY;

  private readonly templateManager: TemplateManager<RxLetViewContext<U | undefined | null>, rxLetTemplateNames>;

  private readonly initialViewContext: RxLetViewContext<U> = {
    $implicit: undefined,
    rxLet: undefined,
    $error: false,
    $complete: false,
    $suspense: false
  };

  private readonly templateObserver: RxTemplateObserver<U | null | undefined> = {
    suspense: (value?: any) => {
      this.displayInitialView();
      this.templateManager.updateViewContext({
        // if a custom value is provided take it, otherwise assign true
        $suspense: value !== undefined ? value : true,
        $error: false,
        $complete: false
      });
    },
    next: (value: U | null | undefined) => {
      this.templateManager.displayView(RxLetTemplateNames.next);
      this.templateManager.updateViewContext({
        $implicit: value,
        rxLet: value,
        $suspense: false,
        $error: false,
        $complete: false
      });
    },
    error: (error: Error) => {
      this.templateManager.displayView(RxLetTemplateNames.error, RxLetTemplateNames.next);
      this.templateManager.updateViewContext({
        $error: error,
        $suspense: false
      });
    },
    complete: () => {
      this.templateManager.displayView(RxLetTemplateNames.complete, RxLetTemplateNames.next);
      this.templateManager.updateViewContext({
        $complete: true,
        $suspense: false
      });
    }
  };

  private rendered$ = new Subject<RxNotification<U>>();
  readonly renderAware: RenderAware<U>;

  @Output() readonly rendered = defer(() => this.rendered$.pipe(
      filter(({ kind }) => this.templateManager.hasTemplateRef(kind as any))
    )
  );

  /** @internal */
  static ngTemplateContextGuard<U>(
    dir: RxLet<U>,
    ctx: unknown | null | undefined
  ): ctx is RxLetViewContext<U> {
    return true;
  }

  ngOnInit() {
    this.templateManager.addTemplateRef(RxLetTemplateNames.next, this.nextTemplateRef);
    this.renderAware.subscribe();
    this.subscription = this.renderAware.rendered$.pipe(
      tap(this?._renderObserver)
    ).subscribe(this.rendered$);
    this.displayInitialView();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.templateManager.destroy();
  }

  private getEmbeddeViewByNotification = (notification: RxNotification<U>): ChangeDetectorRef => {
    const name = this.templateManager.getTemplateName(notification.kind as any, RxLetTemplateNames.next);
    return this.templateManager.getEmbeddedView(name);
  }

  private displayInitialView = () => {
    // Display "suspense" template if provided
    if (this.templateManager.hasTemplateRef(RxLetTemplateNames.suspense)) {
      this.templateManager.displayView(RxLetTemplateNames.suspense);
    }
  };

}
