import {
  ChangeDetectorRef,
  Directive,
  Input,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
  ViewContainerRef,
  ɵmarkDirty as markDirty,
  ɵdetectChanges as detectChanges
} from '@angular/core';

import {
  defer,
  NextObserver,
  Observable,
  ObservableInput,
  of,
  Subject,
  Subscription,
} from 'rxjs';
import { filter, map, mapTo, switchMap, tap } from 'rxjs/operators';
import {
  createRenderAware,
  createTemplateManager,
  Hooks,
  RenderAware,
  RxNotification,
  RxTemplateObserver,
  StrategyProvider,
  TemplateManager,
  toRxCompleteNotification,
  toRxErrorNotification,
  toRxSuspenseNotification,
} from '../../../cdk';
import {
  RxLetTemplateNames,
  rxLetTemplateNames,
  RxLetViewContext,
} from './model';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[rxLet]',
  providers: [],
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
    private readonly nextTemplateRef: TemplateRef<RxLetViewContext<U>>,
    private readonly viewContainerRef: ViewContainerRef
  ) {
    super();
    this.templateManager = createTemplateManager(
      this.viewContainerRef,
      this.initialViewContext
    );
    this.renderAware = createRenderAware<U>({
      templateObserver: this.templateObserver,
      strategies: this.strategyProvider.strategies,
      defaultStrategyName: this.strategyProvider.primaryStrategy,
      // @NOTICE this is checked every emmit. Templates are IMHO statically assigned, so we could find a way to check only once?
      getCdRef: (notification: RxNotification<U>): ChangeDetectorRef =>
        this.getEmbeddeViewByNotification(notification),
      getContext: (notification: RxNotification<U>): ChangeDetectorRef =>
        this.getEmbeddeViewByNotification(notification),
    });
    this.subscription.add(
      this.templateManager.templateChanged$
        .pipe(
          switchMap((v) => {
            const strategy = this.strategyProvider.strategies[
              this.strategyProvider.primaryStrategy
              ];

            return of(null).pipe(
              strategy.behavior(() => {
                // strategy.work(this.cdRef)
                console.log('this.cdRef.context', (this.cdRef as any).context);
                markDirty((this.cdRef as any).context);
              }, (this.cdRef as any).context)
            );
          })
        )
        .subscribe()
    );
  }

  static ngTemplateGuard_rxLet: 'binding';

  private _renderObserver: NextObserver<any>;

  private subscription: Subscription = new Subscription();

  private readonly templateManager: TemplateManager<RxLetViewContext<U | undefined | null>,
    rxLetTemplateNames>;

  private readonly initialViewContext: RxLetViewContext<U> = {
    $implicit: undefined,
    rxLet: undefined,
    $error: false,
    $complete: false,
    $suspense: false,
  };

  private readonly templateObserver: RxTemplateObserver<U | null | undefined> = {
    suspense: (value?: any) => {
      this.displayInitialView();
      this.templateManager.updateViewContext({
        // if a custom value is provided take it, otherwise assign true
        $suspense: value !== undefined ? value : true,
        $error: false,
        $complete: false,
      });
    },
    next: (value: U | null | undefined) => {
      this.templateManager.displayView(RxLetTemplateNames.next);
      this.templateManager.updateViewContext({
        $implicit: value,
        rxLet: value,
        $suspense: false,
        $error: false,
        $complete: false,
      });
    },
    error: (error: Error) => {
      this.templateManager.displayView(
        RxLetTemplateNames.error,
        RxLetTemplateNames.next
      );
      this.templateManager.updateViewContext({
        $error: error,
        $suspense: false,
      });
    },
    complete: () => {
      this.templateManager.displayView(
        RxLetTemplateNames.complete,
        RxLetTemplateNames.next
      );
      this.templateManager.updateViewContext({
        $complete: true,
        $suspense: false,
      });
    },
  };

  private rendered$ = new Subject<RxNotification<U>>();
  readonly renderAware: RenderAware<U>;

  @Output() readonly rendered = defer(() =>
    this.rendered$.pipe(
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
    this.templateManager.addTemplateRef(
      RxLetTemplateNames.next,
      this.nextTemplateRef
    );
    this.renderAware.subscribe();
    this.subscription = this.renderAware.rendered$
      .pipe(tap(this?._renderObserver))
      .subscribe(this.rendered$);
    this.displayInitialView();

    (window as any).aaa = (this.cdRef as any)._cdRefInjectingView;
    (window as any).detectChanges = detectChanges;
    console.log('rxLet onInit: ', (window as any).aaa);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.templateManager.destroy();
  }

  private getEmbeddeViewByNotification = (
    notification: RxNotification<U>
  ): ChangeDetectorRef => {
    const name = this.templateManager.getTemplateName(
      notification.kind as any,
      RxLetTemplateNames.next
    );
    return this.templateManager.getEmbeddedView(name) as ChangeDetectorRef;
  };

  private displayInitialView = () => {
    // Display "suspense" template if provided
    if (this.templateManager.hasTemplateRef(RxLetTemplateNames.suspense)) {
      this.templateManager.displayView(RxLetTemplateNames.suspense);
    }
  };
}
