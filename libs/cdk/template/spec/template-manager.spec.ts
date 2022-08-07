import 'jest-preset-angular/setup-jest'; // TODO: move this into test-setup when zone-config.spec is in its own lib
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EmbeddedViewRef,
  ErrorHandler,
  Input,
  IterableDiffers,
  OnDestroy,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  createTemplateManager,
  RxBaseTemplateNames,
  RxTemplateManager,
  RxViewContext,
} from '@rx-angular/cdk/template';
import {
  RxStrategyProvider,
  RX_RENDER_STRATEGIES_CONFIG,
} from '@rx-angular/cdk/render-strategies';
import {
  RxNotificationKind,
  createTemplateNotifier,
} from '@rx-angular/cdk/notifications';
import { mockConsole } from '@test-helpers';
import { ReplaySubject, Subscription } from 'rxjs';

@Component({
  selector: 'rx-angular-error-test',
  template: `{{ value }}`,
})
class ErrorTestComponent {
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
  template: `
    <ng-template #tmpl let-v>
      <rx-angular-error-test [value]="v"></rx-angular-error-test>
    </ng-template>
    <span #host></span>
  `,
})
class TemplateManagerSpecComponent implements AfterViewInit, OnDestroy {
  @ViewChild('tmpl', { read: TemplateRef })
  templateRef: TemplateRef<RxViewContext<number>>;

  @ViewChild('host', { read: ViewContainerRef })
  host: ViewContainerRef;

  templateManager: RxTemplateManager<number, RxViewContext<number>>;

  values$ = new ReplaySubject<number>(1);

  private observablesHandler = createTemplateNotifier<number>(() => false);

  latestRenderedValue: any;

  private sub = new Subscription();

  constructor(
    private iterableDiffers: IterableDiffers,
    private cdRef: ChangeDetectorRef,
    private eRef: ElementRef,
    private vcRef: ViewContainerRef,
    private strategyProvider: RxStrategyProvider,
    public errorHandler: ErrorHandler
  ) {
    this.observablesHandler.next(this.values$);
  }

  ngAfterViewInit() {
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
        [RxNotificationKind.Suspense]: () => TestTemplateNames.next,
        [RxNotificationKind.Next]: () => TestTemplateNames.next,
        [RxNotificationKind.Error]: () => TestTemplateNames.next,
        [RxNotificationKind.Complete]: () => TestTemplateNames.next,
      },
    });
    this.templateManager.addTemplateRef(
      TestTemplateNames.next,
      this.templateRef
    );
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
    $error: false,
    $complete: false,
    $suspense: false,
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

const customErrorHandler: ErrorHandler = {
  handleError: jest.fn(),
};

let fixtureComponent: any;
let componentInstance: {
  templateManager: RxTemplateManager<number, any>;
  errorHandler: ErrorHandler;
  templateRef: TemplateRef<any>;
  values$: ReplaySubject<number>;
  latestRenderedValue: any;
};
let componentNativeElement: any;
const setupTemplateManagerComponent = (): void => {
  TestBed.configureTestingModule({
    declarations: [TemplateManagerSpecComponent, ErrorTestComponent],
    providers: [
      { provide: ErrorHandler, useValue: customErrorHandler },
      ViewContainerRef,
      {
        provide: RX_RENDER_STRATEGIES_CONFIG,
        useValue: {
          primaryStrategy: 'native',
        },
      },
    ],
    teardown: { destroyAfterEach: true },
  });

  fixtureComponent = TestBed.createComponent(TemplateManagerSpecComponent);
  componentInstance = fixtureComponent.componentInstance;
  componentNativeElement = fixtureComponent.nativeElement;
};

describe('template-manager', () => {
  beforeAll(() => mockConsole());

  beforeEach(() => setupTemplateManagerComponent());

  it('should be created', () => {
    expect(fixtureComponent).toBeTruthy();
  });

  it('should have customErrorHandler', () => {
    expect(componentInstance.errorHandler).toEqual(customErrorHandler);
  });

  it('should have templateManager', () => {
    fixtureComponent.detectChanges();
    expect(componentInstance.templateManager).toBeTruthy();
  });

  it('should have templateRef', () => {
    fixtureComponent.detectChanges();
    expect(componentInstance.templateRef).toBeTruthy();
  });

  it('should render items', () => {
    fixtureComponent.detectChanges();
    componentInstance.values$.next(1);
    fixtureComponent.detectChanges();
    const componentContent = componentNativeElement.textContent;
    expect(componentContent).toEqual('1');
  });

  describe('exception handling', () => {
    it('should capture errors with errorHandler', () => {
      fixtureComponent.detectChanges();
      componentInstance.values$.next(2);
      try {
        fixtureComponent.detectChanges();
      } catch (e) {}
      expect(customErrorHandler.handleError).toHaveBeenCalled();
    });

    it('should emit error and payload via renderCallback', () => {
      fixtureComponent.detectChanges();
      const items = 2;
      componentInstance.values$.next(items);
      try {
        fixtureComponent.detectChanges();
      } catch (e) {
        expect(componentInstance.latestRenderedValue[0]).toEqual(e);
      }
      expect(customErrorHandler.handleError).toHaveBeenCalled();
    });

    it('should work after an error has been thrown', () => {
      fixtureComponent.detectChanges();
      componentInstance.values$.next(2);
      try {
        fixtureComponent.detectChanges();
      } catch (e) {}
      expect(customErrorHandler.handleError).toHaveBeenCalled();
      componentInstance.values$.next(1);
      fixtureComponent.detectChanges();
      const componentContent = componentNativeElement.textContent;
      expect(componentContent).toEqual('1');
    });
  });
});
