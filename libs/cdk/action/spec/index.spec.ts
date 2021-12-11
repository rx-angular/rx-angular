import { mockConsole } from '@test-helpers';
import { getActions } from '../src';
import { isObservable } from 'rxjs';

/** @test {getActions} */
describe('getActions', () => {
  beforeAll(() => mockConsole());

  it('should get created properly', () => {
    const actions = getActions<{ prop: string }>();
    expect(typeof actions.prop).toBe('function');
    expect(isObservable(actions.prop)).toBeFalsy();
    expect(isObservable(actions.prop$)).toBeTruthy();
  });

  it('should emit on the subscribed channels', (done) => {
    const values = 'foo';
    const actions = getActions<{ prop: string }>();
    const exp = values;
    actions.prop$.subscribe((result) => {
      expect(result).toBe(exp);
      done();
    });
  });

});
