// eslint-disable-next-line @nx/enforce-module-boundaries
import { mockConsole } from '@test-helpers';
import { rxActions } from './rx-actions';
import { isObservable } from 'rxjs';
import { Component, ErrorHandler, Provider } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ActionTransforms } from '@rx-angular/state/actions';

describe('actions fn', () => {
  beforeAll(() => mockConsole());

  it('should get created properly', () => {
    const { component } = setupComponent<Actions>();
    expect(typeof component.actions.prop).toBe('function');
    expect(isObservable(component.actions.prop)).toBeFalsy();
    expect(isObservable(component.actions.prop$)).toBeTruthy();
    expect(typeof component.actions.onProp).toBe('function');
  });

  it('should emit on the subscribed channels', (done) => {
    const values = 'foo';
    const exp = values;
    const { component } = setupComponent<Actions>();
    component.actions.prop$.subscribe((result) => {
      expect(result).toBe(exp);
      done();
    });
    component.actions.prop(values);
  });

  it('should maintain channels per create call', (done) => {
    const values = 'foo';
    const nextSpy = jest.spyOn({ nextSpy: (_: string) => void 0 }, 'nextSpy');
    const exp = values;
    const { component } = setupComponent<Actions>();
    component.actions2.prop$.subscribe(
      nextSpy as unknown as (_: string) => void
    );
    component.actions.prop$.subscribe((result) => {
      expect(result).toBe(exp);
      done();
    });
    expect(nextSpy).not.toHaveBeenCalled();
    component.actions.prop(values);
  });

  it('should emit and transform on the subscribed channels', (done) => {
    const exp = 'transformed';
    const { component } = setupComponent<Actions>({
      transformFns: { prop: (x: any) => 'transformed' },
    });
    component.actions.prop$.subscribe((result) => {
      expect(result).toBe(exp);
      done();
    });
    component.actions.prop('');
  });

  it('should emit on multiple subscribed channels', (done) => {
    const value1 = 'foo';
    const value2 = 'bar';
    const res = {};
    const { component } = setupComponent<Actions>();

    component.actions.prop$.subscribe((result) => {
      res['prop'] = result;
    });
    component.actions.prop2$.subscribe((result) => {
      res['prop2'] = result;
    });
    component.actions({ prop: value1, prop2: value2 });
    expect(res).toStrictEqual({ prop: value1, prop2: value2 });
    done();
  });

  it('should emit on multiple subscribed channels over merged output', (done) => {
    const value1 = 'foo';
    const value2 = 'bar';

    const res = [];
    const { component } = setupComponent<Actions>();

    expect(typeof component.actions.$).toBe('function');
    component.actions.$(['prop', 'prop2']).subscribe((result) => {
      res.push(result);
    });
    component.actions({ prop: value1, prop2: value2 });
    expect(res.length).toBe(2);
    expect(res).toStrictEqual([value1, value2]);
    done();
  });

  it('should trigger side effect', () => {
    const { component } = setupComponent<Actions>();
    const t = { se: () => void 0 };
    const spyT = jest.spyOn({ spyT: (_: any) => void 0 }, 'spyT') as any;

    const sub = component.actions.onProp(spyT);
    component.actions.prop('p');
    expect(spyT).toBeCalledTimes(1);
    expect(spyT).toBeCalledWith('p');
  });

  it('should not trigger side effect after unsubscribed', () => {
    const { component } = setupComponent<Actions>();
    const t = { se: () => void 0 };
    const spyT = jest.spyOn({ spyT: (_: any) => void 0 }, 'spyT') as any;

    const sub = component.actions.onProp(spyT);
    sub();
    component.actions.prop('p');
    expect(spyT).toBeCalledTimes(1);
  });

  it('should destroy all created actions and subscriptions on component destroy', (done) => {
    const spyEmission = jest.spyOn(
      { spyEmission: (_: any) => void 0 },
      'spyEmission'
    ) as any;
    const spyEffect = jest.spyOn(
      { spyEffect: (_: any) => void 0 },
      'spyEffect'
    ) as any;
    const spyEmission2 = jest.spyOn(
      { spyEmission2: (_: any) => void 0 },
      'spyEmission2'
    ) as any;
    const spyEffect2 = jest.spyOn(
      { spyEffect2: (_: any) => void 0 },
      'spyEffect2'
    ) as any;

    const { component, fixture } = setupComponent<Actions>();

    component.actions.prop$.subscribe(spyEmission);
    component.actions2.prop$.subscribe(spyEmission2);

    const ef = component.actions.onProp(spyEffect);
    const ef2 = component.actions2.onProp(spyEffect2);

    expect(spyEmission).toBeCalledTimes(0);
    expect(spyEffect).toBeCalledTimes(0);

    expect(spyEmission2).toBeCalledTimes(0);
    component.actions.prop('');
    component.actions2.prop('');
    expect(spyEmission).toBeCalledTimes(1);
    expect(spyEffect).toBeCalledTimes(1);

    expect(spyEmission2).toBeCalledTimes(1);
    expect(spyEffect).toBeCalledTimes(1);

    fixture.destroy();
    component.actions.prop('');
    component.actions2.prop('');
    expect(spyEmission).toBeCalledTimes(1);
    expect(spyEffect).toBeCalledTimes(1);

    expect(spyEmission2).toBeCalledTimes(1);
    expect(spyEffect2).toBeCalledTimes(1);

    done();
  });

  it('should throw if a setter is used', (done) => {
    const { component } = setupComponent<Actions>();
    expect(() => {
      (component.actions as any).prop = 0;
    }).toThrow('');

    done();
  });

  it('should isolate errors and invoke provided ErrorHandler', () => {
    const customErrorHandler: ErrorHandler = {
      handleError: jest.fn(),
    };
    const { fixture } = setupComponent<Actions>({
      transformFns: {
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
    fixture.componentInstance.actions.search('');
    fixture.componentInstance.actions.resize(42);

    expect(customErrorHandler.handleError).toHaveBeenCalledWith(
      new Error('something went wrong')
    );
  });
});

type Actions = { prop: string; prop2: string; search: string; resize: number };
function setupComponent<
  Actions extends object,
  Transforms extends ActionTransforms<Actions> = {}
>(cfg?: { transformFns?: Transforms; providers?: Provider[] }) {
  let providers = [];
  if (Array.isArray(cfg?.providers)) {
    providers = cfg.providers;
  }
  @Component({
    template: '',
    providers,
  })
  class TestComponent {
    actions = rxActions<Actions>(({ transforms }) => {
      if (cfg?.transformFns) {
        transforms(cfg.transformFns);
      }
    });
    actions2 = rxActions<Actions>(({ transforms }) => {
      if (cfg?.transformFns) {
        transforms(cfg.transformFns);
      }
    });
  }

  TestBed.configureTestingModule({
    declarations: [TestComponent],
  });

  const fixture = TestBed.createComponent(TestComponent);
  const component = fixture.componentInstance;

  return { component, fixture };
}
