import { OnDestroy } from '@angular/core';
import {
  RenderAware,
  createRenderAware,
  DEFAULT_STRATEGY_NAME
} from '@ngx-rx/core';
import {
  concat,
  EMPTY,
  NEVER,
  NextObserver,
  Observer,
  of,
  Unsubscribable
} from 'rxjs';

class RenderAwareImplementation<U> implements OnDestroy {
  public renderedValue: any = undefined;
  public error: any = undefined;
  public completed = false;
  private readonly subscription: Unsubscribable;
  public RenderAware: RenderAware<U | undefined | null>;
  resetContextObserver: NextObserver<any> = {
    next: () => (this.renderedValue = undefined)
  };
  updateViewContextObserver: Observer<any> = {
    next: (n: any) => (this.renderedValue = n),
    error: e => (this.error = e),
    complete: () => (this.completed = true)
  };

  constructor() {
    this.RenderAware = createRenderAware<U>({
      strategies: {
        [DEFAULT_STRATEGY_NAME]: {
          render: () => {},
          behaviour: () => o => o,
          name: DEFAULT_STRATEGY_NAME
        }
      },
      updateObserver: this.updateViewContextObserver,
      resetObserver: this.resetContextObserver
    });
    this.subscription = this.RenderAware.subscribe();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

let renderAwareImplementation: RenderAwareImplementation<any>;
const setupRenderAwareImplementation = () => {
  renderAwareImplementation = new RenderAwareImplementation();
  renderAwareImplementation.renderedValue = undefined;
  renderAwareImplementation.error = undefined;
  renderAwareImplementation.completed = false;
};

describe('RenderAware', () => {
  beforeEach(() => {
    setupRenderAwareImplementation();
  });

  it('should be implementable', () => {
    expect(renderAwareImplementation).toBeDefined();
  });

  describe('next value', () => {
    it('should do nothing if initialized (as no value ever was emitted)', () => {
      expect(renderAwareImplementation.renderedValue).toBe(undefined);
    });

    it('should render undefined as value when initially undefined was passed (as no value ever was emitted)', () => {
      renderAwareImplementation.RenderAware.nextPotentialObservable(undefined);
      expect(renderAwareImplementation.renderedValue).toBe(undefined);
    });

    it('should render null as value when initially null was passed (as no value ever was emitted)', () => {
      renderAwareImplementation.RenderAware.nextPotentialObservable(null);
      expect(renderAwareImplementation.renderedValue).toBe(null);
    });

    it('should render undefined as value when initially of(undefined) was passed (as undefined was emitted)', () => {
      renderAwareImplementation.RenderAware.nextPotentialObservable(
        of(undefined)
      );
      expect(renderAwareImplementation.renderedValue).toBe(undefined);
    });

    it('should render null as value when initially of(null) was passed (as null was emitted)', () => {
      renderAwareImplementation.RenderAware.nextPotentialObservable(of(null));
      expect(renderAwareImplementation.renderedValue).toBe(null);
    });

    it('should render undefined as value when initially EMPTY was passed (as no value ever was emitted)', () => {
      renderAwareImplementation.RenderAware.nextPotentialObservable(EMPTY);
      expect(renderAwareImplementation.renderedValue).toBe(undefined);
    });

    it('should render undefined as value when initially NEVER was passed (as no value ever was emitted)', () => {
      renderAwareImplementation.RenderAware.nextPotentialObservable(NEVER);
      expect(renderAwareImplementation.renderedValue).toBe(undefined);
    });
    // Also: 'should keep last emitted value in the view until a new observable NEVER was passed (as no value ever was emitted from new observable)'
    it('should render emitted value from passed observable without changing it', () => {
      renderAwareImplementation.RenderAware.nextPotentialObservable(of(42));
      expect(renderAwareImplementation.renderedValue).toBe(42);
    });

    it('should render undefined as value when a new observable NEVER was passed (as no value ever was emitted from new observable)', () => {
      renderAwareImplementation.RenderAware.nextPotentialObservable(of(42));
      expect(renderAwareImplementation.renderedValue).toBe(42);
      renderAwareImplementation.RenderAware.nextPotentialObservable(NEVER);
      expect(renderAwareImplementation.renderedValue).toBe(undefined);
    });
  });

  describe('observable context', () => {
    it('next handling running observable', () => {
      renderAwareImplementation.RenderAware.nextPotentialObservable(
        concat(of(42), NEVER)
      );
      expect(renderAwareImplementation.renderedValue).toBe(42);
      expect(renderAwareImplementation.error).toBe(undefined);
      expect(renderAwareImplementation.completed).toBe(false);
    });

    it('next handling completed observable', () => {
      renderAwareImplementation.RenderAware.nextPotentialObservable(of(42));
      expect(renderAwareImplementation.renderedValue).toBe(42);
      expect(renderAwareImplementation.error).toBe(undefined);
      expect(renderAwareImplementation.completed).toBe(true);
    });

    it('error handling', () => {
      expect(renderAwareImplementation.renderedValue).toBe(undefined);
      renderAwareImplementation.RenderAware.subscribe({
        error: (e: Error) => expect(e).toBeDefined()
      });
      expect(renderAwareImplementation.renderedValue).toBe(undefined);
      // @TODO use this line
      // expect(RenderAwareImplementation.error).toBe(ArgumentNotObservableError);
      expect(renderAwareImplementation.completed).toBe(false);
    });

    it('completion handling', () => {
      renderAwareImplementation.RenderAware.nextPotentialObservable(EMPTY);
      expect(renderAwareImplementation.renderedValue).toBe(undefined);
      expect(renderAwareImplementation.error).toBe(undefined);
      expect(renderAwareImplementation.completed).toBe(true);
    });
  });
});
