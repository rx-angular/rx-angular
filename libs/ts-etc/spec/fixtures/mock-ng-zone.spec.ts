import { MockEventEmitterSpec } from './mock-event-emitter.spec';

/**
 * source: https://github.com/angular/angular/blob/master/packages/core/src/zone/ng_zone.ts#L88
 */
export class MockNgZoneSpec {
  readonly hasPendingMacrotasks: boolean = false;
  readonly hasPendingMicrotasks: boolean = false;
  readonly isStable: boolean = true;
  readonly onUnstable: MockEventEmitterSpec<any> = new MockEventEmitterSpec(
    false
  );
  readonly onMicrotaskEmpty: MockEventEmitterSpec<
    any
  > = new MockEventEmitterSpec(false);
  readonly onStable: MockEventEmitterSpec<any> = new MockEventEmitterSpec(
    false
  );
  readonly onError: MockEventEmitterSpec<any> = new MockEventEmitterSpec(false);

  static isInAngularZone(): boolean {
    return true;
  }

  static assertInAngularZone(): void {}

  static assertNotInAngularZone(): void {}

  constructor({
    enableLongStackTrace = false,
    shouldCoalesceEventChangeDetection = false
  }) {}

  run(fn: Function): any {
    return fn();
  }

  runTask<T>(
    fn: (...args: any[]) => T,
    applyThis?: any,
    applyArgs?: any[],
    name?: string
  ): T {
    return undefined;
  }

  runGuarded<T>(
    fn: (...args: any[]) => T,
    applyThis?: any,
    applyArgs?: any[]
  ): T {
    return undefined;
  }

  runOutsideAngular(fn: Function): any {
    return fn();
  }
}
