// eslint-disable-next-line @nx/enforce-module-boundaries
import { mockConsole } from '@test-helpers';
import { rxActions } from './actions';
import { isObservable } from 'rxjs';
import { Component, ErrorHandler } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RxActions } from '@rx-angular/state/actions';

type Actions = { prop: string; prop2: string; search: string; resize: number };

let fixture = undefined;
let errorfixture = undefined;
let errorComponentInstance = undefined;
let _actions: RxActions<Actions> = undefined;
let _actions2: RxActions<Actions> = undefined;
let _actionstransform: RxActions<Actions> = undefined;

// tslint:disable-next-line: prefer-on-push-component-change-detection  use-component-selector
@Component({
  template: '',
})
class TestComponent {
  ui = rxActions<Actions>();
  ui2 = rxActions<Actions>();
}

@Component({
  template: '',
})
class Test2Component {
  ui = rxActions<Actions>(({ transforms }) => {
    transforms({
      prop: (x: any) => 'transformed',
      search: (e: InputEvent | string): string => {
        return typeof e === 'object' ? (e as any).target.value : e;
      },
      resize: (_: string | number): number => {
        throw new Error('something went wrong');
      },
    });
  });
  ui2 = rxActions<Actions>();
}

const customErrorHandler: ErrorHandler = {
  handleError: jest.fn(),
};
@Component({
  template: '',
  providers: [
    {
      provide: ErrorHandler,
      useValue: customErrorHandler,
    },
  ],
})
class TestErrorComponent {
  ui = rxActions<Actions>(({ transforms }) => {
    transforms({
      resize: (_: string | number): number => {
        throw new Error('something went wrong');
      },
    });
  });
}

/** @test {RxActionFactory} */
describe('actions fn', () => {
  beforeAll(() => mockConsole());

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponent],
      providers: [],
    }).compileComponents();
    fixture = TestBed.createComponent(TestComponent);
    errorfixture = TestBed.createComponent(TestErrorComponent);
    errorComponentInstance = fixture.componentInstance;
    _actionstransform =
      TestBed.createComponent(Test2Component).componentInstance.ui;
    _actions = fixture.componentInstance.ui;
    _actions2 = fixture.componentInstance.ui2;
  });

  it('should get created properly', () => {
    expect(typeof _actions.prop).toBe('function');
    expect(isObservable(_actions.prop)).toBeFalsy();
    expect(isObservable(_actions.prop$)).toBeTruthy();
  });

  it('should emit on the subscribed channels', (done) => {
    const values = 'foo';
    const exp = values;
    _actions.prop$.subscribe((result) => {
      expect(result).toBe(exp);
      done();
    });
    _actions.prop(values);
  });

  it('should maintain channels per create call', (done) => {
    const values = 'foo';
    const nextSpy = jest.spyOn({ nextSpy: (_: string) => void 0 }, 'nextSpy');
    const exp = values;

    _actions2.prop$.subscribe(nextSpy as unknown as (_: string) => void);
    _actions.prop$.subscribe((result) => {
      expect(result).toBe(exp);
      done();
    });
    expect(nextSpy).not.toHaveBeenCalled();
    _actions.prop(values);
  });

  it('should emit and transform on the subscribed channels', (done) => {
    const exp = 'transformed';
    _actionstransform.prop$.subscribe((result) => {
      expect(result).toBe(exp);
      done();
    });
    _actionstransform.prop('');
  });

  it('should emit on multiple subscribed channels', (done) => {
    const value1 = 'foo';
    const value2 = 'bar';
    const res = {};
    _actions.prop$.subscribe((result) => {
      res['prop'] = result;
    });
    _actions.prop2$.subscribe((result) => {
      res['prop2'] = result;
    });
    _actions({ prop: value1, prop2: value2 });
    expect(res).toStrictEqual({ prop: value1, prop2: value2 });
    done();
  });

  it('should emit on multiple subscribed channels over mreged output', (done) => {
    const value1 = 'foo';
    const value2 = 'bar';

    const res = [];
    expect(typeof _actions.$).toBe('function');
    _actions.$(['prop', 'prop2']).subscribe((result) => {
      res.push(result);
    });
    _actions({ prop: value1, prop2: value2 });
    expect(res.length).toBe(2);
    expect(res).toStrictEqual([value1, value2]);
    done();
  });

  it('should destroy all created actions', (done) => {
    let numCalls = 0;

    _actions.prop$.subscribe(() => ++numCalls);
    expect(numCalls).toBe(0);
    _actions.prop('');
    expect(numCalls).toBe(1);

    // destroyRef should be called
    fixture.destroy();
    _actions.prop('');
    expect(numCalls).toBe(1);
    done();
  });

  it('should throw if a setter is used', (done) => {
    expect(() => {
      (_actions as any).prop = 0;
    }).toThrow('');

    done();
  });

  it('should isolate errors and invoke provided ErrorHandler', async () => {
    const fixture = TestBed.createComponent(TestErrorComponent);

    fixture.componentInstance.ui.search('');
    fixture.componentInstance.ui.resize(42);

    expect(customErrorHandler.handleError).toHaveBeenCalledWith(
      new Error('something went wrong')
    );
  });
});
