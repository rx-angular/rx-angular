import { ChangeDetectorRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRxRenderStrategies } from '@rx-angular/cdk/render-strategies';
import { mockConsole } from '@test-helpers/rx-angular';
import { EMPTY, NEVER, of } from 'rxjs';
import { RxPush } from '../push.pipe';
import { MockChangeDetectorRef } from './fixtures';

let pushPipe: any;

const setupPushPipeComponent = () => {
  TestBed.configureTestingModule({
    providers: [
      { provide: ChangeDetectorRef, useClass: MockChangeDetectorRef },
      RxPush,
      provideRxRenderStrategies({ primaryStrategy: 'native' }),
    ],
    teardown: { destroyAfterEach: true },
  });
  pushPipe = TestBed.inject(RxPush);
};

describe('RxPush used as a Service', () => {
  beforeAll(() => mockConsole());
  beforeEach(setupPushPipeComponent);

  it('should be instantiable', () => {
    expect(pushPipe).toBeDefined();
  });

  describe('transform function', () => {
    it('should return undefined as value when initially undefined was passed (as no value ever was emitted)', () => {
      expect(pushPipe.transform(undefined)).toBe(undefined);
    });

    it('should return null as value when initially null was passed (as no value ever was emitted)', () => {
      expect(pushPipe.transform(null)).toBe(null);
    });

    it('should return undefined as value when initially of(undefined) was passed (as undefined was emitted)', () => {
      expect(pushPipe.transform(of(undefined))).toBe(undefined);
    });

    it('should return null as value when initially of(null) was passed (as null was emitted)', () => {
      expect(pushPipe.transform(of(null))).toBe(null);
    });

    it('should return undefined as value when initially EMPTY was passed (as no value ever was emitted)', () => {
      expect(pushPipe.transform(EMPTY)).toBe(undefined);
    });

    it('should return undefined as value when initially NEVER was passed (as no value ever was emitted)', () => {
      expect(pushPipe.transform(NEVER)).toBe(undefined);
    });

    it('should return emitted value from passed observable without changing it', () => {
      expect(pushPipe.transform(of(42))).toBe(42);
    });

    it('should return undefined as value when a new observable NEVER was passed (as no value ever was emitted from new observable)', () => {
      expect(pushPipe.transform(of(42))).toBe(42);
      expect(pushPipe.transform(NEVER)).toBe(undefined);
    });
  });
});
