import { staticSchedule } from '../../../src/lib/render-strategies/static';
import { SchedulingPriority } from '../../../src/lib/render-strategies/rxjs/scheduling';
// tslint:disable-next-line:nx-enforce-module-boundaries
import { mockConsole } from '@test-helpers';
import createSpy = jasmine.createSpy;
import { timer } from 'rxjs';


describe('staticSchedule', () => {
  beforeAll(() => mockConsole());

  it('should work without priority', () => {
    let test = 0;
    const doWork = () => {
      test++;
    }
    staticSchedule(doWork, false);
    expect(test).toBe(1);
  });

  it('should abort on complete', (done) => {
    let test = 0;
    const doWork = () => {
      test++;
    };
    const priority = SchedulingPriority.Promise;
    const abc = {
      abort: createSpy('abort'),
      signal: {
        addEventListener: () => void 0,
        // hack to enter complete only and get 1 call
        aborted: true
      }
    } as unknown as AbortController;
    staticSchedule(doWork,priority , abc);
    expect(abc.abort).toHaveBeenCalledTimes(0);
    setTimeout(() => {
      expect(abc.abort).toHaveBeenCalledTimes(1);
      done();
    })
  });

  it('should change the execution context', (done) => {
    let test = 0;
    const priority = SchedulingPriority.Promise;
    const doWork = () => {
      test++;
    }
    staticSchedule(doWork, priority);
    expect(test).toBe(0);

    Promise.resolve()
      .then(() => {
        expect(test).toBe(1);
      })
      .catch((e) => {
        throw new Error('Should not get called');
      })
      .finally(() => {
        done();
      });

    expect(test).toBe(0);
  });


  it('should stop if aborted', (done) => {
    let test = 0;
    const priority = SchedulingPriority.Promise;
    const doWork = () => {
      test++;
    }

    const abC = staticSchedule(doWork, priority);
    expect(test).toBe(0);
    abC.abort();
    Promise.resolve()
      .then(() => {
        expect(test).toBe(0);
      })
      .catch((e) => {
        throw new Error('Should not get called');
      })
      .finally(() => {
        done();
      });

    expect(test).toBe(0);
  });

});
