import { signal } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  waitForAsync,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RX_RENDER_STRATEGIES_CONFIG } from '@rx-angular/cdk/render-strategies';
import { startWith, tap, throwError } from 'rxjs';
import { RxIf } from '../if.directive';
import { createTestComponent, TestComponent } from './fixtures';

describe('rxIf directive signal values', () => {
  let fixture: ComponentFixture<TestComponent>;

  function getComponent(): TestComponent {
    return fixture.componentInstance;
  }

  afterEach(() => {
    fixture = null!;
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [RxIf],
      providers: [
        {
          provide: RX_RENDER_STRATEGIES_CONFIG,
          useValue: {
            primaryStrategy: 'custom',
            customStrategies: {
              custom: {
                name: 'custom',
                work: (cdRef) => {
                  cdRef.detectChanges();
                },
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

  it('should work in a template attribute', waitForAsync(() => {
    const template = '<span *rxIf="booleanConditionSignal()">hello</span>';
    fixture = createTestComponent(template);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('span').length).toEqual(1);
    expect(fixture.nativeElement.textContent).toBe('hello');
  }));

  it('should accept signal directly without being called in a template attribute', waitForAsync(() => {
    const template = '<span *rxIf="booleanConditionSignal">hello</span>';
    fixture = createTestComponent(template);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('span').length).toEqual(1);
    expect(fixture.nativeElement.textContent).toBe('hello');

    fixture.componentInstance.booleanConditionSignal.set(false);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('span').length).toEqual(0);
  }));

  it('should work on a template element', waitForAsync(() => {
    const template =
      '<ng-template [rxIf]="booleanConditionSignal">hello2</ng-template>';
    fixture = createTestComponent(template);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toBe('hello2');
  }));

  it('should toggle node when condition changes', waitForAsync(() => {
    fixture = createTestComponent(`
      <span *rxIf="booleanConditionSignal()">hello</span>
    `);

    getComponent().booleanConditionSignal.set(false);
    fixture.detectChanges();
    expect(fixture.debugElement.queryAll(By.css('span')).length).toEqual(0);
    expect(fixture.nativeElement.textContent).toBe('');

    getComponent().booleanConditionSignal.set(true);
    fixture.detectChanges();
    expect(fixture.debugElement.queryAll(By.css('span')).length).toEqual(1);
    expect(fixture.nativeElement.textContent).toBe('hello');

    getComponent().booleanConditionSignal.set(false);
    fixture.detectChanges();
    expect(fixture.debugElement.queryAll(By.css('span')).length).toEqual(0);
    expect(fixture.nativeElement.textContent).toBe('');
  }));

  it('should toggle node with not called signal when condition changes', fakeAsync(() => {
    fixture = createTestComponent(`
      <span *rxIf="booleanConditionSignal">hello</span>
    `);
    // this is needed here in order to register the effect
    // otherwise the effect will not be registered and the signal change will not be detected
    fixture.detectChanges();

    expect(fixture.debugElement.queryAll(By.css('span')).length).toEqual(1);
    expect(fixture.nativeElement.textContent).toBe('hello');

    getComponent().booleanConditionSignal.set(false);
    TestBed.flushEffects();
    expect(fixture.debugElement.queryAll(By.css('span')).length).toEqual(0);
    expect(fixture.nativeElement.textContent).toBe('');

    getComponent().booleanConditionSignal.set(true);
    TestBed.flushEffects();
    expect(fixture.debugElement.queryAll(By.css('span')).length).toEqual(1);
    expect(fixture.nativeElement.textContent).toBe('hello');

    getComponent().booleanConditionSignal.set(false);
    TestBed.flushEffects();
    expect(fixture.debugElement.queryAll(By.css('span')).length).toEqual(0);
    expect(fixture.nativeElement.textContent).toBe('');
  }));

  it('should handle nested if correctly', waitForAsync(() => {
    const template =
      '<div *rxIf="booleanConditionSignal"><span *rxIf="nestedBooleanSignal">hello</span></div>';

    fixture = createTestComponent(template);

    getComponent().booleanConditionSignal.set(false);
    fixture.detectChanges();
    expect(fixture.debugElement.queryAll(By.css('span')).length).toEqual(0);
    expect(fixture.nativeElement.textContent).toBe('');

    getComponent().booleanConditionSignal.set(true);
    TestBed.flushEffects();
    expect(fixture.debugElement.queryAll(By.css('span')).length).toEqual(1);
    expect(fixture.nativeElement.textContent).toBe('hello');

    getComponent().nestedBooleanSignal.set(false);
    TestBed.flushEffects();
    expect(fixture.debugElement.queryAll(By.css('span')).length).toEqual(0);
    expect(fixture.nativeElement.textContent).toBe('');

    getComponent().nestedBooleanSignal.set(true);
    TestBed.flushEffects();
    expect(fixture.debugElement.queryAll(By.css('span')).length).toEqual(1);
    expect(fixture.nativeElement.textContent).toBe('hello');

    getComponent().booleanConditionSignal.set(false);
    TestBed.flushEffects();
    expect(fixture.debugElement.queryAll(By.css('span')).length).toEqual(0);
    expect(fixture.nativeElement.textContent).toBe('');
  }));

  it('should update several nodes with if', waitForAsync(() => {
    const template =
      '<span *rxIf="booleanConditionSignal">hello1</span>' +
      '<span *rxIf="nestedBooleanSignal">hello2</span>';

    fixture = createTestComponent(template);

    fixture.detectChanges();
    expect(fixture.debugElement.queryAll(By.css('span')).length).toEqual(2);
    expect(fixture.nativeElement.textContent).toEqual('hello1hello2');

    getComponent().booleanConditionSignal.set(false);
    TestBed.flushEffects();
    expect(fixture.debugElement.queryAll(By.css('span')).length).toEqual(1);
    expect(fixture.nativeElement.textContent).toBe('hello2');

    getComponent().booleanConditionSignal.set(true);
    getComponent().nestedBooleanSignal.set(false);
    TestBed.flushEffects();
    expect(fixture.debugElement.queryAll(By.css('span')).length).toEqual(1);
    expect(fixture.nativeElement.textContent).toBe('hello1');
  }));

  it('should not add the element twice if the condition goes from truthy to truthy', waitForAsync(() => {
    const template = '<span *rxIf="numberConditionSignal">hello</span>';

    fixture = createTestComponent(template);

    fixture.detectChanges();
    let els = fixture.debugElement.queryAll(By.css('span'));
    expect(els.length).toEqual(1);
    els[0].nativeElement.classList.add('marker');
    expect(fixture.nativeElement.textContent).toBe('hello');

    getComponent().numberConditionSignal.set(2);
    TestBed.flushEffects();
    els = fixture.debugElement.queryAll(By.css('span'));
    expect(els.length).toEqual(1);
    expect(els[0].nativeElement.classList.contains('marker')).toBe(true);

    expect(fixture.nativeElement.textContent).toBe('hello');
  }));

  describe('then/else templates', () => {
    it('should support else', waitForAsync(() => {
      const template =
        '<span *rxIf="booleanConditionSignal; else elseBlock">TRUE</span>' +
        '<ng-template #elseBlock>FALSE</ng-template>';

      fixture = createTestComponent(template);

      fixture.detectChanges();
      expect(fixture.nativeElement.textContent).toBe('TRUE');

      getComponent().booleanConditionSignal.set(false);
      TestBed.flushEffects();
      expect(fixture.nativeElement.textContent).toBe('FALSE');
    }));

    it('should support then and else', waitForAsync(() => {
      const template =
        '<span *rxIf="booleanConditionSignal; then: thenBlock; else: elseBlock">IGNORE</span>' +
        '<ng-template #thenBlock>THEN</ng-template>' +
        '<ng-template #elseBlock>ELSE</ng-template>';

      fixture = createTestComponent(template);

      fixture.detectChanges();
      expect(fixture.nativeElement.textContent).toBe('THEN');

      getComponent().booleanConditionSignal.set(false);
      TestBed.flushEffects();
      expect(fixture.nativeElement.textContent).toBe('ELSE');
    }));

    it('should support removing the then/else templates', () => {
      const template = `<span *rxIf="booleanConditionSignal;
            then: nestedBooleanSignal() ? tplRef : null;
            else: nestedBooleanSignal() ? tplRef : null"></span>
        <ng-template #tplRef>Template</ng-template>`;

      fixture = createTestComponent(template);
      const comp = fixture.componentInstance;
      // then template
      comp.booleanConditionSignal.set(true);

      comp.nestedBooleanSignal.set(true);
      fixture.detectChanges();
      expect(fixture.nativeElement.textContent).toBe('Template');

      comp.nestedBooleanSignal.set(false);
      fixture.detectChanges();
      expect(fixture.nativeElement.textContent).toBe('');

      // else template
      comp.booleanConditionSignal.set(true);

      comp.nestedBooleanSignal.set(true);
      fixture.detectChanges();
      expect(fixture.nativeElement.textContent).toBe('Template');

      comp.nestedBooleanSignal.set(false);
      fixture.detectChanges();
      expect(fixture.nativeElement.textContent).toBe('');
    });

    it('should support dynamic else', waitForAsync(() => {
      const template =
        '<span *rxIf="booleanConditionSignal; else: nestedBooleanCondition ? b1 : b2">TRUE</span>' +
        '<ng-template #b1>FALSE1</ng-template>' +
        '<ng-template #b2>FALSE2</ng-template>';

      fixture = createTestComponent(template);

      fixture.detectChanges();
      expect(fixture.nativeElement.textContent).toBe('TRUE');

      getComponent().booleanConditionSignal.set(false);
      TestBed.flushEffects();
      expect(fixture.nativeElement.textContent).toBe('FALSE1');

      getComponent().nestedBooleanCondition = false;
      fixture.detectChanges();
      expect(fixture.nativeElement.textContent).toBe('FALSE2');
    }));

    it('should support binding to variable using let', waitForAsync(() => {
      const template =
        '<span *rxIf="booleanConditionSignal; else: elseBlock; let v">{{v}}</span>' +
        '<ng-template #elseBlock let-v>{{v}}</ng-template>';

      fixture = createTestComponent(template);

      fixture.detectChanges();
      expect(fixture.nativeElement.textContent).toBe('true');

      getComponent().booleanConditionSignal.set(false);
      TestBed.flushEffects();
      expect(fixture.nativeElement.textContent).toBe('false');
    }));

    it('should support binding to variable using as', waitForAsync(() => {
      fixture = createTestComponent(`
         <span *rxIf="booleanConditionSignal as v; else: elseBlock">{{v}}</span>
         <ng-template #elseBlock let-v>{{v}}</ng-template>
      `);

      fixture.detectChanges();
      expect(fixture.nativeElement.textContent).toBe('true');

      getComponent().booleanConditionSignal.set(false);

      // TODO: discuss this
      // because we are using effects, we need to flush them
      // is this a breaking change?
      // We can't have synchronous effects ?? as that would break the "glitch-free" feature they provide
      TestBed.flushEffects();

      expect(fixture.nativeElement.textContent).toBe('false');
    }));
  });

  describe('Type guarding', () => {
    it('should throw when then block is not template', waitForAsync(() => {
      const template =
        '<span *rxIf="booleanConditionSignal; then thenBlock">IGNORE</span>' +
        '<div #thenBlock>THEN</div>';

      fixture = createTestComponent(template);

      expect(() => fixture.detectChanges()).toThrowError(
        /rxThen must be a TemplateRef, but received/,
      );
    }));

    it('should throw when else block is not template', waitForAsync(() => {
      const template =
        '<span *rxIf="booleanConditionSignal; else elseBlock">IGNORE</span>' +
        '<div #elseBlock>ELSE</div>';

      fixture = createTestComponent(template);

      expect(() => fixture.detectChanges()).toThrowError(
        /rxElse must be a TemplateRef, but received/,
      );
    }));
  });

  fdescribe('Templates & Context', () => {
    it('should render suspense template when value is undefined', waitForAsync(() => {
      fixture = createTestComponent(`
         <span *rxIf="booleanConditionSignal; suspense: suspense; let v">{{v}}</span>
         <ng-template #suspense let-v>suspended</ng-template>
      `);

      getComponent().booleanConditionSignal.set(undefined);
      fixture.detectChanges();
      expect(fixture.nativeElement.textContent).toBe('suspended');

      getComponent().booleanConditionSignal.set(true);
      fixture.detectChanges();
      expect(fixture.nativeElement.textContent).toBe('true');
    }));

    it('should not have suspense context', waitForAsync(() => {
      const template =
        '<span *rxIf="booleanConditionSignal; let v; let suspense = suspense">{{suspense}}</span>';

      fixture = createTestComponent(template);
      getComponent().booleanConditionSignal.set(true);
      fixture.detectChanges();
      expect(fixture.nativeElement.textContent).toBe('false');

      getComponent().booleanConditionSignal.set(undefined);
      fixture.detectChanges();
      expect(fixture.nativeElement.textContent).toBe('');
    }));

    it('should not have suspense context', waitForAsync(() => {
      const template =
        '<span *rxIf="booleanConditionSignal; let v; let suspense = suspense">{{suspense}}</span>';

      fixture = createTestComponent(template);
      getComponent().booleanConditionSignal.set(false);
      fixture.detectChanges();
      expect(fixture.nativeElement.textContent).toBe('');

      getComponent().booleanConditionSignal.set(undefined);
      fixture.detectChanges();
      expect(fixture.nativeElement.textContent).toBe('');
    }));

    // TODO: signals do not support complete and error
    xit('should render complete template when source completes', waitForAsync(() => {
      const template =
        '<span *rxIf="booleanConditionSignal; complete: complete; let v">{{v}}</span>' +
        '<ng-template #complete let-v>completed</ng-template>';

      fixture = createTestComponent(template);
      getComponent().booleanConditionSignal = signal(undefined);
      fixture.detectChanges();
      expect(fixture.nativeElement.textContent).toBe('completed');

      getComponent().booleanConditionSignal = signal(true);
      fixture.detectChanges();
      expect(fixture.nativeElement.textContent).toBe('true');
    }));

    // TODO: signals do not support complete and error
    xit('should render error template when source throws', waitForAsync(() => {
      const template =
        '<span *rxIf="booleanConditionSignal; error: error; let v">{{v}}</span>' +
        '<ng-template #error let-v>error</ng-template>';

      fixture = createTestComponent(template);
      getComponent().booleanConditionSignal = throwError(() => null) as any;
      fixture.detectChanges();
      expect(fixture.nativeElement.textContent).toBe('error');

      getComponent().booleanConditionSignal = signal(true);
      fixture.detectChanges();
      expect(fixture.nativeElement.textContent).toBe('true');
    }));

    // TODO: signals do not support complete and error
    xit('should have error context when source throws', waitForAsync(() => {
      const template =
        '<span *rxIf="booleanConditionSignal; let v; let error = error">{{error}}</span>';

      fixture = createTestComponent(template);
      getComponent().booleanConditionSignal = throwError(() => null).pipe(
        startWith(true),
      ) as any;
      fixture.detectChanges();
      expect(fixture.nativeElement.textContent).toBe('true');

      getComponent().booleanConditionSignal = signal(true);
      fixture.detectChanges();
      expect(fixture.nativeElement.textContent).toBe('false');
    }));

    // TODO: signals do not support complete and error
    xit('should have error context on else template', waitForAsync(() => {
      const template =
        '<span *rxIf="booleanConditionSignal; let v; else: elseTpl">then</span>' +
        '<ng-template #elseTpl let-e="error">else{{e}}</ng-template>';

      fixture = createTestComponent(template);
      getComponent().booleanConditionSignal = throwError(() => null) as any;
      fixture.detectChanges();
      expect(fixture.nativeElement.textContent).toBe('elsetrue');

      getComponent().booleanConditionSignal = signal(true);
      fixture.detectChanges();
      expect(fixture.nativeElement.textContent).toBe('then');
    }));
  });
});
