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
        let s = suspense;
        let e = error;
        let c = complete
      "
    >
      <span class="value">
        {{
          value === undefined
            ? 'undefined'
            : value === null
            ? 'null'
            : (value | json)
        }}
      </span>
      <span class="context">{{
        s ? 'suspense' : e ? 'error' : c ? 'complete' : ''
      }}</span>
    </ng-container>
  `,
})
class LetDirectiveTestComponent {
  value$: Observable<number>;
}

let fixture: ComponentFixture<LetDirectiveTestComponent>;
let component: LetDirectiveTestComponent;
let nativeElement: HTMLElement;
const contextElement = (): HTMLElement =>
  nativeElement.querySelector('.context');
const contentElement = (): HTMLElement => nativeElement.querySelector('.value');

const setupTestComponent = () => {
  TestBed.configureTestingModule({
    declarations: [LetDirectiveTestComponent, LetDirective],
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
  });
};

const setUpFixture = () => {
  fixture = TestBed.createComponent(LetDirectiveTestComponent);
  component = fixture.componentInstance;
  nativeElement = fixture.nativeElement;
};

describe('LetDirective reactive context variables', () => {
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

    it('should render suspense when undefined value has passed the stream', () => {
      component.value$ = new BehaviorSubject(undefined);
      fixture.detectChanges();
      expectContextToBe('suspense');
      expectContentToBe('undefined');
    });

    it('should render "complete" template on the observable completion', () => {
      // The resulting synchronous notification sequence is: 1,2,3,complete
      component.value$ = of(1, 2, 3);
      fixture.detectChanges();
      expectContentToBe('3');
      expectContextToBe('complete');
    });

    it('should render "error" template on observable error', () => {
      component.value$ = throwError(() => new Error('test error'));
      fixture.detectChanges();
      expectContextToBe('error');
      expectContentToBe('undefined');
    });

    it('should render "complete" template when observable completes immediately (by passing EMPTY)', () => {
      component.value$ = EMPTY;
      fixture.detectChanges();
      expectContextToBe('complete');
      expectContentToBe('undefined');
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
      expectContextToBe('');
      expectContentToBe('1');
      component.value$ = undefined;
      fixture.detectChanges();
      expectContextToBe('suspense');
      expectContentToBe('undefined');
    });

    it('should show suspense context when switching from value to undefined (Observable)', () => {
      const value$ = new BehaviorSubject<number>(1);
      component.value$ = value$;
      fixture.detectChanges();
      expectContextToBe('');
      expectContentToBe('1');
      value$.next(undefined);
      expectContextToBe('suspense');
      expectContentToBe('undefined');
    });

    it('should render "next"->"complete" contexts and update view context for the full observable lifecycle', fakeAsync(() => {
      component.value$ = interval(1000).pipe(take(3));
      fixture.detectChanges();
      expect(contentElement()).toBeNull();
      expect(contextElement()).toBeNull();

      tick(1000);
      expectContentToBe('0');
      expectContextToBe('');

      tick(1000);
      expectContentToBe('1');
      expectContextToBe('');

      tick(1000);
      // the last emitted value ('2') and complete notification are in sync
      // so we expect "complete" here
      expectContextToBe('complete');
      expectContentToBe('2');
    }));
  });
});

function expectContextToBe(content: string): void {
  expect(contextElement().textContent.trim()).toBe(content);
}

function expectContentToBe(content: string): void {
  expect(contentElement().textContent.trim()).toBe(content);
}
