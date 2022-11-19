import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RX_RENDER_STRATEGIES_CONFIG } from '@rx-angular/cdk/render-strategies';
import { RxStyle } from '../style.directive';
import { RxStyleModule } from '../style.module';

describe('RxStyle', () => {
  let fixture: ComponentFixture<TestComponent>;

  const supportsCssVariables =
    typeof getComputedStyle !== 'undefined' &&
    typeof CSS !== 'undefined' &&
    typeof CSS.supports !== 'undefined' &&
    CSS.supports('color', 'var(--fake-var)');

  function getComponent(): TestComponent {
    return fixture.componentInstance;
  }

  function getElement(): DebugElement {
    return fixture.debugElement.children[0];
  }

  function expectNativeEl(fixture: ComponentFixture<any>): any {
    return expect(fixture.debugElement.children[0].nativeElement);
  }

  afterEach(() => {
    fixture = null!;
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [RxStyleModule],
      providers: [
        {
          provide: RX_RENDER_STRATEGIES_CONFIG,
          useValue: {
            primaryStrategy: 'native',
          },
        },
      ],
    });
  });

  it(
    'should add styles specified in an object literal',
    waitForAsync(() => {
      const template = `<div [rxStyle]="{'max-width': '40px'}"></div>`;
      fixture = createTestComponent(template);
      fixture.detectChanges();
      expect(getElement().styles).toEqual({
        'max-width': '40px',
      });
    })
  );

  it(
    'should add and change styles specified in an object expression',
    waitForAsync(() => {
      const template = `<div [rxStyle]="expr"></div>`;
      fixture = createTestComponent(template);

      getComponent().expr = { 'max-width': '40px' };
      fixture.detectChanges();
      expect(getElement().styles).toEqual({ 'max-width': '40px' });

      const expr = getComponent().expr;
      expr['max-width'] = '30%';
      fixture.detectChanges();
      expect(getElement().styles).toEqual({ 'max-width': '30%' });
    })
  );

  it(
    'should remove styles with a null expression',
    waitForAsync(() => {
      const template = `<div [rxStyle]="expr"></div>`;
      fixture = createTestComponent(template);

      getComponent().expr = { 'max-width': '40px' };
      fixture.detectChanges();
      expect(getElement().styles).toEqual({ 'max-width': '40px' });

      getComponent().expr = null;
      fixture.detectChanges();
      expect(getElement().styles).not.toContain('max-width');
    })
  );

  it(
    'should remove styles with an undefined expression',
    waitForAsync(() => {
      const template = `<div [rxStyle]="expr"></div>`;
      fixture = createTestComponent(template);

      getComponent().expr = { 'max-width': '40px' };
      fixture.detectChanges();
      expect(getElement().styles).toEqual({ 'max-width': '40px' });

      getComponent().expr = undefined;
      fixture.detectChanges();
      expect(getElement().styles).not.toContain('max-width');
    })
  );

  it(
    'should add and remove styles specified using style.unit notation',
    waitForAsync(() => {
      const template = `<div [rxStyle]="{'max-width.px': expr}"></div>`;

      fixture = createTestComponent(template);

      getComponent().expr = '40';
      fixture.detectChanges();
      expect(getElement().styles).toEqual({ 'max-width': '40px' });

      getComponent().expr = null;
      fixture.detectChanges();
      expect(getElement().styles).not.toContain('max-width');
    })
  );

  // https://github.com/angular/angular/issues/21064
  it(
    'should add and remove styles which names are not dash-cased',
    waitForAsync(() => {
      fixture = createTestComponent(`<div [rxStyle]="{'color': expr}"></div>`);

      getComponent().expr = 'green';
      fixture.detectChanges();
      expect(getElement().styles).toEqual({ color: 'green' });

      getComponent().expr = null;
      fixture.detectChanges();
      expect(getElement().styles).not.toContain('color');
    })
  );

  it(
    'should update styles using style.unit notation when unit changes',
    waitForAsync(() => {
      const template = `<div [rxStyle]="expr"></div>`;

      fixture = createTestComponent(template);

      getComponent().expr = { 'max-width.px': '40' };
      fixture.detectChanges();
      expect(getElement().styles).toEqual({ 'max-width': '40px' });

      getComponent().expr = { 'max-width.em': '40' };
      fixture.detectChanges();
      expect(getElement().styles).toEqual({ 'max-width': '40em' });
    })
  );

  // keyValueDiffer is sensitive to key order #9115
  it(
    'should change styles specified in an object expression',
    waitForAsync(() => {
      const template = `<div [rxStyle]="expr"></div>`;

      fixture = createTestComponent(template);

      getComponent().expr = {
        // height, width order is important here
        height: '10px',
        width: '10px',
      };

      fixture.detectChanges();
      expect(getElement().styles).toEqual({ height: '10px', width: '10px' });

      getComponent().expr = {
        // width, height order is important here
        width: '5px',
        height: '5px',
      };

      fixture.detectChanges();
      expect(getElement().styles).toEqual({ height: '5px', width: '5px' });
    })
  );

  it(
    'should remove styles when deleting a key in an object expression',
    waitForAsync(() => {
      const template = `<div [rxStyle]="expr"></div>`;

      fixture = createTestComponent(template);

      getComponent().expr = { 'max-width': '40px' };
      fixture.detectChanges();
      expect(getElement().styles).toEqual({ 'max-width': '40px' });

      delete getComponent().expr['max-width'];
      fixture.detectChanges();
      expect(getElement().styles).not.toContain('max-width');
    })
  );

  it(
    'should co-operate with the style attribute',
    waitForAsync(() => {
      const template = `<div style="font-size: 12px" [rxStyle]="expr"></div>`;

      fixture = createTestComponent(template);

      getComponent().expr = { 'max-width': '40px' };
      fixture.detectChanges();
      expect((getElement().nativeElement as HTMLElement).style.fontSize).toBe(
        '12px'
      );
      expect((getElement().nativeElement as HTMLElement).style.maxWidth).toBe(
        '40px'
      );
      delete getComponent().expr['max-width'];
      fixture.detectChanges();
      expect(getElement().styles).not.toContain('max-width');
      expect((getElement().nativeElement as HTMLElement).style.fontSize).toBe(
        '12px'
      );
    })
  );

  it(
    'should co-operate with the style.[styleName]="expr" special-case in the compiler',
    waitForAsync(() => {
      const template = `<div [style.font-size.px]="12" [rxStyle]="expr"></div>`;

      fixture = createTestComponent(template);

      getComponent().expr = { 'max-width': '40px' };
      fixture.detectChanges();
      expect(getElement().styles).toEqual({
        'max-width': '40px',
        'font-size': '12px',
      });

      delete getComponent().expr['max-width'];
      fixture.detectChanges();
      expect(getElement().styles).not.toContain('max-width');
      expect(getElement().styles).toEqual({
        'font-size': '12px',
        'max-width': null,
      });
    })
  );

  it('should not write to the native node unless the bound expression has changed', () => {
    const template = `<div [rxStyle]="{'color': expr}"></div>`;

    fixture = createTestComponent(template);
    fixture.componentInstance.expr = 'red';

    fixture.detectChanges();
    expect(getElement().styles).toEqual({ color: 'red' });

    // Overwrite native styles so that we can check if rxStyle has performed DOM manupulation to
    // update it.
    fixture.debugElement.children[0].nativeElement.style.color = 'blue';
    fixture.detectChanges();
    // Assert that the style hasn't been updated
    expect(getElement().styles).toEqual({ color: 'red' });
    expect((getElement().nativeElement as HTMLElement).style.color).toBe(
      'blue'
    );

    fixture.componentInstance.expr = 'yellow';
    fixture.detectChanges();
    // Assert that the style has changed now that the model has changed
    expect(getElement().styles).toEqual({ color: 'yellow' });
  });

  it('should correctly update style with units (.px) when the model is set to number', () => {
    const template = `<div [rxStyle]="{'width.px': expr}"></div>`;
    fixture = createTestComponent(template);
    fixture.componentInstance.expr = 400;

    fixture.detectChanges();
    expect(getElement().styles).toEqual({ width: '400px' });
  });

  it('should handle CSS variables', () => {
    if (!supportsCssVariables) {
      return;
    }

    const template = `<div style="width: var(--width)" [rxStyle]="{'--width': expr}"></div>`;
    fixture = createTestComponent(template);
    fixture.componentInstance.expr = '100px';
    fixture.detectChanges();

    const target: HTMLElement = fixture.nativeElement.querySelector('div');
    expect(getComputedStyle(target).getPropertyValue('width')).toEqual('100px');
  });
});

// eslint-disable-next-line @angular-eslint/component-selector
@Component({ selector: 'test-cmp', template: '' })
class TestComponent {
  expr: any;
}

function createTestComponent(
  template: string
): ComponentFixture<TestComponent> {
  return TestBed.overrideComponent(TestComponent, {
    set: { template: template },
  }).createComponent(TestComponent);
}
