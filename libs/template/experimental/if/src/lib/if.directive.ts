import {
  ChangeDetectorRef,
  Directive,
  EmbeddedViewRef,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  SimpleChanges,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import {
  NextObserver,
  Observable,
  ReplaySubject,
  Subject,
  Subscription,
} from 'rxjs';
import { mergeAll } from 'rxjs/operators';
import {
  RxIfTemplateNames,
  rxIfTemplateNames,
  RxIfViewContext,
} from './model/index';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  createTemplateManager,
  RxTemplateManager,
} from '@rx-angular/cdk/template';
import { RxStrategyProvider } from '@rx-angular/cdk/render-strategies';
import { coerceAllFactory } from '@rx-angular/cdk/coercing';
import {
  createTemplateNotifier,
  RxNotificationKind,
} from '@rx-angular/cdk/notifications';
import { coerceObservable } from '@rx-angular/cdk/coercing';

@Directive({
  selector: '[rxIf]',
})
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export class RxIf<U> implements OnInit, OnDestroy {
  private subscription = new Subscription();
  private _renderObserver: NextObserver<any>;
  private templateManager: RxTemplateManager<
    U,
    RxIfViewContext<U>,
    rxIfTemplateNames
  >;

  @Input()
  set rxIf(potentialObservable: Observable<U> | U | null | undefined) {
    this.observablesHandler.next(coerceObservable(potentialObservable));
  }

  /* eslint-disable @angular-eslint/no-input-rename */
  @Input('rxIfStrategy')
  set strategy(strategyName: Observable<string> | string | null | undefined) {
    this.strategyHandler.next(strategyName);
  }

  @Input('rxIfElse') else: TemplateRef<any>;

  @Input('rxIfSuspenseTpl') suspenseTmpl: TemplateRef<any>;
  @Input('rxIfCompleteTpl') completeTmpl: TemplateRef<any>;
  @Input('rxIfErrorTpl') errorTmpl: TemplateRef<any>;

  @Input('rxIfParent') renderParent = this.strategyProvider.config.parent;

  @Input('rxIfPatchZone') patchZone = this.strategyProvider.config.patchZone;

  @Input('rxIfRenderCallback')
  set renderCallback(callback: NextObserver<U>) {
    this._renderObserver = callback;
  }

  /** @internal */
  private observablesHandler = createTemplateNotifier<U>(
    () => !!this.suspenseTmpl
  );
  private readonly strategyHandler = coerceAllFactory<string>(
    () => new ReplaySubject<string | Observable<string>>(1),
    mergeAll()
  );
  private readonly rendered$ = new Subject<void>();

  constructor(
    private strategyProvider: RxStrategyProvider,
    private cdRef: ChangeDetectorRef,
    private ngZone: NgZone,
    private readonly thenTemplateRef: TemplateRef<any>,
    private readonly viewContainerRef: ViewContainerRef
  ) {}

  ngOnInit() {
    this.subscription.add(
      this.templateManager
        .render(this.observablesHandler.values$)
        .subscribe((n) => {
          this.rendered$.next(n);
          this._renderObserver?.next(n);
        })
    );
  }

  /** @internal */
  ngOnChanges(changes: SimpleChanges): void {
    if (!this.templateManager) {
      this._createTemplateManager();
    }

    if (changes.else) {
      this.templateManager.addTemplateRef(RxIfTemplateNames.else, this.else);
    }

    if (changes.completeTmpl) {
      this.templateManager.addTemplateRef(
        RxIfTemplateNames.complete,
        this.completeTmpl
      );
    }

    if (changes.suspenseTmpl) {
      this.templateManager.addTemplateRef(
        RxIfTemplateNames.suspense,
        this.suspenseTmpl
      );
    }

    if (changes.errorTmpl) {
      this.templateManager.addTemplateRef(
        RxIfTemplateNames.error,
        this.errorTmpl
      );
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private _createTemplateManager(): void {
    this.templateManager = createTemplateManager<
      U,
      RxIfViewContext<U>,
      rxIfTemplateNames
    >({
      templateSettings: {
        viewContainerRef: this.viewContainerRef,
        createViewContext,
        updateViewContext,
        customContext: (rxIf) => ({ rxIf }),
        patchZone: this.patchZone ? this.ngZone : false,
      },
      renderSettings: {
        cdRef: this.cdRef,
        parent: coerceBooleanProperty(this.renderParent),
        patchZone: this.patchZone ? this.ngZone : false,
        defaultStrategyName: this.strategyProvider.primaryStrategy,
        strategies: this.strategyProvider.strategies,
      },
      notificationToTemplateName: {
        [RxNotificationKind.Suspense]: () => RxIfTemplateNames.suspense,
        [RxNotificationKind.Next]: (value, templates) => {
          return value
            ? (RxIfTemplateNames.then as rxIfTemplateNames)
            : templates.get(RxIfTemplateNames.else)
            ? RxIfTemplateNames.else
            : undefined;
        },
        [RxNotificationKind.Error]: () => RxIfTemplateNames.error,
        [RxNotificationKind.Complete]: () => RxIfTemplateNames.complete,
      },
    });
    this.templateManager.addTemplateRef(
      RxIfTemplateNames.then,
      this.thenTemplateRef
    );
    this.templateManager.nextStrategy(this.strategyHandler.values$);
  }
}

function createViewContext<T>(value: T): RxIfViewContext<T> {
  return {
    rxIf: value,
    $implicit: value,
    $error: false,
    $complete: false,
    $suspense: false,
  };
}

function updateViewContext<T>(
  value: T,
  view: EmbeddedViewRef<RxIfViewContext<T>>,
  context: RxIfViewContext<T>
): void {
  Object.keys(context).forEach((k) => {
    view.context[k] = context[k];
  });
}
