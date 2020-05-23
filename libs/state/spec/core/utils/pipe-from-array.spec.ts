import {
  isIterableGuard,
  isKeyOf,
  isOperateFnArrayGuard,
  isPromiseGuard,
  isStringArrayGuard, pipeFromArray
} from '../../../src/lib/core/utils';
import { from, of } from 'rxjs';
import { map } from 'rxjs/operators';


describe('pipeFromArray', () => {

  it('should return true for arrays of function', () => {
    expect(pipeFromArray([])).toBeTruthy();
    expect(pipeFromArray([map(() => {})])).toBeTruthy();
    expect(pipeFromArray([map(() => {}), () => {}])).toBeTruthy();
  });

});
