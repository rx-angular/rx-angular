// eslint-disable-next-line @nx/enforce-module-boundaries
import { mockConsole } from '@test-helpers';
import { RxActionFactory } from '../src/lib/actions.factory';
import { isObservable } from 'rxjs';
import { Component, ErrorHandler } from '@angular/core';
import { TestBed } from '@angular/core/testing';

const errorHandler = new ErrorHandler();
// tslint:disable-next-line: prefer-on-push-component-change-detection  use-component-selector
@Component({
  template: '',
  providers: [RxActionFactory],
})
class TestComponent {
  ui = this.actions.create({
    search: (e: InputEvent | string): string => {
      return typeof e === 'object' ? (e as any).target.value : e;
    },
    resize: (_: string | number): number => {
      throw new Error('something went wrong');
    },
  });
  constructor(
    private actions: RxActionFactory<{ search: string; resize: number }>
  ) {}
}

/** @test {RxActionFactory} */
describe('RxActionFactory', () => {
  beforeAll(() => mockConsole());

  it('should get created properly', () => {
    const actions = new RxActionFactory<{ prop: string }>(
      errorHandler
    ).create();
    expect(typeof actions.prop).toBe('function');
    expect(isObservable(actions.prop)).toBeFalsy();
    expect(isObservable(actions.prop$)).toBeTruthy();
  });

  it('should emit on the subscribed channels', (done) => {
    const values = 'foo';
    const actions = new RxActionFactory<{ prop: string }>(
      errorHandler
    ).create();
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
    const actions = new RxActionFactory<{ prop: string }>(
      errorHandler
    ).create();
    const actions2 = new RxActionFactory<{ prop: string }>(
      errorHandler
    ).create();
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
    const actions = new RxActionFactory<{ prop: string }>(errorHandler).create({
      prop: () => 'transformed',
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
    const actions = new RxActionFactory<{ prop1: string; prop2: string }>(
      errorHandler
    ).create();
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

  it('should emit on multiple subscribed channels over mreged output', (done) => {
    const value1 = 'foo';
    const value2 = 'bar';
    const actions = new RxActionFactory<{ prop1: string; prop2: string }>(
      errorHandler
    ).create();

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
    const factory = new RxActionFactory<{ prop: void }>(errorHandler);
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
    const factory = new RxActionFactory<{ prop: number }>(errorHandler);
    const actions = factory.create();

    expect(() => {
      (actions as any).prop = 0;
    }).toThrow('');

    done();
  });

  test('should isolate errors and invoke provided ErrorHandler', async () => {
    const customErrorHandler: ErrorHandler = {
      handleError: jest.fn(),
    };
    await TestBed.configureTestingModule({
      declarations: [TestComponent],
      providers: [
        {
          provide: ErrorHandler,
          useValue: customErrorHandler,
        },
      ],
    }).compileComponents();
    const fixture = TestBed.createComponent(TestComponent);

    fixture.componentInstance.ui.search('');
    fixture.componentInstance.ui.resize(42);

    expect(customErrorHandler.handleError).toHaveBeenCalledWith(
      new Error('something went wrong')
    );
    /*
    expect(service.method2).toHaveBeenCalledWith('foo2');
    expect(service.method3).toHaveBeenCalledWith('foo3');
    expect(service.method4).toHaveBeenCalledWith('foo4');
    */
  });
});
