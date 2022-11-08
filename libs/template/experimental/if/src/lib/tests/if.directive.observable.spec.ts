import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RX_RENDER_STRATEGIES_CONFIG } from '@rx-angular/cdk/render-strategies';
import { BehaviorSubject, of, startWith, throwError, tap } from 'rxjs';
import { IfModule } from '../if.module';
import { createTestComponent, TestComponent } from './fixtures';

describe('rxIf directive observable values', () => {
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
      imports: [IfModule],
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

  it(
    'should work in a template attribute',
    waitForAsync(() => {
      const template = '<span *rxIf="booleanCondition$">hello</span>';
      fixture = createTestComponent(template);
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelectorAll('span').length).toEqual(1);
      expect(fixture.nativeElement.textContent).toBe('hello');
    })
  );

  it(
    'should work on a template element',
    waitForAsync(() => {
      const template =
        '<ng-template [rxIf]="booleanCondition$">hello2</ng-template>';
      fixture = createTestComponent(template);
      fixture.detectChanges();
      expect(fixture.nativeElement.textContent).toBe('hello2');
    })
  );

  it(
    'should toggle node when condition changes',
    waitForAsync(() => {
      const template = '<span *rxIf="booleanCondition$">hello</span>';
      fixture = createTestComponent(template);
      getComponent().booleanCondition$.next(false);
      fixture.detectChanges();
      expect(fixture.debugElement.queryAll(By.css('span')).length).toEqual(0);
      expect(fixture.nativeElement.textContent).toBe('');

      getComponent().booleanCondition$.next(true);
      expect(fixture.debugElement.queryAll(By.css('span')).length).toEqual(1);
      expect(fixture.nativeElement.textContent).toBe('hello');

      getComponent().booleanCondition$.next(false);
      expect(fixture.debugElement.queryAll(By.css('span')).length).toEqual(0);
      expect(fixture.nativeElement.textContent).toBe('');
    })
  );

  it(
    'should handle nested if correctly',
    waitForAsync(() => {
      const template =
        '<div *rxIf="booleanCondition$"><span *rxIf="nestedBooleanCondition$">hello</span></div>';

      fixture = createTestComponent(template);

      getComponent().booleanCondition$.next(false);
      fixture.detectChanges();
      expect(fixture.debugElement.queryAll(By.css('span')).length).toEqual(0);
      expect(fixture.nativeElement.textContent).toBe('');

      getComponent().booleanCondition$.next(true);
      expect(fixture.debugElement.queryAll(By.css('span')).length).toEqual(1);
      expect(fixture.nativeElement.textContent).toBe('hello');

      getComponent().nestedBooleanCondition$.next(false);
      expect(fixture.debugElement.queryAll(By.css('span')).length).toEqual(0);
      expect(fixture.nativeElement.textContent).toBe('');

      getComponent().nestedBooleanCondition$.next(true);
      expect(fixture.debugElement.queryAll(By.css('span')).length).toEqual(1);
      expect(fixture.nativeElement.textContent).toBe('hello');

      getComponent().booleanCondition$.next(false);
      expect(fixture.debugElement.queryAll(By.css('span')).length).toEqual(0);
      expect(fixture.nativeElement.textContent).toBe('');
    })
  );

  it(
    'should update several nodes with if',
    waitForAsync(() => {
      const template =
        '<span *rxIf="booleanCondition$">hello1</span>' +
        '<span *rxIf="nestedBooleanCondition$">hello2</span>';

      fixture = createTestComponent(template);

      fixture.detectChanges();
      expect(fixture.debugElement.queryAll(By.css('span')).length).toEqual(2);
      expect(fixture.nativeElement.textContent).toEqual('hello1hello2');

      getComponent().booleanCondition$.next(false);
      expect(fixture.debugElement.queryAll(By.css('span')).length).toEqual(1);
      expect(fixture.nativeElement.textContent).toBe('hello2');

      getComponent().booleanCondition$.next(true);
      getComponent().nestedBooleanCondition$.next(false);
      expect(fixture.debugElement.queryAll(By.css('span')).length).toEqual(1);
      expect(fixture.nativeElement.textContent).toBe('hello1');
    })
  );

  it(
    'should not add the element twice if the condition goes from truthy to truthy',
    waitForAsync(() => {
      const template = '<span *rxIf="numberCondition$">hello</span>';

      fixture = createTestComponent(template);

      fixture.detectChanges();
      let els = fixture.debugElement.queryAll(By.css('span'));
      expect(els.length).toEqual(1);
      els[0].nativeElement.classList.add('marker');
      expect(fixture.nativeElement.textContent).toBe('hello');

      getComponent().numberCondition$.next(2);
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
          '<span *rxIf="booleanCondition$; else elseBlock">TRUE</span>' +
          '<ng-template #elseBlock>FALSE</ng-template>';

        fixture = createTestComponent(template);

        fixture.detectChanges();
        expect(fixture.nativeElement.textContent).toBe('TRUE');

        getComponent().booleanCondition$.next(false);
        expect(fixture.nativeElement.textContent).toBe('FALSE');
      })
    );

    it(
      'should support then and else',
      waitForAsync(() => {
        const template =
          '<span *rxIf="booleanCondition$; then: thenBlock; else: elseBlock">IGNORE</span>' +
          '<ng-template #thenBlock>THEN</ng-template>' +
          '<ng-template #elseBlock>ELSE</ng-template>';

        fixture = createTestComponent(template);

        fixture.detectChanges();
        expect(fixture.nativeElement.textContent).toBe('THEN');

        getComponent().booleanCondition$.next(false);
        expect(fixture.nativeElement.textContent).toBe('ELSE');
      })
    );

    it('should support removing the then/else templates', () => {
      const template = `<span *rxIf="booleanCondition$;
            then: nestedBooleanCondition ? tplRef : null;
            else: nestedBooleanCondition ? tplRef : null"></span>
        <ng-template #tplRef>Template</ng-template>`;

      fixture = createTestComponent(template);
      const comp = fixture.componentInstance;
      // then template
      comp.booleanCondition$.next(true);

      comp.nestedBooleanCondition = true;
      fixture.detectChanges();
      expect(fixture.nativeElement.textContent).toBe('Template');

      comp.nestedBooleanCondition = false;
      fixture.detectChanges();
      expect(fixture.nativeElement.textContent).toBe('');

      // else template
      comp.booleanCondition$.next(true);

      comp.nestedBooleanCondition = true;
      fixture.detectChanges();
      expect(fixture.nativeElement.textContent).toBe('Template');

      comp.nestedBooleanCondition = false;
      fixture.detectChanges();
      expect(fixture.nativeElement.textContent).toBe('');
    });

    it(
      'should support dynamic else',
      waitForAsync(() => {
        const template =
          '<span *rxIf="booleanCondition$; else: nestedBooleanCondition ? b1 : b2">TRUE</span>' +
          '<ng-template #b1>FALSE1</ng-template>' +
          '<ng-template #b2>FALSE2</ng-template>';

        fixture = createTestComponent(template);

        fixture.detectChanges();
        expect(fixture.nativeElement.textContent).toBe('TRUE');

        getComponent().booleanCondition$.next(false);
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
          '<span *rxIf="booleanCondition$; else: elseBlock; let v">{{v}}</span>' +
          '<ng-template #elseBlock let-v>{{v}}</ng-template>';

        fixture = createTestComponent(template);

        fixture.detectChanges();
        expect(fixture.nativeElement.textContent).toBe('true');

        getComponent().booleanCondition$.next(false);
        expect(fixture.nativeElement.textContent).toBe('false');
      })
    );

    it(
      'should support binding to variable using as',
      waitForAsync(() => {
        const template =
          '<span *rxIf="booleanCondition$ as v; else: elseBlock">{{v}}</span>' +
          '<ng-template #elseBlock let-v>{{v}}</ng-template>';

        fixture = createTestComponent(template);

        fixture.detectChanges();
        expect(fixture.nativeElement.textContent).toBe('true');

        getComponent().booleanCondition$.next(false);
        expect(fixture.nativeElement.textContent).toBe('false');
      })
    );
  });

  describe('Type guarding', () => {
    it(
      'should throw when then block is not template',
      waitForAsync(() => {
        const template =
          '<span *rxIf="booleanCondition$; then thenBlock">IGNORE</span>' +
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
          '<span *rxIf="booleanCondition$; else elseBlock">IGNORE</span>' +
          '<div #elseBlock>ELSE</div>';

        fixture = createTestComponent(template);

        expect(() => fixture.detectChanges()).toThrowError(
          /rxElse must be a TemplateRef, but received/
        );
      })
    );
  });

  describe('Templates & Context', () => {
    it(
      'should render suspense template when value is undefined',
      waitForAsync(() => {
        const template =
          '<span *rxIf="booleanCondition$; suspense: suspense; let v">{{v}}</span>' +
          '<ng-template #suspense let-v>suspended</ng-template>';

        fixture = createTestComponent(template);
        getComponent().booleanCondition$.next(undefined);
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent).toBe('suspended');

        getComponent().booleanCondition$.next(true);
        expect(fixture.nativeElement.textContent).toBe('true');
      })
    );

    it(
      'should not have suspense context',
      waitForAsync(() => {
        const template =
          '<span *rxIf="booleanCondition$; let v; let suspense = suspense">{{suspense}}</span>';

        fixture = createTestComponent(template);
        getComponent().booleanCondition$.next(true);
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent).toBe('false');

        getComponent().booleanCondition$.next(undefined);
        expect(fixture.nativeElement.textContent).toBe('');
      })
    );

    it(
      'should not have suspense context',
      waitForAsync(() => {
        const template =
          '<span *rxIf="booleanCondition$; let v; let suspense = suspense">{{suspense}}</span>';

        fixture = createTestComponent(template);
        getComponent().booleanCondition$.next(false);
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent).toBe('');

        getComponent().booleanCondition$.next(undefined);
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent).toBe('');
      })
    );

    it(
      'should render complete template when source completes',
      waitForAsync(() => {
        const template =
          '<span *rxIf="booleanCondition$; complete: complete; let v">{{v}}</span>' +
          '<ng-template #complete let-v>completed</ng-template>';

        fixture = createTestComponent(template);
        getComponent().booleanCondition$ = of(undefined) as any;
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent).toBe('completed');

        getComponent().booleanCondition$ = new BehaviorSubject(true);
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent).toBe('true');
      })
    );

    it(
      'should have complete context when source completes',
      waitForAsync(() => {
        const template =
          '<span *rxIf="booleanCondition$; let v; let complete = complete">{{complete}}</span>';

        fixture = createTestComponent(template);
        getComponent().booleanCondition$ = of(true) as any;
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent).toBe('true');

        getComponent().booleanCondition$ = new BehaviorSubject(true);
        expect(fixture.nativeElement.textContent).toBe('true');
      })
    );

    it(
      'should have complete context on else template',
      waitForAsync(() => {
        const template =
          '<span *rxIf="booleanCondition$; let v; else: elseTpl">then</span>' +
          '<ng-template #elseTpl let-c="complete">else{{c}}</ng-template>';

        fixture = createTestComponent(template);
        getComponent().booleanCondition$ = of(false) as any;
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent).toBe('elsetrue');

        getComponent().booleanCondition$ = new BehaviorSubject(true);
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent).toBe('then');
      })
    );

    it(
      'should render error template when source throws',
      waitForAsync(() => {
        const template =
          '<span *rxIf="booleanCondition$; error: error; let v">{{v}}</span>' +
          '<ng-template #error let-v>error</ng-template>';

        fixture = createTestComponent(template);
        getComponent().booleanCondition$ = throwError(() => null) as any;
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent).toBe('error');

        getComponent().booleanCondition$ = new BehaviorSubject(true);
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent).toBe('true');
      })
    );

    it(
      'should have error context when source throws',
      waitForAsync(() => {
        const template =
          '<span *rxIf="booleanCondition$; let v; let error = error">{{error}}</span>';

        fixture = createTestComponent(template);
        getComponent().booleanCondition$ = throwError(() => null).pipe(
          startWith(true)
        ) as any;
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent).toBe('true');

        getComponent().booleanCondition$ = new BehaviorSubject(true);
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent).toBe('false');
      })
    );

    it(
      'should have error context on else template',
      waitForAsync(() => {
        const template =
          '<span *rxIf="booleanCondition$; let v; else: elseTpl">then</span>' +
          '<ng-template #elseTpl let-e="error">else{{e}}</ng-template>';

        fixture = createTestComponent(template);
        getComponent().booleanCondition$ = throwError(() => null) as any;
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent).toBe('elsetrue');

        getComponent().booleanCondition$ = new BehaviorSubject(true);
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent).toBe('then');
      })
    );
  });
});
