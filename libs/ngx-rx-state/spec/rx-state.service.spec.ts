import { TestBed } from '@angular/core/testing';

import { RxState } from '@ngx-rx/ngx-rx-state';
import { createStateChecker, PrimitiveState, setupState } from './fixtures';
import { of } from 'rxjs';

const stateChecker = createStateChecker((actual, expected) => {
  if (typeof expected === 'object') {
    expect(actual).toEqual(expected);
  } else {
    expect(actual).toBe(expected);
  }
});

describe('RxStateService', () => {
  let service: RxState<PrimitiveState>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = setupState({});
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be hot on instantiation', () => {
    stateChecker.checkSubscriptions(service, 1);
  });

  it('should unsubscribe on ngOnDestroy call', () => {
    stateChecker.checkSubscriptions(service, 1);
    service.ngOnDestroy();
    stateChecker.checkSubscriptions(service, 0);
  });

  describe('mirrors vanilla RxState', () => {

    it('should provide the setState method', async () => {
      service.setState({ num: 1 });
      await stateChecker.checkState(service, { num: 1 });

      service.setState(s => ({ num: s.num + 2 }));
      await stateChecker.checkState(service, { num: 3 });

      service.setState('num', s => s.num + 3);
      await stateChecker.checkState(service, { num: 6 });
    });

    it('should provide the connect method', async () => {
      service.connect(of({ num: 1 }));
      await stateChecker.checkState(service, { num: 1 });

      service.connect(of(1), (oldState, slice) => ({num: oldState.num + slice}));
      await stateChecker.checkState(service, { num: 2 });

      service.connect('num', of(3));
      await stateChecker.checkState(service, { num: 3 });

      service.connect('num', of(1), (s: PrimitiveState, v: any) => s.num + v);
      await stateChecker.checkState(service, { num: 4 });
    });

  });

});
