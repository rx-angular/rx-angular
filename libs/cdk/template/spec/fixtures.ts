import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EmbeddedViewRef,
  ErrorHandler,
  Input,
  OnDestroy,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReplaySubject, Subscription } from 'rxjs';
import {
  createTemplateNotifier,
  RxNotificationKind,
} from '../../notifications/src/index';
import { RxStrategyProvider } from '../../render-strategies/src/index';
import {
  createTemplateManager,
  RxBaseTemplateNames,
  RxTemplateManager,
  RxViewContext,
} from '../src/index';

@Component({
  selector: 'rx-angular-error-test',
  template: `{{ value }}`,
})
export class ErrorTestComponent {
  private _value: number;
  @Input()
  set value(value: number) {
    this._value = value;
    if (value % 2 === 0) {
      throw new Error('isEven');
    }
  }
  get value(): number {
    return this._value;
  }
}

const TestTemplateNames = {
  ...RxBaseTemplateNames,
  next: 'nextTpl',
};

@Component({
  template: ``,
})
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class TemplateManagerSpecComponent implements AfterViewInit, OnDestroy {
  @ViewChild('host', { read: ViewContainerRef })
  host: ViewContainerRef;

  @ViewChild('tmpl', { read: TemplateRef })
  templateRef: TemplateRef<RxViewContext<number>>;

  @ViewChild('error', { read: TemplateRef })
  errorTpl: TemplateRef<RxViewContext<number>>;

  @ViewChild('complete', { read: TemplateRef })
  completeTpl: TemplateRef<RxViewContext<number>>;

  @ViewChild('suspense', { read: TemplateRef })
  suspenseTpl: TemplateRef<RxViewContext<number>>;

  templateManager: RxTemplateManager<number, RxViewContext<number>>;

  values$ = new ReplaySubject<number>(1);

  private observablesHandler = createTemplateNotifier<number>();

  latestRenderedValue: any;

  private sub = new Subscription();
  triggerHandler = new ReplaySubject<RxNotificationKind>(1);

  constructor(
    private cdRef: ChangeDetectorRef,
    private strategyProvider: RxStrategyProvider,
    public errorHandler: ErrorHandler
  ) {}

  ngAfterViewInit() {
    this.observablesHandler.next(this.values$);
    this.templateManager = createTemplateManager<any, RxViewContext<number>>({
      renderSettings: {
        cdRef: this.cdRef,
        strategies: this.strategyProvider.strategies as any, // TODO: move strategyProvider
        defaultStrategyName: this.strategyProvider.primaryStrategy,
        parent: false,
        patchZone: false,
        errorHandler: this.errorHandler,
      },
      templateSettings: {
        viewContainerRef: this.host,
        patchZone: false,
        createViewContext,
        updateViewContext,
      },
      notificationToTemplateName: {
        [RxNotificationKind.Suspense]: () =>
          this.suspenseTpl
            ? TestTemplateNames.suspense
            : TestTemplateNames.next,
        [RxNotificationKind.Next]: () => TestTemplateNames.next,
        [RxNotificationKind.Error]: () =>
          this.errorTpl ? TestTemplateNames.error : TestTemplateNames.next,
        [RxNotificationKind.Complete]: () =>
          this.completeTpl
            ? TestTemplateNames.complete
            : TestTemplateNames.next,
      },
      templateTrigger$: this.triggerHandler,
    });
    this.templateManager.addTemplateRef(
      TestTemplateNames.next,
      this.templateRef
    );
    if (this.suspenseTpl) {
      this.templateManager.addTemplateRef(
        TestTemplateNames.suspense,
        this.suspenseTpl
      );
    }
    if (this.errorTpl) {
      this.templateManager.addTemplateRef(
        TestTemplateNames.error,
        this.errorTpl
      );
    }
    if (this.completeTpl) {
      this.templateManager.addTemplateRef(
        TestTemplateNames.complete,
        this.completeTpl
      );
    }
    this.sub.add(
      this.templateManager
        .render(this.observablesHandler.values$)
        .subscribe((n) => {
          this.latestRenderedValue = n;
        })
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}

/** @internal */
function createViewContext<T>(value: T): RxViewContext<T> {
  return {
    $implicit: value,
    error: false,
    complete: false,
    suspense: false,
  };
}
/** @internal */
function updateViewContext<T>(
  value: T,
  view: EmbeddedViewRef<RxViewContext<T>>,
  context: RxViewContext<T>
): void {
  Object.keys(context).forEach((k) => {
    view.context[k] = context[k];
  });
}

export const DEFAULT_TEMPLATE = `
  <ng-template #tmpl let-v>
    <rx-angular-error-test [value]="v"></rx-angular-error-test>
  </ng-template>
  <span #host></span>
`;

export function createTestComponent(
  template: string = DEFAULT_TEMPLATE
): ComponentFixture<TemplateManagerSpecComponent> {
  return TestBed.overrideComponent(TemplateManagerSpecComponent, {
    set: { template: template },
  }).createComponent(TemplateManagerSpecComponent);
}

export function createErrorHandler() {
  return TestBed.inject(ErrorHandler);
}
