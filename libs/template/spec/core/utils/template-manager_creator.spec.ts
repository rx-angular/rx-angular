import { Component, Directive, Input, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { createTemplateManager, TemplateManager } from '../../../src/lib/core/utils/template-manager_creator';
import createSpy = jasmine.createSpy;

export interface TestViewContext {
  $implicit: string;
  value: string;
}

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[container]'
})
class TestContainerDirective {

  manager: TemplateManager<TestViewContext, 'templateRefA' | 'templateRefB'>;

  @Input() private templateA: TemplateRef<TestViewContext>;
  @Input() private templateB: TemplateRef<TestViewContext>;

  constructor(public viewContainerRef: ViewContainerRef) {
    this.manager = createTemplateManager(this.viewContainerRef, {});
    templateManager = this.manager;
    testViewContainerRef = this.viewContainerRef;
  }
}

@Component({
  template: `
    <ng-container container [templateA]="templateRefA" [templateB]="templateRefB">
    </ng-container>

    <ng-template #templateRefA let-value="value">
      [Template:A][Context:{{ value }}]
    </ng-template>

    <ng-template #templateRefB let-value="value">
      [Template:B][Context:{{ value }}]
    </ng-template>
  `
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
let templateManager: TemplateManager<TestViewContext> = null;
const setupTestComponent = (): void => {
  TestBed.configureTestingModule({
    declarations: [TestContainerDirective, TemplateManagerTestComponent],
    providers: [
      TemplateRef,
      ViewContainerRef,
      TestContainerDirective
    ]
  });

  fixtureTestComponent = TestBed.createComponent(
    TemplateManagerTestComponent
  );
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
    expect(function() {
      templateManager.addTemplateRef('wrongValue' as any, 'asdf' as any);
    })
      .toThrow(new Error('wrongValue must be a TemplateRef, but received something else.'));
  });

  it('addTemplateRef should add TemplateRef to template cache', () => {
    expect(templateManager.hasTemplateRef('templateRefA')).toBe(false);
    expect(testViewContainerRef.length).toBe(0);

    templateManager.addTemplateRef('templateRefA', testComponent.templateRefA);
    expect(templateManager.hasTemplateRef('templateRefA')).toBe(true);
    expect(testViewContainerRef.length).toBe(0);
  });

  it('addTemplateRef should throw if an already cached TemplateRef is cached', () => {
    templateManager.addTemplateRef('templateRefA', testComponent.templateRefA);
    expect(function() {
      templateManager.addTemplateRef('templateRefA', testComponent.templateRefA);
    })
      .toThrow(new Error('Updating an already existing Template is not supported at the moment.'));
  });

  it('displayView should create and insert a view out of a registered template', () => {
    templateManager.addTemplateRef('templateRefA', testComponent.templateRefA);
    expect(templateManager.hasTemplateRef('templateRefA')).toBe(true);
    expect(testViewContainerRef.length).toBe(0);

    templateManager.displayView('templateRefA');
    expect(templateManager.hasTemplateRef('templateRefA')).toBe(true);
    expect(testViewContainerRef.length).toBe(1);
  });

  it('displayView should create and insert a view out of a registered template by calling createEmbeddedView', () => {
    templateManager.addTemplateRef('templateRefA', testComponent.templateRefA);
    testViewContainerRef.createEmbeddedView = createSpy('createEmbeddedView');
    testViewContainerRef.insert = createSpy('insert');
    templateManager.displayView('templateRefA');

    expect(testViewContainerRef.createEmbeddedView).toHaveBeenCalledTimes(1);
    expect(testViewContainerRef.insert).toHaveBeenCalledTimes(0);
  });

  it('displayView should throw if an unregistered registered template is used', () => {
    expect(templateManager.hasTemplateRef('templateRefA')).toBe(false);
    expect(testViewContainerRef.length).toBe(0);
    expect(() => templateManager.displayView('templateRefA'))
      .toThrowError(new Error('A non-existing view was tried to insert templateRefA'));
    expect(templateManager.hasTemplateRef('templateRefA')).toBe(false);
    expect(testViewContainerRef.length).toBe(0);
  });

  it('should ensure that the Maintainer understands `ViewContainerRef`', () => {
    const viewContainerRef: any = testViewContainerRef;
    expect(viewContainerRef.length).toBe(0);
    const v1 = viewContainerRef.createEmbeddedView(testComponent.templateRefA, {});
    expect(viewContainerRef.length).toBe(1);
    const v2 = viewContainerRef.createEmbeddedView(testComponent.templateRefB, {});
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

  it('displayView should get the view out of cache and insert when switching to an already created view', () => {
    templateManager.addTemplateRef('templateRefA', testComponent.templateRefA);
    templateManager.addTemplateRef('templateRefB', testComponent.templateRefB);
    templateManager.displayView('templateRefA');
    templateManager.displayView('templateRefB');
    testViewContainerRef.createEmbeddedView = createSpy('createEmbeddedView');
    testViewContainerRef.insert = createSpy('insert');
    templateManager.displayView('templateRefA');

    expect(testViewContainerRef.createEmbeddedView).toHaveBeenCalledTimes(0);
    expect(testViewContainerRef.insert).toHaveBeenCalledTimes(1);
  });

  it('displayView should do nothing if the passed view is already displayed', () => {
    templateManager.addTemplateRef('templateRefA', testComponent.templateRefA);
    templateManager.displayView('templateRefA');
    testViewContainerRef.createEmbeddedView = createSpy('createEmbeddedView');
    testViewContainerRef.insert = createSpy('insert');
    templateManager.displayView('templateRefA');

    expect(testViewContainerRef.createEmbeddedView).toHaveBeenCalledTimes(0);
    expect(testViewContainerRef.insert).toHaveBeenCalledTimes(0);
  });

  it('destroy should clean up all registered templates', () => {
    templateManager.addTemplateRef('templateRefA', testComponent.templateRefA);
    expect(testViewContainerRef.length).toBe(0);

    templateManager.displayView('templateRefA');
    expect(testViewContainerRef.length).toBe(1);

    templateManager.destroy();
    expect(testViewContainerRef.length).toBe(0);
  });

  it('should detach only the last embedded view on `displayView`', () => {
    templateManager.addTemplateRef('templateRefA', testComponent.templateRefA);
    testViewContainerRef.detach = createSpy('detach');
    templateManager.displayView('templateRefA');

    expect(testViewContainerRef.detach).toHaveBeenCalledTimes(1);
    // `ViewContainerRef#detach` with 0 arguments detaches the last view
    expect(testViewContainerRef.detach).toHaveBeenCalledWith();
  });

  it('should update view context based on passed slice of view context object', () => {
    templateManager.addTemplateRef('templateRefA', testComponent.templateRefA);
    templateManager.displayView('templateRefA');
    templateManager.updateViewContext({ value: 'A' });
    fixtureTestComponent.detectChanges();
    expectTextContentToBe('[Template:A][Context:A]');

    templateManager.addTemplateRef('templateRefB', testComponent.templateRefB);
    templateManager.displayView('templateRefB');
    templateManager.updateViewContext({ value: 'B' });
    fixtureTestComponent.detectChanges();
    expectTextContentToBe('[Template:B][Context:B]');
  });
});

function expectTextContentToBe(textContent: string): void {
  expect(fixtureTestComponent.nativeElement.textContent.trim()).toBe(textContent);
}
