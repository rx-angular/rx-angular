import {MockNgZoneSpec} from './mock-ng-zone.spec';
import { MockNoopNgZoneSpec } from './mock-noop-ng-zone.spec';

/**
 * this is not exposed as NgZone should never be exposed to get miss matched with the real one
 */
class NgZone extends MockNgZoneSpec {

}

/**
 * this is not exposed as NgZone should never be exposed to get miss matched with the real one
 */
class NoopNgZone extends MockNoopNgZoneSpec {

}

export const manualInstanceNgZone = new NgZone({ enableLongStackTrace: false, shouldCoalesceEventChangeDetection: false });
export const manualInstanceNoopNgZone = new NoopNgZone({ enableLongStackTrace: false, shouldCoalesceEventChangeDetection: false });
export const mockPromise = { then() {}};

