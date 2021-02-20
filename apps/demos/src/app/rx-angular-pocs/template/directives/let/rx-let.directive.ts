import { coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  ChangeDetectorRef,
  Directive,
  ElementRef,
  EmbeddedViewRef,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import {
  createTemplateManager,
  hotFlatten,
  RxNotificationKind,
  RxTemplateManager,
  toRxCompleteNotification,
  toRxErrorNotification,
  toRxSuspenseNotification,
  StrategyProvider
} from '@rx-angular/cdk';

import {
  defer,
  NextObserver,
  Observable,
  ObservableInput,
  ReplaySubject,
  Subject,
  Subscription,
} from 'rxjs';
import { map, mapTo, mergeAll } from 'rxjs/operators';
import { Hooks } from '../../../cdk';
import {
  RxLetTemplateNames,
  rxLetTemplateNames,
  RxLetViewContext,
} from './model';

@Directive({
  selector: '[rxLet]',
  providers: [],
})
export class RxLet<U> extends Hooks implements OnInit, OnDestroy {
  static ngTemplateGuard_rxLet: 'binding';

  @Input()
  set rxLet(potentialObservable: ObservableInput<U> | null | undefined) {
    this.observablesHandler.next(potentialObservable);
  }

  @Input('rxLetStrategy')
  set strategy(strategyName: string | Observable<string> | undefined) {
    this.strategyHandler.next(strategyName);
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
    this.triggerHandler.next(
      trigger$.pipe(mapTo(toRxCompleteNotification() as any))
    );
  }

  @Input('rxLetErrorTrg')
  set rxErrorTrigger(error$: Observable<any>) {
    this.triggerHandler.next(error$.pipe(map(toRxErrorNotification as any)));
  }

  @Input('rxLetSuspenseTrg')
  set rxSuspenseTrigger(trigger$: Observable<any>) {
    this.triggerHandler.next(
      trigger$.pipe(map(toRxSuspenseNotification as any))
    );
  }

  @Input('rxLetRenderCallback')
  set renderCallback(callback: NextObserver<U>) {
    this._renderObserver = callback;
  }

  @Input('rxLetParent') renderParent: boolean;

  @Input('rxLetPatchZone') patchZone: boolean;

  constructor(
    private strategyProvider: StrategyProvider,
    public cdRef: ChangeDetectorRef,
    public eRef: ElementRef,
    private ngZone: NgZone,
    private readonly nextTemplateRef: TemplateRef<RxLetViewContext<U>>,
    private readonly viewContainerRef: ViewContainerRef
  ) {
    super();
  }

  /** @internal */
  private observablesHandler = hotFlatten<U>(
    () => new ReplaySubject<U | Observable<U>>(1),
    mergeAll()
  );
  private strategyHandler = hotFlatten<string>(() => new Subject(), mergeAll());
  private triggerHandler = hotFlatten<RxNotificationKind>(
    () => new Subject(),
    mergeAll()
  );

  private _renderObserver: NextObserver<any>;

  private subscription: Subscription = new Subscription();

  private templateManager: RxTemplateManager<
    U,
    RxLetViewContext<U | undefined | null>,
    rxLetTemplateNames
  >;

  private rendered$ = new Subject<void>();

  @Output() readonly rendered = defer(() => this.rendered$.pipe());

  /** @internal */
  static ngTemplateContextGuard<U>(
    dir: RxLet<U>,
    ctx: unknown | null | undefined
  ): ctx is RxLetViewContext<U> {
    return true;
  }

  ngOnInit() {
    this.templateManager = createTemplateManager<
      U,
      RxLetViewContext<U>,
      rxLetTemplateNames
    >({
      templateSettings: {
        viewContainerRef: this.viewContainerRef,
        createViewContext,
        updateViewContext,
        customContext: (rxLet) => ({ rxLet }),
        patchZone: this.patchZone ? this.ngZone : false,
      },
      renderSettings: {
        cdRef: this.cdRef,
        eRef: this.eRef,
        parent: coerceBooleanProperty(this.renderParent),
        patchZone: this.patchZone ? this.ngZone : false,
        defaultStrategyName: this.strategyProvider.primaryStrategy,
        strategies: this.strategyProvider.strategies,
      },
      notificationToTemplateName: {
        [RxNotificationKind.suspense]: () => RxLetTemplateNames.suspense,
        [RxNotificationKind.next]: () => RxLetTemplateNames.next,
        [RxNotificationKind.error]: () => RxLetTemplateNames.error,
        [RxNotificationKind.complete]: () => RxLetTemplateNames.complete,
      },
      templateTrigger$: this.triggerHandler.values$,
    });
    this.templateManager.addTemplateRef(
      RxLetTemplateNames.next,
      this.nextTemplateRef
    );
    this.templateManager.nextStrategy(this.strategyHandler.values$);
    this.subscription.add(
      this.templateManager
        .render(this.observablesHandler.values$)
        .subscribe((n) => {
          this.rendered$.next(n);
          this._renderObserver?.next(n);
        })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

function createViewContext<T>(value: T): RxLetViewContext<T> {
  return {
    rxLet: value,
    $implicit: value,
    $error: false,
    $complete: false,
    $suspense: false,
  };
}

function updateViewContext<T>(
  value: T,
  view: EmbeddedViewRef<RxLetViewContext<T>>,
  context: RxLetViewContext<T>
): void {
  Object.keys(context).forEach((k) => {
    view.context[k] = context[k];
  });
}

