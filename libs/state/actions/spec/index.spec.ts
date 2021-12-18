// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { mockConsole } from '@test-helpers';
import { RxActionsFactory } from '../src/actions.factory';
import { isObservable } from 'rxjs';

/** @test {getActions} */
describe('getActions', () => {
  beforeAll(() => mockConsole());

  it('should get created properly', () => {
    const actions = new RxActionsFactory<{ prop: string }>().create();
    expect(typeof actions.prop).toBe('function');
    expect(isObservable(actions.prop)).toBeFalsy();
    expect(isObservable(actions.prop$)).toBeTruthy();
  });

  it('should emit on the subscribed channels', (done) => {
    const values = 'foo';
    const actions = new RxActionsFactory<{ prop: string }>().create();
    const exp = values;
    actions.prop$.subscribe((result) => {
      expect(result).toBe(exp);
      done();
    });
    actions.prop(values);
  });

  it('should emit and transform on the subscribed channels', (done) => {
    const actions = new RxActionsFactory<{ prop: string }>().create({
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
    const factory = new RxActionsFactory<{ prop: void }>();
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
    const factory = new RxActionsFactory<{ prop: number }>();
    const actions = factory.create();

    expect(() => {
      (actions as any).prop = 0;
    }).toThrow('')


    done();
  });

});
