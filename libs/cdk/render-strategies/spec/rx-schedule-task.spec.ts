import { NgZone } from '@angular/core';
import * as scheduler from '@rx-angular/cdk/internals/scheduler';
import { rxScheduleTask } from '../src';

describe('rxScheduleTask', () => {
  let work: jest.Mock;
  let ngZone: NgZone;
  let scheduleSpy: jest.SpyInstance;
  let cancelSpy: jest.SpyInstance;

  beforeEach(() => {
    work = jest.fn();
    // Mocking NgZone
    ngZone = { run: (fn: Function) => fn() } as any;

    // Spying on the scheduleCallback and cancelCallback functions
    scheduleSpy = jest.spyOn(scheduler, 'scheduleCallback');
    cancelSpy = jest.spyOn(scheduler, 'cancelCallback');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should use normal strategy as default', () => {
    rxScheduleTask(work);
    expect(scheduleSpy).toHaveBeenCalledWith(
      expect.anything(),
      expect.any(Function),
      { delay: undefined, ngZone: undefined }
    );
  });

  it('should schedule work with the specified strategy', () => {
    rxScheduleTask(work, { strategy: 'low' });
    expect(scheduleSpy).toHaveBeenCalledWith(
      expect.anything(),
      expect.any(Function),
      { delay: undefined, ngZone: undefined }
    );
  });

  it('should schedule work with the specified delay', () => {
    const delay = 200;
    rxScheduleTask(work, { delay });
    expect(scheduleSpy).toHaveBeenCalledWith(
      expect.anything(),
      expect.any(Function),
      { delay, ngZone: undefined }
    );
  });

  it('should schedule work inside the specified NgZone', () => {
    rxScheduleTask(work, { ngZone });
    expect(scheduleSpy).toHaveBeenCalledWith(
      expect.anything(),
      expect.any(Function),
      { delay: undefined, ngZone }
    );
  });

  it('should cancel the scheduled work', () => {
    const cancel = rxScheduleTask(work);
    cancel();
    expect(cancelSpy).toHaveBeenCalled();
  });
});
