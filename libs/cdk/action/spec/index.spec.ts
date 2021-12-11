import { mockConsole } from '@test-helpers';
import { getActions } from '../src';
import { isObservable } from 'rxjs';

/** @test {coalesceWith} */
describe('getActions', () => {
  beforeAll(() => mockConsole());

  beforeEach(() => {});


  it('should get created properly', (done) => {
    const values = 'foo';
    const actions = getActions<{ prop: string }>();
    const exp = values;
    expect(typeof actions.prop).toBe('function');
    expect(isObservable(actions.prop)).toBeFalsy();
    expect(isObservable(actions.prop$)).toBeTruthy();
    done();
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
