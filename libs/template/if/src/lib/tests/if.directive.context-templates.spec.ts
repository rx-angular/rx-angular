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
  interval,
  NEVER,
  of,
  Subject,
  throwError,
} from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { IfModule } from '../if.module';
import { createTestComponent, TestComponent } from './fixtures';

const ifContextTemplatesTemplate = `
    <ng-container
      *rxIf="
        value$;
        else falsy;
        suspense: suspense;
        error: error;
        complete: complete;
        nextTrigger: nextTrg$;
        suspenseTrigger: suspenseTrg$;
        errorTrigger: errorTrg$;
        completeTrigger: completeTrg$;
        contextTrigger: templateTrg$;
      "
    >
      <span class="context">next</span>
    </ng-container>
    <ng-template #suspense><span class="context">suspense</span></ng-template>
    <ng-template #complete><span class="context">complete</span></ng-template>
    <ng-template #error><span class="context">error</span></ng-template>
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
  fixture = createTestComponent(ifContextTemplatesTemplate);
  component = fixture.componentInstance;
  nativeElement = fixture.nativeElement;
};

describe('RxIf reactive context templates', () => {
  beforeAll(() => mockConsole());
  beforeEach(setupTestComponent);
  beforeEach(setUpFixture);

  describe('initial rendering', () => {
    it('should render nothing when no value is ever given', () => {
      expect(contextElement()).toBeNull();
      expect(contentElement()).toBeNull();
    });

    it('should render suspense when undefined value is given', () => {
      component.value$ = undefined;
      fixture.detectChanges();
      expectContextToBe('suspense');
      expect(contentElement()).toBeNull();
    });

    it('should render suspense when no value has passed the stream', () => {
      component.value$ = new Subject();
      fixture.detectChanges();
      expectContextToBe('suspense');
      expect(contentElement()).toBeNull();
    });

    it('should render suspense when observable is NEVER', () => {
      component.value$ = NEVER;
      fixture.detectChanges();
      expectContextToBe('suspense');
      expect(contentElement()).toBeNull();
    });

    it('should render "complete" when truthy observable completes', () => {
      component.value$ = of(1);
      fixture.detectChanges();
      expect(contentElement()).toBeNull();
      expectContextToBe('complete');
    });

    it('should render "error" template on truthy observable error', () => {
      component.value$ = concat(
        of(true),
        throwError(() => new Error('test error'))
      );
      fixture.detectChanges();
      expectContextToBe('error');
      expect(contentElement()).toBeNull();
    });
  });

  describe('ongoing rendering', () => {
    it('should render suspense when switching from no value to an observable that emits no value', () => {
      expect(contentElement()).toBeNull();
      expect(contextElement()).toBeNull();
      component.value$ = new Subject();
      fixture.detectChanges();
      expect(contentElement()).toBeNull();
      expectContextToBe('suspense');
    });

    it('should render suspense when switching from value to undefined', () => {
      component.value$ = new BehaviorSubject<number>(1);
      fixture.detectChanges();
      expectContextToBe('next');
      expect(contentElement()).toBeNull();
      component.value$ = undefined;
      fixture.detectChanges();
      expectContextToBe('suspense');
      expect(contentElement()).toBeNull();
    });

    it('should render suspense when switching from value to undefined (Observable)', () => {
      const value$ = new BehaviorSubject<number>(1);
      component.value$ = value$;
      fixture.detectChanges();
      expectContextToBe('next');
      expect(contentElement()).toBeNull();
      value$.next(undefined);
      expectContextToBe('suspense');
      expect(contentElement()).toBeNull();
    });

    it(
      'should render "suspense"->"next"->"complete" contexts and update view context for the full observable' +
        ' lifecycle',
      fakeAsync(() => {
        component.value$ = interval(1000).pipe(
          map(() => true),
          take(2)
        );
        fixture.detectChanges();
        expect(contentElement()).toBeNull();
        expectContextToBe('suspense');

        tick(1000);
        expect(contentElement()).toBeNull();
        expectContextToBe('next');

        tick(1000);
        // the last emitted value ('2') and complete notification are in sync
        // so we expect "complete" here
        expect(contentElement()).toBeNull();
        expectContextToBe('complete');
      })
    );
  });

  describe('trigger', () => {
    beforeEach(() => {
      component.value$ = new BehaviorSubject(true);
      fixture.detectChanges();
    });

    it('should render suspense', () => {
      component.suspenseTrg$.next();
      expectContextToBe('suspense');
    });

    it('should render complete', () => {
      component.completeTrg$.next();
      expectContextToBe('complete');
    });

    it('should render error', () => {
      component.errorTrg$.next();
      expectContextToBe('error');
    });

    it('should render next->suspense->error->complete', () => {
      expectContextToBe('next');
      component.templateTrg$.next(RxNotificationKind.Suspense);
      expectContextToBe('suspense');
      component.templateTrg$.next(RxNotificationKind.Error);
      expectContextToBe('error');
      component.templateTrg$.next(RxNotificationKind.Complete);
      expectContextToBe('complete');
    });

    it('should not switch to next when value is falsy without else template', () => {
      expectContextToBe('next');
      (component.value$ as any).next(false);
      expect(contextElement()).toBeNull();
      component.templateTrg$.next(RxNotificationKind.Next);
      expect(contextElement()).toBeNull();
    });
  });
});

function expectContextToBe(content: string): void {
  expect(contextElement().textContent.trim()).toBe(content);
}
