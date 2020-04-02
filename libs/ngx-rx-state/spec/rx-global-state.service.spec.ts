import { TestBed } from '@angular/core/testing';

import { RxGlobalState } from '@ngx-rx/ngx-rx-state';

interface PrimitiveState {
  bol: boolean;
  str: string;
  num: number;
}

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
    expect(service).toBeTruthy();
  });

});
