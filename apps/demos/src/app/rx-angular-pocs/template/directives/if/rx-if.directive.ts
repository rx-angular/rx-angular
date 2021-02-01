import {
  ChangeDetectorRef,
  Directive,
  ElementRef,
  EmbeddedViewRef,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

import { Observable, Subject, Subscription } from 'rxjs';

import {
  getHotMerged,
  RxNotification,
  RxNotificationKind,
  StrategyProvider,
} from '../../../cdk';
import { RxIfTemplateNames, rxIfTemplateNames, RxIfViewContext } from './model';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { createTemplateManager2 } from '../../../cdk/template-management/template-manager';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[rxIf]',
})
export class RxIf<U> implements OnInit, OnDestroy {
  private subscription = new Subscription();
  private templateManager;

  @Input()
  set rxIf(potentialObservable: Observable<U> | U | null | undefined) {
    this.observablesHandler.next(potentialObservable);
  }

  @Input('rxIfStrategy')
  set strategy(strategyName: Observable<string> | string | null | undefined) {
    this.strategyHandler.next(strategyName);
  }

  @Input('rxIfElse')
  set else(templateRef: TemplateRef<any>) {
    if (templateRef) {
      this.templateManager.addTemplateRef(RxIfTemplateNames.else, templateRef);
    }
  }

  // tslint:disable-next-line:no-input-rename
  @Input('rxLetParent') renderParent: boolean;


  @Input('rxLetPatchZone') patchZone: boolean;



  private readonly observablesHandler = getHotMerged<U>();
  private readonly strategyHandler = getHotMerged<string>();
  private readonly rendered$ = new Subject<RxNotification<U>>();

  constructor(
    private strategyProvider: StrategyProvider,
    private cdRef: ChangeDetectorRef,
    private eRef: ElementRef<Comment>,
    private ngZone: NgZone,
    private readonly thenTemplateRef: TemplateRef<any>,
    private readonly viewContainerRef: ViewContainerRef
  ) {
    this.templateManager = createTemplateManager2<
      U,
      RxIfViewContext<U>,
      rxIfTemplateNames
    >({
      templateSettings: {
        viewContainerRef: this.viewContainerRef,
        createViewContext,
        updateViewContext,
        customContext: (rxIf) => ({ rxIf }),
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
        [RxNotificationKind.next]: (value, templates) =>
          value
            ? RxIfTemplateNames.then
            : templates.get(RxIfTemplateNames.else)
            ? RxIfTemplateNames.else
            : undefined,
      },
    });
  }

  ngOnInit() {
    this.templateManager.addTemplateRef(
      RxIfTemplateNames.then,
      this.thenTemplateRef
    );
    this.templateManager.nextStrategy(this.strategyHandler.values$);
    this.subscription.add(
      this.templateManager
        .render(this.observablesHandler.values$)
        .subscribe((n) => this.rendered$.next(n))
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

function createViewContext<T>(value: T): RxIfViewContext<T> {
  return {
    rxIf: value,
    rxElse: false,
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
