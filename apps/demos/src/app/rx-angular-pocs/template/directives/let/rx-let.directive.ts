import {
  ChangeDetectorRef,
  Directive,
  ElementRef,
  Input, NgIterable,
  NgZone,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';

import {
  defer,
  NextObserver,
  Observable,
  ObservableInput, ReplaySubject,
  Subject,
  Subscription
} from 'rxjs';
import { delay, filter, map, mapTo, tap } from 'rxjs/operators';
import {
  asap,
  createRenderAware,
  getTNode,
  Hooks,
  RenderAware,
  renderProjectionParents,
  RxNotification,
  RxNotificationKind,
  RxTemplateObserver,
  StrategyProvider,
  toRxCompleteNotification,
  toRxErrorNotification,
  toRxSuspenseNotification,
} from '../../../cdk';
import {
  RxLetTemplateNames,
  rxLetTemplateNames,
  RxLetViewContext,
} from './model';
import {
  createTemplateManager2,
  TemplateManager2,
} from '../../../cdk/template-management/template-manager';
import { ngInputFlatten } from '../../../../shared/utils/ngInputFlatten';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[rxLet]',
  providers: [],
})
// tslint:disable-next-line:directive-class-suffix
export class RxLet<U> extends Hooks implements OnInit, OnDestroy {

  @Input()
  set rxLet(potentialObservable: ObservableInput<U> | null | undefined) {
    this.observables$.next(potentialObservable);
  }

  @Input('rxLetStrategy')
  set strategy(strategyName: string | Observable<string> | undefined) {
    this.templateManager.nextStrategy(strategyName);
  }

  @Input('rxLetCompleteTpl')
  set rxComplete(
    templateRef: TemplateRef<RxLetViewContext<U | undefined | null> | null>
  ) {
    this.templateManager.addTemplateRef(
      RxLetTemplateNames.complete,
      templateRef
    );
  }

  @Input('rxLetErrorTpl')
  set rxError(
    templateRef: TemplateRef<RxLetViewContext<U | undefined | null> | null>
  ) {
    this.templateManager.addTemplateRef(RxLetTemplateNames.error, templateRef);
  }

  @Input('rxLetSuspenseTpl')
  set rxSuspense(
    templateRef: TemplateRef<RxLetViewContext<U | undefined | null> | null>
  ) {
    this.templateManager.addTemplateRef(
      RxLetTemplateNames.suspense,
      templateRef
    );
  }

  @Input('rxLetCompleteTrg')
  set rxCompleteTrigger(trigger$: Observable<any>) {
    this.renderAware.nextTemplateTrigger(
      trigger$.pipe(mapTo(toRxCompleteNotification() as any))
    );
  }

  @Input('rxLetErrorTrg')
  set rxErrorTrigger(error$: Observable<any>) {
    this.renderAware.nextTemplateTrigger(
      error$.pipe(map(toRxErrorNotification as any))
    );
  }

  @Input('rxLetSuspenseTrg')
  set rxSuspenseTrigger(trigger$: Observable<any>) {
    console.log('rxSuspense', trigger$);
    this.renderAware.nextTemplateTrigger(
      trigger$.pipe(map(toRxSuspenseNotification as any))
    );
  }

  @Input('rxLetRenderCallback')
  set renderCallback(callback: NextObserver<U>) {
    this._renderObserver = callback;
  }

  constructor(
    private strategyProvider: StrategyProvider,
    public cdRef: ChangeDetectorRef,
    public eRef: ElementRef,
    private ngZone: NgZone,
    private readonly nextTemplateRef: TemplateRef<RxLetViewContext<U>>,
    private readonly viewContainerRef: ViewContainerRef
  ) {
    super();

    this.templateManager = createTemplateManager2<U, RxLetViewContext<U>, rxLetTemplateNames>({
      viewContainerRef: this.viewContainerRef,
      cdRef: this.cdRef,
      eRef: this.eRef,
      ngZone: this.ngZone,
      createViewContext: (value: U) => {
        return {
          $implicit: value,
          rxLet: value,
          $suspense: false,
          $error: false,
          $complete: false,
        };
      },
      renderConfig: { parent: false, patchZone: false },
      defaultStrategyName: this.strategyProvider.primaryStrategy,
      strategies: this.strategyProvider.strategies,
      customContext: (rxLet) => ({ rxLet }),
      notificationToTemplateName: (n: RxNotificationKind): rxLetTemplateNames => n as rxLetTemplateNames,
      templateTrigger$: [] as any
    });
  }

  static ngTemplateGuard_rxLet: 'binding';

  /** @internal */
  private observables$ = new ReplaySubject<
    ObservableInput<U> | U
    >(1);
  /** @internal */
  private readonly values$ = this.observables$.pipe(ngInputFlatten()) as Observable<U>;

  @Input('rxLetParent') renderParent = false;

  private _renderObserver: NextObserver<any>;

  private subscription: Subscription = new Subscription();

  private readonly templateManager: TemplateManager2<
    U,
    RxLetViewContext<U | undefined | null>,
    rxLetTemplateNames
  >;

  private rendered$ = new Subject<RxNotification<U>>();
  readonly renderAware: RenderAware<U>;

  @Output() readonly rendered = defer(() =>
    this.rendered$.pipe(

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
    this.subscription
      .add(
        this.templateManager.render(this.values$).subscribe(n => this.rendered$.next(n))
      );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
