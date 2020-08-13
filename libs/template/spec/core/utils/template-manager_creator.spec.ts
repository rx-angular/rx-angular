import { createTemplateManager, TemplateManager } from '../../../src/lib/core/utils/template-manager_creator';
import { Component, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import createSpy = jasmine.createSpy;

export interface TestViewContext {
  prop1: string
}

@Component({
  template: `
    <ng-container [ngTemplateOutlet]="templateRefA">
    </ng-container>

    <ng-template #templateRefA>
      Template A
    </ng-template>

    <ng-template #templateRefB>
      Template B
    </ng-template>
  `
})
class TemplateManagerTestComponent {

  manager: TemplateManager<TestViewContext>;
  state1: TestViewContext = { prop1: 'state1' };
  state2: TestViewContext = { prop1: 'state2' };

  @ViewChild('templateRefA')
  templateRefA;

  @ViewChild('templateRefB')
  templateRefB;

  constructor(public viewContainerRef: ViewContainerRef) {
    this.manager = createTemplateManager(this.viewContainerRef, {});
  }

  createA() {
    this.manager.updateViewContext(this.state1);
  }

}

let fixtureTestComponent: ComponentFixture<TemplateManagerTestComponent> = null;
let testComponent: TemplateManagerTestComponent = null;
let templateManager: TemplateManager<TestViewContext> = null;
const setupTestComponent = (): void => {
  TestBed.configureTestingModule({
    declarations: [TemplateManagerTestComponent],
    providers: [
      TemplateRef,
      ViewContainerRef
    ]
  });

  fixtureTestComponent = TestBed.createComponent(
    TemplateManagerTestComponent
  );
  testComponent = fixtureTestComponent.componentInstance;
  templateManager = testComponent.manager;
  fixtureTestComponent.detectChanges();
};


describe('TemplateManager', () => {

  beforeEach(setupTestComponent);

  it('should instantiate TemplateManager object', () => {
    expect(testComponent).toBeDefined();
  });

  it('addTemplateRef should throw if no TemplateRef is passed', () => {
    expect(function() {
      testComponent.manager.addTemplateRef('wrongValue', 'asdf' as any);
    })
      .toThrow(new Error('wrongValue must be a TemplateRef, but received something else.'));
  });

  it('addTemplateRef should add TemplateRef under a key', () => {
    const _m: any = testComponent.manager;
    expect(_m.templateCache.size).toBe(0);
    expect(testComponent.viewContainerRef.length).toBe(0);
    templateManager.addTemplateRef('templateRefA', testComponent.templateRefA);
    expect(_m.templateCache.size).toBe(1);
    expect(testComponent.viewContainerRef.length).toBe(0);
  });

  it('addTemplateRef should throw if no TemplateRef is passed', () => {
    testComponent.manager.addTemplateRef('templateRefA', testComponent.templateRefA);
    expect(function() {
      testComponent.manager.addTemplateRef('templateRefA', testComponent.templateRefA);
    })
      .toThrow(new Error('Updating an already existing Template is not supported at the moment.'));
  });

  it('displayView should create and insert a created view out of a registered template and increment internal Caches', () => {
    const _m: any = templateManager;
    templateManager.addTemplateRef('templateRefA', testComponent.templateRefA);
    expect(_m.templateCache.size).toBe(1);
    expect(_m.viewCache.size).toBe(0);
    expect(testComponent.viewContainerRef.length).toBe(0);
    templateManager.displayView('templateRefA');
    expect(_m.templateCache.size).toBe(1);
    expect(_m.viewCache.size).toBe(1);
    expect(testComponent.viewContainerRef.length).toBe(1);
  });

  it('displayView should create and insert a created view out of a registered template and call createEmbeddedView', () => {
    templateManager.addTemplateRef('templateRefA', testComponent.templateRefA);
    testComponent.viewContainerRef.createEmbeddedView = createSpy('createEmbeddedView');
    testComponent.viewContainerRef.insert = createSpy('insert');
    templateManager.displayView('templateRefA');
    expect(testComponent.viewContainerRef.createEmbeddedView).toHaveBeenCalledTimes(1);
    expect(testComponent.viewContainerRef.insert).toHaveBeenCalledTimes(0);
  });

  it('displayView should throw if an unregistered registered template is used', () => {
    const _m: any = templateManager;
    expect(_m.templateCache.size).toBe(0);
    expect(_m.viewCache.size).toBe(0);
    expect(testComponent.viewContainerRef.length).toBe(0);
    expect(() => templateManager.displayView('templateRefA'))
      .toThrowError(new Error('A non-existing view was tried to insert templateRefA'));
    expect(_m.templateCache.size).toBe(0);
    expect(_m.viewCache.size).toBe(0);
    expect(testComponent.viewContainerRef.length).toBe(0);
  });

  it('Maintainer should understand viewContainerRef', () => {
    const viewContainerRef: any = testComponent.viewContainerRef;
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

  it('displayView should insert when switching to an already created view', () => {
    const _m: any = templateManager;
    templateManager.addTemplateRef('templateRefA', testComponent.templateRefA);
    templateManager.addTemplateRef('templateRefB', testComponent.templateRefA);
    templateManager.displayView('templateRefA');
    templateManager.displayView('templateRefB');
    testComponent.viewContainerRef.createEmbeddedView = createSpy('createEmbeddedView');
    testComponent.viewContainerRef.insert = createSpy('insert');
    templateManager.displayView('templateRefA');
    expect(testComponent.viewContainerRef.createEmbeddedView).toHaveBeenCalledTimes(0);
    expect(testComponent.viewContainerRef.insert).toHaveBeenCalledTimes(1);
  });

  it('displayView should do nothing if the passed view is already displayed', () => {
    templateManager.addTemplateRef('templateRefA', testComponent.templateRefA);
    templateManager.displayView('templateRefA');
    testComponent.viewContainerRef.createEmbeddedView = createSpy('createEmbeddedView');
    testComponent.viewContainerRef.insert = createSpy('insert');
    templateManager.displayView('templateRefA');
    expect(testComponent.viewContainerRef.createEmbeddedView).toHaveBeenCalledTimes(0);
    expect(testComponent.viewContainerRef.insert).toHaveBeenCalledTimes(0);
  });

  it('destroy should clean up all registered templates', () => {
    const _m: any = templateManager;
    templateManager.addTemplateRef('templateRefA', testComponent.templateRefA);
    expect(_m.viewContainerRef.length).toBe(0);
    templateManager.displayView('templateRefA');
    expect(_m.viewContainerRef.length).toBe(1);
    templateManager.destroy();
    expect(_m.viewContainerRef.length).toBe(0);
  });

});
