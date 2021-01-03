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

import { merge, Observable, ReplaySubject, Subject, Subscription, Unsubscribable } from 'rxjs';
import {
  createTemplateManager,
  getDefaultStrategyCredentialsMap,
  Hooks,
  mergeStrategies,
  RX_CUSTOM_STRATEGIES,
  RX_PRIMARY_STRATEGY, rxMaterialize,
  RxNotification, RxNotificationKind,
  StrategyCredentialsMap,
  TemplateManager,
  toRxCompleteNotification,
  toRxErrorNotification
} from '../../../cdk';
import { RxContextTemplateNames, rxContextTemplateNames, RxContextViewContext } from './model';
import { distinctUntilChanged, filter, map, mergeAll } from 'rxjs/operators';
import { filterErrorsAndWarnings } from '@angular/compiler-cli';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[rxContext]',
  providers: []
})
// tslint:disable-next-line:directive-class-suffix
export class RxContext<U> extends Hooks implements OnInit, OnDestroy {

  observablesFromTemplate$ = new ReplaySubject<Observable<U>>(1);
  valuesFromTemplate$ = this.observablesFromTemplate$.pipe(
    distinctUntilChanged()
  );

  @Input()
  set rxContext(potentialObservable: Observable<U> | null | undefined) {
    this.observablesFromTemplate$.next(potentialObservable);
  }

  @Input('rxContextStrategy')
  set strategy(strategyName: string | Observable<string> | undefined) {

  }

  @Input('rxContextCompleteTpl')
  set rxComplete(templateRef: TemplateRef<RxContextViewContext<U | undefined | null> | null>) {
    this.templateManager.addTemplateRef(RxContextTemplateNames.complete, templateRef);
  }

  @Input('rxContextErrorTpl')
  set rxError(templateRef: TemplateRef<RxContextViewContext<U | undefined | null> | null>) {
    this.templateManager.addTemplateRef(RxContextTemplateNames.error, templateRef);
  }

  @Input('rxContextSuspenseTpl')
  set rxSuspense(templateRef: TemplateRef<RxContextViewContext<U | undefined | null> | null>) {
    this.templateManager.addTemplateRef(RxContextTemplateNames.suspense, templateRef);
  }

  @Input('rxContextCompleteTrg')
  set rxCompleteTrigger(complete$: Observable<any>) {
    this.templateTriggerSubject.next(complete$.pipe(map(toRxCompleteNotification as any)));
  }

  @Input('rxContextErrorTrg')
  set rxErrorTrigger(error$: Observable<any>) {
    this.templateTriggerSubject.next(error$.pipe(map(toRxErrorNotification as any)));
  }

  @Input('rxContextSuspenseTrg')
  set rxSuspenseTrigger(suspense$: Observable<any>) {
    this.templateTriggerSubject.next(suspense$.pipe(map(toRxErrorNotification as any)));
  }

  constructor(
    @Optional()
    @Inject(RX_CUSTOM_STRATEGIES)
    private customStrategies: StrategyCredentialsMap[],
    @Inject(RX_PRIMARY_STRATEGY)
    private defaultStrategyName: string,
    public cdRef: ChangeDetectorRef,
    private readonly nextTemplateRef: TemplateRef<RxContextViewContext<U>>,
    private readonly viewContainerRef: ViewContainerRef
  ) {
    super();
    this.templateManager = createTemplateManager(
      this.viewContainerRef,
      this.initialViewContext
    );
    this.strategies = this.customStrategies.reduce((a, i) => mergeStrategies(a, i), getDefaultStrategyCredentialsMap());
  }

  static ngTemplateGuard_rxContext: 'binding';

  templateTriggerSubject = new Subject<Observable<RxNotification<U>>>();
  templateTrigger$ = this.templateTriggerSubject.pipe(
    mergeAll()
  );

  private readonly strategies: StrategyCredentialsMap;

  private subscription: Unsubscribable = Subscription.EMPTY;

  private readonly templateManager: TemplateManager<RxContextViewContext<U | undefined | null>, rxContextTemplateNames>;

  private readonly initialViewContext: RxContextViewContext<U> = {
    $implicit: undefined,
    $error: false,
    $complete: false,
    $suspense: false
  };

  /** @internal */
  static ngTemplateContextGuard<U>(
    dir: RxContext<U>,
    ctx: unknown | null | undefined
  ): ctx is RxContextViewContext<U> {
    return true;
  }

  ngOnInit() {
    this.templateManager.addTemplateRef(RxContextTemplateNames.content, this.nextTemplateRef);
    this.templateManager.displayView(RxContextTemplateNames.content);
    this.subscription =
      merge(
        this.valuesFromTemplate$.pipe(
          rxMaterialize(),
          filter(notification => notification.kind === RxNotificationKind.next)
        ),
        this.templateTrigger$
      ).subscribe(notification => {
        const name = this.templateManager.getTemplateName(notification.kind as any, RxContextTemplateNames.content);
        this.templateManager.displayView(name);
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.templateManager.destroy();
  }


}
