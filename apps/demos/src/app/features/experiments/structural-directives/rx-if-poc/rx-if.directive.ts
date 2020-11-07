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
import {
  createTemplateManager, RxNotification,
  RxNotificationKind,
  RxTemplateObserver,
  RxViewContext,
  TemplateManager
} from '@rx-angular/template';
import { createRenderAware, RenderAware } from '../../../../shared/rx-angular-pocs/cdk/render-aware';
import {
  getDefaultStrategyCredentialsMap,
  mergeStrategies,
  RX_CUSTOM_STRATEGIES,
  RX_PRIMARY_STRATEGY,
  StrategyCredentialsMap
} from '../../../../shared/rx-angular-pocs/render-stragegies';
import { RxBaseTemplateNames } from '../../../../shared/rx-angular-pocs/cdk/model';


type RxIfTemplateNames = 'rxThen' | 'rxElse' | RxBaseTemplateNames;


export interface IfViewContext<T> extends RxViewContext<T> {
  // to enable `as` syntax we have to assign the directives selector (var as v)
  rxIf: T;
  rxElse: boolean;
}


@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[rxIf]'
})
export class RxIfDirective<U> implements OnInit, AfterViewInit, OnDestroy {
  readonly renderAware: RenderAware<U>;
  readonly strategies: StrategyCredentialsMap;

  private readonly initialViewContext: IfViewContext<U> = {
    $implicit: undefined,
    rxIf: undefined,
    rxElse: undefined,
    $rxError: false,
    $rxComplete: false,
    $rxSuspense: false
  };


  private subscription: Unsubscribable = new Subscription();
  private readonly templateManager: TemplateManager<IfViewContext<U | undefined | null>,
    RxIfTemplateNames>;

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
    templateRef: TemplateRef<IfViewContext<U | undefined | null> | null>
  ) {
    this.templateManager.addTemplateRef('rxComplete', templateRef);
  }

  @Input('rxIfRxError')
  set rxError(
    templateRef: TemplateRef<IfViewContext<U | undefined | null> | null>
  ) {
    this.templateManager.addTemplateRef('rxError', templateRef);
  }

  @Input('rxIfRxSuspense')
  set rxSuspense(
    templateRef: TemplateRef<IfViewContext<U | undefined | null> | null>
  ) {
    this.templateManager.addTemplateRef('rxSuspense', templateRef);
  }

  @Input('rxIfElse')
  set else(templateRef: TemplateRef<any>) {
    if (templateRef) {
      this.templateManager.addTemplateRef('rxElse', templateRef);
    }
  }

  private readonly templateObserver: RxTemplateObserver<U | null | undefined> = {
    suspense: () => {
      this.displayInitialView();
      this.templateManager.updateViewContext({
        $implicit: undefined,
        rxIf: undefined,
        $rxError: false,
        $rxComplete: false,
        $rxSuspense: true
      });
    },
    next: (value: U | null | undefined) => {
      this.rxIfObserverNext(value);
    },
    error: (error: Error) => {
      // fallback to rxNext when there's no template for rxError
      this.templateManager.hasTemplateRef('rxError')
        ? this.templateManager.displayView('rxError')
        : this.templateManager.displayView('rxThen');
      this.templateManager.updateViewContext({
        $rxError: error
      });
    },
    complete: () => {
      // fallback to rxNext when there's no template for rxComplete
      this.templateManager.hasTemplateRef('rxComplete')
        ? this.templateManager.displayView('rxComplete')
        : this.templateManager.displayView('rxThen');
      this.templateManager.updateViewContext({
        $rxComplete: true
      });
    }
  };

  private rxIfObserverNext(value: U) {
    const templateName = value ? 'rxThen' : 'rxElse';
    this.templateManager.displayView(templateName);
    this.templateManager.updateViewContext({
      $implicit: value,
      rxIf: value
    });
  }

  constructor(
    @Optional()
    @Inject(RX_CUSTOM_STRATEGIES)
    private customStrategies: StrategyCredentialsMap[],
    @Inject(RX_PRIMARY_STRATEGY)
    private defaultStrategyName: string,
    private cdRef: ChangeDetectorRef,
    private readonly truthyTemplateRef: TemplateRef<any>,
    private readonly viewContainerRef: ViewContainerRef
  ) {
    this.templateManager = createTemplateManager(this.viewContainerRef, this.initialViewContext);
    this.strategies = this.customStrategies.reduce((a, i) => mergeStrategies(a, i), getDefaultStrategyCredentialsMap());
    this.renderAware = createRenderAware<U>({
      templateObserver: this.templateObserver,
      context: (cdRef as any).context,
      strategies: this.strategies,
      defaultStrategyName: this.defaultStrategyName,
      getCdRef: (notification: RxNotification<U>) => {
        let templateName: RxIfTemplateNames | 'rxNext' = notification.kind;
        if(templateName === 'rxNext') {
          templateName = notification.value ? 'rxThen' : 'rxElse';
          return this.templateManager.getEmbeddedView(templateName)
        }
        return this.templateManager.getEmbeddedView(templateName)
      }
    });
  }

  ngOnInit() {
    this.templateManager.addTemplateRef('rxThen', this.truthyTemplateRef);
    this.displayInitialView();
  }
  ngAfterViewInit() {
    this.subscription = this.renderAware.rendered$.subscribe();
  }

  ngOnDestroy() {
    this.templateManager.destroy();
    this.subscription.unsubscribe();
  }

  private displayInitialView = () => {
    // Display "suspense" template if provided
    if (this.templateManager.hasTemplateRef('rxSuspense')) {
      this.templateManager.displayView('rxSuspense');
    }
  };

}
