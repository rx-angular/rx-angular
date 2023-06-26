import { Component, ErrorHandler } from '@angular/core';
import { TestBed } from '@angular/core/testing';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { mockConsole } from '@test-helpers';
import { isObservable } from 'rxjs';
import { RxActionFactory } from './actions.factory';

describe(RxActionFactory, () => {
  beforeAll(() => mockConsole());

  it('should throw if called outside of Angular injection context', () => {
    expect(() => new RxActionFactory()).toThrowError(/NG0203/);
  });

  it('should get created properly', () => {
    const { actions } = setUp<{ prop: void }>();
    expect(typeof actions.prop).toBe('function');
    expect(isObservable(actions.prop)).toBeFalsy();
    expect(isObservable(actions.prop$)).toBeTruthy();
  });

  it('should emit on the subscribed channels', (done) => {
    const { actions } = setUp<{ prop: string }>();
    const values = 'foo';
    const exp = values;
    actions.prop$.subscribe((result) => {
      expect(result).toBe(exp);
      done();
    });
    actions.prop(values);
  });

  it('should maintain channels per create call', (done) => {
    const values = 'foo';
    const nextSpy = jest.spyOn({ nextSpy: (_: string) => void 0 }, 'nextSpy');
    const { fixture } = setUp<{ prop: string }>();
    const factory = fixture.componentInstance.actions;
    const actions = factory.create();
    const actions2 = factory.create();
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
    const { actions } = setUp<{ prop: void }>({
      transforms: {
        prop: () => 'transformed',
      },
    });
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
    const { actions } = setUp<{
      prop1: string;
      prop2: string;
    }>();
    const res = {};
    actions.prop1$.subscribe((result) => {
      res['prop1'] = result;
    });
    actions.prop2$.subscribe((result) => {
      res['prop2'] = result;
    });
    actions({ prop1: value1, prop2: value2 });
    expect(res).toStrictEqual({ prop1: value1, prop2: value2 });
    done();
  });

  it('should emit on multiple subscribed channels over merged output', (done) => {
    const value1 = 'foo';
    const value2 = 'bar';
    const { actions } = setUp<{
      prop1: string;
      prop2: string;
    }>();

    const res = [];
    expect(typeof actions.$).toBe('function');
    actions.$(['prop1', 'prop2']).subscribe((result) => {
      res.push(result);
    });
    actions({ prop1: value1, prop2: value2 });
    expect(res.length).toBe(2);
    expect(res).toStrictEqual([value1, value2]);
    done();
  });

  it('should destroy all created actions', (done) => {
    let numCalls = 0;
    let numCalls2 = 0;

    const { fixture } = setUp<{ prop: void }>();
    const factory = fixture.componentInstance.actions;
    const actions = factory.create();
    const actions2 = factory.create();

    actions.prop$.subscribe(() => ++numCalls);
    actions2.prop$.subscribe(() => ++numCalls2);
    expect(numCalls).toBe(0);
    expect(numCalls2).toBe(0);
    actions.prop();
    actions2.prop();
    expect(numCalls).toBe(1);
    expect(numCalls2).toBe(1);
    factory.destroy();
    actions.prop();
    actions2.prop();
    expect(numCalls).toBe(1);
    expect(numCalls2).toBe(1);
    done();
  });

  it('should throw if a setter is used', (done) => {
    const { actions } = setUp();

    expect(() => {
      (actions as any).prop = 0;
    }).toThrow('');

    done();
  });

  it('should isolate errors and invoke provided ErrorHandler', async () => {
    const customErrorHandler: ErrorHandler = {
      handleError: jest.fn(),
    };

    const { actions } = setUp<{ search: string; resize: number }>({
      providers: [{ provide: ErrorHandler, useValue: customErrorHandler }],
      transforms: {
        search: (e: InputEvent | string): string => {
          return typeof e === 'object' ? (e as any).target.value : e;
        },
        resize: (_: string | number): number => {
          throw new Error('something went wrong');
        },
      },
    });

    actions.search('');
    actions.resize(42);

    expect(customErrorHandler.handleError).toHaveBeenCalledWith(
      new Error('something went wrong')
    );
  });
});

function setUp<TActions>({ transforms = {}, providers = [] } = {}) {
  @Component({
    template: '',
    providers: [RxActionFactory],
  })
  class TestComponent {
    ui = this.actions.create(transforms);
    constructor(public actions: RxActionFactory<TActions>) {}
  }

  TestBed.configureTestingModule({
    declarations: [TestComponent],
    providers,
  });
  const fixture = TestBed.createComponent(TestComponent);

  fixture.detectChanges();
  const actions = fixture.componentInstance.ui;

  return { actions, fixture };
}
