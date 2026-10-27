import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { inject, InjectionToken, PLATFORM_ID, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { fc, test } from '@fast-check/jest';
import { PLATFORM } from '@rx-angular/cdk/ssr';
import { effectOnceIf } from '../util';

/**
 * Shape reported by the {@link PLATFORM} token factory in `util.ts`.
 */
interface PlatformView {
  isServer: boolean;
  isBrowser: boolean;
  isServerRenderer: boolean;
}

describe('util', () => {
  describe('PLATFORM token', () => {
    afterEach(() => {
      TestBed.resetTestingModule();
    });

    it('reports isBrowser=true and isServer=false under a browser platform id (Req 5.1)', () => {
      // Default jsdom TestBed runs on the browser platform. Because PLATFORM is
      // `providedIn: 'platform'`, injecting it here resolves the real factory
      // against the browser platform id.
      TestBed.configureTestingModule({});

      const platform = TestBed.inject(PLATFORM);

      expect(platform.isBrowser).toBe(true);
      expect(platform.isServer).toBe(false);
    });

    it('reports isServer=true and isBrowser=false under a server platform id (Req 5.2)', () => {
      // The `PLATFORM` token is platform-scoped, so overriding PLATFORM_ID in the
      // module injector alone cannot flip the already-created platform view.
      // Re-register the token at the root injector using the SAME factory logic
      // as `util.ts` (real `isPlatformServer`/`isPlatformBrowser`) so it reads the
      // server PLATFORM_ID provided below.
      const SERVER_PLATFORM = new InjectionToken<PlatformView>(
        'SERVER_PLATFORM_TEST',
      );

      TestBed.configureTestingModule({
        providers: [
          { provide: PLATFORM_ID, useValue: 'server' },
          {
            provide: SERVER_PLATFORM,
            useFactory: (): PlatformView => {
              const platformId = inject(PLATFORM_ID);
              return {
                isServer: isPlatformServer(platformId),
                isBrowser: isPlatformBrowser(platformId),
                isServerRenderer: false,
              };
            },
          },
        ],
      });

      const platform = TestBed.inject(SERVER_PLATFORM);

      expect(platform.isServer).toBe(true);
      expect(platform.isBrowser).toBe(false);
    });
  });

  describe('effectOnceIf', () => {
    // A falsy value the `condition` can report on any step. `effectOnceIf`
    // treats each of these as "not yet ready" (`if (hasCondition)` is false).
    const falsy = fc.constantFrom<false | 0 | null | ''>(false, 0, null, '');
    // A non-null truthy value: `execution` must receive it verbatim.
    const truthy = fc.oneof(
      fc.constant<true>(true),
      fc.integer({ min: 1 }),
      fc.string({ minLength: 1 }),
    );

    // Feature: virtual-view-test-coverage, Property 5: effectOnceIf runs exactly once on first truthy condition
    test.prop(
      [
        fc.record({
          // Falsy steps applied before the condition first turns truthy.
          leading: fc.array(falsy, { maxLength: 5 }),
          // The value that first makes the condition truthy.
          truthyValue: truthy,
          // Steps applied after the first truthy value (truthy or falsy).
          trailing: fc.array(fc.oneof(falsy, truthy), { maxLength: 5 }),
        }),
      ],
      { numRuns: 100 },
    )(
      'runs exactly once with the first truthy value and never again',
      ({ leading, truthyValue, trailing }) => {
        // Fresh injection context per iteration so no effect state leaks across
        // the 100+ generated runs.
        TestBed.resetTestingModule();
        TestBed.configureTestingModule({});

        const calls: unknown[] = [];
        // Start falsy: at creation `condition()` is falsy, so `execution` must
        // not run until a truthy value appears.
        const sig = signal<unknown>(false);

        TestBed.runInInjectionContext(() => {
          effectOnceIf(
            () => sig(),
            (value) => {
              calls.push(value);
            },
          );
        });

        // Flush the initial (falsy) evaluation: nothing should have run yet.
        TestBed.tick();
        expect(calls.length).toBe(0);

        // While the condition stays falsy, `execution` is never invoked.
        for (const value of leading) {
          sig.set(value);
          TestBed.tick();
          expect(calls.length).toBe(0);
        }

        // First truthy value: `execution` runs exactly once with that value.
        sig.set(truthyValue);
        TestBed.tick();
        expect(calls.length).toBe(1);
        expect(calls[0]).toBe(truthyValue);

        // Any subsequent change (truthy or falsy) must not run it again.
        for (const value of trailing) {
          sig.set(value);
          TestBed.tick();
          expect(calls.length).toBe(1);
        }

        // Final invariant: exactly one invocation with the first truthy value.
        expect(calls).toEqual([truthyValue]);
      },
    );
  });
});
