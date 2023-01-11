import {
  ChangeDetectorRef,
  Component,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { RxNotificationKind } from '@rx-angular/cdk/notifications';
import { RX_RENDER_STRATEGIES_CONFIG } from '@rx-angular/cdk/render-strategies';
import { mockConsole } from '@test-helpers';
import {
  BehaviorSubject,
  EMPTY,
  interval,
  NEVER,
  Observable,
  of,
  Subject,
  throwError,
} from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { LetDirective } from '../let.directive';
import { MockChangeDetectorRef } from './fixtures';

@Component({
  template: `
    <ng-container
      *rxLet="
        value$;
        let value;
        nextTrigger: nextTrg;
        suspense: suspense;
        suspenseTrigger: suspenseTrg;
        error: error;
        errorTrigger: errorTrg;
        complete: complete;
        completeTrigger: completeTrg;
        contextTrigger: trg
      "
      >{{
        value === undefined
          ? 'undefined'
          : value === null
          ? 'null'
          : (value | json)
      }}</ng-container
    >

    <ng-template #complete>complete</ng-template>
    <ng-template #error>error</ng-template>
    <ng-template #suspense>suspense</ng-template>
  `,
})
class LetDirectiveAllTemplatesTestComponent {
  value$: Observable<number> = of(1);
  completeTrg = new Subject<void>();
  nextTrg = new Subject<void>();
  suspenseTrg = new Subject<void>();
  errorTrg = new Subject<void>();
  trg = new Subject<RxNotificationKind>();
}

let fixture: ComponentFixture<LetDirectiveAllTemplatesTestComponent>;
let component: LetDirectiveAllTemplatesTestComponent;
let nativeElement: HTMLElement;

const setupTestComponent = () => {
  TestBed.configureTestingModule({
    declarations: [LetDirectiveAllTemplatesTestComponent, LetDirective],
    providers: [
      { provide: ChangeDetectorRef, useClass: MockChangeDetectorRef },
      TemplateRef,
      ViewContainerRef,
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
    teardown: { destroyAfterEach: true },
  });
};

const setUpFixture = () => {
  fixture = TestBed.createComponent(LetDirectiveAllTemplatesTestComponent);
  component = fixture.componentInstance;
  nativeElement = fixture.nativeElement;
};

describe('LetDirective reactive context templates', () => {
  beforeAll(() => mockConsole());
  beforeEach(setupTestComponent);
  beforeEach(setUpFixture);

  it('should be initiated', () => {
    expect(component).toBeDefined();
  });

  it('should render "suspense" template before the first value is emitted', () => {
    component.value$ = new Subject();
    fixture.detectChanges();
    expectContentToBe('suspense');
  });

  it('should render "complete" template on the observable completion', () => {
    // The resulting synchronous notification sequence is: 1,2,3,complete
    component.value$ = of(1, 2, 3);
    fixture.detectChanges();
    expectContentToBe('complete');
  });

  it('should render "error" template on observable error', () => {
    component.value$ = throwError(() => new Error('test error'));
    fixture.detectChanges();
    expectContentToBe('error');
  });

  it('should render "suspense"->"next"->"complete" templates and update view context for the full observable lifecycle', fakeAsync(() => {
    component.value$ = interval(1000).pipe(take(3));
    fixture.detectChanges();
    expectContentToBe('suspense');

    tick(1000);
    expectContentToBe('0');

    tick(1000);
    expectContentToBe('1');

    tick(1000);
    // the last emitted value ('2') and complete notification are in sync
    // so we expect "complete" here
    expectContentToBe('complete');
  }));

  it('should render "complete" template when observable completes immediately (by passing EMPTY)', () => {
    component.value$ = EMPTY;
    fixture.detectChanges();
    expectContentToBe('complete');
  });

  it('should render "suspense" template when observable never emits (by passing NEVER)', () => {
    component.value$ = NEVER;
    fixture.detectChanges();
    expectContentToBe('suspense');
  });

  it('should have `ngTemplateContextGuard` defined', () => {
    expect(LetDirective.ngTemplateContextGuard).toBeDefined();
    expect(
      LetDirective.ngTemplateContextGuard({} as LetDirective<any>, {})
    ).toBe(true);
  });

  describe('triggers', () => {
    beforeEach(() => {
      component.value$ = new BehaviorSubject(1);
      fixture.detectChanges();
    });

    it('should render suspense', () => {
      component.suspenseTrg.next();
      expectContentToBe('suspense');
    });

    it('should render complete', () => {
      component.completeTrg.next();
      expectContentToBe('complete');
    });

    it('should render error', () => {
      component.errorTrg.next();
      expectContentToBe('error');
    });

    it('should render "suspense"->"complete"->"error"->"next" templates', () => {
      component.suspenseTrg.next();
      expectContentToBe('suspense');
      component.completeTrg.next();
      expectContentToBe('complete');
      component.errorTrg.next();
      expectContentToBe('error');
      component.nextTrg.next();
      expectContentToBe('1');

      component.trg.next(RxNotificationKind.Suspense);
      expectContentToBe('suspense');
      component.trg.next(RxNotificationKind.Complete);
      expectContentToBe('complete');
      component.trg.next(RxNotificationKind.Error);
      expectContentToBe('error');
      component.trg.next(RxNotificationKind.Next);
      expectContentToBe('1');
    });
  });
});

function expectContentToBe(content: string): void {
  expect(nativeElement.textContent).toBe(content);
}
