import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RX_RENDER_STRATEGIES_CONFIG } from '@rx-angular/cdk/render-strategies';
import { BehaviorSubject, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { createTestComponent, TestComponent } from './fixtures';
import { RxStyleModule } from '../style.module';

describe('RxStyle Observable values', () => {
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

  afterEach(() => {
    fixture = null;
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [RxStyleModule],
      providers: [
        {
          provide: RX_RENDER_STRATEGIES_CONFIG,
          useValue: {
            primaryStrategy: 'urgent',
            customStrategies: {
              urgent: {
                name: 'urgent',
                work: (cdRef) => cdRef.detectChanges(),
                behavior:
                  ({ work }) =>
                  (o$) =>
                    o$.pipe(tap(() => work())),
              },
            },
          },
        },
      ],
    });
  });

  it(
    'should add styles specified in an object literal',
    waitForAsync(() => {
      const template = `<div [rxStyle]="expr"></div>`;
      fixture = createTestComponent(template);
      getComponent().expr = of({ 'max-width': '40px' });
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
      getComponent().expr = new BehaviorSubject({ 'max-width': '40px' });
      fixture.detectChanges();
      expect(getElement().styles).toEqual({ 'max-width': '40px' });

      getComponent().expr.next({ 'max-width': '30%' });
      expect(getElement().styles).toEqual({ 'max-width': '30%' });
    })
  );

  it(
    'should remove styles with a null expression',
    waitForAsync(() => {
      const template = `<div [rxStyle]="expr"></div>`;
      fixture = createTestComponent(template);

      getComponent().expr = new BehaviorSubject({ 'max-width': '40px' });
      fixture.detectChanges();
      expect(getElement().styles).toEqual({ 'max-width': '40px' });

      getComponent().expr.next(null);
      expect(getElement().styles).not.toContain('max-width');
    })
  );

  it(
    'should remove styles with an undefined expression',
    waitForAsync(() => {
      const template = `<div [rxStyle]="expr"></div>`;
      fixture = createTestComponent(template);

      getComponent().expr = new BehaviorSubject({ 'max-width': '40px' });
      fixture.detectChanges();
      expect(getElement().styles).toEqual({ 'max-width': '40px' });

      getComponent().expr.next(undefined);
      expect(getElement().styles).not.toContain('max-width');
    })
  );

  it(
    'should add and remove styles specified using style.unit notation',
    waitForAsync(() => {
      const template = `<div [rxStyle]="{'max-width.px': expr}"></div>`;

      fixture = createTestComponent(template);

      getComponent().expr = of('40');
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

      getComponent().expr = new BehaviorSubject('green');
      fixture.detectChanges();
      expect(getElement().styles).toEqual({ color: 'green' });

      getComponent().expr.next(null);
      expect(getElement().styles).not.toContain('color');
    })
  );

  it(
    'should update styles using style.unit notation when unit changes',
    waitForAsync(() => {
      const template = `<div [rxStyle]="expr"></div>`;

      fixture = createTestComponent(template);

      getComponent().expr = new BehaviorSubject({ 'max-width.px': '40' });
      fixture.detectChanges();
      expect(getElement().styles).toEqual({ 'max-width': '40px' });

      getComponent().expr.next({ 'max-width.em': '40' });
      expect(getElement().styles).toEqual({ 'max-width': '40em' });
    })
  );

  // keyValueDiffer is sensitive to key order #9115
  it(
    'should change styles specified in an object expression',
    waitForAsync(() => {
      const template = `<div [rxStyle]="expr"></div>`;

      fixture = createTestComponent(template);

      getComponent().expr = new BehaviorSubject({
        // height, width order is important here
        height: '10px',
        width: '10px',
      });

      fixture.detectChanges();
      expect(getElement().styles).toEqual({ height: '10px', width: '10px' });

      getComponent().expr.next({
        // width, height order is important here
        width: '5px',
        height: '5px',
      });

      expect(getElement().styles).toEqual({ height: '5px', width: '5px' });
    })
  );

  it(
    'should remove styles when deleting a key in an object expression',
    waitForAsync(() => {
      const template = `<div [rxStyle]="expr"></div>`;

      fixture = createTestComponent(template);

      getComponent().expr = new BehaviorSubject({ 'max-width': '40px' });
      fixture.detectChanges();
      expect(getElement().styles).toEqual({ 'max-width': '40px' });

      getComponent().expr.next({});
      expect(getElement().styles).not.toContain('max-width');
    })
  );

  it(
    'should co-operate with the style attribute',
    waitForAsync(() => {
      const template = `<div style="font-size: 12px" [rxStyle]="expr"></div>`;

      fixture = createTestComponent(template);

      getComponent().expr = new BehaviorSubject({ 'max-width': '40px' });
      fixture.detectChanges();
      expect((getElement().nativeElement as HTMLElement).style.fontSize).toBe(
        '12px'
      );
      expect((getElement().nativeElement as HTMLElement).style.maxWidth).toBe(
        '40px'
      );
      getComponent().expr.next({});
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

      getComponent().expr = new BehaviorSubject({ 'max-width': '40px' });
      fixture.detectChanges();
      expect(getElement().styles).toEqual({
        'max-width': '40px',
        'font-size': '12px',
      });

      getComponent().expr.next({});
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
    fixture.componentInstance.expr = new BehaviorSubject('red');

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

    fixture.componentInstance.expr.next('yellow');
    // Assert that the style has changed now that the model has changed
    expect(getElement().styles).toEqual({ color: 'yellow' });
  });

  it('should correctly update style with units (.px) when the model is set to number', () => {
    const template = `<div [rxStyle]="{'width.px': expr}"></div>`;
    fixture = createTestComponent(template);
    fixture.componentInstance.expr = of(400);

    fixture.detectChanges();
    expect(getElement().styles).toEqual({ width: '400px' });
  });

  it('should accept a mix of reactive and observable values', () => {
    const template = `<div [rxStyle]="expr"></div>`;
    fixture = createTestComponent(template);
    fixture.componentInstance.expr = { 'width.px': of(400), 'height.px': 20 };
    fixture.detectChanges();
    expect(getElement().styles).toEqual({ width: '400px', height: '20px' });
  });

  xit('should react to changes of a mix of reactive and observable values', () => {
    // TODO: clarify if we want to support this feature. It would increase the complexity of a lot
    const template = `<div [rxStyle]="expr"></div>`;
    fixture = createTestComponent(template);
    fixture.componentInstance.expr = { 'width.px': of(400), 'height.px': 20 };
    fixture.detectChanges();
    expect(getElement().styles).toEqual({ width: '400px', height: '20px' });

    fixture.componentInstance.expr['height.px'] = 50;
    fixture.detectChanges();
    expect(getElement().styles).toEqual({ width: '400px', height: '50px' });
  });

  it('should handle CSS variables', () => {
    if (!supportsCssVariables) {
      return;
    }

    const template = `<div style="width: var(--width)" [rxStyle]="{'--width': expr}"></div>`;
    fixture = createTestComponent(template);
    fixture.componentInstance.expr = of('100px');
    fixture.detectChanges();

    const target: HTMLElement = fixture.nativeElement.querySelector('div');
    expect(getComputedStyle(target).getPropertyValue('width')).toEqual('100px');
  });
});
