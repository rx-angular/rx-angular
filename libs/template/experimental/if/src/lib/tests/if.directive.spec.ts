import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RX_RENDER_STRATEGIES_CONFIG } from '@rx-angular/cdk/render-strategies';
import { IfModule } from '../if.module';

{
  describe('rxIf directive', () => {
    let fixture: ComponentFixture<any>;

    function getComponent(): TestComponent {
      return fixture.componentInstance;
    }

    afterEach(() => {
      fixture = null!;
    });

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [TestComponent],
        imports: [IfModule],
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
      'should work in a template attribute',
      waitForAsync(() => {
        const template = '<span *rxIf="booleanCondition">hello</span>';
        fixture = createTestComponent(template);
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelectorAll('span').length).toEqual(
          1
        );
        expect(fixture.nativeElement.textContent).toBe('hello');
      })
    );

    it(
      'should work on a template element',
      waitForAsync(() => {
        const template =
          '<ng-template [rxIf]="booleanCondition">hello2</ng-template>';
        fixture = createTestComponent(template);
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent).toBe('hello2');
      })
    );

    it(
      'should toggle node when condition changes',
      waitForAsync(() => {
        const template = '<span *rxIf="booleanCondition">hello</span>';
        fixture = createTestComponent(template);
        getComponent().booleanCondition = false;
        fixture.detectChanges();
        expect(fixture.debugElement.queryAll(By.css('span')).length).toEqual(0);
        expect(fixture.nativeElement.textContent).toBe('');

        getComponent().booleanCondition = true;
        fixture.detectChanges();
        expect(fixture.debugElement.queryAll(By.css('span')).length).toEqual(1);
        expect(fixture.nativeElement.textContent).toBe('hello');

        getComponent().booleanCondition = false;
        fixture.detectChanges();
        expect(fixture.debugElement.queryAll(By.css('span')).length).toEqual(0);
        expect(fixture.nativeElement.textContent).toBe('');
      })
    );

    it(
      'should handle nested if correctly',
      waitForAsync(() => {
        const template =
          '<div *rxIf="booleanCondition"><span *rxIf="nestedBooleanCondition">hello</span></div>';

        fixture = createTestComponent(template);

        getComponent().booleanCondition = false;
        fixture.detectChanges();
        expect(fixture.debugElement.queryAll(By.css('span')).length).toEqual(0);
        expect(fixture.nativeElement.textContent).toBe('');

        getComponent().booleanCondition = true;
        fixture.detectChanges();
        expect(fixture.debugElement.queryAll(By.css('span')).length).toEqual(1);
        expect(fixture.nativeElement.textContent).toBe('hello');

        getComponent().nestedBooleanCondition = false;
        fixture.detectChanges();
        expect(fixture.debugElement.queryAll(By.css('span')).length).toEqual(0);
        expect(fixture.nativeElement.textContent).toBe('');

        getComponent().nestedBooleanCondition = true;
        fixture.detectChanges();
        expect(fixture.debugElement.queryAll(By.css('span')).length).toEqual(1);
        expect(fixture.nativeElement.textContent).toBe('hello');

        getComponent().booleanCondition = false;
        fixture.detectChanges();
        expect(fixture.debugElement.queryAll(By.css('span')).length).toEqual(0);
        expect(fixture.nativeElement.textContent).toBe('');
      })
    );

    it(
      'should update several nodes with if',
      waitForAsync(() => {
        const template =
          '<span *rxIf="numberCondition + 1 >= 2">helloNumber</span>' +
          '<span *rxIf="stringCondition == \'foo\'">helloString</span>' +
          '<span *rxIf="functionCondition(stringCondition, numberCondition)">helloFunction</span>';

        fixture = createTestComponent(template);

        fixture.detectChanges();
        expect(fixture.debugElement.queryAll(By.css('span')).length).toEqual(3);
        expect(fixture.nativeElement.textContent).toEqual(
          'helloNumberhelloStringhelloFunction'
        );

        getComponent().numberCondition = 0;
        fixture.detectChanges();
        expect(fixture.debugElement.queryAll(By.css('span')).length).toEqual(1);
        expect(fixture.nativeElement.textContent).toBe('helloString');

        getComponent().numberCondition = 1;
        getComponent().stringCondition = 'bar';
        fixture.detectChanges();
        expect(fixture.debugElement.queryAll(By.css('span')).length).toEqual(1);
        expect(fixture.nativeElement.textContent).toBe('helloNumber');
      })
    );

    it(
      'should not add the element twice if the condition goes from truthy to truthy',
      waitForAsync(() => {
        const template = '<span *rxIf="numberCondition">hello</span>';

        fixture = createTestComponent(template);

        fixture.detectChanges();
        let els = fixture.debugElement.queryAll(By.css('span'));
        expect(els.length).toEqual(1);
        els[0].nativeElement.classList.add('marker');
        expect(fixture.nativeElement.textContent).toBe('hello');

        getComponent().numberCondition = 2;
        fixture.detectChanges();
        els = fixture.debugElement.queryAll(By.css('span'));
        expect(els.length).toEqual(1);
        expect(els[0].nativeElement.classList.contains('marker')).toBe(true);

        expect(fixture.nativeElement.textContent).toBe('hello');
      })
    );

    describe('then/else templates', () => {
      it(
        'should support else',
        waitForAsync(() => {
          const template =
            '<span *rxIf="booleanCondition; else elseBlock">TRUE</span>' +
            '<ng-template #elseBlock>FALSE</ng-template>';

          fixture = createTestComponent(template);

          fixture.detectChanges();
          expect(fixture.nativeElement.textContent).toBe('TRUE');

          getComponent().booleanCondition = false;
          fixture.detectChanges();
          expect(fixture.nativeElement.textContent).toBe('FALSE');
        })
      );

      it(
        'should support then and else',
        waitForAsync(() => {
          const template =
            '<span *rxIf="booleanCondition; then: thenBlock; else: elseBlock">IGNORE</span>' +
            '<ng-template #thenBlock>THEN</ng-template>' +
            '<ng-template #elseBlock>ELSE</ng-template>';

          fixture = createTestComponent(template);

          fixture.detectChanges();
          expect(fixture.nativeElement.textContent).toBe('THEN');

          getComponent().booleanCondition = false;
          fixture.detectChanges();
          expect(fixture.nativeElement.textContent).toBe('ELSE');
        })
      );

      xit('should support removing the then/else templates', () => {
        const template = `<span *rxIf="booleanCondition;
            then: nestedBooleanCondition ? tplRef : null;
            else: nestedBooleanCondition ? tplRef : null"></span>
        <ng-template #tplRef>Template</ng-template>`;

        fixture = createTestComponent(template);
        const comp = fixture.componentInstance;
        // then template
        comp.booleanCondition = true;

        comp.nestedBooleanCondition = true;
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent).toBe('Template');

        comp.nestedBooleanCondition = false;
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent).toBe('');

        // else template
        comp.booleanCondition = true;

        comp.nestedBooleanCondition = true;
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent).toBe('Template');

        comp.nestedBooleanCondition = false;
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent).toBe('');
      });

      xit(
        'should support dynamic else',
        waitForAsync(() => {
          const template =
            '<span *rxIf="booleanCondition; else: nestedBooleanCondition ? b1 : b2">TRUE</span>' +
            '<ng-template #b1>FALSE1</ng-template>' +
            '<ng-template #b2>FALSE2</ng-template>';

          fixture = createTestComponent(template);

          fixture.detectChanges();
          expect(fixture.nativeElement.textContent).toBe('TRUE');

          getComponent().booleanCondition = false;
          fixture.detectChanges();
          expect(fixture.nativeElement.textContent).toBe('FALSE1');

          getComponent().nestedBooleanCondition = false;
          fixture.detectChanges();
          expect(fixture.nativeElement.textContent).toBe('FALSE2');
        })
      );

      it(
        'should support binding to variable using let',
        waitForAsync(() => {
          const template =
            '<span *rxIf="booleanCondition; else: elseBlock; let v">{{v}}</span>' +
            '<ng-template #elseBlock let-v>{{v}}</ng-template>';

          fixture = createTestComponent(template);

          fixture.detectChanges();
          expect(fixture.nativeElement.textContent).toBe('true');

          getComponent().booleanCondition = false;
          fixture.detectChanges();
          expect(fixture.nativeElement.textContent).toBe('false');
        })
      );

      it(
        'should support binding to variable using as',
        waitForAsync(() => {
          const template =
            '<span *rxIf="booleanCondition as v; else: elseBlock">{{v}}</span>' +
            '<ng-template #elseBlock let-v>{{v}}</ng-template>';

          fixture = createTestComponent(template);

          fixture.detectChanges();
          expect(fixture.nativeElement.textContent).toBe('true');

          getComponent().booleanCondition = false;
          fixture.detectChanges();
          expect(fixture.nativeElement.textContent).toBe('false');
        })
      );
    });

    describe('Type guarding', () => {
      it(
        'should throw when then block is not template',
        waitForAsync(() => {
          const template =
            '<span *rxIf="booleanCondition; then thenBlock">IGNORE</span>' +
            '<div #thenBlock>THEN</div>';

          fixture = createTestComponent(template);

          expect(() => fixture.detectChanges()).toThrowError(
            /rxThen must be a TemplateRef, but received/
          );
        })
      );

      it(
        'should throw when else block is not template',
        waitForAsync(() => {
          const template =
            '<span *rxIf="booleanCondition; else elseBlock">IGNORE</span>' +
            '<div #elseBlock>ELSE</div>';

          fixture = createTestComponent(template);

          expect(() => fixture.detectChanges()).toThrowError(
            /rxElse must be a TemplateRef, but received/
          );
        })
      );
    });
  });
}

// eslint-disable-next-line @angular-eslint/component-selector
@Component({ selector: 'test-cmp', template: '' })
class TestComponent {
  booleanCondition = true;
  nestedBooleanCondition = true;
  numberCondition = 1;
  stringCondition = 'foo';
  functionCondition: Function = (s: any, n: any): boolean =>
    s == 'foo' && n == 1;
}

function createTestComponent(
  template: string
): ComponentFixture<TestComponent> {
  return TestBed.overrideComponent(TestComponent, {
    set: { template: template },
  }).createComponent(TestComponent);
}
