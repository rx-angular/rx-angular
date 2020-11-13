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

import { defer, NextObserver, Observable, ObservableInput, Subject, Subscription, Unsubscribable } from 'rxjs';
import { filter, map, mapTo, tap } from 'rxjs/operators';
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
} from '../../../../shared/rx-angular-pocs/render-stragegies';
import { StrategyProvider } from '../../../../shared/rx-angular-pocs/render-stragegies/strategy-provider.service';
import { Hooks } from '../../../../shared/debug-helper/hooks';
import { createRenderAware, RenderAware, RxBaseTemplateNames } from '../../../../shared/rx-angular-pocs/cdk';
import {
  toRxCompleteNotification,
  toRxErrorNotification,
  toRxSuspenseNotification
} from '../../../../shared/rx-angular-pocs/utils';

type rxLetTriggeredTemplateNames = RxNotificationKind;

export interface LetTriggerViewContext<T>{
  // to enable `as` syntax we have to assign the directives selector (var as v)
  rxLetTriggered: T;

  $implicit: T;
  // set context var complete to true (var$; let e = $error)
  $errorVal: false | Error;
  // set context var complete to true (var$; let c = $complete)
  $completeVal: boolean;
  // set context var suspense to true (var$; let c = $suspense)
  $suspenseVal: any;
}

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[rxLetTriggered]',
  providers: [StrategyProvider]
})
export class LetDirectiveTriggered<U> extends Hooks implements OnInit, OnDestroy {
  static ngTemplateGuard_rxLetTriggered: 'binding';

  readonly renderAware: RenderAware<U>;
  private readonly strategies: StrategyCredentialsMap;

  private _renderObserver: NextObserver<any>;

  @Input()
  set rxLetTriggered(potentialObservable: ObservableInput<U> | null | undefined) {
    this.renderAware.nextPotentialObservable(potentialObservable);
  }

  @Input('rxLetTriggeredStrategy')
  set strategy(strategyName: string | Observable<string> | undefined) {
    this.renderAware.nextStrategy(strategyName);
  }

  @Input('rxLetTriggeredCompleteTpl')
  set rxComplete(templateRef: TemplateRef<LetTriggerViewContext<U | undefined | null> | null>) {
    this.templateManager.addTemplateRef('rxComplete', templateRef);
  }

  @Input('rxLetTriggeredErrorTpl')
  set rxError(templateRef: TemplateRef<LetTriggerViewContext<U | undefined | null> | null>) {
    this.templateManager.addTemplateRef('rxError', templateRef);
  }

  @Input('rxLetTriggeredSuspenseTpl')
  set rxSuspense(
    templateRef: TemplateRef<LetTriggerViewContext<U | undefined | null> | null>
  ) {
    this.templateManager.addTemplateRef('rxSuspense', templateRef);
  }

  @Input('rxLetTriggeredCompleteTrg')
  set rxCompleteTrigger(trigger$: Observable<any>) {
    this.renderAware.nextTemplateTrigger(trigger$.pipe(mapTo(toRxCompleteNotification() as any)));
  }

  @Input('rxLetTriggeredErrorTrg')
  set rxErrorTrigger(error$: Observable<any>) {
    this.renderAware.nextTemplateTrigger(error$.pipe(map(toRxErrorNotification as any)));
  }

  @Input('rxLetTriggeredSuspenseTrg')
  set rxSuspenseTrigger(trigger$: Observable<any>) {
    console.log('rxSuspense', trigger$);
    this.renderAware.nextTemplateTrigger(trigger$.pipe(map(toRxSuspenseNotification as any)));
  }

  @Input('rxLetTriggeredRenderCallback')
  set renderCallback(callback: NextObserver<U>) {
    this._renderObserver = callback;
  }

  @Output() readonly rendered = defer(() => this.rendered$.pipe(
    filter(({ kind }) => this.templateManager.hasTemplateRef(kind))
    )
  );

  private subscription: Unsubscribable = Subscription.EMPTY;

  private readonly templateManager: TemplateManager<LetTriggerViewContext<U | undefined | null>,
    rxLetTriggeredTemplateNames>;

  private readonly initialViewContext: LetTriggerViewContext<U> = {
    $implicit: undefined,
    rxLetTriggered: undefined,
    $errorVal: false,
    $completeVal: false,
    $suspenseVal: false
  };

  private rendered$ = new Subject<RxNotification<U>>();

  private readonly templateObserver: RxTemplateObserver<U | null | undefined> = {
    suspense: (value?: any) => {
      this.displayInitialView();
      this.templateManager.updateViewContext({
        // if a custom value is provided take it, otherwise assign true
        $suspenseVal: value !== undefined ? value : true,
        $errorVal: false,
        $completeVal: false
      });
    },
    next: (value: U | null | undefined) => {
      this.templateManager.displayView('rxNext');
      this.templateManager.updateViewContext({
        $implicit: value,
        rxLetTriggered: value,
        $suspenseVal: false,
        $errorVal: false,
        $completeVal: false
      });
    },
    error: (error: Error) => {
      this.templateManager.displayView(this.displayWithFallback('rxError'));
      this.templateManager.updateViewContext({
        $errorVal: error,
        $suspenseVal: false
      });
    },
    complete: () => {
      this.templateManager.displayView(this.displayWithFallback('rxComplete'));
      this.templateManager.updateViewContext({ $completeVal: true });
    }
  };

  /** @internal */
  static ngTemplateContextGuard<U>(
    dir: LetDirectiveTriggered<U>,
    ctx: unknown | null | undefined
  ): ctx is LetTriggerViewContext<U> {
    return true;
  }

  constructor(
    @Optional()
    @Inject(RX_CUSTOM_STRATEGIES)
    private customStrategies: StrategyCredentialsMap[],
    @Inject(RX_PRIMARY_STRATEGY)
    private defaultStrategyName: string,
    public cdRef: ChangeDetectorRef,
    private readonly nextTemplateRef: TemplateRef<LetTriggerViewContext<U>>,
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
      context: undefined,
      strategies: this.strategies,
      defaultStrategyName: this.defaultStrategyName,
      // @NOTICE this is checked every emmit. Templates are IMHO statically assigned, so we could find a way to check only once?
      getCdRef: (notification: RxNotification<U>) => this.templateManager.getEmbeddedView(this.displayWithFallback(notification.kind as any))
    });
    this.subscription = this.renderAware.rendered$.pipe(
      tap(this?._renderObserver)
    ).subscribe(this.rendered$);
  }

  ngOnInit() {
    this.templateManager.addTemplateRef('rxNext', this.nextTemplateRef);
    this.displayInitialView();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.templateManager.destroy();
  }

  displayWithFallback(templateName: rxLetTriggeredTemplateNames, fallback: rxLetTriggeredTemplateNames = 'rxNext') {
    return this.templateManager.hasTemplateRef(templateName) ? templateName : fallback;
  }

  private displayInitialView = () => {
    // Display "suspense" template if provided
    if (this.templateManager.hasTemplateRef('rxSuspense')) {
      this.templateManager.displayView('rxSuspense');
    }
  };

}
