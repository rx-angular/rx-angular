import { TestBed } from '@angular/core/testing';

import { RxGlobalState } from '@ngx-rx/ngx-rx-state';
import { createStateChecker, PrimitiveState } from './fixtures';

const stateChecker = createStateChecker((actual, expected) => {
  if (typeof expected === 'object') {
    expect(actual).toEqual(expected);
  } else {
    expect(actual).toBe(expected);
  }
});


describe('RxStateService', () => {
  let service: RxGlobalState<PrimitiveState>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RxGlobalState);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be hot on instantiation', () => {
    stateChecker.checkSubscriptions(service, 1);
  });


});
