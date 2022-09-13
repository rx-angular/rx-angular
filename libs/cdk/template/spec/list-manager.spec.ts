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
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RX_RENDER_STRATEGIES_CONFIG } from '@rx-angular/cdk/render-strategies';
import {
  createListTemplateManager,
  RxDefaultListViewContext,
  RxListManager,
  RxListViewComputedContext,
  RxListViewContext,
} from '@rx-angular/cdk/template';
import { RxStrategyProvider } from '@rx-angular/cdk/render-strategies';
import { mockConsole } from '@test-helpers';
import { ReplaySubject } from 'rxjs';

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

@Component({
  template: `
    <ng-template #tmpl let-v>
      <rx-angular-error-test [value]="v"></rx-angular-error-test>
    </ng-template>
    <span #host></span>
  `,
})
class ListTemplateManagerSpecComponent implements AfterViewInit {
  @ViewChild('tmpl', { read: TemplateRef })
  templateRef: TemplateRef<RxDefaultListViewContext<number>>;

  @ViewChild('host', { read: ViewContainerRef })
  host: ViewContainerRef;

  listManager: RxListManager<number>;

  values$ = new ReplaySubject<number[]>(1);

  latestRenderedValue: any;

  constructor(
    private iterableDiffers: IterableDiffers,
    private cdRef: ChangeDetectorRef,
    private eRef: ElementRef,
    private vcRef: ViewContainerRef,
    private strategyProvider: RxStrategyProvider,
    public errorHandler: ErrorHandler
  ) {}

  ngAfterViewInit() {
    this.listManager = createListTemplateManager<
      any,
      RxDefaultListViewContext<number>
    >({
      iterableDiffers: this.iterableDiffers,
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
        templateRef: this.templateRef,
        createViewContext,
        updateViewContext,
      },
      trackBy: (idx, item) => item,
    });
    this.listManager.render(this.values$).subscribe((v: any) => {
      this.latestRenderedValue = v;
    });
  }
}

/** @internal */
const createViewContext = (
  item: any,
  computedContext: RxListViewComputedContext
): RxDefaultListViewContext<number> => {
  return new RxDefaultListViewContext<number>(item, computedContext);
};

/** @internal */
const updateViewContext = (
  item: number,
  view: EmbeddedViewRef<RxListViewContext<number>>,
  computedContext: RxListViewComputedContext
): void => {
  view.context.updateContext(computedContext);
  view.context.$implicit = item;
};

const customErrorHandler: ErrorHandler = {
  handleError: jest.fn(),
};

let fixtureComponent: any;
let componentInstance: {
  listManager: RxListManager<any>;
  errorHandler: ErrorHandler;
  templateRef: TemplateRef<any>;
  values$: ReplaySubject<any[]>;
  latestRenderedValue: any;
};
let componentNativeElement: any;
const setupListManagerComponent = (): void => {
  TestBed.configureTestingModule({
    declarations: [ListTemplateManagerSpecComponent, ErrorTestComponent],
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

  fixtureComponent = TestBed.createComponent(ListTemplateManagerSpecComponent);
  componentInstance = fixtureComponent.componentInstance;
  componentNativeElement = fixtureComponent.nativeElement;
};

describe('list-manager', () => {
  beforeAll(() => mockConsole());

  beforeEach(() => setupListManagerComponent());

  it('should be created', () => {
    expect(fixtureComponent).toBeTruthy();
  });

  it('should have customErrorHandler', () => {
    expect(componentInstance.errorHandler).toEqual(customErrorHandler);
  });

  it('should have listManager', () => {
    fixtureComponent.detectChanges();
    expect(componentInstance.listManager).toBeTruthy();
  });

  it('should have templateRef', () => {
    fixtureComponent.detectChanges();
    expect(componentInstance.templateRef).toBeTruthy();
  });

  it('should render items', () => {
    fixtureComponent.detectChanges();
    componentInstance.values$.next([1]);
    fixtureComponent.detectChanges();
    const componentContent = componentNativeElement.textContent;
    expect(componentContent).toEqual('1');
  });

  describe('exception handling', () => {
    it('should capture errors with errorHandler', () => {
      fixtureComponent.detectChanges();
      componentInstance.values$.next([2]);
      try {
        fixtureComponent.detectChanges();
      } catch (e) {}
      expect(customErrorHandler.handleError).toHaveBeenCalled();
    });

    it('should emit items on error via renderCallback', () => {
      fixtureComponent.detectChanges();
      const items = [2];
      componentInstance.values$.next(items);
      try {
        fixtureComponent.detectChanges();
      } catch (e) {
        expect(componentInstance.latestRenderedValue).toEqual(items);
      }
      expect(customErrorHandler.handleError).toHaveBeenCalled();
    });

    it('should work after an error has been thrown', () => {
      fixtureComponent.detectChanges();
      componentInstance.values$.next([2]);
      try {
        fixtureComponent.detectChanges();
      } catch (e) {}
      componentInstance.values$.next([1, 3]);
      fixtureComponent.detectChanges();
      expect(customErrorHandler.handleError).toHaveBeenCalled();
      const componentContent = componentNativeElement.textContent;
      expect(componentContent).toEqual('13');
    });
  });
});
