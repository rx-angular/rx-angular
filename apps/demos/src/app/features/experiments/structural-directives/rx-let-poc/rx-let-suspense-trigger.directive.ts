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

import {
  defer,
  NextObserver,
  Observable,
  ObservableInput,
  ReplaySubject,
  Subject,
  Subscription,
  Unsubscribable
} from 'rxjs';
import { filter, map, mapTo, mergeAll, publish, switchAll, tap } from 'rxjs/operators';
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

export interface LetTriggerViewContext<T> extends RxViewContext<T> {
  // to enable `as` syntax we have to assign the directives selector (var as v)
  rxLetTriggered: T;
}

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[rxLetTriggered]',
  providers: [StrategyProvider]
})
export class LetDirectiveTriggered<U> extends Hooks implements OnInit, AfterViewInit, OnDestroy {
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

  @Input('rxLetTriggeredRxComplete')
  set rxComplete(templateRef: TemplateRef<LetTriggerViewContext<U | undefined | null> | null>) {
    this.templateManager.addTemplateRef('rxComplete', templateRef);
  }

  @Input('rxLetTriggeredRxError')
  set rxError(templateRef: TemplateRef<LetTriggerViewContext<U | undefined | null> | null>) {
    this.templateManager.addTemplateRef('rxError', templateRef);
  }

  @Input('rxLetTriggeredRxSuspense')
  set rxSuspense(
    templateRef: TemplateRef<LetTriggerViewContext<U | undefined | null> | null>
  ) {
    this.templateManager.addTemplateRef('rxSuspense', templateRef);
  }

  @Input('rxLetTriggeredCompleteTrigger')
  set rxCompleteTrigger(trigger$: Observable<any>) {
    console.log('rxComplete', trigger$);
    this.renderAware.nextTemplateTrigger(trigger$.pipe(mapTo(toRxCompleteNotification() as any)));
  }

  @Input('rxLetTriggeredErrorTrigger')
  set rxErrorTrigger(error$: Observable<any>) {
    console.log('rxError', error$);
    this.renderAware.nextTemplateTrigger(error$.pipe(map(toRxErrorNotification as any)));
  }

  @Input('rxLetTriggeredSuspenseTrigger')
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
    $rxError: false,
    $rxComplete: false,
    $rxSuspense: false
  };

  private rendered$ = new Subject<RxNotification<U>>();

  private readonly templateObserver: RxTemplateObserver<U | null | undefined> = {
    suspense: (value?: any) => {
      this.displayInitialView();
      this.templateManager.updateViewContext({
        // if a custom value is provided take it, otherwise assign true
        $rxSuspense: value !== undefined ? value : true,
        $rxError: false,
        $rxComplete: false
      });
    },
    next: (value: U | null | undefined) => {
      this.templateManager.displayView('rxNext');
      this.templateManager.updateViewContext({
        $implicit: value,
        rxLetTriggered: value,
        $rxSuspense: false,
        $rxError: false,
        $rxComplete: false
      });
    },
    error: (error: Error) => {
      this.templateManager.displayView(this.displayWithFallback('rxError'));
      this.templateManager.updateViewContext({ $rxError: error });
    },
    complete: () => {
      this.templateManager.displayView(this.displayWithFallback('rxComplete'));
      this.templateManager.updateViewContext({ $rxComplete: true });
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
      getCdRef: (notification: RxNotification<U>) => this.templateManager.getEmbeddedView(this.getTemplateName(notification.kind as any))
    });
    this.subscription = this.renderAware.rendered$.pipe(
      tap(this?._renderObserver)
    ).subscribe(this.rendered$);
  }

  ngOnInit() {
    this.templateManager.addTemplateRef('rxNext', this.nextTemplateRef);
    this.displayInitialView();
  }

  ngAfterViewInit() {

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.templateManager.destroy();
  }

  getTemplateName(nK: RxBaseTemplateNames) {
    return nK === 'rxSuspense' ? this.templateManager.hasTemplateRef('rxSuspense') ? 'rxSuspense' : 'rxNext' : nK;
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
