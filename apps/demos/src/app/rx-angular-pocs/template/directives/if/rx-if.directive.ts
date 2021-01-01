import {
  AfterViewInit,
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

import { Observable, ObservableInput, Subscription, Unsubscribable } from 'rxjs';

import { getDefaultStrategyCredentialsMap, RX_PRIMARY_STRATEGY, mergeStrategies, RX_CUSTOM_STRATEGIES, StrategyCredentialsMap, createRenderAware, RenderAware, RxNotification, RxNotificationKind, RxTemplateObserver, createTemplateManager, TemplateManager  } from '../../../cdk';
import { RxIfTemplateNames, rxIfTemplateNames, RxIfViewContext, } from './model';


@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[rxIf]'
})
export class RxIf<U> implements OnInit, AfterViewInit, OnDestroy {
  readonly renderAware: RenderAware<U>;
  readonly strategies: StrategyCredentialsMap;

  private readonly initialViewContext: RxIfViewContext<U> = {
    $implicit: undefined,
    rxIf: undefined,
    rxElse: undefined,
    $error: false,
    $complete: false,
    $suspense: false
  };

  private subscription: Unsubscribable = new Subscription();
  private readonly templateManager: TemplateManager<RxIfViewContext<U | undefined | null>, rxIfTemplateNames>;

  @Input()
  set rxIf(potentialObservable: ObservableInput<U> | null | undefined) {
    this.renderAware.nextPotentialObservable(potentialObservable);
  }

  @Input('rxIfStrategy')
  set strategy(strategyName: Observable<string> | null | undefined) {
    this.renderAware.nextStrategy(strategyName);
  }

  @Input('rxIfRxComplete')
  set rxComplete(
    templateRef: TemplateRef<RxIfViewContext<U | undefined | null> | null>
  ) {
    this.templateManager.addTemplateRef(RxIfTemplateNames.complete, templateRef);
  }

  @Input('rxIfRxError')
  set rxError(
    templateRef: TemplateRef<RxIfViewContext<U | undefined | null> | null>
  ) {
    this.templateManager.addTemplateRef(RxIfTemplateNames.error, templateRef);
  }

  @Input('rxIfRxSuspense')
  set rxSuspense(
    templateRef: TemplateRef<RxIfViewContext<U | undefined | null> | null>
  ) {
    this.templateManager.addTemplateRef(RxIfTemplateNames.suspense, templateRef);
  }

  @Input('rxIfElse')
  set else(templateRef: TemplateRef<any>) {
    if (templateRef) {
      this.templateManager.addTemplateRef(RxIfTemplateNames.else, templateRef);
    }
  }

  private readonly templateObserver: RxTemplateObserver<U | null | undefined> = {
    suspense: () => {
      this.displayInitialView();
      this.templateManager.updateViewContext({
        $implicit: undefined,
        rxIf: undefined,
        $error: false,
        $complete: false,
        $suspense: true
      });
    },
    next: (value: U | null | undefined) => {
      this.rxIfObserverNext(value);
    },
    error: (error: Error) => {
      // fallback to rxNext when there's no template for rxError
      this.templateManager.displayView(RxIfTemplateNames.error, RxIfTemplateNames.then);
      this.templateManager.updateViewContext({
        $error: error
      });
    },

    complete: () => {
      // fallback to rxNext when there's no template for rxComplete
      this.templateManager.displayView(RxIfTemplateNames.complete, RxIfTemplateNames.then);
      this.templateManager.updateViewContext({
        $complete: true
      });
    }
  };

  constructor(
    @Optional()
    @Inject(RX_CUSTOM_STRATEGIES)
    private customStrategies: StrategyCredentialsMap[],
    @Inject(RX_PRIMARY_STRATEGY)
    private defaultStrategyName: string,
    private cdRef: ChangeDetectorRef,
    private readonly thenTemplateRef: TemplateRef<any>,
    private readonly viewContainerRef: ViewContainerRef
  ) {
    this.templateManager = createTemplateManager(this.viewContainerRef, this.initialViewContext);
    this.strategies = this.customStrategies.reduce((a, i) => mergeStrategies(a, i), getDefaultStrategyCredentialsMap());
    this.renderAware = createRenderAware<U>({
      templateObserver: this.templateObserver,
      strategies: this.strategies,
      defaultStrategyName: this.defaultStrategyName,
      getContext: (notification: RxNotification<U>) => this.getActiveView(notification),
      getCdRef: (notification: RxNotification<U>) => this.getActiveView(notification)
    });
  }

  getActiveView(notification: RxNotification<U>) {
    let templateName: rxIfTemplateNames | RxNotificationKind.next = notification.kind as any;
    if (templateName === RxNotificationKind.next) {
      templateName = notification.value ? RxIfTemplateNames.then : RxIfTemplateNames.else;
      return this.templateManager.getEmbeddedView(templateName);
    }
    return this.templateManager.getEmbeddedView(templateName);
  }

  ngOnInit() {
    this.templateManager.addTemplateRef(RxIfTemplateNames.then, this.thenTemplateRef);
    this.displayInitialView();
  }

  ngAfterViewInit() {
    this.subscription = this.renderAware.rendered$.subscribe();
  }

  ngOnDestroy() {
    this.templateManager.destroy();
    this.subscription.unsubscribe();
  }

  private rxIfObserverNext(value: U) {
    const templateName = value ? RxIfTemplateNames.then : RxIfTemplateNames.else;
    this.templateManager.displayView(templateName);
    this.templateManager.updateViewContext({
      $implicit: value,
      rxIf: value
    });
  }

  private displayInitialView = () => {
    // Display "suspense" template if provided
    if (this.templateManager.hasTemplateRef(RxIfTemplateNames.suspense)) {
      this.templateManager.displayView(RxIfTemplateNames.suspense);
    }
  };

}
