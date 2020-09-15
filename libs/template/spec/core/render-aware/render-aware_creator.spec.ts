import { OnDestroy } from '@angular/core';
import {
  concat,
  EMPTY,
  NEVER,
  NextObserver,
  Observable,
  Observer,
  of,
  Subject,
  throwError,
  Unsubscribable
} from 'rxjs';
import { startWith, tap } from 'rxjs/operators';
import { TestScheduler } from 'rxjs/testing';
import { createRenderAware, RenderAware, StrategySelection } from '../../../src/lib/core';
import { DEFAULT_STRATEGY_NAME } from '../../../src/lib/render-strategies/strategies/strategies-map';
// tslint:disable-next-line:nx-enforce-module-boundaries
import { jestMatcher, mockConsole } from '@test-helpers';
import createSpy = jasmine.createSpy;
import { RxTemplateObserver } from '../../../src/lib/core/model';


// TODO: Add Angular decorator.
class CdAwareImplementation<U> implements OnDestroy {
  public renderedValue: any = undefined;
  public error: any = undefined;
  public completed = false;
  private readonly subscription: Unsubscribable;
  public cdAware: RenderAware<U | undefined | null>;

  templateObserver: RxTemplateObserver<U | undefined | null> = {
    suspense: () => {
      (this.renderedValue = undefined)
    },
    next: (n: U | undefined | null) => {
      this.renderedValue = n;
    },
    error: e => (this.error = e),
    complete: () => (this.completed = true)
  };

  constructor(strategySelection: StrategySelection) {
    this.cdAware = createRenderAware<U>({
      strategies: strategySelection,
      templateObserver: this.templateObserver
    });
    this.cdAware.nextStrategy(DEFAULT_STRATEGY_NAME);
    this.subscription = this.cdAware.subscribe();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

let cdAwareImplementation: CdAwareImplementation<any>;
let strategies: StrategySelection;
const setupCdAwareImplementation = () => {
  strategies = {
    [DEFAULT_STRATEGY_NAME]: {
      name: DEFAULT_STRATEGY_NAME,
      detectChanges: createSpy('detectChanges'),
      scheduleCD: () => new AbortController(),
      rxScheduleCD: createSpy('rxScheduleCD').and.callFake(o => o)
    },
    testStrat: {
      name: 'testStrat',
      detectChanges: createSpy('detectChanges'),
      scheduleCD: () => new AbortController(),
      rxScheduleCD: createSpy('rxScheduleCD').and.callFake(o => o)
    }
  };
  cdAwareImplementation = new CdAwareImplementation(strategies);
  cdAwareImplementation.renderedValue = undefined;
  cdAwareImplementation.error = undefined;
  cdAwareImplementation.completed = false;
};


describe('CdAware', () => {
  beforeAll(() => mockConsole());

  beforeEach(() => {
    setupCdAwareImplementation();
  });

  it('should be defined', () => {
    expect(cdAwareImplementation).toBeDefined();
  });

  describe('next value', () => {
    it('should do nothing if initialized (as no value ever was emitted)', () => {
      expect(cdAwareImplementation.renderedValue).toBe(undefined);
    });

    it('should render undefined as value when initially undefined was passed (as no value ever was emitted)', () => {
      cdAwareImplementation.cdAware.nextPotentialObservable(undefined);
      expect(cdAwareImplementation.renderedValue).toBe(undefined);
    });

    it('should render null as value when initially null was passed (as no value ever was emitted)', () => {
      cdAwareImplementation.cdAware.nextPotentialObservable(null);
      expect(cdAwareImplementation.renderedValue).toBe(null);
    });

    it('should render undefined as value when initially of(undefined) was passed (as undefined was emitted)', () => {
      cdAwareImplementation.cdAware.nextPotentialObservable(of(undefined));
      expect(cdAwareImplementation.renderedValue).toBe(undefined);
    });

    it('should render undefined as value when next value undefined was passed (as undefined was emitted)', () => {
      cdAwareImplementation.cdAware.nextPotentialObservable(of(1));
      cdAwareImplementation.cdAware.nextPotentialObservable(undefined);
      expect(cdAwareImplementation.renderedValue).toBe(undefined);
    });

    it('should render null as value when initially of(null) was passed (as null was emitted)', () => {
      cdAwareImplementation.cdAware.nextPotentialObservable(of(null));
      expect(cdAwareImplementation.renderedValue).toBe(null);
    });

    it('should render undefined as value when initially EMPTY was passed (as no value ever was emitted)', () => {
      cdAwareImplementation.cdAware.nextPotentialObservable(EMPTY);
      expect(cdAwareImplementation.renderedValue).toBe(undefined);
    });

    it('should render undefined as value when initially NEVER was passed (as no value ever was emitted)', () => {
      cdAwareImplementation.cdAware.nextPotentialObservable(NEVER);
      expect(cdAwareImplementation.renderedValue).toBe(undefined);
    });
    // Also: 'should keep last emitted value in the view until a new observable NEVER was passed (as no value ever was
    // emitted from new observable)'
    it('should render emitted value from passed observable without changing it', () => {
      cdAwareImplementation.cdAware.nextPotentialObservable(of(42));
      expect(cdAwareImplementation.renderedValue).toBe(42);
    });

    it(
      'should render undefined as value when a new observable NEVER was passed (as no value ever was emitted from new observable)',
      () => {
        cdAwareImplementation.cdAware.nextPotentialObservable(of(42));
        expect(cdAwareImplementation.renderedValue).toBe(42);
        cdAwareImplementation.cdAware.nextPotentialObservable(NEVER);
        expect(cdAwareImplementation.renderedValue).toBe(undefined);
      }
    );
  });

  describe('observable context', () => {
    // TODO: naming? What's this test for? I don't understand
    it('next handling running observable', () => {
      cdAwareImplementation.cdAware.nextPotentialObservable(
        concat(of(42), NEVER)
      );
      expect(cdAwareImplementation.renderedValue).toBe(42);
      expect(cdAwareImplementation.error).toBe(undefined);
      expect(cdAwareImplementation.completed).toBe(false);
    });

    it('next handling completed observable', () => {
      cdAwareImplementation.cdAware.nextPotentialObservable(of(42));
      expect(cdAwareImplementation.renderedValue).toBe(42);
      expect(cdAwareImplementation.error).toBe(undefined);
      expect(cdAwareImplementation.completed).toBe(true);
    });

    it('error handling', () => {
      expect(cdAwareImplementation.renderedValue).toBe(undefined);
      const error = new Error();
      cdAwareImplementation.cdAware.nextPotentialObservable(throwError(error));
      expect(cdAwareImplementation.renderedValue).toBe(undefined);
      // @TODO use this line: why?
      // expect(cdAwareImplementation.error).toBe(ArgumentNotObservableError);
      expect(cdAwareImplementation.error).toBe(error);
      expect(console.error).toHaveBeenCalledWith(error);
      expect(cdAwareImplementation.completed).toBe(false);
    });

    it('completion handling', () => {
      cdAwareImplementation.cdAware.nextPotentialObservable(EMPTY);
      expect(cdAwareImplementation.renderedValue).toBe(undefined);
      expect(cdAwareImplementation.error).toBe(undefined);
      expect(cdAwareImplementation.completed).toBe(true);
    });
  });

  describe('strategy handling', () => {
    it('should handle strategy switching', () => {
      const values = new Subject();
      const value$ = values.pipe(startWith(1), tap(console.log));
      cdAwareImplementation.cdAware.nextPotentialObservable(
        value$
      );
      expect(cdAwareImplementation.renderedValue).toBe(1);
      expect(strategies[DEFAULT_STRATEGY_NAME].rxScheduleCD).toHaveBeenCalled();
      cdAwareImplementation.cdAware.nextStrategy('testStrat');
      values.next(2);
      expect(strategies.testStrat.rxScheduleCD).toHaveBeenCalled();
      expect(cdAwareImplementation.renderedValue).toBe(2);
      expect(cdAwareImplementation.error).toBe(undefined);
      expect(cdAwareImplementation.completed).toBe(false);
    });

    it('should handle strategy switching with observable', () => {
      const values = new Subject();
      const value$ = values.pipe(startWith(1), tap(console.log));
      cdAwareImplementation.cdAware.nextPotentialObservable(
        value$
      );
      expect(cdAwareImplementation.renderedValue).toBe(1);
      expect(strategies[DEFAULT_STRATEGY_NAME].rxScheduleCD).toHaveBeenCalled();
      cdAwareImplementation.cdAware.nextStrategy(of('testStrat'));
      values.next(2);
      expect(strategies.testStrat.rxScheduleCD).toHaveBeenCalled();
      expect(cdAwareImplementation.renderedValue).toBe(2);
      expect(cdAwareImplementation.error).toBe(undefined);
      expect(cdAwareImplementation.completed).toBe(false);
    });

    it('should handle subscriptions with ongoing observables', () => {
      const values = new Subject();
      let subscribers = 0;
      const v$ = new Observable(subscriber => {
        subscribers++;
        values.pipe(startWith(1)).subscribe(innerValue => {
          subscriber.next(innerValue);
        });
      });
      cdAwareImplementation.cdAware.nextPotentialObservable(v$);
      expect(cdAwareImplementation.renderedValue).toBe(1);
      values.next(2);
      expect(cdAwareImplementation.renderedValue).toBe(2);
      cdAwareImplementation.cdAware.nextStrategy('testStrat');
      expect(cdAwareImplementation.renderedValue).toBe(2);
      values.next(3);
      expect(cdAwareImplementation.renderedValue).toBe(3);
      expect(cdAwareImplementation.error).toBe(undefined);
      expect(cdAwareImplementation.completed).toBe(false);
      expect(subscribers).toBe(1);
    });

    it('should throw an error when a non-existent strategy was provided', () => {
      const testScheduler: TestScheduler = new TestScheduler(jestMatcher);
      testScheduler.run(({ expectObservable }) => {
        const strategy = 'doesNotExist';
        cdAwareImplementation.cdAware.nextStrategy(strategy);
        expectObservable(cdAwareImplementation.cdAware.activeStrategy$).toBe('#', null, new Error(`Strategy ${strategy} does not exist.`));
      })
    });
  });
});
