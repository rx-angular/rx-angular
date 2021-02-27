import {
  ChangeDetectorRef,
  Component,
  Directive,
  ElementRef,
  EmbeddedViewRef,
  Input,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  createTemplateManager,
  RxBaseTemplateNames,
  RxNotificationKind,
  RxStrategyProvider,
  RxTemplateManager,
} from '@rx-angular/cdk';
// tslint:disable-next-line:nx-enforce-module-boundaries
import { RxLetViewContext } from 'libs/template/src/lib/let/let.directive';

export interface TestViewContext {
  $implicit: string;
  value: string;
}
const RxLetTemplateNames = {
  ...RxBaseTemplateNames,
  next: 'nextTpl',
} as const;

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[rxContainer]',
})
class TestContainerDirective {
  templateManager: RxTemplateManager<any, any, any>;
  @Input() private templateA: TemplateRef<TestViewContext>;
  @Input() private templateB: TemplateRef<TestViewContext>;

  constructor(
    public viewContainerRef: ViewContainerRef,
    private cdRef: ChangeDetectorRef,
    public eRef: ElementRef,
    public strategyProvider: RxStrategyProvider
  ) {
    this._createTemplateManager();
    testViewContainerRef = this.viewContainerRef;
  }
  private _createTemplateManager(): void {
    this.templateManager = createTemplateManager<any, any, any>({
      templateSettings: {
        viewContainerRef: this.viewContainerRef,
        createViewContext,
        updateViewContext,
        customContext: (rxLet) => ({ rxLet }),
        patchZone: false,
      },
      renderSettings: {
        cdRef: this.cdRef,
        eRef: this.eRef,
        parent: false,
        patchZone: false,
        defaultStrategyName: this.strategyProvider.primaryStrategy,
        strategies: this.strategyProvider.strategies,
      },
      notificationToTemplateName: {
        [RxNotificationKind.suspense]: () =>
          this.templateA
            ? RxLetTemplateNames.suspense
            : RxLetTemplateNames.next,
        [RxNotificationKind.next]: () => RxLetTemplateNames.next,
        [RxNotificationKind.error]: () =>
          this.templateA ? RxLetTemplateNames.error : RxLetTemplateNames.next,
        [RxNotificationKind.complete]: () =>
          this.templateA
            ? RxLetTemplateNames.complete
            : RxLetTemplateNames.next,
      },
    });

    templateManager = this.templateManager;
  }
}
/** @internal */
function createViewContext<T>(value: T): RxLetViewContext<T> {
  return {
    rxLet: value,
    $implicit: value,
    $error: false,
    $complete: false,
    $suspense: false,
  };
}
/** @internal */
function updateViewContext<T>(
  value: T,
  view: EmbeddedViewRef<RxLetViewContext<T>>,
  context: RxLetViewContext<T>
): void {
  Object.keys(context).forEach((k) => {
    view.context[k] = context[k];
  });
}

@Component({
  template: `
    <ng-container
      container
      [templateA]="templateRefA"
      [templateB]="templateRefB"
    >
    </ng-container>

    <ng-template #templateRefA let-value="value">
      [Template:A][Context:{{ value }}]
    </ng-template>

    <ng-template #templateRefB let-value="value">
      [Template:B][Context:{{ value }}]
    </ng-template>
  `,
})
class TemplateManagerTestComponent {
  @ViewChild('templateRefA')
  templateRefA: TemplateRef<TestViewContext>;

  @ViewChild('templateRefB')
  templateRefB: TemplateRef<TestViewContext>;
}

let fixtureTestComponent: ComponentFixture<TemplateManagerTestComponent> = null;
let testComponent: TemplateManagerTestComponent = null;
let testComponentNativeElement: HTMLElement;
let testViewContainerRef: ViewContainerRef;
let templateManager: RxTemplateManager<any, any, any> = null;
const setupTestComponent = (): void => {
  TestBed.configureTestingModule({
    declarations: [TestContainerDirective, TemplateManagerTestComponent],
    providers: [TemplateRef, ViewContainerRef, TestContainerDirective],
  });

  fixtureTestComponent = TestBed.createComponent(TemplateManagerTestComponent);
  testComponent = fixtureTestComponent.componentInstance;
  testComponentNativeElement = fixtureTestComponent.nativeElement;
  fixtureTestComponent.detectChanges();
};

describe('TemplateManager', () => {
  beforeEach(setupTestComponent);

  it('should instantiate TemplateManager object', () => {
    expect(testComponent).toBeDefined();
  });

  it('addTemplateRef should throw if no TemplateRef is passed', () => {
    expect(function () {
      templateManager.addTemplateRef('wrongValue' as any, 'asdf' as any);
    }).toThrow(
      new Error(
        'wrongValue must be a TemplateRef, but received something else.'
      )
    );
  });

  it('addTemplateRef should throw if an already cached TemplateRef is cached', () => {
    templateManager.addTemplateRef('templateRefA', testComponent.templateRefA);
    expect(function () {
      templateManager.addTemplateRef(
        'templateRefA',
        testComponent.templateRefA
      );
    }).toThrow(
      new Error(
        'Updating an already existing Template is not supported at the moment.'
      )
    );
  });

  it('should ensure that the Maintainer understands `ViewContainerRef`', () => {
    const viewContainerRef: any = testViewContainerRef;
    expect(viewContainerRef.length).toBe(0);
    const v1 = viewContainerRef.createEmbeddedView(
      testComponent.templateRefA,
      {}
    );
    expect(viewContainerRef.length).toBe(1);
    const v2 = viewContainerRef.createEmbeddedView(
      testComponent.templateRefB,
      {}
    );
    expect(viewContainerRef.length).toBe(2);
    expect(v1 !== v2).toBeTruthy();
    viewContainerRef.insert(v1);
    expect(viewContainerRef.length).toBe(3);
    viewContainerRef.insert(v2, 0);
    expect(viewContainerRef.length).toBe(4);
    viewContainerRef.detach();
    expect(viewContainerRef.length).toBe(3);
    viewContainerRef.detach(0);
    expect(viewContainerRef.length).toBe(2);
  });
});
