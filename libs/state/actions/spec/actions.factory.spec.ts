// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { mockConsole } from '@test-helpers';
import { RxActionFactory } from '../src/lib/actions.factory';
import { isObservable } from 'rxjs';
import { Component, ErrorHandler } from '@angular/core';
import { TestBed } from '@angular/core/testing';



const errorHandler = new ErrorHandler();
// tslint:disable-next-line: prefer-on-push-component-change-detection  use-component-selector
@Component({
  template: '',
  providers: [RxActionFactory]
})
class TestComponent {
  ui = this.actions.create({
    search: (e: InputEvent | string): string => {
      return typeof e === 'object' ? (e as any).target.value : e;
    },
    resize: (n: string | number): number => {
      throw new Error('something went wrong');
    }
  });
  constructor(private actions: RxActionFactory<{search: string, resize: number}>) {

  }
}

/** @test {RxActionFactory} */
describe('RxActionFactory', () => {
  beforeAll(() => mockConsole());

  it('should get created properly', () => {
    const actions = new RxActionFactory<{ prop: string }>(errorHandler).create();
    expect(typeof actions.prop).toBe('function');
    expect(isObservable(actions.prop)).toBeFalsy();
    expect(isObservable(actions.prop$)).toBeTruthy();
  });

  it('should emit on the subscribed channels', (done) => {
    const values = 'foo';
    const actions = new RxActionFactory<{ prop: string }>(errorHandler).create();
    const exp = values;
    actions.prop$.subscribe((result) => {
      expect(result).toBe(exp);
      done();
    });
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

  it('should destroy', (done) => {
    let numCalls = 0;
    const factory = new RxActionFactory<{ prop: void }>(errorHandler);
    const actions = factory.create();

    actions.prop$.subscribe(() => ++numCalls);
    expect(numCalls).toBe(0);
    actions.prop();
    expect(numCalls).toBe(1);
    factory.destroy();
    actions.prop();
    expect(numCalls).toBe(1);
    done();
  });

  it('should throw if a setter is used', (done) => {
    const factory = new RxActionFactory<{ prop: number }>(errorHandler);
    const actions = factory.create();

    expect(() => {
      (actions as any).prop = 0;
    }).toThrow('')


    done();
  });


  test('should isolate errors and invoke provided ErrorHandler', async () => {
    const customErrorHandler: ErrorHandler = {
      handleError: jest.fn()
    };
    await TestBed.configureTestingModule({
      declarations: [TestComponent],
      providers: [
        {
          provide: ErrorHandler,
          useValue: customErrorHandler
        }
      ]
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
