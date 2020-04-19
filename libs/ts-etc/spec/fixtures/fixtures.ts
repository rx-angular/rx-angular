import { MockNgZone } from './mock-ng-zone';
import { MockNoopNgZone } from './mock-noop-ng-zone';

/**
 * this is not exposed as NgZone should never be exposed to get miss matched with the real one
 */
class NgZone extends MockNgZone {}

/**
 * this is not exposed as NgZone should never be exposed to get miss matched with the real one
 */
class NoopNgZone extends MockNoopNgZone {}

export const manualInstanceNgZone = new NgZone({
  enableLongStackTrace: false,
  shouldCoalesceEventChangeDetection: false
});
export const manualInstanceNoopNgZone = new NoopNgZone({
  enableLongStackTrace: false,
  shouldCoalesceEventChangeDetection: false
});
export const mockPromise = { then() {} };
