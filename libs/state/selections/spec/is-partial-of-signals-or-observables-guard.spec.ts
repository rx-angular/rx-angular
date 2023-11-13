import { isPartialOfSignalsOrObservablesGuard } from '@rx-angular/state/selections';
import { of } from 'rxjs';
import { signal } from '@angular/core';

describe('isPartialOfSignalsOrObservablesGuard', () => {
  it('should return false if arg is no object', () => {
    expect(isPartialOfSignalsOrObservablesGuard('some')).toEqual(false);
  });
  it('should return true if all props are either observables or signals', () => {
    expect(
      isPartialOfSignalsOrObservablesGuard({
        a: of(true),
        b: signal(10),
      })
    ).toEqual(true);
  });
  it('should return false if one prop is neither a observable or signal', () => {
    expect(
      isPartialOfSignalsOrObservablesGuard({
        a: of(true),
        b: signal(10),
        c: true,
      })
    ).toEqual(false);
  });
});
