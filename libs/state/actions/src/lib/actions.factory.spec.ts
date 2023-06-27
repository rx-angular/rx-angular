// eslint-disable-next-line @nx/enforce-module-boundaries
import { mockConsole } from '@test-helpers';
import { RxActionFactory } from './actions.factory';
import { isObservable } from 'rxjs';
import { Component, ErrorHandler, Provider } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ActionTransforms } from '@rx-angular/state/actions';

/** @test {RxActionFactory} */
describe('RxActionFactory', () => {
  beforeAll(() => mockConsole());

  it('should get created properly', () => {
    const actions = setupComponent<UiActions>().component.actions;
    expect(typeof actions.prop).toBe('function');
    expect(isObservable(actions.prop)).toBeFalsy();
    expect(isObservable(actions.prop$)).toBeTruthy();
  });

  it('should emit on the subscribed channels', (done) => {
    const values = 'foo';
    const actions = setupComponent<UiActions>().component.actions;
    const exp = values;
    actions.prop$.subscribe((result) => {
      expect(result).toBe(exp);
      done();
    });
    actions.prop(values);
  });

  it('should maintain channels per create call', (done) => {
    const values = 'foo';
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const nextSpy = jest.spyOn({ nextSpy: (_: string) => void 0 }, 'nextSpy');
    const component = setupComponent<UiActions>().component;
    const actions = component.actions;
    const actions2 = component.actions2;
    const exp = values;

    actions2.prop$.subscribe(nextSpy as unknown as (_: string) => void);
    actions.prop$.subscribe((result) => {
      expect(result).toBe(exp);
      done();
    });
    expect(nextSpy).not.toHaveBeenCalled();
    actions.prop(values);
  });

  it('should emit and transform on the subscribed channels', (done) => {
    const actions = setupComponent<UiActions>({
      transformFns: {
        prop: () => 'transformed',
      },
    }).component.actions;
    const exp = 'transformed';
    actions.prop$.subscribe((result) => {
      expect(result).toBe(exp);
      done();
    });
    actions.prop();
  });

  it('should emit on multiple subscribed channels', (done) => {
    const value1 = 'foo';
    const value2 = 'bar';
    const actions = setupComponent<UiActions>().component.actions;
    const res = {};
    actions.prop$.subscribe((result) => {
      res['prop'] = result;
    });
    actions.prop2$.subscribe((result) => {
      res['prop2'] = result;
    });
    actions({ prop: value1, prop2: value2 });
    expect(res).toStrictEqual({ prop: value1, prop2: value2 });
    done();
  });

  it('should emit on multiple subscribed channels over mreged output', (done) => {
    const value1 = 'foo';
    const value2 = 'bar';
    const actions = setupComponent<UiActions>().component.actions;

    const res = [];
    expect(typeof actions.$).toBe('function');
    actions.$(['prop', 'prop2']).subscribe((result) => {
      res.push(result);
    });
    actions({ prop: value1, prop2: value2 });
    expect(res.length).toBe(2);
    expect(res).toStrictEqual([value1, value2]);
    done();
  });

  it('should destroy all created actions', (done) => {
    let numCalls = 0;
    let numCalls2 = 0;
    const { fixture, component } = setupComponent<UiActions>();
    const actions = component.actions;
    const actions2 = component.actions2;

    actions.prop$.subscribe(() => ++numCalls);
    actions2.prop$.subscribe(() => ++numCalls2);
    expect(numCalls).toBe(0);
    expect(numCalls2).toBe(0);
    actions.prop();
    actions2.prop();
    expect(numCalls).toBe(1);
    expect(numCalls2).toBe(1);
    fixture.destroy();
    actions.prop();
    actions2.prop();
    expect(numCalls).toBe(1);
    expect(numCalls2).toBe(1);
    done();
  });

  it('should throw if a setter is used', (done) => {
    const actions = setupComponent<UiActions>().component.actions;

    expect(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (actions as any).prop = 0;
    }).toThrow('');

    done();
  });

  it('should isolate errors and invoke provided ErrorHandler', () => {
    const customErrorHandler: ErrorHandler = {
      handleError: jest.fn(),
    };
    const { component } = setupComponent<UiActions>({
      transformFns: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        resize: (_: string | number): number => {
          throw new Error('something went wrong');
        },
      },
      providers: [
        {
          provide: ErrorHandler,
          useValue: customErrorHandler,
        },
      ],
    });

    component.actions.search('');
    component.actions.resize(42);

    expect(customErrorHandler.handleError).toHaveBeenCalledWith(
      new Error('something went wrong')
    );
  });
});

type UiActions = {
  prop: string | void;
  prop2: string | void;
  search: string;
  resize: number;
};

function setupComponent<
  Actions extends object,
  Transforms extends ActionTransforms<Actions> = object
>(cfg?: { transformFns?: Transforms; providers?: Provider[] }) {
  let providers: Provider[] = [RxActionFactory];

  if (Array.isArray(cfg?.providers)) {
    providers = providers.concat(cfg.providers);
  }

  @Component({
    template: '',
    providers,
  })
  class TestComponent {
    actions = this.rxActions.create(cfg?.transformFns);
    actions2 = this.rxActions.create(cfg?.transformFns);

    constructor(private rxActions: RxActionFactory<Actions>) {}
  }

  TestBed.configureTestingModule({
    declarations: [TestComponent],
  });

  const fixture = TestBed.createComponent(TestComponent);
  const component = fixture.componentInstance;

  return { component, fixture };
}
