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
  concat,
  EMPTY,
  interval,
  NEVER,
  of,
  Subject,
  throwError,
} from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { IfModule } from '../if.module';
import { createTestComponent, TestComponent } from './fixtures';

const ifContextTemplate = `
    <ng-container
      *rxIf="
        value$;
        else falsy;
        let s = suspense;
        let e = error;
        let c = complete;
        nextTrigger: nextTrg$;
        suspenseTrigger: suspenseTrg$;
        errorTrigger: errorTrg$;
        completeTrigger: completeTrg$;
        contextTrigger: templateTrg$;
      "
    >
      <span class="value">truthy</span>
      <span class="context">{{
        s ? 'suspense' : e ? 'error' : c ? 'complete' : 'next'
      }}</span>
    </ng-container>
    <ng-template #falsy let-s="suspense" let-e="error" let-c="complete">
      <span class="value">falsy</span>
      <span class="context">{{
        s ? 'suspense' : e ? 'error' : c ? 'complete' : 'next'
      }}</span>
    </ng-template>
  `;

let fixture: ComponentFixture<TestComponent>;
let component: TestComponent;
let nativeElement: HTMLElement;
const contextElement = (): HTMLElement =>
  nativeElement.querySelector('.context');
const contentElement = (): HTMLElement => nativeElement.querySelector('.value');

const setupTestComponent = () => {
  TestBed.configureTestingModule({
    declarations: [TestComponent],
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
    imports: [IfModule],
  });
};

const setUpFixture = () => {
  fixture = createTestComponent(ifContextTemplate);
  component = fixture.componentInstance;
  nativeElement = fixture.nativeElement;
};

describe('RxIf reactive context variables', () => {
  beforeAll(() => mockConsole());
  beforeEach(setupTestComponent);
  beforeEach(setUpFixture);

  describe('initial rendering', () => {
    it('should render nothing when no value is given', () => {
      expect(contentElement()).toBeNull();
      expect(contextElement()).toBeNull();
    });

    it('should render nothing when undefined value is given', () => {
      component.value$ = undefined;
      fixture.detectChanges();
      expect(contentElement()).toBeNull();
      expect(contextElement()).toBeNull();
    });

    it('should render nothing when no value has passed the stream', () => {
      component.value$ = new Subject();
      fixture.detectChanges();
      expect(contentElement()).toBeNull();
      expect(contextElement()).toBeNull();
    });

    it('should render nothing when observable is NEVER', () => {
      component.value$ = NEVER;
      fixture.detectChanges();
      expect(contentElement()).toBeNull();
      expect(contextElement()).toBeNull();
    });

    describe('else', () => {
      it('should render suspense when undefined value has passed the stream', () => {
        component.value$ = new BehaviorSubject(undefined);
        fixture.detectChanges();
        expectContextToBe('suspense');
        expectContentToBe('falsy');
      });

      it('should render "complete" when falsy observable completes', () => {
        component.value$ = EMPTY;
        fixture.detectChanges();
        expectContextToBe('complete');
        expectContentToBe('falsy');
      });

      it('should render "error" template on falsy observable error', () => {
        component.value$ = throwError(() => new Error('test error'));
        fixture.detectChanges();
        expectContextToBe('error');
        expectContentToBe('falsy');
      });
    });

    describe('then', () => {
      it('should render "complete" when truthy observable completes', () => {
        component.value$ = of(1);
        fixture.detectChanges();
        expectContentToBe('truthy');
        expectContextToBe('complete');
      });

      it('should render "error" template on truthy observable error', () => {
        component.value$ = concat(
          of(true),
          throwError(() => new Error('test error'))
        );
        fixture.detectChanges();
        expectContextToBe('error');
        expectContentToBe('truthy');
      });
    });
  });

  describe('ongoing rendering', () => {
    it('should render nothing when switching from undefined to an observable that emits no value', () => {
      expect(contentElement()).toBeNull();
      expect(contextElement()).toBeNull();
      component.value$ = new Subject();
      fixture.detectChanges();
      expect(contentElement()).toBeNull();
      expect(contextElement()).toBeNull();
    });

    it('should show suspense context when switching from value to undefined', () => {
      component.value$ = new BehaviorSubject<number>(1);
      fixture.detectChanges();
      expectContextToBe('next');
      expectContentToBe('truthy');
      component.value$ = undefined;
      fixture.detectChanges();
      expectContextToBe('suspense');
      expectContentToBe('falsy');
    });

    it('should show suspense context when switching from value to undefined (Observable)', () => {
      const value$ = new BehaviorSubject<number>(1);
      component.value$ = value$;
      fixture.detectChanges();
      expectContextToBe('next');
      expectContentToBe('truthy');
      value$.next(undefined);
      expectContextToBe('suspense');
      expectContentToBe('falsy');
    });

    it('should render "next"->"complete" contexts and update view context for the full observable lifecycle', fakeAsync(() => {
      component.value$ = interval(1000).pipe(
        map(() => true),
        take(2)
      );
      fixture.detectChanges();
      expect(contentElement()).toBeNull();
      expect(contextElement()).toBeNull();

      tick(1000);
      expectContentToBe('truthy');
      expectContextToBe('next');

      tick(1000);
      // the last emitted value ('2') and complete notification are in sync
      // so we expect "complete" here
      expectContentToBe('truthy');
      expectContextToBe('complete');
    }));
  });

  describe('trigger', () => {
    describe.each([[true], [false]])('condition: %p', (condition) => {
      const templateName = condition ? 'truthy' : 'falsy';

      beforeEach(() => {
        component.value$ = new BehaviorSubject(condition);
        fixture.detectChanges();
      });

      it('should render suspense', () => {
        component.suspenseTrg$.next();
        expectContentToBe(templateName);
        expectContextToBe('suspense');
      });

      it('should render complete', () => {
        component.completeTrg$.next();
        expectContentToBe(templateName);
        expectContextToBe('complete');
      });

      it('should render error', () => {
        component.errorTrg$.next();
        expectContentToBe(templateName);
        expectContextToBe('error');
      });

      it('should render next->suspense->error->complete', () => {
        expectContentToBe(templateName);
        expectContextToBe('next');
        component.templateTrg$.next(RxNotificationKind.Suspense);
        expectContentToBe(templateName);
        expectContextToBe('suspense');
        component.templateTrg$.next(RxNotificationKind.Error);
        expectContentToBe(templateName);
        expectContextToBe('error');
        component.templateTrg$.next(RxNotificationKind.Complete);
        expectContentToBe(templateName);
        expectContextToBe('complete');
      });
    });
  });
});

function expectContextToBe(content: string): void {
  expect(contextElement().textContent.trim()).toBe(content);
}

function expectContentToBe(content: string): void {
  expect(contentElement().textContent.trim()).toBe(content);
}
