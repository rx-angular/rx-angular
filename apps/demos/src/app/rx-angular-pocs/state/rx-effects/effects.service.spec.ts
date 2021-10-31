import { Component, ErrorHandler } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { BehaviorSubject, EMPTY, Observable, throwError } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { RxEffects } from './effects.service';

// tslint:disable: max-classes-per-file

type TState = string;

class Store {
  state$ = new BehaviorSubject<TState>('');

  select<TResult>(selector: (store: TState) => TResult): Observable<TResult> {
    return this.state$.pipe(map(selector));
  }
}

const selector1 = (state: TState) => `${state}1`;
const selector2 = (state: TState) => `${state}2`;
const selector3 = (state: TState) => `${state}3`;
const selector4 = (state: TState) => `${state}4`;

class Service {
  method1(..._: any[]): void {}
  method2(..._: any[]): void {}
  method3(..._: any[]): void {}
  method4(..._: any[]): void {}
  method4OnError(..._: any[]): void {}
  method4OnComplete(..._: any[]): void {}
}

// tslint:disable-next-line: prefer-on-push-component-change-detection  use-component-selector
@Component({
  template: '',
  providers: [RxEffects],
})
class TestComponent {
  constructor(store: Store, service: Service, effects: RxEffects) {
    effects.register(store.select(selector1), service.method1);
    effects.register(store.select(selector2).pipe(tap(service.method2)));
    effects.register(store.select(selector3).subscribe(service.method3));
    effects.register(store.select(selector4), {
      next: service.method4,
      error: service.method4OnError,
      complete: service.method4OnComplete,
    });
  }
}

// tslint:disable-next-line: prefer-on-push-component-change-detection  use-component-selector
@Component({
  template: '',
  providers: [RxEffects],
})
class TestUnregisterComponent {
  private readonly effectId1: number;
  private readonly effectId2: number;

  constructor(
    store: Store,
    service: Service,
    private readonly effects: RxEffects
  ) {
    this.effectId1 = effects.register(store.select(selector1), service.method1);
    this.effectId2 = effects.register(
      store.select(selector2).pipe(tap(service.method2))
    );
  }

  cancelEffect1(): void {
    this.effects.unregister(this.effectId1);
  }

  cancelEffect2(): void {
    this.effects.unregister(this.effectId2);
  }
}

describe('RxEffects', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('should invoke callback for each value emitted', () => {
    const service = {
      method1: jest.fn(),
      method2: jest.fn(),
      method3: jest.fn(),
      method4: jest.fn(),
    };
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      providers: [Store, { provide: Service, useValue: service }],
      teardown: { destroyAfterEach: true },
    });
    TestBed.createComponent(TestComponent);
    const store = TestBed.inject(Store);

    store.state$.next('foo');

    expect(service.method1).toHaveBeenCalledWith('foo1');
    expect(service.method2).toHaveBeenCalledWith('foo2');
    expect(service.method3).toHaveBeenCalledWith('foo3');
    expect(service.method4).toHaveBeenCalledWith('foo4');

    store.state$.next('bar');

    expect(service.method1).toHaveBeenCalledWith('bar1');
    expect(service.method2).toHaveBeenCalledWith('bar2');
    expect(service.method3).toHaveBeenCalledWith('bar3');
    expect(service.method4).toHaveBeenCalledWith('bar4');
  });

  test('should unsubscribe when component is destroyed', () => {
    const service = {
      method1: jest.fn(),
      method2: jest.fn(),
      method3: jest.fn(),
      method4: jest.fn(),
    };
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      providers: [Store, { provide: Service, useValue: service }],
      teardown: { destroyAfterEach: true },
    });
    const fixture = TestBed.createComponent(TestComponent);
    const store = TestBed.inject(Store);

    store.state$.next('foo');

    expect(service.method1).toHaveBeenCalledWith('foo1');
    expect(service.method2).toHaveBeenCalledWith('foo2');
    expect(service.method3).toHaveBeenCalledWith('foo3');
    expect(service.method4).toHaveBeenCalledWith('foo4');

    service.method1.mockClear();
    service.method2.mockClear();
    service.method3.mockClear();
    service.method4.mockClear();

    fixture.destroy();

    store.state$.next('bar');

    expect(service.method1).not.toHaveBeenCalled();
    expect(service.method2).not.toHaveBeenCalled();
    expect(service.method3).not.toHaveBeenCalled();
    expect(service.method4).not.toHaveBeenCalled();
  });

  test('should isolate errors and invoke provided ErrorHandler', () => {
    const service = {
      method1: () => {
        throw new Error('something went wrong');
      },
      method2: jest.fn(),
      method3: jest.fn(),
      method4: jest.fn(),
    };
    const customErrorHandler: ErrorHandler = {
      handleError: jest.fn(),
    };
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      providers: [
        Store,
        { provide: Service, useValue: service },
        {
          provide: ErrorHandler,
          useValue: customErrorHandler,
        },
      ],
      teardown: { destroyAfterEach: true },
    });
    TestBed.createComponent(TestComponent);
    const store = TestBed.inject(Store);

    store.state$.next('foo');

    expect(customErrorHandler.handleError).toHaveBeenCalledWith(
      new Error('something went wrong')
    );

    expect(service.method2).toHaveBeenCalledWith('foo2');
    expect(service.method3).toHaveBeenCalledWith('foo3');
    expect(service.method4).toHaveBeenCalledWith('foo4');
  });

  test('should invoke complete callback upon completion', () => {
    const service = {
      method1: () => {},
      method2: () => {},
      method3: () => {},
      method4: () => {},
      method4OnComplete: jest.fn(),
    };
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      providers: [Store, { provide: Service, useValue: service }],
      teardown: { destroyAfterEach: true },
    });
    TestBed.createComponent(TestComponent);
    const store = TestBed.inject(Store);

    store.state$.next('foo');
    store.state$.next('bar');

    expect(service.method4OnComplete).not.toHaveBeenCalled();

    store.state$.complete();

    expect(service.method4OnComplete).toHaveBeenCalled();
  });

  test('should invoke error callback when source observable errors', () => {
    const service = {
      method1: () => {},
      method2: () => {},
      method3: () => {},
      method4: () => {},
      method4OnError: jest.fn(),
    };
    jest
      .spyOn(Store.prototype, 'select')
      .mockImplementation((selector) =>
        selector === selector4
          ? throwError(new Error('something went wrong'))
          : EMPTY
      );
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      providers: [
        Store,
        { provide: Service, useValue: service },
        { provide: ErrorHandler, useValue: { handleError: () => {} } },
      ],
      teardown: { destroyAfterEach: true },
    });
    TestBed.createComponent(TestComponent);
    const store = TestBed.inject(Store);

    store.state$.next('foo');

    expect(service.method4OnError).toHaveBeenCalledWith(
      new Error('something went wrong')
    );
  });

  test('should cancel side-effect if unregistered imperatively', () => {
    const service = {
      method1: jest.fn(),
      method2: jest.fn(),
    };
    TestBed.configureTestingModule({
      declarations: [TestUnregisterComponent],
      providers: [Store, { provide: Service, useValue: service }],
      teardown: { destroyAfterEach: true },
    });
    const fixture = TestBed.createComponent(TestUnregisterComponent);
    const component = fixture.componentInstance;
    const store = TestBed.inject(Store);

    store.state$.next('foo');

    expect(service.method1).toHaveBeenCalledWith('foo1');
    expect(service.method2).toHaveBeenCalledWith('foo2');

    service.method1.mockClear();
    service.method2.mockClear();
    component.cancelEffect1();
    store.state$.next('bar');

    expect(service.method1).not.toHaveBeenCalled();
    expect(service.method2).toHaveBeenCalledWith('bar2');

    service.method1.mockClear();
    service.method2.mockClear();
    component.cancelEffect2();
    store.state$.next('baz');

    expect(service.method1).not.toHaveBeenCalled();
    expect(service.method2).not.toHaveBeenCalled();
  });
});
